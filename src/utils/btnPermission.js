import store from '../store'

export default (Vue) => {
  Vue.directive('has', {
    mounted(el, binding) {
      // 获取按钮权限
      if (!Vue.config.globalProperties.$_has(binding.value)) {
        // 移除不匹配的按钮
        el.parentNode.removeChild(el)
      }
    }
  })

  // 检查权限方法
  Vue.config.globalProperties.$_has = (value) => {
    // 获取存在store中的按钮级别数组数据
    return store.getters.perms.includes(value)
  }
}