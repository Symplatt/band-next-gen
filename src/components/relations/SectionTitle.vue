<template>
  <!-- 获取DOM元素引用，用于IntersectionObserver监听 -->
  <!-- 当isVisible为true时添加visible类，触发CSS动画 -->
  <h2 ref="titleRef" class="section-title" :class="{ visible: isVisible }">
    <!-- 包裹文字以便单独控制透明度和位移 -->
    <span>{{ title }}</span>
  </h2>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'

  // 定义组件接收的属性类型
  defineProps<{
    title: string
  }>()

  // 用于获取H2 DOM元素的引用
  const titleRef = ref<HTMLElement | null>(null)
  // 控制动画类名的挂载状态
  const isVisible = ref(false)
  // 保存IntersectionObserver实例
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    // 初始化IntersectionObserver监听器
    observer = new IntersectionObserver(
      (entries) => {
        // 获取当前监听的元素状态，entries是一个数组
        const entry = entries[0]

        // 使用可选链确保entry存在，判断元素是否进入可视区域
        if (entry?.isIntersecting) {
          // 触发动画状态
          isVisible.value = true

          // 确保动画只触发一次，触发后停止监听
          // 防止页面回滚时重复触发动画
          if (titleRef.value && observer) {
            observer.unobserve(titleRef.value)
          }
        }
      },
      {
        // 元素露出20%时触发回调
        threshold: 0.2,
      },
    )

    // 如果DOM元素存在，开始监听
    if (titleRef.value) {
      observer.observe(titleRef.value)
    }
  })

  // 组件销毁时清理观察器，避免内存泄漏
  onUnmounted(() => {
    if (observer) observer.disconnect()
  })
</script>

<style scoped>
  /* 基础标题样式容器 */
  .section-title {
    /* 使用Flex布局使线条和文字垂直居中 */
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 0;
    margin-bottom: 60px;

    /* 隐藏溢出内容，防止移动端出现横向滚动条 */
    overflow: hidden;
    font-family: 'Noto Serif SC', cursive;
    font-size: 2.5rem;
    color: #d4af37;
    letter-spacing: 4px;
    text-shadow: 0 0 10px rgb(212 175 55 / 30%);
    border-bottom: none;
  }

  /* 标题文字初始状态设置 */
  .section-title span {
    display: inline-block;

    /* 初始不可见 */
    opacity: 0;

    /* 初始位置向上偏移 */
    transform: translateY(-20px);
  }

  /* 标题左右两侧装饰线条的初始状态 */
  .section-title::before,
  .section-title::after {
    display: block;

    /* 初始宽度为0，不可见 */
    width: 0;
    height: 1px;
    content: '';

    /* 左侧线条渐变方向 */
    background: linear-gradient(90deg, transparent, rgb(185 153 48 / 50%));
  }

  /* 右侧线条渐变方向 */
  .section-title::after {
    background: linear-gradient(90deg, rgb(185 153 48 / 50%), transparent);
  }

  /* 当添加visible类后，执行文字下落渐显动画 */
  .section-title.visible span {
    animation: slide-down 1s ease-out forwards;
  }

  /* 当添加visible类后，执行线条伸展动画 */
  .section-title.visible::before,
  .section-title.visible::after {
    animation: expand-line 1.2s ease-out forwards;
  }

  /* 定义文字出现的关键帧动画，使用kebab-case命名 */
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 定义线条伸展的关键帧动画，使用kebab-case命名 */
  @keyframes expand-line {
    from {
      width: 0;
    }

    to {
      /* PC端线条最终宽度 */
      width: 400px;
    }
  }

  /* 移动端样式适配 */
  @media (width <= 768px) {
    .section-title {
      /* 缩小间距 */
      gap: 10px;

      /* 缩小字体 */
      font-size: 1.8rem;
    }

    /* 移动端线条动画目标宽度调整 */
    @keyframes expand-line {
      from {
        width: 0;
      }

      to {
        /* 手机端使用视口单位自适应宽度 */
        width: 30vw;
      }
    }
  }
</style>
