<template>
  <div class="if-display" v-if="ifDisplay">
    <Transition name="fade">
      <div v-show="visible" class="back-to-top" @click="scrollToTop" title="Return to Top">
        <div class="arrow-up"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  const visible = ref(false)
  const SCROLL_THRESHOLD = 300 // 滚动多少像素后显示按钮

  const handleScroll = () => {
    // 使用 requestAnimationFrame 优化性能，避免滚动时频繁触发重绘
    requestAnimationFrame(() => {
      visible.value = window.scrollY > SCROLL_THRESHOLD
    })
  }

  defineProps<{
    ifDisplay: boolean
  }>()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 平滑滚动
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<style scoped>
  .back-to-top {
    position: fixed;
    right: 40px;
    bottom: 40px;
    z-index: 999; /* 确保在最上层 */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: rgb(0 0 0 / 60%);
    border: 1px solid #d4af37;
    border-radius: 4px; /* 或者 50% 变成圆形 */
    box-shadow: 0 4px 12px rgb(0 0 0 / 50%);
    transition: all 0.3s ease;
  }

  .back-to-top:hover {
    background-color: #d4af37;
    box-shadow: 0 6px 16px rgb(212 175 55 / 30%);
    transform: translateY(-5px); /* 悬浮时微微上浮 */
  }

  /* 纯 CSS 画一个向上的箭头，不用引入图标库 */
  .arrow-up {
    width: 12px;
    height: 12px;
    margin-top: 4px; /* 微调位置让视觉居中 */
    border-top: 2px solid #d4af37;
    border-left: 2px solid #d4af37;
    transform: rotate(45deg);
    transition: border-color 0.3s;
  }

  /* 鼠标悬停时箭头变黑或变白，看你喜好 */
  .back-to-top:hover .arrow-up {
    border-color: #000;
  }

  /* --- Vue Transition 动画 --- */
  .fade-enter-active,
  .fade-leave-active {
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(20px); /* 从下方浮现 */
  }
</style>
