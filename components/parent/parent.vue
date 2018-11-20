<template>
  <div id="father">
    <div>
       我是父组件,我接受到了：
      {{ text || '暂无数据'  }}
      <son v-on:sendData='getSonText'></son>
    </div>
  </div>
</template>
 
<script>
import son from './son.vue'
export default {
  data: function () {
    return {
      text: ''
    }
  },
  components: {
    son: son
  },
  methods: {
    getSonText (text) {
      this.text = text
    }
  }
}

</script>
 
<style lang="scss" scoped>
#father div {
  padding: 10px;
  margin: 10px;
  border: 1px solid grey;
  overflow: hidden;
}
</style>