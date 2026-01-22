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
            <img :src="resolvePath(mom.avatar)" class="avatar-round" loading="lazy" />
            <span class="name">{{ mom.name }}</span>
          </div>
        </div>

        <!-- 连接线结构，adopt类型显示虚线 -->
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

  // 定义组件接收的属性：家庭数据数组
  const props = defineProps<{
    familyData: any[]
  }>()

  // 获取路由实例用于页面跳转
  const router = useRouter()

  // 获取环境变量中的基础路径
  const baseUrl = import.meta.env.BASE_URL

  // 处理静态资源路径
  const resolvePath = (path: string) => {
    if (!path) return ''
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseUrl}${cleanPath}`
  }

  // 点击头像跳转至详情页的方法
  const goToDetail = (id: string) => {
    if (id) {
      router.push({
        name: 'char-detail',
        params: { id },
      })
    }
  }

  // 格式化家庭数据
  const normalizedFamilyData = computed(() => {
    return props.familyData.map((item: any) => ({
      ...item,
      child: Array.isArray(item.child) ? item.child : [item.child],
    }))
  })
</script>

<style scoped>
  /* 板块基础外边距设置 */
  .section-block {
    margin-bottom: 150px;
    scroll-margin-top: 100px;
  }

  /* 标题容器布局 */
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

  /* 标题文字动画 */
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

  /* 动画触发状态 */
  .section-title.visible span {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title.visible::before,
  .section-title.visible::after {
    width: 400px;
  }

  /* PC端网格布局：强制3列，显式定位防止错位 */
  .genealogy-grid {
    display: grid;
    grid-template-rows: auto auto; /* 两行高度自适应 */
    grid-template-columns: repeat(3, 1fr); /* 3等分列 */
    gap: 60px 20px; /* 增加行间距，保持列间距 */
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

  /* PC端显式定位：第一行 [丰川] [若叶] [高松] */

  /* 第1个：丰川 -> 第1行 第1列 */
  .family-unit:nth-child(1) {
    grid-row: 1;
    grid-column: 1;
  }

  /* 第3个：若叶 -> 第1行 第2列 */
  .family-unit:nth-child(3) {
    grid-row: 1;
    grid-column: 2;
  }

  /* 第4个：高松 -> 第1行 第3列 */
  .family-unit:nth-child(4) {
    grid-row: 1;
    grid-column: 3;
  }

  /* PC端显式定位：第二行 [八幡] [长崎] (居中错落布局) */

  /* 第2个：八幡 -> 第2行，跨越1-2列居中 */
  .family-unit:nth-child(2) {
    grid-row: 2;
    grid-column: 1 / 3; /* 占据第1到第3条网格线之间(即前两列) */
    justify-self: center; /* 在该区域内居中 */

    /* 视觉上位于 丰川(1) 和 若叶(3) 中间 */
  }

  /* 第5个：长崎 -> 第2行，跨越2-3列居中 */
  .family-unit:nth-child(5) {
    grid-row: 2;
    grid-column: 2 / 4; /* 占据第2到第4条网格线之间(即后两列) */
    justify-self: center;

    /* 视觉上位于 若叶(3) 和 高松(4) 中间 */
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

  /* 可交互节点样式 */
  .interactive-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  /* 节点悬停放大效果 */
  .interactive-node:hover {
    transform: translateY(-5px) scale(1.1);
  }

  /* 节点悬停时头像发光 */
  .interactive-node:hover .avatar-round {
    border-color: #ffd700;
    box-shadow: 0 0 15px #d4af37;
  }

  /* 节点悬停时名字高亮 */
  .interactive-node:hover .name {
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 5px #d4af37;
  }

  /* 圆形头像基础样式 */
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

  /* 名字基础样式 */
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

  /* 连接线上半部分横竖线 */
  .connector-top {
    width: 60%;
    height: 20px;
    border-bottom: 1px solid #d4af37;
  }

  /* 连接线下半部分横竖线 */
  .connector-bottom {
    position: relative;
    width: 60%;
    height: 20px;
    border-top: 1px solid #d4af37;
  }

  /* 连接线垂直部分伪元素 */
  .connector-bottom::before {
    position: absolute;
    top: -20px;
    left: 50%;
    width: 1px;
    height: 20px;
    content: '';
    background: #d4af37;
  }

  /* 虚线样式适配 */
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

  /* 独生子女去除顶部多余横线 */
  .child-row:has(.child-node:only-child) + .connector .connector-bottom {
    border-top: none;
  }

  /* 移动端适配 */
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
      display: grid;
      grid-template-rows: auto auto auto; /* 三行 */
      grid-template-columns: 1fr 1fr; /* 两列布局 */
      gap: 30px 5px;
      justify-items: center;
      width: 100%;
      padding: 0;
    }

    /* 重置样式，防止 PC 端样式干扰 */
    .family-unit {
      grid-row: auto !important;
      grid-column: auto !important;
      justify-self: center !important;
      order: unset !important;
      min-width: auto;
      transform: scale(0.9);
    }

    /* 第一行：丰川(1) 左，高松(4) 右 */
    .family-unit:nth-child(1) {
      grid-area: 1 / 1 / 2 / 2;
    }

    .family-unit:nth-child(4) {
      grid-area: 1 / 2 / 2 / 3;
    }

    /* 第二行：若叶(3) 独占一行居中 */
    .family-unit:nth-child(3) {
      grid-area: 2 / 1 / 3 / 3;
      justify-self: center;
    }

    /* 第三行：八幡(2) 左，长崎(5) 右 */
    .family-unit:nth-child(2) {
      grid-area: 3 / 1 / 4 / 2;
    }

    .family-unit:nth-child(5) {
      grid-area: 3 / 2 / 4 / 3;
    }

    .interactive-node {
      width: 70px;
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
