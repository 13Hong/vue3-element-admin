<script setup lang="ts">
import { useAppStore } from "@/store";
// import DefaultSettings from '@/settings'
// import { ThemeMode } from '@/enums/settings/theme.enum'
import { ComponentSize } from "@/enums/settings/layout.enum";

const appStore = useAppStore();
// const settingsStore = useSettingsStore()

const locale = computed(() => appStore.locale);
const size = computed(() => appStore.size as ComponentSize);
</script>

<template>
  <el-config-provider :locale="locale" :size="size">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss" scoped></style>
