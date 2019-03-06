import userApi from '../service/userService'
import websiteApi from '../service/websiteService'
import axios from '../service'

export default {
  // 获取用户信息
  getUser ({commit}) {
    axios.get('/api/users/user')
      .then(res => {
        commit('setUser', res.data)
      })
      .catch(err => { // 获取失败了，清除这个无效token
        console.log(err.response ? err.response.data.message : 'error')
      })
  },
  // 登录
  login ({commit}, loginInfo) {
    return new Promise((resolve, reject) => {
      userApi.login(loginInfo)
        .then(res => {
          commit('setUser', res.data, {root: true})
          localStorage.setItem('token', res.data.token) // 存储从后端获得的token
          resolve(res)
        })
        .catch(err => {
          console.log(err.response ? err.response.data.message : 'error')
          reject(err)
        })
    })
  },
  // 注册
  register ({commit}, registerInfo) {
    return new Promise((resolve, reject) => {
      userApi.register(registerInfo)
        .then(res => {
          commit('setUser', res.data, {root: true})
          resolve(res)
        })
        .catch(err => {
          console.log(err.response ? err.response.data.message : 'error')
          reject(err)
        })
    })
  },
  // 验证用户名是否被占用
  validateUsername (context, usernameInfo) {
    return new Promise((resolve, reject) => {
      userApi.validateUsername(usernameInfo)
        .then(res => resolve(res))
        .catch(err => {
          console.log(err.response ? err.response.data.message : 'error')
          reject(err)
        })
    })
  },

  getWebsites () {
    return new Promise((resolve, reject) => {
      websiteApi.getWebsites()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err.response ? err.response.data.message : 'error')
          reject(err)
        })
    })
  },
  getWebsitesOverview () {
    return new Promise((resolve, reject) => {
      websiteApi.getWebsitesOverview()
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err.response ? err.response.data.message : 'error')
          reject(err)
        })
    })
  },
  validateSite (context, id) {
    return new Promise((resolve, reject) => {
      websiteApi.validateSite(id)
        .then(res => {
          resolve(res)
          // console.log(res.data.message)
        })
        .catch(err => {
          reject(err)
          console.log(err.response ? err.response.data.message : 'error')
        })
    })
  },
  addWebsite (context, addInfo) {
    return new Promise((resolve, reject) => {
      websiteApi.addWebsite(addInfo)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
          console.log(err.response ? err.response.data.message : 'error')
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
  getWebsiteStatistics (context, id) {
    return new Promise((resolve, reject) => {
      websiteApi.getWebsiteStatistics(id)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
          console.log(err.response ? err.response.data.message : 'error')
        })
    })
  }
}
