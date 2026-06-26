<template>
  <div
    class="mav-card"
    :class="{ selected }"
    draggable="true"
    @dragstart="onDragStart"
    @click="onClick"
    @contextmenu.prevent="onContextMenu"
    @dblclick="onDblClick"
    :title="asset.name"
  >
    <!-- 图片区（aspect-square 正方形） -->
    <div class="mav-card-thumb">
      <img
        v-if="asset.media_kind === 'image'"
        :src="previewUrl"
        loading="lazy"
        @error="onImgError"
        @load="onImgLoad"
      />
      <VideoThumb
        v-else-if="asset.media_kind === 'video'"
        :src="videoPreviewUrl"
      />
      <AudioThumb
        v-else-if="asset.media_kind === 'audio'"
        :src="previewUrl"
      />
      <div v-else class="mav-card-other">
        <span>{{ extIcon }}</span>
      </div>

      <!-- 媒体种类角标（左上角，缩小，不同类型不同颜色） -->
      <div class="mav-card-kind" :class="kindClass">{{ kindIcon }}</div>

      <!-- 图片分辨率角标（右下角，阴影更淡，视频分辨率由 VideoThumb 内部显示） -->
      <div v-if="asset.media_kind === 'image' && imgResolution" class="mav-card-resolution">
        {{ imgResolution }}
      </div>
    </div>

    <!-- 文件名（常驻显示） -->
    <div class="mav-card-name">{{ asset.name }}</div>
    <!-- 元信息：左 size，右 date（两端对齐，参考 preview.html） -->
    <div class="mav-card-meta">
      <span class="mav-meta-size">{{ sizeText }}</span>
      <span class="mav-meta-date">{{ dateText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { ScannedFile } from "../types";
import { MIME_ASSET_INFO } from "../types";
import { buildPreviewUrl, formatSize } from "../composables/useAssetActions";
import AudioThumb from "./AudioThumb.vue";
import VideoThumb from "./VideoThumb.vue";

const props = defineProps<{
  asset: ScannedFile;
  selected?: boolean;
}>();

const emit = defineEmits<{
  (e: "click", asset: ScannedFile, ev: MouseEvent): void;
  (e: "context-menu", asset: ScannedFile, x: number, y: number): void;
  (e: "dblclick", asset: ScannedFile): void;
}>();

const previewUrl = computed(() => buildPreviewUrl(props.asset));
// 视频缩略图：加 #t=0.1 让浏览器显示 0.1s 处的画面作为预览帧
const videoPreviewUrl = computed(() => buildPreviewUrl(props.asset) + "#t=0.1");
const sizeText = computed(() => formatSize(props.asset.size));

const dateText = computed(() => {
  if (!props.asset.mtime) return "";
  // 后端返回的是毫秒时间戳，无需再 *1000
  const d = new Date(props.asset.mtime);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
});

const kindIcon = computed(() => {
  switch (props.asset.media_kind) {
    case "image": return "IMG";
    case "video": return "VID";
    case "audio": return "AUD";
    default: return "FILE";
  }
});

// 角标样式类：不同类型不同颜色，更醒目
const kindClass = computed(() => {
  switch (props.asset.media_kind) {
    case "image": return "kind-img";
    case "video": return "kind-vid";
    case "audio": return "kind-aud";
    default: return "kind-file";
  }
});

const extIcon = computed(() => {
  const ext = props.asset.name.split(".").pop()?.toUpperCase() || "?";
  return ext.slice(0, 4);
});

function onDragStart(e: DragEvent): void {
  if (!e.dataTransfer) return;
  const payload = JSON.stringify({
    filename: props.asset.name,
    subfolder: props.asset.subfolder || "",
    type: props.asset.type,
  });
  e.dataTransfer.setData(MIME_ASSET_INFO, payload);
  e.dataTransfer.setData("text/uri-list", previewUrl.value);
  e.dataTransfer.effectAllowed = "copyMove";
}

function onClick(ev: MouseEvent): void {
  emit("click", props.asset, ev);
}

function onContextMenu(ev: MouseEvent): void {
  emit("context-menu", props.asset, ev.clientX, ev.clientY);
}

function onDblClick(): void {
  emit("dblclick", props.asset);
}

function onImgError(e: Event): void {
  (e.target as HTMLElement).style.display = "none";
}

// 图片分辨率：img 加载后从 naturalWidth/Height 获取
const imgResolution = ref("");
function onImgLoad(e: Event): void {
  const img = e.target as HTMLImageElement;
  if (img.naturalWidth && img.naturalHeight) {
    imgResolution.value = `${img.naturalWidth}×${img.naturalHeight}`;
  }
}
</script>

<style scoped>
/* 卡片：三段纵向（图片 + 文件名 + 元信息） */
.mav-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px;
  border-radius: 8px;
  background: var(--input-bg-color, #2a2a2a);
  cursor: pointer;
  border: 1px solid transparent;
  transition: border-color 0.15s;
  user-select: none;
}
.mav-card:hover {
  border-color: var(--primary-color, #4a9eff);
}
.mav-card.selected {
  border-color: var(--primary-color, #4a9eff);
  box-shadow: 0 0 0 2px var(--primary-color, #4a9eff);
}

/* 图片区：aspect-square 正方形 */
.mav-card-thumb {
  aspect-ratio: 1;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  background: #1a1a1a;
  position: relative;
}
.mav-card-thumb img,
.mav-card-thumb video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.mav-card-other {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--input-text-color-muted, #888);
  font-size: 14px;
  background: var(--input-bg-color, #2a2a2a);
}

/* 媒体种类角标：左上角，缩小，不同类型不同颜色 */
.mav-card-kind {
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 9px;
  padding: 2px 5px;
  border-radius: 4px;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
}
/* 图片：青绿色 */
.mav-card-kind.kind-img {
  background: rgba(34, 197, 94, 0.9);
}
/* 视频：红色 */
.mav-card-kind.kind-vid {
  background: rgba(239, 68, 68, 0.9);
}
/* 音频：紫色 */
.mav-card-kind.kind-aud {
  background: rgba(168, 85, 247, 0.9);
}
/* 其他：灰色 */
.mav-card-kind.kind-file {
  background: rgba(100, 116, 139, 0.9);
}

/* 文件名 */
.mav-card-name {
  font-size: 12px;
  color: var(--fg-color, #e0e0e0);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}
/* 元信息：左 size 右 date，两端对齐 */
.mav-card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--input-text-color-muted, #888);
  line-height: 1.3;
}
.mav-meta-size {
  flex-shrink: 0;
}
.mav-meta-date {
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 图片分辨率角标（右下角，阴影更淡） */
.mav-card-resolution {
  position: absolute;
  bottom: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
  font-variant-numeric: tabular-nums;
  pointer-events: none;
}
</style>
