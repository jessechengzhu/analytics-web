<template>
  <div>
    {{ msg }}
    {{ count }}
    <button @click="increaseCount()">increase</button>
    <button @click="changeCount({num: 5})">change</button>
    <button @click="action1({num: 100})">jump</button>
    <button @click="action2()">jump</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'Analysis',
  computed: {
    msg () { return this.$store.getters.doubleCount },
    ...mapState({
      count: state => state.count
    })
  },
  methods: {
    action2 () {
      this.$store.dispatch('action2', this.$router)
    },
    ...mapMutations([
      'increaseCount',
      'changeCount'
    ]),
    ...mapActions({
      action1: 'action1'
    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
