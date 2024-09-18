import Cookies from 'js-cookie'

import { hasPermission, filterAsyncRoutes, getSetPermissionRoutes, formatMenuAndBtn } from '../menu.js'
// const { hasPermission, filterAsyncRoutes, getSetPermissionRoutes, formatMenuAndBtn } = require('../menu.js')
// import router from '../router/index.js'

const states = {
  asyncRoutes: [],        // router带来的异步路由
  constantRoutes: [],     // router带来的同步路由
  label: '',              // 自定义按钮判断标志
  userInfo: {
    name: '',
    menuList: [],         // 用户菜单名称列表
    btnList: [],          // 用户按钮名称列表
    permissionRoutes: [], // 所有拥有权限的菜单路由
    accessedRoutes: []    // 最终根据菜单列表整理出来的异步路由
  },
  // 菜单侧边缩放状态
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  permissionsMenu: []     // 处理好格式的菜单数据，用于接口权限树上传，包含路由和按钮两类
}

// permissionsMenu菜单数据中的类别
const permissionType = {
  menu: 1, // 菜单
  btn: 2  // 按钮
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
    // 所有权限路由整合
    state.userInfo.permissionRoutes = getSetPermissionRoutes(routes, state.constantRoutes, dNames)
  },
  SET_ASYNCROUTES: (state, routes) => {
    state.asyncRoutes = routes
  },
  SET_CONSTANTROUTES: (state, routes) => {
    state.constantRoutes = routes
  },
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
  SET_PERMISSIONSMENU: (state, permissionsMenu) => {
    state.permissionsMenu = permissionsMenu
    console.log('state.permissionsMenu', state.permissionsMenu);
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
    // 将权限里的菜单和按钮类别分离出来
    const { menuArr, btnArr } = formatMenuAndBtn(roles)
    let menuList = [...new Set(menuArr)]
    let btnList = [...new Set(btnArr)]

    localStorage.setItem('menuList', menuList)
    localStorage.setItem('btnList', btnList)
    localStorage.setItem('isLogin', true)
    localStorage.setItem('userId', resule.id)

    commit('SET_NAME', resule.name)
    // 获取有权限的异步路由
    let addRoutes = filterAsyncRoutes(states.asyncRoutes, menuList) || []
    // 所有有权限的异步路由
    commit('SET_ACCESSEDROUTES', addRoutes)
    // 有权限的异步+同步路由
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
    console.log('addRoutes', addRoutes);
    commit('SET_ACCESSEDROUTES', addRoutes)
    commit('SET_PERMISSION_ROUTES', states.userInfo.accessedRoutes)
    console.log('states.userInfo', states.userInfo);
    return states.userInfo
  },
  // 路由整合
  getRouters({ commit }, route) {
    console.log('route', route);
    console.log('states.userInfo.accessedRoutes', states.userInfo.accessedRoutes);
    states.userInfo.accessedRoutes.forEach((element) => {
      // 路由重新整合
      route.addRoute(element)
    })
    console.log('route.getRoutes()', route.getRoutes());
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
  },
  // 菜单侧边隐藏/展示控制
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  // 权限树缓存
  setPermissionsMenu({ commit }, permissionsMenu) {
    commit('SET_PERMISSIONSMENU', permissionsMenu)
  },
  // 处理路由结构，将路由转变为对象obj{}，便于权限树上传
  async formatRouter({ commit, dispatch }, data) {
    console.log('data', data)
    let res = []
    let obj = {}
    let temp = []
    for (let i = 0; i < data.length; i++) {
      obj = {}
      // 如果是二级菜单，将二级菜单的父菜单进行修改
      // id：标识  sid：唯一标识  title：路由名称  type_int：当前权限类别(1：菜单，2：按钮) pid：父菜单的sid  type：三级菜单中，最外层的父菜单的sid(也就是一级菜单的sid,但是在类型结构上，一级菜单被单独列出去，由tabs展示，不在router数据当中了)
      if (data[i]?.meta && Object.keys(data[i]?.meta).length > 0) {
        obj.id = data[i]?.meta.sid || ''
        obj.title = data[i]?.meta.title || ''
        obj.sid = data[i]?.meta.sid || ''
        obj.type_int = permissionType.menu || ''
        obj.pid = data[i]?.meta.pid || ''
        obj.type = data[i]?.meta.type || ''
        // obj.children = []
      }
      // 二级菜单下的子菜单和一级菜单的obj{}修改
      if (data[i]?.children && data[i]?.children.length > 0) {
        // 二级菜单的子菜单
        if (Object.keys(obj).length > 0) {
          // eslint-disable-next-line no-loop-func
          data[i]?.children.forEach((element) => {
            temp.push({
              id: element?.meta?.sid || '',
              title: element?.meta?.title || '',
              sid: element?.meta?.sid || '',
              type_int: permissionType.menu || '',
              pid: obj.sid || '',
              type: element?.meta.type || ''
              // children: btn.filter((item) => item.pid === element?.meta?.sid)
            })
          })
        } else {
          // 一级菜单
          obj.id = data[i]?.children[0]?.meta?.sid || ''
          obj.title = data[i]?.children[0]?.meta?.title || ''
          obj.sid = data[i]?.children[0]?.meta?.sid || ''
          obj.type_int = permissionType.menu || ''
          obj.pid = data[i]?.children[0]?.meta?.pid || ''
          obj.type = data[i]?.children[0]?.meta?.type || ''
          // eslint-disable-next-line no-loop-func
          // obj.children = btn.filter((item) => item.pid === obj.sid)
        }
      }
      // 将修改好的obj{}存入res数组中
      if (Object.keys(obj).length > 0) {
        // temp[obj.sid] = obj
        res.push(obj)
      }
    }
    // 最后将所有修改好的权限整合缓存并返回
    res = [...res, ...temp]
    // 权限树缓存
    commit('SET_PERMISSIONSMENU', res)
    return res
  }
}

// module.exports = {
//   namespaced: true,
//   state: states,
//   mutations,
//   actions
// }
export default {
  namespaced: true,
  state: states,
  mutations,
  actions
}