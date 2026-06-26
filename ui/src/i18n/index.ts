/**
 * 简易 i18n：默认中文，根据浏览器语言自动选择。
 * 通过 t('key.path', { param: value }) 插值。
 */

import { reactive } from "vue";
import zhCN from "./zh-CN.json";
import en from "./en.json";

type Dict = Record<string, any>;

const LOCALE_MAP: Dict = {
  "zh-CN": zhCN,
  "zh-TW": zhCN,
  "zh-HK": zhCN,
  "zh": zhCN,
  "en": en,
  "en-US": en,
  "en-GB": en,
};

function detectLocale(): string {
  try {
    const lang =
      (navigator.language || (navigator as any).userLanguage || "zh-CN").toLowerCase();
    for (const key of Object.keys(LOCALE_MAP)) {
      if (lang.startsWith(key.toLowerCase())) return key;
    }
  } catch {
    /* ignore */
  }
  return "zh-CN";
}

const state = reactive({
  locale: detectLocale(),
  messages: LOCALE_MAP[detectLocale()] || zhCN,
});

function lookup(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

function interpolate(template: string, params?: Record<string, any>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, k: string) =>
    params[k] != null ? String(params[k]) : `{${k}}`
  );
}

export function t(path: string, params?: Record<string, any>): string {
  const value = lookup(state.messages, path);
  if (typeof value === "string") return interpolate(value, params);
  // 回退到中文
  const fallback = lookup(zhCN, path);
  if (typeof fallback === "string") return interpolate(fallback, params);
  return path;
}

export function setLocale(locale: string): void {
  if (LOCALE_MAP[locale]) {
    state.locale = locale;
    state.messages = LOCALE_MAP[locale];
  }
}

export function getLocale(): string {
  return state.locale;
}
