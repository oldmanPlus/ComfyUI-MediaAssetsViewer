<template>
  <div v-if="count > 0" class="mav-selection-bar">
    <span class="mav-selection-count">{{ t('selection.count', { n: count }) }}</span>
    <button class="mav-icon-btn" @click="$emit('download-all')" :title="t('selection.downloadAll')">
      ⬇
    </button>
    <button class="mav-icon-btn" @click="$emit('delete-all')" :title="t('selection.deleteAll')">
      🗑
    </button>
    <button class="mav-icon-btn" @click="$emit('clear')" :title="t('selection.clear')">
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { t } from "../i18n";

defineProps<{
  count: number;
}>();

defineEmits<{
  (e: "download-all"): void;
  (e: "delete-all"): void;
  (e: "clear"): void;
}>();
</script>
