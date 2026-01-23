<!-- App.vue -->
<template>
  <div class="app">
    <!-- 导航栏 -->
    <NavigationBar />

    <RouterView v-slot="{ Component }">
      <!-- 仅缓存路由 meta 中标记为 keepAlive 的组件 -->
      <KeepAlive>
        <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.name" />
      </KeepAlive>
      <!-- 不缓存的组件直接渲染 -->
      <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
    </RouterView>

    <!-- 根据路由元信息决定是否隐藏 Footer -->
    <Footer v-if="!$route.meta.hideFooter" />

    <BackToTop :ifDisplay="showBackToTop" />
  </div>
</template>

<script setup lang="ts" name="App">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import NavigationBar from './components/NavigationBar.vue'
  import CustomCursor from './components/CustomCursor.vue'
  import Footer from './components/Footer.vue'
  import BackToTop from './components/BackToTop.vue'

  const route = useRoute()

  // 计算属性：非首页且不是404页面时显示回到顶部
  const showBackToTop = computed(() => route.name !== 'home' && route.name !== 'not-found')
</script>

<style>
  html,
  body,
  #app {
    height: 100%;
    margin: 0;
    background: #0b0c10; /* 全局深色背景 */
  }

  .app {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  a,
  button {
    cursor: pointer;
  }
</style>
