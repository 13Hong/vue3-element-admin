import type { App } from "vue";
import { hasPerm } from "./permission";

// 全局注册 directive
export function setupDirective(app: App<Element>) {
  app.directive("hasPerm", hasPerm);
}
