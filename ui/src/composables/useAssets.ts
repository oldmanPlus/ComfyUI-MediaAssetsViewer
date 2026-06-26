/**
 * 数据获取 composable：调用后端 API 获取文件列表和元数据。
 */

import { ref } from "vue";
import type { ScannedFile, AssetMetadata, DirType } from "../types";

const API_BASE = "/mav";

/** 简单内存缓存，避免频繁切换 tab 时重复请求 */
const _cache = new Map<DirType, { files: ScannedFile[]; ts: number }>();
// 延长缓存到 60 秒，避免短时间反复请求造成卡顿
const CACHE_TTL = 60000; // 60 秒

export function useAssets() {
  const files = ref<ScannedFile[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchFiles(dirType: DirType, force = false): Promise<void> {
    // 有缓存时先立即占位（不显示骨架屏），再静默刷新
    const cached = _cache.get(dirType);
    const cacheValid = cached && Date.now() - cached.ts < CACHE_TTL;
    if (cached) {
      files.value = cached.files;
    }
    // 缓存有效且非强制刷新：直接返回，不显示 loading
    if (cacheValid && !force) {
      loading.value = false;
      return;
    }
    // 无缓存时才显示骨架屏
    if (!cached) loading.value = true;
    error.value = null;
    try {
      const resp = await fetch(`${API_BASE}/files/${dirType}`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = (await resp.json()) as ScannedFile[];
      _cache.set(dirType, { files: data, ts: Date.now() });
      files.value = data;
    } catch (e: any) {
      error.value = e?.message || String(e);
      if (!cached) files.value = [];
    } finally {
      loading.value = false;
    }
  }

  async function fetchMetadata(
    dirType: DirType,
    name: string,
    subfolder: string = ""
  ): Promise<AssetMetadata> {
    const params = new URLSearchParams({ type: dirType, name, subfolder });
    const resp = await fetch(`${API_BASE}/metadata?${params}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return (await resp.json()) as AssetMetadata;
  }

  async function deleteFile(
    dirType: DirType,
    name: string,
    subfolder: string = ""
  ): Promise<boolean> {
    const resp = await fetch(`${API_BASE}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: dirType, name, subfolder }),
    });
    if (!resp.ok) return false;
    const data = await resp.json();
    return !!data.success;
  }

  function clearCache(dirType?: DirType): void {
    if (dirType) _cache.delete(dirType);
    else _cache.clear();
  }

  return {
    files,
    loading,
    error,
    fetchFiles,
    fetchMetadata,
    deleteFile,
    clearCache,
  };
}
