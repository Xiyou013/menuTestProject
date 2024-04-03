<template>
  <div class="homeFile">
    <div class="scrollView">
      <div class="tableHeader">
        <div class="col">ID</div>
        <div class="col">name</div>
        <div class="col">desc</div>
      </div>
      <Vue3SeamlessScroll class="scroll" v-model="isScroll" :list="listData" :step="0.5" :hover="true"
        :limit-scroll-num="3" :wheel="true" :singleHeight="30" :singleWaitTime="5000">
        <div class="tableItem" v-for="item in listData" :key="item.id">
          <div class="col">{{ item.id }}</div>
          <div class="col">{{ item.name }}</div>
          <div class="col">{{ item.desc }}</div>
        </div>
      </Vue3SeamlessScroll>
    </div>
  </div>
</template>

<script setup>
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { ref } from 'vue'


const isScroll = ref(true)

const listData = ref([
  { id: 1, name: '第一条', desc: '111111111' },
  { id: 2, name: '第二条', desc: '222222222' },
  { id: 3, name: '第三条', desc: '333333333' },
  { id: 4, name: '第四条', desc: '444444444' },
  { id: 5, name: '第五条', desc: '555555555' },
  { id: 6, name: '第六条', desc: '666666666' },
  { id: 7, name: '第七条', desc: '777777777' },
  { id: 8, name: '第八条', desc: '888888888' },
  { id: 9, name: '第九条', desc: '999999999' },
  { id: 10, name: '第十条', desc: '101010101010101010' },
])
</script>

<style lang="scss" scoped>
.homeFile {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;

  .scrollView {
    width: 400px;
    height: 200px;
    border: 2px solid #333;
    background-color: #fff;
  }

  .tableHeader {
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #333;
    display: flex;

  }
  .col {
    width: calc(100% / 3);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .scroll {
    width: 100%;
    height: calc(100% - 30px);
    overflow: hidden;
  }
  .tableItem {
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #333;
    display: flex;
    box-sizing: border-box;
  }
}
</style>