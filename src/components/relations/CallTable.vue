<template>
  <section class="section-block">
    <!-- 标题区域，包含下划线动画效果 -->
    <h2 class="section-title"><span>称呼表</span></h2>

    <div class="table-scroll-wrapper">
      <table class="call-table">
        <thead>
          <!-- 第一行：头像行 -->
          <tr class="header-avator">
            <!-- 左上角固定空白格 -->
            <th class="fixed-col"></th>
            <!-- 循环渲染所有成员头像 -->
            <th v-for="(member, index) in memberList" :key="member.id">
              <!-- 图片添加加载事件监听和动态类名 -->
              <img
                :src="resolvePath(member.avatar)"
                class="avatar-square"
                :class="{ loaded: loadedImages.has(member.id) }"
                loading="lazy"
                @load="handleImageLoad(member.id)"
              />
            </th>
          </tr>
          <!-- 第二行：乐队分组行 -->
          <tr class="header-group">
            <th class="fixed-col"><span class="group-label">所属乐队</span></th>
            <!-- Ex-Lilith 占4列 -->
            <th colspan="4" class="group-name lilith">Ex-Lilith</th>
            <!-- Go Raiiii 占4列 -->
            <th colspan="4" class="group-name gorai">Go Raiiii</th>
            <!-- Other 占1列 -->
            <th colspan="1" class="group-name other">Other</th>
          </tr>
          <!-- 第三行：成员名字行 -->
          <tr class="header-char">
            <th class="corner-header fixed-col">
              <span class="corner-comment">称呼→被称呼</span>
            </th>
            <!-- 列表头成员名，鼠标悬停列时高亮 -->
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
          <!-- 循环渲染每一行（称呼者） -->
          <tr v-for="(caller, rIndex) in memberList" :key="caller.id">
            <!-- 行首固定列：称呼者名字 -->
            <td class="row-header fixed-col" :class="{ 'highlight-row': hoverRow === caller.id }">
              <div class="td-content">{{ caller.name }}</div>
            </td>
            <!-- 循环渲染每一格（被称呼者） -->
            <td
              v-for="(target, cIndex) in memberList"
              :key="target.id"
              class="cell"
              :class="{
                active: hoverRow === caller.id && hoverCol === target.id /* 当前选中格高亮 */,
                'cross-highlight':
                  hoverRow === caller.id || hoverCol === target.id /* 十字准星高亮 */,
                self: caller.id === target.id /* 自身对自身 */,
                'bg-lilith': rIndex < 4 && cIndex < 4 /* Lilith 内部互称区域背景色 */,
                'bg-gorai': rIndex >= 4 && cIndex >= 4 /* Gorai 内部互称区域背景色 */,
              }"
              @mouseenter="setHover(caller.id, target.id)"
              @mouseleave="clearHover"
            >
              <!-- 如果不是自己称呼自己，显示称呼内容 -->
              <div v-if="caller.id !== target.id" class="call-content">
                <!-- 显示中文/日文称呼 -->
                {{ getCallName(caller.id, target.id).split('\n')[0] }}
                <!-- 显示罗马音标注 -->
                <span class="romaji">{{
                  getCallName(caller.id, target.id).split('\n')[1] || ''
                }}</span>
              </div>
              <!-- 如果是自己称呼自己，显示横杠 -->
              <span v-else class="dash">—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="section-comment">头像尚未导入，暂时以圆圈名字替代</div>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // 定义组件接收的属性
  const props = defineProps<{
    memberList: any[] // 扁平化的成员列表
    callTable: Record<string, Record<string, string>> // 称呼关系映射表
  }>()

  // 获取基础路径用于图片加载
  const baseUrl = import.meta.env.BASE_URL

  // 记录已加载完成的图片ID集合
  const loadedImages = ref(new Set<string>())

  // 处理图片路径，确保以 base url 开头
  const resolvePath = (path: string) => {
    if (!path) return ''
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseUrl}${cleanPath}`
  }

  // 图片加载完成的回调函数
  const handleImageLoad = (id: string) => {
    loadedImages.value.add(id)
  }

  // 当前鼠标悬停的行ID
  const hoverRow = ref<string | null>(null)
  // 当前鼠标悬停的列ID
  const hoverCol = ref<string | null>(null)

  // 设置高亮状态
  const setHover = (r: string, c: string) => {
    hoverRow.value = r
    hoverCol.value = c
  }

  // 清除高亮状态
  const clearHover = () => {
    hoverRow.value = null
    hoverCol.value = null
  }

  // 根据ID获取称呼数据，如果不存在则返回问号
  const getCallName = (callerId: string, targetId: string) => {
    return props.callTable[callerId]?.[targetId] || '?'
  }
</script>

<style scoped>
  /* 模块底部间距 */
  .section-block {
    margin-bottom: 150px;
    scroll-margin-top: 100px;
  }

  /* 标题样式：包含下划线和淡入动画 */
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

  /* 标题文字初始状态为不可见 */
  .section-title span {
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity 1.5s ease-out,
      transform 1.5s ease-out;
  }

  /* 标题两侧的装饰线 */
  .section-title::before,
  .section-title::after {
    display: block;
    width: 0;
    height: 1px;
    content: '';
    background: linear-gradient(90deg, transparent, rgb(185 153 48 / 50%));
    transition: width 1.2s ease-out;
  }

  .section-title::after {
    background: linear-gradient(90deg, rgb(185 153 48 / 50%), transparent);
  }

  /* 当父级添加 visible 类时触发动画 */
  .section-title.visible span {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title.visible::before,
  .section-title.visible::after {
    width: 400px;
  }

  /* 底部注释文字样式 */
  .section-comment {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    font-size: 0.8rem;
    color: rgb(185 153 48 / 50%);
  }

  /* 表格横向滚动容器 */
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

  /* 固定首列宽度 */
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

    /* 初始状态：完全透明且稍微缩小 */
    opacity: 0;
    transform: scale(0.8);

    /* 过渡效果：透明度平滑变化，大小带弹簧效果 */
    transition:
      opacity 0.6s ease,
      transform 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28);
  }

  /* 加载完成状态：不透明且恢复原大小 */
  .avatar-square.loaded {
    opacity: 1;
    transform: scale(1);
  }

  /* 乐队分组颜色定义 */
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

  .bg-lilith {
    background-color: rgb(255 77 77 / 6%);
  }

  .bg-gorai {
    background-color: rgb(255 174 0 / 6%);
  }

  .highlight-col,
  .highlight-row {
    color: #fff !important;
    background-color: rgb(212 175 55 / 15%) !important;
  }

  .cross-highlight {
    background-color: rgb(255 255 255 / 3%);
  }

  /* 激活单元格样式 */
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

  @media (width <= 768px) {
    .section-title {
      gap: 10px;
      font-size: 1.8rem;
    }

    .section-title.visible::before,
    .section-title.visible::after {
      width: 30vw;
    }

    .section-title span {
      transform: translateY(-5px);
    }
  }
</style>
