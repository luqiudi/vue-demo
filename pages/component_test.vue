<template>
  <div class="component_test">
      <el-row>
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
  name: 'component_test',
  components:{
      MarkIcon
  },
  transition: {
        name:'page',
        mode:'out-in'
    },
  data() { 
    return {

    }
  }
 }
</script>

<style lang="scss" scoped>
  .component_test{

  }
</style>