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
      2. asyncRoutes, constantRoutes是同步异步路由，
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
      }
      ```
 
    **3. 二级菜单路由**
    ```js
    {
      path: '/',
      redirect: '/third/menuOne',
      component: Layout,
      name: 'third',
      meta: {
        title: '功能菜单三',
        icon: 'third',
        sid: 'third'
      },
      children: [
        {
          path: 'menuOne',
          component: () => import('@/views/ThirdMenu/menuOne.vue'),
          name: 'menuOne',
          meta: {
            title: '功能菜单三-一',
            icon: 'menuOne',
            sid: 't-menuOne'
          }
        }
      ]
    }
    ```
 
  * ### 用户权限roles结构
  ```js  
  roles:[
    {}, // 用户角色一
    {
      id // 角色id
      type // 角色对象：admin 管理员 ordinary 普通
      permission: [ // 角色前端权限
        {}, // 权限一
        {
          type // 权限类别：1 菜单 2 按钮
          name // 权限名称
          sid  // 权限唯一标识，与router路由里的sid一致
          children: [ // 该权限下的子权限，一般按钮没有子权限，只有二级菜单会有子权限存在
            {}, // 子权限一
            {
              type // 权限类别：1 菜单 2 按钮
              name // 权限名称
              sid  // 权限唯一标识，与router路由里的sid一致
            }
          ]
        }
      ]
    }
  ]
  ```

