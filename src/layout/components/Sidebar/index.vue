<template>
  <SidebarLogo v-if="sidebarLogo" :collapse="isSidebarCollapsed" />
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/index";

const appStore = useAppStore();
const sidebarLogo = ref(true);

const isSidebarCollapsed = computed(() => !appStore.sidebar.opened);
</script>

<style lang="scss" scoped></style>
