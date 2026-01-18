// App.vue

<template>
  <div class="app">
    <NavigationBar />
    <RouterView />
    <Footer />
    <BackToTop :ifDisplay="showBackToTop" />
  </div>
</template>

<script lang="ts" setup name="App">
  import { RouterView } from 'vue-router'
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  import NavigationBar from './components/NavBar.vue'
  import Footer from './components/Footer.vue'
  import BackToTop from './components/BackToTop.vue'

  const route = useRoute()
  const showBackToTop = computed(() => {
    return route.name != 'home'
  })
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
</style>
