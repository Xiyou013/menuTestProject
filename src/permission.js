import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getConstantRoutesSum } from './menu'
// const { store } = require('./store/index.js')
import { store } from './store/index.js'

// 路由拦截
// (路由对象, { 异步路由, 同步路由, 未登录时跳转的页面路径, 登陆后跳转的页面路径 })
const routerPermisssion = (router, { asyncRoutes, constantRoutes, login, home }) => {
  // 上方加载进度条
  NProgress.configure({ showSpinner: false }) // NProgress Configuration
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const isLogin = localStorage.getItem('isLogin')
    // 获取同步路由数量
    const length = getConstantRoutesSum(constantRoutes)
    console.log('length:', length);
    // 是否登录
    if (isLogin) {
      try {
        console.log('constantRoutes:', constantRoutes);
        console.log('router.getRoutes():', router.getRoutes(), router.getRoutes().length);
        // 路由对象存在，且当前获取到的路由权限比同步路由数量大，进行页面跳转
        if (router.getRoutes() && router.getRoutes().length > length) {
          // 当前跳转路径为/，则跳转至设定到的跳转地址
          // 或者直接跳转至当前存在的路径地址
          if (to.path === '/') {
            next(home)
          } else {
            next()
            NProgress.done()
          }
          NProgress.done()
        } else {
          // 当前获取到的路由权限比同步路由数量一致或小，则重新获取当前登录账号的路由权限
          // 再次尝试跳转进入拦截判断
          let params = { asyncRoutes, constantRoutes, router }
          console.log('params', params);
          store.dispatch('menu/secondaryCall', params)
          next({ ...to, replace: true })
        }
      } catch (error) {
        // 跳转出错则重新跳转至设定好的页面地址
        next(login)
        NProgress.done()
      }
    } else {
      // 如果没有登陆，当前是设定好的"login",就跳转到设定好的地址；不是也跳转到设定好的地址
      if (to.path === login) {
        next()
      } else {
        next(login)
      }
      NProgress.done()
    }
  })
}

export {
  routerPermisssion
}
// module.exports = {
//   routerPermisssion
// }