<template>
  <div>
    <h1>登录</h1>
    <label>用户名<input v-model="username"/></label><br>
    <label>密码<input v-model="password" type="password"/></label><br>
    <button @click="login()">登录</button>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  // 由于username和password是绑定在表单上的，所以得在computed上额外设置set方法，过于麻烦，所以这里不用store
  data () {
    return {
      username: '',
      password: '',
      message: ''
    }
  },
  computed: {
  },
  methods: {
    login () {
      if (this.username && this.password) {
        this.message = '登录中...'
        const loginInfo = {
          username: this.username,
          password: this.password
        }
        this.$store.dispatch('login', loginInfo)
          .then(res => {
            this.message = res.message
            this.$router.push('/')
            this.$store.dispatch('getWebsites')
              .then(res=>{
                this.$store.commit('setCurrentWebsite', res.websites[0])
              })
            this.$emit('routerTo',0)
          })
          .catch(err => {
            this.message = err.message
          })
      }
    }
  },
  mounted () {
    this.$emit('routerTo',-1)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
