// 非子节点，组件中映射时要this.$router.api.xxx
const state = {}
const getters = {}
const mutations = {}
const actions = {
  getWebsites ({commit, rootState}) {
    return new Promise((resolve, reject) => {
      rootState.$axios.get('/api/websites/user')
        .then(res => {
          commit('setUser', res.data, {root: true})
          resolve(res)
        })
        .catch(err => { // 获取失败了，清除这个无效token
          console.log(err.response || '')
          reject(err)
        })
    })
  },
  validateSite ({rootState}, id) {
    return new Promise((resolve, reject) => {
      rootState.$axios.get('/api/websites/website/validate/' + id)
        .then(res => {
          console.log(res.data.message)
        })
        .catch(err => {
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
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
