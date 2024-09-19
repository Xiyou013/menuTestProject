import { createApp } from 'vue'
// import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// jz-menu菜单插件
import menuTestProject from 'menu-test-project'
// jz-menu菜单样式
import 'menu-test-project/index.css'

import store from './store/index'
import router from './router/index'

import I18n from '@/lang/i18n.js'

import './mock/index.js'

// menu插件函数
import { hasPermission, getPermissionLabel, routerPermisssion } from 'verdaccio-demo-publish'

import App from './App.vue'

// 异步同步路由
import { asyncRoutes, constantRoutes } from '@/router/index.js'
// svg图片插件
import { svgInstall } from 'svg-component'

console.log('svgInstall', svgInstall);
console.log('routerPermisssion', routerPermisssion);

const app = createApp(App)

// 路由拦截方法
// （路由对象，{异步路由，同步路由，自定义登录地址，自定义初始加载地址}）
routerPermisssion(router, { asyncRoutes, constantRoutes, login: '/login', home: '/home' })
// 设置自定义按钮权限标识，v-bind指令
getPermissionLabel('has')

app.use(I18n)
app.use(menuTestProject)
app.use(svgInstall)
app.use(ElementPlus).use(router).use(store).use(hasPermission).mount('#app')
