<template>
  <header class="site-header">
    <div class="header-inner">
      <RouterLink to="/" class="brand-logo-link">
        <div class="brand-logo-father-div">
          <!-- 电脑端和手机端显示的logo文字不一样，前者英文，后者中文 -->
          <div class="brand-logo-pc">Band Next Generation</div>
          <div class="brand-logo-mobile">子世代</div>
        </div>
      </RouterLink>

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

  const navList = [
    { name: '首页', label: '/' },
    { name: '角色', label: '/characters' },
    { name: '关系', label: '/relations' },
    { name: '纪事', label: '/chronicle' },
    { name: '关于', label: '/about' },
  ]
</script>

<style scoped>
  .site-header {
    width: 100%;
    height: var(--header-height);
    background: rgb(0 2 5 / 80%);
    border-bottom: 1px solid rgb(212 175 55 / 30%);
    backdrop-filter: blur(5px);
  }

  .header-inner {
    box-sizing: border-box;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: space-between; /* 两侧对齐 */
    max-width: 1400px;
    height: 100%;
    padding: 0 40px;
    margin: 0 auto;
  }

  .brand-logo-link {
    color: inherit; /* 继承父元素文字颜色 */
    text-decoration: none; /* 移除下划线 */
    cursor: pointer; /* 保持点击指针 */
  }

  .brand-logo-pc {
    font-family: 'Cinzel Decorative', cursive;
    font-size: 1.5rem;
    font-weight: 700;
    color: #d4af37;
    letter-spacing: 2px;
  }

  .brand-logo-mobile {
    display: none;
  }

  .main-nav {
    display: flex;
    gap: 40px;
  }

  .nav-link {
    font-size: 1rem;
    color: rgb(255 255 255 / 70%);
    text-decoration: none;
    transition: all 0.3s;
  }

  .nav-link:hover,
  .nav-link.active {
    color: #d4af37;
    text-shadow: 0 0 8px rgb(212 175 55 / 40%);
  }

  @media (width <= 768px) {
    .brand-logo-pc {
      display: none;
    }

    .brand-logo-mobile {
      display: block;
      font-family: 'Noto Serif SC', serif; /* 仅保留中文字体设置，避免被后方样式覆盖 */
      font-size: 1.5rem;
      font-weight: 700;
      color: #d4af37;
      letter-spacing: 2px;
    }

    .main-nav {
      gap: 15px;
      justify-content: center;
    }
  }
</style>
