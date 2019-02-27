// 非子节点，组件中映射时要this.$router.api.xxx
const state = {}
const getters = {}
const mutations = {}
const actions = {
  getWebsites ({rootState}) {
    return new Promise((resolve, reject) => {
      rootState.$axios.get('/api/websites/user')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err.response || '')
          reject(err)
        })
    })
  },
  getWebsitesOverview ({rootState}) {
    return new Promise((resolve, reject) => {
      rootState.$axios.get('/api/websites/overview/user')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err.response || '')
          reject(err)
        })
    })
  },
  validateSite ({rootState}, id) {
    return new Promise((resolve, reject) => {
      rootState.$axios.get('/api/websites/website/validate/' + id)
        .then(res => {
          resolve(res)
          // console.log(res.data.message)
        })
        .catch(err => {
          reject(err)
          console.log(err.response.data.message)
        })
    })
  },
  addWebsite ({rootState}, addInfo) {
    return new Promise((resolve, reject) => {
      rootState.$axios.post('/api/websites/website', addInfo)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
          console.log(err.response.data.message)
        })
    })
  },
  getWebsite ({rootState}, id) {
    return new Promise((resolve, reject) => {
      rootState.$axios.get('/api/websites/website?siteId=' + id)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
          console.log(err.response.data.message)
        })
    })
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
