<template>
  <div class="user">
      <button @click="$store.commit('increment'),display()">{{$store.state.counter}}</button>
      123
  </div>
</template>

<script>
import {mapMutations} from "vuex"

export default {
  name: 'user',
  data() { 
    return {
      msg:1
    }
  },
  components:{

  },
  methods:{
      display(){
        console.log(this.msg);
      }
  },
   ...mapMutations({
      display: 'user/add'
    })
 }
</script>

<style lang="scss" scoped>
  .user{

  }
</style>