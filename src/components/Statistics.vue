<template>
  <div>
    <h1>统计信息</h1>
    <table>
      <tr>
        <td></td>
        <td>浏览量PV</td>
        <td>流量UV</td>
        <td>跳出率</td>
        <td>平均访问时长</td>
      </tr>
      <tr v-if="statisticsToday">
        <td>今日</td>
        <td>{{ statisticsToday.pv }}</td>
        <td>{{ statisticsToday.uv }}</td>
        <td>{{ statisticsToday.br }}</td>
        <td>{{ statisticsToday.ad }}</td>
      </tr>
      <tr v-if="statisticsYesterday">
        <td>昨日</td>
        <td>{{ statisticsYesterday.pv }}</td>
        <td>{{ statisticsYesterday.uv }}</td>
        <td>{{ statisticsYesterday.br }}</td>
        <td>{{ statisticsYesterday.ad }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Statistics',
    data () {
      return {
        statisticsToday: {},
        statisticsYesterday: {}
      }
    },
    computed: mapState(['currentWebsite']),
    methods: {
      getSiteData (date) {
        this.$store.dispatch('getStatistics', date)  // 获取网站指定日期的统计信息
          .then(res => {
            switch (date) {
              case 0:
                this.statisticsToday = res.statistics
                break
              case 1:
                this.statisticsYesterday = res.statistics
                break
            }
          })
      },
      loadPage () {
        this.getSiteData(0)
        this.getSiteData(1)
      }
    },
    watch: {
      currentWebsite(){
        this.loadPage()
      }
    },
    mounted () {
      this.$emit('routerTo',1)
      this.loadPage()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
