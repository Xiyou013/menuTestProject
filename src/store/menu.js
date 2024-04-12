const { hasPermission, filterAsyncRoutes, getSetPermissionRoutes, formatMenuAndBtn } = require('../menu.js')
// import router from '../router/index.js'

const states = {
  asyncRoutes: [], // router带来的异步路由
  constantRoutes: [], // router带来的同步路由
  label: '', // 自定义按钮判断标志
  userInfo: {
    name: '',
    menuList: [], // 用户菜单名称列表
    btnList: [], // 用户按钮名称列表
    permissionRoutes: [], // 所有拥有权限的菜单路由
    accessedRoutes: [] // 最终根据菜单列表整理出来的异步路由
  }
}

const mutations = {
  SET_LABEL: (state, label) => {
    state.label = label
  },
  SET_NAME: (state, name) => {
    state.userInfo.name = name
  },
  SET_MENULIST: (state, menuList) => {
    state.userInfo.menuList = menuList
  },
  SET_BTNLIST: (state, btnList) => {
    state.userInfo.btnList = btnList
  },
  SET_ACCESSEDROUTES: (state, routes) => {
    state.userInfo.accessedRoutes = routes
  },
  SET_PERMISSION_ROUTES: (state, routes) => {
    state.userInfo.permissionRoutes = routes
    let dNames = localStorage.getItem('menuList').split(',')
    state.userInfo.permissionRoutes = getSetPermissionRoutes(routes, state.constantRoutes, dNames)
  },
  SET_ASYNCROUTES: (state, routes) => {
    state.asyncRoutes = routes
  },
  SET_CONSTANTROUTES: (state, routes) => {
    state.constantRoutes = routes
  },
}

const actions = {
  // 获取并存储同步及异步路由
  getASYandCONRouter({ commit }, params) {
    commit('SET_ASYNCROUTES', params.asyncRoutes)
    commit('SET_CONSTANTROUTES', params.constantRoutes)
  },
  // 登录初始化对用户数据进行处理
  onLocStorageMenuInfo({ commit }, resData) {
    const { resule, roles } = resData
    const { menuArr, btnArr } = formatMenuAndBtn(roles)
    let menuList = [...new Set(menuArr)]
    let btnList = [...new Set(btnArr)]

    localStorage.setItem('menuList', menuList)
    localStorage.setItem('btnList', btnList)
    localStorage.setItem('isLogin', true)
    localStorage.setItem('userId', resule.id)

    commit('SET_NAME', resule.name)
    let addRoutes = filterAsyncRoutes(states.asyncRoutes, menuList) || []
    commit('SET_ACCESSEDROUTES', addRoutes)
    commit('SET_PERMISSION_ROUTES', states.userInfo.accessedRoutes)
    commit('SET_MENULIST', menuList)
    commit('SET_BTNLIST', btnList)
    console.log('用户菜单名称列表,按钮名称列表---npm', states.userInfo)
    return states.userInfo
  },
  // 二次初始化获取按钮、菜单及路由数据整理
  onGenerateRoutes({ commit }, resData) {
    // 1. 按钮数据
    let btnList = localStorage.getItem('btnList').split(',')
    commit('SET_BTNLIST', btnList)
    // 2. 菜单数据
    let dNames = localStorage.getItem('menuList').split(',')
    commit('SET_MENULIST', dNames)
    // 3. 路由数据
    let addRoutes = filterAsyncRoutes(states.asyncRoutes, dNames) || []
    commit('SET_ACCESSEDROUTES', addRoutes)
    commit('SET_PERMISSION_ROUTES', states.userInfo.accessedRoutes)
    console.log('states.userInfo', states.userInfo);
    return states.userInfo
  },
  // 路由整合
  getRouters({ commit }, route) {
    states.userInfo.accessedRoutes.forEach((element) => {
      route.addRoute(element)
    })
    return route.getRoutes()
  },
  // 登录初始化
  async initialization({ commit, dispatch }, params) {
    const { asyncRoutes, constantRoutes, resule, roles, router } = params
    const asyAndConRouter = { asyncRoutes, constantRoutes }
    const locStorageMenuInfo = { resule, roles }

    await dispatch('getASYandCONRouter', asyAndConRouter)
    await dispatch('onLocStorageMenuInfo', locStorageMenuInfo)
    await dispatch('getRouters', router)
  },
  // 二次初始化
  async secondaryCall({ commit, dispatch }, params) {
    const { asyncRoutes, constantRoutes, resule, roles, router } = params
    const asyAndConRouter = { asyncRoutes, constantRoutes }

    await dispatch('getASYandCONRouter', asyAndConRouter)
    await dispatch('onGenerateRoutes')
    await dispatch('getRouters', router)
  }
}

module.exports = {
  namespaced: true,
  state: states,
  mutations,
  actions
}