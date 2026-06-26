/**
 * 资产操作 composable：下载、删除、工作流操作、复制文件名。
 */

import { useAssets } from "./useAssets";
import { t } from "../i18n";
import type { ScannedFile } from "../types";

/** 构造 /view 预览 URL */
export function buildPreviewUrl(asset: ScannedFile): string {
  const params = new URLSearchParams({
    filename: asset.name,
    type: asset.type,
    subfolder: asset.subfolder || "",
  });
  return `/view?${params}`;
}

/** 构造下载 URL（带 download=1 触发浏览器下载） */
export function buildDownloadUrl(asset: ScannedFile): string {
  return `${buildPreviewUrl(asset)}&download=1`;
}

/** 字节数格式化 */
export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

/** 时间格式化 */
export function formatTime(mtime: number): string {
  const d = new Date(mtime);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export function useAssetActions(toastFn?: (msg: string) => void) {
  const { fetchMetadata, deleteFile, clearCache } = useAssets();

  function toast(msg: string) {
    if (toastFn) toastFn(msg);
    else console.log("[MAV]", msg);
  }

  async function download(asset: ScannedFile): Promise<void> {
    try {
      const a = document.createElement("a");
      a.href = buildDownloadUrl(asset);
      a.download = asset.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast(t("toast.downloaded", { name: asset.name }));
    } catch (e) {
      console.error("[MAV] download failed", e);
    }
  }

  async function remove(asset: ScannedFile): Promise<boolean> {
    const ok = await deleteFile(asset.type, asset.name, asset.subfolder);
    if (ok) {
      toast(t("toast.deleted", { name: asset.name }));
      clearCache(asset.type);
    } else {
      toast(t("toast.deleteFailed", { name: asset.name }));
    }
    return ok;
  }

  async function copyFilename(asset: ScannedFile): Promise<void> {
    try {
      await navigator.clipboard.writeText(asset.name);
      toast(t("toast.copied"));
    } catch {
      // 回退方案
      const ta = document.createElement("textarea");
      ta.value = asset.name;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        toast(t("toast.copied"));
      } catch {
        /* ignore */
      }
      ta.remove();
    }
  }

  async function getWorkflow(asset: ScannedFile): Promise<Record<string, unknown> | null> {
    const meta = await fetchMetadata(asset.type, asset.name, asset.subfolder);
    if (!meta.has_workflow || !meta.workflow) {
      toast(t("toast.noWorkflow"));
      return null;
    }
    return meta.workflow;
  }

  /** 导出工作流为 JSON 文件 */
  async function exportWorkflow(asset: ScannedFile): Promise<void> {
    const wf = await getWorkflow(asset);
    if (!wf) return;
    const blob = new Blob([JSON.stringify(wf, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = asset.name.replace(/\.[^.]+$/, "") + "_workflow.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast(t("toast.workflowExported"));
  }

  /** 打开工作流到画布（调用 ComfyUI 的 loadGraphData） */
  async function openWorkflow(asset: ScannedFile): Promise<void> {
    const wf = await getWorkflow(asset);
    if (!wf) return;
    try {
      // ComfyUI 启动后会挂载 window.app（GraphCanvas.vue 中设置）
      // 不用 import("../../scripts/app.js")，因为本文件在 src/composables/ 子目录，
      // Rollup 会把相对路径改写导致部署后 404
      const comfyApp = (window as any).app;
      if (comfyApp?.loadGraphData) {
        comfyApp.loadGraphData(wf);
        toast(t("toast.workflowOpened"));
      } else {
        console.warn("[MAV] window.app 不可用");
      }
    } catch (e) {
      console.error("[MAV] openWorkflow failed", e);
    }
  }

  /** 添加加载节点到画布并自动填充该资产 */
  async function addToWorkflow(asset: ScannedFile): Promise<void> {
    try {
      const comfyApp = (window as any).app;
      const nodeClass =
        asset.media_kind === "video"
          ? "VHS_LoadVideo"
          : asset.media_kind === "audio"
          ? "PreviewAudio"
          : "LoadImage";
      if (comfyApp?.addNodeOnGraph) {
        const node = comfyApp.addNodeOnGraph(nodeClass);
        if (node && node.widgets) {
          // 尝试设置 widget 值
          const nameWidget = node.widgets.find(
            (w: any) =>
              w.name === "image" || w.name === "video" || w.name === "audio" || w.name === "filename"
          );
          if (nameWidget) nameWidget.value = asset.name;
        }
      }
    } catch (e) {
      console.error("[MAV] addToWorkflow failed", e);
    }
  }

  return {
    download,
    remove,
    copyFilename,
    exportWorkflow,
    openWorkflow,
    addToWorkflow,
    getWorkflow,
  };
}
