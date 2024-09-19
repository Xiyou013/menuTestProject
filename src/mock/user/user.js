
import Mock from 'mockjs'
import { FRONTPERMISSIONSTREE } from '@/utils/frontAuthTree'
import { menu } from 'verdaccio-demo-publish'

// 用户权限
const userList = [
  {
    name: 'admin',
    id: 1,
    roles: [
      {
        id: 1,
        type: 'admin',
        permission: [
          // 前端权限
          ...FRONTPERMISSIONSTREE.permissions
        ]
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
  console.log('val::::', val);
  const obj = JSON.parse(val.body).data
  console.log('obj', obj);
  let [arr] = userList.filter((item) => {
    return item.name === obj.account
  })
  console.log('arr', arr);
  returnBody.data = arr
  return returnBody
})

// 返回模拟的数据及接口
export default (router) => {
  return [
    router.post('/test/getUserData', getUserData)
  ]
}
// module.exports = (router) => {
//   return [
//     // router.get('/test', getData),
//     router.post('/test/getUserData', getUserData)
//   ]
// }