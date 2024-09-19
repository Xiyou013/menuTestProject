// 引入mock
// const Mock = require('mockjs');
import Mock from 'mockjs'

// 引入所有mock文件
// 优点：能看懂
// 缺点：当mock文件过多时，需要每一个文件进行引入
// require('@/mock/basic/test-two');
import './user/user.js'

// 设置拦截ajax请求的时间
Mock.setup({
 timeout: '200-600'
})