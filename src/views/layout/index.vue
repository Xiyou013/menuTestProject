<template>
  <!-- <div> -->
  <!-- 
    :show-header="true"                     是否显示头部
    :show-sidebar="true"                    是否显示侧边菜单
    :show-navbar="true"                     是否显示导航栏
    :show-main-container="true"             是否显示主容器（导航栏在主容器内，主容器不展示，导航栏也一起隐藏）
    :sidebar-i18n="true"                    是否使用多语言
    :route="route"                          路由对象
    :permission_routes="permission_routes"  所有拥有权限的菜单路由
    :sidebar="sidebar"                      侧边菜单缩放开关值
    @navClick="onNavClick"                  原Navbar里的Hamburger组件触发的函数，控制侧边菜单缩放开关
    sidebar-width="200"                     侧边菜单宽度
    size="20px"                             侧边菜单icon大小
    right="20px"                            侧边菜单icon距右距离
    :navberHeight="200"                     navbar导航栏高度
    :popperClass="'popper-content'"         el-menu自定义类名，暂时无用
    :activeTextColor="'red'                 侧边菜单选中时的color样式
  -->
  <JzLayout title="自定义名称" :show-header="true" :show-sidebar="true" :show-main-container="true" :show-navbar="true"
    :sidebar-i18n="true" :route="route" :permission_routes="permission_routes" :sidebar="sidebar" @navClick="onNavClick"
    sidebar-width="200" size="20px" right="20px" :navberHeight="200" :popperClass="'popper-content'" :activeTextColor="'red'">
    <!-- 自定义herder内容 -->
    <template #herder>
      <div class="header-left">
        <span class="text-bold">solt自定义名称</span>
      </div>
      <div class="head-operation">
        <div class="textBtn" @click="loginOut">退出登录111</div>
      </div>
    </template>
    <!-- 自定义侧边栏内容 -->
    <template #sidebar>
      <!-- <div style="height: calc(100% - 60px);width: 200px;word-wrap: break-word;">
        1237897897787987788888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
      </div> -->
    </template>
    <!-- <template #mainContainer> -->
    <!-- 456 -->

    <!-- 自定义navbar导航栏内容 -->
    <template #navbarContainer>
      <!-- <div class="navbarContainer">测试navbarContainer</div> -->
    </template>

    <!-- </template> -->
  </JzLayout>
  <!-- </div> -->
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { useStore } from 'vuex'
import { menu } from 'verdaccio-demo-publish'
import JzLayout from '@/package/layout/index.vue'

console.log('menu.store.getters.permissionRoutes', menu.store.getters.permissionRoutes);


const route = useRoute()
const router = useRouter()
// const store = useStore()

const sidebar = computed(() => menu.store.getters.sidebar)
// const isCollapse = computed(() => !sidebar.value.opened)
const permission_routes = computed(() => {
  return menu.store.getters.permissionRoutes
})
console.log('sidebar', sidebar.value);
console.log('permission_routes', permission_routes.value);

const onNavClick = () => {
  menu.store.dispatch('menu/toggleSideBar')
}

const loginOut = () => {
  console.log('点击退出登录按钮');
  router.push('/login')
  localStorage.clear()
}
</script>

<style lang="less">
.header-left {
  width: 80%;
  height: 100%;
  background-color: beige;
  padding: 0 10px 0 20px;
  line-height: 60px;
}

.text-bold {
  font-weight: bold;
  font-size: 20px;
}

.head-operation {
  width: calc(100% - 80%);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px 0 0;
}

.textBtn {
  cursor: default;
}

.navbarContainer {
  // width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  background-color: aliceblue;
}

// :deep(.el-popper) {
//   .el-menu-item .is-active {
//     background-color: #1069bc !important;
//     // color: #f5841f !important;
//     border-right: 4px solid #fff;
//     box-sizing: border-box;
//   }
// }

// 浮框
.el-menu--popup {
  background-color: aquamarine !important;

  .el-menu-item.is-active {
    background-color: #1069bc !important;
    // color: #f5841f !important;
    border-right: 4px solid #fff;
    box-sizing: border-box;
  }

  .el-menu-item {
    &:hover {
      background-color: #ecf5ff !important;
      color: #333;
    }
  }
}

// 跟下面的重复了
.el-menu-item.is-active {
  background: rgba(255, 208, 75, 0.2) !important;
  color: #fff;
}

.el-menu-item {
  // color: #333;
  &:hover {
    // background-color: @menuHover  !important;
    background-color: #f4e7d5 !important;
    color: #333;

  }
}

// .el-menu--vertical {
//   &>.el-menu {
//     // .svg-icon {
//     //   margin-right: 16px;
//     // }

//     // .sub-el-icon {
//     //   margin-right: 12px;
//     //   margin-left: -2px;
//     // }
//     background-color: #233551;
//     color: #333;
//   }

//   .nest-menu .el-submenu>.el-submenu__title,
//   .el-menu-item {
//     color: #fff;

//     &:hover {
//       // you can use @subMenuHover
//       // background-color: @menuHover !important;
//       background-color: #ecf5ff !important;
//       color: #333;
//     }


//   }

//   // .el-menu {
//   //   background-color: #233551;
//   // }

//   .el-menu-item.is-active {
//     background-color: #1069bc !important;
//     // color: #1ff52a !important;
//     // border-right: 4px solid #fff;
//     box-sizing: border-box;
//   }

//   // the scroll bar appears when the subMenu is too long
//   >.el-menu--popup {
//     max-height: 100vh;
//     overflow-y: auto;

//     &::-webkit-scrollbar-track-piece {
//       background: #d3dce6;
//     }

//     &::-webkit-scrollbar {
//       width: 6px;
//     }

//     &::-webkit-scrollbar-thumb {
//       background: #99a9bf;
//       border-radius: 20px;
//     }
//   }
// }
</style>