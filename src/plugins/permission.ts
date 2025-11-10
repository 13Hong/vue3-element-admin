import router from "@/router";
import { useUserStore } from "@/store";

export function setupPermission() {
  const whiteList = ["/login"];

  router.beforeEach(async (to, from, next) => {
    try {
      const isLoggedIn = useUserStore().isLoggedIn();
      console.log("这是to", to);

      // 未登录处理
      if (!isLoggedIn) {
        if (whiteList.includes(to.path)) {
          next();
        } else {
          next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
          // NProgress.done()
        }
        return;
      }

      // 已登录登录页重定向
      if (to.path === "/login") {
        next({ path: "/" });
        return;
      }

      // const permissionStore = usePermissionStore()
      // const userStore = useUserStore()

      // 动态路由生成
      // if(!permissionStore.isRouteGenerated){

      // }

      // 路由404检查
      if (to.matched.length === 0) {
        next("/404");
        return;
      }

      next();
    } catch (error) {
      // 错误处理：重置状态并跳转登录
      console.error("Route guard error:", error);
      // await useUserStore.resetAllState()
      next("/login");
      // NProgress.done()
    }
  });

  router.afterEach(() => {
    // NProgress.done()
  });
}
