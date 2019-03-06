import axios from 'axios'
import router from '../router/index'
import store from '../store/index'

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

// axios响应拦截器，每次请求前都带上token
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  if (error.response.data.message === 'jwt expired') { // 身份过期错误
    console.log('身份过期，请重新登录')
    store.commit('logout')
    router.push('/login')
  } else {
    return Promise.reject(error)
  }
})

export default axios
