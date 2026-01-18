<template>
  <div class="relations-view">
    <div class="left-bar"></div>
    <div class="page-container">
      <!-- === 称呼表 (Call Table) === -->
      <section class="section-block">
        <h2 class="section-title">APPELLATION CHART</h2>
        <div class="table-scroll-wrapper">
          <table class="call-table">
            <!-- 表头，一共3行 -->
            <thead>
              <!-- 表头第一行：头像 -->
              <tr class="header-avatar">
                <!-- 左上角空缺 -->
                <th></th>
                <!-- 填充每个人都头像 -->
                <th v-for="member in memberList">
                  <img :src="`${base_url}${member.avatar}`" class="avatar-square" />
                </th>
              </tr>

              <!-- 表头第二行：所属组合 -->
              <tr class="header-group">
                <th><span>所属组合</span></th>
                <th colspan="4" class="group-name-lilith">{{ groupList[0] }}</th>
                <th colspan="4" class="group-name-gorai">{{ groupList[1] }}</th>
                <th colspan="1" class="group-name-off-stuff">{{ groupList[2] }}</th>
              </tr>

              <!-- 表头第三行：被称呼人物 -->
              <tr class="header-char">
                <!-- 左上角空缺 -->
                <th class="corner-header">称呼<br />↘<br />被称呼</th>
                <!-- 每个人的名字 -->
                <th
                  v-for="member in memberList"
                  :key="member.id"
                  :class="{ 'highlight-col': hoverCol === member.id }"
                >
                  <div class="th-content">
                    <span>{{ member.name }}</span>
                  </div>
                </th>
              </tr>
            </thead>

            <!-- 表体 -->
            <tbody>
              <!-- 行：主格 (Caller) -->
              <tr v-for="caller in memberList" :key="caller.id">
                <!-- 第一列：谁在叫 -->
                <td class="row-header" :class="{ 'highlight-row': hoverRow === caller.id }">
                  <div class="td-content">
                    <span>{{ caller.name }}</span>
                  </div>
                </td>

                <!-- 单元格：叫什么 -->
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
                  <span v-if="caller.id !== target.id">
                    {{ getCallName(caller.id, target.id) }}
                  </span>
                  <span v-else class="dash">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- === 关系网 (Network) === -->
      <!-- 圆周布局，暂略 -->

      <!-- === 亲缘谱 (Family Tree) === -->
      <!-- 暂略 -->
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import relationData from '@/assets/data/relations.json'

  const base_url = import.meta.env.BASE_URL
  // 角色数据
  const charList = relationData.characters
  const groupList = relationData.characters.map((group) => group.groupName)
  const memberList = relationData.characters.flatMap((group) => group.members) // 提取所有member单独形成列表
  // 称呼表
  const callTable = relationData.callTable as Record<string, Record<string, string>>
  // 亲缘谱
  const familyData = relationData.familyTree

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

  // --- 关系网圆周布局算法 ---
  const getCirclePosition = (index: number, total: number) => {
    const radius = 220 // 半径 px
    const angle = (360 / total) * index - 90 // -90让第一个在正上方
    const radian = (angle * Math.PI) / 180
    const x = Math.cos(radian) * radius
    const y = Math.sin(radian) * radius
    return {
      transform: `translate(${x}px, ${y}px)`,
    }
  }
</script>

<style scoped>
  .relations-view {
    position: relative;
    min-height: 100vh;
    padding-top: 40px; /* 留出顶部空间 */
    padding-bottom: 100px;
    color: #fff;
    background-color: #0b0c10;
  }

  .left-bar {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 400px;
    background-color: #51ff1c;
  }

  /* 块标题 */
  .section-block {
    margin-bottom: 120px;
  }

  .section-title {
    width: fit-content;
    padding-bottom: 20px;
    margin-right: auto;
    margin-bottom: 60px;
    margin-left: auto;
    font-family: 'Cinzel Decorative', cursive;
    font-size: 2.5rem;
    color: #d4af37;
    text-align: center;
    letter-spacing: 4px;
    border-bottom: 1px solid rgb(212 175 55 / 30%);
  }

  /* === 1. 关系网样式 === */
  .network-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 600px; /* 画布高度 */
  }

  .circle-layout {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 500px;
  }

  .node-wrapper {
    position: absolute;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;

    /* 关键：让元素中心对齐坐标点 */
    margin-top: -40px;
    margin-left: -40px;
  }

  .node-avatar img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px rgb(255 255 255 / 50%);
  }

  .node-name {
    margin-top: 5px;
    font-size: 0.9rem;
    color: #fff;
    text-shadow: 0 2px 4px #000;
  }

  .lines-layer {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }

  .center-text {
    font-family: 'Noto Serif SC', serif;
    font-size: 1.5rem;
    color: #d4af37;
    text-align: center;
    letter-spacing: 5px;
  }

  /* === 2. 称呼表样式 === */
  .table-scroll-wrapper {
    padding-bottom: 20px;
    overflow-x: auto; /* 允许横向滚动 */
  }

  .call-table {
    width: 100%;
    font-family: 'Noto Serif SC', serif;
    border-collapse: collapse;
  }

  .call-table th,
  .call-table td {
    padding: 10px;
    font-size: 0.9rem;
    text-align: center;
    border: 1px solid rgb(255 255 255 / 10%);
    transition: all 0.2s;
  }

  /* 头像与名字容器 */
  .th-content,
  .td-content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    min-width: 80px;
  }

  .avatar-square {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 4px; /* 轻微圆角 */
  }

  /* 颜色定义 */
  .call-table thead th {
    color: #d4af37;
    background-color: rgb(212 175 55 / 10%); /* 表头金底 */
  }

  .row-header {
    color: #d4af37;
    background-color: rgb(212 175 55 / 5%);
  }

  .corner-header {
    font-size: 0.8rem;
    color: #888;
  }

  /* 交互高亮 */
  .highlight-col,
  .highlight-row {
    color: #fff !important;
    background-color: rgb(212 175 55 / 20%) !important;
  }

  .cross-highlight {
    background-color: rgb(255 255 255 / 5%); /* 十字交叉浅亮 */
  }

  .cell.active {
    font-weight: bold;
    color: #000;
    background-color: #ffd700; /* 焦点格 */
    border-color: #d4af37;
    box-shadow: 0 0 15px rgb(212 175 55 / 50%);
    transform: scale(1.05);
  }

  .cell.self {
    color: #333;
    background-color: #000;
  }

  /* === 3. 亲缘谱样式 (生物遗传题风格) === */
  .genealogy-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    justify-content: center;
  }

  .family-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
  }

  .parents-row {
    display: flex;
    gap: 10px; /* 父母间距 */
    align-items: center;
  }

  .parent-node,
  .child-node {
    position: relative;
    z-index: 2; /* 盖住线 */
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .avatar-round {
    width: 60px;
    height: 60px;
    object-fit: cover;
    background: #000;
    border: 2px solid;
    border-radius: 50%;
  }

  .name {
    margin-top: 5px;
    font-size: 0.9rem;
  }

  /* 边框颜色 */
  .pink-border .avatar-round {
    border-color: #ff2e63;
  } /* 母系 */
  .blue-border .avatar-round {
    border-color: #00d2ff;
  } /* 父系 */
  .gold-border .avatar-round {
    border-color: #d4af37;
  } /* 领养 */

  /* 连接线结构 (生物图) */
  .connector {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40px; /* 线条跨度 */
    height: 60px; /* 垂直高度 */
    margin-top: -20px; /* 向上修正位置 */
  }

  .line-horizontal {
    width: 100%;
    height: 2px;
    margin-top: 30px; /* 水平线位置 */
    background-color: #666;
  }

  .line-vertical {
    width: 2px;
    height: 30px; /* 垂线长度 */
    background-color: #666;
  }

  .child-row {
    margin-top: 0;
  }

  .child-node .tag {
    padding: 1px 4px;
    margin-top: 2px;
    font-size: 0.6rem;
    color: #d4af37;
    border: 1px solid #d4af37;
    border-radius: 4px;
  }

  @media (width <= 768px) {
    .circle-layout {
      transform: scale(0.6);
    }

    .network-container {
      height: 400px;
    }

    .call-table th,
    .call-table td {
      padding: 5px;
      font-size: 0.7rem;
    }

    .avatar-square {
      width: 30px;
      height: 30px;
    }
  }
</style>
