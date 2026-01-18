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
                <th class="fixed-col"><span class="group-label">所属组合</span></th>
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
  import BackToTop from '@/components/BackToTop.vue'

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

  const groupList = relationData.characters.map((g) => g.groupName)
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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

  // 计算圆周坐标
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
    min-height: 100vh;
    padding-bottom: 100px;
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
    scroll-margin-top: 100px; /* 关键：解决点击跳转被遮挡的问题 */
  }

  .section-title {
    /* 布局 */
    display: flex;
    gap: 20px; /* 文字和线条的间距 */
    align-items: center;
    justify-content: center;
    width: 100%; /* 占满容器宽度以便居中 */
    padding-bottom: 0;
    margin-bottom: 60px;

    /* 文字样式 */
    font-family: 'Noto Serif SC', cursive;
    font-size: 2.5rem;
    color: #d4af37;
    letter-spacing: 4px;
    text-shadow: 0 0 10px rgb(212 175 55 / 30%);

    /* 取消原来的下划线，改用伪元素做左右装饰 */
    border-bottom: none;
  }

  /* 左侧线条装饰 */
  .section-title::before,
  .section-title::after {
    display: block;
    width: 400px; /* 线条长度 */
    height: 1px; /* 线条粗细 */
    content: '';
    background: linear-gradient(90deg, transparent, rgb(185 153 48 / 50%)); /* 渐变金线 */
  }

  /* 右侧线条 (反向渐变) */
  .section-title::after {
    background: linear-gradient(90deg, rgb(185 153 48 / 50%), transparent);
  }

  /* === 称呼表 === */
  .table-scroll-wrapper {
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

  /* --- 修复左列宽度的关键 CSS --- */

  /* 给第一列（无论哪一行）都设置固定宽度 */
  .fixed-col {
    box-sizing: border-box;
    width: 120px; /* 统一设为 120px，或者你想要的宽度 */
    min-width: 120px;
    max-width: 120px;
  }

  /* 头像行：左上角空格 */
  .header-avator .fixed-col {
    height: 80px; /* 保持和头像高度一致 */
    padding: 0;
  }

  .header-group th {
    padding: 8px;
    font-size: 0.8rem;
    letter-spacing: 2px;
    background: rgb(255 255 255 / 2%);
  }

  /* 头像单元格 */
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

  /* 表格高亮 */
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

    /* border: 2px solid #fff; */
    box-shadow: 0 0 20px rgb(0 0 0 / 50%);

    /* transform: scale(1.1); */
  }

  .cell.active .romaji {
    color: #333;
  }

  /* === 关系网 === */
  .network-container {
    display: flex;
    justify-content: center;
    height: 600px;
  }

  .circle-layout {
    position: relative;
    width: 500px;
    height: 500px;
  }

  /* 连线 */
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

  /* 节点容器 */
  .node-wrapper {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    margin-top: -35px; /* 居中 */
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

  /* 节点交互 */
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

  /* === 亲缘谱 (修改为 inline-block/flex-wrap 布局) === */
  .genealogy-grid {
    display: flex;
    flex-flow: row wrap; /* 修改：横向排列 */ /* 修改：允许换行 */
    gap: 40px 60px; /* 行间距40，列间距60 */
    justify-content: center; /* 居中显示 */
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

  /* 连接线 */
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

  /* Stylelint 修复：调整 CSS 顺序，避免 no-descending-specificity 警告 */

  /* 虚线样式 */

  /* 1. 父母连接线 (上半部分)：只留底边 */
  .dashed-line .connector-top {
    background: none;
    border: none; /* 先清除原本可能存在的四边框 */
    border-bottom: 1px dashed #d4af37; /* 重新指定：只有底边、虚线、金色 */
  }

  /* 2. 孩子连接线 (下半部分)：只留顶边 */
  .dashed-line .connector-bottom {
    position: relative; /* 确保伪元素定位正常 */
    background: none;
    border: none; /* 先清除 */
    border-top: 1px dashed #d4af37; /* 重新指定：只有顶边、虚线、金色 */
  }

  /* 3. 垂直连接线：只留左边 */
  .dashed-line .connector-bottom::before {
    width: 0;
    content: '';
    background: none;
    border: none; /* 先清除 */
    border-left: 1px dashed #d4af37; /* 重新指定：只有左边、虚线、金色 */
  }

  /* 单孩特殊样式，必须放在最后以覆盖 */
  .child-row:has(.child-node:only-child) + .connector .connector-bottom {
    border-top: none;
  }

  /* 手机适配微调 */
  @media (width <= 768px) {
    .section-title {
      gap: 10px;
      font-size: 1.8rem;
    }

    .section-title::before,
    .section-title::after {
      width: 30px;
    }
  }

  @media (width <= 1200px) {
    .sidebar {
      display: none;
    }
  }
</style>
