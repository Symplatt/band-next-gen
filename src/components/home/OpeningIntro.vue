<template>
  <div v-if="visible" class="opening-intro">
    <!-- 上半部分黑幕 -->
    <div class="panel panel-top"></div>

    <!-- 下半部分黑幕 -->
    <div class="panel panel-bottom"></div>

    <!-- 中间能量光线 -->
    <div class="energy-line"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const visible = ref(true)

  onMounted(() => {
    const hasVisited = sessionStorage.getItem('home-visited')

    if (hasVisited) {
      visible.value = false
    } else {
      sessionStorage.setItem('home-visited', '1')
      visible.value = true

      // 1.2秒后彻底销毁，把舞台交给主页
      setTimeout(() => {
        visible.value = false
      }, 1200)
    }
  })
</script>

<style scoped>
  .opening-intro {
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    pointer-events: none; /* 不阻挡交互 */
  }

  /* 上下黑幕：纯黑背景 */
  .panel {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 50%;
    background-color: #000205;

    /* 动画：保持0.6s静止，然后0.6s快速滑开 */
    animation-duration: 1.2s;
    animation-timing-function: cubic-bezier(0.8, 0, 0.2, 1); /* 犀利的加减速曲线 */
    animation-fill-mode: forwards;
  }

  .panel-top {
    border-bottom: 1px solid rgb(255 255 255 / 10%);
    animation-name: slide-up;
  }

  .panel-bottom {
    border-top: 1px solid rgb(255 255 255 / 10%);
    animation-name: slide-down;
  }

  /* 中间能量线 */
  .energy-line {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    width: 0;
    height: 2px;
    background: #fff;

    /* 核心视觉：紫红色 + 金色的强光晕 */
    box-shadow:
      0 0 10px 2px #fff,
      0 0 20px 5px #ff2e63,
      /* 紫红 */ 0 0 40px 10px #4a00e0; /* 深紫 */

    transform: translate(-50%, -50%);
    animation: beam-expand 1.2s ease-out forwards;
  }

  /* ================= 动画定义 ================= */

  /* 1. 光线从中心向两边急速射出，然后消失 */
  @keyframes beam-expand {
    0% {
      width: 0;
      opacity: 0;
    }

    20% {
      width: 0;
      opacity: 1;
    }

    40% {
      width: 100%; /* 铺满屏幕宽度 */
      height: 2px;
      opacity: 1;
    }

    60% {
      height: 4px; /* 稍微变粗一下 */
      opacity: 0.8;
    }

    100% {
      width: 100%;
      height: 0; /* 消失 */
      opacity: 0;
    }
  }

  /* 2. 上半部分向上滑开 */
  @keyframes slide-up {
    0%,
    40% {
      transform: translateY(0);
    } /* 前0.5s不动，等待光线铺满 */
    100% {
      transform: translateY(-100%);
    }
  }

  /* 3. 下半部分向下滑开 */
  @keyframes slide-down {
    0%,
    40% {
      transform: translateY(0);
    }

    100% {
      transform: translateY(100%);
    }
  }
</style>
