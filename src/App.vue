// App.vue

<template>
  <div class="app">
    <NavigationBar />
    <div class="website-content">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup name="App">
  import { RouterView } from 'vue-router'
  import NavigationBar from './components/NavBar.vue'
  import Footer from './components/Footer.vue'
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

  .website-content {
    flex: 1;
    height: 90vh;
  }
</style>
