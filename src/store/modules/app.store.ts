import defaultSettings from '@/settings'

// 导入 ElementPlus 语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { SidebarStatus } from '@/enums'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAppStore = defineStore('app',() => {
    // 布局大小
    const size = useStorage("size", defaultSettings.size)
    // 语言
    const language = useStorage("locale", defaultSettings.language)
    // 侧边栏状态
    const sidebarStatus = useStorage("sidebarStatus", SidebarStatus.CLOSED)
    const sidebar = reactive({
        opened: sidebarStatus.value === SidebarStatus.OPENED,
        withoutAnimation: false,
      });
      
    /**
     * 根据语言表示识别对应的语言包
     */  
    const locale = computed(() => {
        if(language?.value == 'en') {
            return en
        } else {
            return zhCn
        }
    })

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
        locale,
        changeLanguage
    }

})