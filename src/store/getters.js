const getters = {
 // menu
 userInfo: (state) => state.menu.userInfo,
 name: (state) => state.menu.userInfo.name,
 menuList: (state) => state.menu.userInfo.menuList,
 btnList: (state) => state.menu.userInfo.btnList,
 accessedRoutes: (state) => state.menu.userInfo.accessedRoutes,
 permissionRoutes: (state) => state.menu.userInfo.permissionRoutes,

 // 不重要的数据
 asyncRoutes: (state) => state.menu.asyncRoutes,
 constantRoutes: (state) => state.menu.constantRoutes,
 label: (state) => state.menu.label
}
export default getters