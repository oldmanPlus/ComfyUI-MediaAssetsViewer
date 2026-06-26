"""扫描 output/input 目录，返回文件列表。"""

from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

try:
    from folder_paths import get_input_directory, get_output_directory
except Exception:  # pragma: no cover - ComfyUI 未加载时回退
    _COMFY_ROOT = Path(__file__).resolve().parents[1]
    get_output_directory = lambda: str(_COMFY_ROOT / "output")  # noqa: E731
    get_input_directory = lambda: str(_COMFY_ROOT / "input")  # noqa: E731


MEDIA_EXTENSIONS = {
    "image": {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tiff"},
    "video": {".mp4", ".webm", ".mov", ".avi", ".mkv", ".m4v"},
    "audio": {".mp3", ".wav", ".ogg", ".flac", ".m4a", ".aac"},
}

ALL_MEDIA_EXTENSIONS = set()
for _exts in MEDIA_EXTENSIONS.values():
    ALL_MEDIA_EXTENSIONS.update(_exts)


@dataclass
class ScannedFile:
    name: str
    subfolder: str
    type: str  # 'output' | 'input'
    size: int
    mtime: float
    media_kind: str  # 'image' | 'video' | 'audio' | 'other'


def get_media_kind(filename: str) -> str:
    ext = Path(filename).suffix.lower()
    for kind, exts in MEDIA_EXTENSIONS.items():
        if ext in exts:
            return kind
    return "other"


def scan_directory(dir_type: str) -> list[ScannedFile]:
    """扫描指定类型目录，返回所有媒体文件信息。

    Args:
        dir_type: 'output' 或 'input'
    """
    if dir_type == "output":
        root = Path(get_output_directory())
    elif dir_type == "input":
        root = Path(get_input_directory())
    else:
        return []

    if not root.exists():
        return []

    results: list[ScannedFile] = []
    for path in root.rglob("*"):
        if not path.is_file():
            continue
        if path.name.startswith("."):
            continue
        ext = path.suffix.lower()
        if ext not in ALL_MEDIA_EXTENSIONS:
            continue
        try:
            stat = path.stat()
        except OSError:
            continue
        rel = path.relative_to(root)
        subfolder = str(rel.parent) if str(rel.parent) != "." else ""
        results.append(
            ScannedFile(
                name=path.name,
                subfolder=subfolder,
                type=dir_type,
                size=stat.st_size,
                mtime=stat.st_mtime,
                media_kind=get_media_kind(path.name),
            )
        )

    results.sort(key=lambda x: x.mtime, reverse=True)
    return results


def scanned_to_dict(f: ScannedFile) -> dict:
    return {
        "name": f.name,
        "subfolder": f.subfolder,
        "type": f.type,
        "size": f.size,
        "mtime": int(f.mtime * 1000),
        "media_kind": f.media_kind,
    }


def delete_file(dir_type: str, name: str, subfolder: str = "") -> bool:
    """删除指定文件，返回是否成功。"""
    if dir_type == "output":
        root = Path(get_output_directory())
    elif dir_type == "input":
        root = Path(get_input_directory())
    else:
        return False

    target = (root / subfolder / name).resolve() if subfolder else (root / name).resolve()
    try:
        root_resolved = root.resolve()
        # 用 is_relative_to 严格判断归属，避免 startswith 被兄弟目录名绕过
        # （如 subfolder="../output_evil" 会 resolve 成 /app/output_evil，
        #  startswith("/app/output") 误判为 True）
        if not target.is_relative_to(root_resolved):
            return False
    except Exception:
        return False
    if not target.is_file():
        return False
    try:
        target.unlink()
        return True
    except OSError:
        return False
