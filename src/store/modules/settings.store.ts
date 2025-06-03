import defaultSettings from '@/settings'
import { ThemeMode } from "@/enums/settings/theme.enum";
import { LayoutMode } from "@/enums/settings/layout.enum";
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settings',() => {
    // 标签视图
    const tagsView = useStorage<boolean>("tagsView", defaultSettings.tagsView);
    // 侧边栏 Logo
    const sidebarLogo = useStorage<boolean>("sidebarLogo", defaultSettings.sidebarLogo);
    // 侧边栏配色方案 (经典蓝/极简白)
    const sidebarColorScheme = useStorage<string>(
        "sidebarColorScheme",
        defaultSettings.sidebarColorScheme
    );
    // 布局
    const layout = useStorage<LayoutMode>("layout", defaultSettings.layout as LayoutMode);

    // 主题
    const themeColor = useStorage<string>("themeColor", defaultSettings.themeColor);
    const theme = useStorage<ThemeMode>("theme", defaultSettings.theme);


    return {
        tagsView,
        sidebarLogo,
        sidebarColorScheme,
        layout,
        themeColor,
        theme
    }
})