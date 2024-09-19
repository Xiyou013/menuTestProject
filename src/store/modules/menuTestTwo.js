
import router from '@/router/index.js'
import Cookies from 'js-cookie'
import { asyncRoutes, constantRoutes } from '@/router/index.js'
import { getUserData } from '@/api/user.js'
import { menu } from 'verdaccio-demo-publish'

const states = {
  // 这里是侧边菜单缩放/展开控制元素
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
}

const mutations = {
  TOGGLE_SIDEBAR: (state) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    console.log('state.sidebar', state.sidebar);
  },
}



const actions = {
  // user login
  login({ commit, dispatch }, userInfo) {
    console.log('menu/login', userInfo)
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      // 拿传过来的值，调用mock，去本地接口数据筛选获取
      getUserData({ account: account.trim(), password })
        .then(async (response) => {
          const resule = response.data.data
          let resMsg = {}
          console.log('response', response);
          if (response.data.code === 0) {
            console.log('登录成功', resule)
            // {异步路由，同步路由，接口返回的权限数据，返回的前端权限，路由对象}
            let params = { asyncRoutes, constantRoutes, resule, roles: resule.roles, router }
            // 调用插件的权限初始化函数
            await menu.store.dispatch('menu/initialization', params)
            console.log('获取最终菜单列表', router.getRoutes())
          }
          // 用户数据获取到后，返回数据结构体
          resMsg = {
            code: response.data.code,
            msg: response.data.message
          }
          resolve(resMsg)
        })
        .catch((error) => {
          console.info('Promise catch', error)
          reject(error)
        })
    })
  },
  // generateRoutes({ commit }, dirs) {
  //   console.log('5555555555');
  //   let params = { asyncRoutes, constantRoutes, router }
  //   menu.store.dispatch('menu/secondaryCall', params)
  // },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
}

export default {
  namespaced: true,
  state: states,
  mutations,
  actions
}