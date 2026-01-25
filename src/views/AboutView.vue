<!-- 「关于」页 -->
<!-- src/views/AboutView.vue -->

<template>
  <div class="about-view">
    <div class="page-container">
      <!-- 主内容区：项目介绍 -->
      <article class="content-card">
        <MarkDownViewer :content="introduction" />
      </article>

      <!-- 底部区：免责声明 (样式做弱化处理) -->
      <footer class="footer-disclaimer">
        <MarkDownViewer :content="discalimer" class="small-text" />
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import MarkDownViewer from '@/components/MarkDownViewer.vue'
  import introduction from '@/content/project.md?raw'
  import discalimer from '@/content/mianze.md?raw'
</script>

<style scoped>
  .about-view {
    min-height: 100vh;
    padding-top: 40px; /* 留出一点顶部呼吸空间 */
    padding-bottom: 100px;
    background-color: #0b0c10;
  }

  /* 核心布局：限制阅读宽度，模拟“文章”感觉 */
  .content-card {
    max-width: 860px; /* 黄金阅读宽度 */
    padding: 0 80px 40px;
    margin: 0 auto;
    background: linear-gradient(180deg, rgb(255 255 255 / 3%) 0%, rgb(255 255 255 / 0%) 100%);
    border: 1px solid rgb(212 175 55 / 10%);
    border-radius: 4px;
  }

  /* 底部免责声明区域 */
  .footer-disclaimer {
    /* 修改：与上方卡片保持相同的最大宽度和水平居中，确保对齐 */
    max-width: 860px;

    /* 修改：水平内边距改为80px，与上方卡片padding保持一致，垂直padding独立设置 */
    padding: 40px 80px;
    margin: 0 auto;
    opacity: 0.6; /* 让免责声明看起来弱一点，不抢视觉 */
    transition: opacity 0.3s;
  }

  .footer-disclaimer:hover {
    opacity: 1;
  }

  /* 手机端适配 */
  @media (width <= 768px) {
    .about-view {
      padding: 0 0 80px;
    }

    .content-card {
      padding: 0;
      margin: 0 0 40px;
      background: none;
      border: none; /* 手机端去掉边框，减少拥挤感 */
    }

    /* 修改：手机端同步调整padding，防止错位 */
    .footer-disclaimer {
      padding: 20px 0;
    }
  }
</style>
