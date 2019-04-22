<template>
  <div>
    <!--今昨日统计数据-->
    <h1 class="title">统计信息</h1>
    <table class="statistics" v-loading="statisticsLoading">
      <thead>
      <tr>
        <td></td>
        <td>浏览量PV</td>
        <td>流量UV</td>
        <td>跳出率</td>
        <td>平均访问时长</td>
      </tr>
      </thead>
      <tbody>
      <tr v-if="statisticsToday">
        <td>今日</td>
        <td>{{ statisticsToday.pv }}</td>
        <td>{{ statisticsToday.uv }}</td>
        <td>{{ statisticsToday.br }}</td>
        <td>{{ statisticsToday.ad }}</td>
      </tr>
      <tr v-if="statisticsYesterday">
        <td>昨日</td>
        <td>{{ statisticsYesterday.pv }}</td>
        <td>{{ statisticsYesterday.uv }}</td>
        <td>{{ statisticsYesterday.br }}</td>
        <td>{{ statisticsYesterday.ad }}</td>
      </tr>
      </tbody>
    </table>
    <!--指定日期统计数据-->
    <div class="statistics-choose">
      <el-date-picker
        class="choose-date"
        v-model="statisticsDate"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <div class="choose-result clear" v-loading="statisticsChooseLoading">
        <div>浏览量PV：<span>{{ statisticsChoose.pv }}</span></div>
        <div>流量UV：<span>{{ statisticsChoose.uv }}</span></div>
        <div>跳出率：<span>{{ statisticsChoose.br }}</span></div>
        <div>平均访问时长：<span>{{ statisticsChoose.ad }}</span></div>
      </div>
    </div>
    <!--pv uv br ad的折线图比较-->
    <div class="compare" v-loading="compareLoading">
      <el-tabs v-model="activeName">
        <el-tab-pane label="浏览量PV/次" name="pv">
          <canvas id="pvCanvas" width="400" height="100">
            <p>Canvas</p>
          </canvas>
        </el-tab-pane>
        <el-tab-pane label="流量UV/次" name="uv">
          <canvas id="uvCanvas" width="400" height="100">
            <p>Canvas</p>
          </canvas>
        </el-tab-pane>
        <el-tab-pane label="跳出率/%" name="br">
          <canvas id="brCanvas" width="400" height="100">
            <p>Canvas</p>
          </canvas>
        </el-tab-pane>
        <el-tab-pane label="平均访问时长/分.秒" name="ad">
          <canvas id="adCanvas" width="400" height="100">
            <p>Canvas</p>
          </canvas>
        </el-tab-pane>
      </el-tabs>
      <el-select v-model="compareDate" class="compare-select">
        <el-option
          v-for="item of compareOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!--实时访客数据-->
    <h1 class="title">实时访客</h1>
    <table class="visitor" v-loading="visitorLoading">
      <thead>
      <tr>
        <td></td>
        <td>访问时间</td>
        <td>地域</td>
        <td>入口页面</td>
        <td>IP</td>
        <td>访问时长</td>
        <td>访问页数</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="record of records">
        <td @click="showDetail(record)">+</td>
        <td>{{timeToFullString(record.open_time)}}</td>
        <td><span :title="record.address">{{record.address}}</span></td>
        <td><a :href="record.url" target="_blank" :title="record.url">{{record.url}}</a></td>
        <td>{{record.ip}}</td>
        <td>{{record.duration}}</td>
        <td>{{record.visitPages}}</td>
      </tr>
      </tbody>
    </table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      @next-click="nextPage"
      @prev-click="prePage"
      @current-change="toPage"
      :page-size="10"
      :total="recordsCount">
    </el-pagination>
    <div class="detail" v-show="isDetail">
      <div class="title"><span>详细信息</span><span @click="hideDetail">&times</span></div>
      <div class="content" v-loading="detailLoading">
        <div class="history">
          <h3>访问记录</h3>
          <table>
            <thead>
            <tr>
              <td>打开时间</td>
              <td>页面地址</td>
              <td>停留</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(openTime,index) of recordDetail.open_times">
              <td>{{getOpenTime(openTime,index)}}</td>
              <td>{{getURL(index)}}</td>
              <td>{{getStay(openTime,index)}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="user-info">
          <h3>用户信息</h3>
          <ul>
            <li><span>用户类型</span>：{{ipIsOld?'旧用户':'新用户'}}</li>
            <li><span>IP地址：</span>{{recordDetail.ip}}</li>
            <li><span>网络服务商：</span>{{recordDetail.service}}</li>
            <li><span>地域：</span>{{recordDetail.address}}</li>
            <li><span>当天访问次数：</span>{{ipThatDayVisit}}</li>
          </ul>
        </div>
        <div class="device-info">
          <h3>设备信息</h3>
          <ul>
            <li><span>使用设备：</span>{{recordDetail.device}}</li>
            <li><span>操作系统：</span>{{recordDetail.os}}</li>
            <li><span>浏览器：</span>{{recordDetail.browser_name}}</li>
            <li><span>屏幕分辨率：</span>{{recordDetail.wxh}}</li>
            <li><span>屏幕颜色：</span>{{recordDetail.depth}}<span>&nbsp;位</span></li>
          </ul>
        </div>
      </div>
    </div>
    <!--访客分析-->
    <div class="clear">
      <!--新旧访客分析-->
      <div class="new-old-visitor" v-loading="nosLoading">
        <h1 class="title">新旧访客</h1>
        <div class="visitor-select">
          <el-select v-model="visitorDate">
            <el-option
              v-for="item of visitorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <canvas id="novCanvas" width="200" height="100">
          <p>Canvas</p>
        </canvas>
      </div>
      <!-- 留存分析-->
      <div class="stay-visitor" v-loading="stayLoading">
        <h1 class="title">留存分析</h1>
        <div class="visitor-input">
          <el-input-number v-model="activeDays" :precision="0" :step="15" :min="7" :max="90"
                           label="描述文字"></el-input-number>
          <el-tooltip class="item" effect="dark" placement="right">
            <div slot="content">-设置流失标准-<br/><br/>你可以在此设置<br/>多少天未访问的<br/>用户为流失用户<br/>最小为7天<br/>最大为90天</div>
            <el-button><i class="fa fa-question-circle"></i></el-button>
          </el-tooltip>
        </div>
        <canvas id="svCanvas" width="200" height="100">
          <p>Canvas</p>
        </canvas>
      </div>
      <!--地域分析-->
      <div class="region-visitor"></div>
    </div>
    <br>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Chart from 'chart.js'

  export default {
    name: 'Analysis',
    data () {
      return {
        /* 今日昨日指定日的统计数据 */
        statisticsLoading: true,
        statisticsToday: {},
        statisticsYesterday: {},
        statisticsChooseLoading: false,
        statisticsChoose: {pv: '-', uv: '-', br: '-', ad: '-'},
        statisticsDate: null,  // 选择的日期
        /* 比较折线图 */
        compareLoading: true,
        selectClass:'select-content',
        activeName: 'pv',  // 选择要比较的属性
        compareDate: '3',
        compareOptions: [{
          value: '3',
          label: '近三天'
        }, {
          value: '7',
          label: '近七天'
        }, {
          value: '15',
          label: '近十五天'
        }, {
          value: '30',
          label: '近一个月'
        }],
        pvChart: null,
        uvChart: null,
        brChart: null,
        adChart: null,
        compareLabel: ['前天', '昨天', '今天'],
        /* 实时访客记录 */
        visitorLoading: true,
        records: [],
        recordsCount: 0,
        recordPage: 1,
        recordDetail: {},
        ipIsOld: false,
        ipThatDayVisit: 0,
        isDetail: false,
        detailLoading: true,
        /* 新旧访客饼状图 */
        nosLoading: true,
        visitorDate: '1',
        visitorOptions: [{
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
        novChart: null,
        /* 留存分析饼状图 */
        stayLoading: true,
        activeDays: 30,
        svChart: null,
      }
    },
    computed: {
      ...mapState(['currentWebsite','websites']),
      getOpenTime () {
        return function (openTime, index) {
          if (index === 0) {
            return this.timeToString(this.recordDetail.open_time)
          } else {
            return this.timeToString(openTime)
          }
        }
      },
      getURL () {
        return function (index) {
          if (index === 0) {
            return this.recordDetail.url
          } else {
            return this.recordDetail.urls[index]
          }
        }
      },
      getStay () {
        return function (openTime, index) {
          const closeTime = this.recordDetail.close_time
          if (closeTime) {
            const openTimes = this.recordDetail.open_times
            if (index === openTimes.length - 1) {  // 最后一次访问
              const diffTime = (parseInt(closeTime) - parseInt(openTime)) / 1000
              return diffTime < 0 ? '正在访问' : this.secondsToMinutes(diffTime)
            } else {
              return this.secondsToMinutes((parseInt(openTimes[index + 1]) - parseInt(openTime)) / 1000)
            }
          } else {
            return '正在访问'
          }
        }
      }
    },
    methods: {
      /* canvas */
      drawCanvas () {
        this.pvChart = new Chart(document.getElementById('pvCanvas'), {
          type: 'line',
          data: {
            labels: ['前天', '昨天', '今天'],
            datasets: [{
              data: [0, 0, 0],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,// 图表是否响应式
            legend: {   // 图例
              display: false,
            },
            scales: {
              /* y轴 */
              yAxes: [{
                ticks: {
                  beginAtZero: true   // 从0开始
                }
              }]
            }
          }
        })
        this.uvChart = new Chart(document.getElementById('uvCanvas'), {
          type: 'line',
          data: {
            labels: ['前天', '昨天', '今天'],
            datasets: [{
              data: [0, 0, 0],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,// 图表是否响应式
            legend: {   // 图例
              display: false,
            },
            scales: {
              /* y轴 */
              yAxes: [{
                ticks: {
                  beginAtZero: true   // 从0开始
                }
              }]
            }
          }
        })
        this.brChart = new Chart(document.getElementById('brCanvas'), {
          type: 'line',
          data: {
            labels: ['前天', '昨天', '今天'],
            datasets: [{
              data: [0, 0, 0],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,// 图表是否响应式
            legend: {   // 图例
              display: false,
            },
            scales: {
              /* y轴 */
              yAxes: [{
                ticks: {
                  beginAtZero: true   // 从0开始
                }
              }]
            }
          }
        })
        this.adChart = new Chart(document.getElementById('adCanvas'), {
          type: 'line',
          data: {
            labels: ['前天', '昨天', '今天'],
            datasets: [{
              data: [0, 0, 0],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,// 图表是否响应式
            legend: {   // 图例
              display: false,
            },
            scales: {
              /* y轴 */
              yAxes: [{
                ticks: {
                  beginAtZero: true   // 从0开始
                }
              }]
            }
          }
        })
        this.novChart = new Chart(document.getElementById('novCanvas'), {
          type: 'pie',
          data: {
            labels: ['新访客', '旧访客'],
            datasets: [{
              data: [0, 0],
              backgroundColor: ['rgb(105,255,102)', 'rgb(122,141,255)'],
              borderColor: 'rgb(255,255,255)',
              borderWidth: 3
            }]
          },
          options: {
            responsive: true,// 图表是否响应式
            legend: {   // 图例
              display: true,
            },
          }
        })
        this.svChart = new Chart(document.getElementById('svCanvas'), {
          type: 'pie',
          data: {
            labels: ['活跃用户', '沉默用户', '流失用户'],
            datasets: [{
              data: [10, 10, 10],
              backgroundColor: ['rgb(255,70,48)', 'rgb(202,122,255)', 'rgb(80,80,80)'],
              borderColor: 'rgb(255,255,255)',
              borderWidth: 3
            }],
          },
          options: {
            title: {
              display: true,
              text: '累计用户数：',
            },
            responsive: true,// 图表是否响应式
            legend: {   // 图例
              display: true,
            },
          }
        })
      },
      updateCanvas () {
        this.pvChart.update()
        this.uvChart.update()
        this.brChart.update()
        this.adChart.update()
        this.novChart.update()
        this.svChart.update()
      },
      /* 时间转化工具 */
      timeToDay (time) {
        time = parseInt(time)
        const date = new Date(time)
        const month = date.getMonth() + 1
        const day = date.getDate()
        return month + '月' + day + '日'
      },
      timeToFullString (time) {
        time = parseInt(time)
        const date = new Date(time)
        const year = date.getFullYear()
        const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
      },
      timeToString (time) {
        time = parseInt(time)
        const date = new Date(time)
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return hour + ':' + minute + ':' + second
      },
      secondsToMinutes (seconds) {
        let time = ''
        seconds = parseInt(seconds)
        if (seconds > 59) {
          let minutes = Math.floor(seconds / 60)
          seconds = seconds % 60
          time = minutes + `′` + seconds + `″`
        } else {
          time = seconds + `″`
        }
        return time
      },
      /* 获取统计数据 */
      getStatistics () {
        this.statisticsLoading = true
        this.$store.dispatch('getStatistics', 0)  // 获取网站指定日期的统计信息
          .then(res => {
            this.statisticsToday = res.statistics
            return this.$store.dispatch('getStatistics', 1)
          })
          .then(res => {
            this.statisticsYesterday = res.statistics
            this.statisticsLoading = false
          })
          .catch(err => {})
          .catch(err => {})
      },
      getStatisticsChoose (dayNum) {
        this.statisticsChooseLoading = true
        this.$store.dispatch('getStatistics', dayNum)  // 获取网站指定日期的统计信息
          .then(res => {
            this.statisticsChooseLoading = false
            this.statisticsChoose = res.statistics
          })
          .catch(err => {})
      },
      /* 折线比较图 */
      getCompareData (days) {
        this.compareLoading = true
        this.$store.dispatch('getCompareData', days)
          .then(res => {
            this.compareLoading = false
            this.pvChart.data.datasets[0].data = res.compare.pvData
            this.uvChart.data.datasets[0].data = res.compare.uvData
            this.brChart.data.datasets[0].data = res.compare.brData
            this.adChart.data.datasets[0].data = res.compare.adData
            this.updateCanvas()
          })
          .catch(err => {})
      },
      /* 实时访客记录 */
      getLimitRecords (page) {
        this.visitorLoading = true
        this.$store.dispatch('getLimitRecords', page)
          .then(res => {
            this.visitorLoading = false
            this.records = res.records
          })
          .catch(err => {})
      },
      getRecordsCount () {
        this.$store.dispatch('getRecordsCount')
          .then(res => this.recordsCount = res.count)
          .catch(err => {})
      },
      showDetail (record) {
        this.recordDetail = record
        this.isDetail = true
        this.detailLoading = true
        this.$store.dispatch('getRecordMore', record.id)
          .then(res => {
            this.detailLoading = false
            this.ipIsOld = res.isOld
            this.ipThatDayVisit = res.thatDayVisit
          })
          .catch(err => {})
      },
      hideDetail () {
        this.isDetail = false
      },
      nextPage () {
        this.recordPage++
      },
      prePage () {
        this.recordPage--
      },
      toPage (page) {
        this.recordPage = page
      },
      /* 新旧访客饼状图 */
      getONVisitorData (days) {
        this.nosLoading = true
        this.$store.dispatch('getONVisitorData', days)
          .then(res => {
            this.nosLoading = false
            this.novChart.data.datasets[0].data = res.onvisitor
            this.updateCanvas()
          })
          .catch(err => {})
      },
      /* 留存分析饼状图 */
      getSVisitorData (days) {
        this.stayLoading = true
        this.$store.dispatch('getSVisitorData', days)
          .then(res => {
            this.stayLoading = false
            this.svChart.data.datasets[0].data = res.svisitor
            this.svChart.options.title.text = '累计用户数：' + (res.svisitor[0] + res.svisitor[1] + res.svisitor[2])
            this.updateCanvas()
          })
          .catch(err => {})
      }
    },
    watch: {
      currentWebsite () {
        this.getStatistics()
        this.getCompareData(this.compareDate)
        this.getLimitRecords(this.recordPage)
        this.getRecordsCount()
        this.getONVisitorData(1)
        this.getSVisitorData(30)
      },
      statisticsDate (val) {
        if (val) {
          const date = new Date(val)
          const dayNum = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
          if (dayNum >= 0) {
            this.getStatisticsChoose(dayNum)
          } else {
            this.statisticsChoose = {pv: '-', uv: '-', br: '-', ad: '-'}
          }
        } else {
          this.statisticsChoose = {pv: '-', uv: '-', br: '-', ad: '-'}
        }
      },
      compareDate (val) {
        const nowDate = Date.now()
        const oneDayTime = 1000 * 60 * 60 * 24
        let tmp = []
        switch (val) {
          case '3':  // 切换到近三天
            this.pvChart.data.labels = ['前天', '昨天', '今天']
            this.uvChart.data.labels = ['前天', '昨天', '今天']
            this.brChart.data.labels = ['前天', '昨天', '今天']
            this.adChart.data.labels = ['前天', '昨天', '今天']
            this.getCompareData(3)
            break
          case '7':  // 切换到近七天
            tmp = []
            for (let i = 6; i > -1; i--) {
              tmp.push(this.timeToDay(nowDate - oneDayTime * i))
            }
            this.pvChart.data.labels = tmp
            this.uvChart.data.labels = tmp
            this.brChart.data.labels = tmp
            this.adChart.data.labels = tmp
            this.getCompareData(7)
            break
          case '15':  // 切换到近十五天
            tmp = []
            for (let i = 14; i > -1; i--) {
              tmp.push(this.timeToDay(nowDate - oneDayTime * i))
            }
            this.pvChart.data.labels = tmp
            this.uvChart.data.labels = tmp
            this.brChart.data.labels = tmp
            this.adChart.data.labels = tmp
            this.getCompareData(15)
            break
          case '30':  //切换到近一个月
            tmp = []
            for (let i = 29; i > -1; i--) {
              tmp.push(this.timeToDay(nowDate - oneDayTime * i))
            }
            this.pvChart.data.labels = tmp
            this.uvChart.data.labels = tmp
            this.brChart.data.labels = tmp
            this.adChart.data.labels = tmp
            this.getCompareData(30)
            break
          default:
        }
      },
      recordPage () {
        this.getLimitRecords(this.recordPage)
      },
      visitorDate (val) {
        this.getONVisitorData(val)
      },
      activeDays (val) {
        this.getSVisitorData(val)
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
      this.$emit('routerTo', 1)
      this.getStatistics()
      this.drawCanvas()
      this.getCompareData(3)
      this.getLimitRecords(1)
      this.getRecordsCount()
      this.getONVisitorData(1)
      this.getSVisitorData(30)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1.title {
    margin: 20px 0;
    color: #9c9c9c;
    font-size: 26px;
    line-height: 36px;
    font-weight: normal;
    font-family: "Arial", sans-serif;
  }

  canvas {
    background: #e4e4e4;
  }

  /* 统计表格 */
  table.statistics {
    width: 100%;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
    font-family: '微软雅黑', sans-serif;
    border-collapse: collapse;
    table-layout: fixed;
  }

  table.statistics tr td {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* 每一列 */

  table.statistics tr td:nth-child(1) {
    width: 60px;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }

  /* 第一列 */

  table.statistics thead tr {
    line-height: 50px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    background: #f8f8f8;
  }

  /* 表头每一行 */

  table.statistics tbody tr {
    line-height: 40px;
    font-size: 16px;
    color: #606060;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  /* 表体每一行 */

  table.statistics tbody tr:last-child {
    border: none;
  }

  table.statistics tbody tr td:nth-child(1) {
    color: #333;
    font-weight: 600;
    font-size: 14px;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }

  /* 表体第一列 */

  /* 指定日期统计 */
  div.statistics-choose {
    position: relative;
    margin: 10px 0;
  }

  div.statistics-choose .choose-date {
    box-sizing: border-box;
    width: 220px;
    cursor: pointer;
  }

  div.statistics-choose .choose-result {
    position: absolute;
    top: 0;
    left: 220px;
    right: 0;
  }

  div.statistics-choose .choose-result div {
    float: left;
    width: 25%;
    font-weight: 600;
    color: #333;
    font-size: 14px;
    line-height: 40px;
    padding: 0 5px;
    box-sizing: border-box;
  }

  div.statistics-choose .choose-result span {
    color: #666;
  }

  /* 比较折线图 */
  div.compare {
    position: relative;
  }

  div.compare .compare-select {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
  }


  /* 实时访客表格 */
  table.visitor {
    width: 100%;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
    font-family: '微软雅黑', sans-serif;
    border-collapse: collapse;
    table-layout: fixed;
  }

  table.visitor tr td {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* 每一列 */

  table.visitor tr td:nth-child(1) {
    /* + */
    width: 30px;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }

  /* 第n列 */

  table.visitor tr td:nth-child(1):hover {
    cursor: pointer;
  }

  table.visitor tr td:nth-child(2) {
    /* 访问时间 */
    width: 208px;
  }

  table.visitor tr td:nth-child(3) {
    /* 地域 */
    width: 208px;
  }

  table.visitor tr td:nth-child(4) a {
    /* 入口页面 */
    text-decoration: none;
    color: cornflowerblue;
  }

  table.visitor tr td:nth-child(5) {
    /* ip */
    width: 176px;
  }

  table.visitor tr td:nth-child(6) {
    /* 访问时长 */
    width: 96px;
  }

  table.visitor tr td:nth-child(7) {
    /* 访问页数 */
    width: 80px;
  }

  table.visitor thead tr {
    line-height: 50px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    background: #f8f8f8;
  }

  /* 表头每一行 */

  table.visitor tbody tr {
    line-height: 40px;
    font-size: 16px;
    color: #606060;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  /* 表体每一行 */

  table.visitor tbody tr:hover {
    background: #eeeaff;
  }

  table.visitor tbody tr:last-child {
    border: none;
  }

  table.visitor tbody tr td:nth-child(1) {
    color: #333;
    font-weight: 600;
    font-size: 16px;
  }

  /* 表体第一列 */

  div.pagination {
    margin-top: 10px;
    text-align: right;
  }

  /* 记录细节弹窗 */
  div.detail {
    position: fixed;
    width: 600px;
    background: #ffffff;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, .1);
    top: 50%;
    left: 50%;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    z-index: 15;
  }

  div.detail .title {
    position: relative;
    background: linear-gradient(90deg, #6982e7, #e791bb);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  div.detail .title span:first-child {
    display: block;
    line-height: 30px;
    font-size: 16px;
    color: #f0f0f0;
    width: 100%;
    text-align: center;
  }

  div.detail .title span:last-child {
    position: absolute;
    display: block;
    right: 0;
    top: 0;
    width: 30px;
    line-height: 30px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    background: red;
    border-top-right-radius: 5px;
  }

  div.detail .title span:last-child:hover {
    cursor: pointer;
  }

  div.detail .content {
    max-height: 400px;
    overflow-y: scroll;
    padding: 10px;
  }

  div.detail h3 {
    margin: 0;
    line-height: 40px;
    color: #666;
    font-size: 20px;
    font-weight: normal;
  }

  div.detail table {
    font-family: '微软雅黑', sans-serif;
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
  }

  div.detail table tr td {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  div.detail table tr td:first-child {
    width: 84px;
  }

  div.detail table tr td:last-child {
    width: 84px;
  }

  div.detail table thead tr {
    line-height: 28px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    background: #f8f8f8;
  }

  div.detail table tbody tr {
    line-height: 28px;
    font-size: 14px;
    color: #606060;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  div.detail ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  div.detail ul li {
    padding: 4px 0;
    font-size: 14px;
    color: #333;
  }

  div.detail ul span {
    font-weight: 600;
  }

  div.detail .user-info {
    margin-top: 10px;
    float: left;
    width: 50%;
  }

  div.detail .device-info {
    margin-top: 10px;
    float: left;
    width: 50%;
  }

  /* 新旧访客分析 */
  div.new-old-visitor {
    position: relative;
    width: 50%;
    float: left;
  }

  div.new-old-visitor .visitor-select {
    position: absolute;
    top: 20px;
    width: 100%;
    text-align: center;
  }

  div.stay-visitor {
    position: relative;
    width: 50%;
    float: left;
  }

  div.stay-visitor .visitor-input {
    position: absolute;
    top: 20px;
    width: 100%;
    text-align: center;
  }
</style>
