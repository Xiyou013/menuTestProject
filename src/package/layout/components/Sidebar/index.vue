<template>
  <div>
    <!-- <div class="jz-scrollbarView"> -->
      <!-- active-text-color="#e8a73c" -->
       <!--
        default-active：页面加载时默认激活菜单的 index 
        collapse：是否水平折叠收起菜单
        active-text-color：活动菜单项的文本颜色
        popper-class：为 popper 添加类名，这里没有用到，popperClass值在style属性里为空
        unique-opened：是否只保持一个子菜单的展开
        collapse-transition：是否开启折叠动画
        mode：菜单展示模式，'horizontal' | 'vertical'：横向 | 竖向
        open：sub-menu 展开的回调
        close：sub-menu 收起的回调
        -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu ref="el_menu_ref" :default-active="activeMenu" :collapse="isCollapse" :active-text-color="activeTextColor" :popper-class="popperClass"
        :unique-opened="false" :collapse-transition="false" mode="vertical" @open="handleOpen" @close="handleClose">
        <SidebarItem v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path"
          :isCollapse="props.isCollapse" :size="props.size" :right="props.right" :sidebar-i18n="props.sidebarI18n" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { computed, watch, ref, onMounted } from 'vue'
// import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'
// import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

// 模拟数据
// import { asyncRoutes, constantRoutes } from '@/router/index.js'
// import { menu } from 'verdaccio-demo-publish'

// const store = useStore()
// const route = useRoute()

const props = defineProps({
  route: {
    type: Object,
    default: {}
  },
  permission_routes: {
    type: Array,
    default: []
  },
  isCollapse: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: ''
  },
  right: {
    type: String,
    default: ''
  },
  sidebarI18n: {
    type: Boolean,
    default: false
  },
  popperClass: {
    type: String,
    default: ''
  },
  activeTextColor: {
    type: String,
    default: ''
  }
})
console.log('sidebarI18n--index', props.sidebarI18n);
console.log('isCollapse--index', props.isCollapse);
const permission_routes = computed(() => {
  return props.permission_routes
})

// const permission_routes = computed(() => {
//   return menu.store.getters.permissionRoutes
// })
// const sidebar = computed(() => store.getters.sidebar)
// const isCollapse = computed(() => !sidebar.value.opened)

const el_menu_ref = ref()
const activeMenu = ref('')
const isCollapse = ref(false)
// const permission_routes = ref(constantRoutes)
// console.log('constantRoutes', constantRoutes);
console.log('permission_routes', permission_routes.value);

const handleOpen = (key, keyPath) => {
  console.log('open', key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log('close', key, keyPath)
}

watch(
  () => props.route.path,
  (newVal) => {
    console.log('newVal', newVal);
    activeMenu.value = newVal
  }
)
watch(
  () => props.isCollapse,
  (newVal) => {
    // console.log('newVal--isCollapse', newVal);
    isCollapse.value = newVal
  }
)
onMounted(() => {
  // console.info('permission_routes', permission_routes)
  // 抓取当前网页地址，因为菜单的index被设置为了页面路由path
  let { hash } = window.location
  console.log('hash', hash);
  // activeMenu.value = '/home'
  if (hash.length > 1) activeMenu.value = hash.substr(1)
  // console.log('菜单栏', permission_routes)
})
</script>

<style lang="scss">
.el-menu {
  border-right: 0px;
}
</style>