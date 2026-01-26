<template>
  <!-- 特殊注释 -->
  <!-- 占据整个页面宽度的容器 -->
  <div class="special-note-box">
    <!-- 在special-note-box中右对齐的容器 -->
    <div class="note-list-box">
      <!-- 在note-list-box中，每一条特殊注释要左对齐 -->
      <div class="note-list-box" v-for="note in noteContent">
        <span class="note-symbol">✱</span>{{ note }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = withDefaults(
    defineProps<{
      noteContent: string | string[] // 兼容 string | string[]
    }>(),
    {
      noteContent: '',
    },
  )

  // 如果noteContent是string，就改为string数组
  const noteContent = computed(() =>
    Array.isArray(props.noteContent) ? props.noteContent : [props.noteContent],
  )
</script>

<style scoped>
  .special-note-box {
    display: flex;
    justify-content: right;
    margin-top: 200px;
    font-size: 0.85rem;
    font-style: italic;
    color: #666;
    text-align: right;
    border-top: 1px dashed rgb(255 255 255 / 10%); /* 上边框，dash是虚线的意思 */
  }

  .note-list-box {
    display: block;
    text-align: left;
  }

  .note-symbol {
    margin-right: 5px;
    color: #d4af37;
  }

  @media (width < 768px) {
    .special-note-box {
      margin-top: 150px;
      font-size: 0.6rem;
    }
  }
</style>
