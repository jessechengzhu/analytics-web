const devFlag = process.env.NODE_ENV === 'development'

export default {
  devFlag,
  baseURL: devFlag ? 'http://localhost:5000' : 'http://analytics.server.jessezhu.cn'
}
