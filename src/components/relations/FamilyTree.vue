<template>
  <!-- 亲缘谱板块容器 -->
  <section class="section-block">
    <!-- 族谱网格布局容器 -->
    <div class="genealogy-grid">
      <!-- 循环渲染每一个家庭单元 -->
      <div
        v-for="(family, index) in normalizedFamilyData"
        :key="index"
        class="family-unit"
        :class="{ 'special-unit': isWakaba(family) }"
      >
        <!-- 双亲层容器 -->
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

  // 如果是若叶家
  const isWakaba = (family: any) => {
    const judgeName = ['若叶睦', '祐天寺若麦']
    return family.mother[0].name in judgeName
  }

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

  /*
  格式化数据：
  如果child不是对象数组，只有单个对象，就转成对象数组
  其实这段代码不写也行，我json写可好了
  */
  const normalizedFamilyData = computed(() => {
    return props.familyData.map((item: any) => ({
      ...item, // 修改child，mother和type下面没写，就是原封不动的意思
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

  /* 网格布局：强制3列 */
  .genealogy-grid {
    display: grid;
    grid-template-rows: auto auto; /* 两行自适应高度 */
    grid-template-columns: repeat(3, auto);
    gap: 80px 100px;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* 家庭单元基础样式 */
  .family-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
    width: fit-content;
  }

  .family-unit:nth-child(4) {
    grid-row: 2;
    grid-column: 1;
    justify-self: end; /* 靠右对齐，靠近中间 */
    margin-right: -10rem;
  }

  .family-unit:nth-child(5) {
    grid-row: 2;
    grid-column: 3;
    justify-self: start; /* 靠左对齐，靠近中间 */
    margin-left: -10rem;
  }

  /* 双亲行与子女行布局 */
  .parents-row,
  .child-row {
    position: relative;
    z-index: 2;
    display: flex;
    gap: 60px;
    justify-content: center;
  }

  /* 交互节点（连名字带头像）样式 */
  .interactive-node {
    display: flex;
    flex-direction: column;
    align-items: center;

    /* width: 80px; */
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

  /* 悬停效果 */
  .interactive-node:hover {
    transform: translateY(-5px) scale(1.1);
  }

  /* 悬停效果-头像 */
  .interactive-node:hover .avatar-round {
    border-color: #ffd700;
    box-shadow: 0 0 15px #d4af37;
  }

  /* 悬停效果-名字 */
  .interactive-node:hover .name {
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 5px #d4af37;
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
    width: 100%;
    height: 20px;
    border-bottom: 1px solid #d4af37;
  }

  .connector-bottom {
    position: relative;
    width: 100%;
    height: 20px;
    border-top: 1px solid #d4af37;
  }

  /* 居中小竖线 */
  .connector-bottom::before {
    position: absolute;
    top: -20px; /* 上浮的距离和小竖线的高度相同 */
    left: 50%; /* 从左边平移50%，因此小竖线居中 */
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
    /* 手机端 Grid 布局配置 */
    .genealogy-grid {
      grid-template-rows: repeat(3, auto);
      grid-template-columns: repeat(2, auto); /* 两列 */
      gap: 3.5rem 3rem;
    }

    /* 重置样式 */
    .family-unit {
      width: 100%;
      min-width: 0;
      transform: scale(0.9);
    }

    .family-unit:nth-child(3) {
      grid-row: 1;
      grid-column: 2;
    }

    /* 第二行全宽：三个小若叶一个gird格子塞不下 */
    .family-unit:nth-child(2) {
      grid-row: 2;
      grid-column: 1 / span 2;
      justify-self: center;
      width: 15.5rem; /* 宽度=天穗梦3人头像的宽度+2个gap */
    }

    .family-unit:nth-child(4) {
      grid-row: 3;
      grid-column: 1;
      margin-right: 0; /* 取消电脑端的偏移效果 */
    }

    .family-unit:nth-child(5) {
      grid-row: 3;
      grid-column: 2;
      margin-left: 0; /* 取消电脑端的偏移效果 */
    }

    /* 双亲行与子女行布局 */
    .parents-row,
    .child-row {
      position: relative;
      z-index: 2;
      display: flex;
      gap: 2.5rem;
      justify-content: center;
    }

    .avatar-round {
      width: 3.5rem;
      height: 3.5rem;
    }

    .name {
      font-size: 0.75rem;
    }
  }
</style>
