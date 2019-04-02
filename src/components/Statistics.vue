<template>
  <div>
    <h1 class="title">统计信息</h1>
    <table class="statistics">
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
      </tbody>

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
      currentWebsite () {
        this.loadPage()
      }
    },
    mounted () {
      this.$emit('routerTo', 1)
      this.loadPage()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1.title {
    /*margin: 0;*/
    /*line-height: 50px;*/
    color: #9c9c9c;
    font-size: 26px;
    font-weight: normal;
    font-family: "Arial", sans-serif;
  }
  /* 整个表格 */
  table.statistics {
    width: 100%;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
    font-family: '微软雅黑',sans-serif;
    border-collapse: collapse;
    table-layout: fixed;
  }
  /* 每一列 */
  table.statistics tr td {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /* 第一列 */
  table.statistics tr td:nth-child(1) {
    width: 10%;
    border-right: 1px solid rgba(0,0,0,.1);
  }
  /* 表头每一行 */
  table.statistics thead tr {
    line-height: 50px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid rgba(0,0,0,.1);
    background: #f8f8f8;
  }
  /* 表体每一行 */
  table.statistics tbody tr{
    line-height: 40px;
    font-size: 16px;
    color: #606060;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  table.statistics tbody tr:last-child{
    border: none;
  }
  /* 表体第一列 */
  table.statistics tbody tr td:nth-child(1){
    color: #333;
    font-weight: 600;
    font-size: 14px;
    border-right: 1px solid rgba(0,0,0,.1);
  }
</style>
