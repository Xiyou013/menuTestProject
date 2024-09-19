<template>
  <slot name="navbarContainer">
    <div class="jz-navbar-container">
      <!-- <span>navbar-container</span> -->
      <!-- 侧边菜单缩放控制组件 -->
      <Hamburger id="hamburger-container" :is-active="props.sidebar.opened" class="jz-hamburger-container"
        @toggleClick="toggleSideBar" />
      <!-- 面包屑组件 -->
      <Breadcrumb id="breadcrumb-container" :route="props.route" :sidebar-i18n="props.sidebarI18n"
        class="jz-breadcrumb-container" />
    </div>
  </slot>
</template>

<script setup>
import { computed } from 'vue'
// import { useStore } from 'vuex'
// import { menu } from 'verdaccio-demo-publish'
import Hamburger from '../../Hamburger/index.vue'
import Breadcrumb from '../../Breadcrumb/index.vue'

const props = defineProps({
  sidebar: {
    type: Object,
    default: {}
  },
  router: {
    type: Object,
    default: {}
  },
  route: {
    type: Object,
    default: {}
  },
  navberHeight: {
    type: [String, Number],
    default: 50
  },
  sidebarI18n: {
    type: Boolean,
    default: false
  },
})

// const store = useStore()
const emit = defineEmits(['toggleSideBar'])

const navberHeight = computed(() => `${props.navberHeight}px` || '50px')
// console.log('navberHeight', navberHeight.value);
// console.log('props.navberHeight', props.navberHeight);
const toggleSideBar = () => {
  emit('toggleSideBar')
}
// const toggleSideBar = () => {
//   menu.store.dispatch('menu/toggleSideBar')
// }
</script>

<style lang="scss">
.jz-navbar-container {
  height: v-bind('navberHeight');
}
</style>