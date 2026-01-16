// App.vue
<template>
  <div class="app">
    <header class="site-header">
      <div class="header-inner">
        <div class="brand-logo">Band Next Generation</div>
        <nav class="main-nav">
          <RouterLink to="/" class="nav-link" active-class="active">首页</RouterLink>
          <RouterLink to="/characters" class="nav-link" active-class="active">角色</RouterLink>
          <RouterLink to="/relations" class="nav-link" active-class="active">关系</RouterLink>
          <RouterLink to="/chronicle" class="nav-link" active-class="active">纪事</RouterLink>
          <RouterLink to="/about" class="nav-link" active-class="active">关于</RouterLink>
        </nav>
      </div>
    </header>
    <div class="website-content">
      <RouterView />
    </div>
    <footer class="site-footer" v-if="!route.meta.hideFooter">
      <div class="footer-inner">
        <div class="footer-block footer-main">© 2026 乐队子世代——那美好的未来</div>
        <div class="footer-block footer-disclaimer">
          本网站为非商业性质的二次创作同人站点，与《BanG
          Dream!》系列及其版权方无任何官方隶属或合作关系。 原作版权归 Bushiroad / BanG Dream!
          Project 所有。（@Symplatt的碎碎念：听说武士道最近神圣切割了，是不是该把那什么Our
          Note也写上）
        </div>
        <div class="footer-block footer-privacy">
          本站不主动收集、不分析、不存储任何用户个人身份信息。
          仅使用必要的技术性访问数据用于基础访问统计与站点稳定性维护。
        </div>
        <div class="footer-block footer-credit">以上内容有待后续讨论</div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup name="App">
  import { RouterView, RouterLink, useRoute } from 'vue-router'

  const route = useRoute()
</script>

<style>
  body,
  html,
  #app {
    height: 100%;
    margin: 0;
    background: #0b0c10;
  }

  .app {
    display: flex;
    flex-direction: column;
  }

  .site-header {
    width: 100%;
    height: 10vh;
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
    flex: 1;
    height: 90vh;
  }

  .site-footer {
    width: 100%;
    background: #000205;
    border-top: 1px solid #252525;
  }

  .footer-inner {
    max-width: 1200px;
    padding: 30px 40px;
    margin: 0 auto;
    font-size: 12px;
    line-height: 1.8;
    color: rgb(132 132 132 / 70%);
  }

  .footer-block {
    margin-bottom: 10px;
  }

  .footer-main {
    font-weight: 500;
    color: rgb(200 200 200 / 80%);
  }

  .footer-credit {
    margin-top: 15px;
    font-size: 11px;
    color: rgb(132 132 132 / 50%);
  }
</style>
