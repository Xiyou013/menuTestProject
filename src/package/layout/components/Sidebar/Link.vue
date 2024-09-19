<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
let isExter = computed(() => isExternal(props.to))
let type = computed(() => {
  console.log('isExter.value', isExter.value, props.to);
  if (isExter.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = (t) => {
  if (isExter.value) {
    return {
      href: t,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: t
  }
}
</script>

<style lang="scss" scoped></style>