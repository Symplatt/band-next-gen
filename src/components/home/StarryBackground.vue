<template>
  <canvas ref="canvasRef" class="starry-canvas"></canvas>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'

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

  const canvasRef = ref<HTMLCanvasElement | null>(null)
  let ctx: CanvasRenderingContext2D | null = null
  let width = 0
  let height = 0
  let animationId = 0
  let stars: StarEntity[] = []

  // 核心修改：适配移动端的 Star 类
  class Star implements StarEntity {
    x = 0
    y = 0
    size: number
    speed: number
    baseColor: string
    angle = 0
    blinkSpeed = 0

    constructor(size: number, speed: number, color: string) {
      this.size = size
      this.speed = speed
      this.baseColor = color
      this.init()
    }

    init() {
      // 这里的 width 和 height 是逻辑宽高（CSS像素），不是物理像素
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.blinkSpeed = 0.01 + Math.random() * 0.03
      this.angle = Math.random() * Math.PI * 2
    }

    update() {
      this.x -= this.speed
      this.angle += this.blinkSpeed
      // 边界检查使用逻辑宽度
      if (this.x < -20) this.x = width + 20
    }

    draw(ctx: CanvasRenderingContext2D) {
      const alpha = (Math.sin(this.angle) + 1) / 2
      ctx.save()
      ctx.globalAlpha = alpha
      ctx.fillStyle = this.baseColor
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }
  }

  const initCanvas = () => {
    if (!canvasRef.value) return

    // 1. 获取设备的像素比 (普通屏幕为1，Retina屏通常为2或3)
    const dpr = window.devicePixelRatio || 1

    // 2. 获取浏览器可视区域的逻辑宽高 (CSS像素)
    width = window.innerWidth
    height = window.innerHeight

    // 3. 设置 Canvas 的【物理分辨率】 (乘以 dpr)
    canvasRef.value.width = width * dpr
    canvasRef.value.height = height * dpr

    // 4. 设置 Canvas 的【CSS样式大小】 (保持逻辑宽高)
    canvasRef.value.style.width = `${width}px`
    canvasRef.value.style.height = `${height}px`

    ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      // 5. 缩放绘图上下文，这样后续绘图指令可以直接使用逻辑坐标，不需要手动乘 dpr
      ctx.scale(dpr, dpr)
      initStars()
    }
  }

  const initStars = () => {
    // 移动端可以适当减少星星数量以节省电量，这里保持原样，如有卡顿可减少 count
    const layers = [
      { count: 100, size: 0.8, speed: 0.1, color: '#443366' }, // 远景
      { count: 80, size: 1.2, speed: 0.3, color: '#ffffff' }, // 中景
      { count: 20, size: 2.5, speed: 0.8, color: '#ff2e63' }, // 近景
    ]

    stars = []
    layers.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        stars.push(new Star(layer.size, layer.speed, layer.color))
      }
    })
  }

  const render = () => {
    if (!ctx) return

    // 清除画布时使用逻辑宽高（因为已经 scale 过了，或者直接用物理宽高清除也可以）
    // 这里为了保险，直接清除足够大的区域
    ctx.clearRect(0, 0, width, height)

    // 绘制背景色
    ctx.fillStyle = '#000205'
    ctx.fillRect(0, 0, width, height)

    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      width,
    )
    gradient.addColorStop(0, 'rgba(30, 0, 50, 0.2)')
    gradient.addColorStop(1, 'transparent')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    stars.forEach((star) => {
      star.update()
      star.draw(ctx!)
    })

    animationId = requestAnimationFrame(render)
  }

  const handleResize = () => {
    initCanvas()
  }

  onMounted(() => {
    initCanvas()
    render()
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
  })
</script>

<style scoped>
  /* 核心修改：强制让 Canvas 充当固定背景 */
  .starry-canvas {
    position: absolute;
    top: 0;
    left: 0;

    /* 确保它在父容器的最底层，但不要用 -1，否则可能跑到背景色后面看不见 */
    z-index: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
</style>
