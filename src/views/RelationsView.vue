<template>
  <div class="relations-view">
    <!-- 回到顶部按钮 -->
    <BackToTop />
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

    <div class="page-container">
      <!-- === 第一部分：称呼表 (Call Table) === -->
      <section id="section-table" class="section-block">
        <h2 class="section-title">APPELLATION CHART</h2>
        <div class="table-scroll-wrapper">
          <table class="call-table">
            <thead>
              <!-- 头像行 -->
              <tr class="header-avator">
                <th></th>
                <th v-for="member in memberList" :key="member.id">
                  <img :src="resolvePath(member.avatar)" class="avatar-square" />
                </th>
              </tr>
              <!-- 组合行 -->
              <tr class="header-group">
                <th><span class="group-label">所属组合</span></th>
                <th colspan="4" class="group-name lilith">Ex-Lilith</th>
                <th colspan="4" class="group-name gorai">Go Raiiii</th>
                <th colspan="1" class="group-name other">Other</th>
              </tr>
              <!-- 名字行 -->
              <tr class="header-char">
                <th class="corner-header"><span class="corner-comment">称呼→被称呼</span></th>
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
                <!-- 第一列 -->
                <td class="row-header" :class="{ 'highlight-row': hoverRow === caller.id }">
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
        <h2 class="section-title">RELATIONSHIP NETWORK</h2>
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
                <!-- 只显示名字，例如 '羽月' -->
                <span class="node-text">{{ char.name.slice(-2) }}</span>
              </div>
            </div>

            <div class="center-text">子世代<br />关系网</div>
          </div>
        </div>
      </section>

      <!-- === 第三部分：亲缘谱 (Family Tree) === -->
      <section id="section-family" class="section-block">
        <h2 class="section-title">GENEALOGY</h2>
        <div class="genealogy-grid">
          <div v-for="(family, index) in normalizedFamilyData" :key="index" class="family-unit">
            <!-- 母亲层 -->
            <div class="parents-row">
              <div v-for="mom in family.mother" :key="mom.name" class="parent-node">
                <img :src="resolvePath(mom.avatar)" class="avatar-round" />
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
                <img :src="resolvePath(child.avatar)" class="avatar-round" />
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
  import { ref, computed } from 'vue'
  import relationData from '@/assets/data/relations.json'
  import BackToTop from '@/components/BackToTop.vue'

  // 基础路径
  const baseUrl = import.meta.env.BASE_URL

  // 辅助函数：处理图片路径
  const resolvePath = (path: string) => {
    if (!path) return ''
    // 移除开头的 / 防止双斜杠 (适配你JSON里有时写/有时不写的情况)
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
    // TS修复：增加可选链和空字符串保底
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // --- 关系网逻辑 ---
  const networkHoverId = ref<string | null>(null)

  // TS修复：定义连线数据
  const networkLinks = computed(() => {
    const links: { source: string; target: string }[] = []
    const ids = memberList.value.map((m) => m.id)

    ids.forEach((id, i) => {
      // TS修复：使用 ! (非空断言)，因为 if 条件已经保证了 i+1 存在
      if (i < ids.length - 1) links.push({ source: id, target: ids[i + 1]! })
      if (i < ids.length - 2) links.push({ source: id, target: ids[i + 2]! })
      // 让头尾相连
      if (i === ids.length - 1) links.push({ source: id, target: ids[0]! })
    })
    return links
  })

  // 计算圆周坐标 (SVG 坐标系 500x500，中心 250,250)
  const getNodePos = (id: string) => {
    const index = memberList.value.findIndex((m) => m.id === id)
    // 防止找不到id报错
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

  // 节点样式定位
  const getCircleStyle = (index: number, total: number) => {
    const m = memberList.value[index]
    if (!m) return {}
    const pos = getNodePos(m.id)
    return { left: `${pos.x}px`, top: `${pos.y}px` }
  }

  // 高亮判断逻辑
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
  // 关键逻辑：处理 JSON 中 child 可能是对象也可能是数组的情况
  const normalizedFamilyData = computed(() => {
    return relationData.familyTree.map((item: any) => ({
      ...item,
      // 如果 child 是数组直接用，如果是对象包成数组
      child: Array.isArray(item.child) ? item.child : [item.child],
    }))
  })
</script>

<style scoped>
  .relations-view {
    position: relative;
    min-height: 100vh;
    padding-top: 40px;
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
    left: -20px; /* 对齐线条 */
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
    scroll-margin-top: 100px; /* 给平滑滚动留余地 */
  }

  .section-title {
    margin-bottom: 50px;
    font-family: 'Cinzel Decorative', cursive;
    font-size: 2.5rem;
    color: #d4af37;
    text-align: center;
    letter-spacing: 4px;
    text-shadow: 0 4px 10px rgb(0 0 0 / 50%);
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

  .header-avator th {
    box-sizing: border-box; /* 边框算在尺寸内 */
    width: 80px; /* 设定宽度 */
    min-width: 80px; /* 防止表格挤压导致变形 */
    height: 80px; /* 设定高度与宽度一致 -> 正方形 */
    padding: 0; /* 关键：去掉内边距，让图片能贴边 */
  }

  /* 左上角那个空格子也需要同步高度 */

  .header-avator th:first-child {
    min-width: auto;

    /* width: auto; */
    height: 80px;
  }

  .avatar-square {
    display: block; /* 消除图片底部的幽灵间隙 */
    width: 100%; /* 宽撑满格子 */
    height: 100%; /* 高撑满格子 */
    object-fit: cover; /* 保持比例裁切填充，不会拉伸变形 */
    border: none;

    /* 完全填满，去掉圆角和边框 */
    border-radius: 0;
  }

  .header-group th {
    padding: 8px;
    font-size: 0.8rem;
    letter-spacing: 2px;
    background: rgb(255 255 255 / 2%);
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
    background-color: #d4af37;
    border: 2px solid #fff;
    box-shadow: 0 0 20px rgb(0 0 0 / 50%);
    transform: scale(1.1);
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

  .center-text {
    position: absolute;
    top: 50%;
    left: 50%;
    font-family: 'Noto Serif SC', serif;
    font-size: 1.5rem;
    color: rgb(255 255 255 / 10%);
    text-align: center;
    pointer-events: none;
    transform: translate(-50%, -50%);
  }

  /* === 亲缘谱 === */
  .genealogy-grid {
    display: flex;
    flex-direction: column;
    gap: 60px;
    align-items: center;
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
    border: 2px solid #d4af37; /* 全金色边框 */
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
    height: 40px; /* 上下间距 */
  }

  /* 父母连线 (倒U型) */
  .connector-top {
    width: 60%; /* 连接父母的横线宽度 */
    height: 20px;
    border-bottom: 1px solid #d4af37;
  }

  /* 孩子连线 (正U型) */
  .connector-bottom {
    position: relative;
    width: 60%; /* 连接孩子的横线宽度 (如果有多个孩子) */
    height: 20px;
    border-top: 1px solid #d4af37;
  }

  /* 垂直连线 */
  .connector-bottom::before {
    position: absolute;
    top: -20px; /* 连到上面去 */
    left: 50%;
    width: 1px;
    height: 20px;
    content: '';
    background: #d4af37;
  }

  /* 虚线样式 */
  .dashed-line .connector-top,
  .dashed-line .connector-bottom,
  .dashed-line .connector-bottom::before {
    background: none; /* 垂直线得用 border-left 模拟 dashed */
    border-style: dashed;
  }

  /* 只有一个孩子时，去掉底部的横线，只留垂直线 */
  .child-row:has(.child-node:only-child) + .connector .connector-bottom {
    border-top: none;
  }

  /* 垂直虚线修正 */
  .dashed-line .connector-bottom::before {
    width: 0;
    border-left: 1px dashed #d4af37;
  }

  @media (width <= 1200px) {
    .sidebar {
      display: none;
    } /* 窄屏隐藏目录 */
  }
</style>
