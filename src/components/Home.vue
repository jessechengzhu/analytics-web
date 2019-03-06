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
        </tr>
        </thead>
        <tbody>
        <tr v-for="website in websites" :key="website.id" @click="toStatistics(website.id)">
          <td>{{ website.host }}</td>
          <td>{{ website.pvNum }}</td>
          <td>{{ website.uvNum }}</td>
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
        websites: []
      }
    },
    // 在 `Home` 中查找，等同于user: state=>state.Home.user
    computed: {
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState(['user'])
    },
    methods: {
      toStatistics (id) {
        this.$router.push('/statistics/'+id)
      }
    },
    mounted () {
      const token = localStorage.getItem('token')
      if (token) { // 本地存有了token，尝试获取用户所有网站
        this.$store.dispatch('getWebsitesOverview')
          .then(res => { this.websites = res.data.websites })
          .catch(() => { localStorage.setItem('token', '') })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  tbody tr{
    cursor: pointer;
  }
</style>
