// App.vue
<template>
  <div class="app">
    <div class="navigate-bar">
      <header class="site-header">
        <div class="header-inner">
          <div class="brand-logo">Band Next Generation</div>
          <nav class="main-nav">
            <!-- 确保 active-class 能高亮当前路由 -->
            <RouterLink to="/" class="nav-link" active-class="active">首页</RouterLink>
            <RouterLink to="/characters" class="nav-link" active-class="active">角色</RouterLink>
            <RouterLink to="/relations" class="nav-link" active-class="active">关系</RouterLink>
            <RouterLink to="/chronicle" class="nav-link" active-class="active">纪事</RouterLink>
            <RouterLink to="/about" class="nav-link" active-class="active">关于</RouterLink>
          </nav>
        </div>
      </header>
    </div>
    <div class="website-content">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup name="App">
  import { RouterView, RouterLink } from 'vue-router'
</script>

<style>
  body,
  html,
  #app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    background: #000205;
  }
</style>

<style lang="css" scoped>
  /* 导航栏 */
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 10%;
    background: rgb(0 2 5 / 80%);
    border-bottom: 1px solid rgb(212 175 55 / 30%);
    backdrop-filter: blur(5px);
  }

  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    height: 100%;
    padding: 0 40px;
    margin: 0 auto;
  }

  .brand-logo {
    font-family: 'Cinzel Decorative', cursive;
    font-size: 1.5rem;
    font-weight: 700;
    color: #d4af37;
    letter-spacing: 2px;
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

  .website-content {
    padding-top: 10vh;
  }
</style>
