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

    <!-- 数据统计 -->
    <el-row :gutter="10" class="mt-5">
      <!-- 在线用户 -->
      <el-col :span="8" :xs="24" class="mb-3 sm:mb-0">
        <el-card shadow="never" class="h-full flex flex-col">
          <template #header>
            <div class="flex-x-between">
              <span class="text-gray">在线用户</span>
              <el-tag type="danger" size="small">实时</el-tag>
            </div>
          </template>

          <div class="flex-x-between mt-2 flex-1">
            <div class="flex-y-center">
              <span class="text-lg transition-all duration-300 hover:scale-110">
                {{ 0 }}
              </span>
              <span class="ml-2 text-xs text-[#67c23a]">
                <el-icon><Connection /></el-icon>
                已连接
              </span>
              <!-- <span v-else class="ml-2 text-xs text-[#f56c6c]">
                <el-icon><Failed /></el-icon>
                未连接
              </span> -->
            </div>
            <div class="i-svg:people w-8 h-8 animate-[pulse_2s_infinite]" />
          </div>

          <div class="flex-x-between mt-2 text-sm text-gray">
            <span>更新时间</span>
            <span>{{ 0 }}</span>
          </div>
        </el-card>
      </el-col>

      <!-- 访客数 -->
      <el-col :span="8" :xs="24" class="mb-3 sm:mb-0">
        <el-skeleton :loading="visitStatusLoading" :row="5" animated>
          <template #template>
            <el-card>
              <template #header>
                <div>
                  <el-skeleton-item variant="h3" style="width: 40%" />
                  <el-skeleton-item variant="rect" style="float: right; width: 1em; height: 1em" />
                </div>
              </template>

              <div class="flex-x-between">
                <el-skeleton-item variant="text" style="width: 30%" />
                <el-skeleton-item variant="circle" style="width: 2em; height: 2em" />
              </div>
              <div class="flex-x-between mt-5">
                <el-skeleton-item variant="text" style="width: 50%" />
                <el-skeleton-item variant="text" style="width: 1em" />
              </div>
            </el-card>
          </template>

          <template v-if="!visitStatusLoading">
            <el-card shadow="never" class="h-full flex flex-col">
              <template #header>
                <div class="flex-x-between">
                  <span class="text-gray">访客数(UV)</span>
                  <el-tag type="success" size="small">日</el-tag>
                </div>
              </template>

              <div class="flex-x-between mt-2 flex-1">
                <div class="flex-y-center">
                  <span class="text-lg">{{ Math.round(transitionUvCount) }}</span>
                  <span
                    :class="[
                      'text-xs',
                      'ml-2',
                      computeGrowthRateClass(visitStatsData.uvGrowthRate),
                    ]"
                  >
                    <el-icon>
                      <Top v-if="visitStatsData.uvGrowthRate > 0" />
                      <Bottom v-if="visitStatsData.uvGrowthRate < 0" />
                    </el-icon>
                    {{ formatGrowthRate(visitStatsData.uvGrowthRate) }}
                  </span>
                </div>
                <div class="i-svg:visitor w-8 h-8" />
              </div>

              <div class="flex-x-between mt-2 text-sm text-gray">
                <span>总访客数</span>
                <span>{{ Math.round(transitionTotalUvCount) }}</span>
              </div>
            </el-card>
          </template>
        </el-skeleton>
      </el-col>

      <!-- 浏览量 -->
      <el-col :span="8" :xs="24"></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store";
import { Connection } from "@element-plus/icons-vue";
import { formatGrowthRate } from "@/utils";

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

// 访客统计数据加载状态
const visitStatusLoading = ref(false);
// 访客统计数据
const visitStatsData = ref({
  todayUvCount: 0,
  uvGrowthRate: 0,
  totalUvCount: 0,
  todayPvCount: 0,
  pvGrowthRate: 0,
  totalPvCount: 0,
});

// 数字过渡动画
const transitionUvCount = useTransition(
  computed(() => visitStatsData.value.todayUvCount),
  {
    duration: 1000,
    transition: [0.25, 0.1, 0.25, 1.0], // CSS cubic-bezier
  }
);

const transitionTotalUvCount = useTransition(
  computed(() => visitStatsData.value.totalUvCount),
  {
    duration: 1200,
    transition: [0.25, 0.1, 0.25, 1.0],
  }
);

/**
 * 根据增长率计算对应的 CSS 类名
 *
 * @param growthRate - 增长率数值
 */
const computeGrowthRateClass = (growthRate?: number): string => {
  if (!growthRate) {
    return "text-[--el-color-info]";
  }
  if (growthRate > 0) {
    return "text-[--el-color-danger]";
  } else if (growthRate < 0) {
    return "text-[--el-color-success]";
  } else {
    return "text-[--el-color-info]";
  }
};
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
