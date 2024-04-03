const getters = {
 // menu
 name: (state) => state.menu.name,
 dirs: (state) => state.menu.dirs,
 perms: (state) => state.menu.permissions,
 addRoutes: (state) => state.menu.addRoutes,
 permissionRoutes: (state) => state.menu.permissionRoutes,
}
export default getters