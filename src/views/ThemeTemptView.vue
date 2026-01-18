<!-- src/views/ThemeTempt.vue -->

<template>
  <div class="about-view">
    <div class="page-container">
      <MarkDownViewer :content="themeTempt" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import MarkDownViewer from '@/components/MarkDownViewer.vue'
  import themeTempt from '@/content/主题试用.md?raw'
</script>
