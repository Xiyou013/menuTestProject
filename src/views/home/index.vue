<template>
 <div class="homeFile">
  <div>首页</div>
  <div class="btnView">
    按钮权限:
    <div class="btnItem" v-for="item in btnList">
      <div class="clo">{{item}}:&ensp;</div>
      <div :class="['btnStyle']" @click="onClick(item)" v-has="`${item}`">{{ item }}</div>
      <div>&emsp;{{ message[item] || '' }}</div>
    </div>
  </div>
  
 </div>
</template>

<script setup>
import { ref } from 'vue'

const btnList = ref(['btn1', 'btn2', 'btn3'])
const message = ref({})

const onClick = (item) => {
  console.log('item', item);
  message.value[item] = '这是按钮' + item
}

</script>

<style lang="less" scoped>
.homeFile{
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}
.btnView {
  width: auto;
  height: 200px;
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
</style>