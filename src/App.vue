<template>
  <div id="app">
    <div class="container header">
      <div class="container-wrap header-wrap">
        <ul class="clear cate">
          <router-link tag="li" to="/"><img src="./assets/logo.png" alt="logo"></router-link>
          <router-link tag="li" to="/">主页</router-link>
          <router-link tag="li" to="/analysis">分析</router-link>
          <router-link tag="li" to="/statistics">统计</router-link>
          <router-link tag="li" to="/manage">管理</router-link>
        </ul>
        <ul class="clear user" v-if="isLogin">
          <li @click="logout">{{user.username||''}}<span></span></li>
        </ul>
        <ul class="clear sign" v-else>
          <router-link class="login" to="/login" tag="li">登录</router-link>
          <router-link class="register" to="/register" tag="li">注册</router-link>
        </ul>
      </div>
    </div>
    <div class="container main">
      <div class="container-wrap main-wrap">
        <router-view
          :user="user"
          @login="login"
        />
      </div>
    </div>
    <div class="container footer">
      <div class="container-wrap footer-wrap">
        Copyright&nbsp;©&nbsp;<a title="qq:1290279000">Jesse Zhu</a>&nbsp;&nbsp;<a href="http://www.miitbeian.gov.cn/"
                                                                                   target="_blank">苏ICP备19002725号</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isLogin: false,
      user: null
    }
  },
  methods: {
    logout () {
      localStorage.setItem('token', '')
      this.isLogin = false
      this.user = null
      this.$router.push('/login') // 前往登录页面
    },
    login (user) {
      this.isLogin = true
      this.user = user
    }
  },
  mounted: function () {
    console.log('App.vue mounted')
    const token = localStorage.getItem('token')
    if (token) { // 本地存有了token，尝试获取用户信息
      this.$axios.get('/api/users/user')
        .then(res => {
          this.user = res.data.user
          this.isLogin = true
        })
        .catch(err => { // 获取失败了，清除这个无效token
          console.log(err.response.data.message)
          localStorage.setItem('token', '')
          this.isLogin = false
          this.user = null
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .clear:before {
    content: '';
    display: block;
    clear: both;
  }

  .clear:after {
    content: '';
    display: block;
    clear: both;
  }

  .container {
    width: 100%;
    min-width: 1300px;
  }

  .container .container-wrap {
    width: 1300px;
    margin: 0 auto;
  }

  .header {
    height: 50px;
    background: #2c3e50;
  }

  .header .header-wrap {
    height: 100%;
    /*background: aliceblue;*/
  }

  .header-wrap ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .header-wrap li {
    float: left;
  }

  .header-wrap .cate {
    float: left;
  }

  .header-wrap .sign {
    float: right;
  }

  .header-wrap .user {
    float: right;
  }

  .header-wrap li {
    height: 50px;
    line-height: 50px;
    padding: 0 30px;
  }

  .header-wrap .cate li:first-child {
    padding: 0;
  }

  .header-wrap .cate li:first-child img {
    display: block;
    width: 150px;
    height: 100%;
  }

  .header-wrap li:hover {
    cursor: pointer;
  }

  .main {
    background: #eee;
    padding: 15px 0;
  }

  .main .main-wrap {
    background: #fff;
  }

  .footer {
    border-top: 1px solid #333;
    padding: 15px 0;
  }

  .footer .footer-wrap {
    text-align: center;
  }

</style>
