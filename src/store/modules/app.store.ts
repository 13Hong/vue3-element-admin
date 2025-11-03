import { defaultSettings } from "@/settings";

// 导入 ElementPlus 语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { SidebarStatus, DeviceEnum } from "@/enums";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAppStore = defineStore("app", () => {
  // 设备类型
  const device = useStorage("device", DeviceEnum.DESKTOP);
  // 布局大小
  const size = useStorage("size", defaultSettings.size);
  // 语言
  const language = useStorage("locale", defaultSettings.language);
  // 侧边栏状态
  const sidebarStatus = useStorage("sidebarStatus", SidebarStatus.CLOSED);
  const sidebar = reactive({
    opened: sidebarStatus.value === SidebarStatus.OPENED,
    withoutAnimation: false,
  });

  // 切换侧边栏
  function toggleSidebar() {
    sidebar.opened = !sidebar.opened;
    sidebarStatus.value = sidebar.opened ? SidebarStatus.OPENED : SidebarStatus.CLOSED;
  }

  // 关闭侧边栏
  function closeSidebar() {
    sidebar.opened = false;
    sidebarStatus.value = SidebarStatus.CLOSED;
  }

  // 打开侧边栏
  function openSidebar() {
    sidebar.opened = true;
    sidebarStatus.value = SidebarStatus.OPENED;
  }

  // 切换设备
  function toggleDevice(val: string) {
    device.value = val;
  }

  /**
   * 根据语言表示识别对应的语言包
   */
  const locale = computed(() => {
    if (language?.value == "en") {
      return en;
    } else {
      return zhCn;
    }
  });

  /**
   * 切换语言
   *
   * @param val
   */
  function changeLanguage(val: string) {
    language.value = val;
  }
  return {
    size,
    language,
    sidebarStatus,
    sidebar,
    device,
    locale,
    changeLanguage,
    toggleSidebar,
    openSidebar,
    closeSidebar,
    toggleDevice,
  };
});
