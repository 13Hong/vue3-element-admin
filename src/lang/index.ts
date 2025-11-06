import { createI18n } from "vue-i18n";
import type { App } from "vue";

// 本地语言包

const i18n = createI18n({
  legacy: false, // 启用 Composition API 模式
  locale: "zh-CN", // 设置当前语言
  globalInjection: true, // 全局注册 $t 函数
  messages: {
    // 语言包字典
    "zh-CN": {
      login: "测试国际化",
    },
    en: {
      login: "Test Internationalization",
    },
  },
});

// 全局注册
export function setupI18n(app: App<Element>) {
  app.use(i18n);
}

export default i18n;
