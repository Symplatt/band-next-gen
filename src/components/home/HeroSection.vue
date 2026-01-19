<template>
  <section class="hero-section">
    <div class="background-layer">
      <StarryBackground />
      <div class="vignette-mask"></div>
    </div>

    <div class="content-overlay">
      <!-- 标题 -->
      <h1 class="main-title">乐队子世代</h1>

      <!-- 分割线 -->
      <div class="divider">
        <div class="line-left"></div>
        <div class="diamond"></div>
        <div class="line-right"></div>
      </div>

      <!-- 副标题 -->
      <h2 class="sub-title">那美好的未来</h2>

      <!-- 座右铭 -->
      <p class="motto">EX-lilith ~ GO Raiiii</p>
    </div>

    <!-- 滚动提示 -->
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

  // 根据滚动距离控制箭头显示状态
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
  .hero-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    /* 优先使用动态视口高度适配移动端 */
    height: calc(100vh - var(--header-height, 0px));
    height: calc(100dvh - var(--header-height, 0px));
    overflow: hidden;

    /* 设置背景底色 */
    background-color: #000205;
  }

  .background-layer {
    position: absolute;

    /* 铺满父容器 */
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .vignette-mask {
    position: absolute;
    inset: 0;
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
    width: 100%;

    /* 设置左右内边距 */
    padding: 0 20px;
    text-align: center;
    transform: translateY(-5vh);
  }

  .main-title {
    display: flex;

    /* 使用上外边距代替 transform 实现下移 */
    margin-top: 5vh;

    /* 修正字间距带来的右侧留白 */
    margin-right: -1.5rem;
    font-size: 6rem;
    font-weight: 800;
    line-height: 1.1;
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

    /* 初始透明度为0 */
    opacity: 0;
    filter: drop-shadow(0 0 12px rgb(142 45 226 / 50%)) drop-shadow(0 5px 2px rgb(0 0 0 / 80%));

    /* 组合入场动画(1.5s)、流光动画和延迟的悬浮动画 */
    animation:
      main-descend 1.5s ease-out forwards,
      flow-purple 15s ease-in-out infinite,
      title-float 6s ease-in-out 1.5s infinite;
    -webkit-text-fill-color: transparent;
  }

  .sub-title {
    margin-top: 1.2rem;

    /* 修正字间距 */
    margin-right: -2.5rem;
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    letter-spacing: 2.5rem;
    background: linear-gradient(90deg, #734b16, #d4af37, #fef9e7, #d4af37, #734b16);
    background-clip: text;
    background-size: 200% auto;
    opacity: 0;

    /* 纯透明渐变实化动画(1.5s) */
    animation:
      sub-solidify 1.5s ease-out forwards,
      gold-sweep 7s linear infinite;
    -webkit-text-fill-color: transparent;
  }

  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 900px;

    /* 调整上下间距 */
    margin: 0.5rem 0 2.5rem;
  }

  .line-left,
  .line-right {
    flex-grow: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, #ff2e63, #d4af37, transparent);

    /* 初始横向缩放为0 */
    transform: scaleX(0);

    /* 线条延伸动画(2.0s) */
    animation: line-grow 2s ease-out forwards;
  }

  .line-left {
    /* 左侧线条从右向左延伸 */
    transform-origin: right center;
  }

  .line-right {
    background: linear-gradient(to right, transparent, #d4af37, #ff2e63, transparent);

    /* 右侧线条从左向右延伸 */
    transform-origin: left center;
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

    /* 菱形无动画，直接显示 */
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
    text-transform: uppercase;
    letter-spacing: 0.8rem;
    opacity: 0;

    /* 底部向上浮现动画(1.5s) */
    animation: motto-ascend 1.5s ease-out forwards;
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

  /* 主标题：从上而下缓慢出现 */
  @keyframes main-descend {
    from {
      opacity: 0;
      filter: blur(10px);
      transform: translateY(-50px);
    }

    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
  }

  /* 副标题：从透明逐渐实化 */
  @keyframes sub-solidify {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  /* 补充文字：自下而上缓慢浮现 */
  @keyframes motto-ascend {
    from {
      opacity: 0;
      transform: translateY(30px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 分割线：横向延伸 */
  @keyframes line-grow {
    from {
      transform: scaleX(0);
    }

    to {
      transform: scaleX(1);
    }
  }

  /* 通用向上浮入动画(用于滚动提示) */
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .scroll-hint {
    position: absolute;
    right: 0;
    bottom: 30px;
    left: 0;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
    margin: 0 auto;
    cursor: pointer;
    opacity: 0;
    transition:
      opacity 0.5s ease,
      visibility 0.5s;

    /* 滚动提示保持原有延迟 */
    animation: fade-in-up 1s ease-out 0.8s forwards;
  }

  .hint-text {
    margin-bottom: 10px;
    font-size: 0.8rem;
    color: rgb(255 255 255 / 50%);
    letter-spacing: 0.2rem;
  }

  .hint-arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid rgb(255 255 255 / 40%);
    border-bottom: 2px solid rgb(255 255 255 / 40%);
    transform: rotate(45deg);
    animation: arrow-bounce 2s infinite;
  }

  .scroll-hint.hidden {
    visibility: hidden;
    pointer-events: none;
    opacity: 0 !important;
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

  @media (width <= 768px) {
    .content-overlay {
      transform: translateY(-10vh);
    }

    .main-title {
      margin-right: -0.5rem;
      font-size: 3rem;
      letter-spacing: 0.5rem;
    }

    .sub-title {
      margin-top: 1rem;
      margin-right: -0.8rem;
      font-size: 1.4rem;
      letter-spacing: 0.8rem;
    }

    .divider {
      width: 80%;
      margin: 1rem 0;
    }

    .diamond {
      margin: 0 10px;
    }

    .motto {
      margin-top: 2rem;
      font-size: 0.7rem;
      letter-spacing: 0.3rem;
    }
  }
</style>
