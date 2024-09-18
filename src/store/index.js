import { createStore } from 'vuex'
import getters from './getters'
import menu from './menu.js'
// import menu from './modules/menu.js'


const store = createStore({
 modules: {
  menu
 },
 getters
})

export { store }
// module.exports = {
//  store
// }