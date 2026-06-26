<template>
  <!--
    视频缩略图：自建控制条（不依赖浏览器原生 controls）
    - 暂停时：中央空心播放图标（无圆圈背景）
    - 播放时：底部控制条 [暂停] [静音] [全屏] [进度]（按钮平铺，不藏二级菜单）
    - 左下角分辨率角标
  -->
  <div
    class="mav-video-thumb"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <video
      ref="videoEl"
      :src="src"
      preload="metadata"
      loop
      playsinline
      class="mav-video-el"
      @click.stop="onVideoClick"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
    />

    <!-- 暂停时：中央空心播放三角（圆润，无圆圈背景，更大） -->
    <div v-if="!isPlaying" class="mav-video-play-overlay" @click.stop="onVideoClick">
      <svg class="mav-video-play-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 5.5 L18.5 12 L8 18.5 Z" />
      </svg>
    </div>

    <!-- 播放时：底部控制条（暂停/静音/全屏 平铺，不藏二级菜单） -->
    <div v-if="isPlaying" class="mav-video-controls" @click.stop @pointerdown.stop>
      <!-- 暂停按钮 -->
      <button class="mav-vc-btn" :title="isPlaying ? '暂停' : '播放'" @click.stop="togglePlay">
        <svg v-if="isPlaying" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
        <svg v-else viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>

      <!-- 静音按钮 -->
      <button class="mav-vc-btn" :title="muted ? '取消静音' : '静音'" @click.stop="toggleMute">
        <svg v-if="muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <line x1="23" y1="9" x2="17" y2="15"/>
          <line x1="17" y1="9" x2="23" y2="15"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
      </button>

      <!-- 全屏按钮 -->
      <button class="mav-vc-btn" title="全屏" @click.stop="toggleFullscreen">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
          <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
          <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
          <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
        </svg>
      </button>

      <!-- 进度条 -->
      <div
        ref="progressRef"
        class="mav-vc-progress"
        @click.stop="onProgressClick"
      >
        <div class="mav-vc-progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>

      <!-- 时间 -->
      <span class="mav-vc-time">{{ formattedTime }} / {{ formattedDuration }}</span>
    </div>

    <!-- 右下角分辨率角标 -->
    <div v-if="resolution" class="mav-video-resolution">{{ resolution }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  src: string;
}>();

const videoEl = ref<HTMLVideoElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);
const isHovered = ref(false);
const isPlaying = ref(false);
// 默认开启声音（不静音）
const muted = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const resolution = ref("");

function formatTime(s: number): string {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const formattedTime = computed(() => formatTime(currentTime.value));
const formattedDuration = computed(() => formatTime(duration.value));
const progressPercent = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

function onLoadedMetadata(): void {
  const v = videoEl.value;
  if (!v) return;
  duration.value = v.duration || 0;
  // 提取分辨率
  if (v.videoWidth && v.videoHeight) {
    resolution.value = `${v.videoWidth}×${v.videoHeight}`;
  }
}

function onTimeUpdate(): void {
  const v = videoEl.value;
  if (!v) return;
  currentTime.value = v.currentTime;
}

async function onVideoClick(): Promise<void> {
  const v = videoEl.value;
  if (!v) return;
  if (v.paused || v.ended) {
    await v.play().catch(() => { /* ignore */ });
  } else {
    v.pause();
  }
}

function togglePlay(): void {
  const v = videoEl.value;
  if (!v) return;
  if (v.paused) {
    void v.play().catch(() => {});
  } else {
    v.pause();
  }
}

function toggleMute(): void {
  const v = videoEl.value;
  if (!v) return;
  v.muted = !v.muted;
  muted.value = v.muted;
}

function toggleFullscreen(): void {
  const v = videoEl.value;
  if (!v) return;
  if (document.fullscreenElement) {
    void document.exitFullscreen();
  } else {
    void v.requestFullscreen?.().catch(() => {});
  }
}

function onProgressClick(e: MouseEvent): void {
  const v = videoEl.value;
  const el = progressRef.value;
  if (!v || !el || duration.value === 0) return;
  const rect = el.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  v.currentTime = ratio * duration.value;
}
</script>

<style scoped>
/* 视频缩略图容器 */
.mav-video-thumb {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
  border-radius: 6px;
}
.mav-video-el {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 暂停时：中央空心播放三角（无圆圈背景，更大更醒目） */
.mav-video-play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.15);
}
.mav-video-play-icon {
  width: 56px;
  height: 56px;
  color: #fff;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.6));
}

/* 播放时：底部控制条（按钮平铺，不藏二级菜单） */
.mav-video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
  color: #fff;
}
.mav-vc-btn {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border: none;
  background: transparent;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 4px;
  transition: background 0.15s;
}
.mav-vc-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}
.mav-vc-btn svg {
  width: 16px;
  height: 16px;
}

/* 进度条 */
.mav-vc-progress {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  min-width: 0;
}
.mav-vc-progress-fill {
  height: 100%;
  background: #fff;
  border-radius: 2px;
}

/* 时间 */
.mav-vc-time {
  flex-shrink: 0;
  font-size: 10px;
  color: #fff;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* 右下角分辨率角标（阴影更淡） */
.mav-video-resolution {
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
/* 播放时控制条会盖住右下角，把分辨率上移 */
.mav-video-controls ~ .mav-video-resolution {
  bottom: 32px;
}
</style>
