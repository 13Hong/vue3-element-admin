import { defaultSettings } from "@/settings";
import { ThemeMode } from "@/enums/settings/theme.enum";
import { LayoutMode } from "@/enums/settings/layout.enum";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { STORAGE_KEYS } from "@/constants";
import { store } from "@/store";

export const useSettingsStore = defineStore("settings", () => {
  // 侧边栏配色方案 (经典蓝/极简白)
  const sidebarColorScheme = useStorage<string>(
    "sidebarColorScheme",
    defaultSettings.sidebarColorScheme
  );
  // 布局
  const layout = useStorage<LayoutMode>(STORAGE_KEYS.LAYOUT, defaultSettings.layout as LayoutMode);

  // 主题颜色
  const themeColor = useStorage<string>(STORAGE_KEYS.THEME_COLOR, defaultSettings.themeColor);

  // 主题模式（亮色/暗色）
  const theme = useStorage<ThemeMode>(STORAGE_KEYS.THEME, defaultSettings.theme);

  // 是否显示应用Logo
  const showAppLogo = useStorage<boolean>(STORAGE_KEYS.SHOW_APP_LOGO, defaultSettings.showAppLogo);

  // 是否显示水印
  const showWatermark = useStorage<boolean>(
    STORAGE_KEYS.SHOW_WATERMARK,
    defaultSettings.showWatermark
  );

  // 是否显示标签页视图
  const showTagsView = useStorage<boolean>(
    STORAGE_KEYS.SHOW_TAGS_VIEW,
    defaultSettings.showTagsView
  );

  return {
    sidebarColorScheme,
    layout,
    themeColor,
    theme,
    showAppLogo,
    showWatermark,
    showTagsView,
  };
});

/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useAppStoreHook() {
  return useSettingsStore(store);
}
