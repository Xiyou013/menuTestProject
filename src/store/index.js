import { createStore } from 'vuex'
import getters from './getters'
import menu from './modules/menuTest.js'


const store = createStore({
  modules: {
    menu
  },
  getters
})

export default store