<template>
  <div class="login-wrap">
    <h1 class="title">登录</h1>
    <div class="input">
      <label for="usrIpt">用户名</label>
      <input v-model="username" id="usrIpt"/>
    </div>
    <div class="input">
      <label for="pswIpt">密码</label>
      <input v-model="password" @keyup.enter="login" type="password" id="pswIpt"/>
    </div>
    <a class="login-btn" @click="login" href="javascript:void(0)">登录</a>
    <div class="message" v-loading="loading">{{message}}</div>
  </div>
</template>

<script>
  export default{
    name: 'Login',
    // 由于username和password是绑定在表单上的，所以得在computed上额外设置set方法，过于麻烦，所以这里不用store
    data () {
      return {
        username: '',
        password: '',
        message: '',
        loading: false
      }
    },
    computed: {},
    methods: {
      login () {
        if (this.username && this.password) {
          this.loading = true
          const loginInfo = {
            username: this.username,
            password: this.password
          }
          this.$store.dispatch('login', loginInfo)
            .then(res => {
              this.message = res.message
              this.$router.push('/')
              this.$store.dispatch('getWebsites')
                .then(res => {
                  this.$store.commit('setCurrentWebsite', res.websites[0])
                })
                .catch(err=>{})
              this.$emit('routerTo', 0)
              this.loading = false
            })
            .catch(err => {
              this.message = err.message
              this.loading = false
            })
        }
      }
    },
    mounted () {
      this.$emit('routerTo', -1)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div.login-wrap {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  h1.title {
    margin: 20px 0;
    color: #9c9c9c;
    line-height: 36px;
    font-size: 26px;
    font-weight: normal;
    font-family: "Arial", sans-serif;
  }

  div.input {
    padding: 10px;
  }

  div.input label {
    display: inline-block;
    width: 64px;
    line-height: 20px;
    font-size: 16px;
    color: #666666;
    font-weight: bold;
  }

  div.input input {
    display: inline-block;
    padding-left: 10px;
    padding-right: 26px;
    width: 200px;
    height: 30px;
    color: #777777;
  }

  a.login-btn {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    background: dodgerblue;
    padding: 10px 15px;
    border-radius: 8px;
  }

  a.login-btn + div.message {
    width: 100%;
    height: 50px;
    color: darkred;
    font-weight: bold;
    font-size: 14px;
    line-height: 50px;
    text-align: center;
  }
</style>
