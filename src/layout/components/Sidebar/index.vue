<template>
  <div class="scrollbarView">
    <!-- <el-scrollbar wrap-class="scrollbar-wrapper"> -->
      <el-menu :default-active="activeMenu" :collapse="isCollapse" active-text-color="#e8a73c" :unique-opened="false"
        :collapse-transition="false" mode="vertical">
        <SidebarItem v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    <!-- </el-scrollbar> -->
  </div>
</template>

<script setup>
import { computed, watch, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
// import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

// 模拟数据
import { asyncRoutes, constantRoutes } from '@/router/index.js'
import { menu } from 'verdaccio-demo-publish'

const store = useStore()
const route = useRoute()

const permission_routes = computed(() => {
  return menu.store.getters.permissionRoutes
})
// const sidebar = computed(() => store.getters.sidebar)
// const isCollapse = computed(() => !sidebar.value.opened)

const activeMenu = ref('')
const isCollapse = ref(false)
// const permission_routes = ref(constantRoutes)
console.log('constantRoutes', constantRoutes);
console.log('permission_routes', permission_routes.value);

watch(
  () => route.path,
  (newVal) => {
    activeMenu.value = newVal
  }
)
onMounted(() => {
  // console.info('permission_routes', permission_routes)
  let { hash } = window.location
  console.log('hash', hash);
  // activeMenu.value = '/home'
  if (hash.length > 1) activeMenu.value = hash.substr(1)
  // console.log('菜单栏', permission_routes)
})
</script>

<style lang="scss" scoped>
.scrollbarView {
  width: 200px;
  height: calc(100% - 60px);
  background-color: burlywood;
  // .el-menu-item.is-active {
  //     background: rgba(255, 208, 75, 0.2) !important;
  //   }
}
</style>