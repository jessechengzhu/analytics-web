import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import user from './modules/user'
import website from './modules/website'

Vue.use(Vuex)

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:4000'
} else {
  axios.defaults.baseURL = 'http://analytics.server.jessezhu.cn'
}

// axios拦截器，每次请求前都带上token
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default new Vuex.Store({
  // 全局
  state: {
    $axios: axios,
    isLogin: false,
    user: null
  },
  mutations: {
    setUser (state, {user}) {
      state.user = user
      state.isLogin = true
    },
    logout (state) {
      state.user = null
      state.isLogin = false
      localStorage.setItem('token', '')
    }
  },
  getters: {},
  actions: {
    init ({commit}) {
      axios.get('/api/users/user')
        .then(res => {
          commit('setUser', res.data)
        })
        .catch(err => { // 获取失败了，清除这个无效token
          localStorage.setItem('token', '')
          console.log(err.response || '')
        })
    }
  },

  // 局部模块
  modules: {
    user,
    website
  }
})
