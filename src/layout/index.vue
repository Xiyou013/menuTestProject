<template>
  <div class="app-wrapper">
    <div class="titleNavbar">
      <div class="title">
        <span>系统Navbar标题</span>
      </div>
      <div class="head-operation">
        <div class="textBtn" @click="loginOut">退出登录</div>
      </div>
    </div>
    <Sidebar />
    <div class="main-container">
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { Navbar, AppMain, Sidebar } from './components'

const router = useRouter()

const loginOut = () => {
  console.log('退出登录');
  router.push('/login')
  localStorage.clear()
}

</script>

<style lang="less" scoped>
.app-wrapper {
  &:after {
    content: '';
    display: table;
    clear: both;
  }

  display: flex;
  flex-wrap: wrap;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: aquamarine;

  // &.mobile.openSidebar {
  //   position: fixed;
  //   top: 0;
  // }
}

.titleNavbar {
  display: flex;
  width: 100%;
  height: 60px;
  // padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 4px solid #f0f2f5;
  box-sizing: border-box;

  .title {
    width: 80%;
    height: 100%;
    font-size: 20px;
    font-weight: bold;
    padding: 0 0 0 30px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .head-operation {
    width: calc(100% - 80%);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 30px 0 0;
  }
  .textBtn {
    cursor: default;
  }
}

.main-container {
  width: calc(100% - 200px);
  height: calc(100% - 60px);
  background-color: cadetblue;
}
</style>