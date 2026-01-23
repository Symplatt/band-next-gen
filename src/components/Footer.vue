<!-- 底部信息栏 -->

<template>
  <footer class="site-footer" v-if="!route.meta.hideFooter">
    <div class="page-container">
      <div class="footer-inner">
        <div class="footer-block footer-main">© 2026 乐队子世代：那美好的未来</div>
        <div class="footer-block footer-disclaimer">
          本网站为非商业、非官方的同人创作展示站点，与《BanG
          Dream!》系列作品及其版权方不存在任何官方隶属、授权或合作关系。
          原作相关角色、世界观及素材之著作权与商标权均归原权利方所有。
        </div>
        <div class="footer-block footer-privacy">
          本站不主动收集、存储或分析任何可用于识别用户身份的个人信息。
          仅可能产生必要的技术性访问日志，用于站点基本运行与安全维护，不作其他用途。
        </div>
        <div class="footer-block">
          本站为个人兴趣创作项目，当前未进行商业化运营。 ICP
          备案状态：尚未备案（如后续涉及国内公开部署将按规定办理）。
        </div>
      </div>
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
    width: 100%;
    padding: 30px 0;
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
