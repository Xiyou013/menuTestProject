
import router from '@/router/index.js'
import { asyncRoutes, constantRoutes } from '@/router/index.js'
import { getUserData } from '@/api/user.js'
import { menu } from 'verdaccio-demo-publish'

const states = {
}

const mutations = {
}



const actions = {
  // user login
  login({ commit, dispatch }, userInfo) {
    console.log('menu/login', userInfo)
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      getUserData({ account: account.trim(), password })
        .then(async (response) => {
          const resule = response.data.data
          let resMsg = {}
          console.log('response', response);
          if (response.data.code === 0) {
            console.log('登录成功', resule)
            let params = { asyncRoutes, constantRoutes, resule, roles: resule.roles, router }
            await menu.store.dispatch('menu/initialization', params)
            console.log('获取最终菜单列表', router.getRoutes())
          }
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
}

export default {
  namespaced: true,
  state: states,
  mutations,
  actions
}