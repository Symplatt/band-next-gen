// App.vue
<template>
  <div class="app">
    <RouterView />
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
