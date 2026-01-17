<template>
  <div class="characters-view">
    <BackToTop />
    <!-- 顶部标题区 -->
    <div class="page-header">
      <h1 class="main-title">Characters</h1>
      <div class="divider">
        <div class="line-left"></div>
        <div class="diamond"></div>
        <div class="line-right"></div>
      </div>
      <p class="intro-text">
        曾经的 MyGO!!!!! 与 Ave Mujica 的成员们已各自组建家庭。<br />
        这是属于她们孩子们的，继往开来的崭新故事。
      </p>
      <p class="comment">（获得正式授权前，暂时以默认图片代替应有角色插画）</p>
    </div>

    <div class="page-container">
      <!-- 循环渲染乐队分组 -->
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
              <!-- <img
                :src="member.image || 'https://placehold.co/400x500/1a1a1a/d4af37?text=No+Image'"
                :alt="member.name"
                class="char-image"
              /> -->
              <img
                src="https://placehold.co/400x500/1a1a1a/d4af37?text=No+Image"
                class="char-image"
              />
              <div v-if="member.codeName" class="code-name-badge">{{ member.codeName }}</div>
            </div>

            <!-- 信息区域 -->
            <div class="card-info">
              <div class="name-group">
                <h3 class="char-name">{{ member.name }}</h3>
                <span class="char-romaji">{{ member.romaji }}</span>
              </div>

              <!-- 修改点：内容在左，标题在右 -->
              <div class="meta-info">
                <div class="meta-row">
                  <span class="value highlight">{{ member.position }}</span
                  ><span class="label">POSITION</span>
                </div>
                <div class="meta-row">
                  <span class="value">{{ member.school }}</span
                  ><span class="label">SCHOOL</span>
                </div>
              </div>

              <p class="char-intro">{{ member.profile.shortIntro }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import rawData from '@/assets/data/characters.json'

  interface Mother {
    /* src\assets\data\characters.json 中的Mother字段 */
    name: string
    id: string
  }

  interface Profile {
    /* src\assets\data\characters.json 中的Profile字段 */
    height: string
    birthday: string
    mbti?: string // 可选：只有 Lilith/Gorai 有这个字段
    shortIntro: string // 在/character页面的角色卡中显示的短简介
    longIntro: string // 在/character/characterdetail页显示的长简介
    mothers: Mother[] // 母亲数组
  }

  interface Member {
    /* src\assets\data\characters.json 中的members字段 */
    id: string
    route: string // 路由路径名，跳转/characterdetail时的子路径
    name: string
    romaji: string
    codeName?: string // 可选：Lilith/Mujica 专有
    position: string
    school: string
    image: string
    studentCard?: string // 可选，学生证图片路径，仅子世代拥有
    specialNote?: string // 可选：特殊标注，如《蝉鸣蟋音》致敬了《鼓手余命十日谭》
    profile: Profile // 嵌套的 profile 对象
  }

  interface Group {
    /* src\assets\data\characters.json 中的直接字段 */
    groupKey: string
    groupName: string
    bandLogo?: string // 可选：Other 组可能为空
    description: string
    members: Member[] // 不再用 any，使用上面定义的 Member[]
  }

  const characterData = ref<Group[]>(rawData as Group[])
  const groupRefMap = ref<Record<string, HTMLElement | null>>({})
  const router = useRouter()

  function goToDetailPage(routeKey: string) {
    router.push({
      name: 'char-detail',
      params: { id: routeKey },
    })
  }
  function setGroupRef(el: HTMLElement | null, groupKey: string) {
    if (el) {
      groupRefMap.value[groupKey] = el
    }
  }

  function scrollClick(groupKey: string) {
    const target = groupRefMap.value[groupKey]
    if (target) {
      // 增加 scroll-margin-top 避免标题被吸顶导航栏遮住
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
    margin-top: 15px;
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

  .comment {
    margin-top: 5px;
    font-size: 12px;
    color: #535353;
    letter-spacing: 1px;
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
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    color: #fff;
    cursor: pointer; /* 增加手型，提示可点击 */
    transition: color 0.3s;
  }

  .group-name:hover {
    color: #d4af37; /* 悬停变色 */
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  }

  /* --- 角色卡片设计 --- */
  .char-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    background: rgb(255 255 255 / 3%);
    border: 1px solid rgb(255 255 255 / 5%);
    transition: all 0.4s ease;
  }

  .char-card:hover {
    background: rgb(212 175 55 / 5%);
    border-color: #d4af37;
    box-shadow: 0 10px 30px rgb(0 0 0 / 50%);
    transform: translateY(-5px);
  }

  .card-image-wrapper {
    position: relative;
    width: 100%;
    height: 350px;
    overflow: hidden;
  }

  .char-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.6s ease;
  }

  .char-card:hover .char-image {
    transform: scale(1.05);
  }

  .code-name-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 2px 6px;
    font-family: 'Playfair Display', 'Times New Roman', serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: #aa8c2b;
    letter-spacing: 0.8px;
    background: rgb(0 0 0 / 80%);
    border: 1px solid #d4af37;
  }

  .card-info {
    padding: 25px;
  }

  .name-group {
    padding-bottom: 10px;
    margin-bottom: 20px;
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

  /* 修改：Label 稍微调暗一点，因为它现在在右边作为辅助信息 */
  .label {
    font-family: 'Share Tech Mono', monospace;
    color: #555;
    text-align: right; /* 确保文字靠右 */
  }

  /* 修改：Value 在左边，左对齐 */
  .value {
    color: #ccc;
    text-align: left;
  }

  .value.highlight {
    font-weight: bold;
    color: #ff2e63;
  }

  .char-intro {
    display: -webkit-box;
    margin-top: 15px;
    overflow: hidden;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    font-size: 0.9rem;
    line-height: 1.6;
    color: #aaa;
    -webkit-box-orient: vertical;
  }

  .tribute-footer {
    padding-top: 20px;
    margin-top: 60px;
    text-align: right;
    border-top: 1px solid rgb(255 255 255 / 10%);
  }

  .tribute-text {
    font-family: 'Noto Serif SC', serif;
    font-size: 0.9rem;
    color: #888;
  }

  .citation {
    margin-left: 10px;
    font-style: italic;
    color: #d4af37;
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

  @media (width <= 768px) {
    .main-title {
      font-size: 2.5rem;
    }

    .cards-grid {
      grid-template-columns: 1fr;
    }

    .card-image-wrapper {
      height: 300px;
    }
  }
</style>
