<template>
  <div class="app-conents">
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