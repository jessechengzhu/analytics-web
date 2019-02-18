<template>
  <div>
    <div v-if="user">
      <h1>网站列表</h1>
      <ul>
        <li v-for="website in websites" :key="website.id">{{website.host}}</li>
      </ul>
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
  mounted () {
    const token = localStorage.getItem('token')
    if (token) { // 本地存有了token，尝试获取用户所有网站
      this.$store.dispatch('website/getWebsites')
        .then(res => { this.websites = res.data.websites })
        .catch(() => { localStorage.setItem('token', '') })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
