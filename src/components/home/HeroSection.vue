<template>
  <section class="hero-section">
    <div class="background-layer">
      <StarryBackground />
      <div class="vignette-mask"></div>
    </div>

    <div class="content-overlay">
      <div class="main-title">乐队子世代</div>
      <div class="divider">
        <div class="line-left"></div>
        <div class="diamond"></div>
        <div class="line-right"></div>
      </div>
      <div class="sub-title">那美好的未来</div>
      <div class="motto">EX-lilith ~ GO Rai</div>
    </div>

    <div class="scroll-hint" :class="{ hidden: !isScrollHintVisible }" @click="onScrollClick">
      <span class="hint-text">SCROLL</span>
      <div class="hint-arrow"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import StarryBackground from './StarryBackground.vue'

  const SCROLL_THRESHOLD = 50

  const isScrollHintVisible = ref(true)

  const emit = defineEmits<{
    (e: 'scroll-next'): void
  }>()

  const onScrollClick = () => {
    emit('scroll-next')
  }

  // 滚动逻辑
  const handleScroll = () => {
    isScrollHintVisible.value = window.scrollY < SCROLL_THRESHOLD
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<style scoped>
  /* 修改：减去导航栏高度72px无法适配手机端浏览器 */
  .hero-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 72px); /* 减去导航栏高度72px */
    overflow: hidden;
  }

  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .vignette-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: radial-gradient(circle at center, transparent 0%, #000205 90%);
  }

  .content-overlay {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    text-align: center;
    transform: translateY(-8vh);
  }

  .main-title {
    font-size: 6rem;
    font-weight: 800;
    letter-spacing: 1.5rem;
    background: linear-gradient(
      to bottom,
      #ff1e56 0%,
      #8e2de2 20%,
      #4a00e0 50%,
      #8e2de2 80%,
      #ff1e56 100%
    );
    background-clip: text;
    background-size: 100% 300%;
    filter: drop-shadow(0 0 12px rgb(142 45 226 / 50%)) drop-shadow(0 5px 2px rgb(0 0 0 / 80%));
    animation:
      flow-purple 15s ease-in-out infinite,
      title-float 6s ease-in-out infinite;
    -webkit-text-fill-color: transparent;
  }

  .sub-title {
    margin-top: 1.2rem;
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    letter-spacing: 2.5rem;
    background: linear-gradient(90deg, #734b16, #d4af37, #fef9e7, #d4af37, #734b16);
    background-clip: text;
    background-size: 200% auto;
    animation: gold-sweep 7s linear infinite;
    -webkit-text-fill-color: transparent;
  }

  .divider {
    display: flex;
    align-items: center;
    width: 900px;
    margin: 2.5rem 0;
  }

  .line-left {
    flex-grow: 1;
    width: 200px;
    height: 1px;
    background: linear-gradient(to right, transparent, #ff2e63, #d4af37, transparent);
  }

  .line-right {
    flex-grow: 1;
    width: 200px;
    height: 1px;
    background: linear-gradient(to right, transparent, #d4af37, #ff2e63, transparent);
  }

  .diamond {
    position: relative;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    margin: 0 20px;
    background: #1a001a;
    border: 1px solid #d4af37;
    box-shadow: 0 0 15px #ff1e56;
    transform: rotate(45deg);
  }

  .diamond::after {
    position: absolute;
    inset: 2px;
    content: '';
    background: #d4af37;
  }

  .motto {
    margin-top: 2.5rem;
    font-family: 'Cinzel Decorative', cursive;
    font-size: 0.85rem;
    color: #6a4c93;
    letter-spacing: 0.8rem;
    opacity: 0.7;
  }

  @keyframes flow-purple {
    0%,
    100% {
      background-position: 50% 0%;
    }

    50% {
      background-position: 50% 100%;
    }
  }

  @keyframes gold-sweep {
    to {
      background-position: 200% center;
    }
  }

  @keyframes title-float {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-8px);
    }
  }

  /* 滚动提示 */
  .scroll-hint {
    position: absolute;
    bottom: 40px;
    left: 50%;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transform: translateX(-50%);
    transition:
      opacity 0.5s ease,
      visibility 0.5s;
  }

  .scroll-hint.hidden {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .hint-text {
    margin-bottom: 20px;
    font-size: 0.8rem;
    color: rgb(222 221 221 / 47.9%);
    letter-spacing: 0.2rem;
  }

  .hint-arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid #c4c4c45e;
    border-bottom: 2px solid #c4c4c45e;
    transform: rotate(45deg);
    animation: arrow-bounce 2s infinite;
  }

  @keyframes arrow-bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: rotate(45deg) translate(0, 0);
    }

    40% {
      transform: rotate(45deg) translate(-10px, -10px);
    }

    60% {
      transform: rotate(45deg) translate(-5px, -5px);
    }
  }
</style>
