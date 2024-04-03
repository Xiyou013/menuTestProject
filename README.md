# Vue 3 + Vite
--- 简单测试项目，显示左侧菜单栏权限变化
    1. mock模拟后端传输用户数据
    2. el-menu组件配置左侧菜单栏
    3. router分位同步路由和异步路由
    4. store/modules/menuTest.js 是已抽出方法的js文件

# 菜单结构
--- router路由格式
    --- 不是菜单列表里的路由
        {
            path: '/login',
            component: () => import('@/views/Login/index.vue'),
            hidden: true,
            name: 'login'
        }
    
    --- 一级菜单路由
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

    --- 二级菜单路由
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

# 用户权限roles结构
  --- roles：[
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

