import fetch from '@/utils/request.js'

export function getUserData(data) {
 console.log('data', data);
 return fetch.post('/test/getUserData', { data: data })
}