<template>
  <div class="home-view">
    <main class="main-content">
      <!-- 第一页：Hero 展示页 -->
      <HeroSection @scroll-next="handleScrollClick" />

      <!-- 第二页：账号与统计页 -->
      <section class="account-area" ref="profileSectionRef">
        <div class="page-container">
          <!-- 标题区 -->
          <div class="section-title-group">
            <h2 class="area-title"><span class="title-content">创作档案</span></h2>
            <p class="area-subtitle">Portfolio</p>
            <p class="extra-describe"></p>
          </div>

          <div class="info-content">
            <!-- 左侧：平台链接 -->
            <div class="info-column social-column">
              <h3 class="column-title social-title">Account / 画师账号</h3>

              <div class="link-list">
                <a
                  v-for="item in accountList"
                  :key="item.name"
                  :href="item.link"
                  target="_blank"
                  class="social-link"
                >
                  <!-- 修改：Grid 容器 -->
                  <div class="link-info">
                    <!-- 左上：平台名 -->
                    <span class="platform">{{ item.platform }}</span>

                    <!-- 右上：主要更新标识 (v-if) -->
                    <span class="platform-describe" v-if="item.describe">
                      {{ item.describe }}
                    </span>

                    <!-- 左下：用户名 -->
                    <span class="username">@{{ item.name }}</span>

                    <!-- 右下：Tag (v-if) -->
                    <span class="tag" v-if="item.tag">{{ item.tag }}</span>
                  </div>

                  <span class="arrow-icon">↗</span>
                </a>
              </div>
            </div>

            <!-- 中间分割线 -->
            <div class="vertical-divider"></div>

            <!-- 右侧：数据统计 -->
            <div class="info-column stats-column">
              <h3 class="column-title stat-title">Statistics / 数据统计</h3>
              <div class="stats-grid">
                <div class="stat-unit" v-for="item in statList" :key="item.desc">
                  <span class="stat-num">{{ item.num }}</span>
                  <span class="stat-desc">{{ item.desc }}</span>
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
  import { ref } from 'vue'
  import HeroSection from '@/components/home/HeroSection.vue'

  const profileSectionRef = ref<HTMLElement | null>(null)

  const handleScrollClick = () => {
    profileSectionRef.value?.scrollIntoView({ behavior: 'smooth' })
  }

  interface PlatformAccount {
    name: string
    platform: string
    link: string
    describe?: string
    tag?: string
  }

  interface StatData {
    num: string
    desc: string
  }

  const accountList = ref<PlatformAccount[]>([
    {
      name: 'hero鹤星',
      platform: 'Lofter',
      link: 'https://www.lofter.com/front/blog/collection/share?collectionId=22881169&incantation=hjoTvd7LiZIh',
      describe: '主要更新',
      tag: '#乐队子世代：那美好的未来',
    },
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
      name: '违规英雄',
      platform: '小红书',
      link: 'https://www.xiaohongshu.com/user/profile/61a4a93c0000000010006c00',
    },
  ])

  const statList = ref<StatData[]>([
    { num: '9', desc: '子世代角色' },
    { num: '2', desc: '原创乐队' },
    { num: '200+', desc: '插画作品' },
    { num: '100+', desc: '未完的故事' },
    { num: '70+', desc: '三创插画' },
    { num: '50+', desc: '三创文章' },
  ])
</script>

<style scoped>
  /* 全局容器 */
  .home-view {
    width: 100%;
    min-height: 100vh;
    font-family: 'Noto Serif SC', serif;
    color: #fff;
    background-color: #000205;
  }

  .main-content {
    position: relative;
    width: 100%;
  }

  .account-area {
    position: relative;
    z-index: 5;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    min-height: 100vh; /* 至少一满屏 */
    padding: 80px 20px;
    background-color: #0b0c10;
  }

  .page-container {
    width: 100%;
    max-width: 1200px;
  }

  .section-title-group {
    margin-bottom: 80px;
    text-align: center;
  }

  .area-title {
    display: inline-block;
    margin: 0;
  }

  .title-content {
    width: auto;
    margin-right: -1.5rem;
    font-size: 3rem;
    color: #fff;
    letter-spacing: 1.5rem;
    white-space: nowrap;
  }

  .area-subtitle {
    margin-top: 15px;
    font-size: 0.9rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .info-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .info-column {
    flex: 1;
    min-width: 0;
    margin-bottom: 100px; /* 两个子容器，高者下边距100px */
  }

  .social-column {
    padding-right: 40px;
  }

  .stats-column {
    padding-left: 40px;
  }

  .column-title {
    margin-bottom: 40px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.2rem;
    color: #ff2e63;
    letter-spacing: 1px;
  }

  .link-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .social-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;
    color: #fff;
    text-decoration: none;
    border-bottom: 1px solid rgb(255 255 255 / 10%);
    transition: all 0.3s ease;
  }

  .social-link:hover {
    padding-left: 10px;
    background: linear-gradient(90deg, rgb(255 255 255 / 3%), transparent);
    border-bottom-color: #d4af37;
  }

  /* 修改：四宫格布局核心 */
  .link-info {
    display: grid;
    flex: 1;

    /* 两行布局 */
    grid-template-rows: auto auto;

    /* 第一列自适应内容宽度，第二列占据剩余空间 */
    grid-template-columns: max-content auto;

    /* 间距控制：列间距12px，行间距4px */
    gap: 4px 12px;
    align-items: center; /* 垂直居中 */
    padding-right: 10px;
  }

  /* 强制指定每个元素的位置，确保对齐 */
  .platform {
    grid-row: 1;
    grid-column: 1;
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.2;
  }

  .platform-describe {
    grid-row: 1;
    grid-column: 2; /* 放在第二列，与下方的tag左对齐 */
    justify-self: start; /* 靠左对齐 */
    padding: 1px 5px;
    font-size: 0.6em;
    color: #d4af37; /* 文字改为金色 */
    letter-spacing: 0.1em;
    background-color: rgb(212 175 55 / 10%); /* 背景改为透明金 */
    border: 1px solid #d4af37; /* 边框改为金色 */
    border-radius: 5px;
  }

  .username {
    grid-row: 2;
    grid-column: 1;
    font-family: monospace;
    font-size: 0.85rem;
    color: #888;
    transition: color 0.3s;
  }

  .tag {
    grid-row: 2;
    grid-column: 2;
    justify-self: start;
    font-size: 0.75rem;
    color: #666;
  }

  .arrow-icon {
    font-size: 1.2rem;
    color: #555;
    transition: color 0.3s;
  }

  .social-link:hover .username {
    color: #fff;
  }

  .social-link:hover .arrow-icon {
    color: #d4af37;
    transform: translate(3px, -3px);
  }

  .vertical-divider {
    align-self: stretch;
    width: 1px;
    margin: 0 20px 100px; /* 100px是为了和两个info-column中更高的那个底对齐 */
    background: rgb(255 255 255 / 10%);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px 30px;
    margin-top: 50px;
  }

  .stat-unit {
    text-align: center;
  }

  .stat-num {
    display: block;
    margin-bottom: 10px;
    font-family: 'Arial Narrow', sans-serif;
    font-size: 3.5rem;
    font-weight: bold;
    line-height: 1;
    color: #fff;
  }

  .stat-desc {
    font-size: 0.9rem;
    color: #888;
    letter-spacing: 1px;
  }

  @media (width <= 768px) {
    .account-area {
      padding: 50px 20px;
    }

    .section-title-group {
      margin-bottom: 40px;
    }

    .title-content {
      margin-right: -0.8rem;
      font-size: 1.8rem;
      letter-spacing: 0.8rem;
    }

    .info-content {
      flex-direction: column;
      gap: 60px;
      margin-bottom: 0;
    }

    .info-column {
      margin-bottom: 100px;
    }

    .social-column,
    .stats-column {
      padding: 0;
    }

    .social-column {
      width: 100%;
      margin-bottom: 40px;
    }

    .column-title {
      text-align: center;
    }

    .social-title {
      margin-bottom: 30px;
    }

    .vertical-divider {
      display: none;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 40px 20px;
      margin-top: 0;
    }
  }
</style>
