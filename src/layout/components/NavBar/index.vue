<template>
  <div class="navbar">
    <div class="flex-y-center">
      <!-- 菜单折叠按钮 -->
      <Hamburger :is-active="isSidebarOpen" @toggle-click="toggleSideBar" />
      <!-- 面包屑导航 -->
      <Breadcrumb />
    </div>
    <!-- 导航栏操作区域 -->
    <div class="navbar__actions">
      <NavBarActions />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayout } from "@/composables";
import { useAppStore } from "@/store";
import Hamburger from "@/components/Hamburger/index.vue";

const { isSidebarOpen } = useLayout();
const appStore = useAppStore();

// 切换侧边栏展开/折叠状态
const toggleSideBar = () => {
  appStore.toggleSidebar();
};
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: $navbar-height;

  &__actions {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
