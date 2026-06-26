<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="mav-context-menu"
      :style="{ left: x + 'px', top: y + 'px' }"
      @click.stop
    >
      <div class="mav-context-item" @click="onAction('inspect')">
        <span>🔍</span> {{ t('contextMenu.inspect') }}
      </div>
      <div class="mav-context-item" @click="onAction('addToWorkflow')">
        <span>➕</span> {{ t('contextMenu.addToWorkflow') }}
      </div>
      <div class="mav-context-divider"></div>
      <div class="mav-context-item" @click="onAction('download')">
        <span>⬇</span> {{ t('contextMenu.download') }}
      </div>
      <div class="mav-context-item" @click="onAction('openWorkflow')">
        <span>📂</span> {{ t('contextMenu.openWorkflow') }}
      </div>
      <div class="mav-context-item" @click="onAction('exportWorkflow')">
        <span>💾</span> {{ t('contextMenu.exportWorkflow') }}
      </div>
      <div class="mav-context-item" @click="onAction('copyFilename')">
        <span>📋</span> {{ t('contextMenu.copyFilename') }}
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from "vue";
import { t } from "../i18n";

const props = defineProps<{
  visible: boolean;
  x: number;
  y: number;
}>();

const emit = defineEmits<{
  (e: "action", action: string): void;
  (e: "close"): void;
}>();

function onAction(action: string): void {
  emit("action", action);
  emit("close");
}

function onDocClick(): void {
  if (props.visible) emit("close");
}

watch(
  () => props.visible,
  (v) => {
    if (v) {
      // 下一帧注册，避免触发菜单的 click 事件
      requestAnimationFrame(() => {
        document.addEventListener("click", onDocClick, { once: true });
      });
    }
  }
);

onUnmounted(() => {
  document.removeEventListener("click", onDocClick);
});
</script>
