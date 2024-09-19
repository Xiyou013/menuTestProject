<template>
  <div class="jz-app-main">
    <!-- <router-view> </router-view> -->
    <router-view :key="key" v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
// import { useRoute } from 'vue-router'

const props = defineProps({
  route: {
    type: Object,
    default: {}
  },
  navberHeight: {
    type: [String, Number],
    default: 50
  },
})

const store = useStore()
// const route = useRoute()

// console.log('props.route', props.route);
const key = computed(() => props.route.path)
const navberHeight = computed(() => `${props.navberHeight}px` || '50px')
// console.log('key', key.value);
console.log('navberHeight', navberHeight.value);
console.log('props.navberHeight', props.navberHeight);
</script>

<style lang="scss">
.jz-app-main {
  max-height: calc(100% - v-bind('navberHeight'));
}
</style>