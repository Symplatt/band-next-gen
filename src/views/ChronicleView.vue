// views/CharactersView.vue

<template>
  <div class="chronicle-view">
    <div class="page-container">
      <article class="content-card"><MarkDownViewer :content="chronicle" :indent="2" /></article>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import MarkDownViewer from '@/components/MarkDownViewer.vue'
  import chronicle from '@/content/纪事.md?raw'
</script>

<style lang="css" scoped>
  .chronicle-view {
    margin-top: 40px;
    font-size: 2rem;
    color: #fff;
    text-align: center;
  }

  .content-card {
    max-width: 860px; /* 黄金阅读宽度 */

    /* 可选：加一个极淡的背景，让文字不那么“飘” */
    padding: 0 80px;
    margin: 0 auto 60px; /* 居中，底部留白 */
    background: linear-gradient(180deg, rgb(255 255 255 / 3%) 0%, rgb(255 255 255 / 0%) 100%);
    border: 1px solid rgb(212 175 55 / 10%);
    border-radius: 4px;
  }
</style>
