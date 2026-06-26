/**
 * MediaAssetsViewer 类型定义
 */

/** 媒体种类 */
export type MediaKind = "image" | "video" | "audio" | "other"

/** 目录类型 */
export type DirType = "output" | "input"

/** 后端扫描返回的文件信息 */
export interface ScannedFile {
  name: string
  subfolder: string
  type: DirType
  size: number
  /** 修改时间（毫秒时间戳） */
  mtime: number
  media_kind: MediaKind
}

/** 后端返回的元数据 */
export interface AssetMetadata {
  prompt: Record<string, unknown> | null
  workflow: Record<string, unknown> | null
  has_workflow: boolean
  model: string | null
  seed: number | null
  positive: string | null
  negative: string | null
  error?: string
  note?: string
}

/** 排序方式 */
export type SortKey = "date-desc" | "date-asc" | "name-asc" | "name-desc" | "size-desc"

/** 视图模式 */
export type ViewMode = "grid" | "list"

/** 过滤条件 */
export interface FilterState {
  search: string
  mediaKind: MediaKind | "all"
  sort: SortKey
}

/** 上下文菜单触发参数 */
export interface ContextMenuPayload {
  asset: ScannedFile
  x: number
  y: number
}

/** 拖拽到工作流时设置的数据格式 */
export const MIME_ASSET_INFO = "application/x-comfy-asset-info"
