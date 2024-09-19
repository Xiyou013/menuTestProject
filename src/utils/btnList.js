import { useStore } from 'vuex'
import { menu } from 'verdaccio-demo-publish'

const store = useStore()

// 按钮数据管理

// 这里是三层路由中，被抽离出的第一级菜单，以tabs形式展示，权限类型type_int=2，为按钮级别
// 当前项目案例中未用到
/*
  {
    id:       标识,
    title:    名称，
    type_int: 权限类型，菜单级别为1，按钮级别为2,
    type:     用于三层菜单中(第一级路由被抽出，以tabs列表形式展示)，表示为当前路由的最外层路由的sid，也就是第一级路由的sid,
    desc:     描述,
    pid:      当前路由的上一级父路由的sid,
    sid:      唯一标识
  }
**/
export const tabsBtnList = [
  // 仓库管理
  {
    id: 'warehouseManage',
    title: 'router.warehouseManage',
    type_int: 2,
    type: 'warehouseManage',
    desc: 'tabs',
    pid: '',
    sid: 'warehouseManage'
  },
  // 系统管理
  {
    id: 'systemManage',
    title: 'router.systemManage',
    type_int: 2,
    type: 'systemManage',
    desc: 'tabs',
    pid: '',
    sid: 'systemManage'
  },
  // 个人中心
  {
    id: 'userManage',
    title: 'router.userManage',
    type_int: 2,
    type: 'userManage',
    desc: 'tabs',
    pid: '',
    sid: 'userManage'
  },
]

// 普通按钮树
/*
  {
    id:       标识,
    title:    名称,
    type_int: 权限类别，菜单类型为1，按钮类型为2,
    pid:      父节点，按钮当中一般用不到；按钮显隐由自定义的v-bind指令，绑定sid来控制,
    sid:      唯一标识
  },
**/
export const permissionsBtn = [
  // 测试按钮
  {
    id: 'btn1',
    title: 'btn1',
    type_int: 2,
    pid: '',
    sid: 'btn1'
  },
  {
    id: 'btn2',
    title: 'btn2',
    type_int: 2,
    pid: '',
    sid: 'btn2'
  },
  {
    id: 'btn3',
    title: 'btn3',
    type_int: 2,
    pid: '',
    sid: 'btn3'
  },
]

const onFormatTabsObj = () => {
  tabsBtnList.forEach(element => {
    tabsObj.value[element.sid] = element
  });
  console.log('tabsObj.value', tabsObj.value);
}

// 格式化tabs按钮权限列表
export const onFormatTabsBtnList = (data) => {
  console.log('data', data);
  let arr = []
  let temp = []
  // 判断data中是否存在tabsBtnList中的数据
  // 存在则将该元素缓存进arr数组中并返回
  // 返回的是该用户所拥有的tabs按钮列表的权限
  tabsBtnList.forEach((item) => {
    if (data.indexOf(item.sid) !== -1) {
      arr.push(item)
      temp.push(item.sid)
    }
  })
  // 将得到的tabs权限通过localStorage缓存
  localStorage.setItem('tabsBtn', temp)
  return arr
}

// 格式化tabs列表菜单
// tabs列表其实是我们实际上的一级路由，但被抽离出，与router路由不关联
// 所以使用该函数，通过router路由对象中的type元素，与我们已经处理完获取的tabs权限进行比较，将对应上的router存入key值为tabs权限的对象中
// 这里的temp就是onFormatTabsBtnList函数里setItem的数据
export const onFormatTabsMenuObj = (temp) => {
  let obj = {}
  // let temp = localStorage.getItem('tabsBtn').split(',')
  console.log('temp', temp);
  // 获取到登陆时调用插件函数处理过后的所有权限路由
  let routes = menu.store.getters.permissionRoutes
  console.log('menu.store.getters.permissionRoutes', menu.store.getters.permissionRoutes)
  temp.forEach((element) => {
    let arr = []
    routes.forEach((item) => {
      // 一级路由
      if (!item?.meta && item?.children && item?.children.length > 0) {
        if (item?.children[0]?.meta?.type === element) {
          arr.push(item)
        }
      } else if (item?.meta && Object.keys(item?.meta).length > 0 && item?.children && item?.children.length > 0) {
        // 二级路由
        if (item?.meta?.type === element) {
          arr.push(item)
        }
      } else if (!item?.meta && !item?.children) {
        // 普通路由
      }
    })
    // 最后以key:value形式对象保存
    /**
     * {
     *  tabs的key:[当前一级菜单下的所有子路由]
     * }
     */
    obj[element] = [...arr]
  })
  console.log('obj', obj);
  return obj
}