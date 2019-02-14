<template>
  <div>
    <h1>登录</h1>
    <label>用户名<input v-model="username"/></label><br>
    <label>密码<input v-model="password" type="password"/></label><br>
    <button @click="login">登录</button>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      message: ''
    }
  },
  methods: {
    login () {
      if (this.username && this.password) {
        this.message = '登录中...'
        const loginInfo = {
          username: this.username,
          password: this.password
        }
        this.$axios.post('/api/users/login', loginInfo)
          .then(res => {
            this.message = res.data.message
            let user = res.data.user
            this.$emit('login', user) // 向父组件App.vue发送消息
            localStorage.setItem('token', res.data.token) // 存储从后端获得的token
            this.$router.push('/')// 刷新页面
          })
          .catch(err => {
            this.message = err.response.data.message
            // console.log(err.response.data.message)
          })
      }
    }
  },
  mounted () {
    console.log('Login.vue mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
