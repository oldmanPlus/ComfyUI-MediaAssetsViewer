/**
 * 简单虚拟滚动 composable。
 *
 * 只渲染可视区域 + 上下缓冲区的卡片，避免大量文件时卡顿。
 * 适用于固定行高的网格/列表。
 *
 * 关键：itemsPerRow 是 Ref，容器宽度变化时能重新计算，
 * 否则 totalHeight 会算错导致滚动条异常。
 */

import { ref, computed, type Ref } from "vue";

interface VirtualScrollOptions {
  /** 容器高度（px） */
  containerHeight: Ref<number>;
  /** 每行高度（px，响应式：容器宽度变化时卡片宽度会变） */
  rowHeight: Ref<number>;
  /** 每行项目数（响应式，容器宽度变化时会更新） */
  itemsPerRow: Ref<number>;
  /** 缓冲区行数 */
  bufferRows?: number;
}

export function useVirtualScroll(
  totalCount: Ref<number>,
  options: VirtualScrollOptions
) {
  const scrollTop = ref(0);
  const bufferRows = options.bufferRows ?? 4;

  const totalRows = computed(() =>
    Math.ceil(totalCount.value / Math.max(1, options.itemsPerRow.value))
  );
  const totalHeight = computed(() => totalRows.value * options.rowHeight.value);

  const startRow = computed(() => {
    const r = Math.floor(scrollTop.value / options.rowHeight.value) - bufferRows;
    return Math.max(0, r);
  });

  const visibleRows = computed(() => {
    const rowsInView = Math.ceil(options.containerHeight.value / options.rowHeight.value) + bufferRows * 2;
    return Math.min(totalRows.value - startRow.value, rowsInView);
  });

  const endIndex = computed(() =>
    Math.min(totalCount.value, (startRow.value + visibleRows.value) * options.itemsPerRow.value)
  );

  const startIndex = computed(() => startRow.value * options.itemsPerRow.value);

  const offsetY = computed(() => startRow.value * options.rowHeight.value);

  function onScroll(e: Event): void {
    const target = e.target as HTMLElement;
    scrollTop.value = target.scrollTop;
  }

  return {
    totalHeight,
    startIndex,
    endIndex,
    offsetY,
    onScroll,
  };
}
