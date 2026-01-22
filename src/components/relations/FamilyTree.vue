<template>
  <!-- 亲缘谱板块容器 -->
  <section class="section-block">
    <!-- 标题区域 -->
    <h2 class="section-title"><span>亲缘谱</span></h2>

    <!-- 族谱网格布局容器 -->
    <div class="genealogy-grid">
      <!-- 循环渲染每一个家庭单元 -->
      <div v-for="(family, index) in normalizedFamilyData" :key="index" class="family-unit">
        <!-- 父母层容器 -->
        <div class="parents-row">
          <div
            v-for="mom in family.mother"
            :key="mom.name"
            class="parent-node interactive-node"
            @click="goToDetail(mom.id)"
          >
            <!-- 头像图片 -->
            <img :src="resolvePath(mom.avatar)" class="avatar-round" loading="lazy" />
            <!-- 成员名字 -->
            <span class="name">{{ mom.name }}</span>
          </div>
        </div>

        <!-- 连接线结构 -->
        <div class="connector" :class="{ 'dashed-line': family.type === 'adopt' }">
          <div class="connector-top"></div>
          <div class="connector-bottom"></div>
        </div>

        <!-- 子女层容器 -->
        <div class="child-row">
          <div
            v-for="child in family.child"
            :key="child.id"
            class="child-node interactive-node"
            @click="goToDetail(child.id)"
          >
            <img :src="resolvePath(child.avatar)" class="avatar-round" loading="lazy" />
            <span class="name">{{ child.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  // 定义组件接收的属性
  const props = defineProps<{
    familyData: any[]
  }>()

  // 获取路由实例
  const router = useRouter()

  // 获取基础路径
  const baseUrl = import.meta.env.BASE_URL

  // 处理路径
  const resolvePath = (path: string) => {
    if (!path) return ''
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseUrl}${cleanPath}`
  }

  // 跳转详情页
  const goToDetail = (id: string) => {
    if (id) {
      router.push({
        name: 'char-detail',
        params: { id },
      })
    }
  }

  // 格式化数据
  const normalizedFamilyData = computed(() => {
    return props.familyData.map((item: any) => ({
      ...item,
      child: Array.isArray(item.child) ? item.child : [item.child],
    }))
  })
</script>

<style scoped>
  /* 板块基础外边距 */
  .section-block {
    margin-bottom: 150px;
    scroll-margin-top: 100px;
  }

  /* 标题样式 */
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

  /* 标题动画初始状态 */
  .section-title span {
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity 1.5s ease-out,
      transform 1.5s ease-out;
  }

  /* 标题装饰线 */
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

  /* 标题可见状态 */
  .section-title.visible span {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title.visible::before,
  .section-title.visible::after {
    width: 400px;
  }

  /* PC端网格布局：强制3列 */
  .genealogy-grid {
    display: grid;
    grid-template-rows: auto auto; /* 两行自适应高度 */
    grid-template-columns: repeat(3, 1fr);
    gap: 60px 0; /* 行间距60px，列间距为0(靠对齐方式控制) */
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* 家庭单元基础样式 */
  .family-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
  }

  /* === PC端定位：第一行 === */

  /* 丰川(1) -> 第1列 */
  .family-unit:nth-child(1) {
    grid-row: 1;
    grid-column: 1;
  }

  /* 若叶(3) -> 第2列 */
  .family-unit:nth-child(3) {
    grid-row: 1;
    grid-column: 2;
  }

  /* 长崎(5) -> 第3列 (与高松互换位置) */
  .family-unit:nth-child(5) {
    grid-row: 1;
    grid-column: 3;
  }

  /* === PC端定位：第二行 (彻底解决重叠) === */

  /* 八幡(2) -> 放在第1列，但是靠右对齐 */
  .family-unit:nth-child(2) {
    grid-row: 2;
    grid-column: 1;
    justify-self: end; /* 靠右对齐，靠近中间 */
    margin-right: -100px; /* 向右微调，伸入第2列的空白区 */
  }

  /* 高松(4) -> 放在第3列，但是靠左对齐 (与长崎互换位置) */
  .family-unit:nth-child(4) {
    grid-row: 2;
    grid-column: 3;
    justify-self: start; /* 靠左对齐，靠近中间 */
    margin-left: -100px; /* 向左微调，伸入第2列的空白区 */
  }

  /* 父母行与子女行布局 */
  .parents-row,
  .child-row {
    position: relative;
    z-index: 2;
    display: flex;
    gap: 40px;
    justify-content: center;
  }

  /* 交互节点样式 */
  .interactive-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  /* 悬停效果 */
  .interactive-node:hover {
    transform: translateY(-5px) scale(1.1);
  }

  .interactive-node:hover .avatar-round {
    border-color: #ffd700;
    box-shadow: 0 0 15px #d4af37;
  }

  .interactive-node:hover .name {
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 5px #d4af37;
  }

  /* 头像样式 */
  .avatar-round {
    width: 60px;
    height: 60px;
    margin-bottom: 8px;
    object-fit: cover;
    background: #000;
    border: 2px solid #d4af37;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  /* 名字样式 */
  .name {
    font-size: 0.85rem;
    color: #ccc;
    transition: color 0.3s ease;
  }

  /* 连接线容器 */
  .connector {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 40px;
    opacity: 0.6;
  }

  /* 连接线绘制 */
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

  /* 虚线样式 */
  .dashed-line .connector-top {
    border: none;
    border-bottom: 1px dashed #d4af37;
  }

  .dashed-line .connector-bottom {
    border: none;
    border-top: 1px dashed #d4af37;
  }

  .dashed-line .connector-bottom::before {
    width: 0;
    background: none;
    border-left: 1px dashed #d4af37;
  }

  /* 独生子女特殊处理 */
  .child-row:has(.child-node:only-child) + .connector .connector-bottom {
    border-top: none;
  }

  /* --- 移动端适配 --- */
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

    /* 手机端 Grid 布局配置 */
    .genealogy-grid {
      box-sizing: border-box;
      display: grid;
      grid-template-rows: auto auto auto; /* 三行 */
      grid-template-columns: 1fr 1fr; /* 两列 */
      gap: 30px 10px;
      justify-items: center;
      width: 100%;
      padding: 0;
    }

    /* 重置样式 */
    .family-unit {
      grid-row: auto !important; /* 清除PC端行定义 */
      grid-column: auto !important; /* 清除PC端列定义 */
      justify-self: center !important; /* 清除PC端对齐 */
      order: unset !important;
      width: 100%;
      min-width: 0;
      margin: 0 !important; /* 清除PC端边距 */
      transform: scale(0.9);
    }

    /* === 手机端强制定位 === */

    /* 第一行左：丰川(1) */
    .family-unit:nth-child(1) {
      grid-row: 1;
      grid-column: 1;
    }

    /* 第一行右：高松(4) */
    .family-unit:nth-child(4) {
      grid-row: 1;
      grid-column: 2;
    }

    /* 第二行全宽：若叶(3) */
    .family-unit:nth-child(3) {
      grid-row: 2;
      grid-column: 1 / 3; /* 跨两列 */
      justify-self: center;
    }

    /* 第三行左：八幡(2) */
    .family-unit:nth-child(2) {
      grid-row: 3;
      grid-column: 2;
    }

    /* 第三行左：长崎(右) */
    .family-unit:nth-child(5) {
      grid-row: 3;
      grid-column: 1;
    }

    .interactive-node {
      width: 60px;
    }

    .avatar-round {
      width: 50px;
      height: 50px;
    }

    .name {
      font-size: 0.75rem;
    }
  }
</style>
