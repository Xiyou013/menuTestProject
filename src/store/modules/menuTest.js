
import router from '@/router/index.js'
import { asyncRoutes, constantRoutes } from '@/router/index.js'
import { getUserData } from '@/api/user.js'
import { menu } from 'verdaccio-demo-publish'

const states = {
  permissionsMenu: [] // 处理好格式的菜单数据，用于接口权限树上传，包含路由和按钮两类
}

const mutations = {
  SET_PERMISSIONSMENU: (state, permissionsMenu) => {
    state.permissionsMenu = permissionsMenu
    console.log('state.permissionsMenu', state.permissionsMenu);
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
          console.log('response--1111', response);
          if (response.data.code === 0) {
            console.log('登录成功', resule)
            // {异步路由，同步路由，接口返回的权限数据，返回的前端权限，路由对象}
            let params = { asyncRoutes, constantRoutes, resule, roles: resule.roles, router }
            console.log('resule', resule);
            // const menuList = [...constantRoutes, ...asyncRoutes]
            // console.log('99999999');
            // let permissionsMenu = await menu.store.dispatch('menu/formatRouter', menuList)
            // commit('SET_PERMISSIONSMENU', permissionsMenu)
            // console.log('88888888888');

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
  setPermissionsMenu({ commit }, permissionsMenu) {
    commit('SET_PERMISSIONSMENU', permissionsMenu)
  }
}

export default {
  namespaced: true,
  state: states,
  mutations,
  actions
}