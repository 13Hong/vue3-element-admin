import type { App } from "vue";
import { createRouter,createWebHashHistory,type RouteRecordRaw } from "vue-router";

// export const Layout = () => import('@/layout/index.vue')

// 静态路由
export const constantRoutes:RouteRecordRaw[] = [

]

/** 创建路由 */
const router = createRouter({
    history:createWebHashHistory(),
    routes:constantRoutes,
    // 刷新时，滚动条位置还原
    scrollBehavior:() => ({ left:0 , top:0 })
})

// 全局注册 router
export function setupRoute(app:App<Element>) {
    app.use(router)
}

export default router
