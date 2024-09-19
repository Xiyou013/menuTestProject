import { createApp } from 'vue'
// import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import App from './App.vue'

import store from './store/index'
import router from './router/index'
import './mock/index.js'
// menu插件函数
import { hasPermission, getPermissionLabel, routerPermisssion, packageView } from 'verdaccio-demo-publish'
// 异步同步路由
import { asyncRoutes, constantRoutes } from '@/router/index.js'
// import useSvgIcon from './package/SvgIcon/index.js'
import I18n from '@/lang/i18n.js'

import App from './App2.vue'

// createApp(App).mount('#app')
const app = createApp(App)

// 路由拦截方法
// （路由对象，{异步路由，同步路由，自定义登录地址，自定义初始加载地址}）
routerPermisssion(router, { asyncRoutes, constantRoutes, login: '/login', home: '/home' })
// 设置自定义按钮权限标识，v-bind指令
getPermissionLabel('has')

app.use(I18n)

// useSvgIcon(app)
app.use(ElementPlus).use(router).use(store).mount('#app')
