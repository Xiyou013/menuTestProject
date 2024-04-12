// import './src/test'
// require('./src/test.js');
const { addFn, logFn } = require('./test.js')
const { hasPermission, filterAsyncRoutes, getSetPermissionRoutes, formatMenuAndBtn, getConstantRoutesSum } = require('./menu.js')
// const { onLocStorageMenuInfo, state } = require('./store/menu.js')
const { store } = require('./store/index.js')
module.exports = {
  addFn, logFn, hasPermission, filterAsyncRoutes, getSetPermissionRoutes, formatMenuAndBtn, getConstantRoutesSum,
  store
}
