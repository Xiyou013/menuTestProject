<template>
  <div class="homeFile">
    <div>首页</div>
    <div class="btnView">
      按钮权限:
      <div class="btnItem" v-for="item in btnList">
        <div class="clo">{{ item }}:&ensp;</div>
        <div :class="['btnStyle']" @click="onClick(item)" v-has="`${item}`">{{ item }}</div>
        <div>&emsp;{{ message[item] || '' }}</div>
      </div>
    </div>
    <div class="a-test">
      插件显示：
      <div class="componentsView">
        按钮插件：
        <btn-views />
        svg插件：
        <svg-icon name="area" color="red" size="30px" :tarans="90" left="20px" top="20px" right="20px" bottom="20px" />
        11111:
        <svg-icons name="location" />
      </div>
    </div>
    <div class="test-div">
      测试css变量
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
// import { packageView } from 'verdaccio-demo-publish'
// const {btnView} = packageView

const btnList = ref(['btn1', 'btn2', 'btn3'])
const message = ref({})

const testWidth = '200px'

const onClick = (item) => {
  console.log('item', item);
  message.value[item] = '这是按钮' + item
}

onMounted(() => {
  // setTimeout(() => {
  //   window.location.href = 'http://172.22.1.166:3000/#/stationStatus'
  // }, 1000)
})

</script>

<style lang="less" scoped>
.homeFile {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}

.btnView {
  width: auto;
  height: 200px;

  // background-color: aquamarine;
  // text-align: left;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-around;
  // align-content: center;
  .clo {
    width: 120px;
    height: 50px;
    text-align: left;
    line-height: 50px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }

  .btnItem {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .btnStyle {
    width: 120px;
    height: 35px;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
  }
}

// .a-test {
//   width: 120px;
//   height: 200px;
//   background-color: aquamarine;
// }

.test-div {
  // width: 200px;
  width: v-bind('testWidth');
  height: 100px;
  background-color: #fff;
  margin-top: 20px;
}

.componentsView {
  width: 100%;
  height: 100px;
  // background-color: cadetblue;
}

.componentsView #package-btn {
  background-color: #fff;
  height: auto;
}

:deep(.componentsView #package-btn .btn-view) {
  background-color: chocolate;
}
</style>