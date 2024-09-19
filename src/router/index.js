import { createRouter, createWebHashHistory } from 'vue-router'
// import Layout from '@/jz-layout/index.vue'
import Layout from '@/views/layout/index.vue'
// import NProgress from 'nprogress'


// 同步路由
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: 'router.home',
          icon: 'home',
          sid: 'home'
        }
      }
    ]
  },
  // {
  //   path: '/',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'test',
  //       component: () => import('@/views/test/index.vue'),
  //       name: 'test',
  //       meta: {
  //         title: '测试功能页面',
  //         icon: 'test',
  //         sid: 'test'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/login',
    component: () => import('@/views/Login/index.vue'),
    hidden: true,
    name: 'login'
  },
  {
    path: '/',
    name: 'default',
    component: Layout,
    redirect: '/home'
  }
]

// 异步路由
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'first',
        component: () => import('@/views/FirstMenu/index.vue'),
        name: 'first',
        meta: {
          title: '功能菜单一',
          icon: 'area',
          sid: 'first'
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'second',
        component: () => import('@/views/SecondMenu/index.vue'),
        name: 'second',
        meta: {
          title: '功能菜单二',
          icon: 'area',
          sid: 'second'
        }
      }
    ]
  },
  {
    path: '/',
    redirect: '/third/menuOne',
    component: Layout,
    name: 'third',
    meta: {
      title: 'router.third',
      icon: 'area',
      sid: 'third'
    },
    children: [
      {
        path: 'menuOne',
        component: () => import('@/views/ThirdMenu/menuOne.vue'),
        name: 'menuOne',
        meta: {
          title: 'router.menuOne',
          icon: 'area',
          sid: 't-menuOne',
          pid: 'third'
        }
      },
      {
        path: 'menuTwo',
        component: () => import('@/views/ThirdMenu/menuTwo.vue'),
        name: 'menuTwo',
        meta: {
          title: 'router.menuTwo',
          icon: 'area',
          sid: 't-menuTwo',
          pid: 'third'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

// router.beforeEach(async (to, from, next) => {
//   // NProgress.start()
//   console.log('router.beforeEach:', to);
//   if (to.path === '/') {
//     next('home')
//   } else {
//     next()
//     // NProgress.done()
//   }
// })

export default router