<template>
  <div class="app-main">
    <!-- <router-view> </router-view> -->
    <router-view :key="key" v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

const store = useStore()
const route = useRoute()

const key = computed(() => route.path)
console.log('key', key.value);
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: calc(100% - 30px);
  background-color: rgb(255, 205, 243);
}
</style>