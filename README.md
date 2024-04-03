# verdaccio-demo-publish
--- menu js代码抽出

# 代码路径
--- src/menu.js

# 菜单结构
 * router路由格式
 * 
 * 不是菜单列表里的路由
 * {
 *    path: '/login',
 *    component: () => import('@/views/Login/index.vue'),
 *    hidden: true,
 *    name: 'login'
 * }
 * 
 * 一级菜单路由
 * {
 *    path: '/',
 *    component: Layout,
 *    children: [
 *      {
 *        path: 'home',
 *        component: () => import('@/views/home/index.vue'),
 *        name: 'home',
 *        meta: {
 *          title: '首页',
 *          icon: 'home',
 *          sid: 'home'
 *        }
 *       }
 *    ]
 * }
 * 
 * 二级菜单路由
 * {
 *    path: '/',
 *    redirect: '/third/menuOne',
 *    component: Layout,
 *    name: 'third',
 *    meta: {
 *      title: '功能菜单三',
 *      icon: 'third',
 *      sid: 'third'
 *    },
 *    children: [
 *      {
 *        path: 'menuOne',
 *        component: () => import('@/views/ThirdMenu/menuOne.vue'),
 *        name: 'menuOne',
 *        meta: {
 *          title: '功能菜单三-一',
 *          icon: 'menuOne',
 *          sid: 't-menuOne'
 *        }
 *      }
 *    ]
 * }

 # 用户权限roles结构
 * roles：[
 *    {}, // 用户角色一
 *    {
 *      id // 角色id
 *      type // 角色对象：admin 管理员 ordinary 普通
 *      permission: [ // 角色前端权限
 *        {}, // 权限一
 *        {
 *          type // 权限类别：1 菜单 2 按钮
 *          name // 权限名称
 *          sid  // 权限唯一标识，与router路由里的sid一致
 *          children: [ // 该权限下的子权限，一般按钮没有子权限，只有二级菜单会有子权限存在
 *            {}, // 子权限一
 *            {
 *              type // 权限类别：1 菜单 2 按钮
 *              name // 权限名称
 *              sid  // 权限唯一标识，与router路由里的sid一致
 *            }
 *          ]
 *        }
 *      ]
 *    }
 * ]

