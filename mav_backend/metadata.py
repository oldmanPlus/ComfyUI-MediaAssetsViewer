"""从 PNG 图片提取嵌入的工作流元数据。

ComfyUI 在保存 PNG 输出时，会在 PNG 的 text 块中嵌入两个字段：
- 'prompt': API 格式的工作流（按节点 ID 索引的字典）
- 'workflow': UI 格式的工作流（包含 nodes、links 等，可恢复到画布）
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Optional

try:
    from folder_paths import get_input_directory, get_output_directory
except Exception:  # pragma: no cover
    _COMFY_ROOT = Path(__file__).resolve().parents[1]
    get_output_directory = lambda: str(_COMFY_ROOT / "output")  # noqa: E731
    get_input_directory = lambda: str(_COMFY_ROOT / "input")  # noqa: E731


def _resolve_path(dir_type: str, name: str, subfolder: str = "") -> Optional[Path]:
    if dir_type == "output":
        root = Path(get_output_directory())
    elif dir_type == "input":
        root = Path(get_input_directory())
    else:
        return None
    target = (root / subfolder / name).resolve() if subfolder else (root / name).resolve()
    try:
        # 用 is_relative_to 严格判断归属，避免 startswith 被兄弟目录名绕过
        if not target.is_relative_to(root.resolve()):
            return None
    except Exception:
        return None
    return target if target.is_file() else None


def extract_png_metadata(file_path: Path) -> dict[str, Any]:
    """从 PNG 文件提取嵌入的 prompt 和 workflow JSON。

    Returns:
        {
            'prompt': dict | None,
            'workflow': dict | None,
            'has_workflow': bool,
            'model': str | None,
            'seed': int | None,
            'positive': str | None,
            'negative': str | None,
        }
    """
    result: dict[str, Any] = {
        "prompt": None,
        "workflow": None,
        "has_workflow": False,
        "model": None,
        "seed": None,
        "positive": None,
        "negative": None,
    }

    try:
        from PIL import Image
    except ImportError:
        return result

    try:
        with Image.open(file_path) as img:
            text_data = getattr(img, "text", None) or {}
    except Exception:
        return result

    if not text_data:
        return result

    if "prompt" in text_data:
        try:
            result["prompt"] = json.loads(text_data["prompt"])
            result["has_workflow"] = True
        except (json.JSONDecodeError, TypeError):
            pass

    if "workflow" in text_data:
        try:
            result["workflow"] = json.loads(text_data["workflow"])
        except (json.JSONDecodeError, TypeError):
            pass

    if isinstance(result["prompt"], dict):
        result.update(_extract_summary_fields(result["prompt"]))

    return result


def _extract_summary_fields(prompt: dict) -> dict[str, Any]:
    """从 prompt API 数据中提取摘要信息（模型、seed、提示词等）。"""
    summary: dict[str, Any] = {
        "model": None,
        "seed": None,
        "positive": None,
        "negative": None,
    }
    if not isinstance(prompt, dict):
        return summary

    for node in prompt.values():
        if not isinstance(node, dict):
            continue
        class_type = node.get("class_type", "")
        inputs = node.get("inputs", {})
        if not isinstance(inputs, dict):
            continue

        if class_type in ("CheckpointLoaderSimple", "CheckpointLoader", "UNETLoader"):
            ckpt = inputs.get("ckpt_name") or inputs.get("unet_name")
            if ckpt and not summary["model"]:
                summary["model"] = str(ckpt)

        if class_type in ("KSampler", "KSamplerAdvanced", "SamplerCustom"):
            seed = inputs.get("seed") or inputs.get("noise_seed")
            if seed is not None and summary["seed"] is None:
                try:
                    summary["seed"] = int(seed)
                except (ValueError, TypeError):
                    pass

        if class_type in ("CLIPTextEncode",):
            text = inputs.get("text")
            if text and summary["positive"] is None:
                summary["positive"] = str(text)

    return summary


def get_metadata(dir_type: str, name: str, subfolder: str = "") -> dict[str, Any]:
    """获取单个文件的元数据。"""
    file_path = _resolve_path(dir_type, name, subfolder)
    if file_path is None:
        return {"error": "file not found", "has_workflow": False}

    ext = file_path.suffix.lower()
    if ext == ".png":
        return extract_png_metadata(file_path)

    return {
        "prompt": None,
        "workflow": None,
        "has_workflow": False,
        "model": None,
        "seed": None,
        "positive": None,
        "negative": None,
        "note": "non-png files do not embed workflow metadata",
    }
