<template>
  <div
    class="markdown-body"
    :style="{ '--para-indent': props.indent }"
    v-html="renderedContent"
  ></div>
</template>

<script setup lang="ts">
  import MarkdownIt from 'markdown-it'
  import { ref, onMounted } from 'vue'

  const props = withDefaults(
    defineProps<{
      content: string // md文件
      indent?: number // 每段开头空几个汉字
    }>(),
    {
      indent: 0,
    },
  )

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true,
  })

  const renderedContent = ref('')

  // md文件懒加载
  onMounted(() => {
    requestIdleCallback
      ? requestIdleCallback(() => {
          renderedContent.value = md.render(props.content)
        })
      : setTimeout(() => {
          renderedContent.value = md.render(props.content)
        }, 0)
  })
</script>

<style scoped>
  .markdown-body {
    width: 100%;

    /* 增加字间距，提升阅读舒适度 */
    letter-spacing: 0.05em;
  }

  /* H1: 页面主标题样式 */
  .markdown-body :deep(h1) {
    margin-top: 0; /* 去掉顶部多余间距 */
    margin-bottom: 1.5em;
    font-family: 'Noto Serif SC', serif;
    font-size: 2.8rem;
    font-weight: 700;
    color: #d4af37;
    text-align: center;
    text-shadow: 0 4px 10px rgb(0 0 0 / 50%);
  }

  /* H2: 章节标题样式 */
  .markdown-body :deep(h2) {
    display: inline-block; /* 为了做下划线效果 */
    padding-bottom: 5px;
    margin-top: 2em;
    margin-bottom: 0.5em;
    font-family: 'Noto Serif SC', serif;
    font-size: 1.5rem;
    color: #fff;
    border-bottom: 2px solid #d4af37; /* 金色短下划线 */
  }

  /* H3: 小标题 */
  .markdown-body :deep(h3) {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-size: 1.2rem;
    font-weight: bold;
    color: #d4af37;
  }

  /* P: 正文优化 */
  .markdown-body :deep(p) {
    margin-bottom: 1.6em;
    font-size: 1.05rem;
    line-height: 1.5; /* 增大行高，防止文字挤在一起 */
    color: #dcdcdc; /* 稍微提亮一点灰色，减少眼睛疲劳 */
    text-align: justify; /* 两端对齐，看起来更整齐 */
    text-indent: calc(var(--para-indent, 0) * 1em);
  }

  /* 强调文本 (加粗) */
  .markdown-body :deep(strong) {
    font-weight: bold;
    color: #fff;
  }

  /* 列表优化 */
  .markdown-body :deep(ul),
  .markdown-body :deep(ol) {
    padding-left: 1.5em;
    margin-bottom: 1.5em;
    color: #dcdcdc;
  }

  .markdown-body :deep(li) {
    margin-bottom: 0.8em;
    line-height: 1.8;
  }

  /* 自定义列表前面的点 */
  .markdown-body :deep(ul li::marker) {
    color: #d4af37;
  }

  /* 引用块：更有设计感 */
  .markdown-body :deep(blockquote) {
    position: relative;
    padding: 20px 30px;
    margin: 2em 0;
    background: rgb(212 175 55 / 5%); /* 极淡的金色背景 */
    border-left: none; /* 去掉默认左边框 */
    border-radius: 8px;
  }

  /* 引用块左上角的装饰引号 */
  .markdown-body :deep(blockquote)::before {
    position: absolute;
    top: -10px;
    left: 10px;
    font-family: serif;
    font-size: 4rem;
    line-height: 1;
    color: rgb(212 175 55 / 20%);
    content: '“';
  }

  /* 链接样式 */
  .markdown-body :deep(a) {
    padding-bottom: 1px;
    color: #d4af37;
    text-decoration: none;
    border-bottom: 1px dashed #d4af37;
    transition: all 0.3s;
  }

  .markdown-body :deep(a:hover) {
    color: #ff2e63;
    background: rgb(212 175 55 / 10%);
    border-bottom-color: #942d4c;
  }

  /* 图片本身 */
  .markdown-body :deep(.qr-img) {
    width: 200px; /* 限制宽度，防止图片太大 */
    max-width: 45%; /* 手机端防止两张图挤不下 */
    height: auto;
    margin-right: 10px;
    border: 1px solid rgb(255 255 255 / 10%);
    border-radius: 8px; /* 圆角好看点 */
    transition: transform 0.3s;
  }

  .markdown-body :deep(.qr-img:hover) {
    border-color: #d4af37;
    transform: scale(1.05); /* 鼠标悬停微微放大 */
  }

  /* --- 特殊处理：免责声明的小字模式 --- */

  /* 如果父组件传了 small-text 类，这里的样式会生效 */
  .small-text :deep(h1) {
    margin-bottom: 1em;
    font-size: 1.5rem;
  }

  .small-text :deep(p) {
    font-size: 0.85rem;
    color: #888;
    text-align: center;
  }
</style>
