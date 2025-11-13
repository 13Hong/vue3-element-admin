import { useAppStore, useSettingsStore } from "@/store";

/**
 * 布局相关的通用逻辑
 */
export function useLayout() {
  const appStore = useAppStore();
  const settingsStore = useSettingsStore();

  // 计算当前布局模式
  const currentLayout = computed(() => settingsStore.layout);

  // 侧边栏展开状态
  const isSidebarOpen = computed(() => appStore.sidebar.opened);

  // 是否显示标签页视图
  const isShowTagsView = computed(() => settingsStore.showTagsView);

  // 是否显示Logo
  const isShowLogo = computed(() => settingsStore.showAppLogo);

  // 是否移动设备
  const isMobile = computed(() => appStore.device === "mobile");

  // 布局CSS类
  const layoutClass = computed(() => ({
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    mobile: appStore.device === "mobile",
    [`layout-${settingsStore.layout}`]: true,
  }));

  /**
   * 处理切换侧边栏的展开/收起状态
   */
  function toggleSidebar() {
    appStore.toggleSidebar();
  }

  /**
   * 关闭侧边栏
   */
  function closeSidebar() {
    appStore.closeSideBar();
  }

  return {
    currentLayout,
    isSidebarOpen,
    isMobile,
    layoutClass,
    isShowTagsView,
    isShowLogo,
    toggleSidebar,
    closeSidebar,
  };
}
