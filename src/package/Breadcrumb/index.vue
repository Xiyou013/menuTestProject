<template>
  <el-breadcrumb class="jz-app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <div v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">
          <span v-if="props.sidebarI18n">{{ $t(item.meta.title) }}</span>
          <span v-else>{{ item.meta.title }}</span>
        </div>
        <div v-else style="font-weight: bold;">
          <span v-if="props.sidebarI18n">{{ $t(item.meta.title) }}</span>
          <span v-else>{{ item.meta.title }}</span>
        </div>
        <!-- <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a> -->
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
// import { useRoute, useRouter } from 'vue-router'
import { watch, ref, onMounted, reactive } from 'vue'
import { compile } from 'path-to-regexp'

defineOptions({
  name: 'jz-breadcrumb'
})

const props = defineProps({
  router: {
    type: Object,
    default: {}
  },
  route: {
    type: Object,
    default: {}
  },
  sidebarI18n: {
    type: Boolean,
    default: false
  },
})

let levelList = ref(null)
// let route = reactive(useRoute())
// let router = useRouter()

// eslint-disable-next-line no-shadow
const isDashboard = (row) => {
  const name = row && row.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}
const getBreadcrumb = () => {
  // only show routes with meta.title
  console.log('props.route', props.route);
  let matched = props.route.matched.filter((item) => item.meta && item.meta.title)
  const first = matched[0]

  if (!isDashboard(first)) {
    // FIXME: do nothing
  }

  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}
// const pathCompile = (path) => {
//   const { params } = route
//   const toPath = compile(path)
//   console.error('path compile: ', path, params, toPath(params))
//   return toPath(params)
// }
// const handleLink = (item) => {
//   const { redirect, path } = item
//   if (redirect) {
//     router.push(redirect)
//     return
//   }
//   let tpath = pathCompile(path)
//   if (tpath.indexOf('dashboard') > -1) {
//     // FIXME: do nothing
//   } else {
//     router.push(pathCompile(path))
//   }
// }

watch(props.route, (value) => {
  if (value.path.startsWith('/redirect/')) {
    return
  }
  getBreadcrumb()
})

onMounted(() => {
  getBreadcrumb()
})
</script>

<style lang="less">
// .jz-app-breadcrumb.el-breadcrumb {
//   display: inline-block;
//   font-size: 14px;
//   line-height: 50px;
//   margin-left: 8px;

//   .no-redirect {
//     color: #97a8be;
//     cursor: text;
//   }
// }</style>
