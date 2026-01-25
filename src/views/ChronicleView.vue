<template>
  <div class="chronicle-view">
    <div class="page-container">
      <article class="content-card"><MarkDownViewer :content="chronicle" :indent="2" /></article>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import MarkDownViewer from '@/components/MarkDownViewer.vue'
  import chronicle from '@/content/chronicle.md?raw'
</script>

<style lang="css" scoped>
  .chronicle-view {
    /* 强制宽度为100% */
    width: 100%;
    margin-top: 40px;

    /* 隐藏横向溢出，锁死页面宽度 */
    overflow-x: hidden;
    font-size: 2rem;
    color: #fff;
    text-align: center;
  }

  .content-card {
    /* 关键：包含内边距和边框在宽度计算内，防止溢出偏移 */
    box-sizing: border-box;

    /* 黄金阅读宽度，限制最大宽度 */
    max-width: 860px;

    /* 桌面端保持较大的内边距 */
    padding: 0 80px;

    /* 水平居中并设置底部间距 */
    margin: 0 auto 60px;
    background: linear-gradient(180deg, rgb(255 255 255 / 3%) 0%, rgb(255 255 255 / 0%) 100%);
    border: 1px solid rgb(212 175 55 / 10%);
    border-radius: 4px;
  }

  /* 移动端适配样式 */
  @media (width <= 768px) {
    .chronicle-view {
      /* 移动端减小顶边距 */
      margin-top: 0;

      /* 移动端减小字体基准大小 */
      font-size: 1rem;
    }

    .page-container {
      /* 关键：防止padding撑大容器导致整体偏移 */
      box-sizing: border-box;
      width: 100%;

      /* 设置移动端容器内边距 */
      padding: 0 5px;
    }

    .content-card {
      /* 移动端宽度占比较大 */
      width: 100%;

      /* 减小内边距以增加内容显示区域 */
      padding: 10px 30px;
    }
  }
</style>
