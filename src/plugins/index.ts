import type { App } from "vue";
import { setupRoute } from "@/router";
import { setupStore } from "@/store";
import { setupIcons } from "./icons";
import { setupI18n } from "@/lang";
import { setupPermission } from "./permission";
import { setupDirective } from "@/directives";

export default {
  install(app: App<Element>) {
    // 路由(Router)
    setupRoute(app);
    // 状态管理(Store)
    setupStore(app);
    // 图标(Icons)
    setupIcons(app);
    // 国际化
    setupI18n(app);
    // 路由守卫
    setupPermission();
    // 自定义指令(directive)
    setupDirective(app);
  },
};
