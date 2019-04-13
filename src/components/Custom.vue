<template>
  <div>
    自定义
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Custom',
    mounted () {
      this.$emit('routerTo', 2)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
