<template>
  <div>
    <h1>实时访客</h1>
    <ul>
      <li>
        <span>访问时间</span>
        <span>地域</span>
        <span>入口页面</span>
        <span>IP</span>
        <span>访问时长</span>
        <span>访问页数</span>
      </li>
      <li v-for="record of records">
        <span>{{record.open_time}}</span>
        <span>{{}}</span>
        <span>{{record.entrance}}</span>
        <span>{{record.ip}}</span>
        <span>{{record.duration}}</span>
        <span>{{record.visitPages}}</span>
        <ul>
          <li v-for="url of record.urls">{{url}}</li>
        </ul>
      </li>
    </ul>
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
  ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul li span {
    display: inline-block;
    width: 200px;
  }

  li:hover {
    cursor: pointer;
    background: #00000030;
  }
</style>
