/**
 * 波形音频播放器 composable
 *
 * 移植自 ComfyUI 原生 src/composables/useWaveAudioPlayer.ts
 * - 用 AudioContext.decodeAudioData 解析音频生成波形柱
 * - 用原生 <audio> + 手动控制播放/暂停/跳转
 * - playedBarIndex 根据当前播放进度计算高亮到的柱索引
 */

import { computed, ref, watch, type Ref } from "vue";

interface WaveformBar {
  height: number;
}

interface UseWaveAudioPlayerOptions {
  src: Ref<string>;
  barCount?: number;
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function generatePlaceholderBars(barCount: number): WaveformBar[] {
  return Array.from({ length: barCount }, () => ({
    height: Math.random() * 60 + 10,
  }));
}

function generateBarsFromBuffer(buffer: AudioBuffer, barCount: number): WaveformBar[] {
  const channelData = buffer.getChannelData(0);
  if (channelData.length === 0) {
    return generatePlaceholderBars(barCount);
  }
  const averages: number[] = [];
  for (let i = 0; i < barCount; i++) {
    const start = Math.floor((i * channelData.length) / barCount);
    const end = Math.max(
      start + 1,
      Math.floor(((i + 1) * channelData.length) / barCount)
    );
    let sum = 0;
    for (let j = start; j < end && j < channelData.length; j++) {
      sum += Math.abs(channelData[j]);
    }
    averages.push(sum / (end - start));
  }
  const peak = Math.max(...averages) || 1;
  return averages.map((avg) => ({
    height: Math.max(8, (avg / peak) * 100),
  }));
}

export function useWaveAudioPlayer(options: UseWaveAudioPlayerOptions) {
  const { src, barCount = 40 } = options;

  const audioRef = ref<HTMLAudioElement | null>(null);
  const waveformRef = ref<HTMLElement | null>(null);
  const loading = ref(false);
  const isPlaying = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const bars = ref<WaveformBar[]>(generatePlaceholderBars(barCount));
  let decodeRequestId = 0;

  const playedBarIndex = computed(() => {
    if (duration.value === 0) return -1;
    return Math.floor((currentTime.value / duration.value) * barCount) - 1;
  });

  const progressRatio = computed(() => {
    if (duration.value === 0) return 0;
    return (currentTime.value / duration.value) * 100;
  });

  const formattedCurrentTime = computed(() => formatTime(currentTime.value));
  const formattedDuration = computed(() => formatTime(duration.value));

  async function decodeAudioSource(url: string): Promise<void> {
    const requestId = ++decodeRequestId;
    loading.value = true;
    let ctx: AudioContext | undefined;
    try {
      const response = await fetch(url);
      if (requestId !== decodeRequestId) return;
      if (!response.ok) {
        throw new Error(`Failed to fetch audio (${response.status})`);
      }
      const arrayBuffer = await response.arrayBuffer();
      if (requestId !== decodeRequestId) return;
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      ctx = new AC();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      if (requestId !== decodeRequestId) return;
      bars.value = generateBarsFromBuffer(audioBuffer, barCount);
    } catch {
      if (requestId === decodeRequestId) {
        bars.value = generatePlaceholderBars(barCount);
      }
    } finally {
      await ctx?.close();
      if (requestId === decodeRequestId) {
        loading.value = false;
      }
    }
  }

  function togglePlayPause(): void {
    if (!audioRef.value) return;
    if (isPlaying.value) {
      audioRef.value.pause();
    } else {
      void audioRef.value.play();
    }
  }

  function seekToRatio(ratio: number): void {
    if (!audioRef.value || duration.value === 0) return;
    const clamped = Math.max(0, Math.min(1, ratio));
    audioRef.value.currentTime = clamped * duration.value;
  }

  function handleWaveformClick(event: MouseEvent): void {
    if (!waveformRef.value || duration.value === 0) return;
    const rect = waveformRef.value.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (event.clientX - rect.left) / rect.width)
    );
    seekToRatio(ratio);
    if (!isPlaying.value && audioRef.value) {
      void audioRef.value.play();
    }
  }

  // 音频元素事件绑定
  function bindAudioEvents(audio: HTMLAudioElement): void {
    audio.addEventListener("play", () => {
      isPlaying.value = true;
    });
    audio.addEventListener("pause", () => {
      isPlaying.value = false;
    });
    audio.addEventListener("ended", () => {
      isPlaying.value = false;
      currentTime.value = 0;
    });
    audio.addEventListener("timeupdate", () => {
      currentTime.value = audio.currentTime;
    });
    audio.addEventListener("loadedmetadata", () => {
      duration.value = audio.duration || 0;
    });
    audio.addEventListener("durationchange", () => {
      duration.value = audio.duration || 0;
    });
  }

  // src 变化时重新解码
  watch(
    src,
    (url) => {
      isPlaying.value = false;
      currentTime.value = 0;
      if (url) void decodeAudioSource(url);
    },
    { immediate: true }
  );

  return {
    audioRef,
    waveformRef,
    bars,
    loading,
    isPlaying,
    currentTime,
    duration,
    playedBarIndex,
    progressRatio,
    formattedCurrentTime,
    formattedDuration,
    togglePlayPause,
    seekToRatio,
    handleWaveformClick,
    bindAudioEvents,
  };
}
