<template>
  <div class="tool-param-wrap">
    <!-- 向右的箭头 展开 -->
    <div v-if="isFold" class="r-arrow" @click="handleTrigger">
      点击1
    </div>
    <div :class="['group-wrap', isFold ? 'is-fold' : 'not-fold']">
      <!-- 向左的箭头 折叠 -->
      <div class="fold-icon" @click="handleTrigger">
        <!-- <el-icon class="el-icon-arrow-left"></el-icon> -->
        点击2
      </div>
    </div>
    <div :class="['group-p-box', isFold ? 'g-not-fold' : 'g-is-fold']"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isFold = ref(false)


const handleTrigger = () => {
  isFold.value = !isFold.value;
}
</script>

<style lang="scss" scoped>
.homeFile {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}

.tool-param-wrap {
  display: flex;
  position: relative;
  width: 100%;
  // height: calc(100vh - 78px);
  height: 100%;

  .r-arrow {
    cursor: pointer;
    position: absolute;
    width: 14px;
    height: 14px;
    left: 15px;
    top: 28px;
    background-color: #f2f3f8;
  }

  .group-wrap {
    height: 100%;
    overflow-y: auto;
    background-color: #94a4f3;
    box-sizing: border-box;
  }

  .is-fold {
    transition: all 0.5s;
    width: 0px;
    border: 1px solid #f2f3f8;
  }

  .not-fold {
    width: 200px;
    border: 1px solid #f2f3f8;
    transition: all 0.5s;
  }

  .group-p-box {
    height: 100%;
    overflow-y: auto;
    background-color: #f2f3f8;
  }

  .g-not-fold {
    width: 100%;
    // transition: width 1s;
  }

  .g-is-fold {
    transition: all 0.5s ease-in-out;
    width: calc(100% - 200px);
  }
}
</style>