<template>
  <div class="transition-container">
    <el-row>
      <el-col :span="12">过渡测试1

        <button @click="show=!show">显示</button>
      </el-col>
    </el-row>
    
      <el-row>
          <el-col :span="12">
            <transition name="fade">
              <p v-if="show">123213</p>
            </transition>
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
        show:true,
    }
  }
 }
</script>

<style lang="scss" scoped>
  .transition-container{

  }
</style>