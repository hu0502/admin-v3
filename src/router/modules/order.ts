import { RouteRecordRaw, RouterView } from 'vue-router'

export const orderRoute: RouteRecordRaw = {
  path: '/Order',
  name: 'Order',
  meta:{
    level:0,
    title: '商品管理',
    icon: 'Menu',
  },
  component: RouterView,
  children: [
    {
        path: '/Order/OrderList',
        name: 'OrderList',
        meta: {
            group: 'Order',
            title: '商品列表',
            icon: 'grid'
        },
        component: () => import('@/views/OrderView/OrderList.vue')
    }
  ]
}
    


