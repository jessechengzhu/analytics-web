import axios from 'axios'
import store from './index'
import router from '../router'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:4000'
} else {
  axios.defaults.baseURL = 'http://analytics.server.jessezhu.cn'
}

// axios请求拦截器，每次请求前都带上token
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

// axios响应拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  if (error.response.data.message === 'jwt expired') { // 身份过期错误
    console.log('身份过期，请重新登录')
    store.commit('clearUser')
    router.push('/login')
  } else {
    return Promise.reject(error)
  }
})

export default {
  /* 用户 */
  getUser ({commit}) {
    axios.get('/api/users/user')
      .then(res => {
        commit('setUser', res.data)
      })
      .catch(() => { // 获取失败了，清除这个无效token
        commit('clearUser')
        localStorage.setItem('token', '')
      })
  },
  login ({commit}, loginInfo) {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/login',loginInfo)
        .then(res => {
          commit('setUser', res.data)
          localStorage.setItem('token', res.data.token) // 存储从后端获得的token
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  register ({commit}, registerInfo) {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/register', registerInfo)
        .then(res => {
          commit('setUser', res.data)
          localStorage.setItem('token', res.data.token) // 存储从后端获得的token
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  validateUsername (context, username) {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/username', {username})
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },
  /* 网站 */
  getWebsites () {
    return new Promise((resolve, reject) => {
      axios.get('/api/websites/user')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  validateSite (context, id) {
    return new Promise((resolve, reject) => {
      axios.get('/api/websites/website/validate/' + id)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  addWebsite (context, addInfo) {
    return new Promise((resolve, reject) => {
      axios.post('/api/websites/website', addInfo)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getWebsite (context, id) {
    return new Promise((resolve, reject) => {
      websiteApi.getWebsite(id)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
          console.log(err.response ? err.response.data.message : 'error')
        })
    })
  },
  getOverview () {
    return new Promise((resolve, reject) => {
      axios.get('/api/websites/overview')
        .then(res => resolve(res))
    })
  },
  getStatistics (context, {id, date}) {
    return new Promise((resolve, reject) => {
      axios.get('/api/websites/website/statistics/' + id + '?date=' + date)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
