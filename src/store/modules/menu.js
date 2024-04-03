
import router from '@/router/index.js'
import { asyncRoutes, constantRoutes } from '@/router/index.js'
import { getUserData } from '@/api/user.js'

const states = {
  name: '',
  // 菜单路由
  dirs: [], // 目录级别数组，包含菜单级别数组
  permissions: [], // 按钮级别数组
  addRoutes: [],
  permissionRoutes: []
}

export function hasPermission(dirs, route) {
  let tmp = []
  route.children.forEach((child) => {
    if (child.meta && child.meta.title) {
      const idx = dirs.indexOf(child.meta.sid)
      // 如果子路由不包含在用户权限内则隐藏
      if (idx === -1) {
        child.hidden = true
      }
    } else {
      child.hidden = true
    }
  })
  tmp.push(route)
  return tmp
}

// routes:完整路由信息 menuList:登录用户拥有的菜单名称数组
export function filterAsyncRoutes(routes, menuList) {
  let res = []
  routes.forEach((route) => {
    if (route.meta && route.meta.title && menuList.indexOf(route.meta.sid) > -1) {
      // 处理二级目录路由信息
      let tmp = hasPermission(menuList, route)
      // 将过滤后的路由信息添加到总的路由数组中
      res = res.concat(tmp)
    } else {
      // 无下拉菜单目录(子菜单)
      if (Array.isArray(route.children)) {
        let single = route.children[0]
        if (single.meta && single.meta.title && menuList.indexOf(single.meta.sid) > -1) {
          // single表示单独显示，而不是嵌套在下拉菜单中
          route.single = true
          res.push(route)
        }
      }
    }
  })
  return res
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
    console.log('state.permissionRoutes11111111', state.permissionRoutes);
    // state.permissionRoutes.unshift(constantRoutes[0])
    // state.permissionRoutes.unshift(...constantRoutes)
    let dNames = localStorage.getItem('menuList').split(',')
    let constantList = []
    constantRoutes.forEach((item) => {
      if (item.children && item.children.length > 0) {
        let tmp = dNames.filter((val) => val === item.children[0].meta.sid)
        if (tmp.length > 0) {
          constantList.push(item)
        }
      }
      if (item.hidden) {
        constantList.unshift(item)
      }
    })
    state.permissionRoutes = constantList.concat(routes)
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
            let menuArr = []
            let btnArr = []
            resule.data.roles.forEach((item) => {
              function transTree(val) {
                val.forEach((it) => {
                  if (it.type === 1) {
                    menuArr.push(it.sid)
                  }
                  if (it.type === 2) {
                    btnArr.push(it.sid)
                  }
                  if (it.children) {
                    transTree(it.children)
                  }
                  if (it.buttons) {
                    transTree(it.buttons)
                  }
                })
              }
              transTree(item.permission)
            })
            // const menuData = ['first', 'second', 'third']
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