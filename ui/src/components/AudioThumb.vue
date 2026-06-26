<template>
  <!-- 复刻原生 MediaAudioTop.vue：占满区域的音符图标 + 底部波形播放器 -->
  <div class="mav-audio-thumb">
    <!-- 居中的音符图标（lucide--music：2个连体音符） -->
    <div class="mav-audio-icon-wrap">
      <svg class="mav-audio-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    </div>

    <!-- 底部波形播放器（compact: [播放按钮] [波形] [时间]） -->
    <div class="mav-audio-player" @pointerdown.stop @click.stop>
      <!-- 播放/暂停按钮 -->
      <button
        class="mav-audio-play-btn"
        :aria-label="isPlaying ? '暂停' : '播放'"
        :disabled="loading"
        @click.stop="togglePlayPause"
      >
        <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
        </svg>
      </button>

      <!-- 波形条 -->
      <div
        ref="waveformRef"
        class="mav-audio-waveform"
        @click="handleWaveformClick"
      >
        <div
          v-for="(bar, index) in bars"
          :key="index"
          class="mav-audio-bar"
          :class="{
            played: !loading && index <= playedBarIndex,
            loading: loading,
          }"
          :style="{ height: (bar.height / 100) * waveformHeight + 'px' }"
        />
      </div>

      <!-- 时间 -->
      <span class="mav-audio-time">
        {{ formattedCurrentTime }} / {{ formattedDuration }}
      </span>
    </div>

    <!-- 隐藏的 audio 元素 -->
    <audio
      ref="audioEl"
      :src="src"
      preload="metadata"
      class="mav-audio-el"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, watch, onMounted, onUnmounted } from "vue";
import { useWaveAudioPlayer } from "../composables/useWaveAudioPlayer";

const props = defineProps<{
  src: string;
}>();

const audioEl = ref<HTMLAudioElement | null>(null);
const waveformHeight = 32;

const {
  audioRef,
  waveformRef,
  bars,
  loading,
  isPlaying,
  playedBarIndex,
  formattedCurrentTime,
  formattedDuration,
  togglePlayPause,
  handleWaveformClick,
  bindAudioEvents,
} = useWaveAudioPlayer({
  src: toRef(() => props.src),
  barCount: 40,
});

// 绑定 audio 元素事件
onMounted(() => {
  if (audioEl.value) {
    audioRef.value = audioEl.value;
    bindAudioEvents(audioEl.value);
  }
});

onUnmounted(() => {
  if (audioEl.value) {
    audioEl.value.pause();
  }
});
</script>

<style scoped>
/* 音频缩略图容器：占满卡片图片区，相对定位 */
.mav-audio-thumb {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--input-bg-color, #2a2a2a);
  border-radius: 6px;
}

/* 居中的音符图标 */
.mav-audio-icon-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mav-audio-icon {
  width: 36px;
  height: 36px;
  color: var(--input-text-color-muted, #888);
  opacity: 0.7;
}

/* 底部播放器：绝对定位在底部 */
.mav-audio-player {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.5));
}

/* 播放按钮 */
.mav-audio-play-btn {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background 0.15s;
}
.mav-audio-play-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}
.mav-audio-play-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.mav-audio-play-btn svg {
  width: 12px;
  height: 12px;
}

/* 波形条容器 */
.mav-audio-waveform {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1px;
  cursor: pointer;
  min-width: 0;
  height: 32px;
}
/* 单个波形柱 */
.mav-audio-bar {
  flex: 1;
  min-width: 1px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.4);
  transition: background 0.15s;
}
.mav-audio-bar.played {
  background: #fff;
}
.mav-audio-bar.loading {
  background: rgba(255, 255, 255, 0.2);
}

/* 时间显示 */
.mav-audio-time {
  flex-shrink: 0;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.85);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* 隐藏 audio 元素 */
.mav-audio-el {
  display: none;
}
</style>
