declare module "*.css" {
  const content: any;
  export default content;
}

declare module "element-plus/theme-chalk/dark/css-vars.css" {
  const content: any;
  export default content;
}

declare module "uno.css" {
  const content: any;
  export default content;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
