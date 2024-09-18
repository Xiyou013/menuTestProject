const states = {
  name: '', // 用户名称
  // 菜单路由
  dirs: [], // 目录级别数组，包含菜单级别数组
  permissions: [], // 按钮级别数组
  addRoutes: [], // 所拥有权限的异步路由+所有同步路由
  permissionRoutes: [] // 所拥有权限的异步路由+有权限的同步路由；也就是所拥有有权限的路由
}

// 权限类别，menu: 菜单；btn：按钮
const permissionType = {
  menu: 1,
  btn: 2
}

/**
 * 
 * @param {*} dirs  // 菜单权限
 * @param {*} route // 路由信息
 * @returns Array
 */

// 二级路由的子路由处理 （菜单权限数组，二级路由数据）
const hasPermission = (dirs, route) => {
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

// routes:所有异步路由 menuList:登录用户拥有的菜单名称数组
/**
 * 
 * @param {*} routes    // asyncRoutes 所有异步路由
 * @param {*} menuList  // 用户所拥有的菜单权限
 * @returns Array
 */
const filterAsyncRoutes = (routes, menuList) => {
  let res = []
  console.log('routes', routes);
  console.log('menuList', menuList);
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
  console.log('res', res);
  return res
}

/**
 * 
 * @param {*} routes          // 所拥有权限的异步路由
 * @param {*} constantRoutes  // 所有同步路由
 * @param {*} menuList        // 菜单权限
 * @returns Array
 */
// 所有权限路由整合
const getSetPermissionRoutes = (routes, constantRoutes, menuList) => {
  let constantList = []
  // 过滤有权限的同步路由
  constantRoutes.forEach((item) => {
    if (item.children && item.children.length > 0) {
      let tmp = menuList.filter((val) => val === item.children[0].meta.sid)
      if (tmp.length > 0) {
        constantList.push(item)
      }
    }
    if (item.hidden) {
      constantList.unshift(item)
    }
  })
  states.permissionRoutes = constantList.concat(routes)
  return states.permissionRoutes
}

/**
 * 
 * @param {*} roles // 用户信息里的权限对象
 * @returns Object
 */
// 将权限中的菜单和按钮类别分离
const formatMenuAndBtn = (roles) => {
  let MenuAndBtn = {
    menuArr: [],
    btnArr: []
  }
  roles.forEach((item) => {
    function transTree(val) {
      val.forEach((it) => {
        if (it.type_int === permissionType.menu) {
          MenuAndBtn.menuArr.push(it.sid)
        }
        if (it.type_int === permissionType.btn) {
          MenuAndBtn.btnArr.push(it.sid)
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
  return MenuAndBtn
}

// 计算初始同步路由数量
const getConstantRoutesSum = (routes) => {
  let sum = 0
  routes.forEach((item) => {
    let num = 0
    // 如果是一级路由
    if (!item?.meta && item?.children && item?.children.length > 0) {
      num = item?.children.length * 2
    } else if (item?.meta && Object.keys(item?.meta).length > 0 && item?.children && item?.children.length > 0) {
      // 如果是二级路由
      num = item?.children.length + 1
    } else if (!item?.meta && !item?.children) {
      // 如果是不带meta属性的普通路由
      num++
    }
    sum += num
  })
  // sum = routes.length
  // sum = routes.length - num + num * 2
  return sum
}

// module.exports = {
//   hasPermission, filterAsyncRoutes, getSetPermissionRoutes, formatMenuAndBtn, getConstantRoutesSum
// }
export {
  hasPermission, filterAsyncRoutes, getSetPermissionRoutes, formatMenuAndBtn, getConstantRoutesSum
}