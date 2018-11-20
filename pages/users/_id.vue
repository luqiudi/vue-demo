<template>
  <div class="user_id">
      child{{msg}}
  </div>
</template>

<script>
export default {
  name: 'user_id',
  scrollTop:true,
  data() { 
    return {
        msg:'你好'
    }
  }
 }
</script>

<style lang="scss" scoped>
  .user_id{
    
    border: 1px solid #000;
    height: 1069px;
  }
</style>