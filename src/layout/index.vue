<template>
  <div class="layout" :class="layoutClass">
    <!-- 侧边栏 -->

    <Sidebar class="layout__sidebar" />
  </div>
</template>

<script setup lang="ts">
// 状态管理
import { useAppStore, useSettingsStore } from "@/store";

// 枚举
import { DeviceEnum } from "@/enums/settings/device.enum";

const appStore = useAppStore();
const settingsStore = useSettingsStore();

// 计算属性：布局样式
const layoutClass = computed(() => ({
  hideSideBar: !appStore.sidebar.opened,
  openSideBar: appStore.sidebar.opened,
  mobile: appStore.device === DeviceEnum.MOBILE,
  [`layout-${settingsStore.layout}`]: true,
}));
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }

  &__sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: $sidebar-width;
    background-color: $menu-background;
    transition: width 0.28s;

    :deep(.el-menu) {
      border: none;
    }
  }

  &__main {
    position: relative;
    height: 100%;
    margin-left: $sidebar-width;
    overflow-y: auto;
    transition: margin-left 0.28s;

    .fixed-header {
      position: sticky;
      top: 0;
      z-index: 9;
      transition: width 0.28s;
    }
  }
}

// 占位符选择器
%layout__sidebar--horizontal {
  width: 100% !important;
  height: $navbar-height;

  :deep(.el-scrollbar) {
    flex: 1;
    height: $navbar-height;
  }

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title),
  :deep(.el-menu--horizontal) {
    height: $navbar-height;
    line-height: $navbar-height;
  }
}

.layout-top {
  .layout__sidebar {
    position: sticky;
    display: flex;
    @extend %layout__sidebar--horizontal;
  }

  .layout__main {
    height: calc(100vh - $navbar-height);
    margin-left: 0;
  }
}

.layout-mix {
  .layout__sidebar {
    @extend %layout__sidebar--horizontal;
  }

  .layout__container {
    display: flex;
    height: 100%;
    padding-top: $navbar-height;

    .layout__sidebar--left {
      position: relative;
      width: $sidebar-width;
      height: 100%;
      background-color: var(--menu-background);

      :deep(.el-scrollbar) {
        height: calc(100vh - $navbar-height - 50px);
      }

      :deep(.el-menu) {
        height: 100%;
        border: none;
      }

      .layout__sidebar-toggle {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;
        line-height: 50px;
        box-shadow: 0 0 6px -2px var(--el-color-primary);
      }
    }

    .layout__main {
      flex: 1;
      min-width: 0;
      margin-left: 0;
    }
  }
}

.hideSidebar {
  &.layout-left {
    .layout__main {
      margin-left: $sidebar-width-collapsed;
    }
  }

  &.layout-top {
    .layout__main {
      margin-left: 0;
    }
  }

  &.layout-mix {
    .layout__sidebar {
      width: 100%;
    }

    .layout__container {
      .layout__sidebar--left {
        width: $sidebar-width-collapsed;
      }
    }
  }
}

.layout-left {
  &.hideSidebar {
    .layout__sidebar {
      width: $sidebar-width-collapsed;
    }

    .layout__main {
      margin-left: $sidebar-width-collapsed;
    }

    &.mobile {
      .layout__sidebar {
        pointer-events: none;
        transform: translate3d(-$sidebar-width, 0, 0);
        transition-duration: 0.3s;
      }

      .layout__main {
        margin-left: 0;
      }
    }
  }
  &.openSidebar {
    &.mobile {
      .layout__main {
        margin-left: 0;
      }
    }
  }
}
</style>
