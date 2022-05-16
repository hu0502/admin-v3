import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true
    },
    component: () => import('@/views/HomeView.vue'),
    children: [
      {
        path: '/User/UserList',
        name: 'UserList',
        meta: {
          group: 'User',
          title: '用户列表',
          icon: 'list'
        },
        component: () => import('@/views/UserView/UserList.vue')
      },
      {
        path: '/User/UserInfo',
        name: 'UserInfo',
        meta: {
          group: 'User',
          title: '个人信息',
          icon: 'Avatar'
        },
        component: () => import('@/views/UserView/UserInfo.vue')
      },
      {
        path: '/Order/OrderList',
        name: 'OrderList',
        meta: {
          group: 'Order',
          title: '商品列表',
          icon: 'grid'
        },
        component: () => import('@/views/OrderView/OrderList.vue')
      },
      {
        path: '/System/SystemInfo',
        name: 'SystemInfo',
        meta: {
          group: 'System',
          title: '系统信息',
          icon: 'info-filled'
        },
        component: () => import('@/views/SystemView/SystemInfo.vue')
      }
    ]
  },
  {
    path: '/UserLogin',
    name: 'UserLogin',
    component: () => import('@/views/UserView/UserLogin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
