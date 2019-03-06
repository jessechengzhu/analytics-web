import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

// 全局state
const state = {
  isLogin: false,
  user: null
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
