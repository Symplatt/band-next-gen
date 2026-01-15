// views/HomeView.vue

<template>
  <div class="home-view">
    <main class="main-content">
      <!-- 第一部分：Hero 展示页 (保持不变) -->
      <section class="hero-area">
        <div class="background-layer">
          <canvas ref="starryCanvasRef" class="starry-canvas"></canvas>
          <div class="vignette-mask"></div>
        </div>

        <div class="content-overlay">
          <div class="main-title">乐队子世代</div>
          <div class="divider">
            <div class="line-left"></div>
            <div class="diamond"></div>
            <div class="line-right"></div>
          </div>
          <div class="sub-title">那美好的未来</div>
          <div class="motto">EX-lilith ~ GO Rai</div>
        </div>

        <div class="scroll-hint" :class="{ hidden: !isScrollHintVisible }" @click="scrollToContent">
          <span class="hint-text">SCROLL</span>
          <div class="hint-arrow"></div>
        </div>
      </section>

      <!-- 第二部分：账号页 -->
      <section id="account-section" class="account-area">
        <div class="container">
          <!-- 标题区 -->
          <div class="section-title-group">
            <h2 class="area-title">创作者档案</h2>
            <p class="declare-change">(当前仅供样式演示，具体内容待定)</p>
            <p class="area-subtitle">Creator Profile & Statistics</p>
          </div>

          <div class="info-content">
            <!-- 左侧：社交链接-->
            <div class="info-column social-column">
              <h3 class="column-title">Connect / 关注</h3>
              <div class="link-list" v-for="item in accountList">
                <a :href="item.link" target="_blank" class="social-link">
                  <div class="link-info">
                    <span class="platform">{{ item.platform }}</span>
                    <span class="username">{{ item.name }}</span>
                  </div>
                  <span class="arrow-icon">↗</span>
                </a>
              </div>
            </div>

            <!-- 中间分割线 (竖线) -->
            <div class="vertical-divider"></div>

            <!-- 右侧：数据统计 -->
            <div class="info-column stats-column">
              <h3 class="column-title">Database / 统计</h3>
              <div class="stats-grid">
                <div class="stat-unit">
                  <span class="stat-num">100+</span>
                  <span class="stat-desc">Illustrations<br />插画作品</span>
                </div>
                <div class="stat-unit">
                  <span class="stat-num">9</span>
                  <span class="stat-desc">Characters<br />子世代角色</span>
                </div>
                <div class="stat-unit">
                  <span class="stat-num">2</span>
                  <span class="stat-desc">Bands<br />原创乐队</span>
                </div>
                <div class="stat-unit">
                  <span class="stat-num">∞</span>
                  <span class="stat-desc">Stories<br />未完的故事</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { RouterLink } from 'vue-router'

  // 接口定义
  interface StarEntity {
    x: number
    y: number
    size: number
    speed: number
    baseColor: string
    angle: number
    blinkSpeed: number
    update: () => void
    draw: (ctx: CanvasRenderingContext2D) => void
  }

  interface PlatformAccount {
    name: string
    platform: string
    link: string
  }

  const accountList = ref<PlatformAccount[]>([
    {
      name: 'hero鶴星',
      platform: 'Bilibili',
      link: 'https://space.bilibili.com/589781780',
    },
    {
      name: 'hero鹤星',
      platform: 'X / Twitter',
      link: 'https://x.com/hero45439083942',
    },
    {
      name: 'hero鹤星',
      platform: 'Lofter',
      link: 'https://xiao7108.lofter.com/',
    },
    {
      name: '违规英雄（避难中）',
      platform: '小红书',
      link: 'https://www.xiaohongshu.com/user/profile/61a4a93c0000000010006',
    },
  ])

  const SCROLL_THRESHOLD = 50

  const starryCanvasRef = ref<HTMLCanvasElement | null>(null)
  const isScrollHintVisible = ref(true)

  let canvasContext: CanvasRenderingContext2D | null = null
  let windowWidth = 0
  let windowHeight = 0
  let animationFrameId = 0
  let starArray: StarEntity[] = []

  // 滚动逻辑
  const handleScroll = () => {
    isScrollHintVisible.value = window.scrollY < SCROLL_THRESHOLD
  }

  const scrollToContent = () => {
    const target = document.getElementById('account-section')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 星星类
  class Star implements StarEntity {
    x: number = 0
    y: number = 0
    size: number
    speed: number
    baseColor: string
    angle: number = 0
    blinkSpeed: number = 0
    isBright: boolean

    constructor(size: number, speed: number, color: string, isBright: boolean = false) {
      this.size = size
      this.speed = speed
      this.baseColor = color
      this.isBright = isBright
      this.init()
    }

    init() {
      this.x = Math.random() * windowWidth
      this.y = Math.random() * windowHeight
      this.blinkSpeed = 0.01 + Math.random() * 0.03
      this.angle = Math.random() * Math.PI * 2
    }

    update() {
      this.x -= this.speed
      this.angle += this.blinkSpeed
      if (this.x < -20) this.x = windowWidth + 20
    }

    draw(ctx: CanvasRenderingContext2D) {
      const alpha = (Math.sin(this.angle) + 1) / 2
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.beginPath()
      ctx.fillStyle = this.baseColor
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  const handleResize = () => {
    if (starryCanvasRef.value) {
      windowWidth = window.innerWidth
      windowHeight = window.innerHeight
      starryCanvasRef.value.width = windowWidth
      starryCanvasRef.value.height = windowHeight
      initStars()
    }
  }

  const initStars = () => {
    const layers = [
      { count: 150, size: 0.8, speed: 0.1, color: '#443366' },
      { count: 100, size: 1.2, speed: 0.3, color: '#ffffff' },
      { count: 30, size: 2.5, speed: 0.8, color: '#ff2e63' },
    ]

    starArray = []
    layers.forEach((layer, index) => {
      const isBrightLayer = index === layers.length - 1
      for (let i = 0; i < layer.count; i++) {
        starArray.push(new Star(layer.size, layer.speed, layer.color, isBrightLayer))
      }
    })
  }

  // 渲染循环 (已修复 TypeScript 报错)
  const renderLoop = () => {
    // 1. 将 canvasContext 赋值给本地变量 ctx
    const ctx = canvasContext

    // 2. 检查 ctx 是否存在，如果不存在直接返回
    if (!ctx) return

    // 3. 后续所有操作都使用 ctx，此时 TS 知道它不是 null
    ctx.fillStyle = '#000205'
    ctx.fillRect(0, 0, windowWidth, windowHeight)

    const gradient = ctx.createRadialGradient(
      windowWidth / 2,
      windowHeight / 2,
      0,
      windowWidth / 2,
      windowHeight / 2,
      windowWidth,
    )
    gradient.addColorStop(0, 'rgba(30, 0, 50, 0.2)')
    gradient.addColorStop(1, 'transparent')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, windowWidth, windowHeight)

    starArray.forEach((star) => {
      star.update()
      // 4. 这里传入 ctx，不再报错
      star.draw(ctx)
    })

    animationFrameId = requestAnimationFrame(renderLoop)
  }

  onMounted(() => {
    if (starryCanvasRef.value) {
      canvasContext = starryCanvasRef.value.getContext('2d')
      handleResize()
      renderLoop()
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('scroll', handleScroll)
    cancelAnimationFrame(animationFrameId)
  })
</script>

<style scoped>
  /* 引入字体 */
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Noto+Serif+SC:wght@200;400;700;900&family=Playfair+Display:ital,wght@1,700&family=Share+Tech+Mono&display=swap');

  .home-view {
    width: 100%;
    height: 100%;
    font-family: 'Noto Serif SC', serif;
    color: #fff;
    background-color: #000205;
  }

  /* Hero 区域 */
  .main-content {
    position: relative;
    width: 100%;
  }

  .hero-area {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .background-layer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .starry-canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .vignette-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: radial-gradient(circle at center, transparent 0%, #000205 90%);
  }

  .content-overlay {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    text-align: center;
    transform: translateY(-8vh);
  }

  .main-title {
    font-size: 6rem;
    font-weight: 800;
    letter-spacing: 1.5rem;
    background: linear-gradient(
      to bottom,
      #ff1e56 0%,
      #8e2de2 20%,
      #4a00e0 50%,
      #8e2de2 80%,
      #ff1e56 100%
    );
    background-clip: text;
    background-size: 100% 300%;
    filter: drop-shadow(0 0 12px rgb(142 45 226 / 50%)) drop-shadow(0 5px 2px rgb(0 0 0 / 80%));
    animation:
      flow-purple 15s ease-in-out infinite,
      title-float 6s ease-in-out infinite;
    -webkit-text-fill-color: transparent;
  }

  .sub-title {
    margin-top: 1.2rem;
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    letter-spacing: 2.5rem;
    background: linear-gradient(90deg, #734b16, #d4af37, #fef9e7, #d4af37, #734b16);
    background-clip: text;
    background-size: 200% auto;
    animation: gold-sweep 7s linear infinite;
    -webkit-text-fill-color: transparent;
  }

  .divider {
    display: flex;
    align-items: center;
    width: 900px;
    margin: 2.5rem 0;
  }

  .line-left {
    flex-grow: 1;
    width: 200px;
    height: 1px;
    background: linear-gradient(to right, transparent, #ff2e63, #d4af37, transparent);
  }

  .line-right {
    flex-grow: 1;
    width: 200px;
    height: 1px;
    background: linear-gradient(to right, transparent, #d4af37, #ff2e63, transparent);
  }

  .diamond {
    position: relative;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    margin: 0 20px;
    background: #1a001a;
    border: 1px solid #d4af37;
    box-shadow: 0 0 15px #ff1e56;
    transform: rotate(45deg);
  }

  .diamond::after {
    position: absolute;
    inset: 2px;
    content: '';
    background: #d4af37;
  }

  .motto {
    margin-top: 2.5rem;
    font-family: 'Cinzel Decorative', cursive;
    font-size: 0.85rem;
    color: #6a4c93;
    letter-spacing: 0.8rem;
    opacity: 0.7;
  }

  @keyframes flow-purple {
    0%,
    100% {
      background-position: 50% 0%;
    }

    50% {
      background-position: 50% 100%;
    }
  }

  @keyframes gold-sweep {
    to {
      background-position: 200% center;
    }
  }

  @keyframes title-float {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-8px);
    }
  }

  /* 滚动提示 */
  .scroll-hint {
    position: absolute;
    bottom: 40px;
    left: 50%;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transform: translateX(-50%);
    transition:
      opacity 0.5s ease,
      visibility 0.5s;
  }

  .scroll-hint.hidden {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }

  .hint-text {
    margin-bottom: 20px;
    font-size: 0.8rem;
    color: rgb(222 221 221 / 47.9%);
    letter-spacing: 0.2rem;
  }

  .hint-arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid #c4c4c45e;
    border-bottom: 2px solid #c4c4c45e;
    transform: rotate(45deg);
    animation: arrow-bounce 2s infinite;
  }

  @keyframes arrow-bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
      transform: rotate(45deg) translate(0, 0);
    }

    40% {
      transform: rotate(45deg) translate(-10px, -10px);
    }

    60% {
      transform: rotate(45deg) translate(-5px, -5px);
    }
  }

  /* 账号页 - 重构样式 */
  .account-area {
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    padding: 120px 0;
    padding-top: 40px;
    background-color: #0b0c10;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    padding: 0 40px;
  }

  .section-title-group {
    margin-bottom: 80px;
    text-align: center;
  }

  .area-title {
    margin: 0;
    font-size: 3rem;
    color: #fff;
    letter-spacing: 2px;
  }

  .declare-change {
    margin: 10px;
    font-size: 0.8rem;
    color: #b2afa3;
  }

  .area-subtitle {
    margin-top: 10px;
    font-size: 0.9rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  /* 双列布局 */
  .info-content {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .info-column {
    flex: 1;
    padding: 0 20px;
  }

  .column-title {
    margin-bottom: 40px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.2rem;
    color: #ff2e63;
    letter-spacing: 1px;
  }

  /* 链接列表 */
  .link-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    color: #fff;
    text-decoration: none;
    border-bottom: 1px solid rgb(255 255 255 / 10%);
    transition: all 0.3s;
  }

  .social-link:hover {
    border-bottom-color: #d4af37;
    transform: translateX(10px);
  }

  .username {
    font-size: 0.9rem;
    color: #888;
    transition: color 0.3s;
  }

  .arrow-icon {
    font-size: 1.5rem;
    color: #555;
    transition: color 0.3s;
  }

  .social-link:hover .username,
  .social-link:hover .arrow-icon {
    color: #d4af37;
  }

  .link-info {
    display: flex;
    flex-direction: column;
  }

  .platform {
    margin-bottom: 4px;
    font-size: 1.1rem;
    font-weight: bold;
  }

  /* 中间分割线 */
  .vertical-divider {
    align-self: stretch;
    width: 1px;
    margin: 0 40px;
    background: rgb(255 255 255 / 10%);
  }

  /* 统计数据 */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px 30px;
  }

  .stat-unit {
    text-align: left;
  }

  .stat-num {
    display: block;
    margin-bottom: 10px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 4rem;
    line-height: 1;
    color: #fff;
  }

  .stat-desc {
    font-size: 0.85rem;
    line-height: 1.5;
    color: #888;
    letter-spacing: 1px;
  }

  @media (width <= 768px) {
    .info-content {
      flex-direction: column;
      gap: 60px;
    }

    .vertical-divider {
      display: none;
    }

    .main-title {
      font-size: 3rem;
      letter-spacing: 0.6rem;
    }

    .sub-title {
      font-size: 1.2rem;
      letter-spacing: 1.2rem;
    }

    .main-nav {
      display: none;
    }
  }
</style>
