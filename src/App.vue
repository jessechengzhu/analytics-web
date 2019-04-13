<template>
  <div id="app">
    <div class="header">
      <div class="nav nav-left">
        <router-link to="/" class="logo" tag="div"></router-link>
        <div class="select" @click="toggleSelect">
          {{selectInfo}}&nbsp;<i class="fa fa-lg"
                                 :class="{'fa-caret-right': !showSelect, 'fa-caret-left': showSelect}"></i>
        </div>
        <div class="select-content" v-show="showSelect">
          <ul>
            <li v-for="website in websites" @click="selectWebsite(website)">{{ website.host }}</li>
          </ul>
        </div>
      </div>
      <div class="nav nav-right">
        <div class="user" v-if="isLogin&&user">
          <div class="user-avatar" @click="toggleUserOperation">
            <i class="fa fa-user-circle-o"></i>&nbsp;{{user.username}}&nbsp;<i class="fa fa-lg"
                                                                               :class="{'fa-caret-down':!showUserOperation,'fa-caret-up':showUserOperation}"></i>
          </div>
          <div class="user-operation" v-show="showUserOperation">
            <a @click="logout">其他操作</a>
            <a @click="logout">登出</a>
          </div>
        </div>
        <div class="sign" v-else>
          <router-link class="login" to="/login" tag="a">登录</router-link>
          <router-link class="register" to="/register" tag="a">注册</router-link>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="side">
        <div class="side-bar list-group">
          <router-link to="/" class="list-group-item" :class="{'choose': chooseH}">
            <i class="fa fa-home fa-fw" style="color: #4f97e7"></i>&nbsp;主页
          </router-link>
          <router-link to="/analytics" class="list-group-item" :class="{'choose': chooseA}">
            <i class="fa fa-line-chart fa-fw" style="color: #e7cd5a"></i>&nbsp;分析
          </router-link>
          <router-link to="/custom" class="list-group-item" :class="{'choose': chooseC}">
            <i class="fa fa-bar-chart fa-fw" style="color: #e78271"></i>&nbsp;高级
          </router-link>
          <router-link to="/manage" class="list-group-item" :class="{'choose': chooseM}">
            <i class="fa fa-cog fa-fw" style="color: #e76cb2"></i>&nbsp;管理
          </router-link>
        </div>
      </div>
      <router-view class="main-wrap"
          @routerTo="routerTo"
        />
    </div>
    <!--    <div class=" footer">-->
    <!--      <div class="footer-wrap">-->
    <!--        Copyright&nbsp;©&nbsp;<a title="qq:1290279000">Jesse Zhu</a>&nbsp;&nbsp;<a href="http://www.miitbeian.gov.cn/"-->
    <!--                                                                                   target="_blank">苏ICP备19002725号</a>-->
    <!--      </div>-->
    <!--    </div>-->

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'App',
    data () {
      return {
        selectInfo: '全部网站数据',
        showSelect: false,
        showUserOperation: false,
        chooseH: true,
        chooseA: false,
        chooseC: false,
        chooseM: false,
      }
    },
    computed: mapState(['isLogin', 'user', 'websites', 'currentWebsite']),
    methods: {
      logout () {
        this.showUserOperation = false
        this.showSelect = false
        this.$router.replace('/login')
        this.selectInfo = '全部网站数据'
        this.$store.commit('clearUser')
      },
      getUser () {
        this.$store.dispatch('getUser')
      },
      getWebsites () {
        this.$store.dispatch('getWebsites')
          .then(() => {this.loadSessionStorage()})
      },
      loadSessionStorage () {
        let currentWebsite = JSON.parse(sessionStorage.getItem('website'))
        if (currentWebsite) {
          this.$store.commit('setCurrentWebsite', currentWebsite)
        } else if (this.websites.length !== 0) {
          this.$store.commit('setCurrentWebsite', this.websites[0])
        }
        sessionStorage.removeItem('website')
      },
      toggleSelect () {
        this.showSelect = !this.showSelect
      },
      toggleUserOperation () {
        this.showUserOperation = !this.showUserOperation
      },
      routerTo (num) {
        switch (num) {
          case -1:
            this.chooseH = false
            this.chooseA = false
            this.chooseC = false
            this.chooseM = false
            break
          case 0:
            this.chooseH = true
            this.chooseA = false
            this.chooseC = false
            this.chooseM = false
            break
          case 1:
            this.chooseH = false
            this.chooseA = true
            this.chooseC = false
            this.chooseM = false
            break
          case 2:
            this.chooseH = false
            this.chooseA = false
            this.chooseC = true
            this.chooseM = false
            break
          case 3:
            this.chooseH = false
            this.chooseA = false
            this.chooseC = false
            this.chooseM = true
            break
          default:
            this.chooseH = true
            this.chooseA = false
            this.chooseC = false
            this.chooseM = false
        }
      },
      selectWebsite (website) {
        if (this.chooseH || this.chooseM) {
          this.$router.push('/analytics')
        }
        this.showSelect = false
        this.selectInfo = '当前选择：' + website.host
        this.$store.commit('setCurrentWebsite', website)
      }
    },
    watch: {
      chooseH (choose) {
        if (choose) {
          this.selectInfo = '全部网站数据'
        }
      },
      chooseC (choose) {
        if (choose && this.currentWebsite) {
          this.selectInfo = '当前选择：' + this.currentWebsite.host
        }
      },
      chooseA (choose) {
        if (choose && this.currentWebsite) {
          this.selectInfo = '当前选择：' + this.currentWebsite.host
        }
      },
      chooseM (choose) {
        if (choose) {
          this.selectInfo = '全部网站数据'
        }
      },
      /* 用于监听刷新页面后vuex数据丢失问题 */
      currentWebsite (website) {
        if (this.chooseC || this.chooseA) {
          this.selectInfo = '当前选择：' + website.host
        }
      }
    },
    mounted () {
      this.getUser()
      this.getWebsites()
      window.onbeforeunload = () => {
        sessionStorage.setItem('website', JSON.stringify(this.currentWebsite))
      }
    }
  }
</script>

<style>

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

  /* App组件样式 */
  div.header {
    box-sizing: content-box;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    min-width: 1300px;
    background: linear-gradient(90deg, #6982e7, #e791bb);
    color: #fff;
    z-index: 10;
  }

  div.header .nav {
    position: absolute;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
  }

  div.header .nav-left {
    left: 0;
  }

  div.header .logo {
    width: 150px;
    height: 100%;
    margin: 0 10px;
    background-image: url("./assets/logo.png");
    background-repeat: no-repeat;
    background-size: 150px 60px;
    cursor: pointer;
  }

  div.header .select {
    box-sizing: border-box;
    margin: 5px 0;
    border-radius: 8px;
    line-height: 50px;
    padding: 0 10px;
    /*color: #333;*/
    font-size: 24px;
  }

  div.header .select:hover {
    background: #e791bb;
    cursor: pointer;
  }

  div.header .select-content {
    margin-left: 5px;
    margin-top: 5px;
    box-shadow: #4391bf70 0 0 15px;
    border-radius: 6px;
    background: #fff;
  }

  div.header .select-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  div.header .select-content li {
    padding: 0 10px;
    line-height: 50px;
    font-size: 16px;
    color: #828282;
    font-family: Helvetica, sans-serif;
  }

  div.header .select-content li:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  div.header .select-content li:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  div.header .select-content li:hover {
    cursor: pointer;
    background: #e791bb;
    color: #fff;
  }

  div.header .nav-right {
    right: 0;
  }

  div.header .sign {
    margin-right: 10px;
  }

  div.header .sign a {
    text-decoration: none;
    /*color: #333;*/
    font-weight: bold;
    font-family: "微软雅黑", sans-serif;
    padding: 0 15px;
    line-height: 60px;
  }

  div.header .user {
    margin-right: 10px;
  }

  div.header .user-avatar {
    box-sizing: border-box;
    margin: 5px 0;
    border-radius: 8px;
    /*color: #333;*/
    line-height: 50px;
    font-size: 20px;
    text-align: right;
    padding: 0 10px;
  }

  div.header .user-avatar:hover {
    cursor: pointer;
    background: #6982e7;
  }

  div.header .user-operation {
    min-width: 100px;
    margin-top: -5px;
    border-radius: 6px;
    box-shadow: #4391bf70 0 0 15px;
    background: #fff;
  }

  div.header .user-operation a {
    display: block;
    padding: 0 10px;
    line-height: 50px;
    text-align: right;
    font-size: 16px;
    color: #828282;
    font-family: "微软雅黑", sans-serif;
  }
  div.header .user-operation  a:first-child{
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  div.header .user-operation a:last-child{
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  div.header .user-operation a:hover {
    cursor: pointer;
    background: #6982e7;
    color: #fff;
  }

  div.main {
    background: #fff;
    margin-top: 60px;
  }

  div.main .side {
    position: fixed;
    box-sizing: border-box;
    box-shadow: 1px 0 rgba(0, 0, 0, 0.1);
    height: 100%;
  }

  div.main .side-bar {
    box-sizing: border-box;
  }

  div.main .side-bar a {
    display: block;
    box-sizing: border-box;
    width: 200px;
    padding: 10px;
    text-decoration: none;
    color: #464646;
    font-weight: bold;
    line-height: 40px;
    font-size: 20px;
    transition: all 0.2s ease-in;
  }

  div.main .side-bar a:hover {
    background: #d4daff80;
  }

  div.main .side-bar a.choose {
    line-height: 60px;
    font-size: 30px;
    background: #d4daff;
  }

  div.main .main-wrap {
    position: absolute;
    left: 200px;
    right: 0;
    top: 60px;
    bottom: 0;
    padding: 10px 15px;
  }

</style>
