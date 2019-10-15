<template>
  <div>
    <el-row v-if="user">
      <el-col>
        <h1 class="title">网站总览</h1>
        <el-table
          v-loading="loading"
          :data="overview"
          @row-click="toAnalytics"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="网站名称">
          </el-table-column>
          <el-table-column
            align="center"
            prop="pv"
            label="今日浏览量(PV)"
            width="126">
          </el-table-column>
          <el-table-column
            align="center"
            prop="uv"
            label="今日流量(UV)"
            width="112">
          </el-table-column>
          <el-table-column
            align="center"
            prop="br"
            label="今日跳出率"
            width="112">
          </el-table-column>
          <el-table-column
            align="center"
            prop="ad"
            label="今日平均访问时长"
            width="140">
          </el-table-column>
          <el-table-column
            align="center"
            prop="ol"
            label="实时在线人数"
            width="112">
          </el-table-column>
        </el-table>
        <p v-if="overview.length===0" style="text-align: center">空空如也，快去
          <router-link to="/manage">获取</router-link>
          属于自己的网站分析吧。
        </p>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col>
        <h1 class="head">这里是我的毕业设计——用户行为分析平台</h1>
        <h3 class="introduce">一个中文网站流量分析平台，为网站的精细化运营决策提供数据支持，进而有效提高企业的投资回报率。来自<em>15级</em>
          <a href="http://www.ntu.edu.cn/" target="_blank" style="color: #40acdb;">南通大学</a>
          <a href="http://cs.ntu.edu.cn/" target="_blank" style="color: #40acdb;">信息科学技术学院（原计算机科学与技术学院）</a>
          <span style="color: #40acdb;">网络工程专业</span>
          <a href="http://www.jessezhu.cn/" target="_blank" style="color: #40acdb;">朱星杰</a>
          同学的开发，指导老师：<span style="color: #40acdb;">陈森博</span>。</h3>
        <h3 class="introduce">【更新】嘿嘿，我已经毕业啦，这玩意算是超低配版“百度统计”，但也能用，不过你可别真的靠我来统计你的网站啊喂~</h3>
        <h3 class="introduce">
          <router-link to="/login" style="color: darkred; font-weight: 600">开始吧</router-link>
        </h3>
        <h3 class="introduce">提供演示账号：用户名 zhuxingjie    密码 123456  部分效果如折线图因缺少数据可能得不到展示</h3>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <h1 class="title">操作指南</h1>
        <ol>
          <li>
            <h4>添加一个网站</h4>
            <p>点击左侧管理进入管理页面，点击右上角新增网站按钮，依次输入自己网站的域名、首页地址和标题（可选）。</p>
            <img src="../assets/1.jpg" alt="1">
            <img src="../assets/2.jpg" alt="2">
          </li>
          <li>
            <h4>代码安装</h4>
            <p>点击获取代码，即可获取带有属于自己网站唯一跟踪ID的JS埋点代码，将这段代码添加到网站全部页面的&lt;head&gt;标签中。</p>
            <p>
              代码安装完毕后，可以通过点击刷新按钮重新检测代码安装状态，本功能通过抓取网站页面，分析是否安装了正确的统计代码，所以若您的网站打开速度较慢，或者限制程序抓取网页，会导致系统无法判断，但不影响网站正常分析。</p>
            <img src="../assets/3.jpg" alt="3">
            <img src="../assets/4.jpg" alt="4">
            <img src="../assets/5.jpg" alt="5">
          </li>
          <li>
            <h4>一切准备就绪</h4>
            <p>等一段时间，当你的网站有一定的访问量时，你就可以看到我们为您的网站收集到的数据了，若您添加了多个网站，你可以在上方选择查看哪一个网站。</p>
            <img src="../assets/6.jpg" alt="6">
          </li>
        </ol>
        <p class="footer">&copy;Jesse Zhu&nbsp;&nbsp;<a href="http://www.miitbeian.gov.cn/"
                                                        target="_blank">苏ICP备19002725号</a></p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // 使用 createNamespacedHelpers 创建基于某个命名空间辅助函数
  import { mapState } from 'vuex'

  export default {
    name: 'Home',
    data () {
      return {
        overview: [],
        loading: true
      }
    },
    computed: {
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState(['user'])
    },
    methods: {
      getOverview () {
        this.$store.dispatch('getOverview')
          .then(res => {
            this.loading = false
            this.overview = res.overview
          })
          .catch(() => {})
      },
      toAnalytics (website) {
        this.$store.commit('setCurrentWebsite', website)
        this.$router.push('/analytics')
      }
    },
    mounted () {
      this.$emit('routerTo', 0)
      this.getOverview()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1.title {
    margin: 20px 0;
    color: #9c9c9c;
    line-height: 36px;
    font-size: 26px;
    font-weight: normal;
    font-family: "Arial", sans-serif;
  }

  h1.head {
    margin: 20px 0;
    color: #595959;
    line-height: 36px;
    font-size: 26px;
    font-weight: 600;
    font-family: "微软雅黑", sans-serif;
    text-align: center;
  }

  h3.introduce {
    margin: 18px 0;
    color: #9c9c9c;
    line-height: 30px;
    font-size: 20px;
    font-weight: normal;
    font-family: "微软雅黑", sans-serif;
    text-indent: 40px;
  }

  h3.introduce a {
    text-decoration: none;
  }

  h4 {
    color: #232323;
  }

  ol, li {
    padding-left: 10px;
    margin: 0;
  }

  li img {
    width: 90%;
  }

  p.footer{
    text-align: center;
    font-size: 14px;
  }

  p.footer a {
    color: #666;
    text-decoration: none;
    font-weight: 600;
  }

  p.footer a:hover {
    text-decoration: underline;
  }
</style>
