/**
 * 多选状态管理 composable。
 */

import { ref, computed } from "vue";
import type { ScannedFile } from "../types";

/** 资产唯一标识（用于去重比较） */
export function assetKey(a: ScannedFile): string {
  return `${a.type}|${a.subfolder}|${a.name}`;
}

export function useAssetSelection() {
  const selectedKeys = ref<Set<string>>(new Set());
  const selectedAssets = ref<ScannedFile[]>([]);
  const lastSelected = ref<ScannedFile | null>(null);

  const count = computed(() => selectedKeys.value.size);
  const isActive = computed(() => count.value > 0);

  function isSelected(asset: ScannedFile): boolean {
    return selectedKeys.value.has(assetKey(asset));
  }

  function select(asset: ScannedFile): void {
    const k = assetKey(asset);
    if (!selectedKeys.value.has(k)) {
      selectedKeys.value.add(k);
      selectedAssets.value.push(asset);
    }
    lastSelected.value = asset;
  }

  function deselect(asset: ScannedFile): void {
    const k = assetKey(asset);
    if (selectedKeys.value.has(k)) {
      selectedKeys.value.delete(k);
      selectedAssets.value = selectedAssets.value.filter((a) => assetKey(a) !== k);
    }
  }

  function toggle(asset: ScannedFile): void {
    if (isSelected(asset)) deselect(asset);
    else select(asset);
  }

  /**
   * 范围选择：从 lastSelected 到当前 asset（基于 visibleList 顺序）
   */
  function rangeSelect(asset: ScannedFile, visibleList: ScannedFile[]): void {
    if (!lastSelected.value) {
      select(asset);
      return;
    }
    const startIdx = visibleList.findIndex((a) => assetKey(a) === assetKey(lastSelected.value!));
    const endIdx = visibleList.findIndex((a) => assetKey(a) === assetKey(asset));
    if (startIdx === -1 || endIdx === -1) {
      select(asset);
      return;
    }
    const [from, to] = startIdx <= endIdx ? [startIdx, endIdx] : [endIdx, startIdx];
    for (let i = from; i <= to; i++) {
      select(visibleList[i]);
    }
    lastSelected.value = asset;
  }

  function clear(): void {
    selectedKeys.value.clear();
    selectedAssets.value = [];
    lastSelected.value = null;
  }

  return {
    selectedKeys,
    selectedAssets,
    count,
    isActive,
    isSelected,
    select,
    deselect,
    toggle,
    rangeSelect,
    clear,
  };
}
