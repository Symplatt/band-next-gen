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
  /* 导航栏容器，负责吸顶与背景效果 */
  .site-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: var(--header-height, 64px);
    background: linear-gradient(to bottom, rgb(15 16 22 / 88%), rgb(8 9 13 / 82%));
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(to right, transparent, rgb(212 175 55 / 35%), transparent) 1;
    backdrop-filter: blur(12px) saturate(120%);
    transition:
      background 0.3s ease,
      box-shadow 0.3s ease;
  }

  /* 内部内容的布局与最大宽度控制 */
  .header-inner {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    height: 100%;
    padding: 0 40px;
    margin: 0 auto;
  }

  /* Logo 链接的基础交互行为 */
  .brand-logo-link {
    text-decoration: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  /* Logo 内容的对齐方式 */
  .brand-logo-wrapper {
    display: flex;
    align-items: center;
  }

  /* 桌面端 Logo 的字体与渐变文字效果 */
  .brand-logo-pc {
    font-family: 'Cinzel Decorative', cursive;
    font-size: 1.6rem;
    font-weight: 700;
    color: transparent;
    letter-spacing: 2px;
    background: linear-gradient(45deg, #d4af37, #f3e5ab, #d4af37);
    background-clip: text;
    filter: drop-shadow(0 0 3px rgb(212 175 55 / 35%));
    transition:
      filter 0.3s ease,
      transform 0.3s ease;
  }

  /* 鼠标悬停时增强文字的发光与位移反馈 */
  .brand-logo-link:hover .brand-logo-pc {
    filter: drop-shadow(0 0 6px rgb(212 175 55 / 55%));
    transform: translateY(-1px);
  }

  /* 移动端 Logo 默认不显示 */
  .brand-logo-mobile {
    display: none;
  }

  /* 导航链接的横向排列方式 */
  .main-nav {
    display: flex;
    gap: 36px;
  }

  /* 单个导航链接的文字样式 */
  .nav-link {
    position: relative;
    padding: 6px 0;
    font-family: 'Noto Serif SC', serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: rgb(255 255 255 / 65%);
    letter-spacing: 1.2px;
    text-decoration: none;
    transition:
      color 0.25s ease,
      text-shadow 0.25s ease;
  }

  /* 导航链接底部的装饰性下划线 */
  .nav-link::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    content: '';
    background: linear-gradient(to right, transparent, #d4af37, transparent);
    opacity: 0.85;
    transition:
      width 0.3s ease,
      left 0.3s ease;
  }

  /* 悬停或激活状态下的文字高亮效果 */
  .nav-link:hover,
  .nav-link.active {
    color: #fff;
    text-shadow: 0 0 6px rgb(212 175 55 / 45%);
  }

  /* 悬停或激活状态下展开下划线 */
  .nav-link:hover::after,
  .nav-link.active::after {
    left: 0;
    width: 100%;
  }

  /* 小屏设备下的布局与字体调整 */
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
      text-shadow: 0 0 4px rgb(212 175 55 / 40%);
    }

    .main-nav {
      gap: 20px;
    }

    .nav-link {
      font-size: 0.88rem;
    }
  }
</style>
