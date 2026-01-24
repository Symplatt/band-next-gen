<template>
  <div class="bgm-wrapper">
    <!-- 实际负责播放的音频元素 -->
    <audio ref="audioRef" loop preload="auto" @error="handleError">
      <source :src="resolvePath(currentSrc + '.mp3')" type="audio/mpeg" />
      <source :src="resolvePath(currentSrc + '.m4a')" type="audio/mp4" />
    </audio>

    <!-- BGM 控制按钮 -->
    <div
      class="bgm-btn"
      :class="{ 'is-playing': isPlaying }"
      @click="togglePlay"
      title="Background Music"
    >
      <!-- 律动音柱 -->
      <div class="equalizer">
        <span class="bar" v-for="i in 4" :key="i"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { resolvePath } from '../utils/assets'

  const audioRef = ref<HTMLAudioElement | null>(null)
  const isPlaying = ref(true)
  const currentSrc = ref('')

  const playlist = ['/bgm/yan', '/bgm/yingsewu']

  // 不同曲目的音量校准表
  const volumeMap: Record<string, number> = {
    '/bgm/yan': 1.0,
    '/bgm/yingsewu': 0.3,
  }

  // 随机选择一首曲目
  const selectRandomTrack = () => {
    const index = Math.floor(Math.random() * playlist.length)
    currentSrc.value = playlist[index] || ''
  }

  // 根据当前曲目设置音量
  const applyVolume = () => {
    if (!audioRef.value) return
    audioRef.value.volume = volumeMap[currentSrc.value] ?? 1.0
  }

  // 播放与暂停切换
  const togglePlay = () => {
    if (!audioRef.value) return
    if (isPlaying.value) {
      audioRef.value.pause()
      isPlaying.value = false
    } else {
      audioRef.value.play()
      isPlaying.value = true
    }
    localStorage.setItem('site_bgm_active', String(isPlaying.value))
  }

  // 音频加载失败时切换曲目
  const handleError = () => {
    selectRandomTrack()
    if (audioRef.value) audioRef.value.load()
  }

  // 曲目变化时同步音量并重新加载
  watch(currentSrc, () => {
    applyVolume()
    audioRef.value?.load()
  })

  onMounted(() => {
    selectRandomTrack()
    const savedState = localStorage.getItem('site_bgm_active')
    if (savedState !== null) {
      isPlaying.value = savedState === 'true'
    }
    if (isPlaying.value && audioRef.value) {
      applyVolume()
      audioRef.value.play().catch(() => {
        isPlaying.value = false
        const resumePlay = () => {
          if (localStorage.getItem('site_bgm_active') !== 'false') {
            applyVolume()
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
  .bgm-btn {
    position: fixed;
    right: 40px;
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

  .bgm-btn:hover {
    background-color: #d4af37;
    box-shadow: 0 6px 16px rgb(212 175 55 / 30%);
    transform: translateY(-5px);
  }

  .equalizer {
    display: flex;
    gap: 3px;
    align-items: flex-end;
    justify-content: center;
    height: 16px;
  }

  .bar {
    width: 3px;
    height: 3px;
    background-color: #d4af37;
    transition: all 0.2s;
  }

  .is-playing .bar {
    animation: equalize 1s infinite ease-in-out;
  }

  .bgm-btn:hover .bar {
    background-color: #000;
  }

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
