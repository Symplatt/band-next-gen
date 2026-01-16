<template>
  <footer class="site-footer" v-if="!route.meta.hideFooter">
    <div class="footer-inner">
      <div class="footer-block footer-main">© 2026 乐队子世代——那美好的未来</div>
      <div class="footer-block footer-disclaimer">
        本网站为非商业性质的二次创作同人站点，与《BanG
        Dream!》系列及其版权方无任何官方隶属或合作关系。 原作版权归 Bushiroad / BanG Dream! Project
        所有。（@Symplatt的碎碎念：听说武士道最近神圣切割了，是不是该把那什么Our Note也写上）
      </div>
      <div class="footer-block footer-privacy">
        本站不主动收集、不分析、不存储任何用户个人身份信息。
        仅使用必要的技术性访问数据用于基础访问统计与站点稳定性维护。
      </div>
      <div class="footer-block footer-credit">以上内容有待后续讨论</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router'
  const route = useRoute()
</script>

<style scoped>
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
