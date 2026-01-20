<template>
  <header class="site-header">
    <div class="header-inner">
      <!-- Logo 区域 -->
      <RouterLink to="/" class="brand-logo-link">
        <div class="brand-logo-wrapper">
          <!-- 电脑端 Logo -->
          <div class="brand-logo-pc">Band Next Generation</div>
          <!-- 手机端 Logo -->
          <div class="brand-logo-mobile">子世代</div>
        </div>
      </RouterLink>

      <!-- 导航链接区域 -->
      <nav class="main-nav">
        <RouterLink
          v-for="item in navList"
          :key="item.name"
          :to="item.label"
          class="nav-link"
          active-class="active"
        >
          {{ item.name }}
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'

  // 定义导航菜单项
  const navList = [
    { name: '首页', label: '/' },
    { name: '角色', label: '/characters' },
    { name: '关系', label: '/relations' },
    { name: '纪事', label: '/chronicle' },
    { name: '关于', label: '/about' },
  ]
</script>

<style scoped>
  /* 导航栏整体容器 */
  .site-header {
    /* 粘性定位，确保导航栏吸顶 */
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;

    /* 使用变量控制高度，若未定义则回退到 60px */
    height: var(--header-height, 60px);

    /* 深色半透明背景 */
    background: rgb(11 12 16 / 85%);

    /* 底部金色渐变边框，比纯色更具质感 */
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(to right, transparent, rgb(212 175 55 / 50%), transparent) 1;

    /* 毛玻璃效果 */
    backdrop-filter: blur(10px);
    transition: background 0.3s ease;
  }

  /* 内部布局容器 */
  .header-inner {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    /* 限制最大宽度，防止在大屏上太散 */
    max-width: 1400px;
    height: 100%;
    padding: 0 40px;
    margin: 0 auto;
  }

  /* Logo 链接包装 */
  .brand-logo-link {
    text-decoration: none;
    cursor: pointer;

    /* 防止点击时产生高亮背景 */
    -webkit-tap-highlight-color: transparent;
  }

  /* 电脑端 Logo 样式 */
  .brand-logo-pc {
    font-family: 'Cinzel Decorative', cursive;
    font-size: 1.6rem;
    font-weight: 700;
    color: transparent;
    letter-spacing: 2px;

    /* 金色渐变文字 */
    background: linear-gradient(45deg, #d4af37, #f3e5ab, #d4af37);
    background-clip: text;

    /* 增加光晕滤镜 */
    filter: drop-shadow(0 0 2px rgb(212 175 55 / 30%));
  }

  /* 手机端 Logo 默认隐藏 */
  .brand-logo-mobile {
    display: none;
  }

  /* 导航菜单容器 */
  .main-nav {
    display: flex;
    gap: 40px;
  }

  /* 导航链接样式 */
  .nav-link {
    position: relative;
    padding: 5px 0;
    font-family: 'Noto Serif SC', serif;
    font-size: 1rem;
    font-weight: 500;
    color: rgb(255 255 255 / 70%);
    letter-spacing: 1px;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  /* 导航链接下划线动画伪元素 */
  .nav-link::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    content: '';

    /* 金色下划线 */
    background-color: #d4af37;
    transition:
      width 0.3s ease,
      left 0.3s ease;
  }

  /* 鼠标悬停及激活状态样式 */
  .nav-link:hover,
  .nav-link.active {
    color: #fff;
    text-shadow: 0 0 8px rgb(212 175 55 / 60%);
  }

  /* 悬停及激活时展开下划线 */
  .nav-link:hover::after,
  .nav-link.active::after {
    left: 0;
    width: 100%;
  }

  /* 移动端适配 */
  @media (width <= 768px) {
    .header-inner {
      padding: 0 20px;
    }

    .brand-logo-pc {
      display: none;
    }

    .brand-logo-mobile {
      display: block;
      font-family: 'Noto Serif SC', serif;
      font-size: 1.4rem;
      font-weight: 900;
      color: #d4af37;
      letter-spacing: 2px;
    }

    /* 移动端缩小导航间距，确保不换行 */
    .main-nav {
      gap: 20px;
    }

    .nav-link {
      font-size: 0.9rem;
    }
  }
</style>
