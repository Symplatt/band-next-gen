<template>
  <div class="markdown-body" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
  import MarkdownIt from 'markdown-it'
  import { computed } from 'vue'

  // 接受传来的md 内容
  const props = defineProps<{ content: string }>()

  // 初始化解析器
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true,
  })

  // 使用计算属性，防止content变化时，重新渲染
  const renderedContent = computed(() => {
    return props.content ? md.render(props.content) : ''
  })
</script>

<style scoped>
  /* 核心：使用 :deep() 穿透 v-html 的内容 */
  .markdown-body :deep(h1),
  .markdown-body :deep(h2),
  .markdown-body :deep(h3) {
    padding-bottom: 0.3em;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
    font-family: 'Noto Serif SC', serif;
    color: #d4af37; /* 金色标题 */
    border-bottom: 1px solid rgb(212 175 55 / 20%); /* 标题下加个淡淡的金线 */
  }

  .markdown-body :deep(h1) {
    font-size: 2.5rem;
    text-align: center;
  }

  .markdown-body :deep(h2) {
    font-size: 1.8rem;
  }

  /* 正文样式 */
  .markdown-body :deep(p) {
    margin-bottom: 1.2em;
    font-size: 1.1rem;
    line-height: 1.8;
    color: #c5c6c7;
  }

  /* 列表样式 */
  .markdown-body :deep(ul),
  .markdown-body :deep(ol) {
    padding-left: 2em;
    margin-bottom: 1.2em;
    color: #c5c6c7;
  }

  .markdown-body :deep(li) {
    margin-bottom: 0.5em;
  }

  /* 链接样式 */
  .markdown-body :deep(a) {
    color: #ff2e63; /* 强调色，比如粉红 */
    text-decoration: none;
    border-bottom: 1px dashed #ff2e63;
    transition: all 0.3s;
  }

  .markdown-body :deep(a:hover) {
    color: #d4af37;
    border-bottom-color: #d4af37;
  }

  /* 引用块样式 */
  .markdown-body :deep(blockquote) {
    padding: 10px 20px;
    margin: 1.5em 0;
    font-style: italic;
    color: #888;
    background: rgb(255 255 255 / 5%);
    border-left: 4px solid #d4af37;
  }

  /* 代码块 */
  .markdown-body :deep(code) {
    padding: 2px 6px;
    font-family: monospace;
    color: #e0e0e0;
    background: rgb(255 255 255 / 10%);
    border-radius: 4px;
  }
</style>
