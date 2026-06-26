/**
 * Vite 构建配置 - ComfyUI-MediaAssetsViewer
 *
 * 输出单个 ES 模块到 ../dist/entry.js，由 __init__.py 的 WEB_DIRECTORY 指向。
 * ComfyUI 自带的 scripts/app.js、scripts/api.js 保持 external，运行时由浏览器解析。
 * Vue 打包进产物（ComfyUI 不对外暴露 Vue 运行时）。
 */

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const NODE_ENV_LITERAL = JSON.stringify("production");

// 把 process.env.NODE_ENV 替换为字面量，避免浏览器环境报错
function stripNodeEnvForBrowser() {
  return {
    name: "mav-strip-node-env",
    renderChunk(code: string) {
      if (!code.includes("process.env.NODE_ENV")) return null;
      return {
        code: code.replaceAll("process.env.NODE_ENV", NODE_ENV_LITERAL),
        map: null,
      };
    },
  };
}

/**
 * CSS 加载说明：
 * ComfyUI 只加载 entry.js，不会自动加载分离的 CSS 文件。
 * 所以在 entry.ts 里用 import.meta.url + <link> 标签手动加载 CSS。
 * 见 entry.ts 的 loadStylesheet()。
 */

export default defineConfig({
  plugins: [vue(), stripNodeEnvForBrowser()],
  define: {
    "process.env.NODE_ENV": NODE_ENV_LITERAL,
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/entry.ts"),
      formats: ["es"],
      fileName: () => "entry.js",
    },
    outDir: "../dist",
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      // ComfyUI 核心脚本保持 external，运行时由浏览器解析相对路径
      external: (id: string, _importer: string, isResolved: boolean) => {
        if (!isResolved) {
          return (
            id.startsWith("../../scripts/") ||
            id.startsWith("../../web/") ||
            id.startsWith("../../../scripts/")
          );
        }
        return false;
      },
      output: {
        format: "es",
        entryFileNames: "entry.js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    sourcemap: false,
  },
});
