import type { App } from "vue";
import { setupRoute } from "@/router";
import { setupStore } from "@/store";
import { setupIcons } from "./icons";

export default {
  install(app: App<Element>) {
    // 路由(Router)
    setupRoute(app);
    // 状态管理(Store)
    setupStore(app);
    // 图标(Icons)
    setupIcons(app);
  },
};
