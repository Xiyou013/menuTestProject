// import { ElMessage } from 'element-plus'
// import { asyncRoutes, constantRoutes } from '@/router/index.js'
// import NProgress from 'nprogress' // progress bar
// import router from './router/index'
// import store from './store'
// import { menu } from 'verdaccio-demo-publish'
// import 'nprogress/nprogress.css' // progress bar style

// NProgress.configure({ showSpinner: false }) // NProgress Configuration
// // 跳过对下一行代码的检测
// // eslint-disable-next-line
// router.beforeEach(async (to, from, next) => {
//   NProgress.start()
//   const isLogin = localStorage.getItem('isLogin')
//   console.log('是否登录', isLogin)
//   console.log('constantRoutes', constantRoutes, constantRoutes.length);
//   const length = menu.getConstantRoutesSum(constantRoutes)
//   console.log('length', length);
//   if (isLogin) {
//     try {
//       console.log('路由长度', router.getRoutes())
//       if (router.getRoutes() && router.getRoutes().length > length) {
//         // console.error('next to route', to)
//         // console.error('getRoutes:', router.getRoutes())
//         // next()
//         if (to.path === '/') {
//           next('home')
//         } else {
//           next()
//           NProgress.done()
//         }
//         NProgress.done()
//       } else {
//         await store.dispatch('menu/generateRoutes')
//         // const { accessedRoutes } = await store.dispatch('menu/generateRoutes')
//         // console.log('路由数据：', accessedRoutes);
//         // accessedRoutes.forEach((element) => {
//         //   router.addRoute(element)
//         // })
//         // console.log('router', router.getRoutes());

//         // await menu.store.dispatch('menu/getRouters', router)
//         next({ ...to, replace: true })
//       }
//     } catch (error) {
//       console.error('error：', error)
//       // ElMessage.error(error || 'Has Error')
//       next(`/login`)
//       NProgress.done()
//     }
//   } else {
//     if (to.path === '/login') {
//       next()
//     } else {
//       next(`/login`)
//       NProgress.done()
//     }
//   }
// })
// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
