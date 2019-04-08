<template>
  <div class="transition-container">
      <el-row>
          <el-col :span="12">
              分数组件示例
          </el-col>
          
          <el-col :span="12">
            <MarkIcon
             :circle_dia="240" 
             :pie_dia="160"
             :mark="12"
             :rotate="true"
            ></MarkIcon>
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