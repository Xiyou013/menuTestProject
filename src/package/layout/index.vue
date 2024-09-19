<template>
  <div class="jz-app-wrapper">
    <!-- 自定义头部 -->
    <div class="jz-titleNavbar" v-if="props.showHeader">
      <slot name="herder">
        <div class="jz-title">
          <span>{{ title }}</span>
        </div>
      </slot>
      <!-- <slot name="herderOperation"> -->
      <!-- <div class="jz-head-operation">
          <div class="jz-textBtn" @click="loginOut">退出登录</div>
        </div> -->
      <!-- </slot> -->
    </div>
    <div :class="['jz-container', props.showHeader ? 'jz-h-con' : 'jz-h-not-con']">
      <!-- 自定义侧边菜单 -->
      <slot name="sidebar">
        <Sidebar :class="['jz-sidebar-container', props.sidebar.opened ? 'jz-s-is-fold' : 'jz-s-not-fold']"
          v-if="props.showSidebar" :route="props.route" :permission_routes="props.permission_routes"
          :isCollapse="isCollapse" :size="props.size" :right="props.right" :sidebar-i18n="props.sidebarI18n" :activeTextColor="activeTextColor" :popperClass="popperClass" />
      </slot>
      <!-- 自定义主容器 -->
      <div
        :class="[
      'jz-main-container',
      props.showSidebar ? 'is-sidebar-jz-main-container' : 'is-not-sidebar-jz-main-container',
      props.showSidebar && props.sidebar.opened ? 'jz-m-is-fold' : props.showSidebar && !props.sidebar.opened ? 'jz-m-not-fold' : '']"
        v-if="props.showMainContainer">
        <!-- <slot name="mainContainer"> -->
          <!-- 自定义导航栏 -->
        <Navbar v-if="props.showNavbar" :sidebar="props.sidebar" :route="props.route" :router="props.router"
          :navberHeight="props.navberHeight" :sidebar-i18n="props.sidebarI18n" @toggleSideBar="navToggleSideBar">
          <template #navbarContainer>
            <slot name="navbarContainer"></slot>
          </template>
        </Navbar>
        <AppMain :route="props.route" :navberHeight="props.navberHeight" />
        <!-- <span>自定义main-container内容</span> -->
        <!-- </slot> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { Sidebar } from './components'
import '@/package/layout/style/index.less'
import { Navbar, AppMain, Sidebar } from './components'
// import { Navbar, Sidebar } from './components'

defineOptions({
  name: 'jz-layout'
})

const props = defineProps({
  showHeader: {
    type: Boolean,
    default: true
  },
  showSidebar: {
    type: Boolean,
    default: true
  },
  showMainContainer: {
    type: Boolean,
    default: true
  },
  showNavbar: {
    type: Boolean,
    default: true
  },
  sidebarI18n: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '系统名称'
  },
  route: {
    type: Object,
    default: {}
  },
  permission_routes: {
    type: Array,
    default: []
  },
  sidebar: {
    type: Object,
    default: {}
  },
  router: {
    type: Object,
    default: {}
  },
  sidebarWidth: {
    type: [String, Number],
    default: 200
  },
  size: {
    type: String,
    default: ''
  },
  right: {
    type: String,
    default: ''
  },
  navberHeight: {
    type: [String, Number],
    default: 50
  },
  popperClass: {
    type: String,
    default: ''
  },
  activeTextColor: {
    type: String,
    default: ''
  },
})

console.log('route111', props.route);
console.log('permission_routes', props.permission_routes);
console.log('sidebar', props.sidebar);
// console.log('props.sidebar.opened', props.sidebar.opened);

const isCollapse = computed(() => !props.sidebar.opened)
const sidebarWidth = computed(() => `${props.sidebarWidth}px`)
console.log('isCollapse', isCollapse.value);
console.log('sidebarWidth', sidebarWidth.value);


// const router = useRouter()

const emit = defineEmits(['navClick'])
const navToggleSideBar = () => {
  emit('navClick')
}

const loginOut = () => {
  console.log('退出登录');
  // router.push('/login')
  localStorage.clear()
}

</script>

<style lang="less">
.jz-s-is-fold {
  //  transition: width 0.1s ease-in-out;
  width: v-bind('sidebarWidth');
  // width: 300px;
}
.el-menu--collapse{
  width: 100%;
}

</style>