<template>
  <div class="mav-list-scroll" @scroll="onScroll" ref="scrollEl">
    <div :style="{ height: totalHeight + 'px', position: 'relative' }">
      <div
        :style="{ transform: `translateY(${offsetY}px)`, position: 'absolute', top: 0, left: 0, right: 0 }"
      >
        <div
          v-for="asset in visibleAssets"
          :key="`${asset.type}|${asset.subfolder}|${asset.name}`"
          class="mav-list-item"
          :class="{ selected: isSelected(asset) }"
          @click="onClick(asset, $event)"
          @contextmenu.prevent="$emit('context-menu', asset, $event.clientX, $event.clientY)"
          @dblclick="$emit('dblclick', asset)"
          draggable="true"
          @dragstart="onDragStart($event, asset)"
        >
          <!-- 缩略图容器（支持图片/视频/音频/其他） -->
          <div class="mav-list-thumb-wrap">
            <img
              v-if="asset.media_kind === 'image'"
              class="mav-list-thumb"
              :src="buildPreviewUrl(asset)"
              loading="lazy"
              @load="onImgLoad($event, asset)"
            />
            <VideoThumb
              v-else-if="asset.media_kind === 'video'"
              :src="buildPreviewUrl(asset) + '#t=0.1'"
            />
            <AudioThumb
              v-else-if="asset.media_kind === 'audio'"
              :src="buildPreviewUrl(asset)"
            />
            <div v-else class="mav-list-thumb mav-list-thumb-placeholder">
              {{ kindIcon(asset) }}
            </div>

            <!-- 媒体类型角标（左上角） -->
            <div class="mav-list-kind" :class="kindClass(asset)">{{ kindLabel(asset) }}</div>
          </div>

          <!-- 信息 -->
          <div class="mav-list-info">
            <div class="mav-list-name">{{ asset.name }}</div>
            <div class="mav-list-meta">
              <span>{{ formatSize(asset.size) }}</span>
              <span>{{ formatDate(asset.mtime) }}</span>
              <span v-if="resolutionMap[`${asset.type}|${asset.subfolder}|${asset.name}`]" class="mav-list-res">
                {{ resolutionMap[`${asset.type}|${asset.subfolder}|${asset.name}`] }}
              </span>
              <span v-if="asset.subfolder">{{ asset.subfolder }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, reactive } from "vue";
import type { ScannedFile } from "../types";
import { MIME_ASSET_INFO } from "../types";
import { useVirtualScroll } from "../composables/useVirtualScroll";
import { buildPreviewUrl, formatSize, formatTime } from "../composables/useAssetActions";
import VideoThumb from "./VideoThumb.vue";
import AudioThumb from "./AudioThumb.vue";

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
// 增大行高：缩略图 80px + padding
const ROW_HEIGHT = ref(92);
const ITEMS_PER_ROW = ref(1);

// 图片分辨率缓存：key = "type|subfolder|name"，value = "1920×1080"
const resolutionMap = reactive<Record<string, string>>({});

const { totalHeight, startIndex, endIndex, offsetY, onScroll } = useVirtualScroll(
  computed(() => props.assets.length),
  {
    containerHeight,
    rowHeight: ROW_HEIGHT,
    itemsPerRow: ITEMS_PER_ROW,
    bufferRows: 6,
  }
);

const visibleAssets = computed(() => props.assets.slice(startIndex.value, endIndex.value));

function kindIcon(a: ScannedFile): string {
  switch (a.media_kind) {
    case "image": return "🖼";
    case "video": return "▶";
    case "audio": return "♪";
    default: return "📄";
  }
}

function kindLabel(a: ScannedFile): string {
  switch (a.media_kind) {
    case "image": return "IMG";
    case "video": return "VID";
    case "audio": return "AUD";
    default: return "FILE";
  }
}

function kindClass(a: ScannedFile): string {
  switch (a.media_kind) {
    case "image": return "kind-img";
    case "video": return "kind-vid";
    case "audio": return "kind-aud";
    default: return "kind-file";
  }
}

function formatDate(ms: number): string {
  return formatTime(ms);
}

// 图片加载后提取分辨率
function onImgLoad(e: Event, asset: ScannedFile): void {
  const img = e.target as HTMLImageElement;
  if (img.naturalWidth && img.naturalHeight) {
    resolutionMap[`${asset.type}|${asset.subfolder}|${asset.name}`] = `${img.naturalWidth}×${img.naturalHeight}`;
  }
}

function onClick(asset: ScannedFile, ev: MouseEvent): void {
  emit("click", asset, ev, ev.ctrlKey || ev.metaKey, ev.shiftKey);
}

function onDragStart(e: DragEvent, asset: ScannedFile): void {
  if (!e.dataTransfer) return;
  e.dataTransfer.setData(
    MIME_ASSET_INFO,
    JSON.stringify({ filename: asset.name, subfolder: asset.subfolder || "", type: asset.type })
  );
  e.dataTransfer.setData("text/uri-list", buildPreviewUrl(asset));
  e.dataTransfer.effectAllowed = "copyMove";
}

let resizeObserver: ResizeObserver | null = null;
onMounted(() => {
  if (scrollEl.value) {
    resizeObserver = new ResizeObserver(() => {
      containerHeight.value = scrollEl.value?.clientHeight || 600;
    });
    resizeObserver.observe(scrollEl.value);
    containerHeight.value = scrollEl.value.clientHeight;
  }
});
onUnmounted(() => {
  resizeObserver?.disconnect();
});
</script>

<style scoped>
/* 缩略图容器：相对定位，承载角标 */
.mav-list-thumb-wrap {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 6px;
  overflow: hidden;
  background: var(--input-bg-color, #2a2a2a);
}
.mav-list-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.mav-list-thumb-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--input-text-color-muted, #888);
}

/* 媒体类型角标（左上角，缩小） */
.mav-list-kind {
  position: absolute;
  top: 3px;
  left: 3px;
  font-size: 8px;
  padding: 1px 4px;
  border-radius: 3px;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}
.mav-list-kind.kind-img { background: rgba(34, 197, 94, 0.9); }
.mav-list-kind.kind-vid { background: rgba(239, 68, 68, 0.9); }
.mav-list-kind.kind-aud { background: rgba(168, 85, 247, 0.9); }
.mav-list-kind.kind-file { background: rgba(100, 116, 139, 0.9); }

/* 分辨率在元信息中显示 */
.mav-list-res {
  color: var(--input-text-color, #c0c0c0);
  font-variant-numeric: tabular-nums;
}
</style>
