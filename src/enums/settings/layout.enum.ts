/**
 * 菜单布局枚举
 */
export const enum LayoutMode {
  LEFT = "left", // 左侧菜单布局
  TOP = "top", // 顶部菜单布局
  MIX = "mix", // 混合布局
}

/**
 * 侧边栏状态枚举
 */
export const enum SidebarStatus {
  /**
   * 展开
   */
  OPENED = "opened",

  /**
   * 关闭
   */
  CLOSED = "closed",
}

/**
 * 组件尺寸枚举
 */
export const enum ComponentSize {
  /**
   * 默认
   */
  DEFAULT = "default",

  /**
   * 大型
   */
  LARGE = "large",

  /**
   * 小型
   */
  SMALL = "small",
}
