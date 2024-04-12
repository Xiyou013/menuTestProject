import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getConstantRoutesSum } from './menu'
const { store } = require('./store/index.js')

const routerPermisssion = (router, { asyncRoutes, constantRoutes, login, home }) => {
  NProgress.configure({ showSpinner: false }) // NProgress Configuration
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const isLogin = localStorage.getItem('isLogin')
    const length = getConstantRoutesSum(constantRoutes)
    if (isLogin) {
      try {
        if (router.getRoutes() && router.getRoutes().length > length) {
          if (to.path === '/') {
            next(home)
          } else {
            next()
            NProgress.done()
          }
          NProgress.done()
        } else {
          let params = { asyncRoutes, constantRoutes, router }
          store.dispatch('menu/secondaryCall', params)
          next({ ...to, replace: true })
        }
      } catch (error) {
        next(login)
        NProgress.done()
      }
    } else {
      if (to.path === login) {
        next()
      } else {
        next(login)
      }
      NProgress.done()
    }
  })
}

module.exports = {
  routerPermisssion
}