<template>
  <div class="detail-view">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack"><span class="arrow">←</span> BACK</button>

    <!-- 如果找不到角色（比如乱输URL），显示提示 -->
    <div v-if="!member" class="not-found">
      <h2>Character Not Found</h2>
      <p>未找到该角色的档案信息。</p>
    </div>

    <!-- 角色详情容器 -->
    <div v-else class="detail-container">
      <!-- === 左侧视觉区 === -->
      <div class="visual-column">
        <!-- 1. 角色大立绘 -->
        <div class="stand-image-box">
          <img
            :src="member.image || 'https://placehold.co/600x900/1a1a1a/d4af37?text=Character+Image'"
            class="stand-image"
          />
          <!-- 专属代号 -->
          <div v-if="member.codeName" class="code-overlay">{{ member.codeName }}</div>
        </div>

        <!-- 2. 学生证 (比例 7:4) -->
        <div class="student-card-box">
          <div class="card-label">STUDENT ID</div>
          <div class="card-aspect-ratio">
            <img
              :src="member.studentCard || 'https://placehold.co/350x200/222/555?text=Student+Card'"
              class="student-card-img"
            />
          </div>
        </div>
      </div>

      <!-- === 右侧信息区 === -->
      <div class="info-column">
        <!-- 顶部：乐队 Logo (比例 2:1) + 名字 -->
        <div class="info-header">
          <div class="header-left">
            <h1 class="char-name">{{ member.name }}</h1>
            <div class="char-romaji">{{ member.romaji }}</div>
          </div>
          <!-- 乐队 Logo -->
          <div class="band-logo-box">
            <img
              :src="groupLogo || 'https://placehold.co/200x100/transparent/d4af37?text=LOGO'"
              class="band-logo-img"
            />
          </div>
        </div>

        <div class="divider"></div>
        <span style="font-size: 12px; color: #999; text-align: center"
          >身高、生日、MBTI等之后再看，当前仅展示效果</span
        >
        <!-- 关键数据网格 -->
        <div class="data-grid">
          <div class="data-item">
            <span class="label">POSITION</span>
            <span class="value highlight">{{ member.position }}</span>
          </div>
          <div class="data-item">
            <span class="label">SCHOOL</span>
            <span class="value">{{ member.school }}</span>
          </div>
          <div class="data-item">
            <span class="label">BIRTHDAY</span>
            <span class="value">{{ member.profile.birthday }}</span>
          </div>
          <div class="data-item">
            <span class="label">HEIGHT</span>
            <span class="value">{{ member.profile.height }}</span>
          </div>
          <div class="data-item" v-if="member.profile.mbti">
            <span class="label">MBTI</span>
            <span class="value">{{ member.profile.mbti }}</span>
          </div>
        </div>

        <!-- 个人简介 (长文本) -->
        <div class="intro-section">
          <h3 class="section-title">PROFILE</h3>
          <p class="long-intro">{{ member.profile.longIntro }}</p>
          <!-- 特殊引注 -->
          <p v-if="member.specialNote" class="special-note">* {{ member.specialNote }}</p>
        </div>

        <!-- 亲缘关系 (点击跳转) -->
        <div class="mothers-section" v-if="member.profile.mothers.length > 0">
          <h3 class="section-title">RELATIONSHIPS</h3>
          <div class="mothers-list">
            <div
              v-for="mom in member.profile.mothers"
              :key="mom.id"
              class="mother-tag"
              :class="{ clickable: mom.id }"
              @click="goToMother(mom.id)"
            >
              <span class="role">Guardian</span>
              <span class="name">{{ mom.name }}</span>
              <span v-if="mom.id" class="link-arrow">↗</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import rawData from '@/assets/data/characters.json'

  // 1. 获取路由参数
  // 即使 props 没传过来，useRoute().params.id 也是保底方案
  const route = useRoute()
  const router = useRouter()

  // 2. 类型定义 (保持和 CharactersView 一致)
  interface Member {
    id: string
    route: string
    name: string
    romaji: string
    codeName?: string
    position: string
    school: string
    image: string
    studentCard: string
    specialNote?: string
    profile: {
      height: string
      birthday: string
      mbti?: string
      longIntro: string
      mothers: { name: string; id: string }[]
    }
  }

  // 3. 查找当前角色逻辑
  const member = computed(() => {
    // 当前 URL 里的 id (例如 'tomori')
    const currentId = route.params.id as string

    // 遍历 JSON 里的所有分组，找到 route 匹配的那个成员
    for (const group of rawData) {
      const found = group.members.find((m: any) => m.route === currentId)
      if (found) return found as Member
    }
    return null
  })

  // 4. 获取当前角色的乐队 Logo
  const groupLogo = computed(() => {
    const currentId = route.params.id as string
    const group = rawData.find((g) => g.members.some((m: any) => m.route === currentId))
    return group ? group.bandLogo : ''
  })

  // 5. 跳转逻辑
  const goBack = () => router.push('/characters')

  const goToMother = (motherId: string) => {
    if (!motherId) return // 如果是“待定”这种没ID的，不跳转

    // 根据 motherId (例如 mg-01) 找到对应的 route (例如 tomori)
    let targetRoute = ''
    for (const group of rawData) {
      const found = group.members.find((m: any) => m.id === motherId)
      if (found) {
        targetRoute = found.route
        break
      }
    }

    if (targetRoute) {
      router.push({ name: 'char-detail', params: { id: targetRoute } })
    }
  }
</script>

<style scoped>
  .detail-view {
    position: relative;
    min-height: 100vh;
    padding: 80px 40px;
    color: #fff;
    background-color: #0b0c10;
  }

  /* 返回按钮 */
  .back-btn {
    position: fixed;
    top: 100px; /* 避开 header */
    left: 40px;
    z-index: 50;
    padding: 8px 16px;
    font-family: 'Share Tech Mono', monospace;
    color: #888;
    cursor: pointer;
    background: none;
    border: 1px solid rgb(255 255 255 / 20%);
    transition: all 0.3s;
  }

  .back-btn:hover {
    padding-left: 10px; /* 简单的位移动画 */
    color: #d4af37;
    border-color: #d4af37;
  }

  /* 布局容器 */
  .detail-container {
    display: flex;
    gap: 60px;
    align-items: flex-start;
    max-width: 1200px;
    margin: 40px auto 0;
  }

  /* === 左侧视觉区 === */
  .visual-column {
    display: flex;
    flex: 5; /* 占 5/12 */
    flex-direction: column;
    gap: 30px;
  }

  .stand-image-box {
    position: relative;
    width: 100%;
    overflow: hidden;
    background: radial-gradient(circle at center, #1a1a1a 0%, #000 100%);
    border: 1px solid rgb(255 255 255 / 5%);
    border-radius: 4px;
  }

  .stand-image {
    display: block;
    width: 100%;
    height: auto;
  }

  /* 代号浮层 */
  .code-overlay {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-family: 'Pinyon Script', cursive; /* 之前让你加的手写体 */
    font-size: 3rem;
    color: rgb(212 175 55 / 30%);
    pointer-events: none;
  }

  /* 学生证区域 */
  .student-card-box {
    width: 100%;
  }

  .card-label {
    margin-bottom: 8px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    color: #555;
    letter-spacing: 2px;
  }

  /* 核心：7:4 比例容器 */
  .card-aspect-ratio {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    aspect-ratio: 7 / 4; /* CSS原生比例控制 */
    overflow: hidden;
    background: #111;
    border: 1px solid #333;
    border-radius: 8px;
  }

  .student-card-img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* 保证卡片完整显示，不裁切 */
  }

  /* === 右侧信息区 === */
  .info-column {
    flex: 7; /* 占 7/12 */
    padding-top: 20px;
  }

  .info-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .char-name {
    margin: 0;
    font-family: 'Noto Serif SC', serif;
    font-size: 3rem;
    line-height: 1.2;
    color: #fff;
  }

  .char-romaji {
    font-family: 'Cinzel Decorative', cursive;
    font-size: 1.2rem;
    color: #d4af37;
    letter-spacing: 2px;
  }

  /* 核心：2:1 比例 Logo */
  .band-logo-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 160px; /* 给定一个基准宽度 */
    aspect-ratio: 2 / 1;
  }

  .band-logo-img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 5px rgb(212 175 55 / 50%));
  }

  .divider {
    width: 100%;
    height: 1px;
    margin: 20px 0 30px;
    background: linear-gradient(90deg, #d4af37, transparent);
  }

  /* 数据网格 */
  .data-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 两列 */
    gap: 20px 40px;
    margin-bottom: 40px;
  }

  .data-item {
    display: flex;
    flex-direction: column;
  }

  .data-item .label {
    margin-bottom: 4px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    color: #666;
  }

  .data-item .value {
    padding-bottom: 4px;
    font-size: 1.1rem;
    color: #ccc;
    border-bottom: 1px solid rgb(255 255 255 / 10%);
  }

  .data-item .highlight {
    font-weight: bold;
    color: #ff2e63;
  }

  /* 简介 */
  .section-title {
    padding-left: 10px;
    margin-bottom: 15px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1rem;
    color: #d4af37;
    border-left: 3px solid #d4af37;
  }

  .long-intro {
    margin-bottom: 10px;
    line-height: 1.8;
    color: #aaa;
    text-align: justify;
    white-space: pre-wrap;
  }

  .special-note {
    margin-top: 10px;
    font-size: 0.85rem;
    font-style: italic;
    color: #666;
  }

  /* 亲缘关系 */
  .mothers-section {
    padding-top: 30px;
    margin-top: 40px;
    border-top: 1px dashed rgb(255 255 255 / 10%);
  }

  .mothers-list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  .mother-tag {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 8px 16px;
    background: rgb(255 255 255 / 5%);
    border: 1px solid transparent;
    border-radius: 4px;
    transition: all 0.3s;
  }

  .mother-tag.clickable {
    cursor: pointer;
  }

  .mother-tag.clickable:hover {
    background: rgb(212 175 55 / 10%);
    border-color: #d4af37;
  }

  .mother-tag .role {
    font-size: 0.7rem;
    color: #555;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .mother-tag .name {
    font-weight: bold;
    color: #fff;
  }

  .link-arrow {
    font-size: 0.9rem;
    color: #d4af37;
  }

  /* 手机适配 */
  @media (width <= 900px) {
    .detail-container {
      flex-direction: column;
    }

    .back-btn {
      position: absolute;
      top: 20px;
      left: 20px;
    }

    .visual-column,
    .info-column {
      flex: none;
      width: 100%;
    }

    .data-grid {
      grid-template-columns: 1fr; /* 手机上一行一个数据 */
    }
  }
</style>
