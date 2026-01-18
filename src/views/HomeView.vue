<template>
  <div class="home-view">
    <main class="main-content">
      <!-- 第一页：Hero 展示页，监听向下滚动事件 -->
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
              <h3 class="column-title">Account / 画师账号</h3>

              <!-- 建议结构：link-list 是容器，a 标签循环 -->
              <div class="link-list">
                <a
                  v-for="item in accountList"
                  :key="item.name"
                  :href="item.link"
                  target="_blank"
                  class="social-link"
                >
                  <div class="link-info">
                    <span class="platform">
                      {{ item.platform }}
                      <span class="platform-describe" v-if="item.describe">
                        {{ item.describe }}
                      </span>
                    </span>
                    <span class="username">
                      @{{ item.name }}<span class="tag">{{ item.tag }}</span>
                    </span>
                  </div>

                  <span class="arrow-icon">↗</span>
                </a>
              </div>
            </div>

            <!-- 中间分割线 -->
            <div class="vertical-divider"></div>

            <!-- 右侧：数据统计 -->
            <div class="info-column stats-column">
              <h3 class="column-title">Statistics / 数据统计</h3>
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
  // 确保路径正确指向你的组件
  import HeroSection from '@/components/home/HeroSection.vue'

  // 滚动锚点引用
  const profileSectionRef = ref<HTMLElement | null>(null)

  // 滚动处理函数：平滑滚动到账号区域
  const handleScrollClick = () => {
    profileSectionRef.value?.scrollIntoView({ behavior: 'smooth' })
  }

  // 接口定义：平台账号
  interface PlatformAccount {
    name: string
    platform: string
    link: string
    describe?: string
    tag?: string
  }

  // 接口定义：统计数据
  interface StatData {
    num: string
    desc: string
  }

  // 数据源：账号列表
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

  // 数据源：统计列表
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
  /* 全局容器样式 */
  .home-view {
    width: 100%;
    min-height: 100vh;
    font-family: 'Noto Serif SC', serif;
    color: #fff;
    background-color: #000205;
  }

  /* 主内容区 */
  .main-content {
    position: relative;
    width: 100%;
  }

  /* 账号区域样式 - 确保背景色不透明，防止被其他元素干扰 */
  .account-area {
    position: relative;
    z-index: 5;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    padding: 80px 20px; /* 增加上下内边距 */
    background-color: #0b0c10;
  }

  /* 页面内容限制容器 */
  .page-container {
    width: 100%;
    max-width: 1200px;
  }

  /* 标题组样式 */
  .section-title-group {
    margin-bottom: 80px;
    text-align: center;
  }

  .area-title {
    /* 修正右间距导致的视觉偏移 */
    display: inline-block;
    margin: 0;
  }

  .title-content {
    width: auto;
    margin-right: -1.5rem; /* 修正 letter-spacing 带来的末尾空白 */
    font-size: 3rem;
    color: #fff;
    letter-spacing: 1.5rem; /* 稍微减小间距以适配更多屏幕 */
    white-space: nowrap; /* 禁用换行 */
  }

  .area-subtitle {
    margin-top: 15px;
    font-size: 0.9rem;
    color: #d4af37;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  /* 信息内容双列布局 */
  .info-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .info-column {
    flex: 1;
    min-width: 0;
  }

  .social-column {
    padding-right: 40px; /* 增加右侧间距 */
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

  /* 链接列表样式 */
  .link-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .social-link {
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: space-between;
    width: 100%;
    padding: 20px 0;
    color: #fff;
    text-decoration: none;
    border-bottom: 1px solid rgb(255 255 255 / 10%);
    transition: all 0.3s ease;
  }

  .social-link:hover {
    padding-left: 10px; /* 整体右移效果替代 translateX，防止图标出界 */
    background: linear-gradient(90deg, rgb(255 255 255 / 3%), transparent); /* 添加微弱背景交互 */
    border-bottom-color: #d4af37;
  }

  .username {
    font-family: monospace; /* 用户名用等宽字体更有科技感 */
    font-size: 0.8rem;
    color: #888;
    transition: color 0.3s;
  }

  .tag {
    margin-left: 10px;
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
    transform: translate(3px, -3px); /* 箭头向右上角微动 */
  }

  .link-info {
    display: flex;
    flex: 1; /* 占满剩余宽度 */
    flex-direction: column;
    min-width: 0; /* 防止文本溢出 */
    padding-right: 5px; /* 避免文字撞到箭头 */
  }

  .info-header {
    display: flex;
    flex-wrap: wrap; /* 防止手机端爆开 */
    gap: 10px;
    align-items: center; /* 垂直居中 */
    margin-bottom: 4px;
  }

  .platform {
    margin-bottom: 4px;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .platform-describe {
    display: inline-block; /* 为了让transform 生效 */
    padding: 2px 5px;
    margin-left: 5px;
    font-size: 0.6em;
    color: #eff0dc;
    letter-spacing: 0.1em;
    border: 1px solid #eff0dc;
    border-radius: 5px;
    transform: translateY(-2px);
  }

  /* 垂直分割线 */
  .vertical-divider {
    /* 确保分割线高度跟随父容器 */
    align-self: stretch;
    width: 1px;
    margin: 0 20px;
    background: rgb(255 255 255 / 10%);
  }

  /* 统计数据网格 */
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

  /* 移动端适配 */
  @media (width <= 768px) {
    .account-area {
      padding: 50px 20px;
    }

    .title-content {
      margin-right: -0.8rem;
      font-size: 1.8rem;
      letter-spacing: 0.8rem;
    }

    .info-content {
      flex-direction: column; /* 改为垂直排列 */
      gap: 60px;
    }

    .social-column,
    .stats-column {
      padding: 0; /* 移除内边距 */
    }

    .social-column {
      width: 100%;
    }

    .platform-describe {
      margin-left: 13px;
    }

    .vertical-divider {
      display: none; /* 隐藏分割线 */
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr); /* 统计改为两列 */
      gap: 40px 20px;
      margin-top: 0;
    }
  }
</style>
