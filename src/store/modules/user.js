// 非子节点，组件中映射时要this.$router.user.xxx
const state = {}
const getters = {}
const mutations = {}
const actions = {
  // 登录
  login ({ commit, rootState }, loginInfo) {
    return new Promise((resolve, reject) => {
      rootState.$axios.post('/api/users/login', loginInfo)
        .then(res => {
          commit('setUser', res.data, {root: true})
          localStorage.setItem('token', res.data.token) // 存储从后端获得的token
          resolve(res)
        })
        .catch(err => {
          console.log(err.response)
          reject(err)
        })
    })
  },
  // 注册
  register ({ commit, rootState }, registerInfo) {
    return new Promise((resolve, reject) => {
      rootState.$axios.post('/api/users/register', registerInfo)
        .then(res => {
          commit('setUser', res.data, {root: true})
          resolve(res)
        })
        .catch(err => {
          console.log(err.response || '')
          reject(err)
        })
    })
  },
  // 验证用户名是否被占用
  validateUsername ({ rootState }, usernameInfo) {
    return new Promise((resolve, reject) => {
      rootState.$axios.post('/api/users/username', usernameInfo)
        .then(res => resolve(res))
        .catch(err => {
          console.log(err.response || '')
          reject(err)
        })
    })
  }
}
export default {
  // 使用命名空间。避免不同模块中getters和actions中方法的重名带来的报错和全部调用，组件映射时加上'Home/~'
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
