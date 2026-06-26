<template>
  <div class="mav-filter-bar">
    <!-- 第一行：搜索框（占满） + 视图切换 -->
    <div class="mav-search-wrap">
      <svg class="mav-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        class="mav-search"
        type="text"
        v-model="searchLocal"
        :placeholder="t('filter.search')"
      />
    </div>

    <div class="mav-view-toggle">
      <button
        class="mav-icon-btn"
        :class="{ active: viewMode === 'grid' }"
        :title="t('view.grid')"
        @click="$emit('update:viewMode', 'grid')"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      </button>
      <button
        class="mav-icon-btn"
        :class="{ active: viewMode === 'list' }"
        :title="t('view.list')"
        @click="$emit('update:viewMode', 'list')"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      </button>
    </div>

    <!-- 第二行：媒体类型 chip + 排序 -->
    <div class="mav-media-chips">
      <button
        v-for="opt in mediaKindOptions"
        :key="opt.value"
        class="mav-chip"
        :class="{ active: mediaKind === opt.value }"
        @click="$emit('update:mediaKind', opt.value)"
      >
        <span class="mav-chip-icon">{{ opt.icon }}</span>
        <span class="mav-chip-label">{{ opt.label }}</span>
      </button>

      <select class="mav-sort-select" v-model="sortLocal" :title="t('filter.sort.title')">
        <option value="date-desc">{{ t('filter.sort.date-desc') }}</option>
        <option value="date-asc">{{ t('filter.sort.date-asc') }}</option>
        <option value="name-asc">{{ t('filter.sort.name-asc') }}</option>
        <option value="name-desc">{{ t('filter.sort.name-desc') }}</option>
        <option value="size-desc">{{ t('filter.sort.size-desc') }}</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { t } from "../i18n";
import type { MediaKind, SortKey, ViewMode } from "../types";

const props = defineProps<{
  search: string;
  mediaKind: MediaKind | "all";
  sort: SortKey;
  viewMode: ViewMode;
}>();

const emit = defineEmits<{
  (e: "update:search", v: string): void;
  (e: "update:mediaKind", v: MediaKind | "all"): void;
  (e: "update:sort", v: SortKey): void;
  (e: "update:viewMode", v: ViewMode): void;
}>();

const searchLocal = computed({
  get: () => props.search,
  set: (v: string) => emit("update:search", v),
});
const sortLocal = computed({
  get: () => props.sort,
  set: (v: SortKey) => emit("update:sort", v),
});

const mediaKindOptions = computed(() => [
  { value: "all" as const, label: t("filter.all"), icon: "📋" },
  { value: "image" as const, label: t("filter.image"), icon: "🖼" },
  { value: "video" as const, label: t("filter.video"), icon: "▶" },
  { value: "audio" as const, label: t("filter.audio"), icon: "♪" },
]);
</script>

<style scoped>
/* 筛选栏：flex-wrap 自然换行，两行布局 */
.mav-filter-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-color, #333);
  flex-shrink: 0;
  flex-wrap: wrap;
}

/* 搜索框：第一行占满剩余空间 */
.mav-search-wrap {
  position: relative;
  flex: 1 1 140px;
  min-width: 140px;
}
.mav-search-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: var(--input-text-color-muted, #888);
  pointer-events: none;
}
.mav-search {
  width: 100%;
  padding: 6px 8px 6px 28px;
  background: var(--input-bg-color, #2a2a2a);
  border: 1px solid var(--border-color, #444);
  border-radius: 6px;
  color: var(--input-text-color, #e0e0e0);
  font-size: 13px;
  box-sizing: border-box;
}
.mav-search:focus {
  outline: none;
  border-color: var(--primary-color, #4a9eff);
}

/* 视图切换：紧凑图标按钮组 */
.mav-view-toggle {
  display: flex;
  background: var(--input-bg-color, #2a2a2a);
  border: 1px solid var(--border-color, #444);
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}
.mav-icon-btn {
  background: transparent;
  border: none;
  color: var(--input-text-color-muted, #888);
  padding: 6px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mav-icon-btn:hover {
  color: var(--fg-color, #e0e0e0);
}
.mav-icon-btn.active {
  background: var(--tr-bg-color, rgba(255, 255, 255, 0.08));
  color: var(--primary-color, #4a9eff);
}
.mav-icon-btn svg {
  width: 16px;
  height: 16px;
}

/* 第二行：媒体类型 chip + 排序，占满整行 */
.mav-media-chips {
  display: flex;
  gap: 4px;
  flex: 1 1 100%;
  flex-wrap: wrap;
  align-items: center;
}
.mav-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: var(--input-bg-color, #2a2a2a);
  border: 1px solid var(--border-color, #444);
  border-radius: 999px;
  color: var(--input-text-color-muted, #888);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}
.mav-chip:hover {
  color: var(--fg-color, #e0e0e0);
}
.mav-chip.active {
  background: var(--primary-color, #4a9eff);
  border-color: var(--primary-color, #4a9eff);
  color: #fff;
}
.mav-chip-icon {
  font-size: 12px;
}

/* 排序下拉：跟在 chip 后面 */
.mav-sort-select {
  margin-left: auto;
  padding: 4px 8px;
  background: var(--input-bg-color, #2a2a2a);
  border: 1px solid var(--border-color, #444);
  border-radius: 6px;
  color: var(--input-text-color, #e0e0e0);
  font-size: 12px;
  cursor: pointer;
  flex-shrink: 0;
}
</style>
