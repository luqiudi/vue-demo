<template>
  <div class="container">
      <h1>父子传值</h1>
      <parent></parent>
  </div>
</template>

<script>
import parent from '~/components/parent/parent'
import son from '~/components/parent/son'
export default {
  name: 'container',
  components:{
      son,parent
  },
  data() { 
    return {
        
    }
  }
 }
</script>

<style lang="scss" scoped>
.container {
}
</style>