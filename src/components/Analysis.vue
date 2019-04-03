<template>
  <div>
    <h1 class="title">实时访客</h1>
    <table class="visitor">
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
        <td>{{record.open_time}}</td>
        <td><span :title="record.address">{{record.address}}</span></td>
        <td><a :href="record.url" target="_blank" :title="record.url">{{record.url}}</a></td>
        <td>{{record.ip}}</td>
        <td>{{record.duration}}</td>
        <td>{{record.visitPages}}</td>
      </tr>
      </tbody>
    </table>
    <div class="detail" v-show="isDetail">
      <div class="title"><span>详细信息</span><span @click="hideDetail">&times</span></div>
      <div class="content clear">
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
            <li><span>用户类型</span>：老访客</li>
            <li><span>IP地址：</span>{{recordDetail.ip}}</li>
            <li><span>网络服务商：</span>{{recordDetail.service}}</li>
            <li><span>地域：</span>{{recordDetail.address}}</li>
            <li><span>当天访问次数：</span>1</li>
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
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Analysis',
    data () {
      return {
        records: [],
        recordDetail: {},
        isDetail: false
      }
    },
    computed: {
      ...mapState(['currentWebsite']),
      getOpenTime(){
        return function (openTime,index) {
          if(index === 0){
            return this.timeToString(this.recordDetail.open_time)
          }else {
            return this.timeToString(openTime)
          }
        }
      },
      getURL(){
        return function (index) {
          if(index === 0){
            return this.recordDetail.url
          }else {
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
              return this.secondsToMinutes((parseInt(closeTime) - parseInt(openTime)) / 1000)
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
      showDetail (record) {
        this.recordDetail = record
        this.isDetail = true
      },
      hideDetail () {
        this.isDetail = false
      },
      getLimitRecords (page) {
        this.$store.dispatch('getLimitRecords', page)
          .then(res => this.records = res.records)
      }
    },
    watch: {
      currentWebsite () {
        this.getLimitRecords(1)
      }
    },
    mounted () {
      this.$emit('routerTo', 2)
      this.getLimitRecords(1)
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1.title {
    /*margin: 0;*/
    /*line-height: 50px;*/
    color: #9c9c9c;
    font-size: 26px;
    font-weight: normal;
    font-family: "Arial", sans-serif;
  }

  /* 整个表格 */
  table.visitor {
    width: 100%;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, .1);
    font-family: '微软雅黑', sans-serif;
    border-collapse: collapse;
    table-layout: fixed;
  }

  /* 每一列 */
  table.visitor tr td {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* 第n列 */
  table.visitor tr td:nth-child(1) {
    /* + */
    width: 30px;
    border-right: 1px solid rgba(0, 0, 0, .1);
  }

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

  /* 表头每一行 */
  table.visitor thead tr {
    line-height: 50px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    background: #f8f8f8;
  }

  /* 表体每一行 */
  table.visitor tbody tr {
    line-height: 40px;
    font-size: 16px;
    color: #606060;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

  table.visitor tbody tr:hover {
    background: #eeeaff;
  }

  table.visitor tbody tr:last-child {
    border: none;
  }

  /* 表体第一列 */
  table.visitor tbody tr td:nth-child(1) {
    color: #333;
    font-weight: 600;
    font-size: 16px;
  }


  /* 弹窗 */
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

  div.detail .content{
    max-height: 400px;
    overflow-y: scroll;
    padding: 10px;
  }
  div.detail h3{
    margin: 0;
    line-height: 40px;
    color: #666;
    font-size: 20px;
    font-weight: normal;
  }
  div.detail table{
    font-family: '微软雅黑', sans-serif;
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
  }
  /* 每一列 */
  div.detail table tr td {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  div.detail table tr td:first-child{
    width: 84px;
  }
  div.detail table tr td:last-child{
    width: 84px;
  }

  /* 表头每一行 */
  div.detail table thead tr {
    line-height: 28px;
    font-size: 14px;
    font-weight: 600;
    color: #333;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    background: #f8f8f8;
  }

  /* 表体每一行 */
  div.detail table tbody tr {
    line-height: 28px;
    font-size: 14px;
    color: #606060;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }


  div.detail ul{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  div.detail ul li{
    padding: 4px 0;
    font-size: 14px;
    color: #333;
  }
  div.detail ul span{
    font-weight: 600;
  }

  div.detail .user-info{
    margin-top: 10px;
    float: left;
    width: 50%;
  }
  div.detail .device-info{
    margin-top: 10px;
    float: left;
    width: 50%;
  }
</style>
