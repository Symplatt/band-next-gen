<template>
  <section class="section-block">
    <h2 class="section-title"><span>亲缘谱</span></h2>
    <div class="genealogy-grid">
      <!-- 循环渲染每一个家庭单元 -->
      <div v-for="(family, index) in normalizedFamilyData" :key="index" class="family-unit">
        <!-- 父母层 -->
        <div class="parents-row">
          <div v-for="mom in family.mother" :key="mom.name" class="parent-node">
            <img :src="resolvePath(mom.avatar)" class="avatar-round" loading="lazy" />
            <span class="name">{{ mom.name }}</span>
          </div>
        </div>
        <!-- 连接线 -->
        <div class="connector" :class="{ 'dashed-line': family.type === 'adopt' }">
          <div class="connector-top"></div>
          <div class="connector-bottom"></div>
        </div>
        <!-- 子女层 -->
        <div class="child-row">
          <div v-for="child in family.child" :key="child.id" class="child-node">
            <img :src="resolvePath(child.avatar)" class="avatar-round" loading="lazy" />
            <span class="name">{{ child.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="section-comment">头像尚未导入，暂时以圆圈名字替代</div>
  </section>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    familyData: any[] // 家庭关系数据
  }>()

  const baseUrl = import.meta.env.BASE_URL

  const resolvePath = (path: string) => {
    if (!path) return ''
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseUrl}${cleanPath}`
  }

  // 规范化家庭数据，确保 child 始终为数组
  const normalizedFamilyData = computed(() => {
    return props.familyData.map((item: any) => ({
      ...item,
      child: Array.isArray(item.child) ? item.child : [item.child],
    }))
  })
</script>

<style scoped>
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

  .section-title span {
    opacity: 0;
    transform: translateY(-10px);
    transition:
      opacity 1.5s ease-out,
      transform 1.5s ease-out;
  }

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

  .section-title.visible span {
    opacity: 1;
    transform: translateY(0);
  }

  .section-title.visible::before,
  .section-title.visible::after {
    width: 400px;
  }

  .section-comment {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    font-size: 0.8rem;
    color: rgb(185 153 48 / 50%);
  }

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

  /* 家庭单元手动排序，形成错落感 */
  .family-unit:nth-child(1) {
    order: 1;
  }

  .family-unit:nth-child(2) {
    order: 5;
  }

  .family-unit:nth-child(3) {
    order: 2;
  }

  .family-unit:nth-child(4) {
    order: 4;
  }

  .family-unit:nth-child(5) {
    order: 3;
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

  /* 连接线容器 */
  .connector {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 40px;
  }

  /* 上半段竖线+横线 */
  .connector-top {
    width: 60%;
    height: 20px;
    border-bottom: 1px solid #d4af37;
  }

  /* 下半段横线（如果有多子女）+竖线 */
  .connector-bottom {
    position: relative;
    width: 60%;
    height: 20px;
    border-top: 1px solid #d4af37;
  }

  /* 下半段中心的竖线 */
  .connector-bottom::before {
    position: absolute;
    top: -20px;
    left: 50%;
    width: 1px;
    height: 20px;
    content: '';
    background: #d4af37;
  }

  /* 领养关系虚线样式 */
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

  /* 独生子女去除顶部横线 */
  .child-row:has(.child-node:only-child) + .connector .connector-bottom {
    border-top: none;
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

    .genealogy-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px 5px;
      justify-items: center;
      width: 100%;
      padding: 0;
    }

    .family-unit {
      order: unset !important;
      min-width: auto;
      transform: scale(0.9);
    }

    /* 手机端网格布局调整 */
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

    .name {
      font-size: 0.75rem;
      color: #ccc;
    }
  }
</style>
