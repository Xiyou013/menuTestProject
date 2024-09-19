<template>
  <div :class="['jz-bar-item', !props.isCollapse ? 'jz-b-is-fold' : 'jz-b-not-fold']">
    <svg-icon v-if="props.icon" :name="props.icon" :size="size" :right="right" />
    <!-- 菜单缩放展示 -->
    <slot name="title" v-if="!props.isCollapse">
      <span class="jz-title" v-if="props.sidebarI18n">{{ $t(props.title) }}</span>
      <span class="jz-title" v-else>{{ props.title }}</span>
    </slot>
    <!-- 一级菜单被缩放的展示 -->
    <slot name="title" v-if="props.isCollapse && isOne">
      <span class="jz-title" v-if="props.sidebarI18n">{{ $t(props.title) }}</span>
      <span class="jz-title" v-else>{{ props.title }}</span>
    </slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import SvgIcon from '../../../SvgIcon/index.vue'


const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  isCollapse: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: '15px'
  },
  right: {
    type: String,
    default: '10px'
  },
  sidebarI18n: {
    type: Boolean,
    default: false
  },
  isOne: {
    type: Boolean,
    default: true
  },
  item: {
    type: Object,
    default: {}
  }
})

const size = computed(() => {
  return props.size || '15px'
})
const right = computed(() => {
  if (!props.isCollapse) {
    return props.right || '10px'
  } else {
    return '5px'
  }
})
const isOne = computed(() => {
  if (props.item.pid) {
    return true
  }
  return false

})
console.log('props.sidebarI18n', props.sidebarI18n);

</script>

<style lang="scss" scoped></style>