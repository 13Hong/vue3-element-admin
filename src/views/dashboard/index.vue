<template>
  <div class="dashboard-container">
    <!-- github 角标 -->
    <github-corner class="github-corner" />

    <el-card shadow="never" class="mt-2">
      <div class="flex flex-wrap">
        <!-- 左侧问候语区域 -->
        <div class="flex-1 flex items-start">
          <img
            class="w80px h80px rounded-full"
            :src="userStore.userInfo.avatar + '?imageView2/1/w/80/h/80'"
          />
          <div class="ml-5">
            <p>{{ greetings }}</p>
            <p class="text-sm text-gray">新的一天，也要加油！</p>
          </div>
        </div>

        <!-- 右侧图标区域 - PC端 -->
        <div class="hidden sm:block">
          <div class="flex items-end space-x-6">
            <!-- 仓库 -->
            <div>
              <div class="font-bold color-#ff9a2e text-sm flex items-center">
                <el-icon class="mr-2px"><Folder /></el-icon>
                仓库
              </div>
              <div class="mt-3 whitespace-nowrap">
                <el-link href="#">
                  <div class="i-svg:gitee text-lg color-#F76560" />
                </el-link>
                <el-divider direction="vertical" />
                <el-link href="https://github.com/13Hong/vue3-element-admin" target="_blank">
                  <div class="i-svg:github text-lg color-#4080FF" />
                </el-link>
                <el-divider direction="vertical" />
                <el-link href="#">
                  <div class="i-svg:gitcode text-lg color-#FF9A2E" />
                </el-link>
              </div>
            </div>

            <!-- 文档 -->
            <div>
              <div class="font-bold color-#4080ff text-sm flex items-center">
                <el-icon class="mr-2px"><Document /></el-icon>
                文档
              </div>
              <div class="mt-3 whitespace-nowrap">
                <el-link href="#">
                  <div class="i-svg:juejin text-lg" />
                </el-link>
                <el-divider direction="vertical" />
                <el-link href="#">
                  <div class="i-svg:csdn text-lg" />
                </el-link>
                <el-divider direction="vertical" />
                <el-link href="#">
                  <div class="i-svg:cnblogs text-lg" />
                </el-link>
              </div>
            </div>

            <!-- 视频 -->
            <div>
              <div class="font-bold color-#f76560 text-sm flex items-center">
                <el-icon class="mr-2px"><VideoCamera /></el-icon>
                视频
              </div>
              <div class="mt-3 whitespace-nowrap">
                <el-link href="#">
                  <div class="i-svg:bilibili text-lg" />
                </el-link>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧图标区域 - 移动端 -->
        <div class="w-full sm:hidden mt-3">
          <div class="flex justify-end space-x-4 overflow-x-auto">
            <!-- 仓库图标 -->
            <el-link href="#">
              <div class="i-svg:gitee text-lg color-#F76560" />
            </el-link>
            <el-link href="https://github.com/13Hong/vue3-element-admin" target="_blank">
              <div class="i-svg:github text-lg color-#4080FF" />
            </el-link>
            <el-link href="#">
              <div class="i-svg:gitcode text-lg color-#FF9A2E" />
            </el-link>

            <!-- 文档图标 -->
            <el-link href="#">
              <div class="i-svg:juejin text-lg" />
            </el-link>
            <el-link href="#">
              <div class="i-svg:csdn text-lg" />
            </el-link>
            <el-link href="#">
              <div class="i-svg:cnblogs text-lg" />
            </el-link>

            <!-- 视频图标 -->
            <el-link href="#">
              <div class="i-svg:bilibili text-lg" />
            </el-link>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store";

defineOptions({
  name: "Dashboard",
  inheritAttrs: false,
});

const userStore = useUserStore();

// 当前时间（用于计算问候语）
const currentDate = new Date();

// 问候语：根据当前小时返回不同问候语
const greetings = computed(() => {
  const hours = currentDate.getHours();
  if (hours >= 6 && hours < 8) {
    return "晨起披衣出草堂，轩窗已自喜微凉🌅！";
  } else if (hours >= 8 && hours < 12) {
    return `上午好，hiro！`;
  } else if (hours >= 12 && hours < 18) {
    return `下午好，hiro！`;
  } else if (hours >= 18 && hours < 24) {
    return `晚上好，hiro！`;
  } else {
    return "偷偷向银河要了一把碎星，只等你闭上眼睛撒入你的梦中，晚安🌛！";
  }
});
</script>

<style lang="scss" scoped>
.dashboard-container {
  position: relative;
  padding: 24px;

  .github-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    border: 0;
  }
}
</style>
