<script setup>
import { ref } from 'vue'
import {addFn, logFn} from 'verdaccio-demo-publish'

defineProps({
  msg: String,
})

const count = ref(0)
const sum = ref(0)
const content = ref('终于整理完毕了！！！')

const onClickAdd = () => {
  sum.value = addFn(3, 5)
  console.log('sum:', sum.value);
}
const onClickLog = () => {
  logFn(content.value)
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  <div>
    <p>测试私有库npm包</p>
    <div><span class="textBtn" @click="onClickAdd">点击计算3+5和：</span><span>{{ sum }}</span></div>
    <div><span class="textBtn" @click="onClickLog">打印传过去的参数：</span><span>{{ content }}</span><span></span></div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.textBtn {
  color: blue;
}
</style>
