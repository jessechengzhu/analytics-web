<template>
  <div>
    <select name="website-select" id="website-select">
      <option v-for="website in websites" value="website.id" @click="pushTo(website.id)">{{ website.host }}</option>
    </select>
  </div>
</template>

<script>
  export default {
    name: 'Statistics',
    data () {
      return {
        websites: []
      }
    },
    methods:{
      pushTo(id) {
        console.log(id)
        this.$router.push('/statistics?siteId='+id)
      }
    },
    mounted () {
      this.$store.dispatch('website/getWebsites')
        .then(res => {
          this.websites = res.data.websites
        })
      const query = this.$route.query
      if (JSON.stringify(query)!=='{}') {
        const siteId = query.siteId
        this.$store.dispatch('website/getWebsite', siteId)
          .then(res => {
            console.log(res.data.website)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
