<template>
  <div class="mav-grid-scroll" @scroll="onScroll" ref="scrollEl">
    <!-- 虚拟滚动：用 spacer 撑开总高度，只渲染可视区域+缓冲区 -->
    <div
      class="mav-grid-spacer"
      :style="{ height: totalHeight + 'px', position: 'relative' }"
    >
      <div
        class="mav-grid-inner"
        :style="{ transform: `translateY(${offsetY}px)`, position: 'absolute', top: 0, left: 0, right: 0 }"
      >
        <AssetCard
          v-for="asset in visibleAssets"
          :key="`${asset.type}|${asset.subfolder}|${asset.name}`"
          :asset="asset"
          :selected="isSelected(asset)"
          @click="onCardClick(asset, $event)"
          @context-menu="(a, x, y) => $emit('context-menu', a, x, y)"
          @dblclick="(a) => $emit('dblclick', a)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import type { ScannedFile } from "../types";
import AssetCard from "./AssetCard.vue";
import { useVirtualScroll } from "../composables/useVirtualScroll";

const props = defineProps<{
  assets: ScannedFile[];
  isSelected: (a: ScannedFile) => boolean;
}>();

const emit = defineEmits<{
  (e: "click", asset: ScannedFile, ev: MouseEvent, isCtrl: boolean, isShift: boolean): void;
  (e: "context-menu", asset: ScannedFile, x: number, y: number): void;
  (e: "dblclick", asset: ScannedFile): void;
}>();

const scrollEl = ref<HTMLElement | null>(null);
const containerHeight = ref(600);
// 卡片最小宽度，与 styles.css 的 --mav-card-min 一致
const CARD_MIN = 200;
const GAP = 8;
const ITEMS_PER_ROW = ref(4);
const ROW_HEIGHT = ref(220);

// 卡片非图片部分固定高度：padding(6+6) + gap(6+6) + 文件名(16) + 元信息(14) ≈ 54px
const CARD_TEXT_HEIGHT = 54;

// 计算每行项目数和行高（响应式）
function updateItemsPerRow(): void {
  if (!scrollEl.value) return;
  const width = scrollEl.value.clientWidth - 16; // 减去 padding
  // 与 styles.css 的 --mav-card-min 一致：minmax(200px, 1fr)
  const perRow = Math.max(1, Math.floor((width + GAP) / (CARD_MIN + GAP)));
  ITEMS_PER_ROW.value = perRow;
  // 行高 = 图片高度(=卡片宽度) + 文字区域 + gap
  const actualCardW = (width - (perRow - 1) * GAP) / perRow;
  ROW_HEIGHT.value = actualCardW + CARD_TEXT_HEIGHT + GAP;
}

const {
  totalHeight,
  startIndex,
  endIndex,
  offsetY,
  onScroll,
} = useVirtualScroll(
  computed(() => props.assets.length),
  {
    containerHeight,
    rowHeight: ROW_HEIGHT,
    itemsPerRow: ITEMS_PER_ROW,
    bufferRows: 4,
  }
);

const visibleAssets = computed(() => props.assets.slice(startIndex.value, endIndex.value));

function onCardClick(asset: ScannedFile, ev: MouseEvent): void {
  emit("click", asset, ev, ev.ctrlKey || ev.metaKey, ev.shiftKey);
}

let resizeObserver: ResizeObserver | null = null;
onMounted(() => {
  updateItemsPerRow();
  if (scrollEl.value) {
    containerHeight.value = scrollEl.value.clientHeight;
    resizeObserver = new ResizeObserver(() => {
      updateItemsPerRow();
      containerHeight.value = scrollEl.value?.clientHeight || 600;
    });
    resizeObserver.observe(scrollEl.value);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});

// 当项目数变化时重置滚动位置
watch(
  () => props.assets.length,
  () => {
    if (scrollEl.value) scrollEl.value.scrollTop = 0;
  }
);
</script>
