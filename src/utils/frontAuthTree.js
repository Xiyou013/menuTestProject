

import { constantRoutes, asyncRoutes } from '@/router/index.js'
import { onMounted, provide, ref } from 'vue'
import { menu } from 'verdaccio-demo-publish'
import { useStore } from 'vuex'
import { tabsBtnList, permissionsBtn } from './btnList.js'

const store = useStore()

export const menuList = [...constantRoutes, ...asyncRoutes]

let permissionsMenu = ref([])

// 格式化权限路由，将同步异步中有权限的路由整合一块并缓存返回
const onFormatMenu = () => {
  console.log('99999999');
  permissionsMenu = menu.store.dispatch('menu/formatRouter', menuList)
  // console.log('store', store);
  // console.log('menu.store', menu.store);
  // store.dispatch('setPermissionsMenu', permissionsMenu)
  // let temp = 
  // permissionsMenu = [...arr]
  console.log('permissionsMenu', permissionsMenu)
  // return [...menu.store.getters.permissionsMenu, ...tabsBtnList, ...permissionsBtn]
  return [...menu.store.getters.permissionsMenu]
}

// 权限树结构
export const FRONTPERMISSIONSTREE = {
  // front_auth_tree更新，version也要同步更新
  // 不然登录返回的权限树还是旧版本的
  version: '2.0.3',           // 版本
  checksum: '',               // 标识码，现版本已废弃
  permissions: onFormatMenu() // 前端权限树
}

export const checksum = ''
