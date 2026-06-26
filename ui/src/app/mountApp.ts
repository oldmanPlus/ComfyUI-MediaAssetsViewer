/**
 * Vue 应用挂载工具：keep-alive 语义，跨 tab 切换复用同一个 Vue 实例。
 */

import { createApp, type App as VueApp } from "vue";
import MediaAssetsViewer from "../components/MediaAssetsViewer.vue";

interface MountRecord {
  app: VueApp;
  host: HTMLElement;
  container: HTMLElement | null;
}

const MOUNT_KEY = "__mavVueApp";
let _record: MountRecord | null = null;

function createHost(): HTMLElement {
  const host = document.createElement("div");
  host.dataset.mavHost = MOUNT_KEY;
  host.style.height = "100%";
  host.style.width = "100%";
  host.style.minHeight = "0";
  host.style.display = "flex";
  host.style.flexDirection = "column";
  host.style.overflow = "hidden";
  return host;
}

function attachHost(container: HTMLElement, host: HTMLElement): void {
  // 约束 ComfyUI 提供的容器，让 host 的 100% 高度生效
  container.style.height = "100%";
  container.style.minHeight = "0";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.overflow = "hidden";
  if (container.firstChild === host && container.childNodes.length === 1) return;
  container.replaceChildren(host);
}

/**
 * 挂载 Vue 应用到容器，保持 keep-alive 语义。
 * @returns true 表示新挂载，false 表示复用已有实例
 */
export function mountApp(container: HTMLElement): boolean {
  if (!container) return false;
  let created = false;
  if (!_record) {
    const host = createHost();
    const app = createApp(MediaAssetsViewer);
    app.mount(host);
    _record = { app, host, container: null };
    created = true;
  }
  attachHost(container, _record.host);
  _record.container = container;
  return created;
}

/** 完全卸载 Vue 应用（仅扩展清理时调用） */
export function unmountApp(): void {
  if (!_record) return;
  try {
    _record.app.unmount();
  } catch {
    /* ignore */
  }
  _record.host.remove();
  _record = null;
}
