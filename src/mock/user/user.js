
import Mock from 'mockjs'
import { asyncRoutes, constantRoutes } from '@/router/index.js'
import { FRONTPERMISSIONSTREE } from '@/utils/frontAuthTree'

// 用户权限
const userList = [
  {
    name: 'admin',
    id: 1,
    roles: [
      {
        id: 1,
        type: 'admin',
        // permission: [
        //   // menu: ['home', 'test', 'first', 'second'],
        //   // btn: []
        //   {
        //     type: 1, name: 'home', sid: 'home', children: [
        //       { type: 2, name: 'btn1', sid: 'btn1' },
        //       { type: 2, name: 'btn3', sid: 'btn3' }
        //     ]
        //   },
        //   // { type: 1, name: 'test', sid: 'test' },
        //   {
        //     type: 1, name: 'test', sid: 'test', children: [
        //       { type: 1, name: 'testOne', sid: 't-testOne' },
        //       { type: 1, name: 'testTwo', sid: 't-testTwo' }
        //     ]
        //   },
        //   { type: 1, name: 'first', sid: 'first' },
        //   { type: 1, name: 'second', sid: 'second' },
        //   {
        //     type: 1, name: 'third', sid: 'third', children: [
        //       { type: 1, name: 'menuOne', sid: 't-menuOne' },
        //       { type: 1, name: 'menuTwo', sid: 't-menuTwo' }
        //     ]
        //   }
        // ]
        version: '2.0.3',
        checksum: '',
        // 前端权限
        permission: [...FRONTPERMISSIONSTREE.permissions]
      }
    ]
  }
]

// mock接口数据返回体
let returnBody = {
  data: '',
  code: 0,
  message: ''
}


// 获取具体人物信息
const getUserData = Mock.mock('/test/getUserData', (val) => {
  // 因为靠这种方法拿过来的val传参不是真正的数据，而是一个对象
  /**
   * {
   *    body:"{"data":22}"
   *    type:"POST"
   *    url:"/test/getoneData"
   * }
   */
  // 真正的数据被包含在了body里，并以字符串的形式保存
  // 所以要获取到真正的数据，需要将body中的字符串转为object类型的数据，并将data重新赋值
  console.log('userList', userList[0].roles[0].permission);
  console.log('val::::', val);
  const obj = JSON.parse(val.body).data
  console.log('obj', obj);
  let [arr] = userList.filter((item) => {
    return item.name === obj.account
  })
  console.log('arr', arr);
  returnBody.data = arr
  return returnBody
  // return userList.find((item) => {
  //   return item.age === obj.account
  // })
})

// 返回模拟的数据及接口
export default (router) => {
  return [
    // router.get('/test', getData),
    router.post('/test/getUserData', getUserData)
  ]
}
// module.exports = (router) => {
//   return [
//     // router.get('/test', getData),
//     router.post('/test/getUserData', getUserData)
//   ]
// }