"""向 ComfyUI PromptServer 注册 MediaAssetsViewer 的 API 路由。"""

from __future__ import annotations

import asyncio
import json
import logging
from typing import Any

from aiohttp import web

from .metadata import get_metadata
from .scanner import delete_file, scan_directory, scanned_to_dict

_logger = logging.getLogger("media_assets_viewer")

_PREFIX = "/mav"


def register_routes(app: web.Application) -> None:
    """注册所有 MAV 路由到 aiohttp 应用。

    直接往 app.router（UrlDispatcher）加路由，立即生效。
    注意：不能用 PromptServer.instance.routes（RouteTableDef 类属性），
    因为它需要 app.add_routes() 才会应用，custom_node 加载时该时机已过。
    """

    async def list_files(request: web.Request) -> web.Response:
        """GET /mav/files/{type} - 列出指定类型目录的所有媒体文件。"""
        dir_type = request.match_info.get("type", "output")
        if dir_type not in ("output", "input"):
            return web.json_response({"error": "invalid type"}, status=400)
        try:
            # 扫描和序列化放到线程池，避免阻塞 aiohttp 事件循环
            # （output 目录可能含上千文件，同步扫描会卡住整个 ComfyUI）
            loop = asyncio.get_event_loop()
            files = await loop.run_in_executor(None, scan_directory, dir_type)
            payload = await loop.run_in_executor(
                None, lambda: [scanned_to_dict(f) for f in files]
            )
            return web.json_response(payload)
        except Exception as exc:
            _logger.exception("list_files failed")
            return web.json_response({"error": str(exc)}, status=500)

    async def get_file_metadata(request: web.Request) -> web.Response:
        """GET /mav/metadata?type=output&name=xxx.png&subfolder=yyy - 获取单个文件元数据。"""
        params = request.rel_url.query
        dir_type = params.get("type", "output")
        name = params.get("name", "")
        subfolder = params.get("subfolder", "")
        if not name:
            return web.json_response({"error": "name required"}, status=400)
        try:
            data = get_metadata(dir_type, name, subfolder)
            return web.json_response(data)
        except Exception as exc:
            _logger.exception("get_file_metadata failed")
            return web.json_response({"error": str(exc)}, status=500)

    async def delete_file_handler(request: web.Request) -> web.Response:
        """POST /mav/delete - 删除指定文件。请求体 JSON: {type, name, subfolder?}。"""
        try:
            body = await request.json()
        except json.JSONDecodeError:
            return web.json_response({"error": "invalid json"}, status=400)
        dir_type = body.get("type", "")
        name = body.get("name", "")
        subfolder = body.get("subfolder", "")
        if not name or dir_type not in ("output", "input"):
            return web.json_response({"error": "invalid params"}, status=400)
        try:
            ok = delete_file(dir_type, name, subfolder)
            if ok:
                return web.json_response({"success": True})
            return web.json_response({"error": "delete failed"}, status=404)
        except Exception as exc:
            _logger.exception("delete_file failed")
            return web.json_response({"error": str(exc)}, status=500)

    # 直接加到 app.router（UrlDispatcher），立即生效
    app.router.add_route("GET", f"{_PREFIX}/files/{{type}}", list_files)
    app.router.add_route("GET", f"{_PREFIX}/metadata", get_file_metadata)
    app.router.add_route("POST", f"{_PREFIX}/delete", delete_file_handler)
    _logger.info("MAV routes registered under %s", _PREFIX)
