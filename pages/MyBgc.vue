<template>
  <nuxt/>
</template>

<script>
import MyComponent from "~/components/MyComponent"
export default {
  components:{
    MyComponent
  },
  name: "my-bgc",
  layout: "main",
  data() {
    return {};
  },
  methods:{
    add(){
      // console.log(this.$store.user.state.list); 
    },
  },
  transition: 'bounce'
};
</script>

<style lang="scss" scoped>
</style>