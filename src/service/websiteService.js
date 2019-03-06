import axios from './index'

export default {
  // 获取用户所有原始网站信息
  getWebsites () {
    return axios.get('/api/websites/user')
  },
  // 获取用户的所有处理后的网站总览信息
  getWebsitesOverview () {
    return axios.get('/api/websites/overview/user')
  },
  // 检验网站代码示范法安装正确
  validateSite (id) {
    return axios.get('/api/websites/website/validate/' + id)
  },
  // 添加一个网站
  addWebsite (addInfo) {
    return axios.post('/api/websites/website', addInfo)
  },
  // 获取指定网站
  getWebsite (id) {
    return axios.get('/api/websites/website/id' + id)
  },
  // 获取指定网站的统计信息
  getWebsiteStatistics (id) {
    return axios.get('/api/websites/website/statistics/' + id)
  }
}
