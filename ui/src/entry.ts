/**
 * MediaAssetsViewer 入口：注册 ComfyUI 扩展和侧边栏 Tab。
 *
 * 通过 type: 'custom' + render(el) 挂载独立 Vue 应用，
 * 这样我们的 Vue 实例与 ComfyUI 前端的 Vue 实例隔离，
 * 避免版本冲突和状态污染。
 */

// @ts-ignore - ComfyUI 核心脚本，运行时由浏览器解析（external）
import { app } from "../../scripts/app.js";
import { mountApp, unmountApp } from "./app/mountApp";
import { t } from "./i18n";

/**
 * 加载 CSS：ComfyUI 只加载 entry.js，不会自动加载分离的 CSS 文件。
 * 用 import.meta.url 推导 CSS 路径，通过 <link> 标签注入。
 */
function loadStylesheet(): void {
  const cssUrl = new URL("./assets/comfyui-media-assets-viewer-ui.css", import.meta.url).href;
  // 避免重复注入
  if (document.querySelector(`link[data-mav-css="${cssUrl}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssUrl;
  link.setAttribute("data-mav-css", cssUrl);
  document.head.appendChild(link);
}

// 模块加载时立即注入 CSS
loadStylesheet();

const EXTENSION_NAME = "MediaAssetsViewer";
const SIDEBAR_TAB_ID = "media-assets-viewer";

function registerSidebarTabForApp(runtimeApp: any): boolean {
  try {
    const manager =
      runtimeApp?.extensionManager ||
      runtimeApp?.ui?.extensionManager ||
      runtimeApp?.workspaceStore ||
      null;
    if (manager && typeof manager.registerSidebarTab === "function") {
      manager.registerSidebarTab({
        id: SIDEBAR_TAB_ID,
        icon: "pi pi-images",
        title: t("title"),
        label: t("label"),
        tooltip: t("tooltip"),
        type: "custom",
        render(el: HTMLElement) {
          mountApp(el);
        },
        destroy(_el: HTMLElement) {
          // keep-alive：tab 切换时不卸载，仅在扩展清理时卸载
        },
      });
      return true;
    }
    console.warn("[MediaAssetsViewer] registerSidebarTab API 不可用");
    return false;
  } catch (e) {
    console.error("[MediaAssetsViewer] 注册侧边栏失败", e);
    return false;
  }
}

app.registerExtension({
  name: EXTENSION_NAME,

  async setup() {
    // ComfyUI setup 可能在 app 完全就绪前调用，等待 extensionManager
    const runtimeApp = app;
    let registered = false;
    for (let i = 0; i < 20; i++) {
      const manager =
        runtimeApp?.extensionManager ||
        runtimeApp?.ui?.extensionManager ||
        runtimeApp?.workspaceStore ||
        null;
      if (manager && typeof manager.registerSidebarTab === "function") {
        registered = registerSidebarTabForApp(runtimeApp);
        if (registered) break;
      }
      await new Promise((r) => setTimeout(r, 100));
    }
    if (!registered) {
      // 最后一次尝试
      registerSidebarTabForApp(runtimeApp);
    }
  },
});

// 扩展清理钩子（ComfyUI 重载时）
window.addEventListener("beforeunload", () => {
  try {
    unmountApp();
  } catch {
    /* ignore */
  }
});
