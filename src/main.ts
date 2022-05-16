import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia, storeToRefs } from 'pinia'
import { userStoreInstance } from '@/store/user'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
/**
 * 路由拦截
 */
router.beforeEach((to, from, next) => {
  const userStore = userStoreInstance()
  const { token } = storeToRefs(userStore)
  if (to.meta.auth) {
    if (!token) {
      return router.replace({
        name: 'UserLogin'
      })
    }
    next()
  } else {
    next()
  }
})
app.use(createPinia()).use(ElementPlus).use(router).mount('#app')

