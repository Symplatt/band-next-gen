// src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue' // 首页
import CharactersView from '@/views/CharactersView.vue' // 角色
import RelationsView from '@/views/RelationsView.vue' // 关系
import ChronicleView from '@/views/ChronicleView.vue' // 纪事
import AboutView from '@/views/AboutView.vue' // 关于
import NotFound from '@/views/NotFound.vue' // 页面不存在

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharactersView
    },
    {
      path: '/relations',
      name: 'relations',
      component: RelationsView
    },
    {
      path: '/chronicle',
      name: 'chronicle',
      component: ChronicleView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/theme',
      name: 'theme',
      component: () => import('@/views/ThemeTemptView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        title: '404',
        description: '页面不存在',
        hideFooter: true,
      }
    }

  ]
})

export default router