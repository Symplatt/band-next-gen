<template>
  <section class="section-block">
    <!-- PC端显示的关系网图表 -->
    <div class="network-container desktop-only">
      <div class="claim">该模块正在制作中，当前仅演示初版效果：</div>
      <div class="circle-layout">
        <!-- SVG连线层，位于节点下方 -->
        <svg class="lines-layer" viewBox="0 0 500 500">
          <!-- 循环绘制连接线 -->
          <line
            v-for="(link, index) in networkLinks"
            :key="index"
            :x1="getNodePos(link.source).x"
            :y1="getNodePos(link.source).y"
            :x2="getNodePos(link.target).x"
            :y2="getNodePos(link.target).y"
            class="network-line"
            :class="{
              dimmed: networkHoverId && !isLinkActive(link) /* 非激活状态变暗 */,
              active: isLinkActive(link) /* 激活状态高亮 */,
            }"
          />
        </svg>
        <!-- 节点层 -->
        <div
          v-for="(char, index) in memberList"
          :key="char.id"
          class="node-wrapper"
          :class="{
            dimmed: networkHoverId && !isNodeActive(char.id) /* 非相关节点变暗 */,
            active: networkHoverId === char.id /* 当前悬停节点高亮 */,
          }"
          :style="getCircleStyle(index, memberList.length)"
          @mouseenter="networkHoverId = char.id"
          @mouseleave="networkHoverId = null"
        >
          <div class="node-circle">
            <span class="node-text">{{ char.name.slice(-1) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 手机端显示的提示文字 -->
    <div class="mobile-network-msg">
      <p>正在进行手机端适配，暂不显示，请使用电脑端浏览器查看。</p>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const props = defineProps<{
    memberList: any[] // 成员列表数据
  }>()

  // 当前鼠标悬停的节点ID
  const networkHoverId = ref<string | null>(null)

  // 计算连接线数据，当前逻辑是连接相邻和隔一个的节点
  const networkLinks = computed(() => {
    const links: { source: string; target: string }[] = []
    const ids = props.memberList.map((m) => m.id)
    ids.forEach((id, i) => {
      // 连接下一个节点
      if (i < ids.length - 1) links.push({ source: id, target: ids[i + 1]! })
      // 连接下下个节点
      if (i < ids.length - 2) links.push({ source: id, target: ids[i + 2]! })
      // 最后一个节点连接第一个节点形成闭环
      if (i === ids.length - 1) links.push({ source: id, target: ids[0]! })
    })
    return links
  })

  // 根据节点ID计算在圆周上的坐标
  const getNodePos = (id: string) => {
    const index = props.memberList.findIndex((m) => m.id === id)
    if (index === -1) return { x: 250, y: 250 } // 默认中心点
    const total = props.memberList.length
    const radius = 180 // 圆周半径
    // 计算角度，减90度是为了从正上方开始
    const angle = (360 / total) * index - 90
    // 角度转弧度
    const radian = (angle * Math.PI) / 180
    return {
      x: 250 + Math.cos(radian) * radius,
      y: 250 + Math.sin(radian) * radius,
    }
  }

  // 计算节点的绝对定位样式
  const getCircleStyle = (index: number, total: number) => {
    const m = props.memberList[index]
    if (!m) return {}
    const pos = getNodePos(m.id)
    return { left: `${pos.x}px`, top: `${pos.y}px` }
  }

  // 判断节点是否处于激活状态（自己是焦点，或者与焦点相连）
  const isNodeActive = (id: string) => {
    if (!networkHoverId.value) return true
    const isSelf = id === networkHoverId.value
    const isConnected = networkLinks.value.some(
      (link) =>
        (link.source === networkHoverId.value && link.target === id) ||
        (link.target === networkHoverId.value && link.source === id),
    )
    return isSelf || isConnected
  }

  // 判断连线是否处于激活状态（连接的两端有一端是焦点）
  const isLinkActive = (link: { source: string; target: string }) => {
    if (!networkHoverId.value) return true
    return link.source === networkHoverId.value || link.target === networkHoverId.value
  }
</script>

<style scoped>
  /* 模块间距 */
  .section-block {
    margin-bottom: 150px;
    scroll-margin-top: 100px;
  }

  .network-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .claim {
    display: block;
  }

  .circle-layout {
    position: relative;
    width: 500px;
    height: 500px;
  }

  .lines-layer {
    position: absolute;
    top: 0;
    left: 0;
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
    filter: drop-shadow(0 0 5px #d4af37);
    stroke: #fff;
    stroke-width: 2px;
  }

  .network-line.dimmed {
    opacity: 0.1;
  }

  .node-wrapper {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;

    /* 修正定位偏移，使圆心对齐坐标点 */
    margin-top: -35px;
    margin-left: -35px;
    cursor: pointer;
    transition: all 0.4s ease;
  }

  .node-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    background: #000;
    border: 1px solid #d4af37;
    border-radius: 50%;
    box-shadow: 0 0 10px rgb(212 175 55 / 20%);
    transition: all 0.3s;
  }

  .node-text {
    font-size: 0.9rem;
    font-weight: bold;
    color: #d4af37;
  }

  .node-wrapper:hover {
    z-index: 10;
    transform: scale(1.2);
  }

  .node-wrapper:hover .node-circle {
    background: #d4af37;
    box-shadow: 0 0 20px #d4af37;
  }

  .node-wrapper:hover .node-text {
    color: #000;
  }

  .node-wrapper.active .node-circle {
    border-color: #fff;
  }

  .node-wrapper.dimmed {
    opacity: 0.2;
    filter: grayscale(100%);
  }

  .mobile-network-msg {
    display: none;
    padding: 40px 20px;
    text-align: center;
  }

  .mobile-network-msg p {
    padding: 20px;
    font-size: 1rem;
    color: #d4af37;
    letter-spacing: 1px;
    border: 1px dashed #d4af37;
    border-radius: 8px;
  }

  @media (width <= 768px) {
    .desktop-only {
      display: none;
    }

    .mobile-network-msg {
      display: block;
    }
  }
</style>
