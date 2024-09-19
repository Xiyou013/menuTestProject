import fetch from '@/utils/request.js'

// mock模拟后端接口返回数据
export function getUserData(data) {
 console.log('data', data);
 return fetch.post('/test/getUserData', { data: data })
}