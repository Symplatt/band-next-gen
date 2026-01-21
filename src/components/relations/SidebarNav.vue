<template>
  <!-- 侧边导航容器，仅在PC端显示 -->
  <nav class="sidebar">
    <!-- 左侧的装饰竖线 -->
    <div class="nav-line"></div>
    <!-- 导航列表 -->
    <ul class="nav-list">
      <!-- 循环渲染导航项，点击触发滚动 -->
      <li
        v-for="(item, index) in navItems"
        :key="index"
        class="nav-item"
        :class="{ active: activeSection === item.id }"
        @click="$emit('scrollTo', item.id)"
      >
        <!-- 激活时的菱形装饰点 -->
        <span class="dot"></span>
        <!-- 导航文字标签 -->
        <span class="label">{{ item.label }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  // 定义导航项的数据结构
  interface NavItem {
    id: string
    label: string
  }

  // 定义组件接收的属性
  defineProps<{
    navItems: NavItem[] // 导航菜单配置数组
    activeSection: string // 当前激活的版块ID
  }>()

  // 定义组件触发的事件
  defineEmits<{
    (e: 'scrollTo', id: string): void // 触发滚动事件，传递目标ID
  }>()
</script>

<style scoped>
  /* 侧边栏固定定位在屏幕左侧垂直居中 */
  .sidebar {
    position: fixed;
    top: 50%;
    left: 40px;
    z-index: 100;
    display: flex;
    align-items: stretch;
    transform: translateY(-50%);
  }

  /* 贯穿的竖线样式 */
  .nav-line {
    width: 1px;
    margin-right: 15px;
    background: rgb(212 175 55 / 30%);
  }

  /* 列表布局容器 */
  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  /* 单个导航项样式 */
  .nav-item {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s;
  }

  /* 导航点样式，默认为空心或暗色 */
  .nav-item .dot {
    position: absolute;
    left: -20px;
    width: 8px;
    height: 8px;
    background: #000;
    border: 1px solid #d4af37;
    transform: rotate(45deg);
    transition: all 0.3s;
  }

  /* 标签文字样式 */
  .nav-item .label {
    font-size: 0.9rem;
    color: #d4af37;
    letter-spacing: 1px;
  }

  /* 悬停或激活状态增加不透明度 */
  .nav-item:hover,
  .nav-item.active {
    opacity: 1;
  }

  /* 激活状态下点的样式变化 */
  .nav-item.active .dot {
    background: #d4af37;
    box-shadow: 0 0 10px #d4af37;
    transform: rotate(45deg) scale(1.5);
  }

  /* 移动端隐藏侧边栏 */
  @media (width <= 768px) {
    .sidebar {
      display: none;
    }
  }
</style>
