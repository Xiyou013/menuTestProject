<template>
  <div class="locStatusContent">
    <div class="header">
      <span>楼层：</span>
      <el-select v-model="form.floor" placeholder="Select" size="small" style="width: 240px">
        <el-option
          v-for="item in floorList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="cardContents">
      <div class="card-view" v-for="item in locactonsList" :key="item"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({})
const floorList = ref([
  { label: '1楼', value: 1 },
  { label: '2楼', value: 2 },
  { label: '3楼', value: 3 },
  { label: '4楼', value: 4 },
  { label: '5楼', value: 5 }
])
const locactonsList = ref([
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {}
])
</script>

<style lang="scss" scoped>
.locStatusContent {
  width: 100%;
  height: 100%;
  // background-color: rgba(242, 242, 246, 1);
  padding: 10px;
  box-sizing: border-box;
  .header {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background-color: #fff;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 15px;
    box-sizing: border-box;
  }
  .cardContents {
    width: 100%;
    height: calc(100% - 60px);
    background-color: #fff;
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px 0px 10px 10px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .card-view {
    width: calc(100% / 4 - 15px);
    height: 100px;
    border-radius: 5px;
    background-color: rgba(245, 245, 245, 1);
    margin-bottom: 15px;
    margin-right: 15px;
  }
}
</style>
