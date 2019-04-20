<template>
  <div>
    <!--自定义事件-->
    <h1 class="title">自定义事件&nbsp;<i class="fa fa-question-circle" @click="showDescribe=!showDescribe"></i></h1>
    <div class="event" v-loading="eventLoading">
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部事件" name="all">
          <el-table
            :data="allEventData"
            height="300"
            border
            show-summary
            style="width: 100%">
            <el-table-column
              prop="name"
              label="全部事件（类型+操作+标签）">
            </el-table-column>
            <el-table-column
              prop="count"
              label="事件总数"
              width="200">
            </el-table-column>
            <el-table-column
              prop="ipCount"
              label="唯一访客事件数"
              width="200">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="类型" name="cat">
          <el-table
            :data="catEventData"
            height="300"
            border
            show-summary
            style="width: 100%">
            <el-table-column
              prop="name"
              label="事件类型">
            </el-table-column>
            <el-table-column
              prop="count"
              label="事件总数"
              width="200">
            </el-table-column>
            <el-table-column
              prop="ipCount"
              label="唯一访客事件数"
              width="200">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="操作" name="act">
          <el-table
            :data="actEventData"
            height="300"
            border
            show-summary
            style="width: 100%">
            <el-table-column
              prop="name"
              label="事件操作">
            </el-table-column>
            <el-table-column
              prop="count"
              label="事件总数"
              width="200">
            </el-table-column>
            <el-table-column
              prop="ipCount"
              label="唯一访客事件数"
              width="200">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="标签" name="lab">
          <el-table
            :data="labEventData"
            height="300"
            border
            show-summary
            style="width: 100%">
            <el-table-column
              prop="name"
              label="事件标签">
            </el-table-column>
            <el-table-column
              prop="count"
              label="事件总数"
              width="200">
            </el-table-column>
            <el-table-column
              prop="ipCount"
              label="唯一访客事件数"
              width="200">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-select v-model="dateSelect" class="date-select">
        <el-option
          v-for="item of dateOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <transition name="fade">
      <div v-show="showDescribe" class="describe">
        <div class="title">自定义事件<span @click="showDescribe=false">&times;</span></div>
        <div class="content">
          <h3>API</h3>
          <p>waTag('event', 'category', 'action', 'opt_label', opt_value);</p>
          <h3>功能介绍</h3>
          <p>用于触发某个事件，如点击某个按钮时，点击某个链接时，或播放器的播放/停止时。</p>
          <h3>设置方法</h3>
          <p>在触发如点击/开始/停止/下载等事件时，在JS中调用事件跟踪代码。</p>
          <p>参数说明：</p>
          <ul>
            <li>event：固定字符串参数，表示此api用于跟踪事件。</li>
            <li>category：必填字符串参数，要监控的目标的类型名称，通常是同一组目标的名字，如："按钮"、"button"、"视频"、"video"、"链接"、"link"等等。该项必填，中英文皆可，不填的事件会被抛弃。</li>
            <li>action：必填字符串参数，用户跟目标交互的行为，如"点击"、"click"、"播放"、"暂停"、"下载"等等。该项必填，中英文皆可，不填的事件会被抛弃。</li>
            <li>opt_label：可选字符串参数，事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项建议填写，中英文皆可，不填代表此项为空。</li>
            <li>opt_value：可选数字参数，事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。</li>
          </ul>
          <h3>举例</h3>
          <ol>
            <li>
              <p>例如我们可以对某种类型的链接进行监控：</p>
              <p>&lt;a onclick="waTag('event', 'nav', 'click', 'literatur');" href="http://www.example.com/literatur"&gt;&lt;/a&gt;</p>
              <p>这样就可以在"自定义事件"分析中查看导航栏中，采用点击操作、且是关于文学内容链接的点击次数了</p>
            </li>
            <li>
              <p>例如用户点击播放按钮会播放"Hey Jude"这首歌，那么在对应的事件处理函数中可以这样来监控播放或暂停事件：</p>
              <p>waTag('event', 'video', 'play', 'Hey Jude');</p>
              <p>waTag('event', 'video', 'pause', 'Hey Jude');</p>
              <p>这样就可以在"自定义事件"分析中就能看到播放/暂停等事件的对应数据了</p>
            </li>
            <li>
              <p>例如页面上有一个"千千静听"的下载链接，那么可以这样来监控下载事件：</p>
              <p>&lt;a id="download" onclick="waTag('event', 'software', 'download', 'ttplayer');" href="http://www.example.com/download/ttpsetup.exe"&gt;下载&lt;/a&gt;</p>
              <p>这样就可以在"自定义事件"分析中就能看到下载事件的对应数据了</p>
            </li>
          </ol>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Custom',
    computed: {
      ...mapState(['currentWebsite','websites']),
    },
    data(){
      return {
        /* 自定义事件 */
        showDescribe: false,
        eventLoading: true,
        activeName: 'all',
        dateSelect: '1',
        dateOptions: [{
          value: '1',
          label: '今天'
        },{
          value: '3',
          label: '近三天'
        }, {
          value: '7',
          label: '近七天'
        }, {
          value: '30',
          label: '近一个月'
        }],
        allEventData: [],
        catEventData: [],
        actEventData: [],
        labEventData: [],
      }
    },
    methods:{
      /* 自定义事件 */
      getEventData(){
        this.eventLoading = true
        this.$store.dispatch('getEventData',this.dateSelect)
          .then(res=>{
            this.eventLoading = false
            this.allEventData= res.events.allEventData
            this.catEventData= res.events.catEventData
            this.actEventData= res.events.actEventData
            this.labEventData= res.events.labEventData
          })
          .catch(()=>{this.eventLoading = false})
      }, // 获取表格数据
    },
    watch:{
      currentWebsite(){
        this.getEventData()
      },
      dateSelect(){
        this.getEventData()
      },
    },
    mounted () {
      if(!this.currentWebsite){
        if (this.websites.length!==0){
          this.$store.commit('setCurrentWebsite',this.websites[0])
        } else {
          this.$router.push('/manage')
        }
      }
      this.$emit('routerTo', 2)
      this.getEventData()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  canvas {
    background: #e4e4e4;
  }

  h1.title {
    margin: 20px 0;
    line-height: 36px;
    color: #9c9c9c;
    font-size: 26px;
    font-weight: normal;
    font-family: "Arial", sans-serif;
  }
  h1.title i.fa{
    color: dodgerblue;
  }
  h1.title i.fa:hover{
    cursor: pointer;
  }

  div.fade-enter-active, div.fade-leave-active {
    transition: all .5s;
  }
  div.fade-enter, div.fade-leave-to{
    opacity: 0;
  }

  div.describe{
    position: fixed;
    display: flex;
    flex-direction: column;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 80%;
    max-height: 80%;
    background: #fff;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, .2);
    z-index: 6000;
  }

  div.describe .title{
    flex-grow: 0;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    background: linear-gradient(90deg, #6982e7, #e791bb);
  }
  div.describe .title span{
    position: absolute;
    display: block;
    width: 30px;
    background: red;
    color: #fff;
    font-weight: bold;
    top: 0;
    right: 0;
  }
  div.describe .title span:hover{
    cursor: pointer;
  }
  div.describe .content{
    flex-grow: 1;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 0 15px;
  }
  div.describe .content h3{
    margin: 15px 0;
    line-height: 30px;
    font-size: 20px;
    color: #818181;
    font-weight: normal;
    border-bottom: 1px solid #9c9c9c;
  }
  div.describe .content p{
    word-break:break-all;
    font-size: 16px;
    margin: 12px 0;
  }
  div.describe .content p.indent{
    text-indent: 32px;
  }
  div.describe .content li{
    word-break:break-all;
    margin-bottom: 10px;
  }

  /* 自定义事件 */
  div.event {
    position: relative;
  }

  div.event .date-select {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;
  }
</style>
