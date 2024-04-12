import { createApp } from 'vue'
// import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store/index'
import router from './router/index'
// import './permission'
import './mock/index.js'
// import hasPermission from './utils/btnPermission.js' // vite.config.js配置utils别名
import { hasPermission, getPermissionLabel, routerPermisssion } from 'verdaccio-demo-publish'
import App from './App.vue'

import { asyncRoutes, constantRoutes } from '@/router/index.js'

console.log('routerPermisssion', routerPermisssion);

const app = createApp(App)
routerPermisssion(router, { asyncRoutes, constantRoutes, login: '/login', home: '/home' })
getPermissionLabel('has')
app.use(ElementPlus).use(router).use(store).use(hasPermission).mount('#app')
