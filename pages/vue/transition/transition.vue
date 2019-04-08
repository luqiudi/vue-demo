<template>
  <div class="transition-container">
    <el-row>
      <el-col :span="12">过渡测试1</el-col>
    </el-row>
    
      <el-row>
          <el-col :span="12">
          </el-col>
      </el-row>
      
  </div>
</template>

<script>
import MarkIcon from '~/components/MarkIcon'
export default {
  name: 'transition-container',
  components:{
      MarkIcon
  },
  transition:{
    name:'page'
  },
  data() { 
    return {

    }
  }
 }
</script>

<style lang="scss" scoped>
  .transition-container{

  }
</style>