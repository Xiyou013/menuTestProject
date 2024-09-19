<template>
  <div class="taskManage">
    <div v-if="!isSubtask" class="main_task">
      <div class="flexContainer">
        <div>
          <span class="stateItem">总任务：
            <span class="state1">{{ statisticObj.total || '--' }}</span>
          </span>
          <span class="stateItem">排队中：
            <span class="state1">{{ statisticObj.pending || '--' }}</span>
          </span>
          <span class="stateItem">运行中：
            <span class="state2">{{ statisticObj.running || '--' }}</span>
          </span>
          <span class="stateItem">已完成：
            <span class="state3">{{ statisticObj.finished || '--' }}</span>
          </span>
          <span class="stateItem">已取消：
            <span class="state5">{{ statisticObj.canceled || '--' }}</span>
          </span>
        </div>
        <!-- <div class="countInfo">
          <el-date-picker v-model="formTemp.dateRange" type="datetimerange" range-separator="至"
            start-placeholder="选择开始日期" end-placeholder="选择结束日期" format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss" @change="changeDateRange" style="width: 350px" />
          <span style="margin-left: 10px; margin-right: 10px; font-size: 15px">小车ID：</span>
          <el-select v-model="formTemp.rid" placeholder="请选择" style="width: 150px" clearable
            @change="resetPageSelList()">
            <el-option v-for="item in ridList" :key="item" :label="item" :value="item" />
          </el-select>
          <span style="margin-left: 10px; margin-right: 10px; font-size: 15px">任务状态：</span>
          <el-select v-model="formTemp.stateType" placeholder="请选择" multiple collapse-tags collapse-tags-tooltip
            style="width: 160px; margin-right: 10px" clearable @change="onChangeStateType(formTemp.stateType)">
            <el-option v-for="item in stateTypeList" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
          <el-button type="warning" size="small" style="height: 30px; margin-left: 10px"
            @click="resetPageSelList()">查询</el-button>
          <el-button type="warning" plain size="small" style="height: 30px" class="cancelBtn"
            @click="resetSearch()">重置</el-button>
        </div> -->
      </div>
      <div class="table-wrap">
        <el-table :data="tableData" :row-class-name="tableRowClassName" style="width: 100%" height="100%"
          class="tableBox">
          <el-table-column prop="id" align="center" label="编号">
            <template #default="scope">
              {{ scope.row.id || '---' }}
            </template>
          </el-table-column>
          <el-table-column prop="uuid" label="CMP编号" align="center" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.uuid || '---' }}
            </template>
          </el-table-column>
          <el-table-column prop="robot_id" label="叉车" align="center" show-overflow-tooltip>
            <template #default="scope">
              {{ scope.row.robot_id || '---' }}
            </template>
          </el-table-column>
          <el-table-column prop="state" align="center" label="主任务状态">
            <template #default="scope">
              <span :class="[`state${scope.row.state}`]">{{ TASKSTATETEXT[scope.row.state] || '---' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="err_msg" align="center" show-overflow-tooltip label="错误信息">
            <template #default="scope">
              <div>
                {{ scope.row.err_msg || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="pallet_no" align="center" show-overflow-tooltip label="托盘号">
            <template #default="scope">
              <div>
                {{ scope.row.pallet_no || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="priority" align="center" label="优先级">
            <template #default="scope">
              {{ scope.row.priority }}
            </template>
          </el-table-column>
          <el-table-column prop="type_str" align="center" label="任务类型">
            <template #default="scope">
              {{ scope.row.type_str }}
            </template>
          </el-table-column>
          <el-table-column prop="cancel_reason" align="center" show-overflow-tooltip label="取消原因">
            <template #default="scope">
              <div>
                {{ scope.row.cancel_reason || '---' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="src" align="center" label="起点">
            <template #default="scope">
              {{ scope.row.src || '---' }}
            </template>
          </el-table-column>
          <el-table-column prop="dst" align="center" label="终点">
            <template #default="scope">
              {{ scope.row.dst || '---' }}
            </template>
          </el-table-column>
          <el-table-column prop="create_time" align="center" label="创建时间">
            <template #default="scope">
              {{ scope.row.create_time || '---' }}
            </template>
          </el-table-column>
          <el-table-column prop="start_time" align="center" label="开始时间">
            <template #default="scope">
              {{ scope.row.start_time || '---' }}
            </template>
          </el-table-column>
          <el-table-column prop="finish_time" align="center" label="完成时间">
            <template #default="scope">
              {{ scope.row.finish_time || '---' }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" align="center">
            <template #default="scope">
              <div style="display: flex; flex-wrap: wrap; justify-content: center">
                <div style="width: 100px; padding: 5px 0px; color: #89c1fd; cursor: default" class="handler remove"
                  @click="detailsTask(scope.row)">
                  查看子任务
                </div>
                <div class="handler remove" style="width: 60px; padding: 5px 0px; color: #f56c6c; cursor: default"
                  v-show="scope.row.state === TASKSTATE.waitting || scope.row.state === TASKSTATE.running"
                  @click="onCancelTask(scope.row)">
                  取消
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width: 100%; height: 30px; display: flex; justify-content: center">
        <el-pagination :current-page="pageData.page" :page-size="pageData.per_page" layout="prev, pager, next, total"
          :total="total" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- <Subtask v-else :id="taskDetails.id" :data="taskDetails" :ridList="ridList" @back="onBackMainTask"
      @updata="onUpdataSubTask">
    </Subtask> -->
  </div>
</template>
<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'
import i18n from '@/lang/index.js'
// import { useI18n } from 'vue-i18n'
import { onMounted, onUnmounted, ref, watch, computed, onDeactivated } from 'vue'
// import { queryRobot } from '@/api/home'
// import {
//   TASKSTATE,
//   APITYPE,
//   TASKSTATETEXT
// } from '@/utils/enum.js'
// import {
//   queryTaskStat,
//   queryTask,
//   queryRidOpts,
//   cancelTask
// } from '../../api/task'
// import Subtask from './subtask.vue'

const rules = {
  priority: [{ required: true, message: '优先级不能为空' }],
  dateRange: [{ required: true, message: '请选择时间' }],
  rid: [{ required: true, message: '请选择agv' }],
  state: [{ required: true, message: '请选择任务状态' }]
}
// const TIME_TEXT = ['create_time', 'start_time', 'update_time', 'finish_time']
// const TASK_STATE = {
//   0: '排队中',
//   1: '执行中',
//   4: '取消中',
//   5: '正常完成',
//   6: '取消完成',
//   7: '出错终止'
// }
// const formatState = {
//   '-1': '',
//   0: '0',
//   1: taskState.carring,
//   5: taskState.finished,
//   6: taskState.cancel_finished,
//   7: taskState.error_finished,
//   8: taskState.reset_finished
// }
const tHeight = 'calc(100% - 80px)'
const windowHeight = ref(null)
let tableData = ref([])
let total = ref(0)
const total_page = ref(0)
const stateTypeList = ref([
  { id: 0, label: '排队中' },
  { id: 1, label: '运行中' },
  { id: 5, label: '已完成' },
  { id: 6, label: '已取消' },
])
const taskStateList = ref([])
const agvCostTime = ref(0)

let dateRange = ref([])
let statisticObj = ref({})
let formTemp = ref({
  dateRange: [],
  state: '',
  start: '',
  end: '',
})
let sureFormTemp = ref({})
let ridList = ref([])
let isSubtask = ref(false)
let isUpdata = ref(false)
let taskDetails = ref({})
const today = ref()
let pageData = ref({
  page: 1,
  per_page: 13
})

// 日期时间
const formatTime = (val) => {
  let day = ''
  if (val) {
    // day = dayjs.unix(val).format('YYYY-MM-DD HH:mm:ss')
    day = dayjs(val).format('DD/MM/YYYY HH:mm:ss')
  }
  return day
}
// 任务状态数目
// const getStatictis = () => {
//   queryTaskStat().then((res) => {
//     if (res.err === APITYPE.success) {
//       statisticObj.value = res.data
//       console.log('statisticObj.value', statisticObj.value);
//     } else {
//       ElMessage.error('获取任务统计数据失败：' + res.msg)
//     }
//   })
// }
// 小车id
// const getRidOpts = () => {
//   queryRidOpts().then((res) => {
//     if (res.err === 0) {
//       ridList.value = res.data || []
//     } else {
//       ElMessage.error('Failed to obtain task source, reason：' + res.msg)
//     }
//   })
// }

const confirmDownLoad = () => {
  downloadform.value.validate((valid) => {
    if (valid) {
      // let downloadhref =
      //   'http://' +
      //   window.location.host +
      //   '/export_mission?start=' +
      //   new Date(downloadTemp.value.dateRange[0]).getTime() / 1000 +
      //   '&end=' +
      //   new Date(downloadTemp.value.dateRange[1]).getTime() / 1000 +
      //   '&rid=' +
      //   downloadTemp.value.rid.join(',') +
      //   '&state=' +
      //   downloadTemp.value.state.join(',')
      // console.log('下载地址', downloadhref)
      // const downloadElement = document.createElement('a')
      // // const href = window.URL.createObjectURL(downloadhref) // 创建下载的链接
      // downloadElement.href = downloadhref
      // const nameStr = '导出任务.docx'
      // downloadElement.download = nameStr // 下载后文件名
      // document.body.appendChild(downloadElement)
      // downloadElement.click() // 点击下载
      // document.body.removeChild(downloadElement) // 下载完成移除元素
      downloadMission({
        start: new Date(downloadTemp.value.dateRange[0]).getTime() / 1000,
        end: new Date(downloadTemp.value.dateRange[1]).getTime() / 1000,
        rid: downloadTemp.value.rid.join(','),
        state: downloadTemp.value.state.join(',')
      }).then((res) => {
        const downloadElement = document.createElement('a')
        const href = window.URL.createObjectURL(res) // 创建下载的链接
        downloadElement.href = href
        const nameStr = '导出任务列表.xls'
        downloadElement.download = nameStr // 下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() // 点击下载
        document.body.removeChild(downloadElement) // 下载完成移除元素
        window.URL.revokeObjectURL(href) // 释放掉blob对象
      })
      closeDownDialog()
    }
  })
}


// 任务列表
const queryTaskList = () => {
  queryTask({
    state: sureFormTemp.value.state || '',
    rid: sureFormTemp.value.rid || '',
    // src: sureFormTemp.value.source || '',
    // error: sureFormTemp.value.error || '',
    start: sureFormTemp.value.start || '',
    end: sureFormTemp.value.end || '',
    size: pageData.value.per_page,
    page: pageData.value.page
  })
    .then((res) => {
      tableData.value = res.data.data || []
      // formatTaskList()
      total.value = res.data.total
      total_page.value = res.data.total_page
      // let lang = localStorage.getItem('localeLanguage')
      if (isUpdata.value) {
        let data = tableData.value.filter((item) => {
          return item.id === taskDetails.value.id
        })
        taskDetails.value = { ...data[0] }
        isUpdata.value = false
        // console.log('taskDetails.value', taskDetails.value)
      }
    })
    .catch((err) => {
      console.error('TaskManage queryTask catch:', err)
    })
}

const onSeachList = (page) => {
  if (formTemp.value.dateRange && formTemp.value.dateRange.length > 0) {
    let [start, end] = formTemp.value.dateRange
    formTemp.value.start = dayjs(start).unix()
    formTemp.value.end = dayjs(end).unix()
  } else {
    formTemp.value.start = null
    formTemp.value.end = null
  }
  if (formTemp.value.stateType) {
    formTemp.value.state = formTemp.value.stateType.join(',')
  }
  sureFormTemp.value = { ...formTemp.value }
  console.log('sureFormTemp.value', sureFormTemp.value)
  pageData.value.page = page
  // getAgvCostTime()
  queryTaskList()
}

const resetPageSelList = () => {
  pageData.value.page = 0
  onSeachList(1)
}

const onChangeStateType = (val) => {
  resetPageSelList()
}

const setTimer = () => {
  clearInterval(timer)
  // timer = setInterval(() => {
  //   getStatictis()
  //   onSeachList(pageData.value.page)
  // }, 5000)
  getStatictis()
  onSeachList(pageData.value.page)
}

const handleCurrentChange = (val) => {
  pageData.value.page = val
  queryTaskList()
}

// 更新主任务-子任务
const onUpdataSubTask = (value) => {
  console.log('更新');
  if (value === 'updata') {
    isUpdata.value = true
  }
  setTimer()
}
let timer = null
// 查看子任务
const detailsTask = (row) => {
  clearInterval(timer)
  timer = null
  taskDetails.value = { ...row }
  isSubtask.value = true
}

// 取消任务
const onCancelTask = (row) => {
  ElMessageBox.alert(
    '确定取消该任务？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      confirmButtonClass: 'confirmButton',
      cancelButtonClass: 'cancelButton'
    }
  )
    .then(() => {
      cancelTask({ id: row.id })
        .then((res) => {
          if (res.err === 0) {
            ElMessage({
              type: 'success',
              message: '主任务取消成功!'
            })
            // getStatictis()
            // queryTaskList()
            setTimer()
          } else {
            ElMessage.error('Cancel task failed! reason:' + res.msg)
          }
        })
        .catch((error) => {
          console.error('TaskManage cancelMission catch:', error)
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消'
      })
    })
}
const tableRowClassName = ({ row, rowIndex }) => {
  if (row.err_msg !== '') {
    return 'error-row'
  }

  return 'info-row'
}

const changeDateRange = (val) => {
  // console.log('选择时间', new Date(val[0]).getTime(), dateRange.value)
  getStatictis()
  resetPageSelList()
}

const obtainHeight = () => {
  const windowWidth = window.innerWidth
  windowHeight.value = window.innerHeight
  console.log('windowWidth, windowHeight', windowWidth, windowHeight.value)
  const tdNum = (windowHeight.value - 250) / 60
  // console.log('tdNum', tdNum, Math.trunc(tdNum))
  pageData.value.per_page = Math.trunc(tdNum)
  // pageData.value.per_page = 1
}
const resetSearch = () => {
  formTemp.value = {}
  taskStateList.value = []
  resetPageSelList()
}

// 返回主任务
const onBackMainTask = (value) => {
  isSubtask.value = false
  setTimer()
}
watch(
  () => windowHeight.value,
  (newVal, oldValue) => {
    console.log('newVal, oldValue', newVal, oldValue)
  }
)
let isLogin = ref(false)

onMounted(() => {
  // formTemp.value.auto_refresh = true
  obtainHeight()
  // getRidOpts()
  // setTimer()
  window.onresize = () => {
    return (() => {
      obtainHeight()
      // onSeachList(1)
      // resetPageSelList()
    })()
  }
})
onDeactivated(() => {
  clearInterval(timer)
  timer = null
  clearInterval(timers)
  timers = null
})
</script>
<style lang="less" scoped>
.taskManage {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  // width: 100%;
  // height: 100%;
  // margin: 10px;
  // padding: 10px;
  // background: #5e93e2;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  margin: 10px 10px 0 10px;
  padding: 10px;
  background: #fff;
  border-radius: 10px 10px 0 0;
  color: #333;
  box-sizing: border-box;

  .main_task {
    width: 100%;
    height: 100%;
  }

  .flexContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 99%;
    height: 50px;
    // background-color: #e8a73c;
  }

  .countInfo {
    display: flex;
    justify-content: flex-start;
    // width: 96%;
    // color: #fff;
    // padding-bottom: 15px;
    line-height: 30px;
    color: #333;
    align-items: center;
    // background-color: #89c1fd;
  }

  .stateItem {
    margin-right: 20px;

    .state1 {
      padding: 3px;
      border: 1px solid #7d7c7c;
      color: #7d7c7c;
      background: rgba(124, 124, 124, 0.2);
    }

    .state2 {
      padding: 3px;
      border: 1px solid #89c1fd;
      color: #89c1fd;
      background: rgba(137, 193, 253, 0.2);
    }

    .state3 {
      padding: 3px;
      border: 1px solid #67c23a;
      color: #67c23a;
      background: rgba(103, 194, 58, 0.2);
    }

    .state4 {
      padding: 3px;
      border: 1px solid #f56c6c;
      color: #f56c6c;
      background: rgba(245, 108, 108, 0.2);
    }

    .state5 {
      padding: 3px;
      border: 1px solid #e6a23c;
      color: #e6a23c;
      background: rgba(230, 162, 60, 0.2);
    }
  }

  .table-wrap {
    max-width: 100%;
    width: 100%;
    height: calc(100% - 90px);
    // margin-bottom: 30px;
    // background: #191f28;
    background: #f3d5d5;

    .state0 {
      font-size: 12px;
      padding: 3px;
      border: 1px solid #7d7c7c;
      color: #7d7c7c;
      background: rgba(124, 124, 124, 0.2);
    }

    .state1 {
      font-size: 12px;
      padding: 3px;
      border: 1px solid #89c1fd;
      color: #89c1fd;
      background: rgba(137, 193, 253, 0.2);
    }

    .state5 {
      font-size: 12px;
      padding: 3px;
      border: 1px solid #67c23a;
      color: #67c23a;
      background: rgba(103, 194, 58, 0.2);
    }

    .state4,
    .state6 {
      font-size: 12px;
      padding: 3px;
      border: 1px solid #e6a23c;
      color: #e6a23c;
      background: rgba(230, 162, 60, 0.2);
    }

    .state7 {
      font-size: 12px;
      padding: 3px;
      border: 1px solid #f56c6c;
      color: #f56c6c;
      background: rgba(245, 108, 108, 0.2);
    }

    // :deep(.el-table__body-wrapper::-webkit-scrollbar {
    //   width: 4px;
    //   background: #333;
    // }
    .tepMsg {
      display: inline-block;
      // width: 140px;
      margin-right: 5px;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
      background-color: rgba(103, 194, 58, 0.1);
      border: 0.5px solid #67c23a5d;
    }

    .cancelBtn {
      background-color: rgba(230, 162, 60, 0.2);
      border: 0.5px solid #e6a23c70;
    }

    .cancelBtn:hover {
      background-color: rgba(230, 162, 60, 0.2);
      border: 0.5px solid #e6a23c70;
    }
  }

  .cancelBtn {
    background-color: rgba(230, 162, 60, 0.2);
    border: 0.5px solid #e6a23c70;
  }

  .cancelBtn:hover {
    background-color: rgba(230, 162, 60, 0.2);
    border: 0.5px solid #e6a23c70;
  }

  // :deep(.el-table {
  //   // background: #191f28;
  //   background-color: #fff;
  // }
  :deep(.el-table th) {
    // background-color: #fff !important;
    background-color: #e8a73c !important;
    color: #fff !important;
    border-color: #ffffff !important;
  }

  .el-table::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
  }

  :deep(.tableBox) {
    th {
      padding: 0 !important;
      height: 60px;
      // line-height: 10px;
    }

    td {
      padding: 0 !important;
      height: 60px;
      // line-height: 30px;
    }
  }

  // .el-table::before {
  //   // background: #191f28;
  //   background: #fff;
  //   border: none !important;
  // }
  // .el-table::after {
  //   border: 0px solid black;
  // }
  // .el-table--border {
  //   border: 0px solid black;
  // }
  :deep(.el-table .error-row) {
    // --el-table-tr-bg-color: #31363f
    // background-color: #f3cdcd !important;
    // background: rgba(245, 108, 108, 0.2) !important;
    background-color: #fde2e2 !important;
  }

  :deep(.el-table .info-row) {
    background-color: #fff !important;
  }

  :deep(.el-table td) {
    border-bottom: 1px solid #e5e7eb !important;
    color: #333;
  }

  // ----------修改elementui表格的默认样式-----------
  :deep(.el-table__body-wrapper) {
    overflow: auto;

    &::-webkit-scrollbar {
      // 整个滚动条
      width: 0; // 纵向滚动条的宽度
      height: 6px;
      background: rgba(213, 215, 220, 0.3);
      border: none;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255);
      border-radius: 10px;
      background-color: #fff;
    }

    /*定义滑块 内阴影+圆角*/
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(194, 193, 193, 0.3);
      background-color: rgb(167, 164, 164);
    }
  }

  // 隐藏table gutter列和内容区右侧的空白
  :deep(.el-table th.gutter) {
    display: none;
    width: 0;
  }

  :deep(.el-table colgroup col[name='gutter']) {
    display: none;
    width: 0;
  }

  :deep(.el-table__body) {
    width: 100% !important;
  }

  // table固定列后，统一悬浮高亮
  :deep(.el-table .el-table__body tr.hover-row > td) {
    background-color: #f5f7fa !important;
  }

  // 固定列后，解决固定列与表格的高度差问题
  :deep(.el-table__fixed-right, .el-table__fixed-body-wrapper) {
    height: 100% !important;
  }

  // 固定列底部border删除
  :deep(.el-table__fixed-right::before, .el-table__fixed::before) {
    height: 0px;
  }

  //----------------------------------
  // 隐藏滚动条
  // ::-webkit-scrollbar {
  //   width: 0px;
  //   height: 0px;
  //   background-color: #f5f5f5 !important;
  // }

  /*定义滚动条轨道 内阴影+圆角*/
  // ::-webkit-scrollbar-track {
  //   -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255);
  //   border-radius: 10px;
  //   background-color: #f5f5f5;
  // }

  // /*定义滑块 内阴影+圆角*/
  // ::-webkit-scrollbar-thumb {
  //   border-radius: 10px;
  //   -webkit-box-shadow: inset 0 0 6px rgba(194, 193, 193, 0.3);
  //   background-color: rgb(167, 164, 164);
  // }
  // ---------------------------------------------------------
}

// :deep(.el-dialog) {
//   background: #434343 !important;
//   padding: unset;
//   color: #fff;

//   .el-dialog__header {
//     padding: 10px;
//     text-align: center;
//     background-color: #1a1f28;

//     .el-dialog__title {
//       color: #fff;
//     }

//     .el-dialog__headerbtn {
//       top: 10px;
//       color: #fff;
//     }
//   }

//   .el-dialog__body {
//     padding: 10px;
//   }

//   .el-form-item__label {
//     color: #fff;
//   }

//   .el-form-item__content {
//     text-align: left;
//   }
// }

:deep(.el-range-separator) {
  // color: #fff;
  color: #333;
}

:deep(.el-range-input) {
  // background-color: #1a1f28;
  // color: #fff;
  color: #333;
  background-color: #fff;
}

:deep(.el-pager) {
  color: #333;
}
</style>
