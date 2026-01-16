<!-- views/HomeView.vue -->

<template>
  <div class="home-view">
    <main class="main-content">
      <!-- 第一页：Hero 展示页-->
      <HeroSection @scroll-next="handleScrollClick" />

      <!-- 第二页：账号页 -->
      <section class="account-area" ref="profileSectionRef">
        <div class="container">
          <!-- 标题区 -->
          <div class="section-title-group">
            <h2 class="area-title"><span class="title-content">创作档案</span></h2>
            <p class="area-subtitle">Portfolio</p>
            <p class="declare-change">(当前仅供样式演示，具体内容待定)</p>
          </div>

          <div class="page-container">
            <div class="info-content">
              <!-- 左侧：平台链接-->
              <div class="info-column social-column">
                <h3 class="column-title">Account / 画师账号</h3>
                <div class="link-list" v-for="item in accountList" :key="item.name">
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
                <h3 class="column-title">
                  Statistics / 数据统计<span class="comment">非真实数据，仅用于展示效果</span>
                </h3>
                <div class="stats-grid">
                  <div class="stat-unit" v-for="item in statList" :key="item.desc">
                    <span class="stat-num">{{ item.num }}</span>
                    <span class="stat-desc">{{ item.desc }}</span>
                  </div>
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

  // 点击后整页滚动到账号页
  const handleScrollClick = () => {
    profileSectionRef.value?.scrollIntoView({ behavior: 'smooth' })
  }

  // 平台账号接口
  interface PlatformAccount {
    name: string
    platform: string
    link: string
  }

  // 平台账号
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

  // 统计数据接口
  interface StatData {
    num: string
    desc: string
  }

  // 数据统计
  const statList = ref<StatData[]>([
    {
      num: '200+',
      desc: '插画作品',
    },
    {
      num: '9',
      desc: '子世代角色',
    },
    {
      num: '2',
      desc: '原创乐队',
    },
    {
      num: '100+',
      desc: '三创插画',
    },
    {
      num: '20+',
      desc: '三创文章',
    },
    {
      num: '∞',
      desc: '未完的故事',
    },
  ])
</script>

<style scoped>
  .home-view {
    width: 100%;
    height: 100%;
    font-family: 'Noto Serif SC', serif;
    color: #fff;
    background-color: #000205;
  }

  .main-content {
    position: relative;
    width: 100%;
  }

  .account-area {
    z-index: 5;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: 100vh;
    background-color: #0b0c10;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    padding: 0 40px;
    margin-top: 60px;
    margin-bottom: 150px;
  }

  .section-title-group {
    margin-bottom: 80px;
    text-align: center;
  }

  .area-title {
    margin-right: -2rem;
  }

  .title-content {
    font-size: 3rem;
    color: #fff;
    letter-spacing: 2rem;
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

  .comment {
    margin-left: 20px;
    color: #535353;
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
    grid-template-columns: 1fr 1fr 1fr;
    gap: 80px 50px;
    padding-top: 10px;
  }

  .stat-unit {
    text-align: center;
  }

  .stat-num {
    display: block;
    margin-bottom: 10px;
    font-family: 'Arial Narrow Bold', sans-serif;
    font-size: 4rem;
    line-height: 1;
    color: #fff;
  }

  .stat-desc {
    font-size: 1rem;
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
