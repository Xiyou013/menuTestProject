

const menu = require('./src/index.js')
const { hasPermission, getPermissionLabel } = require('./src/btnPermission.js')
const { routerPermisssion } = require('./src/permission.js')
module.exports = {
 menu, hasPermission, getPermissionLabel, routerPermisssion
}
