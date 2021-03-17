<template>
  <div>
    <!--自定义事件-->
    <h1 class="title">自定义事件&nbsp;<i class="el-icon-question" @click="showEventDescribe=!showEventDescribe"></i></h1>
    <div class="custom" v-loading="eventLoading">
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部事件" name="all">
          <el-table
            :data="allEventData"
            border
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
            border
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
            border
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
            border
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
      <el-select v-model="dateSelect1" class="date-select">
        <el-option
          v-for="item of dateOptions1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--转化分析-->
    <h1 class="title">转化分析&nbsp;<i class="el-icon-question" @click="showConversionDescribe=!showConversionDescribe"></i></h1>
    <div class="custom">
      <el-select v-model="conversionSelect" class="conversion-select" v-loading="conversionLoading">
        <el-option
          v-for="(value,key) in conversionData"
          :key="key"
          :label="key"
          :value="key">
        </el-option>
      </el-select>
      <el-select v-model="dateSelect2" class="date-select">
        <el-option
          v-for="item of dateOptions2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="step clear" v-for="(name,index) of stepName">
        <p>{{name}}<span>{{stepData[index]}}次&nbsp;&nbsp;转化率{{calStepPer(index)}}%</span></p>
        <el-progress :show-text="false" :stroke-width="50" :percentage=calFinaPer(index) class="conversion-progress"></el-progress>
      </div>
      <div class="final" v-if="stepData.length!==0">总转化率{{calFinaPer(-1)}}%</div>
    </div>
    <br>
    <transition name="fade">
      <div v-show="showEventDescribe" class="describe">
      <div class="title">自定义事件<span @click="showEventDescribe=false">&times;</span></div>
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
    <transition name="fade">
      <div v-show="showConversionDescribe" class="describe">
        <div class="title">转化分析<span @click="showConversionDescribe=false">&times;</span></div>
        <div class="content">
          <h3>API</h3>
          <p>waTag('conversion', 'name', 'step', queue);</p>
          <h3>功能介绍</h3>
          <p>用于分析整个流程中各个阶段的转化情况。如注册流程、下单流程等。</p>
          <h3>设置方法</h3>
          <p>在每个步骤发生时，在JS中调用转化跟踪代码。</p>
          <p>参数说明：</p>
          <ul>
            <li>conversion：固定字符串参数，表示此api用于跟踪转化。</li>
            <li>name：必填唯一字符串参数，表示转化目标名，如："注册转化"、"订单转化"等等。该项必填，中英文皆可，不填的事件会被抛弃。</li>
            <li>step：必填唯一字符串参数，表示在这个转化目标中的步骤名，如"首页"、"商品详情页"、"加入购物车"、"提交订单"、"支付订单"等等。该项必填，中英文皆可，不填的事件会被抛弃。</li>
            <li>queue：必填唯一数字参数，表示在这个转化目标中的步骤顺序，从1开始逐步递增。该项必填，不填的事件会被抛弃。</li>
          </ul>
          <h3>举例</h3>
          <ol>
            <li>
              <p>例如我们可以对用户注册转化进行分析，在每个步骤发生时加入对应的代码：</p>
              <p>waTag('conversion', '注册转化', '首页', 1);</p>
              <p>waTag('conversion', '注册转化', '注册页', 2);</p>
              <p>waTag('conversion', '注册转化', '注册表单提交', 3);</p>
              <p>waTag('conversion', '注册转化', '注册成功', 4);</p>
              <p>这样就可以在"转化分析"中查看"注册转化"这个目标中每个阶段的转化率分析了。</p>
            </li>
            <li>
              <p>例如我们可以对订单转化进行分析，在每个步骤发生时加入对应的代码：</p>
              <p>waTag('conversion', '订单转化', '首页', 1);</p>
              <p>waTag('conversion', '订单转化', '商品详情页', 2);</p>
              <p>waTag('conversion', '订单转化', '加入购物车', 3);</p>
              <p>waTag('conversion', '订单转化', '提交订单', 4);</p>
              <p>waTag('conversion', '订单转化', '支付订单', 5);</p>
              <p>这样就可以在"转化分析"中查看"订单转化"这个目标中每个阶段的转化率分析了。</p>
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
    ...mapState(['currentWebsite', 'websites'])
  },
  data () {
    return {
      /* 自定义事件 */
      showEventDescribe: false,
      eventLoading: true,
      activeName: 'all',
      dateSelect1: '3',
      dateOptions1: [{
        value: '1',
        label: '今天'
      }, {
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
      /* 转化分析 */
      showConversionDescribe: false,
      conversionLoading: true,
      dateSelect2: '3',
      dateOptions2: [{
        value: '1',
        label: '今天'
      }, {
        value: '3',
        label: '近三天'
      }, {
        value: '7',
        label: '近七天'
      }, {
        value: '30',
        label: '近一个月'
      }],
      conversionData: {},
      conversionSelect: '',
      stepName: [],
      stepData: []
    }
  },
  methods: {
    /* 自定义事件 */
    getEventData () {
      this.eventLoading = true
      this.$store.dispatch('getEventData', this.dateSelect1)
        .then(res => {
          this.eventLoading = false
          this.allEventData = res.events.allEventData
          this.catEventData = res.events.catEventData
          this.actEventData = res.events.actEventData
          this.labEventData = res.events.labEventData
        })
        .catch(() => { this.eventLoading = false })
    }, // 获取表格数据
    /* 转化分析 */
    getConversionData () {
      this.conversionLoading = true
      this.conversionSelect = ''
      this.conversionData = {}
      this.$store.dispatch('getConversionData', this.dateSelect2)
        .then(res => {
          this.conversionLoading = false
          this.conversionData = res.conversion
          this.conversionSelect = Object.keys(this.conversionData)[0] || ''
        })
        .catch(() => { this.conversionLoading = false })
    }, // 获取转化分析
    calStepPer (index) {
      if (index === 0) {
        return 100
      } else {
        return Math.floor(10000 * this.stepData[index] / this.stepData[index - 1]) / 100
      }
    },
    calFinaPer (index) {
      if (index === -1) {
        let len = this.stepData.length
        return Math.floor(10000 * this.stepData[len - 1] / this.stepData[0]) / 100
      } else {
        return Math.floor(10000 * this.stepData[index] / this.stepData[0]) / 100
      }
    }
  },
  watch: {
    currentWebsite () {
      this.getEventData()
    },
    dateSelect1 () {
      this.getEventData()
    },
    dateSelect2 () {
      this.getConversionData()
    },
    conversionSelect (val) {
      if (val) {
        let names = []
        let datas = []
        this.conversionData[val][0].forEach(item => {
          if (item) {
            names.push(item)
          }
        })
        this.conversionData[val][1].forEach(item => {
          if (item) {
            datas.push(item)
          }
        })
        this.stepName = names
        this.stepData = datas
      }
    }
  },
  mounted () {
    if (!this.currentWebsite) {
      if (this.websites.length !== 0) {
        this.$store.commit('setCurrentWebsite', this.websites[0])
      } else {
        this.$router.push('/manage')
      }
    }
    this.$emit('routerTo', 2)
    this.getEventData()
    this.getConversionData()
    waTag('event', '高级页面', '访问', '访问高级页面')
    // waTag('conversion', '订单转化', '首页', 1);
    // waTag('conversion', '订单转化', '商品详情页', 2);
    // waTag('conversion', '订单转化', '下单', 3);
    // waTag('conversion', '订单转化', '支付成功', 4);
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
    z-index: 15;
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
  div.custom {
    position: relative;
  }

  div.custom .date-select {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
  }

  div.custom .step{
    margin-top: 15px;
  }
  div.custom .step p{
    margin: 0;
    line-height: 50px;
    box-sizing: border-box;
    width: 50%;
    float: left;
    display: block;
    padding: 0 10px;
  }
  div.custom .step p span{
    float: right;
  }
  div.custom .conversion-progress {
    width: 50%;
    float: left;
  }
  div.custom .final{
    line-height: 50px;
    margin-top: 15px;
    text-align: center;
  }
</style>
