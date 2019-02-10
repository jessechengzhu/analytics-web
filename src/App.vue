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
          <li @click="logout">{{username}}<span></span></li>
        </ul>
        <ul class="clear sign" v-else>
          <router-link class="login" to="/login" tag="li">登录</router-link>
          <router-link class="register" to="/register" tag="li">注册</router-link>
        </ul>
      </div>
    </div>
    <div class="container main">
      <div class="container-wrap main-wrap">
        <router-view/>
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
    data() {
      return {
        isLogin: false,
        username: '',
      }
    },
    methods: {
      logout(){
        localStorage.setItem('token','');
        this.$router.go(0) // 刷新当前页面
      }
    },
    mounted: function () {
      const token = localStorage.getItem('token');
      this.$axios.defaults.headers.common['Authorization']= 'Bearer ' + token;
      if (token) {  //本地存有了token，尝试获取用户信息
        this.$axios.get('/api/users/user')
          .then(res => {  // 获取成功了，更新页面
            this.isLogin = true;
            this.username = res.data.user.username;
          })
          .catch(err => {  //获取失败了，清除这个无效token
            console.log(err.response.data.message);
            localStorage.setItem('token','')
            this.isLogin=false
            this.username = '';
          })
      }else{  // 没有token
        this.isLogin = false;
        this.username = '';
      }
      /*
      EventBus.$on('login', user => {  //接收来自其他组件的消息
        this.isLogin = true;
        this.username = user.username;
      })
      EventBus.$on('logout', () => {
        this.isLogin = false;
        this.username = '';
      })
      */
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    float: left;
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
