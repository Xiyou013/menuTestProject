# Vue 3 + Vite
  简单测试项目，显示左侧菜单栏权限变化
  1. mock模拟后端传输用户数据
  2. el-menu组件配置左侧菜单栏
  3. router分位同步路由和异步路由
  4. store/modules/menuTest.js 是已抽出方法的js文件

# 菜单结构
  * ### router路由格式
  
    **1. 不是菜单列表里的路由**
      ```js
      {
        path: '/login',
        component: () => import('@/views/Login/index.vue'),
        hidden: true,
        name: 'login'
      }
      ```
 
    **2. 一级菜单路由**
      ```js
        // meta对象中，title：路由名称；icon：路由图标；sid：路由唯一标识
        // type用于三层路由中，一级路由被抽出以tabs列表形式展示，不在路由菜单内；type则表示为当前路由所在的最外层父路由的sid，也就是一级路由sid；没有三级路由可以不填写该属性

        {
          path: '/',
          component: Layout,
          children: [
            {
              path: 'home',
              component: () => import('@/views/home/index.vue'),
              name: 'home',
              meta: {
                title: 'router.home',
                icon: 'home',
                sid: 'home',
                type: 'warehouseManage'
              }
            }
          ]
        }
      ```
 
    **3. 二级菜单路由**
    ```js
    // 同上，其中子路由的meta对象中多了一个pid属性，是指该子路由的上一级父路由的sid
    // 三层路由当中，二级路由中只要父路由指明了type的来源即可，children里的子路由可不加

    {
      path: '/',
      redirect: '/basicData/warehouse',
      component: Layout,
      name: 'basicData',
      meta: {
        title: 'router.basicData',
        icon: 'basic-data',
        sid: 'basicData',
        type: 'systemManage'
      },
      children: [
        {
          path: 'warehouse',
          component: () => import('@/views/BasicData/warehouse.vue'),
          name: 'warehouse',
          meta: {
            title: 'router.warehouse',
            icon: '',
            sid: 'warehouse',
            pid: 'basicData'
          }
        },
      ]
    }
    ```

  * ### 权限类型
    ```js 
      const permissionType = {
        menu: 1,  // 菜单
        btn: 2    // 按钮
      }
    ```

  * ### 传递给后端的权限树结构
    ```js 
    // 权限当中的对象属性：
    /* {
          id：      标识，
          title：   路由或按钮名称，
          type_int：权限类型，1为菜单，2为按钮，
          type：    三层路由中使用，一级路由抽出以tabs列表形式展现；该属性填写当前路由的最外层父路由的sid，也就是一级路由的sid；按钮权限可以不用填写该属性
          desc：    描述，
          pid：     该路由的上一级父路由的sid，
          sid：     唯一标识，
        }      
    **/

    {
      version: '2.0.3', //版本
      checksum: '',     // 检查码，ps：已被移除
      permissions:[     // 前端权限
        // 三层路由中，被抽出的一级路由
        {
          id: 'warehouseManage',
          title: 'router.warehouseManage',
          type_int: 2,
          type: 'warehouseManage',
          desc: 'tabs',
          pid: '',
          sid: 'warehouseManage'
        },
        // 二级路由/一级路由
        {
          id: 'userManage',
          title: '个人中心',
          type_int: 1,
          type: 'userManage',
          desc: 'tabs',
          pid: '',
          sid: 'userManage'
        },
        // 按钮
        {
          id: 'btn1',
          title: 'btn1',
          type_int: 2,
          pid: '',
          sid: 'btn1'
        },
      ]
    }
    ```

  * ### 用户权限roles结构
    ```js  
    roles:[
      {},             // 用户角色一
      {
        id            // 角色id
        type          // 角色对象：admin 管理员 ordinary 普通
        permission: [ // 角色前端权限
          {},         // 权限一
          {
                      // 同上权限树中的permissions属性数据结构一致
          }
        ]
      }
    ]
    ```

# el-menu插件函数
### main.js文件中
* 在main.js文件中，引入verdaccio-demo-publish方法及函数
```js
  import { hasPermission, getPermissionLabel, routerPermisssion } from 'verdaccio-demo-publish'
```
* 获取router文件内的同步及异步路由
```js
import { asyncRoutes, constantRoutes } from '@/router/index.js'
```
* 使用hasPermission,getPermissionLabel, routerPermisssion方法

  1. 路由拦截方法：
  
      ```javascript
      routerPermisssion(router, { asyncRoutes, constantRoutes, login: '/login', home: '/home' })
      ```
      
      1. 其中router是import router from './router/index'引入对象，
      2. asyncRoutes, constantRoutes是异步同步路由，
      3. login：登录页面地址，
      4. home：登录成功后进入的默认页面地址，

  2. 设置按钮权限标识：
  
      ```javascript
      getPermissionLabel('has')
      ```
      1. has是自定义的标签绑定标识
        
  3. 按钮权限函数：
  
      ```javascript
      app.use(hasPermission)
      ```
        1. 在vue文件内使用v-has对按钮进行显示判断，如：
        ```html
        <div v-has="'btn-1'">btn-1</div>
        ```

# el-menu组件
* 在main.js文件中，引入menu-test-project组件和样式
```js
  import menuTestProject from 'menu-test-project'
  import 'menu-test-project/index.css'

  app.use(menuTestProject)
```

* src根目录文件下创建jz-layout文件夹（可自定义命名）
```
  jz-layout文件夹内必须存在index.vue文件，用来引入<jz-layout></jz-layout>组件
  style文件夹用来存放自定义的样式属性
```
```
  src
  | ...
  ├─jz-layout
    ├─index.vue
    └─style
      ├─index.less
      | ...
      └─layout.less
```

* 在router/index.js文件内引入jz-layout组件
```js
  import Layout from '@/jz-layout/index.vue'

  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          icon: 'home',
          sid: 'home'
        }
      }
    ]
  },
```

* jz-layout/index.vue示例
```js
  // :show-header="true"                     是否显示头部
  // :show-sidebar="true"                    是否显示侧边菜单
  // :show-navbar="true"                     是否显示导航栏
  // :show-main-container="true"             是否显示主容器（导航栏在主容器内，主容器不展示，导航栏也一起隐藏）
  // :sidebar-i18n="true"                    是否使用多语言
  // :route="route"                          路由对象
  // :permission_routes="permission_routes"  所有拥有权限的菜单路由
  // :sidebar="sidebar"                      侧边菜单缩放开关值
  // @navClick="onNavClick"                  原Navbar里的Hamburger组件触发的函数，控制侧边菜单缩放开关
  // sidebar-width="200"                     侧边菜单宽度
  // size="20px"                             侧边菜单icon大小
  // right="20px"                            侧边菜单icon距右距离
  // :navberHeight="200"                     navbar导航栏高度
  // :popperClass="'popper-content'"         el-menu自定义类名，暂时无用
  // :activeTextColor="'red'                 侧边菜单选中时的color样式

<template>
  <div class="app-conents">
    <jz-layout title="自定义名称" :show-header="true" :show-sidebar="true" :show-main-container="true" :show-navbar="true"
      :sidebar-i18n="true" :route="route" :permission_routes="permission_routes" :sidebar="sidebar" navberHeight="40"
      @navClick="onNavClick">
      <!-- 自定义头部 -->
      <template #herder>
        <div class="header-left">
          <span class="text-bold">solt自定义名称</span>
        </div>
        <div class="head-operation">
          <div class="textBtn" @click="loginOut">退出登录111</div>
        </div>
      </template>
      <!-- 自定义左侧容器内容 -->
      <template #sidebar>
        <!-- <div style="height: calc(100% - 60px);width: 200px;word-wrap: break-word;">
          1237897897787987788888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        </div> -->
      </template>
      <!-- 自定义主容器中的navbar导航容器内容 -->
      <template #navbarContainer>
        <!-- <div class="navbarContainer">测试navbarContainer</div> -->
        <div class="navbarContainer">
          <jz-hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" />
          <jz-breadcrumb class="jz-breadcrumb" :route="route" :sidebar-i18n="true" />
          <!-- <div>13214564</div> -->
        </div>
      </template>
    </jz-layout>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import './style/index.less'
import { useRoute, useRouter } from 'vue-router'
import { menu } from 'verdaccio-demo-publish'
import { constantRoutes, asyncRoutes } from '@/router/index.js'

const route = useRoute()
const router = useRouter()
// 处理好的，左侧菜单容器缩放标志
const sidebar = computed(() => menu.store.getters.sidebar)
// 处理好的，所有拥有权限的菜单路由
const permission_routes = computed(() => {
  return menu.store.getters.permissionRoutes
})
// const permission_routes = computed(() => {
//   // return menu.store.getters.permissionRoutes
//   return [...constantRoutes, ...asyncRoutes]
// })
console.log('sidebar', sidebar.value);
console.log('permission_routes', permission_routes.value);

const onNavClick = () => {
  console.log('原Navbar里的Hamburger组件触发的函数');
  menu.store.dispatch('menu/toggleSideBar')
}

const toggleSideBar = () => {
  console.log('自定义Hamburger组件触发的函数');
  menu.store.dispatch('menu/toggleSideBar')
}

const loginOut = () => {
  console.log('退出登录');
  router.push('/login')
  localStorage.clear()
}
</script>

<style lang="less" scoped>
.app-conents {
  height: 100%;
  width: 100%;
  // background-color: cornflowerblue;
}

.jz-breadcrumb {
  // background-color: aqua;
  line-height: 40px;
}
</style>
```

## 其他组件
* svg图片插件

  1. main.js中
  ```js
    // svg图片插件
    import { svgInstall } from 'svg-component'

    app.use(svgInstall)
  ```

  2. vite.config.js
  ```js
    import { svgBuilder } from 'svg-plugins'

    export default defineConfig({
      plugins: [svgBuilder('./src/icons/svg/')],
    })
  ```

  3. 使用
  ```html
    <svg-icon name="area" color="red" size="30px" :tarans="90" left="20px" top="20px" right="20px" bottom="20px" />

    <!-- 
      name：svg图片名称
      color：自定义svg图片颜色
      size：自定义svg图片大小
      tarans：自定义svg旋转角度
      left：自定义svg距左距离
      top：自定义svg距顶距离
      right：自定义svg距右距离
      bottom：自定义svg距底距离
     -->
  ```