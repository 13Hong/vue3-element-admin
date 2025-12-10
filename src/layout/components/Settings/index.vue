<template>
  <el-drawer
    v-model="drawerVisible"
    size="380"
    :title="t('settings.project')"
    :before-close="handleCloseDrawer"
    class="settings-drawer"
  >
    <div class="settings-content">
      <section class="config-section">
        <el-divider>{{ t("settings.theme") }}</el-divider>

        <div class="flex-center">
          <el-switch
            v-model="isDark"
            active-icon="Moon"
            inactive-icon="Sunny"
            class="theme-switch"
            @change="handleThemeChange"
          />
        </div>
      </section>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { useSettingsStore } from "@/store";
import { ThemeMode } from "@/enums";

const settingsStore = useSettingsStore();
const { t } = useI18n();

const drawerVisible = computed({
  get: () => settingsStore.settingsVisible,
  set: (value) => (settingsStore.settingsVisible = value),
});

/**
 * 关闭抽屉前的回调
 */
const handleCloseDrawer = () => {
  settingsStore.settingsVisible = false;
};

const isDark = ref<boolean>(settingsStore.theme === ThemeMode.DARK);

/**
 * 处理主题切换
 *
 * @param isDark 是否启用暗黑模式
 */
const handleThemeChange = (isDark: string | number | boolean) => {
  settingsStore.updateTheme(isDark ? ThemeMode.DARK : ThemeMode.LIGHT);
};
</script>

<style lang="scss" scoped>
/* 设置抽屉样式 */
.settings-drawer {
  :deep(.el-drawer__body) {
    position: relative;
    height: 100%;
    padding: 0;
    overflow: hidden;
  }
}

/* 设置内容区域 */
.settings-content {
  height: calc(100vh - 120px); /* 减去头部和底部按钮的高度 */
  padding: 20px;
  overflow-y: auto;
}

/* 主题切换器优化 */
.theme-switch {
  transform: scale(1.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.25);
  }
}

.config-section {
  margin-bottom: 24px;

  .config-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--el-border-color-light);
    transition: all 0.3s ease;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      padding-right: 8px;
      padding-left: 8px;
      margin: 0 -8px;
      background-color: var(--el-fill-color-light);
      border-radius: 6px;
    }
  }
}
</style>
