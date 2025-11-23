import { ThemeMode } from "@/enums";

/**
 * 切换黑暗模式
 *
 * @param isDark 是否启用暗黑模式
 */
export function toggleDarkMode(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add(ThemeMode.DARK);
  } else {
    document.documentElement.classList.remove(ThemeMode.DARK);
  }
}

/**
 * 切换浅色主题下的侧边栏颜色方案
 *
 * @param isBlue 布尔值，表示是否开启深蓝色侧边栏颜色方案
 */
export function toggleSidebarColor(isBlueSidebar: boolean) {
  if (isBlueSidebar) {
    document.documentElement.classList.add("sidebar-color-blue");
  } else {
    document.documentElement.classList.remove("sidebar-color-blue");
  }
}
