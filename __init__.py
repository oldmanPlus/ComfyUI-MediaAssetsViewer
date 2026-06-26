"""
ComfyUI-MediaAssetsViewer
本地媒体资产浏览器插件，提供与原生媒体资产相同的 UI 体验，
但已生成目录可查看所有历史数据（扫描磁盘而非内存历史记录）。
"""

from __future__ import annotations

import logging
import sys
from pathlib import Path

NODE_CLASS_MAPPINGS = {}
NODE_DISPLAY_NAME_MAPPINGS = {}

_logger = logging.getLogger("media_assets_viewer")

root = Path(__file__).resolve().parent

_dist = root / "dist"
# WEB_DIRECTORY 必须是相对于模块的路径（官方规范），
# ComfyUI 会自动拼接 custom_nodes/<节点名>/ 前缀来 serve .js 文件。
WEB_DIRECTORY = "./dist"
if not (_dist / "entry.js").is_file():
    _logger.warning(
        "MediaAssetsViewer 前端构建产物缺失：%s。请先在 ui/ 目录运行 npm run build。",
        _dist / "entry.js",
    )

_root_str = str(root)
if _root_str not in sys.path:
    sys.path.append(_root_str)


def init_prompt_server() -> None:
    """向后端 PromptServer 注册路由。

    直接往 PromptServer.instance.app.router（UrlDispatcher）加路由，立即生效。
    注意：不能用 PromptServer.instance.routes（RouteTableDef 类属性），因为它
    需要 app.add_routes() 才会应用，custom_node 加载时该时机已过，会导致 404。
    """
    try:
        from server import PromptServer  # type: ignore
        from mav_backend.routes import register_routes

        prompt_server = PromptServer.instance
        app = getattr(prompt_server, "app", None)
        if app is None:
            _logger.warning("PromptServer.app 尚未就绪，路由未挂载")
            return
        register_routes(app)
        _logger.info("MediaAssetsViewer 路由已注册")
    except Exception:
        _logger.exception("MediaAssetsViewer 路由注册失败")


try:
    init_prompt_server()
except Exception:
    _logger.exception("MediaAssetsViewer 初始化失败")

__all__ = [
    "NODE_CLASS_MAPPINGS",
    "NODE_DISPLAY_NAME_MAPPINGS",
    "WEB_DIRECTORY",
]
