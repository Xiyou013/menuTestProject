# verdaccio-demo-publish
menu js代码抽出

# 代码路径
src/menu.js

# 使用方式
  ```js
  npm i verdaccio-demo-publish -s
  ```


  #### 1. 项目main.js里，引入verdaccio-demo-publish
  ```js
  import { hasPermission, getPermissionLabel, routerPermisssion } from 'verdaccio-demo-publish'
  ```

  #### 2. 获取router文件内的同步及异步路由
  ```js
  import { asyncRoutes, constantRoutes } from '@/router/index.js'
  ```

  #### 3. 使用hasPermission,getPermissionLabel, routerPermisssion方法
  
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

