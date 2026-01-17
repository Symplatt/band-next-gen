// 引入路由
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue' // 首页
import CharactersView from '@/views/CharactersView.vue' // 角色
import RelationsView from '@/views/RelationsView.vue' // 关系
import ChronicleView from '@/views/ChronicleView.vue' // 纪事
import AboutView from '@/views/AboutView.vue' // 关于
import NotFound from '@/views/NotFound.vue' // 页面不存在



const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/characters',
      name: 'characters',
      component: () => import('@/views/CharactersView.vue')
    },
    {
        path: '/char-detail/:id',
        name: 'char-detail',
        component: () => import('@/views/CharacterDetailView.vue'),
        props: true
    },
    {
      path: '/relations',
      name: 'relations',
      component: () => import('@/views/RelationsView.vue'),
    },
    {
      path: '/chronicle',
      name: 'chronicle',
      component: () => import('@/views/ChronicleView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
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

  ],
  scrollBehavior(to, from, savedPosition ){
    return savedPosition  || { top: 0 }
  }
})

export default router