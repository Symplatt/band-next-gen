<template>
  <section class="section-block">
    <div class="network-container">
      <div ref="containerRef" class="circle-layout">
        <!-- SVG 连线层 -->
        <svg
          class="lines-layer"
          :viewBox="`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`"
          preserveAspectRatio="xMidYMid meet"
        >
          <line
            v-for="(link, index) in networkLinks"
            :key="index"
            :x1="getNodePos(link.source).x"
            :y1="getNodePos(link.source).y"
            :x2="getNodePos(link.target).x"
            :y2="getNodePos(link.target).y"
            class="network-line"
            :class="{
              dimmed: networkHoverId && !isLinkActive(link),
              active: isLinkActive(link),
            }"
          />
        </svg>

        <!-- 节点层 -->
        <div
          v-for="char in displayMemberList"
          :key="char.id"
          class="node-wrapper"
          :class="{
            dimmed: networkHoverId && !isNodeActive(char.id),
            active: networkHoverId === char.id,
          }"
          :style="getNodeStyle(char.id)"
          @mouseenter="networkHoverId = char.id"
          @mouseleave="networkHoverId = null"
        >
          <div class="node-circle">
            <img :src="resolvePath(char.avatar)" :alt="char.name.slice(-1)" class="node-avatar" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
  import { resolvePath } from '@/utils/assets'

  // SVG 设计坐标尺寸
  const VIEW_SIZE = 500

  // 成员数据
  const props = defineProps<{
    memberList: { id: string; avatar: string; name: string }[]
  }>()
  const displayMemberList = computed(() => props.memberList.slice(0, 8))

  // 当前悬停节点
  const networkHoverId = ref<string | null>(null)

  // 容器引用
  const containerRef = ref<HTMLDivElement | null>(null)

  // SVG 缩放比例
  const scale = ref(1)

  // SVG 居中偏移
  const offsetX = ref(0)
  const offsetY = ref(0)

  // 更新缩放与偏移
  const updateTransform = () => {
    if (!containerRef.value) return
    const rect = containerRef.value.getBoundingClientRect()
    const size = Math.min(rect.width, rect.height)
    scale.value = size / VIEW_SIZE
    offsetX.value = (rect.width - size) / 2
    offsetY.value = (rect.height - size) / 2
  }

  // 初始化与监听
  onMounted(() => {
    updateTransform()
    window.addEventListener('resize', updateTransform)
  })

  // 清理监听
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateTransform)
  })

  // 构建连线关系
  const networkLinks = computed(() => {
    const links: { source: string; target: string }[] = []
    const ids = displayMemberList.value.map((m) => m.id)
    ids.forEach((id, i) => {
      if (i < ids.length - 1) links.push({ source: id, target: ids[i + 1] || '' })
      if (i < ids.length - 2) links.push({ source: id, target: ids[i + 2] || '' })
      if (i === ids.length - 1) links.push({ source: id, target: ids[0] || '' })
    })
    return links
  })

  // 计算节点 SVG 坐标
  const getNodePos = (id: string) => {
    const index = displayMemberList.value.findIndex((m) => m.id === id)
    if (index === -1) return { x: VIEW_SIZE / 2, y: VIEW_SIZE / 2 }
    const total = displayMemberList.value.length
    const radius = VIEW_SIZE * 0.38
    const angle = (360 / total) * index - 90
    const radian = (angle * Math.PI) / 180
    return {
      x: VIEW_SIZE / 2 + Math.cos(radian) * radius,
      y: VIEW_SIZE / 2 + Math.sin(radian) * radius,
    }
  }

  // 映射节点到 DOM 坐标
  const getNodeStyle = (id: string) => {
    const pos = getNodePos(id)
    return {
      left: `${pos.x * scale.value + offsetX.value}px`,
      top: `${pos.y * scale.value + offsetY.value}px`,
    }
  }

  // 判断节点高亮状态
  const isNodeActive = (id: string) => {
    if (!networkHoverId.value) return true
    return (
      id === networkHoverId.value ||
      networkLinks.value.some(
        (link) =>
          (link.source === networkHoverId.value && link.target === id) ||
          (link.target === networkHoverId.value && link.source === id),
      )
    )
  }

  // 判断连线高亮状态
  const isLinkActive = (link: { source: string; target: string }) => {
    if (!networkHoverId.value) return true
    return link.source === networkHoverId.value || link.target === networkHoverId.value
  }
</script>

<style scoped>
  .section-block {
    margin-bottom: 150px;
    scroll-margin-top: 100px;
  }

  .network-container {
    display: flex;
    justify-content: center;
  }

  .circle-layout {
    position: relative;
    width: 640px;
    max-width: 90vw;
    height: 640px;
    max-height: 90vw;
  }

  .lines-layer {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  .network-line {
    opacity: 0.6;
    stroke: #d4af37;
    stroke-width: 1px;
    transition: all 0.4s ease;
  }

  .network-line.active {
    opacity: 1;
    stroke: #fff;
    stroke-width: 2px;
  }

  .network-line.dimmed {
    opacity: 0.1;
  }

  .node-wrapper {
    position: absolute;
    cursor: pointer;
    transform: translate(-50%, -50%);
    transition: transform 0.4s ease;
  }

  .node-wrapper:hover {
    z-index: 10;
    transform: translate(-50%, -50%) scale(1.15);
  }

  .node-wrapper.dimmed {
    opacity: 0.2;
    filter: grayscale(100%);
  }

  .node-circle {
    width: 60px;
    height: 60px;
    overflow: hidden;
    background: #000;
    border: 2px solid #d4af37;
    border-radius: 50%;
    box-shadow: 0 0 12px rgb(212 175 55 / 25%);
  }

  .node-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (width <= 768px) {
    .circle-layout {
      width: 88vw;
      height: 88vh;
    }

    .node-circle {
      width: 40px;
      height: 40px;
    }
  }
</style>
