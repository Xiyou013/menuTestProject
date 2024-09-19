<template>
  <div class="homeFile">
    <div class="loginView">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm"
        :size="formSize" status-icon style="width: 100%">
        <el-form-item label="账号：" prop="account">
          <el-input v-model="ruleForm.account" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="ruleForm.password" type="password" />
        </el-form-item>
        <el-form-item label="" prop="" label-width="30px">
          <el-button type="warning" style="width: 100%;" @click="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { getUserData } from '@/api/user.js'
import { ElMessage, ElMessageBox } from 'element-plus'

const store = useStore()
const router = useRouter()
// form
const ruleFormRef = ref()
const formSize = ref('default')
const ruleForm = ref({
  account: 'admin',
  password: 'admin'
})
const rules = {
  account: [{ required: true, message: '请输入用户名！', trigger: ["blur", "change"] }],
  password: [{ required: true, message: '请输入密码！', trigger: ["blur", "change"] }],
}

// mock
const login = () => {
  getUserData(ruleForm.value).then((res) => {
    if (res) {
      console.log("res2:::::", res);
      // loginMsg1.value = res.data;
    }
  });
}

const onLogin = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      // login(ruleForm.value)
      
      // 通过vuex调用本地mock接口
      store
        .dispatch('menu/login', ruleForm.value).then((val) => {
          console.info('login info:', val)
          if (val.code === 0) {
            ElMessage({
              message: '登录成功',
              type: 'success'
            })
            router.push('/home')
          } else {
            ElMessage.error('登录失败，原因：' + val.msg)
          }
        })
        .catch((err) => {
          console.error('登录异常:' + err)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}


</script>

<style lang="scss" scoped>
.homeFile {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
  display: flex;
  align-items: center;
  justify-content: center;

  .loginView {
    width: 450px;
    height: 250px;
    border: 3px solid #3c3c3c;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 50px 0 20px;
  }
}
</style>