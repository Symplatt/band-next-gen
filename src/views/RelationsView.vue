<template>
  <div class="relations-view">
    <!-- 左侧目录导航组件，传入配置和当前激活状态 -->
    <SidebarNav :navItems="navItems" :activeSection="activeSection" @scrollTo="handleScrollTo" />

    <div class="page-container">
      <!-- 第一部分：称呼表子组件 -->
      <SectionTitle title="称呼表" />
      <CallTable id="section-table" :memberList="memberList" :callTable="callTable" />

      <!-- 第二部分：关系网子组件 -->
      <SectionTitle title="关系网" />
      <RelationNetwork id="section-network" :memberList="memberList" />

      <!-- 第三部分：亲缘谱子组件 -->
      <SectionTitle title="亲缘谱" />
      <FamilyTree id="section-family" :familyData="familyData" />

      <!-- 特殊注释 -->
      <SpecialNoteBox note-content="本页面所展示的立绘皆截取自鹤星发布于各平台的作品" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  // 引入子组件
  import SidebarNav from '@/components/relations/SidebarNav.vue'
  import SectionTitle from '@/components/relations/SectionTitle.vue'
  import CallTable from '@/components/relations/CallTable.vue'
  import RelationNetwork from '@/components/relations/RelationNetwork.vue'
  import FamilyTree from '@/components/relations/FamilyTree.vue'
  // 引入源数据
  import relationData from '@/assets/data/relations.json'

  // 计算扁平化的成员列表，供各子组件使用
  const memberList = computed(() => {
    return relationData.characters.flatMap((g) => g.members)
  })

  // 提取称呼表数据
  const callTable = relationData.callTable

  // 提取族谱数据
  const familyData = relationData.familyTree

  // 导航菜单配置
  const navItems = [
    { id: 'section-table', label: '称呼表' },
    { id: 'section-network', label: '关系网' },
    { id: 'section-family', label: '亲缘谱' },
  ]

  // 当前视口中激活的版块ID
  const activeSection = ref('section-table')

  // 处理侧边栏点击滚动事件
  const handleScrollTo = (id: string) => {
    // 立即更新激活状态
    activeSection.value = id
    const el = document.getElementById(id)
    if (el) {
      // 获取全局变量中的导航栏高度，默认60px
      const headerHeight = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')
        .trim()
      const baseOffset = parseInt(headerHeight || '60')
      // 计算目标位置，留出顶部余量
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - baseOffset - 20

      // 执行平滑滚动
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  // 监听滚动事件，更新侧边栏激活状态
  const handleScroll = () => {
    const threshold = 300 // 滚动触发阈值
    const scrollY = window.scrollY

    for (const item of navItems) {
      const section = document.getElementById(item.id)
      if (section) {
        // 手机端如果隐藏了关系网模块，则跳过该模块的高亮判断
        if (window.innerWidth <= 768 && item.id === 'section-network') continue

        const { offsetTop, offsetHeight } = section
        // 判断当前滚动位置是否在版块范围内
        if (scrollY >= offsetTop - threshold && scrollY < offsetTop + offsetHeight - threshold) {
          activeSection.value = item.id
        }
      }
    }
  }

  onMounted(() => {
    // 绑定滚动监听
    window.addEventListener('scroll', handleScroll)

    // 创建观察器，用于触发标题的淡入动画
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 当元素进入视口时添加 visible 类
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // 动画触发后停止观察
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    // 延时等待子组件挂载完成后，选取所有标题元素进行观察
    setTimeout(() => {
      document.querySelectorAll('.section-title').forEach((el) => observer.observe(el))
    }, 100)
  })

  onUnmounted(() => {
    // 销毁组件时移除监听
    window.removeEventListener('scroll', handleScroll)
  })
</script>

<style scoped>
  /* 页面主容器样式 */
  .relations-view {
    position: relative;
    width: 100%;
    min-height: 100vh;
    padding-bottom: 100px;
    overflow-x: hidden;
    color: #fff;
    background-color: #0b0c10;
  }

  /* 移动端适配 */
  @media (width <= 768px) {
    .page-container {
      padding: 0 20px;
    }
  }
</style>
