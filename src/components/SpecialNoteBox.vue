<template>
  <!-- 特殊注释 -->
  <div class="special-note-box"><span class="note-symbol">✱</span>{{ noteContent }}</div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      noteContent: string
    }>(),
    {
      noteContent: '',
    },
  )
</script>

<style scoped>
  .special-note-box {
    margin-top: 40px;
    font-size: 0.85rem;
    font-style: italic;
    color: #666;
    text-align: right;
    border-top: 1px dashed rgb(255 255 255 / 10%);
  }

  .note-symbol {
    margin-right: 5px;
    color: #d4af37;
  }
</style>
