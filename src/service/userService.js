import axios from './index'

export default {
  // 登录
  login (loginInfo) {
    return axios.post('/api/users/login', loginInfo)
  },
  // 注册
  register (registerInfo) {
    return axios.post('/api/users/register', registerInfo)
  },
  // 验证用户名是否被占用
  validateUsername (usernameInfo) {
    return axios.post('/api/users/username', usernameInfo)
  }
}
