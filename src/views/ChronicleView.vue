// views/CharactersView.vue

<template>
  <div class="chronicle-view">
    <div class="a" id="one"></div>
    <div class="a" id="two"></div>
    <div class="a" id="three"></div>
    <div class="a" id="four"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="css" scoped>
  .chronicle-view {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
  }

  .a {
    width: 160px;
    height: 90px;
  }

  #one {
    background-color: blue;
  }

  #two {
    background-color: red;
  }

  #three {
    background-color: yellow;
  }

  #four {
    background-color: green;
  }
</style>
