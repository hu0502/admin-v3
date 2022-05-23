import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { userRoute } from '@/router/modules/user';
import { systemRoute } from '@/router/modules/system';
import { orderRoute } from '@/router/modules/order';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true
    },
    component: () => import('@/views/HomeView.vue'),
    children: [
      userRoute,
      orderRoute,
      systemRoute,
    ]
  },
  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: () => import('@/views/UserView/UserLogin.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
