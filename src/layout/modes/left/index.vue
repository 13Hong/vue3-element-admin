<template>
  <BaseLayout>
    <!-- 左侧菜单栏 -->
    <div class="layout__sidebar" :class="{ 'layout__sidebar--collapsed': !isSidebarOpen }">
      <div :class="{ 'has-logo': isShowLogo }" class="layout-sidebar">
        <!-- logo -->
        <AppLogo v-if="isShowLogo" :collapse="!isSidebarOpen" />
        <!-- 主菜单内容 -->
      </div>
    </div>
    <!-- 内容区 -->
  </BaseLayout>
</template>

<script lang="ts" setup>
import BaseLayout from "../base/index.vue";
import AppLogo from "../../components/AppLogo/index.vue";
import { useLayout } from "@/composables";

// 布局相关参数
const { isShowLogo, isSidebarOpen } = useLayout();
</script>

<style lang="scss" scoped>
.layout {
  &__sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: $sidebar-width;
    background-color: $menu-background;
    transition: width 0.28s;

    &--collapsed {
      width: $sidebar-width-collapsed;
    }

    .layout-sidebar {
      position: relative;
      height: 100%;
      background-color: var(--menu-background);
      transition: width 0.28s;

      &.has-logo {
        .el-scrollbar {
          height: calc(100vh - $navbar-height);
        }
      }

      :deep(.el-menu) {
        border: none;
      }
    }
  }

  &__main {
    position: relative;
    height: 100%;
    margin-left: $sidebar-width;
    overflow-y: auto;
    transition: margin-left 0.28s;

    &--collapsed {
      margin-left: $sidebar-width-collapsed;
    }

    .fixed-header {
      position: sticky;
      top: 0;
      z-index: 9;
      transition: width 0.28s;
    }
  }
}

/* 移动端样式 */
.mobile {
  .layout__sidebar {
    width: $sidebar-width !important;
    transition:
      transform 0.28s,
      width 0s;
  }

  &.hideSidebar {
    .layout__sidebar {
      transform: translateX(-$sidebar-width);
    }
  }

  &.openSidebar {
    .layout__sidebar {
      transform: translateX(0);
    }
  }

  .layout__main {
    margin-left: 0 !important;
  }
}

.hasTagsView {
  :deep(.app-main) {
    height: calc(100vh - $navbar-height - $tags-view-height) !important;
  }
}
</style>
