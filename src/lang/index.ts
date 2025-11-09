import { createI18n } from "vue-i18n";
import type { App } from "vue";
import enLocale from "./package/en.json";
import zhCnLocale from "./package/zh-cn.json";

// 本地语言包
const messages = {
  "zh-cn": zhCnLocale,
  en: enLocale,
};

const i18n = createI18n({
  legacy: false, // 启用 Composition API 模式
  locale: "zh-cn", // 设置当前语言
  globalInjection: true, // 全局注册 $t 函数
  messages: messages,
});

// 全局注册
export function setupI18n(app: App<Element>) {
  app.use(i18n);
}

export default i18n;
