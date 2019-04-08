<template>
<div class="container">
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">
                <el-col :span="24">
                    <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        :collapse="collapsed"
                    >
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>运行监测</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">监测报表</template>
                                <el-menu-item index="1-1" @click="select">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                    <el-button
                        type="primary"
                        icon="el-icon-arrow-right"
                        circle
                        @click="handleCollapse"
                    ></el-button>
                </el-col>
            </el-aside>
            <el-main>
                <!-- <user></user> -->
                <nuxt></nuxt>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
import user from '../pages/user'
export default {
    name: "container",
    data() {
        return {
            collapsed: false,
            list: [{
                    menuName: "首页",
                    leaf: false,
                    icon: "ggicon-home",
                    path: "/",
                    name: "index"
                },
                {
                    menuName: "插件实例管理",
                    leaf: true,
                    icon: "el-icon-menu",
                    path: "/authManagement/user/list",
                    name: "authManagement-user-list",
                    child: [{
                        menuName: "用户管理",
                        leaf: true,
                        path: "/authManagement/user/list",
                        name: "authManagement-user-list"
                    }]
                },
                {
                    menuName: "插件实例管理2",
                    leaf: true,
                    icon: "el-icon-menu",
                    path: "/authManagement/user/list",
                    name: "authManagement-user-list",
                    child: [{
                        menuName: "用户管理",
                        leaf: true,
                        path: "/authManagement/user/list",
                        name: "authManagement-user-list"
                    }]
                }
            ]
        };
    },
    components: {
        'user': user
    },
    layout: {
        name: 'main'
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log("open");
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log("close");
            console.log(key, keyPath);
        },
        handleCollapse() {
            console.log('collapseSideBar=>');
            console.log(this.collapsed);
            this.collapsed = !this.collapsed
        },
        select() {
            console.log('trigger！');
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    .el-header {
        background-color: #b3c0d1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #d3dce6;
        color: #333;
        text-align: center;
        line-height: 200px;
        height: 878px;
    }

    .el-main {
        background-color: #e9eef3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
}
</style>
