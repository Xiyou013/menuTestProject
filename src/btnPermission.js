const { store } = require('./store/index.js')

// 自定义v-bind指令，控制按钮级别元素显隐
// label是自定义的指令名称
const getPermissionLabel = (label) => {
  store.commit('menu/SET_LABEL', label)
}

// 按钮权限判断函数
const hasPermission = (Vue) => {
  Vue.directive(store.getters.label, {
    mounted(el, binding) {
      // 获取按钮权限
      if (!Vue.config.globalProperties[`$_${store.getters.label}`](binding.value)) {
        // 移除不匹配的按钮
        el.parentNode.removeChild(el)
      }
    }
  })
  // 检查权限方法
  Vue.config.globalProperties[`$_${store.getters.label}`] = (value) => {
    // 获取存在store中的按钮级别数组数据
    return store.getters.btnList.includes(value)
  }
}

module.exports = {
  hasPermission,
  getPermissionLabel
}