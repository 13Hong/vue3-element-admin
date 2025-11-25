import { LayoutMode, ThemeMode, ComponentSize, LanguageEnum, SidebarColor } from "./enums";

// 检查用户的操作系统是否使用深色模式
const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

export const defaultSettings: AppSettings = {
  // 系统Title
  // title: pkg.name,
  title: "vue3-element-admin",
  //   // 系统版本
  version: "1.0.0",
  // 是否显示设置
  showSettings: true,
  // 是否显示标签视图
  showTagsView: true,
  // 是否显示侧边栏Logo
  showAppLogo: true,
  // 布局方式，默认为左侧布局
  layout: LayoutMode.LEFT,
  // 主题，根据操作系统的色彩方案自动选择
  theme: mediaQueryList.matches ? ThemeMode.DARK : ThemeMode.LIGHT,
  // 组件大小 default | medium | small | large
  size: ComponentSize.DEFAULT,
  // 语言
  language: LanguageEnum.ZH_CN,
  // 主题颜色
  themeColor: "#4080FF",
  // 是否开启水印
  showWatermark: false,
  //   // 水印内容
  watermarkContent: "test",
  //   // 侧边栏配色方案
  sidebarColorScheme: SidebarColor.CLASSIC_BLUE,
};

/**
 * 认证功能配置
 */
export const authConfig = {
  /**
   * Token自动刷新开关
   *
   * true: 启用自动刷新 - ACCESS_TOKEN_INVALID时尝试刷新token
   * false: 禁用自动刷新 - ACCESS_TOKEN_INVALID时直接跳转登录页
   *
   * 适用场景：后端没有刷新接口或不需要自动刷新的项目可设为false
   */
  enableTokenRefresh: true,
} as const;
