# menuTestProject


## jz-menu组件入口
view>layout>index.vue

## jz-menu组件本体
src>package

### src>package目录结构
```js
  index.js: 组件注册入口
  Svglcon: svg图片显示组件
  icons：图片文件夹
  btn: 按钮组件（测试版，不用）
  Breadcrumb：面包屑组件
  Hamburger：侧边菜单缩放控制组件
  layout：jz-menu组件本体
```
```js
  layout文件夹：
    index.vue：自定义wrapper容器，包含头部、侧边菜单、主容器（导航栏、主应用显示容器）
    style：各组件样式，已被抽离封装
    components：子组件代码
      ---Navber.vue：主容器中的导航栏组件
      ---AppMain.vue：主容器中的主应用显示组件
      ---Sidebar：侧边菜单组件
         ---index.vue：el-menu父容器
         ---SidebarItem：el-menu-item子容器
         ---Link：链接跳转地址，暂无用到
         ---Item：el-menu-item内容展示样式
```

## jz-menu入口文件代码
view>layout>index.vue
1. html:
```js
// 
//     :show-header="true"                     是否显示头部
//     :show-sidebar="true"                    是否显示侧边菜单
//     :show-navbar="true"                     是否显示导航栏
//     :show-main-container="true"             是否显示主容器（导航栏在主容器内，主容器不展示，导航栏也一起隐藏）
//     :sidebar-i18n="true"                    是否使用多语言
//     :route="route"                          路由对象
//     :permission_routes="permission_routes"  所有拥有权限的菜单路由
//     :sidebar="sidebar"                      侧边菜单缩放开关值
//     @navClick="onNavClick"                  原Navbar里的Hamburger组件触发的函数，控制侧边菜单缩放开关
//     sidebar-width="200"                     侧边菜单宽度
//     size="20px"                             侧边菜单icon大小
//     right="20px"                            侧边菜单icon距右距离
//     :navberHeight="200"                     navbar导航栏高度
//     :popperClass="'popper-content'"         el-menu自定义类名，暂时无用
//     :activeTextColor="'red'                 侧边菜单选中时的color样式
// 
  <JzLayout 
    title="自定义名称" 
    :show-header="true" 
    :show-sidebar="true" 
    :show-main-container="true" 
    :show-navbar="true"
    :sidebar-i18n="true" 
    :route="route" 
    :permission_routes="permission_routes" 
    :sidebar="sidebar" 
    @navClick="onNavClick"
    sidebar-width="200" 
    size="20px" 
    right="20px" 
    :navberHeight="200" 
    :popperClass="'popper-content'" 
    :activeTextColor="'red'"
  >
    /* 自定义herder内容 */
    <template #herder>
      <div class="header-left">
        <span class="text-bold">solt自定义名称</span>
      </div>
      <div class="head-operation">
        <div class="textBtn" @click="loginOut">退出登录</div>
      </div>
    </template>
    /* 自定义侧边栏内容 */
    <template #sidebar></template>
    /* 自定义navbar导航栏内容 */
    <template #navbarContainer></template>

    /* 开启主容器自定义，由show-main-container控制。navbar在主容器内，show-main-container为true时，默认的navbar组件和appMain容器才会生效 */
    /* 不论mainContainer为true还是false，都可以自定义该容器下的内容*/
    /* <template #mainContainer>
      <!-- 自定义navbar导航栏内容 -->
      <template #navbarContainer></template>
    </template>  */
  </JzLayout>
```
2. js
```js
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
```

3. css
```css
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
</style>
```

## jz-menu组件代码
src>package>layout>index.vue
1. html
```js
<template>
  <div class="jz-app-wrapper">
    <!-- 自定义头部 --> 
    <div class="jz-titleNavbar" v-if="props.showHeader">
      <slot name="herder">
        <div class="jz-title">
          <span>{{ title }}</span>
        </div>
      </slot>
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
          <!-- 自定义导航栏 -->
        <Navbar v-if="props.showNavbar" :sidebar="props.sidebar" :route="props.route" :router="props.router"
          :navberHeight="props.navberHeight" :sidebar-i18n="props.sidebarI18n" @toggleSideBar="navToggleSideBar">
          <template #navbarContainer>
            <slot name="navbarContainer"></slot>
          </template>
        </Navbar>
        <AppMain :route="props.route" :navberHeight="props.navberHeight" />
        <!-- <span>自定义main-container内容</span> -->
      </div>
    </div>
  </div>
</template>
```

2. 
```js
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import '@/package/layout/style/index.less'
import { Navbar, AppMain, Sidebar } from './components'

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

const isCollapse = computed(() => !props.sidebar.opened)
const sidebarWidth = computed(() => `${props.sidebarWidth}px`)

console.log('isCollapse', isCollapse.value);
console.log('sidebarWidth', sidebarWidth.value);

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
```

3. 
```css
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
```