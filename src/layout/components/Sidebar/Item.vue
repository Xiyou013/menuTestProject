<template>
  <div class="bar-item">
    <!-- <svg-icon v-if="props.icon" :name="props.icon" /> -->
    <slot name="title">
      <span class="title">{{ props.title }}</span>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.bar-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;

  .svg-icon {
    color: currentColor;
    width: 1rem;
    height: 1rem;
  }
}
</style>