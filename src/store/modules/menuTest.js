
import router from '@/router/index.js'
import { asyncRoutes, constantRoutes } from '@/router/index.js'
import { getUserData } from '@/api/user.js'
import { getSetPermissionRoutes, filterAsyncRoutes, formatMenuAndBtn } from 'verdaccio-demo-publish'

const states = {
  name: '',
  // 菜单路由
  dirs: [], // 目录级别数组，包含菜单级别数组
  permissions: [], // 按钮级别数组
  addRoutes: [],
  permissionRoutes: []
}

const mutations = {
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_DIRS: (state, dirs) => {
    state.dirs = dirs
  },
  SET_PERMISSIONS: (state, perms) => {
    state.permissions = perms
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    console.log('state.routes', state.routes)
    console.log('constantRoutes', constantRoutes)
  },
  SET_PERMISSION_ROUTES: (state, routes) => {
    state.permissionRoutes = routes
    let dNames = localStorage.getItem('menuList').split(',')
    state.permissionRoutes = getSetPermissionRoutes(routes, constantRoutes, dNames)
    console.info('SET_PERMISSION_ROUTES：', constantRoutes, state.permissionRoutes)
  }
}

const actions = {
  // user login
  login({ commit, dispatch }, userInfo) {
    console.log('menu/login', userInfo)
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      getUserData({ account: account.trim(), password })
        .then((response) => {
          const resule = response.data
          let resMsg = {}
          console.log('response', response);
          if (resule.code === 0) {
            console.log('登录成功', resule)
            // commit('SET_TOKEN', response.data.token) // 存储token
            //   // 存储账户信息
            commit('SET_NAME', resule.name)
            // 菜单和按钮数据
            const { menuArr, btnArr } = formatMenuAndBtn(resule.data.roles)
            let menuList = [...new Set(menuArr)]
            let btnList = [...new Set(btnArr)]
            console.log('用户菜单名称列表,按钮名称列表', menuList, btnList)
            commit('SET_PERMISSIONS', btnList)
            localStorage.setItem('menuList', menuList)
            localStorage.setItem('btnList', btnList)
            localStorage.setItem('isLogin', true)
            localStorage.setItem('userId', resule.data.id)
            let accessedRoutes = []
            accessedRoutes = filterAsyncRoutes(asyncRoutes, menuList) || []
            console.log('路由列表', accessedRoutes)
            commit('SET_ROUTES', accessedRoutes)
            commit('SET_PERMISSION_ROUTES', accessedRoutes)
            commit('SET_DIRS', menuList)
            accessedRoutes.forEach((element) => {
              router.addRoute(element)
            })
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
  generateRoutes({ commit }, dirs) {
    return new Promise((resolve) => {
      // 1. 按钮数据
      let btnList = localStorage.getItem('btnList').split(',')
      commit('SET_PERMISSIONS', btnList)
      console.info('page button permissions:', states.permissions)
      // 2. 菜单数据
      let dNames = localStorage.getItem('menuList').split(',')
      // 3. 路由数据 
      let accessedRoutes = []
      accessedRoutes = filterAsyncRoutes(asyncRoutes, dNames)
      commit('SET_ROUTES', accessedRoutes)
      console.info('final accessed routes: ', accessedRoutes)
      commit('SET_PERMISSION_ROUTES', accessedRoutes)
      // commit('SET_ROUTES', asyncRoutes)
      resolve(accessedRoutes)
    })
  },
}

export default {
  namespaced: true,
  state: states,
  mutations,
  actions
}