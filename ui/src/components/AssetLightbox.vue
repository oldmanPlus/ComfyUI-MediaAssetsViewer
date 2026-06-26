<template>
  <div class="mav-lightbox-backdrop" @click.self="onClose" tabindex="0" ref="rootEl">
    <button class="mav-lightbox-close" @click="onClose" :title="t('lightbox.close')">×</button>
    <button
      v-if="hasPrev"
      class="mav-lightbox-nav prev"
      @click="onPrev"
      :title="t('lightbox.prev')"
    >‹</button>
    <button
      v-if="hasNext"
      class="mav-lightbox-nav next"
      @click="onNext"
      :title="t('lightbox.next')"
    >›</button>

    <div class="mav-lightbox-content">
      <img
        v-if="asset.media_kind === 'image'"
        class="mav-lightbox-media"
        :src="previewUrl"
      />
      <video
        v-else-if="asset.media_kind === 'video'"
        class="mav-lightbox-media"
        :src="previewUrl"
        controls
        autoplay
      />
      <audio
        v-else-if="asset.media_kind === 'audio'"
        class="mav-lightbox-media"
        :src="previewUrl"
        controls
        autoplay
      />
      <div v-else class="mav-lightbox-media mav-lightbox-other">
        <p>{{ asset.name }}</p>
      </div>

      <div class="mav-lightbox-info">
        <div>{{ asset.name }}</div>
        <div style="opacity:0.7;font-size:12px">
          {{ formatSize(asset.size) }} · {{ formatTime(asset.mtime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import type { ScannedFile } from "../types";
import { t } from "../i18n";
import { buildPreviewUrl, formatSize, formatTime } from "../composables/useAssetActions";

const props = defineProps<{
  asset: ScannedFile;
  list: ScannedFile[];
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "navigate", asset: ScannedFile): void;
}>();

const rootEl = ref<HTMLElement | null>(null);
const previewUrl = computed(() => buildPreviewUrl(props.asset));

const currentIndex = computed(() => props.list.findIndex(a => a === props.asset));
const hasPrev = computed(() => currentIndex.value > 0);
const hasNext = computed(() => currentIndex.value >= 0 && currentIndex.value < props.list.length - 1);

function onClose(): void { emit("close"); }
function onPrev(): void {
  if (hasPrev.value) emit("navigate", props.list[currentIndex.value - 1]);
}
function onNext(): void {
  if (hasNext.value) emit("navigate", props.list[currentIndex.value + 1]);
}
function onKeydown(e: KeyboardEvent): void {
  if (e.key === "Escape") onClose();
  else if (e.key === "ArrowLeft") onPrev();
  else if (e.key === "ArrowRight") onNext();
}

onMounted(() => {
  rootEl.value?.focus();
  document.addEventListener("keydown", onKeydown);
});
onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
});

// 当 asset 变化时重新聚焦（导航后保持键盘响应）
watch(() => props.asset, () => {
  rootEl.value?.focus();
});
</script>

<style scoped>
.mav-lightbox-other {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  min-height: 200px;
}
.mav-lightbox-backdrop {
  outline: none;
}
</style>
