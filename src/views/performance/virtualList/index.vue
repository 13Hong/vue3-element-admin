<template>
  <div class="page">
    <div class="toolbar">
      <div class="title">虚拟列表 Demo</div>

      <div class="controls">
        <input
          v-model="kw"
          class="input"
          placeholder="输入关键字过滤（仅过滤展示窗口，不阻塞滚动）"
        />
        <button class="btn" @click="scrollToTop">回到顶部</button>
        <button class="btn" @click="scrollTo10000">跳到 10000</button>
        <span class="info">总数据：{{ total }}，当前过滤：{{ filteredCount }}</span>
      </div>
    </div>

    <RecycleScroller
      ref="scrollerRef"
      v-slot="{ item, index }"
      class="scroller"
      :items="renderItems"
      :item-size="ROW_HEIGHT"
      key-field="id"
      :buffer="400"
    >
      <div class="row">
        <div class="left">
          <div class="main">
            <span class="idx">#{{ item.id }}</span>
            <span class="txt">{{ item.title }}</span>
          </div>
          <div class="sub">{{ item.desc }}</div>
        </div>

        <div class="right">
          <button class="op" @click="handleClick(item.id)">操作</button>
        </div>
      </div>
    </RecycleScroller>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { RecycleScroller } from "vue3-virtual-scroller";
import "vue3-virtual-scroller/dist/vue3-virtual-scroller.css";

type Row = { id: number; title: string; desc: string };

const ROW_HEIGHT = 65;
const total = 100_000;

// 注意：数据本身不必做深层响应式（ref 包一层就够）
const list = ref<Row[]>(
  Array.from({ length: total }, (_, i) => ({
    id: i,
    title: `第 ${i} 条数据`,
    desc: `描述：用于模拟后台列表行内容 ${"x".repeat(24)}`,
  }))
);

const kw = ref("");

// ✅ 性能要点：不要把“过滤后的超大数组”每次都重新生成（会产生大 GC）。
// 这里做一个折中：
// - kw 为空：直接用原始 list（10 万）给虚拟列表
// - kw 有值：返回过滤结果（通常数量会明显变小）
// 若你要对 10 万做高频搜索，建议把搜索放到 Worker。
const renderItems = computed(() => {
  const k = kw.value.trim();
  if (!k) return list.value;
  return list.value.filter((x) => x.title.includes(k) || x.desc.includes(k));
});

const filteredCount = computed(() => renderItems.value.length);

const scrollerRef = ref<InstanceType<typeof RecycleScroller> | null>(null);

function handleClick(id: number) {
  console.log("click", id);
}

function scrollToTop() {
  scrollerRef.value?.scrollToItem?.(0);
}

function scrollTo10000() {
  // 如果过滤后不足 10000，会自动滚到最后附近
  const target = Math.min(10_000, renderItems.value.length - 1);
  if (target >= 0) scrollerRef.value?.scrollToItem?.(target);
}
</script>

<style scoped>
.page {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: calc(100vh - 84px);
  padding: 12px;
}

.toolbar {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.input {
  width: 360px;
  height: 32px;
  padding: 0 10px;
  outline: none;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
}

.btn {
  height: 32px;
  padding: 0 10px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
}

.info {
  font-size: 12px;
  color: #666;
}

.scroller {
  flex: 1;
  height: 0;
  contain: layout paint;
  overflow: auto;
  border: 1px solid #ebeef5;
  border-radius: 10px;
}

.row {
  box-sizing: border-box;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  height: 65px;
  padding: 8px 12px;
  border-bottom: 1px solid #f2f2f2;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.main {
  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 0;
}

.idx {
  width: 84px;
  font-variant-numeric: tabular-nums;
  color: #999;
}

.txt {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sub {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: #888;
  white-space: nowrap;
}

.right {
  display: flex;
  align-items: center;
}

.op {
  height: 28px;
  padding: 0 10px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
}
</style>
