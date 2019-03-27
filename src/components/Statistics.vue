<template>
  <div>
    <select name="website-select" id="website-select" @change="replaceTo(currentSiteId)" v-model="currentSiteId">
      <option v-for="website in websites" :value="website.id">{{ website.host }}</option>
    </select>
    <table>
      <thead>
      <tr>
        <td></td>
        <td>浏览量PV</td>
        <td>流量UV</td>
        <td>跳出率</td>
        <td>平均访问时长</td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>今日</td>
        <td>{{ statisticsToday.pv }}</td>
        <td>{{ statisticsToday.uv }}</td>
        <td>{{ statisticsToday.bounceRateTd }}</td>
        <td>{{ statisticsToday.avgDurationTd }}</td>
      </tr>
      <tr>
        <td>昨日</td>
        <td>{{ statisticsYesterday.pv }}</td>
        <td>{{ statisticsYesterday.uv }}</td>
        <td>{{ statisticsYesterday.bounceRateYd }}</td>
        <td>{{ statisticsYesterday.avgDurationYd }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Statistics',
    data () {
      return {
        websites: [],
        currentSiteId: 0,
        statisticsToday: {},
        statisticsYesterday: {}
      }
    },
    methods: {
      /* 更改路由 */
      replaceTo (id) {
        this.$router.replace('/statistics/' + id)
      },
      getSiteData (id,date) {
        this.$store.dispatch('getStatistics', {id,date})  // 获取指定网站的信息
          .then(res => {
            switch (date) {
              case 0:
                this.statisticsToday = res.data.statistics
                break
              case 1:
                this.statisticsYesterday = res.data.statistics
                break
            }
            this.currentSiteId = id  // 更改select的currentSiteId
          })
      },
      loadPage () {
        this.$store.dispatch('getWebsites')  // 获取所有网站
          .then(res => {
            this.websites = res.data.websites
            if (this.websites.length !== 0) {  // 有网站
              const params = this.$route.params
              let currentSiteId
              if (JSON.stringify(params) !== '{}') { //有查询
                currentSiteId = params.id
              } else {  // 没有指定查询，默认查询第一个网站
                currentSiteId = this.websites[0].id
              }
              this.getSiteData(currentSiteId,0)  // 获取currentSiteId的网站数据
              this.getSiteData(currentSiteId,1)
            } else { // 还没有网站
              alert('你还没有网站，快去添加一个吧')
              this.$router.push('/manage')
            }
          })
      }
    },
    watch: {
      /* 监视路由的变化,重新加载页面 */
      '$route' (to, from) {
        this.loadPage()
      }
    },
    mounted () {
      this.loadPage()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
