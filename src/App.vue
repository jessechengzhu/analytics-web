<template>
  <el-container id="app">
    <el-header class="header">
      <el-row type="flex" justify="space-between">
        <el-col :span="16" class="header-left">
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
        </el-col>
        <el-col :span="8" class="header-right">
          <div v-if="user" class="user">
            <div class="user-avatar" @click="toggleUserOperation">
              <i class="fa fa-user-circle-o"></i>&nbsp;{{user.username}}&nbsp;<i class="fa fa-lg"
                                                                                 :class="{'fa-caret-down':!showUserOperation,'fa-caret-up':showUserOperation}"></i>
            </div>
            <div class="user-operation" v-show="showUserOperation">
              <a @click="logout">其他操作</a>
              <a @click="logout">登出</a>
            </div>
          </div>
          <div v-else class="sign">
            <router-link class="login" to="/login" tag="a">登录</router-link>
            <router-link class="register" to="/register" tag="a">注册</router-link>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="side">
        <div class="list-group">
          <router-link to="/" class="list-group-item" :class="{'choose': chooseH}"
                       tag="div">
            <i class="fa fa-home fa-fw" style="color: #4f97e7"></i>&nbsp;主页
          </router-link>
          <router-link to="/analytics" class="list-group-item" :class="{'choose': chooseA}"
                       tag="div">
            <i class="fa fa-line-chart fa-fw" style="color: #e7cd5a"></i>&nbsp;分析
          </router-link>
          <router-link to="/custom" class="list-group-item" :class="{'choose': chooseC}"
                       tag="div">
            <i class="fa fa-bar-chart fa-fw" style="color: #e78271"></i>&nbsp;高级
          </router-link>
          <router-link to="/manage" class="list-group-item" :class="{'choose': chooseM}"
                       tag="div">
            <i class="fa fa-cog fa-fw" style="color: #e76cb2"></i>&nbsp;管理
          </router-link>
        </div>
      </el-aside>
      <el-main class="main">
        <router-view
          @routerTo="routerTo"
          @addNotification="addNotification"
        />
      </el-main>
    </el-container>
  </el-container>
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
    computed: mapState(['user', 'websites', 'currentWebsite']),
    methods: {
      addNotification (title, message) {
        const h = this.$createElement
        this.$notify({
          title: title,
          message: h('i', {style: 'color: teal'}, message)
        })
      },
      logout () {
        this.showUserOperation = false
        this.showSelect = false
        this.$router.replace('/login')
        this.selectInfo = '全部网站数据'
        this.$store.commit('clearUser')
      },
      getUser () {
        this.$store.dispatch('getUser')
          .then(() => {})
          .catch(() => {})
      },
      getWebsites () {
        this.$store.dispatch('getWebsites')
          .then(() => {this.loadSessionStorage()})
          .catch(() => {})
      },
      loadSessionStorage () {
        let currentWebsite = JSON.parse(sessionStorage.getItem('website'))
        if (currentWebsite) {
          this.$store.commit('setCurrentWebsite', currentWebsite)
        } else if (this.websites && this.websites.length !== 0) {
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
          this.selectInfo = '当前选择：' + this.currentWebsite ? this.currentWebsite.host : ''
        }
      },
      chooseA (choose) {
        if (choose && this.currentWebsite) {
          this.selectInfo = '当前选择：' + this.currentWebsite ? this.currentWebsite.host : ''
        }
      },
      chooseM (choose) {
        if (choose) {
          this.selectInfo = '全部网站数据'
        }
      },
      /* 用于监听刷新页面后vuex数据丢失问题 */
      currentWebsite (website) {
        if (website && (this.chooseC || this.chooseA)) {
          this.selectInfo = '当前选择：' + website.host
        } else {
          this.selectInfo = '全部网站数据'
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

  p.footer {
    font-size: 14px;
    color: #666;
    text-align: center;;
  }

  p.footer a {
    color: #666;
    text-decoration: none;
    font-weight: 600;
  }

  p.footer a:hover {
    text-decoration: underline;
  }

  /* App组件样式 */
  .header {
    width: 100%;
    position: fixed;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
    min-width: 1300px;
    background: linear-gradient(90deg, #6982e7, #e791bb);
    color: #fff;
    z-index: 10;
  }

  .header .header-left > div {
    float: left;
  }

  .header .header-right > div {
    float: right;
  }

  .header .logo {
    width: 150px;
    height: 60px;
    background-image: url("./assets/logo.png");
    background-repeat: no-repeat;
    background-size: 150px 60px;
    cursor: pointer;
  }

  .header .select {
    box-sizing: border-box;
    margin: 5px 0;
    border-radius: 8px;
    line-height: 50px;
    padding: 0 10px;
    /*color: #333;*/
    font-size: 24px;
  }

  .header .select-content {
    margin-top: 5px;
    box-shadow: #4391bf70 0 0 15px;
    border-radius: 6px;
    background: #fff;
  }

  .header .select:hover {
    background: #e791bb;
    cursor: pointer;
  }

  .header .select-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .header .select-content li {
    padding: 0 10px;
    line-height: 50px;
    font-size: 16px;
    color: #828282;
    font-family: Helvetica, sans-serif;
  }

  .header .select-content li:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .header .select-content li:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .header .select-content li:hover {
    cursor: pointer;
    background: #e791bb;
    color: #fff;
  }

  .header .sign a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    padding: 0 15px;
    line-height: 60px;
  }

  .header .user-avatar {
    border-radius: 8px;
    line-height: 60px;
    font-size: 20px;
    text-align: right;
    padding: 0 10px;
  }

  .header .user-avatar:hover {
    cursor: pointer;
    background: #a1ace7;
  }

  .header .user-operation {
    min-width: 100px;
    border-radius: 6px;
    box-shadow: #4391bf70 0 0 15px;
    background: #fff;
  }

  .header .user-operation a {
    display: block;
    padding: 0 10px;
    line-height: 50px;
    text-align: right;
    font-size: 16px;
    color: #828282;
  }

  .header .user-operation a:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  .header .user-operation a:last-child {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .header .user-operation a:hover {
    cursor: pointer;
    background: #a1ace7;
    color: #fff;
  }

  .main {
    margin-top: 60px;
    margin-left: 200px;
    padding: 0 15px;
    z-index: 1;
  }

  .side {
    margin-top: 60px;
    position: fixed;
    box-shadow: 1px 0 rgba(0, 0, 0, 0.1);
    height: 100%;
    z-index: 5;
  }

  .side .list-group .list-group-item {
    padding: 10px;
    text-decoration: none;
    color: #464646;
    font-weight: bold;
    line-height: 40px;
    font-size: 20px;
    transition: all 0.2s ease-in;
  }

  .side .list-group .list-group-item:hover {
    background: #d4daff80;
    cursor: pointer;
  }

  .side .list-group .list-group-item.choose {
    line-height: 60px;
    font-size: 30px;
    background: #d4daff;
  }
</style>
