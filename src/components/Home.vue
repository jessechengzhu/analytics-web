<template>
  <div>
    <div v-if="user">
      <h1>网站总览</h1>
      <table>
        <thead>
        <tr>
          <td>网站名称</td>
          <td>今日浏览量PV</td>
          <td>今日流量UV</td>
          <td>今日跳出率</td>
          <td>今日平均访问时长</td>
          <td>实时在线人数</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="website in overview" :key="website.id" @click="toStatistics(website)">
          <td>{{ website.host }}</td>
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
        overview: []
      }
    },
    computed: {
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState(['user'])
    },
    methods: {
      getOverview(){
        this.$store.dispatch('getOverview')
          .then(res => { this.overview = res.overview })
      },
      toStatistics (website) {
        this.$store.commit('setCurrentWebsite',website)
        this.$router.push('/statistics')
      }
    },
    mounted () {
      this.$emit('routerTo',0)
      this.getOverview()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  tbody tr{
    cursor: pointer;
  }
</style>
