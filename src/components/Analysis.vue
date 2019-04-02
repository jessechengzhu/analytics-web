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
       <td>+</td>
       <td>{{record.open_time}}</td>
       <td>南通</td>
       <td><a :href="record.entrance" target="_blank" :title="record.entrance">{{record.entrance}}</a></td>
       <td>{{record.ip}}</td>
       <td>{{record.duration}}</td>
       <td>{{record.visitPages}}</td>
<!--       <ul>-->
<!--         <li v-for="url of record.urls">{{url}}</li>-->
<!--       </ul>-->
     </tr>
     </tbody>
    </table>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Analysis',
    data () {
      return {
        records: []
      }
    },
    computed: mapState(['currentWebsite']),
    methods: {
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
      this.$emit('routerTo',2)
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
    font-family: '微软雅黑',sans-serif;
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
    border-right: 1px solid rgba(0,0,0,.1);
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
    width: 96px;
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
    border-bottom: 1px solid rgba(0,0,0,.1);
    background: #f8f8f8;
  }
  /* 表体每一行 */
  table.visitor tbody tr{
    line-height: 40px;
    font-size: 16px;
    color: #606060;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }
  table.visitor tbody tr:hover{
    background: #eeeaff;
  }
  table.visitor tbody tr:last-child{
    border: none;
  }
  /* 表体第一列 */
  table.visitor tbody tr td:nth-child(1){
    color: #333;
    font-weight: 600;
    font-size: 16px;
  }
</style>
