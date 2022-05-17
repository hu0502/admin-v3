import { RouteRecordRaw, RouterView } from "vue-router";

export const systemRoute: RouteRecordRaw = {
  path: '/System',
  name: 'System',
  meta:{
    level:0,
    title: '系统管理',
    icon: 'Menu',
  },
  component: RouterView,
  children: [
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
}
    


