<template>
  <div class="taskManage-container">
    <div class="task-header-form">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="100px" inline @submit.native.prevent
        class="demo-ruleForm">
        <el-form-item label="容器编码" prop="container_code">
          <el-input v-model="form.container_code" placeholder="请输入" @keyup.enter="onSelTaskInfo" clearable
            style="width: 180px;" />
        </el-form-item>
        <el-form-item label="任务ID" prop="id">
          <el-input v-model="form.id" placeholder="请输入" @keyup.enter="onSelTaskInfo" clearable style="width: 180px;" />
        </el-form-item>
        <el-form-item label="任务类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择" clearable @keyup.enter="onSelTaskInfo" style="width: 180px;">
            <el-option v-for="item in taskTypeList" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="任务状态" prop="state">
          <el-select v-model="form.state" placeholder="请选择" clearable @keyup.enter="onSelTaskInfo"
            style="width: 180px;">
            <el-option v-for="item in taskStateList" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="任务下发时间" prop="time">
          <el-date-picker v-model="form.time" type="datetimerange" start-placeholder="Start date"
            end-placeholder="End date" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
            date-format="YYYY/MM/DD" time-format="HH:mm:ss" />
        </el-form-item>
        <el-form-item label="" prop="">
          <el-button type="primary" @click="onSelTaskInfo"> 查询 </el-button>
          <el-button @click="onResetTaskInfo">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="task-table-view">
      <div class="table-view">
        <el-table :data="taskList" style="width: 100%" height="100%">
          <el-table-column prop="id" label="任务ID" align="center">
            <template #default="scoped">
              <div>
                {{ scoped.row.id || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="mission_type" label="任务类型" align="center">
            <template #default="scoped">
              <div>
                {{ TASKTYPELABEL[scoped.row.mission_type] || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="biz_mission_type" label="业务类型" align="center">
            <template #default="scoped">
              <div>
                {{ scoped.row.biz_mission_type || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="from_loc_name" label="起点名称" align="center">
            <template #default="scoped">
              <div>
                {{ scoped.row.from_loc_name || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="to_loc_name" label="终点名称" align="center">
            <template #default="scoped">
              <div>
                {{ scoped.row.to_loc_name || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="任务状态" align="center">
            <template #default="scoped">
              <div>
                <span :class="[`state-style${scoped.row.state}`]">
                  {{ TASKSTATETYPELABEL[scoped.row.state] || '---' }}
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cur_loc_name" label="当前位置" align="center">
            <template #default="scoped">
              <div>
                {{ scoped.row.cur_loc_name || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="container_name" label="容器编码" align="center">
            <template #default="scoped">
              <div>
                {{ scoped.row.container_name || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="任务下发时间" align="center">
            <template #default="scoped">
              <div>
                {{ scoped.row.created_at || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="finish_time" label="任务完成时间" align="center">
            <template #default="scoped">
              <div>
                {{ scoped.row.finish_time || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作" align="center">
            <template #default="scoped">
              <div class="btn-list">
                <div class="btn-style"
                  v-if="scoped.row?.state === TASKSTATETYPEKEY.waitting_sent || scoped.row?.state === TASKSTATETYPEKEY.waitting_run || scoped.row?.state === TASKSTATETYPEKEY.running"
                  @click="onForced(scoped.row)">强制执行</div>
                <div class="btn-style"
                  v-if="scoped.row?.state === TASKSTATETYPEKEY.waitting_sent || scoped.row?.state === TASKSTATETYPEKEY.waitting_run || scoped.row?.state === TASKSTATETYPEKEY.running"
                  @click="onCancel(scoped.row)">任务取消</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination-container">
        <el-pagination :current-page="pageData.page" :page-size="pageData.per_page" layout="prev, pager, next, total"
          :total="pageData.total" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, onBeforeUnmount, ref, watch, computed } from 'vue'
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useI18n } from 'vue-i18n'
// import { queryMission, queryMissionDone, queryMissionCancel } from '@/api/task.js'
// import { REQUESTSTATUS, TASKTYPELABEL, TASKSTATETYPELABEL, TASKSTATETYPEKEY } from '@/utils/enum.js'

let timer = null
const form = ref({})
const ruleFormRef = ref()
const rules = []
const taskList = ref([])

const taskTypeList = ref([
  { id: 1, label: '入库' },
  { id: 2, label: '出库' },
  { id: 3, label: '移库' },
  { id: 4, label: '入库拣选' },
  { id: 5, label: '出库拣选' },
  { id: 6, label: '点到点' },
  { id: 7, label: '临时' },
  { id: 8, label: '中转' },
])
const taskStateList = ref([
  { id: 1, label: '待发送' },
  { id: 2, label: '待执行' },
  { id: 3, label: '运行中' },
  { id: 4, label: '成功' },
  { id: 5, label: '取消' },
  { id: 6, label: '失败' },
  { id: 7, label: '重置成功' }
])

const pageData = ref({
  page: 1,
  per_page: 14,
  total: 0
})

const getTaskData = () => {
  queryMission({
    id: Number(form.value.id),
    container_code: form.value.container_code,
    type: form.value.type,
    state: form.value.state,
    min_create_time: form.value.start_time,
    max_create_time: form.value.end_time,
    page: pageData.value.page,
    per_page: pageData.value.per_page
  }).then((res) => {
    let result = res.data
    if (res.code === REQUESTSTATUS.ok) {
      taskList.value = result.list || []
      pageData.value.total = result.total || 0
    }
  }).catch((err) => {
    console.log('err', err);
    ElMessage.error('get queryMission error:' + err.msg)
  })
}

const onSelTaskInfo = () => {
  console.log('form.value', form.value);
  if (form.value.time && form.value.time.length > 0) {
    let [start, end] = form.value.time
    form.value.start_time = start
    form.value.end_time = end
  }
  pageData.value.page = 1
  setTimer()
}

const onResetTaskInfo = () => {
  form.value = {}
  pageData.value.page = 1
  onSelTaskInfo()
}

// 强制完成
const onForced = (row) => {
  console.log('row', row);
  ElMessageBox.confirm('确定强制完成当前任务吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      queryMissionDone({ id: row.id })
        .then((res) => {
          if (res.code === REQUESTSTATUS.ok) {
            ElMessage.success('强制完成成功!')
            setTimer()
          } else {
            // ElMessage.error('强制完成失败！')
            ElMessage.error('强制完成失败！' + res.msg)
          }
        })
        .catch((error) => {
          console.error('task queryMissionDone catch:' + error.msg)
          ElMessage.error('强制完成失败！' + error.msg)
        })
    })
    .catch(() => {
      // ElMessage('取消任务操作')
    })
}

// 任务取消
const onCancel = (row) => {
  console.log('row', row);
  ElMessageBox.confirm('确定取消当前任务吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      queryMissionCancel({ id: row.id })
        .then((res) => {
          if (res.code === REQUESTSTATUS.ok) {
            ElMessage.success('取消成功!')
            setTimer()
          } else {
            // ElMessage.error('取消失败！')
            ElMessage.error('取消失败！' + res.msg)
          }
        })
        .catch((error) => {
          console.error('task queryMissionCancel catch:' + error.msg)
          ElMessage.error('取消失败！' + error.msg)
        })
    })
    .catch(() => {
      // ElMessage('取消任务操作')
    })
}

const handleCurrentChange = (val) => {
  // eslint-disable-next-line no-console
  console.log(`当前页: ${val}`)
  // allData.page = val
  pageData.value.page = val
  setTimer()
}

// 定时器
const setTimer = () => {
  clearInterval(timer)
  timer = null
  // timer = setInterval(() => {
  //   getTaskData()
  // }, 5000)
  // getTaskData()
}

onMounted(() => {
  // getOrderList()
  setTimer()
})
onUnmounted(() => {
  clearInterval(timer)
  timer = null
})
</script>

<style lang="less" scoped>
.taskManage-container {
  width: 100%;
  height: 100%;
  background-color: rgba(243, 247, 247, 1);
  padding: 20px;
  box-sizing: border-box;

  .task-header-form {
    width: 100%;
    height: 110px;
    border-radius: 5px;
    margin-bottom: 15px;
    background-color: #fff;
    padding: 15px 15px 0 15px;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;

    // align-items: center;
    .demo-ruleForm {
      // display: flex;
      // align-items: center;
      text-align: left;
    }
  }

  .task-table-view {
    width: 100%;
    height: calc(100% - 160px);
    border-radius: 5px;
    background-color: #fff;

    .pagination-container {
      width: 100%;
      height: 50px;
      // background-color: antiquewhite;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .table-view {
      width: 100%;
      height: calc(100% - 50px);
      // background-color: aquamarine;
      padding: 15px;
      box-sizing: border-box;
    }

    .btn-list {
      display: flex;
      justify-content: space-evenly;

      .btn-style {
        color: rgba(76, 136, 217, 1);
        cursor: default;
      }
    }
  }

  .state-style1 {
    color: #333;
  }

  .state-style2 {
    color: rgba(76, 136, 217, 1);
  }

  .state-style3 {
    color: rgba(118, 153, 70, 1);
  }

  .state-style4 {
    color: rgba(105, 105, 105, 0.8);
  }

  .state-style5 {
    color: rgba(118, 153, 70, 1);
  }
}
</style>
