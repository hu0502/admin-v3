import { RouteRecordRaw, RouterView } from 'vue-router'

export const userRoute: RouteRecordRaw = {
  path: '/User',
  name: 'User',
  meta:{
    level:0,
    title: '用户管理',
    icon: 'Menu',
  },
  component: RouterView,
  children: [
    {
        path: '/User/UserList',
        name: 'UserList',
        meta: {
            group: 'User',
            title: '用户列表',
            icon: 'list',
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
  ]
}
    


