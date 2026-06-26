# ComfyUI-MediaAssetsViewer

一个本地媒体资产浏览器插件，作为 ComfyUI 侧边栏 Tab 集成，复刻原生媒体资产 UI 体验，并**支持查看 output/input 目录的所有历史文件**（直接扫描磁盘，而非仅依赖内存中的执行历史）。

![version](https://img.shields.io/badge/version-0.1.0-blue) ![comfyui](https://img.shields.io/badge/ComfyUI-compatible-green) ![python](https://img.shields.io/badge/python-%3E%3D3.10-yellow) ![license](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 目录

- [功能特性](#功能特性)
- [截图](#截图)
- [安装](#安装)
- [使用说明](#使用说明)
- [架构概览](#架构概览)
- [技术实现细节](#技术实现细节)
- [API 参考](#api-参考)
- [开发指南](#开发指南)
- [配置项](#配置项)
- [FAQ](#faq)
- [许可证](#许可证)

---

## 功能特性

### 核心能力

- **磁盘扫描浏览**：直接扫描 ComfyUI 的 `output/` 和 `input/` 目录，查看所有历史生成/导入的媒体文件，不丢失任何历史数据
- **多格式支持**：
  - 图片：`.png` `.jpg` `.jpeg` `.webp` `.gif` `.bmp` `.tiff`
  - 视频：`.mp4` `.webm` `.mov` `.avi` `.mkv` `.m4v`
  - 音频：`.mp3` `.wav` `.ogg` `.flac` `.m4a` `.aac`
- **嵌套子目录**：递归扫描所有子目录，正确处理 `subfolder` 字段

### 交互体验

- **双视图模式**：网格视图（卡片预览）/ 列表视图（紧凑列表），偏好持久化到 `localStorage`
- **筛选与排序**：按文件名搜索、按媒体类型筛选、5 种排序方式（最新/最旧/名称 A-Z/名称 Z-A/体积最大）
- **灯箱预览**：双击或右键"检查"打开全屏灯箱，支持左右箭头键切换、Esc 关闭
- **多选操作**：Ctrl 单选切换、Shift 范围选择、批量下载、批量删除
- **右键菜单**：检查、添加到工作流、下载、打开/导出工作流、复制文件名、删除
- **实时刷新**：监听 ComfyUI `executed` 事件，工作流执行完成后自动刷新已生成列表（防抖 600ms）

### 媒体预览

- **音频波形**：用 `AudioContext.decodeAudioData` 解析音频生成 40 根波形柱，播放进度同步高亮，支持点击波形跳转
- **视频缩略图**：视频首帧预览 + 原生 `<video>` 播放控制
- **工作流元数据**：从 PNG 的 `tEXt` 块提取嵌入的 `prompt` 和 `workflow` JSON，支持一键加载到画布或导出为 JSON 文件

### 性能优化

- **虚拟滚动**：仅渲染可视区域 + 缓冲区（上下各 4 行），数千文件也流畅
- **线程池扫描**：后端把磁盘扫描放入 `run_in_executor`，不阻塞 ComfyUI 主事件循环
- **内存缓存**：前端 60 秒 TTL 缓存，避免频繁切换 Tab 重复请求
- **骨架屏占位**：首次加载显示骨架屏，缓存命中时静默刷新无闪烁

### 安全防护

- **路径遍历防护**：所有文件操作用 `Path.is_relative_to()` 严格校验目标路径归属，防止 `../` 越权访问
- **输入校验**：API 层校验 `dir_type`、`name` 等参数，拒绝非法请求

---

## 截图

> TODO：发布前补充以下截图
<img width="495" height="471" alt="Image" src="https://github.com/user-attachments/assets/8f778465-4367-4f7d-90c7-e14173e6ad60" />
> - 侧边栏入口与主界面
> - 网格视图 + 多选状态
> - 灯箱预览
> - 音频波形播放
> - 视频缩略图
> - 右键菜单

---

## 安装

### 方式一：手动安装（推荐）

1. 将本仓库克隆到 ComfyUI 的 `custom_nodes` 目录：

   ```bash
   cd ComfyUI/custom_nodes
   git clone https://github.com/oldmanPlus/ComfyUI-MediaAssetsViewer.git
   ```

2. 重启 ComfyUI。

3. 浏览器强制刷新（`Ctrl+Shift+R`），左侧边栏会出现媒体图标。

### 方式二：ComfyUI Manager

> 待发布到 ComfyUI 注册表后可通过 Manager 搜索安装。

### 前置要求

- ComfyUI（任意较新版本，需支持 `extensionManager.registerSidebarTab` API）
- Python ≥ 3.10（使用了 `Path.is_relative_to`，需 3.9+，本项目要求 3.10+）
- 浏览器支持 ES Modules（Chrome / Edge / Firefox / Safari 现代版本）

> **注意**：本插件已附带预构建的前端产物（`dist/entry.js`），普通用户**无需**安装 Node.js 或运行 `npm install`。仅当你要修改前端代码时才需要[开发环境](#开发指南)。

---

## 使用说明

### 打开媒体浏览器

启动 ComfyUI 后，点击左侧边栏的**媒体图标**（图片图标），即可打开 MediaAssetsViewer 面板。

### 切换目录

顶部有两个 Tab：

- **已生成**：对应 `output/` 目录，所有 ComfyUI 生成的图片/视频/音频
- **已导入**：对应 `input/` 目录，所有用户上传的素材

### 浏览与查找

- **搜索**：在搜索框输入文件名片段，实时过滤
- **类型筛选**：点击搜索框右侧的下拉，选择"图片/视频/音频/全部"
- **排序**：点击排序下拉，选择排序方式
- **视图切换**：点击右上角的网格/列表图标切换视图

### 文件操作

| 操作 | 触发方式 | 说明 |
|------|----------|------|
| 预览 | 双击卡片 / 右键"检查" | 打开灯箱，支持键盘左右切换、Esc 关闭 |
| 下载 | 右键"下载" | 触发浏览器下载原文件 |
| 删除 | 右键"删除" | 永久删除文件（不可恢复，请谨慎） |
| 复制文件名 | 右键"复制文件名" | 复制到剪贴板 |
| 打开工作流 | 右键"打开工作流" | 将嵌入的工作流加载到当前画布（仅 PNG） |
| 导出工作流 | 右键"导出工作流" | 将嵌入的工作流导出为 JSON 文件（仅 PNG） |
| 添加到工作流 | 右键"添加到工作流" | 自动添加对应的加载节点并填充文件名 |

### 多选操作

- **Ctrl + 点击**：切换选中单个文件
- **Shift + 点击**：范围选择（从上次选中到当前）
- **批量下载**：选中多个后，点击底部"下载选中"
- **批量删除**：选中多个后，点击底部"删除选中"
- **取消选择**：点击底部"取消选择"或空白区域

### 自动刷新

当 ComfyUI 执行工作流并生成新文件时，MediaAssetsViewer 会自动刷新"已生成"列表（防抖 600ms，避免批量任务时频繁刷新）。若你当前在"已导入"页面，不会抢占界面，切回"已生成"时会拉取最新数据。

### 键盘快捷键（灯箱内）

| 按键 | 功能 |
|------|------|
| `←` | 上一张 |
| `→` | 下一张 |
| `Esc` | 关闭灯箱 |

---

## 架构概览

```
ComfyUI-MediaAssetsViewer/
├── __init__.py              # 插件入口：导出 WEB_DIRECTORY，注册后端路由
├── pyproject.toml           # Python 包元数据
├── dist/                    # 前端构建产物（已预构建，随仓库发布）
│   ├── entry.js             # 前端入口（ES 模块，由 ComfyUI 自动加载）
│   └── assets/
│       └── comfyui-media-assets-viewer-ui.css
├── mav_backend/             # Python 后端
│   ├── __init__.py
│   ├── routes.py            # aiohttp 路由：list/metadata/delete
│   ├── scanner.py           # 磁盘扫描 + 路径安全校验
│   └── metadata.py          # PNG 元数据提取
└── ui/                      # 前端源码（开发用，普通用户可忽略）
    ├── package.json
    ├── vite.config.ts       # Vite 构建配置
    └── src/
        ├── entry.ts         # 扩展注册 + 侧边栏 Tab 挂载
        ├── styles.css       # 全局样式
        ├── types.ts         # TypeScript 类型定义
        ├── i18n/            # 国际化（zh-CN / en）
        ├── app/
        │   └── mountApp.ts  # Vue 应用挂载/卸载
        ├── components/      # Vue 组件
        │   ├── MediaAssetsViewer.vue  # 主组件
        │   ├── FilterBar.vue
        │   ├── AssetGrid.vue          # 网格视图 + 虚拟滚动
        │   ├── AssetList.vue          # 列表视图
        │   ├── AssetCard.vue          # 单个卡片
        │   ├── AssetLightbox.vue      # 灯箱
        │   ├── AudioThumb.vue         # 音频波形
        │   ├── VideoThumb.vue         # 视频缩略图
        │   ├── ContextMenu.vue        # 右键菜单
        │   └── SelectionBar.vue       # 多选操作栏
        └── composables/     # Vue composables
            ├── useAssets.ts           # 数据获取 + 缓存
            ├── useAssetActions.ts     # 下载/删除/工作流操作
            ├── useAssetSelection.ts   # 多选状态
            ├── useVirtualScroll.ts    # 虚拟滚动
            └── useWaveAudioPlayer.ts  # 音频波形播放
```

### 数据流

```
┌─────────────────────────────────────────────────────────────┐
│ 浏览器                                                       │
│  ┌──────────────────┐    ┌──────────────────────────────┐  │
│  │ ComfyUI 核心前端  │    │ MediaAssetsViewer Vue 应用    │  │
│  │ (window.app)     │    │  ┌────────────────────────┐  │  │
│  │   ├ api (WS)     │◄───│  │ useAssets              │  │  │
│  │   ├ loadGraphData│    │  │   fetch /mav/files     │  │  │
│  │   └ addNodeOnGraph│   │  └────────────────────────┘  │  │
│  └──────────────────┘    └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                                    │ HTTP
                                    ▼
┌─────────────────────────────────────────────────────────────┐
│ ComfyUI PromptServer (aiohttp)                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ /mav/files/{type}    GET   列出媒体文件              │    │
│  │ /mav/metadata        GET   获取 PNG 工作流元数据      │    │
│  │ /mav/delete          POST  删除文件                   │    │
│  └─────────────────────────────────────────────────────┘    │
│           │  run_in_executor（不阻塞事件循环）                │
│           ▼                                                  │
│  ┌────────────┐   ┌──────────────┐   ┌──────────────────┐  │
│  │ scanner.py │   │ metadata.py  │   │ folder_paths     │  │
│  │  rglob 扫描 │   │  PIL 读 PNG  │   │ (ComfyUI 内置)   │  │
│  │  路径校验   │   │  提取 prompt │   │  output/input 路径│  │
│  └────────────┘   └──────────────┘   └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 技术实现细节

### 1. 插件加载机制

本插件遵循 [ComfyUI 官方扩展规范](https://docs.comfy.org/custom-nodes/js/javascript_overview)：

**后端入口** [`__init__.py`](__init__.py)：
- 导出 `NODE_CLASS_MAPPINGS = {}`（纯前端扩展，无自定义节点）
- 导出 `WEB_DIRECTORY = "./dist"`，ComfyUI 会自动 serve `custom_nodes/ComfyUI-MediaAssetsViewer/dist/` 下的 `.js` 文件
- 在模块加载时注册后端路由到 `PromptServer.instance.app.router`

**前端入口** [`ui/src/entry.ts`](ui/src/entry.ts)：
```typescript
import { app } from "../../scripts/app.js";
app.registerExtension({
  name: "MediaAssetsViewer",
  async setup() {
    // 等待 extensionManager 就绪后注册侧边栏 Tab
    manager.registerSidebarTab({
      id: "media-assets-viewer",
      icon: "pi pi-images",
      type: "custom",
      render(el) { mountApp(el); },
      destroy() { /* keep-alive，不卸载 */ },
    });
  },
});
```

### 2. CSS 加载策略

ComfyUI 的 `WEB_DIRECTORY` 机制**只 serve `.js` 文件**，CSS 不会自动加载。本项目在 `entry.ts` 中用 `import.meta.url` 推导 CSS 路径，通过 `<link>` 标签手动注入：

```typescript
function loadStylesheet(): void {
  const cssUrl = new URL("./assets/comfyui-media-assets-viewer-ui.css", import.meta.url).href;
  if (document.querySelector(`link[data-mav-css="${cssUrl}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssUrl;
  link.setAttribute("data-mav-css", cssUrl);
  document.head.appendChild(link);
}
```

参考：[ComfyUI 官方文档 - Including .js files](https://docs.comfy.org/custom-nodes/js/javascript_overview#including-js-files)

### 3. Vue 应用隔离

为避免与 ComfyUI 前端的 Vue 实例冲突，MediaAssetsViewer 用独立 Vue 应用挂载到侧边栏 Tab 提供的 DOM 节点：

```typescript
// app/mountApp.ts
import { createApp } from "vue";
import MediaAssetsViewer from "../components/MediaAssetsViewer.vue";

let app: VueApp | null = null;
export function mountApp(el: HTMLElement) {
  if (app) return;  // keep-alive 单例
  app = createApp(MediaAssetsViewer);
  app.mount(el);
}
export function unmountApp() {
  app?.unmount();
  app = null;
}
```

Vite 构建时把 Vue 打包进产物（`external` 只排除 ComfyUI 的 `scripts/*`），不依赖 ComfyUI 暴露 Vue 运行时。

### 4. 跨模块通信：`window.app` 而非 import

**关键设计决策**：不通过 `import { api } from "../../scripts/api.js"` 引入 ComfyUI 核心 API，而是用 `window.app`。

**原因**：源码位于 `src/components/` 子目录，Rollup 打包后会相对输出文件 `entry.js` 重新计算路径，部署后变成 `../scripts/api.js`，导致 404。改用全局对象绕开此问题：

```typescript
function getComfyApi(): any {
  return (window as any).app?.api;
}
```

涉及场景：
- 监听 `executed` 事件（实时刷新）
- `loadGraphData(wf)`（打开工作流到画布）
- `addNodeOnGraph(nodeClass)`（添加加载节点）

### 5. 虚拟滚动实现

[`ui/src/composables/useVirtualScroll.ts`](ui/src/composables/useVirtualScroll.ts) 实现固定行高的虚拟滚动：

- 根据 `scrollTop` 计算起始行 `startRow = floor(scrollTop / rowHeight) - bufferRows`
- 计算可见行数 `visibleRows = ceil(containerHeight / rowHeight) + bufferRows * 2`
- 只渲染 `[startIndex, endIndex)` 区间的卡片
- `totalHeight` 占位撑起滚动条，`offsetY` 定位可见区域

`AssetGrid.vue` 监听容器 `resize`，响应式更新 `itemsPerRow` 和 `rowHeight`（卡片宽度 = 容器宽度 / 每行数）。

### 6. 音频波形生成

[`ui/src/composables/useWaveAudioPlayer.ts`](ui/src/composables/useWaveAudioPlayer.ts)：

1. `fetch` 音频 URL 获取 `ArrayBuffer`
2. `AudioContext.decodeAudioData` 解码为 `AudioBuffer`
3. 取第一声道数据，均分为 40 段，每段计算平均振幅
4. 归一化到峰值，映射为 8-100 的高度
5. 用 `decodeRequestId` 防止并发解码竞态
6. 解码失败时用随机占位柱

播放进度高亮：`playedBarIndex = floor(currentTime / duration * barCount) - 1`

### 7. PNG 工作流元数据提取

[`mav_backend/metadata.py`](mav_backend/metadata.py)：

ComfyUI 保存 PNG 时在 `tEXt` 块嵌入两个字段：
- `prompt`：API 格式工作流（按节点 ID 索引的字典）
- `workflow`：UI 格式工作流（含 nodes/links，可恢复到画布）

提取流程：
1. `PIL.Image.open(path)` 打开 PNG
2. 读取 `img.text` 字典
3. `json.loads` 解析 `prompt` 和 `workflow`
4. 遍历 prompt 节点提取摘要字段：
   - `CheckpointLoaderSimple` / `UNETLoader` → `model`
   - `KSampler` / `SamplerCustom` → `seed`
   - `CLIPTextEncode` → `positive`（正向提示词）

### 8. 路径安全防护

所有文件操作（扫描、元数据、删除）都经过严格路径校验：

```python
target = (root / subfolder / name).resolve()
if not target.is_relative_to(root.resolve()):
    return None  # 拒绝越权访问
```

**为什么用 `is_relative_to` 而非 `startswith`**：`startswith` 可被兄弟目录名绕过，例如 `subfolder="../output_evil"` 会 resolve 成 `/app/output_evil/`，而 `startswith("/app/output")` 会误判为 True。`is_relative_to` 是 Python 3.9+ 的严格归属判断，杜绝此类绕过。

### 9. 后端线程池扫描

output 目录可能含上千文件，同步扫描会阻塞 aiohttp 事件循环，导致 ComfyUI 整体卡顿。路由层把扫描和序列化都放入线程池：

```python
async def list_files(request):
    loop = asyncio.get_event_loop()
    files = await loop.run_in_executor(None, scan_directory, dir_type)
    payload = await loop.run_in_executor(
        None, lambda: [scanned_to_dict(f) for f in files]
    )
    return web.json_response(payload)
```

### 10. 实时刷新机制

监听 ComfyUI WebSocket 的 `executed` 事件（每个节点执行完成时触发）：

```typescript
onMounted(() => {
  getComfyApi()?.addEventListener?.("executed", onExecuted);
});

function onExecuted(): void {
  // 防抖 600ms：批量任务短时间多次触发只刷新一次
  if (_refreshTimer) clearTimeout(_refreshTimer);
  _refreshTimer = setTimeout(() => {
    clearCache("output");
    if (dirType.value === "output") {
      void fetchFiles("output", true);
    }
  }, 600);
}
```

### 11. 国际化

[`ui/src/i18n/`](ui/src/i18n/) 支持中英双语：

- `zh-CN.json` / `en.json`：翻译文案
- `index.ts`：根据 `navigator.language` 自动选择，回退到英文

### 12. 构建配置

[`ui/vite.config.ts`](ui/vite.config.ts) 关键配置：

- `build.lib.entry`：单入口 `src/entry.ts`
- `build.lib.formats`：`["es"]`（ES 模块，ComfyUI 用 `<script type="module">` 加载）
- `rollupOptions.external`：`scripts/*` 和 `web/*` 保持 external，运行时由浏览器解析
- Vue 打包进产物（ComfyUI 不暴露 Vue 运行时）
- `stripNodeEnvForBrowser` 插件：把 `process.env.NODE_ENV` 替换为字面量，避免浏览器报错
- `assetsInlineLimit: 0`：CSS 单独输出为文件，便于 `<link>` 加载

---

## API 参考

本插件向 ComfyUI PromptServer 注册以下路由：

### `GET /mav/files/{type}`

列出指定目录的所有媒体文件。

**路径参数**：
- `type`：`output` 或 `input`

**响应**：`200 OK`
```json
[
  {
    "name": "ComfyUI_00001_.png",
    "subfolder": "",
    "type": "output",
    "size": 1234567,
    "mtime": 1719486789000,
    "media_kind": "image"
  }
]
```

### `GET /mav/metadata`

获取单个文件的工作流元数据（仅 PNG 有）。

**查询参数**：
- `type`：`output` 或 `input`
- `name`：文件名
- `subfolder`：子目录（可选）

**响应**：
```json
{
  "prompt": { "...": "API 格式工作流" },
  "workflow": { "...": "UI 格式工作流" },
  "has_workflow": true,
  "model": "sd_xl_base_1.0.safetensors",
  "seed": 1234567890,
  "positive": "a beautiful landscape",
  "negative": null
}
```

### `POST /mav/delete`

删除指定文件。

**请求体**：
```json
{
  "type": "output",
  "name": "ComfyUI_00001_.png",
  "subfolder": ""
}
```

**响应**：
- 成功：`200 {"success": true}`
- 失败：`404 {"error": "delete failed"}`

---

## 开发指南

### 环境准备

```bash
cd ComfyUI-MediaAssetsViewer/ui
npm install
```

### 开发构建

```bash
# 一次性构建
npm run build

# 监听模式（修改自动重建）
npm run build:watch

# 开发模式（带 sourcemap）
npm run build:dev
```

构建产物输出到 `../dist/`，重启 ComfyUI 后生效。

### 调试技巧

1. **浏览器 DevTools**：`F12` 打开，在 Console 查看日志（前缀 `[MediaAssetsViewer]` 或 `[MAV]`）
2. **ComfyUI 后端日志**：查看终端输出，过滤 `media_assets_viewer`
3. **强制刷新**：`Ctrl+Shift+R` 清除浏览器缓存
4. **验证路由**：浏览器访问 `http://localhost:8188/mav/files/output` 应返回 JSON

### 项目结构约定

- 后端 Python 代码在 `mav_backend/`
- 前端源码在 `ui/src/`
- 构建产物 `dist/` 随仓库提交（普通用户无需构建）
- 遵循 [ComfyUI 官方扩展规范](https://docs.comfy.org/custom-nodes/js/javascript_overview)

### 修改前端后的发布流程

1. 在 `ui/` 运行 `npm run build`
2. 提交 `dist/` 目录的变更
3. 推送到 GitHub
4. 用户拉取后重启 ComfyUI + 强制刷新浏览器即可

---

## 配置项

本插件无需任何配置，安装即用。

如需自定义，可修改以下文件：

| 需求 | 修改位置 | 说明 |
|------|----------|------|
| 支持更多文件格式 | `mav_backend/scanner.py` 的 `MEDIA_EXTENSIONS` | 添加扩展名到对应类型集合 |
| 修改缓存时长 | `ui/src/composables/useAssets.ts` 的 `CACHE_TTL` | 默认 60000ms |
| 修改虚拟滚动缓冲 | `ui/src/composables/useVirtualScroll.ts` 的 `bufferRows` | 默认 4 行 |
| 修改波形柱数量 | `ui/src/composables/useWaveAudioPlayer.ts` 的 `barCount` | 默认 40 |
| 添加翻译 | `ui/src/i18n/` 新增语言文件 | 参考 `en.json` 结构 |

---

## FAQ

**Q: 安装后侧边栏没有媒体图标？**
A: 1) 确认插件在 `custom_nodes/ComfyUI-MediaAssetsViewer/`；2) 重启 ComfyUI；3) 查看终端是否有 `MediaAssetsViewer 路由已注册` 日志；4) 浏览器 `Ctrl+Shift+R` 强制刷新。

**Q: 列表显示"暂无文件"但目录里有文件？**
A: 1) 确认文件扩展名在支持列表内；2) 浏览器访问 `http://localhost:8188/mav/files/output` 验证后端是否返回数据；3) 检查 ComfyUI 的 `output/` 目录路径是否正确。

**Q: 打开工作流没反应？**
A: 只有 PNG 文件嵌入工作流元数据，JPG/WebP 等格式不支持。确认文件由 ComfyUI 生成（非外部导入）。

**Q: 删除文件会进回收站吗？**
A: 不会，`Path.unlink()` 是永久删除，不可恢复，请谨慎操作。

**Q: 支持远程 ComfyUI 吗？**
A: 支持。API 走相对路径 `/mav/*`，与 ComfyUI 同源，无需额外配置。

**Q: 大量文件会卡吗？**
A: 已实现虚拟滚动 + 线程池扫描 + 内存缓存，数千文件级别流畅。极大量文件（数万）首次扫描会有延迟，但不会卡死界面。

**Q: 如何更新插件？**
A: `git pull` 后重启 ComfyUI + 强制刷新浏览器。若修改过本地代码，建议先备份。

---

## 许可证

MIT License

---

## 致谢

- [ComfyUI](https://github.com/comfyanonymous/ComfyUI) - 强大的模块化 Stable Diffusion GUI
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Pillow](https://python-pillow.org/) - Python 图像处理库

本插件的 UI 设计参考了 ComfyUI 原生的媒体资产侧边栏，音频波形播放器参考了 ComfyUI 原生的 `useWaveAudioPlayer` 实现。

---

## 生成说明

本代码使用 [Trae CN](https://www.trae.cn/) 的 GLM-5.2 模型生成。
