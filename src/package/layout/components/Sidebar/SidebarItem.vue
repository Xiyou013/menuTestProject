<template>
  <div v-if="!item.hidden">
    <!-- 无二级菜单数据 -->
    <template v-if="hasOneShowingChild(item.children, item) &&
    (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
    !item.alwaysShow
    ">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title" :item="onlyOneChild.meta"
            :isCollapse="props.isCollapse" :size="props.size" :right="props.right" :sidebar-i18n="props.sidebarI18n" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 有二级菜单数据 -->
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.name)" :teleported="true">
      <template #title>
        <!-- <template slot:default=title> -->
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title"
          :isCollapse="props.isCollapse" :size="props.size" :right="props.right" :sidebar-i18n="props.sidebarI18n" :item="item.meta" />
      </template>
      <sidebar-item v-for="child in item.children" :index="resolvePath(child.path)" :key="child.path" :is-nest="true"
        :item="child" :base-path="resolvePath(child.path)" :isCollapse="props.isCollapse" :sidebar-i18n="props.sidebarI18n" />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { isExternal } from '@/utils/validate.js'
import Item from './Item.vue'
import AppLink from './Link.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
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
})
const onlyOneChild = ref(null)

// 判断是否是一级菜单
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    // hidden为true，则是不在菜单列表内的路由
    if (item.hidden) {
      return false
    }
    // Temp set(will be used if only has one showing child)
    onlyOneChild.value = item
    return true
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}
const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return props.basePath + routePath
}
</script>

<style lang="scss" scoped>
// .el-menu-item.is-active {
//   background: rgba(255, 208, 75, 0.2) !important;
// }

// .el-menu-item {
//   &:hover {
//     // background-color: @menuHover  !important;
//     background-color: #f4e7d5 !important;

//   }
// }

a {
  text-decoration: none;
}

// .router-link-active {
//   text-decoration: none;
// }</style>