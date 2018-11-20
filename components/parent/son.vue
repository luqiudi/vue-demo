<template>
  <div>
    <p>我是子组件,我所拥有的数据： {{ text }}</p>
    <button @click="sendData">
      发送数据
    </button>
  </div>    
</template>
 
<script>
export default {
  data () {
    return {
      text: '来自子组件的数据'
    }
  },
  methods: {
    sendData () {
      this.$emit('sendData', this.text)
    }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   button { float: left }
</style>