import type { App } from "vue";
import { createPinia } from "pinia";

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export * from "./modules/app.store";
export * from "./modules/settings.store";
export * from "./modules/user.store";
export * from "./modules/permission.store";
export { store };
