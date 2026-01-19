<template>
  <div class="relations-view">
    <!-- 目录轴 (Sidebar) -->
    <nav class="sidebar">
      <div class="nav-line"></div>
      <ul class="nav-list">
        <li
          v-for="(item, index) in navItems"
          :key="index"
          class="nav-item"
          :class="{ active: activeSection === item.id }"
          @click="scrollToSection(item.id)"
        >
          <span class="dot"></span>
          <span class="label">{{ item.label }}</span>
        </li>
      </ul>
    </nav>

    <!-- 页面内容 -->
    <div class="page-container">
      <!-- === 第一部分：称呼表 (Call Table) === -->
      <section id="section-table" class="section-block">
        <h2 class="section-title">称呼表</h2>
        <div class="table-scroll-wrapper">
          <table class="call-table">
            <thead>
              <!-- 头像行 -->
              <tr class="header-avator">
                <!-- 第一列空缺，固定宽度 -->
                <th class="fixed-col"></th>
                <th v-for="member in memberList" :key="member.id">
                  <img :src="resolvePath(member.avatar)" class="avatar-square" loading="lazy" />
                </th>
              </tr>
              <!-- 组合行 -->
              <tr class="header-group">
                <th class="fixed-col"><span class="group-label">所属乐队</span></th>
                <th colspan="4" class="group-name lilith">Ex-Lilith</th>
                <th colspan="4" class="group-name gorai">Go Raiiii</th>
                <th colspan="1" class="group-name other">Other</th>
              </tr>
              <!-- 名字行 -->
              <tr class="header-char">
                <th class="corner-header fixed-col">
                  <span class="corner-comment">称呼→被称呼</span>
                </th>
                <th
                  v-for="member in memberList"
                  :key="member.id"
                  :class="{ 'highlight-col': hoverCol === member.id }"
                >
                  <div class="th-content">{{ member.name }}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="caller in memberList" :key="caller.id">
                <!-- 第一列：行头 -->
                <td
                  class="row-header fixed-col"
                  :class="{ 'highlight-row': hoverRow === caller.id }"
                >
                  <div class="td-content">{{ caller.name }}</div>
                </td>
                <!-- 单元格 -->
                <td
                  v-for="target in memberList"
                  :key="target.id"
                  class="cell"
                  :class="{
                    active: hoverRow === caller.id && hoverCol === target.id,
                    'cross-highlight': hoverRow === caller.id || hoverCol === target.id,
                    self: caller.id === target.id,
                  }"
                  @mouseenter="setHover(caller.id, target.id)"
                  @mouseleave="clearHover"
                >
                  <div v-if="caller.id !== target.id" class="call-content">
                    {{ getCallName(caller.id, target.id).split('\n')[0] }}
                    <span class="romaji">{{
                      getCallName(caller.id, target.id).split('\n')[1] || ''
                    }}</span>
                  </div>
                  <span v-else class="dash">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- === 第二部分：关系网 (Network) === -->
      <section id="section-network" class="section-block">
        <h2 class="section-title">关系网</h2>
        <div class="network-container">
          <div class="circle-layout">
            <!-- 连线层 (SVG) -->
            <svg class="lines-layer" viewBox="0 0 500 500">
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
              v-for="(char, index) in memberList"
              :key="char.id"
              class="node-wrapper"
              :class="{
                dimmed: networkHoverId && !isNodeActive(char.id),
                active: networkHoverId === char.id,
              }"
              :style="getCircleStyle(index, memberList.length)"
              @mouseenter="networkHoverId = char.id"
              @mouseleave="networkHoverId = null"
            >
              <div class="node-circle">
                <span class="node-text">{{ char.name.slice(-2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- === 第三部分：亲缘谱 (Family Tree) === -->
      <section id="section-family" class="section-block">
        <h2 class="section-title">亲缘谱</h2>
        <div class="genealogy-grid">
          <div v-for="(family, index) in normalizedFamilyData" :key="index" class="family-unit">
            <!-- 母亲层 -->
            <div class="parents-row">
              <div v-for="mom in family.mother" :key="mom.name" class="parent-node">
                <img :src="resolvePath(mom.avatar)" class="avatar-round" loading="lazy" />
                <span class="name">{{ mom.name }}</span>
              </div>
            </div>

            <!-- 连接线结构 (全金色) -->
            <div class="connector" :class="{ 'dashed-line': family.type === 'adopt' }">
              <!-- 上半部分：连接父母 -->
              <div class="connector-top"></div>
              <!-- 下半部分：连接孩子 -->
              <div class="connector-bottom"></div>
            </div>

            <!-- 孩子层 -->
            <div class="child-row">
              <div v-for="child in family.child" :key="child.id" class="child-node">
                <img :src="resolvePath(child.avatar)" class="avatar-round" loading="lazy" />
                <span class="name">{{ child.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import relationData from '@/assets/data/relations.json'

  // 基础路径
  const baseUrl = import.meta.env.BASE_URL

  // 辅助函数：处理图片路径
  const resolvePath = (path: string) => {
    if (!path) return ''
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseUrl}${cleanPath}`
  }

  // 扁平化所有成员列表
  const memberList = computed(() => {
    return relationData.characters.flatMap((g) => g.members)
  })

  const callTable = relationData.callTable as Record<string, Record<string, string>>

  // --- 称呼表逻辑 ---
  const hoverRow = ref<string | null>(null)
  const hoverCol = ref<string | null>(null)

  const setHover = (r: string, c: string) => {
    hoverRow.value = r
    hoverCol.value = c
  }
  const clearHover = () => {
    hoverRow.value = null
    hoverCol.value = null
  }

  const getCallName = (callerId: string, targetId: string) => {
    return callTable[callerId]?.[targetId] || '?'
  }

  // --- 目录轴逻辑 ---
  const activeSection = ref('section-table')
  const navItems = [
    { id: 'section-table', label: '称呼表' },
    { id: 'section-network', label: '关系网' },
    { id: 'section-family', label: '亲缘谱' },
  ]

  const scrollToSection = (id: string) => {
    activeSection.value = id
    // block: 'start' 会让元素的顶部对齐视口顶部，加 scrollMarginTop 调整偏移
    const el = document.getElementById(id)
    if (el) {
      // 考虑头部高度进行偏移
      const headerOffset = 80
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  // 滚动监听函数
  const handleScroll = () => {
    // 阈值：滚动到距离顶部 300px 的位置时判定为进入该区域
    const threshold = 300
    const scrollY = window.scrollY

    for (const item of navItems) {
      const section = document.getElementById(item.id)
      if (section) {
        const { offsetTop, offsetHeight } = section
        // 如果当前滚动位置在 (section顶部 - 阈值) 和 (section底部 - 阈值) 之间
        if (scrollY >= offsetTop - threshold && scrollY < offsetTop + offsetHeight - threshold) {
          activeSection.value = item.id
        }
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  // --- 关系网逻辑 ---
  const networkHoverId = ref<string | null>(null)

  // 定义连线数据
  const networkLinks = computed(() => {
    const links: { source: string; target: string }[] = []
    const ids = memberList.value.map((m) => m.id)

    ids.forEach((id, i) => {
      if (i < ids.length - 1) links.push({ source: id, target: ids[i + 1]! })
      if (i < ids.length - 2) links.push({ source: id, target: ids[i + 2]! })
      if (i === ids.length - 1) links.push({ source: id, target: ids[0]! })
    })
    return links
  })

  // 计算圆周坐标 (固定画布500x500中心250,250)
  const getNodePos = (id: string) => {
    const index = memberList.value.findIndex((m) => m.id === id)
    if (index === -1) return { x: 250, y: 250 }

    const total = memberList.value.length
    const radius = 180
    const angle = (360 / total) * index - 90
    const radian = (angle * Math.PI) / 180
    return {
      x: 250 + Math.cos(radian) * radius,
      y: 250 + Math.sin(radian) * radius,
    }
  }

  const getCircleStyle = (index: number, total: number) => {
    const m = memberList.value[index]
    if (!m) return {}
    const pos = getNodePos(m.id)
    return { left: `${pos.x}px`, top: `${pos.y}px` }
  }

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

  const isLinkActive = (link: { source: string; target: string }) => {
    if (!networkHoverId.value) return true
    return link.source === networkHoverId.value || link.target === networkHoverId.value
  }

  // --- 亲缘谱数据处理 ---
  const normalizedFamilyData = computed(() => {
    return relationData.familyTree.map((item: any) => ({
      ...item,
      child: Array.isArray(item.child) ? item.child : [item.child],
    }))
  })
</script>

<style scoped>
  .relations-view {
    position: relative;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 100px;

    /* 核心修改：强制隐藏页面级横向滚动 */
    overflow-x: hidden;
    color: #fff;
    background-color: #0b0c10;
  }

  /* === 目录轴 === */
  .sidebar {
    position: fixed;
    top: 50%;
    left: 40px;
    z-index: 100;
    display: flex;
    align-items: stretch;
    transform: translateY(-50%);
  }

  .nav-line {
    width: 1px;
    margin-right: 15px;
    background: rgb(212 175 55 / 30%);
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .nav-item {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.3s;
  }

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

  .nav-item .label {
    font-size: 0.9rem;
    color: #d4af37;
    letter-spacing: 1px;
  }

  .nav-item:hover,
  .nav-item.active {
    opacity: 1;
  }

  .nav-item.active .dot {
    background: #d4af37;
    box-shadow: 0 0 10px #d4af37;
    transform: rotate(45deg) scale(1.5);
  }

  /* === 通用块 === */
  .section-block {
    margin-bottom: 150px;
    scroll-margin-top: 100px;
  }

  .section-title {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 0;
    margin-bottom: 60px;
    font-family: 'Noto Serif SC', cursive;
    font-size: 2.5rem;
    color: #d4af37;
    letter-spacing: 4px;
    text-shadow: 0 0 10px rgb(212 175 55 / 30%);
    border-bottom: none;
  }

  .section-title::before,
  .section-title::after {
    display: block;
    width: 400px;
    height: 1px;
    content: '';
    background: linear-gradient(90deg, transparent, rgb(185 153 48 / 50%));
  }

  .section-title::after {
    background: linear-gradient(90deg, rgb(185 153 48 / 50%), transparent);
  }

  /* === 称呼表 === */
  .table-scroll-wrapper {
    /* 核心修改：表格容器允许横向滚动 */
    padding-bottom: 10px;
    overflow-x: auto;
  }

  .call-table {
    width: 100%;
    font-family: 'Noto Serif SC', serif;
    font-size: 0.9rem;
    border-collapse: collapse;
  }

  .call-table th,
  .call-table td {
    padding: 10px;
    vertical-align: middle;
    text-align: center;
    border: 1px solid rgb(255 255 255 / 10%);
  }

  /* 第一列固定宽度 */
  .fixed-col {
    box-sizing: border-box;
    width: 120px;
    min-width: 120px;
    max-width: 120px;
  }

  .header-avator .fixed-col {
    height: 80px;
    padding: 0;
  }

  .header-group th {
    padding: 8px;
    font-size: 0.8rem;
    letter-spacing: 2px;
    background: rgb(255 255 255 / 2%);
  }

  .header-avator th:not(.fixed-col) {
    box-sizing: border-box;
    width: 80px;
    min-width: 80px;
    height: 80px;
    padding: 0;
  }

  .avatar-square {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: none;
    border-radius: 0;
  }

  .group-name.lilith {
    color: #ff4d4d;
    border-bottom: 2px solid #ff4d4d;
  }

  .group-name.gorai {
    color: #ffae00;
    border-bottom: 2px solid #ffae00;
  }

  .group-name.other {
    color: #aaa;
    border-bottom: 2px solid #aaa;
  }

  .call-content {
    display: flex;
    flex-direction: column;
    line-height: 1.4;
  }

  .call-content .romaji {
    font-family: sans-serif;
    font-size: 0.75rem;
    color: #888;
  }

  .row-header {
    font-weight: bold;
    color: #d4af37;
    background-color: rgb(212 175 55 / 5%);
  }

  .corner-comment {
    font-size: 0.8rem;
  }

  .highlight-col,
  .highlight-row {
    color: #fff !important;
    background-color: rgb(212 175 55 / 15%) !important;
  }

  .cross-highlight {
    background-color: rgb(255 255 255 / 3%);
  }

  .cell.active {
    position: relative;
    z-index: 2;
    font-weight: bold;
    color: #000;
    background-color: #ffd700;
    box-shadow: 0 0 20px rgb(0 0 0 / 50%);
  }

  .cell.active .romaji {
    color: #333;
  }

  /* === 关系网 === */
  .network-container {
    display: flex;
    justify-content: center;

    /* 容器高度，移动端会自动缩放 */
    height: 600px;
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

  /* === 亲缘谱 === */
  .genealogy-grid {
    display: flex;
    flex-flow: row wrap;
    gap: 40px 60px;
    justify-content: center;
  }

  .family-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
  }

  .parents-row,
  .child-row {
    position: relative;
    z-index: 2;
    display: flex;
    gap: 40px;
    justify-content: center;
  }

  .parent-node,
  .child-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
  }

  .avatar-round {
    width: 60px;
    height: 60px;
    margin-bottom: 8px;
    object-fit: cover;
    background: #000;
    border: 2px solid #d4af37;
    border-radius: 50%;
  }

  .name {
    font-size: 0.85rem;
    color: #ccc;
  }

  .connector {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 40px;
  }

  .connector-top {
    width: 60%;
    height: 20px;
    border-bottom: 1px solid #d4af37;
  }

  .connector-bottom {
    position: relative;
    width: 60%;
    height: 20px;
    border-top: 1px solid #d4af37;
  }

  .connector-bottom::before {
    position: absolute;
    top: -20px;
    left: 50%;
    width: 1px;
    height: 20px;
    content: '';
    background: #d4af37;
  }

  /* 虚线样式逻辑 */
  .dashed-line .connector-top {
    background: none;
    border: none;
    border-bottom: 1px dashed #d4af37;
  }

  .dashed-line .connector-bottom {
    position: relative;
    background: none;
    border: none;
    border-top: 1px dashed #d4af37;
  }

  .dashed-line .connector-bottom::before {
    width: 0;
    content: '';
    background: none;
    border: none;
    border-left: 1px dashed #d4af37;
  }

  .child-row:has(.child-node:only-child) + .connector .connector-bottom {
    border-top: none;
  }

  /* === 移动端/窄屏适配 (Media Query) === */
  @media (width <= 768px) {
    /* 标题适配 */
    .section-title {
      gap: 10px;
      font-size: 1.8rem;
    }

    .section-title::before,
    .section-title::after {
      width: 30px;
    }

    /* 核心修改：目录轴手机端适配 - 横向吸顶 */
    .sidebar {
      position: sticky; /* 超过头部高度后吸附 */
      top: var(--header-height, 60px); /* 配合Header高度 */
      left: 0;
      z-index: 100;
      width: 100%;
      height: auto;
      padding: 10px 0;
      background-color: #0b0c10; /* 添加背景防止透明穿透 */
      border-bottom: 1px solid rgb(212 175 55 / 30%);
      transform: none; /* 取消垂直居中偏移 */
    }

    .nav-line {
      display: none; /* 隐藏竖线 */
    }

    .nav-list {
      flex-direction: row; /* 横向排列 */
      gap: 30px;
      justify-content: center;
      width: 100%;
    }

    .nav-item .dot {
      display: none; /* 简化样式，隐藏点 */
    }

    .nav-item.active {
      border-bottom: 2px solid #d4af37; /* 激活态改为下划线 */
    }

    /* 核心修改：关系网手机端适配 - 缩小防错位 */
    .network-container {
      height: auto;
      aspect-ratio: 1/1; /* 保持正方形容器 */
      overflow: hidden;
    }

    .circle-layout {
      /* 水平居中 */
      margin: 0 auto;

      /* 使用scale缩小整体画布适应屏幕，基于中心缩放 */
      transform: scale(0.65);
      transform-origin: center center;
    }

    /* 核心修改：亲缘谱手机端适配 - Grid布局指定位置 */
    .genealogy-grid {
      display: grid;
      grid-template-columns: 1fr 1fr; /* 两列 */
      gap: 30px 10px;
      width: 100%;
      padding: 0 10px;
    }

    /* 依据 JSON 顺序控制位置 */

    /* 缩小手机端亲缘谱卡片尺寸以防溢出 */
    .family-unit {
      min-width: auto;
      transform: scale(0.9);
    }

    /* Index 0: 羽月 (Row 1 Col 1) */
    .family-unit:nth-child(1) {
      grid-area: 1 / 1 / 2 / 2;
    }

    /* Index 1: 莉子 (Row 1 Col 2) */
    .family-unit:nth-child(2) {
      grid-area: 1 / 2 / 2 / 3;
    }

    /* Index 2: 若叶家 (Row 2 Col 1-2 居中) */
    .family-unit:nth-child(3) {
      grid-area: 2 / 1 / 3 / 3;
      justify-self: center;
    }

    /* Index 3: 长崎家 (Row 3 Col 1) */
    .family-unit:nth-child(4) {
      grid-area: 3 / 1 / 4 / 2;
    }

    /* Index 4: 高松家 (Row 3 Col 2) */
    .family-unit:nth-child(5) {
      grid-area: 3 / 2 / 4 / 3;
    }

    .parent-node,
    .child-node {
      width: 60px;
    }

    .avatar-round {
      width: 50px;
      height: 50px;
    }
  }
</style>
