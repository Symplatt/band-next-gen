<template>
  <header class="site-header">
    <div class="header-inner">
      <!-- Logo 区域 -->
      <RouterLink to="/" class="brand-logo-link">
        <div class="brand-logo-wrapper">
          <!-- 电脑端 Logo -->
          <div class="brand-logo-pc">Band Next Generation</div>
          <!-- 手机端 Logo -->
          <div class="brand-logo-mobile">子世代</div>
        </div>
      </RouterLink>

      <!-- 导航链接区域 -->
      <nav class="main-nav">
        <RouterLink
          v-for="item in navList"
          :key="item.name"
          :to="item.label"
          class="nav-link"
          active-class="active"
        >
          {{ item.name }}
        </RouterLink>
      </nav>

      <!-- BGM 控制按钮区，位于最右侧 -->
      <div class="bgm-control" @click="togglePlay" :title="isPlaying ? '暂停音乐' : '播放音乐'">
        <!-- 根据播放状态切换喇叭图标 -->
        <component :is="isPlaying ? Volume2 : VolumeX" class="bgm-icon" />
      </div>

      <!-- 隐藏的音频元素 -->
      <audio ref="audioRef" loop preload="auto" @error="handleAudioError" class="hidden-audio">
        <source :src="resolvePath(currentSrc + '.mp3')" type="audio/mpeg" />
        <source :src="resolvePath(currentSrc + '.m4a')" type="audio/mp4" />
      </audio>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { RouterLink } from 'vue-router'
  import { Volume2, VolumeX } from 'lucide-vue-next'
  import { resolvePath } from '@/utils/assets'

  // 定义导航菜单项
  const navList = [
    { name: '首页', label: '/' },
    { name: '角色', label: '/characters' },
    { name: '关系', label: '/relations' },
    { name: '纪事', label: '/chronicle' },
    { name: '关于', label: '/about' },
  ]

  // BGM 相关逻辑变量
  const audioRef = ref<HTMLAudioElement | null>(null)
  const isPlaying = ref(true)
  const currentSrc = ref('')
  const currentVolume = ref(1.0)

  // 定义播放列表对象，包含路径和对应音量
  const playlist = [
    { path: '/bgm/yan', volume: 1.0 },
    { path: '/bgm/yingsewu', volume: 0.2 },
  ]

  // 随机选择一首曲目并应用音量设置
  const selectRandomTrack = () => {
    const index = Math.floor(Math.random() * playlist.length)
    const track = playlist[index]
    // 安全获取路径
    currentSrc.value = track?.path || ''
    // 获取该曲目对应的音量
    currentVolume.value = track?.volume || 1.0
  }

  // 切换播放状态并保存设置
  const togglePlay = () => {
    if (!audioRef.value) return
    if (isPlaying.value) {
      audioRef.value.pause()
      isPlaying.value = false
    } else {
      // 播放前应用当前曲目的特定音量
      audioRef.value.volume = currentVolume.value
      audioRef.value.play()
      isPlaying.value = true
    }
    localStorage.setItem('site_bgm_active', String(isPlaying.value))
  }

  // 音频加载错误时尝试切换下一首
  const handleAudioError = () => {
    selectRandomTrack()
    setTimeout(() => audioRef.value?.load(), 1000)
  }

  onMounted(() => {
    selectRandomTrack()
    // 读取用户之前的开关设置
    const savedState = localStorage.getItem('site_bgm_active')
    if (savedState !== null) {
      isPlaying.value = savedState === 'true'
    }
    // 尝试自动播放
    if (isPlaying.value && audioRef.value) {
      // 初始化时应用音量
      audioRef.value.volume = currentVolume.value
      // 处理浏览器自动播放策略限制
      audioRef.value.play().catch(() => {
        isPlaying.value = false
        const resumePlay = () => {
          if (localStorage.getItem('site_bgm_active') !== 'false') {
            // 恢复播放时再次确认音量
            if (audioRef.value) audioRef.value.volume = currentVolume.value
            audioRef.value?.play()
            isPlaying.value = true
          }
          document.removeEventListener('click', resumePlay)
        }
        document.addEventListener('click', resumePlay)
      })
    }
  })
</script>

<style scoped>
  /* 导航栏容器，设置为相对定位使其随页面滚动 */
  .site-header {
    position: relative;
    z-index: 1000;
    width: 100%;
    height: var(--header-height, 64px);
    background: linear-gradient(to bottom, rgb(15 16 22 / 88%), rgb(8 9 13 / 82%));
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(to right, transparent, rgb(212 175 55 / 35%), transparent) 1;
    backdrop-filter: blur(12px) saturate(120%);
    transition:
      background 0.3s ease,
      box-shadow 0.3s ease;
  }

  /* 内部内容的布局与最大宽度控制 */
  .header-inner {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1400px;
    height: 100%;
    padding: 0 40px;
    margin: 0 auto;
  }

  /* Logo 链接的基础交互行为 */
  .brand-logo-link {
    text-decoration: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  /* Logo 内容的对齐方式 */
  .brand-logo-wrapper {
    display: flex;
    align-items: center;
  }

  /* 桌面端 Logo 的字体与渐变文字效果 */
  .brand-logo-pc {
    font-family: 'Cinzel Decorative', cursive;
    font-size: 1.6rem;
    font-weight: 700;
    color: transparent;
    letter-spacing: 2px;
    background: linear-gradient(45deg, #d4af37, #f3e5ab, #d4af37);
    background-clip: text;
    filter: drop-shadow(0 0 3px rgb(212 175 55 / 35%));
    transition:
      filter 0.3s ease,
      transform 0.3s ease;
  }

  /* 鼠标悬停时增强文字的发光与位移反馈 */
  .brand-logo-link:hover .brand-logo-pc {
    filter: drop-shadow(0 0 6px rgb(212 175 55 / 55%));
    transform: translateY(-1px);
  }

  /* 移动端 Logo 默认不显示 */
  .brand-logo-mobile {
    display: none;
  }

  /* 导航链接的横向排列方式 */
  .main-nav {
    display: flex;
    gap: 36px;
    margin-right: 40px; /* 与右侧 BGM 按钮保持间距 */

    /* 确保导航在中间区域，根据 flex 布局特性 */
    margin-left: auto;
  }

  /* 单个导航链接的文字样式 */
  .nav-link {
    position: relative;
    padding: 6px 0;
    font-family: 'Noto Serif SC', serif;
    font-size: 0.95rem;
    font-weight: 500;
    color: rgb(255 255 255 / 65%);
    letter-spacing: 1.2px;
    text-decoration: none;
    transition:
      color 0.25s ease,
      text-shadow 0.25s ease;
  }

  /* 导航链接底部的装饰性下划线 */
  .nav-link::after {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    content: '';
    background: linear-gradient(to right, transparent, #d4af37, transparent);
    opacity: 0.85;
    transition:
      width 0.3s ease,
      left 0.3s ease;
  }

  /* 悬停或激活状态下的文字高亮效果 */
  .nav-link:hover,
  .nav-link.active {
    color: #fff;
    text-shadow: 0 0 6px rgb(212 175 55 / 45%);
  }

  /* 悬停或激活状态下展开下划线 */
  .nav-link:hover::after,
  .nav-link.active::after {
    left: 0;
    width: 100%;
  }

  /* BGM 按钮容器样式 */
  .bgm-control {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  /* 喇叭图标样式 */
  .bgm-icon {
    width: 20px;
    height: 20px;
    color: #d4af37;
    transition:
      transform 0.3s ease,
      filter 0.3s ease;
  }

  /* 悬停时图标发光并轻微放大 */
  .bgm-control:hover .bgm-icon {
    filter: drop-shadow(0 0 5px rgb(212 175 55 / 60%));
    transform: scale(1.1);
  }

  /* 隐藏 audio 标签 */
  .hidden-audio {
    display: none;
  }

  /* 小屏设备下的布局与字体调整 */
  @media (width <= 768px) {
    .header-inner {
      padding: 0 20px;
    }

    /* 手机端隐藏整个 Logo 区域，以便导航左对齐 */
    .brand-logo-link {
      display: none;
    }

    /* 重置导航栏布局：左对齐，并把右侧空间撑开 */
    .main-nav {
      gap: 20px;
      margin-right: auto; /* 关键：自动填充右侧空间，把 BGM 按钮挤到最右边 */
      margin-left: 0; /* 消除 PC 端左边距，实现左对齐 */
    }

    .nav-link {
      font-size: 0.88rem;
    }

    /* 移动端调整图标大小以免误触 */
    .bgm-control {
      width: 28px;
      height: 28px;
    }
  }
</style>
