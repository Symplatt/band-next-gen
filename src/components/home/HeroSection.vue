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

  // 如果滚动距离小于50px，则为true，箭头图标正常显示
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

    /* 核心修改：优先使用 dvh (动态视口高度) 适配移动端地址栏伸缩，不支持则回退到 vh */
    height: calc(100vh - var(--header-height, 0px));
    height: calc(100dvh - var(--header-height, 0px));
    overflow: hidden;

    /* 防止背景在加载前闪白 */
    background-color: #000205;
  }

  .background-layer {
    position: absolute;
    inset: 0; /* 简写 top/left/right/bottom: 0 */
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
    padding: 0 20px; /* 增加左右内边距，防止手机端文字贴边 */
    text-align: center;

    /* 移除固定的 height: 90vh 和 transform，改用 flex 居中更稳 */
  }

  .main-title {
    margin-right: -1.5rem; /* 修正 letter-spacing 带来的右侧空白 */

    /* 核心修改：使用 clamp 动态字体，或者在媒体查询中修改 */
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
    filter: drop-shadow(0 0 12px rgb(142 45 226 / 50%)) drop-shadow(0 5px 2px rgb(0 0 0 / 80%));
    animation:
      flow-purple 15s ease-in-out infinite,
      title-float 6s ease-in-out infinite;
    -webkit-text-fill-color: transparent;
  }

  .sub-title {
    margin-top: 1.2rem;
    margin-right: -2.5rem; /* 修正 letter-spacing */
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
    justify-content: center;

    /* 核心修改：移除固定宽度 900px，改为百分比 + 最大宽度 */
    width: 100%;
    max-width: 900px;
    margin: 2.5rem 0;
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
    opacity: 0.7;
  }

  /* 动画部分保持不变 */
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
    bottom: 30px; /* 稍微抬高一点，适配不同下巴的手机 */
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
    opacity: 0;
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

  /* =========================================
     核心：移动端适配 (Media Queries)
     ========================================= */
  @media (width <= 768px) {
    /* 1. 缩小主标题，减少间距 */
    .main-title {
      margin-right: -0.5rem;
      font-size: 3rem; /* 从 6rem 降到 3rem */
      letter-spacing: 0.5rem;
    }

    /* 2. 缩小副标题 */
    .sub-title {
      margin-top: 1rem;
      margin-right: -0.8rem;
      font-size: 1.4rem;
      letter-spacing: 0.8rem;
    }

    /* 3. 调整分割线间距 */
    .divider {
      width: 80%; /* 限制宽度 */
      margin: 1.5rem 0;
    }

    .diamond {
      margin: 0 10px;
    }

    /* 4. Motto 文字缩小 */
    .motto {
      margin-top: 2rem;
      font-size: 0.7rem;
      letter-spacing: 0.3rem;
    }
  }
</style>
