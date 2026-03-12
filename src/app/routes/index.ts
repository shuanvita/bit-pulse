import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/pages/home'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
