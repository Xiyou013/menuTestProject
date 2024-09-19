

import { constantRoutes, asyncRoutes } from '@/router/index.js'
import { onMounted, provide, ref } from 'vue'
import { menu } from 'verdaccio-demo-publish'
import { useStore } from 'vuex'

const store = useStore()

// 模拟按钮权限列表
/*
  {
    id：      标识
    title：   名称
    type_int：权限类型，菜单menu为1，按钮btn为2
    pid：     父路由sid，也就是当前按钮在哪个路由下，btn 的 pid就填写该路由的sid
    sid：     唯一标识
  }
*/
export const permissionsBtn = [
  // 日志管理
  {
    id: 'records_info',
    title: '页面展示',
    type_int: 2,
    pid: 'records_manage',
    sid: 'records_info'
  },
  // 个人中心
  {
    id: 'ind_info',
    title: '页面展示',
    type_int: 2,
    pid: 'user_ind',
    sid: 'ind_info'
  },
  // 测试菜单
  {
    id: 'test_info',
    title: '页面展示',
    type_int: 2,
    pid: 'testManage',
    sid: 'test_info'
  },
  // 用户管理
  {
    id: 'user_info',
    title: '页面展示',
    type_int: 2,
    pid: 'user_manage',
    sid: 'user_info'
  },
  // 应用管理
  {
    id: 'app_info',
    title: '页面展示',
    type_int: 2,
    pid: 'app_manage',
    sid: 'app_info'
  },
]

// 所有路由整合数据（同步路由，异步路由）
export const menuList = [...constantRoutes, ...asyncRoutes]

let permissionsMenu = ref([])

// 格式化我们需要的权限结构
const onFormatMenu = () => {
  console.log('99999999');
  // 调用插件函数
  permissionsMenu = menu.store.dispatch('menu/formatRouter', menuList)
  // console.log('store', store);
  // console.log('menu.store', menu.store);
  // store.dispatch('setPermissionsMenu', permissionsMenu)
  // let temp = 
  // permissionsMenu = [...arr]
  console.log('permissionsMenu', permissionsMenu)
}
onFormatMenu()
export const FRONTPERMISSIONSTREE = {
  // front_auth_tree更新，version也要同步更新
  // 不然登录返回的权限树还是旧版本的
  version: '2.0.3',
  checksum: '',
  permissions: [...menu.store.getters.permissionsMenu, ...permissionsBtn]
}

export const checksum = ''
