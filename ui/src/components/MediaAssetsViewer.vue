<template>
  <div class="mav-root">
    <!-- 顶部头部区：标题 + FilterBar + Tab（按原生 AssetsSidebarTab 结构） -->
    <header class="mav-header">
      <!-- 标题栏（原生：SidebarTabTemplate 的 title slot） -->
      <div class="mav-title">{{ t('title') }}</div>

      <!-- 筛选栏（带底部分割线） -->
      <FilterBar
        v-model:search="filter.search"
        v-model:mediaKind="filter.mediaKind"
        v-model:sort="filter.sort"
        v-model:viewMode="viewMode"
      />

      <!-- Tab 列表（独立容器，带底部边框） -->
      <div class="mav-tabs">
        <button
          class="mav-tab"
          :class="{ active: dirType === 'output' }"
          @click="switchTab('output')"
        >{{ t('tab.output') }}</button>
        <button
          class="mav-tab"
          :class="{ active: dirType === 'input' }"
          @click="switchTab('input')"
        >{{ t('tab.input') }}</button>
      </div>
    </header>

    <!-- 内容区（占满剩余空间） -->
    <main class="mav-body">
      <template v-if="loading">
        <!-- 骨架屏 -->
        <div class="mav-grid-scroll">
          <div class="mav-skeleton">
            <div v-for="i in 24" :key="i" class="mav-skeleton-card"></div>
          </div>
        </div>
      </template>

      <template v-else-if="filteredAssets.length === 0">
        <!-- 空状态 -->
        <div class="mav-empty">
          <div class="mav-empty-icon">📭</div>
          <div class="mav-empty-title">
            {{ filter.search || filter.mediaKind !== 'all' ? t('empty.noResults') : t('empty.title') }}
          </div>
          <div class="mav-empty-desc">{{ t('empty.desc') }}</div>
        </div>
      </template>

      <template v-else>
        <!-- 网格视图 -->
        <AssetGrid
          v-if="viewMode === 'grid'"
          :assets="filteredAssets"
          :isSelected="isSelected"
          @click="onCardClick"
          @context-menu="onContextMenu"
          @dblclick="onDblClick"
        />
        <!-- 列表视图 -->
        <AssetList
          v-else
          :assets="filteredAssets"
          :isSelected="isSelected"
          @click="onCardClick"
          @context-menu="onContextMenu"
          @dblclick="onDblClick"
        />
      </template>
    </main>

    <!-- 底部：多选栏（仅有选择时显示） -->
    <SelectionBar
      :count="count"
      @download-all="onDownloadAll"
      @delete-all="onDeleteAll"
      @clear="clear"
    />

    <!-- 右键菜单 -->
    <ContextMenu
      :visible="contextMenu.visible"
      :x="contextMenu.x"
      :y="contextMenu.y"
      @action="onContextMenuAction"
      @close="contextMenu.visible = false"
    />

    <!-- 灯箱 -->
    <AssetLightbox
      v-if="lightboxAsset"
      :asset="lightboxAsset"
      :list="filteredAssets"
      @close="lightboxAsset = null"
      @navigate="(a) => (lightboxAsset = a)"
    />

    <!-- Toast 通知 -->
    <Teleport to="body">
      <div v-if="toastMsg" class="mav-toast">{{ toastMsg }}</div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, onUnmounted } from "vue";
import { t } from "../i18n";
import "../styles.css";
import type { DirType, ScannedFile, SortKey, MediaKind, ViewMode } from "../types";
import { useAssets } from "../composables/useAssets";
import { useAssetActions } from "../composables/useAssetActions";
import { useAssetSelection } from "../composables/useAssetSelection";
import FilterBar from "./FilterBar.vue";
import AssetGrid from "./AssetGrid.vue";
import AssetList from "./AssetList.vue";
import SelectionBar from "./SelectionBar.vue";
import ContextMenu from "./ContextMenu.vue";
import AssetLightbox from "./AssetLightbox.vue";

/**
 * 获取 ComfyUI 的 api 单例。
 *
 * 注意：不能通过 `import { api } from "../../scripts/api.js"` 引入，
 * 因为本组件位于 src/components/ 子目录，Rollup 会把相对路径
 * 相对于输出 entry.js 重新计算，导致打包后变成 `../scripts/api.js`，
 * 部署后 404。改用 window.app.api（ComfyUI 启动后会挂载）绕开此问题。
 */
function getComfyApi(): any {
  return (window as any).app?.api;
}

// 状态
const dirType = ref<DirType>("output");
const viewMode = ref<ViewMode>(
  (localStorage.getItem("mav-viewMode") as ViewMode) || "grid"
);
const filter = reactive({
  search: "",
  mediaKind: "all" as MediaKind | "all",
  sort: "date-desc" as SortKey,
});

const { files, loading, fetchFiles, clearCache } = useAssets();
const {
  download,
  remove,
  copyFilename,
  exportWorkflow,
  openWorkflow,
  addToWorkflow,
} = useAssetActions(showToast);

const {
  count,
  isActive,
  isSelected,
  select,
  deselect,
  toggle,
  rangeSelect,
  clear,
  selectedAssets,
} = useAssetSelection();

// 灯箱
const lightboxAsset = ref<ScannedFile | null>(null);

// 右键菜单
const contextMenu = reactive({
  visible: false,
  x: 0,
  y: 0,
  asset: null as ScannedFile | null,
});

// Toast
const toastMsg = ref("");
let toastTimer: any = null;
function showToast(msg: string): void {
  toastMsg.value = msg;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (toastMsg.value = ""), 2500);
}

// 过滤+排序后的资产列表
const filteredAssets = computed(() => {
  let list = files.value;
  if (filter.mediaKind !== "all") {
    list = list.filter((a) => a.media_kind === filter.mediaKind);
  }
  if (filter.search.trim()) {
    const q = filter.search.trim().toLowerCase();
    list = list.filter((a) => a.name.toLowerCase().includes(q));
  }
  const sorted = [...list];
  switch (filter.sort) {
    case "date-desc":
      sorted.sort((a, b) => b.mtime - a.mtime);
      break;
    case "date-asc":
      sorted.sort((a, b) => a.mtime - b.mtime);
      break;
    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "size-desc":
      sorted.sort((a, b) => b.size - a.size);
      break;
  }
  return sorted;
});

// 切换 Tab
async function switchTab(type: DirType): Promise<void> {
  if (dirType.value === type) return;
  dirType.value = type;
  clear();
  await fetchFiles(type);
}

// 卡片点击：处理多选
function onCardClick(
  asset: ScannedFile,
  ev: MouseEvent,
  isCtrl: boolean,
  isShift: boolean
): void {
  if (isShift) {
    rangeSelect(asset, filteredAssets.value);
  } else if (isCtrl) {
    toggle(asset);
  } else {
    // 普通点击：清除多选，仅选中当前（不阻止双击）
    if (!isSelected(asset)) {
      clear();
      select(asset);
    }
  }
}

// 双击：打开灯箱
function onDblClick(asset: ScannedFile): void {
  lightboxAsset.value = asset;
}

// 右键菜单
function onContextMenu(asset: ScannedFile, x: number, y: number): void {
  contextMenu.asset = asset;
  contextMenu.x = x;
  contextMenu.y = y;
  contextMenu.visible = true;
  // 若未选中则选中当前
  if (!isSelected(asset)) {
    clear();
    select(asset);
  }
}

// 右键菜单动作
async function onContextMenuAction(action: string): Promise<void> {
  const asset = contextMenu.asset;
  if (!asset) return;
  contextMenu.visible = false;
  switch (action) {
    case "inspect":
      lightboxAsset.value = asset;
      break;
    case "addToWorkflow":
      await addToWorkflow(asset);
      break;
    case "download":
      await download(asset);
      break;
    case "openWorkflow":
      await openWorkflow(asset);
      break;
    case "exportWorkflow":
      await exportWorkflow(asset);
      break;
    case "copyFilename":
      await copyFilename(asset);
      break;
  }
}

// 批量下载
async function onDownloadAll(): Promise<void> {
  for (const a of selectedAssets.value) {
    await download(a);
  }
}

// 批量删除
async function onDeleteAll(): Promise<void> {
  for (const a of [...selectedAssets.value]) {
    const ok = await remove(a);
    if (ok) deselect(a);
  }
  clear();
  await fetchFiles(dirType.value, true);
}

// 持久化视图模式
watch(viewMode, (v) => {
  localStorage.setItem("mav-viewMode", v);
});

// 初始加载 + 监听任务完成事件，自动刷新已生成文件
let _refreshTimer: any = null;
function onExecuted(): void {
  // 防抖：批量执行时短时间多次触发只刷新一次
  if (_refreshTimer) clearTimeout(_refreshTimer);
  _refreshTimer = setTimeout(() => {
    // 仅刷新 output 目录；若用户当前在 input 页则不抢占界面
    clearCache("output");
    if (dirType.value === "output") {
      void fetchFiles("output", true);
    }
  }, 600);
}

onMounted(() => {
  fetchFiles(dirType.value);
  // ComfyUI 任务完成事件：每个节点执行完都会触发
  // 用 window.app.api 避免相对路径 import 在打包后被改写导致 404
  try {
    getComfyApi()?.addEventListener?.("executed", onExecuted);
  } catch (e) {
    console.warn("[MediaAssetsViewer] 注册 executed 监听失败", e);
  }
});

onUnmounted(() => {
  try {
    getComfyApi()?.removeEventListener?.("executed", onExecuted);
  } catch {
    /* ignore */
  }
  if (_refreshTimer) clearTimeout(_refreshTimer);
});
</script>

<style scoped>
.mav-toast {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--comfy-menu-bg, #1e1e1e);
  color: var(--fg-color, #e0e0e0);
  padding: 10px 18px;
  border-radius: 6px;
  border: 1px solid var(--border-color, #444);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 10002;
  font-size: 13px;
  max-width: 80vw;
}
</style>
