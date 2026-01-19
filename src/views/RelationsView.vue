<template>
  <div class="relations-view">
    <!-- 目录轴：移动端完全隐藏，仅PC端显示 -->
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
      <!-- === 第一部分：称呼表 === -->
      <section id="section-table" class="section-block">
        <h2 class="section-title"><span>称呼表</span></h2>
        <div class="table-description">表格可横向滚动，但更适合电脑浏览器查看</div>
        <div class="table-scroll-wrapper">
          <table class="call-table">
            <thead>
              <tr class="header-avator">
                <th class="fixed-col"></th>
                <th v-for="member in memberList" :key="member.id">
                  <img :src="resolvePath(member.avatar)" class="avatar-square" loading="lazy" />
                </th>
              </tr>
              <tr class="header-group">
                <th class="fixed-col"><span class="group-label">所属乐队</span></th>
                <th colspan="4" class="group-name lilith">Ex-Lilith</th>
                <th colspan="4" class="group-name gorai">Go Raiiii</th>
                <th colspan="1" class="group-name other">Other</th>
              </tr>
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
                <td
                  class="row-header fixed-col"
                  :class="{ 'highlight-row': hoverRow === caller.id }"
                >
                  <div class="td-content">{{ caller.name }}</div>
                </td>
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

      <!-- === 第二部分：关系网 === -->
      <section id="section-network" class="section-block">
        <h2 class="section-title"><span>关系网</span></h2>

        <!-- PC端显示的关系网图表 -->
        <div class="network-container desktop-only">
          <div class="circle-layout">
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

        <!-- 手机端显示的提示文字 -->
        <div class="mobile-network-msg">
          <p>正在进行手机端适配，暂不显示，请使用电脑端浏览器查看。</p>
        </div>
      </section>

      <!-- === 第三部分：亲缘谱 === -->
      <section id="section-family" class="section-block">
        <h2 class="section-title"><span>亲缘谱</span></h2>
        <div class="genealogy-grid">
          <div v-for="(family, index) in normalizedFamilyData" :key="index" class="family-unit">
            <div class="parents-row">
              <div v-for="mom in family.mother" :key="mom.name" class="parent-node">
                <img :src="resolvePath(mom.avatar)" class="avatar-round" loading="lazy" />
                <span class="name">{{ mom.name }}</span>
              </div>
            </div>
            <div class="connector" :class="{ 'dashed-line': family.type === 'adopt' }">
              <div class="connector-top"></div>
              <div class="connector-bottom"></div>
            </div>
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

  const baseUrl = import.meta.env.BASE_URL
  const resolvePath = (path: string) => {
    if (!path) return ''
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseUrl}${cleanPath}`
  }

  const memberList = computed(() => {
    return relationData.characters.flatMap((g) => g.members)
  })
  const callTable = relationData.callTable as Record<string, Record<string, string>>

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

  const activeSection = ref('section-table')
  const navItems = [
    { id: 'section-table', label: '称呼表' },
    { id: 'section-network', label: '关系网' },
    { id: 'section-family', label: '亲缘谱' },
  ]

  const scrollToSection = (id: string) => {
    activeSection.value = id
    const el = document.getElementById(id)
    if (el) {
      const headerHeight = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')
        .trim()
      const navOffset = 0 // 手机端不显示目录轴，无需偏移
      const baseOffset = parseInt(headerHeight || '0') + navOffset
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - baseOffset - 20
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const handleScroll = () => {
    const threshold = 300
    const scrollY = window.scrollY
    for (const item of navItems) {
      const section = document.getElementById(item.id)
      if (section) {
        if (window.innerWidth <= 768 && item.id === 'section-network') continue
        const { offsetTop, offsetHeight } = section
        if (scrollY >= offsetTop - threshold && scrollY < offsetTop + offsetHeight - threshold) {
          activeSection.value = item.id
        }
      }
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible') // 添加动画类
            observer.unobserve(entry.target) // 动画只执行一次
          }
        })
      },
      { threshold: 0.1 },
    )
    // 开始监听所有标题
    document.querySelectorAll('.section-title').forEach((el) => observer.observe(el))
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  const networkHoverId = ref<string | null>(null)
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
    overflow-x: hidden;
    color: #fff;
    background-color: #0b0c10;
  }

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

  .page-container {
    padding-top: 50px;
  }

  .section-block {
    margin-bottom: 150px;
    scroll-margin-top: 100px;
  }

  /* 标题容器：保持 Flex 布局，移除之前的整体动画 */
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

  /* 针对文字 span 的动画（淡入 + 上浮） */
  .section-title span {
    opacity: 0;
    transform: translateY(-30px);
    transition:
      opacity 1.5s ease-out,
      transform 1.5s ease-out;
  }

  /* 线条初始宽度为 0，添加宽度过渡动画 */
  .section-title::before,
  .section-title::after {
    display: block;
    width: 0; /* 初始宽度为 0 */
    height: 1px;
    content: '';
    background: linear-gradient(90deg, transparent, rgb(185 153 48 / 50%));
    transition: width 2s ease-out; /* 宽度缓慢伸长 */
  }

  .section-title::after {
    background: linear-gradient(90deg, rgb(185 153 48 / 50%), transparent);
  }

  /* 激活状态：文字浮现，线条变长 */
  .section-title.visible span {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title.visible::before,
  .section-title.visible::after {
    width: 400px; /* 最终线条长度 */
  }

  .table-description {
    display: none;
    margin-bottom: 20px;
    font-size: 0.7rem;
    color: rgb(185 153 48 / 50%);
    text-align: center;
  }

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

  /* 手机端网络图提示信息默认隐藏 */
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

  .genealogy-grid {
    display: flex;
    flex-flow: row wrap;
    gap: 40px 60px;
    justify-content: center;
  }

  /* 电脑端亲缘谱顺序调整: 羽月(1) 若叶(2) 高松(3) 长崎(4) 八幡(5) */
  .family-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
  }

  .family-unit:nth-child(1) {
    order: 1;
  }

  .family-unit:nth-child(2) {
    order: 5;
  } /* 莉子移到最后 */
  .family-unit:nth-child(3) {
    order: 2;
  } /* 若叶移到第二个 */
  .family-unit:nth-child(4) {
    order: 4;
  }

  .family-unit:nth-child(5) {
    order: 3;
  } /* 高松移到第三个 */

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

  @media (width <= 768px) {
    /* 隐藏目录轴 */
    .sidebar {
      display: none;
    }

    /* 关系网适配: 隐藏图表，显示文字 */
    .desktop-only {
      display: none;
    }

    .mobile-network-msg {
      display: block;
    }

    .section-title {
      gap: 10px;
      font-size: 1.5rem;
    }

    .section-title::before,
    .section-title::after {
      width: 30px;
    }

    .section-title.visible::before,
    .section-title.visible::after {
      width: 100px; /* 手机端线条较短 */
    }

    .table-description {
      display: flex;
      justify-content: center;
      margin-bottom: 0;
      font-size: 0.6rem;
      transform: translateY(-3.5vh);
    }

    .table-scroll-wrapper {
      border: rgb(255 215 0 / 10%) 1px solid;
      border-radius: 5px;
    }

    .cell {
      font-size: 0.8rem;
    }

    /* 亲缘谱容器修复: 移除内边距，确保居中，缩小Gap防止溢出 */
    .genealogy-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px 5px; /* 缩小列间距 */
      justify-items: center; /* 修复右偏关键：强制内容在格子内居中 */
      width: 100%;
      padding: 0; /* 移除padding，完全交由Grid控制 */
    }

    .family-unit {
      /* 手机端重置order，使用GridArea布局 */
      order: unset !important;
      min-width: auto;
      transform: scale(0.9);
    }

    /* 保持原来的手机端布局逻辑 */
    .family-unit:nth-child(1) {
      grid-area: 1 / 1 / 2 / 2;
    }

    .family-unit:nth-child(2) {
      grid-area: 3 / 2 / 4 / 3;
    }

    .family-unit:nth-child(3) {
      grid-area: 2 / 1 / 3 / 3;
      justify-self: center;
    }

    .family-unit:nth-child(4) {
      grid-area: 3 / 1 / 4 / 2;
    }

    .family-unit:nth-child(5) {
      grid-area: 1 / 2 / 2 / 3;
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
