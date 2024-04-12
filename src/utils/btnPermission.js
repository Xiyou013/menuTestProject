// import store from '../store'
// import { menu } from 'verdaccio-demo-publish'

// export default (Vue) => {
//   console.log('Vue', Vue);
//   Vue.directive('has', {
//     mounted(el, binding) {
//       console.log('555555555555', el, binding);
//       // 获取按钮权限
//       if (!Vue.config.globalProperties.$_has(binding.value)) {
//         // 移除不匹配的按钮
//         el.parentNode.removeChild(el)
//       }
//     }
//   })

//   // 检查权限方法
//   Vue.config.globalProperties.$_has = (value) => {
//     // 获取存在store中的按钮级别数组数据
//     console.log('777777777777777777:', menu.store.getters.btnList);
//     console.log('value:', value);
//     return menu.store.getters.btnList.includes(value)
//     // return store.getters.perms.includes(value)
//   }
// }