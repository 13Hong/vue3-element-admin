import type { App } from "vue";
import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/index.vue");

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  // {
  //     path: "/login",
  //     component: () => import("@/views/login/index.vue"),
  //     meta: { hidden: true },
  // },
  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        // 用于 keep-alive 功能，需要与 SFC 中自动推导或显式声明的组件名称一致
        // 参考文档: https://cn.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
        meta: { title: "dashboard", icon: "homepage", affix: true, keepAlive: true },
      },
      {
        path: "401",
        component: () => import("@/views/error/401.vue"),
        meta: { hidden: true }, // 标记在导航菜单中隐藏
      },
      {
        path: "404",
        component: () => import("@/views/error/404.vue"),
        meta: { hidden: true }, // 标记在导航菜单中隐藏
      },
    ],
  },
];

/** 创建路由 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 全局注册 router
export function setupRoute(app: App<Element>) {
  app.use(router);
}

export default router;
