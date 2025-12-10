import { defaultSettings } from "@/settings";
import { SidebarColor, ThemeMode } from "@/enums/settings/theme.enum";
import { LayoutMode } from "@/enums/settings/layout.enum";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { STORAGE_KEYS } from "@/constants";
import { store } from "@/store";
import { toggleSidebarColor, toggleDarkMode } from "@/utils/theme";

export const useSettingsStore = defineStore("settings", () => {
  // 设置面板可见性
  const settingsVisible = ref<boolean>(false);

  // 侧边栏配色方案 (经典蓝/极简白)
  const sidebarColorScheme = useStorage<string>(
    STORAGE_KEYS.SIDEBAR_COLOR_SCHEME,
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

  // 监听主题变化，自动应用样式
  watch(
    [theme, themeColor],
    ([newTheme, newThemeColor]: [ThemeMode, string]) => {
      toggleDarkMode(newTheme === ThemeMode.DARK);
      // const colors = generateThemeColors(newThemeColor, newTheme);
      // applyTheme(colors);
    },
    { immediate: true }
  );

  // 监听侧边栏配色变化
  watch(
    [sidebarColorScheme],
    ([newSidebarColorScheme]) => {
      toggleSidebarColor(newSidebarColorScheme === SidebarColor.CLASSIC_BLUE);
    },
    { immediate: true }
  );

  // 主题更新方法
  function updateSidebarColorScheme(newScheme: string) {
    sidebarColorScheme.value = newScheme;
  }

  // 主题更新方法
  function updateTheme(newTheme: ThemeMode): void {
    theme.value = newTheme;
  }

  return {
    settingsVisible,
    sidebarColorScheme,
    layout,
    themeColor,
    theme,
    showAppLogo,
    showWatermark,
    showTagsView,
    updateSidebarColorScheme,
    updateTheme,
  };
});

/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useSettingsStoreHook() {
  return useSettingsStore(store);
}
