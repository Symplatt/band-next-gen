// router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // 路由懒加载：只有访问该路由时才加载对应文件
      component: () => import('@/views/HomeView.vue'),
      meta: { keepAlive: true } // 标记需要缓存的页面
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('@/views/CharactersView.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/char-detail/:id',
      name: 'char-detail',
      component: () => import('@/views/CharacterDetailView.vue'),
      props: true
      // 详情页通常不需要缓存，或者需要根据ID缓存，这里暂不开启
    },
    {
      path: '/relations',
      name: 'relations',
      component: () => import('@/views/RelationsView.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/chronicle',
      name: 'chronicle',
      component: () => import('@/views/ChronicleView.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        title: '404',
        hideFooter: true,
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router