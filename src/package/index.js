import btnView from './btn/btnIndex.vue'
import jzLayout from './layout/index.vue'
import SvgIcon from './SvgIcon/index.vue'
import Harmburger from './Hamburger/index.vue'
import Breadcrumb from './Breadcrumb/index.vue'
// import svgBuilder from '../plugins/svgBuilder'

const comArr = [
  btnView,
  jzLayout,
  SvgIcon,
  Harmburger,
  Breadcrumb
]

// 注册组件
const install = (Vue) => {
  comArr.forEach(element => {
    // element.name就是引入组件的name属性，每个组件都需要有一个唯一的name
    Vue.component(element.name, element)
  });
}

export default {
  install
}