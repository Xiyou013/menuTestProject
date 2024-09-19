<template>
 <div id="package-btn">
  <div class="btn-view" @click="onClick">npm测试按钮</div>
 </div>
</template>

<script setup>
defineOptions({
 name:'btn-views'
})

const onClick = () => {
 console.log('点击npm测试按钮');
}
</script>

<style lang="less">
#package-btn {
width: 100%;
height: 100%;
background-color: cornflowerblue;
.btn-view {
 width: 180px;
 height: 35px;
 border-radius: 3px;
 background-color: #fff;
 color: #333;
 border:1px solid #333;
}
}
</style>