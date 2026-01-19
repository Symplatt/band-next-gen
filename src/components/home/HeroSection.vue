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

    /* 设置背景底色防止加载闪烁 */
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

    /* 设置左右内边距防止文字贴边 */
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

    /* 初始状态不可见 */
    opacity: 0;
    filter: drop-shadow(0 0 12px rgb(142 45 226 / 50%)) drop-shadow(0 5px 2px rgb(0 0 0 / 80%));

    /* 执行入场、流光和悬浮动画 */
    animation:
      main-enter 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
      flow-purple 15s ease-in-out infinite,
      title-float 6s ease-in-out infinite;
    -webkit-text-fill-color: transparent;
  }

  .sub-title {
    margin-top: 1.2rem;

    /* 修正字间距带来的右侧留白 */
    margin-right: -2.5rem;
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    letter-spacing: 2.5rem;
    background: linear-gradient(90deg, #734b16, #d4af37, #fef9e7, #d4af37, #734b16);
    background-clip: text;
    background-size: 200% auto;
    opacity: 0;

    /* 延迟执行入场和扫光动画 */
    animation:
      fade-in-up 1s ease-out 0.4s forwards,
      gold-sweep 7s linear infinite;
    -webkit-text-fill-color: transparent;
  }

  .divider {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 900px;

    /* 减少顶部间距拉近标题，保留底部间距 */
    margin: 0.5rem 0 2.5rem;
    opacity: 0;

    /* 延迟执行入场动画 */
    animation: fade-in-up 1s ease-out 0.2s forwards;
  }

  .line-left,
  .line-right {
    flex-grow: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, #ff2e63, #d4af37, transparent);
  }

  .line-right {
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
    text-transform: uppercase;
    letter-spacing: 0.8rem;
    opacity: 0;

    /* 延迟执行入场动画 */
    animation: fade-in-up 1s ease-out 0.6s forwards;
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

  /* 标题从模糊透明到清晰可见 */
  @keyframes main-enter {
    from {
      opacity: 0;
      filter: blur(10px);
    }

    to {
      opacity: 1;
      filter: blur(0);
    }
  }

  /* 通用元素向上浮动并淡入 */
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

    /* 抬高底部距离适配不同设备 */
    bottom: 30px;
    left: 0;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;

    /* 宽度自适应内容 */
    width: fit-content;
    margin: 0 auto;
    cursor: pointer;
    opacity: 0;
    transition:
      opacity 0.5s ease,
      visibility 0.5s;

    /* 延迟执行入场动画 */
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

    /* 强制隐藏 */
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
      /* 限制移动端宽度 */
      width: 80%;

      /* 移动端保持较小的间距 */
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
