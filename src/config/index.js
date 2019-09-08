const devFlag = process.env.NODE_ENV === 'development'

export default {
  devFlag,
  baseURL: devFlag ? 'http://localhost:4000' : 'http://analytics.server.jessezhu.cn'
}
