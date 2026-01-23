<!-- src/views/CharacterDetail.vue -->
<!-- zgit -->

<template>
  <div class="char-detail-view" v-if="member">
    <!-- 背景层 -->
    <div
      class="bg-layer"
      :style="{ backgroundImage: `url(${resolvePath(member.image[0] || '')})` }"
    ></div>
    <div class="bg-overlay"></div>

    <!-- 电脑端 Back 按钮 -->
    <button class="back-btn pc-back-btn" @click="goBack"><span class="arrow">←</span> BACK</button>

    <!-- 结构容器 -->
    <div class="page-container">
      <!-- 手机端 Back 按钮 -->
      <div class="mobile-back-wrapper">
        <button class="back-btn mobile-back-btn" @click="goBack">
          <span class="arrow">←</span> BACK
        </button>
      </div>

      <div class="content-wrapper">
        <!-- 左侧：立绘 + 学生证 -->
        <div class="left-column">
          <div class="tachie-container">
            <!-- 立绘 -->
            <img
              :src="resolvePath(member.image[0] || '')"
              class="main-tachie"
              @error="onImageError"
              alt="Character Tachie"
            />
            <div v-if="member.codeName" class="codename-vertical">{{ member.codeName }}</div>
          </div>

          <!-- 学生证区域 -->
          <div class="student-card-section" v-if="hasStudentCards">
            <h3 class="section-title-normal">STUDENT ID CARD</h3>
            <div class="cards-gallery">
              <div
                v-for="(cardPath, index) in member.studentCard"
                :key="index"
                class="student-card-wrapper"
              >
                <img
                  :src="resolvePath(cardPath)"
                  class="student-card-img"
                  @error="onCardError"
                  loading="lazy"
                  alt="Student Card"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：详细信息 -->
        <div class="right-column">
          <!-- 头部区域 -->
          <div class="header-area">
            <div class="header-text-group">
              <div class="school-badge">{{ member.school }} / {{ member.position }}</div>
              <h1 class="char-name-large">{{ member.name }}</h1>
              <h2 class="char-romaji-large">{{ member.romaji }}</h2>
            </div>
            <!-- Logo -->
            <div class="band-logo-box" v-if="currentGroupLogo">
              <img :src="resolvePath(currentGroupLogo)" class="band-logo-img" alt="Band Logo" />
            </div>
          </div>

          <!-- 基础档案 -->
          <div class="profile-grid">
            <div class="profile-item">
              <span class="label">HEIGHT</span>
              <span class="value">{{ member.profile.height }}</span>
            </div>
            <div class="profile-item">
              <span class="label">BIRTHDAY</span>
              <span class="value">{{ member.profile.birthday }}</span>
            </div>
            <div class="profile-item">
              <span class="label">CONSTELLATION</span>
              <span class="value">{{ member.profile.constellation }}</span>
            </div>
            <div class="profile-item" v-if="member.profile.mbti">
              <span class="label">MBTI</span>
              <span class="value">{{ member.profile.mbti }}</span>
            </div>
          </div>

          <div class="divider-line"></div>

          <!-- 介绍文本 -->
          <div class="intro-section">
            <div
              v-for="(segment, idx) in member.profile.longIntro"
              :key="idx"
              class="intro-segment"
            >
              <h3 class="intro-title">{{ segment.introTitle }}</h3>
              <p v-for="(para, pIdx) in segment.content" :key="pIdx" class="intro-text">
                {{ para }}
              </p>
            </div>
          </div>

          <!-- 家庭关系 -->
          <div class="family-section" v-if="hasFamily">
            <h3 class="section-title-normal">BLOOD RELATIONS</h3>
            <div class="family-cards-grid">
              <template v-if="member.family?.mothers">
                <div
                  v-for="m in member.family?.mothers"
                  :key="'mom-' + m.id"
                  class="rel-card"
                  @click="goToRel(m.id)"
                >
                  <div class="rel-label">GUARDIAN</div>
                  <div class="rel-name">{{ m.name }}</div>
                  <div class="rel-arrow"></div>
                </div>
              </template>
              <template v-if="member.family?.sisters">
                <div
                  v-for="s in member.family?.sisters"
                  :key="'sis-' + s.id"
                  class="rel-card"
                  @click="goToRel(s.id)"
                >
                  <div class="rel-label">SISTER</div>
                  <div class="rel-name">{{ s.name }}</div>
                  <div class="rel-arrow"></div>
                </div>
              </template>
              <template v-if="member.family?.kids">
                <div
                  v-for="k in member.family?.kids"
                  :key="'kid-' + k.id"
                  class="rel-card"
                  @click="goToRel(k.id)"
                >
                  <div class="rel-label">KID</div>
                  <div class="rel-name">{{ k.name }}</div>
                  <div class="rel-arrow"></div>
                </div>
              </template>
            </div>
          </div>

          <!-- 特殊注释 -->
          <div class="special-note-box" v-if="member.specialNote">
            <span class="note-symbol">✱</span> {{ member.specialNote }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="not-found">
    <h2>Character Not Found</h2>
    <button @click="goBack">Return</button>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import rawData from '@/assets/data/characters.json'

  interface IntroSegment {
    introTitle: string
    content: string[]
  }
  interface Profile {
    height: string
    birthday: string
    constellation: string
    mbti?: string
    longIntro: IntroSegment[]
  }
  interface SimpleRel {
    name: string
    id: string
  }
  interface Family {
    mothers?: SimpleRel[]
    sisters?: SimpleRel[]
    kids?: SimpleRel[]
  }
  interface Member {
    id: string
    route: string
    name: string
    romaji: string
    codeName?: string
    position: string
    school: string
    image: string[]
    studentCard?: string[]
    specialNote?: string
    profile: Profile
    family?: Family
  }
  interface Group {
    groupKey: string
    bandLogo?: string
    members: Member[]
  }

  const route = useRoute()
  const router = useRouter()
  const baseUrl = import.meta.env.BASE_URL

  const member = computed(() => {
    const targetId = route.params.id as string
    for (const group of rawData as Group[]) {
      const found = group.members.find((m) => m.route === targetId || m.id === targetId)
      if (found) return found
    }
    return null
  })

  const currentGroupLogo = computed(() => {
    if (!member.value) return ''
    const group = (rawData as Group[]).find((g) => g.members.some((m) => m.id === member.value?.id))
    return group?.bandLogo || ''
  })

  const hasStudentCards = computed(() => {
    return member.value?.studentCard && member.value.studentCard.length > 0
  })

  const hasFamily = computed(() => {
    const f = member.value?.family
    return f && (f.mothers?.length || f.sisters?.length || f.kids?.length)
  })

  const resolvePath = (path: string) => {
    if (!path) return ''
    if (path.startsWith('http')) return path
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseUrl}${cleanPath}`
  }

  const onImageError = (e: Event) => {
    const img = e.target as HTMLImageElement
    const defaultPath = `${baseUrl}images/stand-image/default-stand-image.png`
    if (img.src !== window.location.origin + defaultPath) {
      img.src = defaultPath
    }
  }

  const onCardError = (e: Event) => {
    const img = e.target as HTMLImageElement
    img.src = `${baseUrl}images/card/default-card.png`
  }

  const goBack = () => router.back()

  const goToRel = (id: string) => {
    for (const group of rawData as Group[]) {
      const found = group.members.find((m) => m.id === id)
      if (found) {
        router.push({ name: 'char-detail', params: { id: found.route } })
        return
      }
    }
  }

  watch(
    () => route.params.id,
    () => {
      window.scrollTo(0, 0)
    },
  )
</script>

<style scoped>
  /* 业务容器：增加底部Padding，隔开Footer */
  .char-detail-view {
    position: relative;
    min-height: 100vh;
    padding-top: 80px;
    padding-bottom: 150px; /* 1. 增加底部间距 */
    color: #fff;
    background-color: #0b0c10;
  }

  /* 结构容器 */
  .page-container {
    box-sizing: border-box;
    width: 100%;
    max-width: 1400px;
    padding: 0 40px;
    margin: 0 auto;
  }

  @media (width >= 768px) {
    .page-container {
      box-sizing: border-box;
      width: 100vw;
      padding: 0 40px;
    }
  }

  /* 背景层：z-index -1 */
  .bg-layer {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-position: center top;
    background-size: cover;
    filter: blur(20px) opacity(0.3);
  }

  .bg-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: linear-gradient(
      to right,
      rgb(11 12 16 / 95%) 0%,
      rgb(11 12 16 / 85%) 50%,
      rgb(11 12 16 / 60%) 100%
    );
  }

  /* Back 按钮 */
  .back-btn {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    padding: 6px 16px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1rem;
    color: #d4af37;
    cursor: pointer;
    background: rgb(0 0 0 / 40%);
    border: 1px solid rgb(212 175 55 / 30%);
    transition: all 0.3s ease;
  }

  .back-btn:hover {
    color: #000;
    background: #d4af37;
  }

  .pc-back-btn {
    position: absolute;
    top: 90px;
    left: 40px;
    z-index: 100;
  }

  .mobile-back-wrapper {
    display: none;
  }

  .content-wrapper {
    position: relative;
    z-index: 10;
    display: grid;
    grid-template-columns: 45% 55%;
    gap: 40px;
    align-items: start;
    margin-top: 20px;
  }

  /* --- 左侧区域 --- */
  .left-column {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .tachie-container {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .main-tachie {
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 5px;
    filter: drop-shadow(0 0 15px rgb(0 0 0 / 60%));
  }

  .codename-vertical {
    position: absolute;
    bottom: 0;
    left: 0;
    font-family: 'Cinzel Decorative', cursive;
    font-size: 3.5rem;
    color: rgb(255 255 255 / 10%);
    pointer-events: none;
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }

  /* --- 学生证区域 --- */
  .student-card-section {
    width: 100%;
  }

  .section-title-normal {
    margin-bottom: 15px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.1rem;
    color: #d4af37;
    border-bottom: 1px solid rgb(212 175 55 / 30%);
  }

  .cards-gallery {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .student-card-wrapper:nth-child(odd) {
    justify-self: start;
  }

  .student-card-wrapper:nth-child(even) {
    justify-self: end;
  }

  .student-card-img {
    width: 100%;
    max-width: 280px;
    height: auto;
    border: 1px solid rgb(255 255 255 / 20%);
    border-radius: 4px;
    box-shadow: 0 4px 10px rgb(0 0 0 / 50%);
    transition: transform 0.3s ease;
  }

  .student-card-img:hover {
    transform: scale(1.05);
  }

  /* --- 右侧区域 --- */
  .right-column {
    padding-top: 0;
  }

  .header-area {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .header-text-group {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .school-badge {
    display: inline-block;
    align-self: flex-start;
    padding: 4px 10px;
    margin-bottom: 10px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9rem;
    font-weight: bold;
    color: rgb(255 215 0 / 80%);
    background: rgb(255 255 255 / 10%);
    border: 1px solid rgb(255 215 0);
    border-radius: 2px;
  }

  .char-name-large {
    margin: 0;
    font-family: 'Noto Serif SC', serif;
    font-size: 3.2rem;
    line-height: 1.1;
    text-shadow: 0 0 10px rgb(212 175 55 / 30%);
  }

  .char-romaji-large {
    margin: 5px 0 0;
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 400;
    color: rgb(255 255 255 / 50%);
  }

  /* Logo */
  .band-logo-box {
    display: flex;
    align-items: flex-end;
    max-width: 240px;
    max-height: 8rem;
    margin-left: 20px;
  }

  .band-logo-img {
    width: auto;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    object-position: right bottom;
    opacity: 0.9;
    filter: drop-shadow(0 0 5px rgb(255 255 255 / 20%));
  }

  /* 档案 Grid */
  .profile-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
  }

  .profile-item {
    padding: 8px 12px;
    background: rgb(255 255 255 / 5%);
    border-left: 3px solid #d4af37;
  }

  .profile-item .label {
    display: block;
    margin-bottom: 4px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    color: #aaa;
  }

  .profile-item .value {
    font-size: 1rem;
    font-weight: 500;
  }

  .divider-line {
    width: 100%;
    height: 1px;
    margin: 30px 0;
    background: linear-gradient(to right, #d4af37, transparent);
    opacity: 0.3;
  }

  .intro-title {
    margin-bottom: 10px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.1rem;
    color: #d4af37;
  }

  .intro-text {
    margin-bottom: 15px;
    font-size: 0.95rem;
    line-height: 1.7;
    color: #ccc;
    text-align: justify;
  }

  .family-section {
    margin-top: 60px;
  }

  .family-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 15px;
  }

  .rel-card {
    position: relative;
    padding: 12px 15px;
    cursor: pointer;
    background: linear-gradient(135deg, rgb(30 30 30 / 90%) 0%, rgb(10 10 10 / 90%) 100%);
    border: 1px solid rgb(255 255 255 / 10%);
    border-left: 3px solid #d4af37;
    transition: all 0.3s ease;
  }

  .rel-card:hover {
    background: rgb(50 50 50 / 90%);
    border-color: #d4af37;
    transform: translateX(5px);
  }

  .rel-label {
    margin-bottom: 4px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .rel-name {
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
  }

  .rel-arrow {
    position: absolute;
    top: 50%;
    right: 10px;
    width: 0;
    height: 0;
    margin-top: -5px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 6px solid #555;
    transition: border-left-color 0.3s;
  }

  .rel-card:hover .rel-arrow {
    border-left-color: #d4af37;
  }

  .special-note-box {
    padding-top: 10px;
    margin-top: 40px;
    font-size: 0.85rem;
    font-style: italic;
    color: #666;
    text-align: right;
    border-top: 1px dashed rgb(255 255 255 / 10%);
  }

  .note-symbol {
    margin-right: 5px;
    color: #d4af37;
  }

  /* --- 手机端适配 --- */
  @media (width <= 768px) {
    .char-detail-view {
      padding-top: 60px;
    }

    .pc-back-btn {
      display: none;
    }

    .mobile-back-wrapper {
      display: block;
      margin-top: -15px;
      margin-bottom: 15px;
    }

    .content-wrapper {
      grid-template-columns: 1fr;
      gap: 30px;
      margin-top: 0;
    }

    /* 2. 手机端圆角缩小 */
    .main-tachie {
      overflow: hidden;
      border-radius: 4px;
    }

    .header-area {
      position: relative;
    }

    .band-logo-box {
      position: absolute;
      top: 35px;
      right: 0;
      height: 50px;
      margin: 0;
    }

    .char-name-large {
      margin-right: 60px;
      font-size: 2.2rem;
    }

    .profile-grid {
      grid-template-columns: 1fr 1fr;
    }

    .cards-gallery {
      gap: 10px;
    }

    .school-badge {
      display: inline-block;
      align-self: flex-start;
      padding: 2px 7px;
      margin-bottom: 10px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 0.6rem;
      font-weight: bold;
      color: rgb(255 215 0 / 80%);
      background: rgb(255 255 255 / 10%);
      border: 1px solid rgb(255 215 0);
      border-radius: 2px;
    }
  }
</style>
