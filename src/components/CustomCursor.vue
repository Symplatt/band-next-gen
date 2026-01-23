<!-- 鼠标光标特殊样式，不好看，该文件作废 -->

<!-- <template>
  <div class="cursor-wrapper">
    <canvas ref="canvasRef" class="particle-canvas"></canvas>

    <div
      ref="cursorRef"
      class="custom-arrow"
      :class="{ hovering: isHovering, hidden: isHidden }"
      :style="cursorStyle"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L21 9L12 12L9 21L2 2Z"
          fill="#d4af37"
          stroke="white"
          stroke-width="1.5"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted, computed } from 'vue'

  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const mouseX = ref(-100)
  const mouseY = ref(-100)
  const cursorX = ref(-100)
  const cursorY = ref(-100)

  const isHovering = ref(false)
  const isHidden = ref(true)

  const GOLD_COLORS = [
    'rgba(212, 175, 55, 1)',
    'rgba(255, 215, 0, 0.8)',
    'rgba(184, 134, 11, 0.6)',
    'rgba(255, 255, 200, 0.5)',
  ]

  class Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    life: number
    decay: number

    constructor(x: number, y: number) {
      this.x = x
      this.y = y

      this.size = Math.random() * 2 + 0.5

      this.color = GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)]

      this.speedX = (Math.random() - 0.5) * 1.5
      this.speedY = (Math.random() - 0.5) * 1.5 + 0.5

      this.life = 1.0

      this.decay = Math.random() * 0.02 + 0.015
    }

    update() {
      this.x += this.speedX
      this.y += this.speedY
      this.life -= this.decay
      this.size *= 0.95
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

      ctx.fillStyle = this.color
      ctx.globalAlpha = this.life
      ctx.fill()
      ctx.globalAlpha = 1.0
    }
  }

  const particles: Particle[] = []

  const cursorStyle = computed(() => ({
    transform: `translate3d(${cursorX.value}px, ${cursorY.value}px, 0) rotate(-15deg)`,
  }))

  let animationId: number

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor
  }

  const renderLoop = () => {
    if (!canvasRef.value) return

    const ctx = canvasRef.value.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)

    cursorX.value = lerp(cursorX.value, mouseX.value, 0.3)
    cursorY.value = lerp(cursorY.value, mouseY.value, 0.3)

    const dist = Math.hypot(mouseX.value - cursorX.value, mouseY.value - cursorY.value)
    if (dist > 1) {
      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(cursorX.value, cursorY.value))
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.update()
      p.draw(ctx)

      if (p.life <= 0) {
        particles.splice(i, 1)
      }
    }

    animationId = requestAnimationFrame(renderLoop)
  }

  const onMouseMove = (e: MouseEvent) => {
    mouseX.value = e.clientX
    mouseY.value = e.clientY
    isHidden.value = false

    const target = e.target as HTMLElement
    const isClickable =
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      window.getComputedStyle(target).cursor === 'pointer'

    isHovering.value = !!isClickable
  }

  const onMouseLeave = () => {
    isHidden.value = true
  }
  const onMouseEnter = () => {
    isHidden.value = false
  }

  const initCanvas = () => {
    if (canvasRef.value) {
      canvasRef.value.width = window.innerWidth
      canvasRef.value.height = window.innerHeight
    }
  }

  onMounted(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseleave', onMouseLeave)
      document.addEventListener('mouseenter', onMouseEnter)
      window.addEventListener('resize', initCanvas)

      initCanvas()
      renderLoop()

      cursorX.value = -100
      cursorY.value = -100
    } else {
      isHidden.value = true
    }
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseleave', onMouseLeave)
    document.removeEventListener('mouseenter', onMouseEnter)
    window.removeEventListener('resize', initCanvas)
    cancelAnimationFrame(animationId)
  })
</script>

<style scoped>
  .cursor-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none; /* 必须穿透，否则点不到下面的东西 */
  }

  /* 粒子画布 */
  .particle-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }

  /* 箭头本体 */
  .custom-arrow {
    position: fixed;
    top: 0;
    left: 0;

    /* 混合模式：让金色箭头在白色背景下变黑，在黑色背景下发光 */

    /* 如果你不喜欢反色效果，可以删掉 mix-blend-mode */
    filter: drop-shadow(0 0 2px rgb(0 0 0 / 50%));

    /* 修正 SVG 的尖端对齐：通常 SVG 坐标 0,0 就是尖端，不需要太多 margin */
    will-change: transform;
  }

  .custom-arrow svg {
    /* 让 SVG 稍微有点阴影，增加立体感 */
    filter: drop-shadow(0 0 5px rgb(212 175 55 / 60%));
    transition: transform 0.3s ease;
  }

  /* 隐藏状态 */
  .custom-arrow.hidden {
    opacity: 0;
  }

  /* 交互状态：当悬停在按钮上时 */
  .custom-arrow.hovering svg {
    /* 描边颜色变化 */
    stroke: #fff;

    /* 稍微变大，并且旋转角度改变，表示“准备点击” */
    transform: scale(1.2) rotate(10deg);
  }
</style> -->
