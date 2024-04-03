const addFn = (a, b) => {
  console.log('测试npm包中addFn方法');
  return a + b
}

const logFn = (data) => {
  console.log('单纯打印由引用方传过来的数据：', data);
}

module.exports.addFn = addFn
module.exports.logFn = logFn