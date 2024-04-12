import { createRouter, createWebHashHistory } from 'vue-router'
const { store } = require('../store/index.js')

const router = createRouter({
 history: createWebHashHistory(),
 routes: (store && store.getters.constantRoutes) || []
})

export default router