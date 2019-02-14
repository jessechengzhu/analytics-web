<template>
  <div>
    <div v-if="user">
      <h1>网站列表</h1>
      <ul>
        <li v-for="website in websites" :key="website.id">{{website.domain}}</li>
      </ul>
    </div>
    <div v-else>
      <router-link to="/login">开始吧</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['user'],
  data () {
    return {
      websites: []
    }
  },
  methods: {
  },
  mounted () {
    console.log('Home.vue mounted')
    const token = localStorage.getItem('token')
    if (token) { // 本地存有了token，尝试获取用户所有网站
      this.$axios.get('/api/websites/user')
        .then(res => {
          this.websites = res.data.websites
        })
        .catch(err => { // 获取失败了，清除这个无效token
          console.log(err.response.data.message)
          localStorage.setItem('token', '')
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
