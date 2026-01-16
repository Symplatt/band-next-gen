<!-- src/views/AboutView.vue -->

<template>
  <div class="about-view">
    <div class="page-container">
      <MarkDownViewer :content="introduction" />
      <MarkDownViewer :content="discalimer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import MarkDownViewer from '@/components/MarkDownViewer.vue'

  // 导入文本
  import introduction from '@/content/项目介绍.md?raw'
  import discalimer from '@/content/免责声明.md?raw'
</script>
