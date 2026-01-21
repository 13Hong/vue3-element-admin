import type { RouteRecordRaw } from "vue-router";

export const Layout = () => import("@/layout/index.vue");

const performanceRoutes: RouteRecordRaw[] = [
  {
    path: "/performance",
    name: "Performance",
    component: Layout,
    redirect: "/performance/virtual-list",
    meta: {
      title: "性能优化",
      icon: "performance",
    },
    children: [
      {
        path: "virtual-list",
        name: "VirtualList",
        component: () => import("@/views/performance/virtualList/index.vue"),
        meta: {
          title: "虚拟列表",
          icon: "document",
          keepAlive: true,
        },
      },
    ],
  },
];

export default performanceRoutes;
