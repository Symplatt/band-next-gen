// views/AboutView.vue
<template>
  <div class="about-view">
    <div class="disclaimer">
      <div v-html="html"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import MarkdownIt from 'markdown-it'
  import discalimer from '@/content/disclaimer.md?raw'

  const md = new MarkdownIt()
  const html = md.render(discalimer)
</script>

<style lang="css" scoped>
  .about-view {
    padding: 40px;
  }

  .disclaimer {
    color: antiquewhite;
  }
</style>
