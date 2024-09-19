<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, provide } from 'vue'
// 前端权限树返回
import { FRONTPERMISSIONSTREE } from '@/utils/frontAuthTree'

// 将格式化后的权限树传给后端
const initialization = () => {
  const params = { ...FRONTPERMISSIONSTREE }
  console.log('params', params);
  // console.log('permissionsMenu111', permissionsMenu);

  // frontAuthTree(params)
  //   .then((res) => {
  //     if (res.ok) {
  //       console.log('res', res)
  //     }
  //   })
  //   .catch((err) => {
  //     console.error('err:', err)
  //   })
}

onMounted(() => {
  initialization()
})
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}

#app {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>

<style lang="less" scoped>
// .logo {
//   height: 6em;
//   padding: 1.5em;
//   will-change: filter;
//   transition: filter 300ms;
// }
// .logo:hover {
//   filter: drop-shadow(0 0 2em #646cffaa);
// }
// .logo.vue:hover {
//   filter: drop-shadow(0 0 2em #42b883aa);
// }</style>
