<template>
  <!-- 
    color:svg颜色
    fontSize：svg尺寸大小
    transform：svg旋转角度
    marginRight：svg距右距离
    marginLeft：svg距左距离
    marginTop：svg距上距离
    marginBottom：svg距下距离
  -->
  <svg :class="svgClass" v-bind="$attrs"
    :style="{ color: color, fontSize: size, transform: isTarans, marginRight: right, marginLeft: left, marginTop: top, marginBottom: bottom }">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'svg-icons'
})

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  tarans: {
    type: String || Number,
    default: ''
  },
  right: {
    type: String,
    default: ''
  },
  left: {
    type: String,
    default: ''
  },
  top: {
    type: String,
    default: ''
  },
  bottom: {
    type: String,
    default: ''
  }
})
console.log('size, right', props.size, props.right);
const isTarans = computed(() => `rotate(${props.tarans}deg)`)
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  // console.log(props.name, 'props.name')
  if (props.name) {
    return `svg-icon icon-${props.name}`
  }
  return 'svg-icon'
})
</script>

<style lang="less">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
