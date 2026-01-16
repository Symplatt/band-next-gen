// components/hero/StarryBackground.vue

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
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.blinkSpeed = 0.01 + Math.random() * 0.03
      this.angle = Math.random() * Math.PI * 2
    }

    update() {
      this.x -= this.speed
      this.angle += this.blinkSpeed
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
    width = window.innerWidth
    height = window.innerHeight
    canvasRef.value.width = width
    canvasRef.value.height = height
    ctx = canvasRef.value.getContext('2d')
    initStars()
  }

  const initStars = () => {
    const layers = [
      { count: 150, size: 0.8, speed: 0.1, color: '#443366' },
      { count: 100, size: 1.2, speed: 0.3, color: '#ffffff' },
      { count: 30, size: 2.5, speed: 0.8, color: '#ff2e63' },
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
  .starry-canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
