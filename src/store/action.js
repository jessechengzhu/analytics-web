import axios from 'axios'
import store from './index'
import router from '../router'

// axios请求拦截器，每次请求前都带上token
axios.interceptors.request.use(function (config) {
  if (localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
  }
  return config
}, function (error) {
  return error
})

// axios响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.status === 2) {
    return response.data
  } else if (response.data.message === 'jwt expired') { // 身份过期错误
    // console.log('身份过期，请重新登录')
    store.commit('clearUser')
    router.push('/login')
    return Promise.reject(response.data)
  } else { // 自定义错误
    return Promise.reject(response.data)
  }
}, function (error) {
  return Promise.reject(error.response ? error.response.data : {message: '内部错误'})
})

export default {
  /* 用户 */
  getUser ({commit}) {
    if (localStorage.getItem('token')) {
      axios.get('/api/users/user')
        .then(res => {
          commit('setUser', res.user)
        })
        .catch(() => { // 获取失败了，清除这个无效token
          commit('clearUser')
        })
    }
  },
  login ({commit}, loginInfo) {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/login', loginInfo)
        .then(res => {
          commit('setUser', res.user)
          localStorage.setItem('token', res.token) // 存储从后端获得的token
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
          commit('setUser', res.user)
          localStorage.setItem('token', res.token) // 存储从后端获得的token
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
  changePassword ({commit}, changeInfo) {
    return new Promise((resolve, reject) => {
      axios.put('/api/users/change/password', changeInfo)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /* 网站 */
  getWebsites ({state, commit}) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('token')) {
        axios.get('/api/websites/user')
          .then(res => {
            commit('setWebsites', res.websites)
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      } else {
        resolve([])
      }
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
    if (localStorage.getItem('token')) {
      return new Promise((resolve, reject) => {
        axios.get('/api/websites/website/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  },
  getOverview () {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('token')) {
        axios.get('/api/websites/overview')
          .then(res => resolve(res))
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  getStatistics ({state}, date) {
    return new Promise((resolve, reject) => {
      if (state.currentWebsite) {
        axios.get('/api/websites/website/statistics/' + state.currentWebsite.config + '?date=' + date)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  getCompareData ({state}, days) {
    return new Promise((resolve, reject) => {
      if (state.currentWebsite) {
        axios.get('/api/websites/website/compare/' + state.currentWebsite.config + '?days=' + days)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  getLimitRecords ({state}, page) {
    return new Promise((resolve, reject) => {
      if (state.currentWebsite) {
        axios.get('/api/websites/website/records/' + state.currentWebsite.config + '?page=' + page)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  getRecordsCount ({state}) {
    return new Promise((resolve, reject) => {
      if (state.currentWebsite) {
        axios.get('/api/websites/website/records/' + state.currentWebsite.config)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  getRecordMore ({state}, id) {
    return new Promise((resolve, reject) => {
      if (state.currentWebsite) {
        axios.get('/api/records/more/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  getONVisitorData ({state}, days) {
    return new Promise((resolve, reject) => {
      if (state.currentWebsite) {
        axios.get('/api/websites/website/novisitor/' + state.currentWebsite.config + '?days=' + days)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  getSVisitorData ({state}, days) {
    return new Promise((resolve, reject) => {
      if (state.currentWebsite) {
        axios.get('/api/websites/website/svisitor/' + state.currentWebsite.config + '?days=' + days)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  getEventData ({state}, days) {
    return new Promise((resolve, reject) => {
      if (state.currentWebsite) {
        axios.get('/api/websites/website/event/' + state.currentWebsite.config + '?days=' + days)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  getConversionData ({state}, days) {
    return new Promise((resolve, reject) => {
      if (state.currentWebsite) {
        axios.get('/api/websites/website/conversion/' + state.currentWebsite.config + '?days=' + days)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  editWebsite ({state}, website) {
    return new Promise((resolve, reject) => {
      axios.put('/api/websites/website', website)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteWebsite ({state}, config) {
    return new Promise((resolve, reject) => {
      axios.delete('/api/websites/website/' + config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
