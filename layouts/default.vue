<template>
<div class="defaultContent">
    <el-aside width="100%">
        <el-menu mode="horizontal" 
		background-color="#545c64"
		text-color="#fff"
         @select="changeMenu"
		:default-active="lightMenu">
            <el-submenu v-for="(submenus,index) in menuHasChild" :index="submenus.name" :key="index|toText" >
                <template slot="title">
					<i :class="submenus.icon" style="color:white"></i>
					{{submenus.menuName}}
				</template>

                <el-submenu v-for="(item,subIndex) in submenus.children" :index="item.name" :key="`${index}-${subIndex}`">
                    <template slot="title">
                    {{item.menuName}}
                    </template>
                    <template v-if="item.children&&item.children.length>0 ">
                        <el-menu-item v-for="(itemChild,itemChildIndex) in item.children" :index="itemChild.name" :key="`${index}-${subIndex}-${itemChildIndex}`"> 
                            {{itemChild.menuName}}
                        </el-menu-item>        
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.name" :key="item.name"> 
                            {{item.menuName}}
                        </el-menu-item>        
                    </template>
                </el-submenu>
            </el-submenu>
            <el-menu-item v-for="(submenus, index) in menuHasNoChild" :index="submenus.name" :key="index|toText">
                    <template slot="title">
					<i :class="submenus.icon" style="color:white"></i>
					{{submenus.menuName}}
				</template>

                <el-submenu v-for="(item,subIndex) in submenus.children" :index="item.name" :key="`${index}-${subIndex}`">
                    <template slot="title">
                    {{item.menuName}}
                    </template>
                    <template v-if="item.children&&item.children.length>0 ">
                        <el-menu-item v-for="(itemChild,itemChildIndex) in item.children" :index="itemChild.name" :key="`${index}-${subIndex}-${itemChildIndex}`"> 
                            {{itemChild.menuName}}
                        </el-menu-item>        
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.name" :key="item.name"> 
                            {{item.menuName}}
                        </el-menu-item>        
                    </template>
                </el-submenu>
            </el-menu-item>
        </el-menu>
    </el-aside>
	<el-container>
		<el-main class="mainPage">
			<nuxt />
		</el-main>
	</el-container>
    
</div>
</template>

<script>
import menus from '~/config/menu';
export default {
    data () {
      return {
		  list:[],
		  lightMenu:'0-0',
      }
    },
    
    filters:{
        toText(value){
            return value+'';
        }
    },
	mounted() {
		this.list = menus.urlList;
		console.log('this.list :', this.list);
	},
    methods: {
		changeMenu(key,keyPath){
			console.log('key :', key);
            console.log('keyPath :', keyPath);
            // let path = this.list[key],
            //     path_arr = keyPath[keyPath.length-1].split('-'),
            //    [parentIndex,childIndex] = path_arr,
            //    parentMenu = this.list[parentIndex],
            //    childMenu = parentMenu.children[childIndex]||{},
            //    parentName = parentMenu.name,
            //    childName =childMenu.name;

            this.$router.push({
                name:`${key}`
            });
		},
		changeMenu2(item){
            console.log('chagneMenu12');
			console.log('item :', item);
            // this.$router.push({
            //     name:keyPath
            // })
		}
    },
    computed: {
      menuHasChild() {return this.list.filter(item=>item.children&&item.children.length>0)},
      menuHasNoChild() {return this.list.filter(item=>!item.children)},
    },
    watch: {
      
    },
}
</script>

<style lang="scss" scoped>
.defaultContent {
    height: 100%;
    width: 100%;
}
</style>

<style>
html {
    font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}
</style>
