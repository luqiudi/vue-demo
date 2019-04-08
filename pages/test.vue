<template>
<div class="test">
    <el-row>
        <el-col :span="12" style="background:#999;height:900px">
            <div class="tooltip-light">
                <div class="tooltip-container">
                    <div class="header-close">
                        <div class="header-inner">
                            <div class="img-container">
                                <img src="~/assets/img/realalarm-icon/map-alarm-o.png" style="width:20px; height:20px">
                            </div>
                            <div class="title-container">
                                <span>
                                    20栋
                                </span>
                            </div>
                            <div class="arrow-container">
                                <i class="fa fa-angle-up fa-2x" style="transition: all .5s;top: 1px;position: absolute;"></i>
                            </div>
                        </div>
                        </div>
                        <div class="body" >
                            <div class="body-inner border-bottom-round">
                                <div class="item">
                                    <span class="item-name"> 烟感</span>
                                    <span class="item-num">123</span>
                                </div>
                                <div class="item">
                                    <span class="item-name"> 故障</span>
                                    <span class="item-num" style="color:red">123</span>
                                </div>
                                <div class="item">
                                    <span class="item-name"> 报警</span>
                                    <span class="item-num" style="color:orange">123</span>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>

                </div>
        </el-col>
        <el-col :span="12">
            <div class="tooltip-light">
                        <div class="tooltip-container">
                            <div class="header-close">
                                <div class="header-inner">
                                    <div class="img-container">
                                        <img src="~/assets/img/realalarm-icon/map-alarm-o.png" style="width:20px; height:20px">
                            </div>
                                        <div class="title-container">
                                            <span>
                                    20栋
                                </span>
                                        </div>
                                        <div class="arrow-container">
                                            <i class="fa fa-angle-up fa-2x" ></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="body">
                                    <div class="body-inner border-bottom-round">
                                        <div class="item">
                                            <span class="item-name"> 烟感</span>
                                            <span class="item-num">123</span>
                                        </div>
                                        <div class="item">
                                            <span class="item-name"> 故障</span>
                                            <span class="item-num" style="color:orange">123</span>
                                        </div>
                                        <div class="item">
                                            <span class="item-name"> 报警</span>
                                            <span class="item-num" style="color:orange">123</span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                    </div>
        </el-col>
        
    </el-row>
    <el-row>
        <el-col :span="12">
            <el-pagination
                :current-page="1"
                :page-sizes="[20, 40, 80, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="100" background>
            </el-pagination>
            
        </el-col>
    </el-row>
    
</div>
</template>

<script>
export default {
    name: 'test',
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
.test {
    .tooltip-light {
    // 展开高度
    $heightOpen: 109px;
    // 总宽度
    $width: 95px;
    // 头部高度
    $heightHeader: 24px;
    // icon高度
    $heightIcon: 20px;
    // icon 宽度
    $widthIcon: 20px;
    // 圆角半径
    $borderRadiusD: 12px;
    // 头部空白部分宽度
    $headerInnerWidth: $width - 2px;

    width: $width;
    position: relative;
    z-index: 10;

    .tooltip-container {

        width: $width;
        // height: 109px;
        border-radius: $borderRadiusD;
        // border: 1px solid #FF2525;
        background-color: red;

        // 收缩状态头部样式
        .header-close {
            width: $headerInnerWidth;
            height: $heightHeader;

            border-radius: $borderRadiusD;
            box-sizing: border-box;
            position: relative;

            padding: {
                top: 1px;
                left: 1px;
            }

            // background-color: gray;

            .header-inner {
                width: $headerInnerWidth;
                height: 24px;
                background-color: red;
                // padding: 2px;
                border-radius: #{$borderRadiusD - 1px};
                cursor: pointer;

                .img-container {
                    width: 24px;
                    height: 24px;
                    display: inline-block;

                    img {
                        margin: 1px;
                        vertical-align: unset;
                        width: 22px;
                        height: 2px;
                    }
                }

                .title-container {
                    display: inline-block;
                    height: 24px;
                    width: 40px;
                    line-height: 24px;
                    overflow: hidden;
                    color: #fff;
                }

                .arrow-container {
                    position: relative;
                    display: inline-block;
                    height: 24px;
                    line-height: 24px;
                    color: #fff;

                    i {
                        transition: all .5s;
                        top: 1px;
                        position: absolute;
                    }
                }
            }
        }

        // 展开状态头部样式
        .header-open {}

        .border-top-round {
            border-radius: 11px 11px 0 0;
        }

        .border-bottom-round {
            border-radius: 0 0 11px 11px;
        }

        .border-round {
            border-radius: 12px;
        }

        .body {
            height: 0px;
            width: $width;
            padding: 2px;
            overflow: hidden;
            display: block;
            transition: all .5s;

            .body-inner {
                background-color: #fff;
                width: 91px;
                height: 100%;

                .item {
                    width: 100%;
                    display: inline-block;

                    padding: {
                        left: 10px;

                    }

                    ;

                    .item-name {
                        width: 24px;
                        height: 13px;
                        font-size: 12px;
                        font-family: MicrosoftYaHei;
                        font-weight: 400;
                        color: rgba(58, 58, 58, 1);
                        line-height: 16px;
                    }

                    .item-num {
                        width: 36px;
                        height: 14px;
                        text-align: right;
                        font-size: 16px;
                        font-family: MicrosoftYaHei;
                        font-weight: 400;
                        color: rgba(58, 58, 58, 1);
                        line-height: 25px;
                    }

                    .alarm-red {
                        color: red
                    }

                    .alarm-orange {
                        color: orange
                    }

                    .alarm-green {
                        color: green
                    }
                }
            }

        }

        &:after {
            content: "";
            position: absolute;
            width: 5px;
            height: 5px;
            background: rgb(255, 0, 0);
            box-sizing: border-box;
            left: 44%;
            top: calc(100% - 3px);
            transform: rotate(45deg);
            border-right: 1px solid #FF2525;
            border-bottom: 1px solid #FF2525;
            z-index: -1;

        }

        &:hover {
            .header-close {
                .header-inner {
                    .arrow-container {
                        i.fa {
                            transform: rotate(180deg)
                        }
                    }

                }
            }

            .body {
                // display: block;
                height: 84px;
            }
        }
    }

    .red-state-close {
        background-color: #FF2525;
    }

    .red-state-open {
        background-color: #FF2525;
    }

}
}
</style>
