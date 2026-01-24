<!-- src/views/CharacterView.vue -->
<!-- 角色页 -->

<template>
  <div class="characters-view">
    <!-- 顶部标题区 -->
    <div class="page-header">
      <h1 class="main-title">Characters</h1>
      <div class="divider">
        <div class="line-left"></div>
        <div class="diamond"></div>
        <div class="line-right"></div>
      </div>
      <p class="intro-text">
        MyGO!!!!! 与 Ave Mujica 已各自组建家庭。<br />
        这是子辈们继往开来的崭新故事。<br />
      </p>
    </div>

    <div class="page-container">
      <section
        v-for="group in characterData"
        :key="group.groupKey"
        class="group-section"
        :ref="(el) => setGroupRef(el as HTMLElement, group.groupKey)"
      >
        <div class="group-header">
          <!-- 点击标题触发滚动 -->
          <h2 class="group-name" @click="scrollClick(group.groupKey)">{{ group.groupName }}</h2>
          <p class="group-desc">{{ group.description }}</p>
        </div>

        <div class="cards-grid">
          <div
            v-for="member in group.members"
            :key="member.id"
            class="char-card"
            @click="goToDetailPage(member.route)"
          >
            <!-- 图片区域 -->
            <div class="card-image-wrapper">
              <!-- 使用 resolvePath 解析完整路径，加 || '' 防止数组越界报错 -->
              <img
                :src="resolvePath(member.image[0] || '')"
                class="char-image"
                @error="onImageError"
                loading="lazy"
                :alt="member.name"
              />
              <div v-if="member.codeName" class="code-name-badge">{{ member.codeName }}</div>
            </div>

            <!-- 信息区域 -->
            <div class="card-info">
              <div class="name-group">
                <h3 class="char-name">{{ member.name }}</h3>
                <span class="char-romaji">{{ member.romaji }}</span>
              </div>

              <div class="meta-info">
                <div class="meta-row position-row">
                  <span class="label">POSITION</span>
                  <span class="value highlight">{{ member.position }}</span>
                </div>
                <div class="meta-row school-row">
                  <span class="label">SCHOOL</span>
                  <span class="value">{{ member.school }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 特殊注释 -->
      <SpecialNoteBox note-content="本页面所展示的立绘皆截取自鹤星发布于各平台的作品" />
    </div>
  </div>
</template>

<script setup lang="ts">
  // 引入API
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  // 引入数据
  import rawData from '@/assets/data/characters.json'
  // 引入组件
  import SpecialNoteBox from '@/components/SpecialNoteBox.vue'
  // 引入接口

  // 类型定义保持不变
  interface Mother {
    name: string
    id: string
  }
  interface Sister {
    name: string
    id: string
  }
  interface Kid {
    name: string
    id: string
  }
  interface Family {
    mothers?: Mother[]
    sisters?: Sister[]
    kids?: Kid[]
  }
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
    groupName: string
    bandLogo?: string
    description: string
    members: Member[]
  }

  const characterData = ref<Group[]>(rawData as Group[])
  const groupRefMap = ref<Record<string, HTMLElement | null>>({})
  const router = useRouter()

  // 获取 Vite 配置中的 base 路径 (即 /band-next-gen/)
  const baseUrl = import.meta.env.BASE_URL

  // 路径解析函数
  const resolvePath = (path: string) => {
    if (!path) return ''

    // 如果 JSON 中的路径已经是绝对路径 (http开头)，直接返回
    if (path.startsWith('http')) return path

    // 移除路径开头的 /，防止拼接时出现双斜杠 (如 /band-next-gen//images)
    const cleanPath = path.startsWith('/') ? path.slice(1) : path

    // 拼接 base 路径和文件路径
    // 最终结果类似: /band-next-gen/images/stand-image/hazuki.png
    return `${baseUrl}${cleanPath}`
  }

  // 图片加载失败处理
  const onImageError = (e: Event) => {
    const img = e.target as HTMLImageElement
    // 如果加载失败，尝试加载本地的默认立绘 (根据你的截图存在这个文件)
    // 防止默认图也加载失败导致的死循环
    const defaultPath = `${baseUrl}images/stand-image/default-stand-image.png`
    if (img.src !== window.location.origin + defaultPath) {
      img.src = defaultPath
    }
  }

  function goToDetailPage(routeKey: string) {
    router.push({ name: 'char-detail', params: { id: routeKey } })
  }

  function setGroupRef(el: HTMLElement | null, groupKey: string) {
    if (el) groupRefMap.value[groupKey] = el
  }

  function scrollClick(groupKey: string) {
    const target = groupRefMap.value[groupKey]
    if (target) {
      target.style.scrollMarginTop = '40px'
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
</script>

<style scoped>
  /* --- 页面基础布局 --- */
  .characters-view {
    min-height: 100vh;
    padding-bottom: 100px;
    color: #fff;
    background-color: #0b0c10;
  }

  /* --- 顶部标题区 --- */
  .page-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px 40px;
    text-align: center;
  }

  .main-title {
    font-family: 'Cinzel Decorative', cursive;
    font-size: 3.5rem;
    font-weight: 700;
    color: #d4af37;
    letter-spacing: 4px;
    animation: fade-in-down 1s ease-out;
  }

  .divider {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 20px 0;
    opacity: 0.6;
  }

  .line-left,
  .line-right {
    flex-grow: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, #d4af37, transparent);
  }

  .diamond {
    width: 8px;
    height: 8px;
    margin: 0 10px;
    background: #d4af37;
    transform: rotate(45deg);
  }

  .intro-text {
    max-width: 800px;
    font-family: 'Noto Serif SC', serif;
    font-size: 1rem;
    line-height: 1.8;
    color: #c5c6c7;
  }

  /* --- 乐队分组区域 --- */
  .group-section {
    margin-bottom: 100px;
  }

  .group-header {
    padding-left: 20px;
    margin-bottom: 40px;
    border-left: 4px solid #d4af37;
  }

  .group-name {
    position: relative;
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    color: transparent;
    cursor: pointer;
    background-image:
      repeating-radial-gradient(
        circle at 20% 30%,
        rgb(255 215 0 / 35%) 0,
        rgb(255 215 0 / 35%) 1px,
        transparent 2px,
        transparent 4px
      ),
      linear-gradient(120deg, #cfa73a 0%, #fff2b0 45%, #ffd700 50%, #fff2b0 55%, #cfa73a 100%);
    background-clip: text;
    background-size:
      300% 300%,
      200% auto;
    filter: drop-shadow(0 0 6px rgb(255 215 0 / 35%));
    animation:
      glitter-flow 32s ease-in-out infinite,
      shine-flow 22s ease-in-out infinite alternate,
      aura-pulse 28s ease-in-out infinite;
  }

  @keyframes glitter-flow {
    0% {
      background-position:
        0% 0%,
        0% center;
    }

    100% {
      background-position:
        300% 300%,
        0% center;
    }
  }

  @keyframes shine-flow {
    0% {
      background-position: 180% center;
    }

    100% {
      background-position: -180% center;
    }
  }

  @keyframes aura-pulse {
    0% {
      filter: drop-shadow(0 0 4px rgb(255 215 0 / 25%));
    }

    50% {
      filter: drop-shadow(0 0 10px rgb(255 215 0 / 45%));
    }

    100% {
      filter: drop-shadow(0 0 4px rgb(255 215 0 / 25%));
    }
  }

  .group-desc {
    margin-top: 5px;
    font-size: 0.9rem;
    color: #888;
    letter-spacing: 1px;
  }

  /* --- 卡片网格布局 --- */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  /* --- 角色卡片 (电脑端) --- */
  .char-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: rgb(255 255 255 / 3%);
    border: 1px solid rgb(255 255 255 / 5%);
    transition: all 0.4s ease;
  }

  .char-card:hover {
    border-color: #d4af37;
    box-shadow: 0 10px 30px rgb(0 0 0 / 50%);
    transform: translateY(-5px);
  }

  .card-image-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
  }

  .char-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.6s ease;
  }

  .char-card:hover .char-image {
    transform: scale(1.05);
  }

  .card-info {
    position: relative;
    padding: 20px 25px;
    background: none;
  }

  .code-name-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 2px 6px;
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: #aa8c2b;
    background: rgb(0 0 0 / 80%);
    border: 1px solid #d4af37;
  }

  .name-group {
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid rgb(255 255 255 / 10%);
  }

  .char-name {
    margin: 0;
    font-family: 'Noto Serif SC', serif;
    font-size: 1.5rem;
    color: #fff;
  }

  .char-romaji {
    font-size: 0.8rem;
    color: #888;
  }

  .meta-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 0.9rem;
  }

  .label {
    font-family: 'Share Tech Mono', monospace;
    color: #555;
    text-align: right;
  }

  .value {
    color: #ccc;
    text-align: left;
  }

  .value.highlight {
    font-weight: bold;
    color: #ff2e63;
  }

  @keyframes fade-in-down {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* --- 手机端适配 --- */
  @media (width <= 768px) {
    .main-title {
      font-size: 2.5rem;
    }

    .group-name {
      font-size: 1.6rem;
    }

    .group-header {
      padding-left: 15px;
      margin-bottom: 25px;
      line-height: 1.2;
      border-left-width: 3px;
    }

    .cards-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
    }

    .char-card {
      background: #000;
      border: 1px solid rgb(212 175 55 / 28%);
    }

    .card-image-wrapper {
      aspect-ratio: 2 / 3;
    }

    .card-info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 40px 12px 12px;
      background: linear-gradient(
        to top,
        rgb(0 0 0 / 100%) 0%,
        rgb(0 0 0 / 80%) 40%,
        transparent 100%
      );
      border: none;
    }

    .name-group {
      padding-bottom: 0;
      margin-bottom: 2px;
      border-bottom: none;
    }

    .char-name {
      font-size: 1.1rem;
      text-shadow: 0 2px 4px rgb(0 0 0 / 90%);
    }

    .char-romaji {
      font-size: 0.7rem;
      color: #ddd;
    }

    .school-row {
      display: none !important;
    }

    .position-row {
      justify-content: flex-start;
      margin-bottom: 0;
    }

    .position-row .label {
      display: none;
    }

    .position-row .value {
      font-size: 0.85rem;
      font-weight: 500;
    }

    .code-name-badge {
      top: 8px;
      right: 8px;
      padding: 1px 6px;
      font-size: 0.75rem;
      color: #ffd700;
      background: rgb(0 0 0 / 50%);
      border-color: #ffd700;
      backdrop-filter: blur(2px);
    }
  }
</style>
