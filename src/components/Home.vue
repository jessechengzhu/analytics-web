<template>
  <div>
    <div v-if="user">
      <h1 class="title">网站总览</h1>
      <table class="overview" v-loading="loading">
        <thead>
        <tr>
          <td>网站名称</td>
          <td>今日浏览量(PV)</td>
          <td>今日流量(UV)</td>
          <td>今日跳出率</td>
          <td>今日平均访问时长</td>
          <td>实时在线人数</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="website in overview" :key="website.id" @click="toAnalytics(website)">
          <td>{{ website.host }}&nbsp;&nbsp;--&nbsp;&nbsp;{{website.title}}</td>
          <td>{{ website.pv }}</td>
          <td>{{ website.uv }}</td>
          <td>{{ website.br }}</td>
          <td>{{ website.ad }}</td>
          <td>{{ website.ol }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <h1>这里是我的毕业设计——用户行为分析平台</h1>
      <h2></h2>
      <router-link to="/login">开始吧</router-link>
    </div>
  </div>
</template>

<script>
  // 使用 createNamespacedHelpers 创建基于某个命名空间辅助函数
  import { mapState } from 'vuex'

  export default {
    name: 'Home',
    data () {
      return {
        overview: [],
        loading: true
      }
    },
    computed: {
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState(['user'])
    },
    methods: {
      getOverview () {
        this.$store.dispatch('getOverview')
          .then(res => {
            this.loading = false
            this.overview = res.overview
          })
      },
      toAnalytics (website) {
        this.$store.commit('setCurrentWebsite', website)
        this.$router.push('/analytics')
      }
    },
    mounted () {
      this.$emit('routerTo', 0)
      this.getOverview()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1.title {
    color: #9c9c9c;
    font-size: 26px;
    font-weight: normal;
    font-family: "Arial", sans-serif;
  }
  /* 整个表格 */
  table.overview {
    width: 100%;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
    font-family: '微软雅黑',sans-serif;
    border-collapse: collapse;
    table-layout: fixed;
  }
  /* 每一列 */
  table.overview tr td {
    text-align: center;
    table-layout: fixed;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  /* 第一列 */
  table.overview tr td:nth-child(1) {
    text-align: left;
    text-indent: 32px;
    border-right: 1px solid rgba(0,0,0,.1);
  }
  table.overview tr td:nth-child(2) {
    width: 128px;
  }
  table.overview tr td:nth-child(3) {
    width: 128px;
  }
  table.overview tr td:nth-child(4) {
    width: 128px;
  }
  table.overview tr td:nth-child(5) {
    width: 128px;
  }
  table.overview tr td:nth-child(6) {
    width: 128px;
  }
  /* 表头每一行 */
  table.overview thead tr {
    line-height: 50px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid rgba(0,0,0,.1);
    background: #f8f8f8;
  }
  /* 表体每一行 */
  table.overview tbody tr{
    line-height: 40px;
    font-size: 16px;
    color: #606060;
  }
  table.overview tbody tr:hover {
    cursor: pointer;
    background: #eeeaff;
  }
  /* 表体第一列 */
  table.overview tbody tr td:nth-child(1){
    color: cornflowerblue;
    border-right: 1px solid rgba(0,0,0,.1);
  }
</style>
