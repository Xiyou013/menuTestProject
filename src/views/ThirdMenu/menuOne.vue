<template>
  <div class="homeFile">
    <div>ThirdMenu-menuOne</div>
    <vue3-seamless-scroll :list="list" class="scroll" :hover="true" :limitScrollNum="0" :step="1.5" :wheel="true" :copyNum="1" :singleHeight="30" :singleWaitTime="5000">
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
      <div class="item" v-for="(item, index) in list" :key="index">
        <span>{{ item.title }}</span>
        <span>{{ item.date }}</span>
      </div>
    </vue3-seamless-scroll>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
// list: 无缝滚动列表数据，组件内部使用列表长度
// hover: 鼠标悬停
// limitScrollNum: 开启滚动的数据量，只有列表长度大于等于该值才会滚动
// step: 步进速度，其实就是滚动速度，越大越快，越小越慢
// direction：控制滚动方向，可选值up，down，left，right
// wheel: 在开启鼠标悬停的情况下是否开启滚轮滚动，默认不开启
// copyNum: 拷贝列表次数，默认拷贝一次，当父级高度大于列表渲染高度的两倍时可以通过该参数控制拷贝列表次数达到无缝滚动效果.ps: 拷贝两次及两次以上，滚动列表会闪回
// 数据循环的时候会出现衔接空一条数据的高度，笨办法就是将for循环的list列表在vue3-seamless-scroll组件里复制粘贴一次
// singleHeight: 单步运动停止的高度，也就是滚动一条数据朝向前进的距离。ps：单独singleHeight属性就是每秒滚动距离
// singleWaitTime：单步停止的等待时间，也就是滚动一条数据后等待多久，在执行下一条数据滚动动作。ps：singleWaitTime单独使用没有任何作用，需要配合singleHeight属性一起；也就是多少秒滚动一定距离

const list = ref([
  {
    title: "Vue3.0 无缝滚动组件展示数据第1条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第2条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第3条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第4条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第5条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第6条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第7条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第8条",
    date: Date.now(),
  },
  {
    title: "Vue3.0 无缝滚动组件展示数据第9条",
    date: Date.now(),
  },
]);
</script>

<style lang="scss" scoped>
.homeFile {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}
.scroll {
  height: 270px;
  width: 500px;
  margin: 100px auto;
  overflow: hidden;
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
}
</style>