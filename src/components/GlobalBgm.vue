<template>
  <div class="bgm-wrapper">
    <!-- 隐藏的音频元素，负责实际播放 -->
    <audio ref="audioRef" loop preload="auto" @error="handleError">
      <source :src="resolvePath(currentSrc + '.mp3')" type="audio/mpeg" />
      <source :src="resolvePath(currentSrc + '.m4a')" type="audio/mp4" />
    </audio>

    <!-- BGM控制按钮，样式与BackToTop保持一致 -->
    <div
      class="bgm-btn"
      :class="{ 'is-playing': isPlaying }"
      @click="togglePlay"
      title="Background Music"
    >
      <!-- 律动音柱容器 -->
      <div class="equalizer">
        <span class="bar" v-for="i in 4" :key="i"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { resolvePath } from '../utils/assets'

  const audioRef = ref<HTMLAudioElement | null>(null)
  const isPlaying = ref(true) // 默认状态设为开启
  const currentSrc = ref('')

  // 定义播放列表路径
  const playlist = ['/bgm/yan', '/bgm/yingsewu']

  // 随机选择一首曲目
  const selectRandomTrack = () => {
    const index = Math.floor(Math.random() * playlist.length)
    currentSrc.value = playlist[index] || ''
  }

  // 处理播放状态切换
  const togglePlay = () => {
    if (!audioRef.value) return

    if (isPlaying.value) {
      audioRef.value.pause()
      isPlaying.value = false
    } else {
      audioRef.value.play()
      isPlaying.value = true
    }
    // 将用户偏好保存到本地存储
    localStorage.setItem('site_bgm_active', String(isPlaying.value))
  }

  // 音频加载错误处理
  const handleError = () => {
    // 简单重试逻辑，重新随机一首
    selectRandomTrack()
    if (audioRef.value) audioRef.value.load()
  }

  onMounted(() => {
    // 初始化曲目
    selectRandomTrack()

    // 读取本地存储的用户偏好
    const savedState = localStorage.getItem('site_bgm_active')
    if (savedState !== null) {
      isPlaying.value = savedState === 'true'
    }

    // 尝试自动播放
    if (isPlaying.value && audioRef.value) {
      // 设置适当音量
      audioRef.value.volume = 1.0
      // 尝试播放，处理浏览器自动播放策略限制
      audioRef.value.play().catch(() => {
        // 如果被拦截，改为暂停状态，并监听第一次点击交互来恢复播放
        isPlaying.value = false
        const resumePlay = () => {
          if (localStorage.getItem('site_bgm_active') !== 'false') {
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
  /* 按钮基础样式，复刻 BackToTop 的风格 */
  .bgm-btn {
    position: fixed;
    right: 40px;

    /* 计算位置：BackToTop底部(40px) + 高度(50px) + 间距(15px) */
    bottom: 105px;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: rgb(0 0 0 / 60%);
    border: 1px solid #d4af37;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 50%);
    transition: all 0.3s ease;
  }

  /* 悬停效果 */
  .bgm-btn:hover {
    background-color: #d4af37;
    box-shadow: 0 6px 16px rgb(212 175 55 / 30%);
    transform: translateY(-5px);
  }

  /* 律动音柱容器布局 */
  .equalizer {
    display: flex;
    gap: 3px;
    align-items: flex-end;
    justify-content: center;
    height: 16px;
  }

  /* 单个音柱样式 */
  .bar {
    width: 3px;
    height: 3px;
    background-color: #d4af37;
    transition: all 0.2s;
  }

  /* 播放状态下的跳动动画 */
  .is-playing .bar {
    animation: equalize 1s infinite ease-in-out;
  }

  /* 悬停时音柱变色 */
  .bgm-btn:hover .bar {
    background-color: #000;
  }

  /* 给每个音柱设置不同的动画延迟，制造随机感 */
  .is-playing .bar:nth-child(1) {
    animation-delay: -0.4s;
  }

  .is-playing .bar:nth-child(2) {
    animation-delay: -0.2s;
  }

  .is-playing .bar:nth-child(3) {
    animation-delay: -0.6s;
  }

  .is-playing .bar:nth-child(4) {
    animation-delay: -0.1s;
  }

  /* 关键帧动画：高度变化 */
  @keyframes equalize {
    0% {
      height: 3px;
    }

    50% {
      height: 16px;
    }

    100% {
      height: 3px;
    }
  }
</style>
