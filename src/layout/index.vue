<template>
  <div class="layout-wrapper">
    <component :is="currentLayoutComponent" />

    <!-- 设置面板 - 独立于布局组件 -->
    <Settings v-if="isShowSettings" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useLayout } from "@/composables/layout/uesLayout";
import { LayoutMode } from "@/enums";
import LeftLayout from "./modes/left/index.vue";
import Settings from "./components/Settings/index.vue";
import { defaultSettings } from "@/settings";

const { currentLayout } = useLayout();
const route = useRoute();

// select the corresponding component based on the current layout mode
const currentLayoutComponent = computed(() => {
  const override = route.meta?.layout as LayoutMode | undefined;
  const layoutToUse = override ?? currentLayout.value;
  switch (layoutToUse) {
    case LayoutMode.LEFT:
    default:
      return LeftLayout;
  }
});

/// Whether to show the settings panel
const isShowSettings = computed(() => defaultSettings.showSettings);
</script>

<style lang="scss" scoped>
.layout-wrapper {
  width: 100%;
  height: 100%;
}
</style>
