<template>
<div class="mark-icon">
    <div class="container" :style="containerStyleObj" ref="mark-icon">
        <div v-if="showImg" :style="imgStyleObj" class="imgContainer">
            <slot name="logo"></slot>
        </div>

        <!-- 内部圆球 -->
        <div :style="pieStyleObj">

        </div>
        <!-- 分数容器 -->
        <div class="numContainer" :style="markStyleObj">
            <span style="line-height:100%;color:white;height: 100%; width: 100%; padding: 40px; font-size:65px; display: inline-block; ">{{mark}}</span>
        </div>
        <!-- 外部圆圈 -->
        <div :style="circleStyleObj" class="circleContainer">
            <div class="lightCircleA round animate"></div>
            <div class="lightCircleB round animate"></div>
            <div class="circle round">
                <div class="pointA round animate-blink"></div>
            </div>
            <div class="circleB round">
                <div class="pointB round animate-blink"></div>
            </div>
            <div class="circle round">
                <!-- <div class="pointA round"></div> -->
            </div>

        </div>
        <!-- canvas画板 -->
        <canvas ref="canvas_board" class="canvas_board" :style="canvasBoardStyleObj">

</canvas>
    </div>
</div>
</template>

<script>
export default {
    name: 'mark-icon',
    props: {
        //   圆转动
        pie_dia: Number,
        // 外部圆
        circle_dia: Number,
        // 显示分数
        mark: Number,
        // 是否显示图片
        showImg: Boolean,
        // 是否显示转动动画
        rotate: Boolean,
        unit: {
            default: 'px',
            type: String,
        }
    },
    data() {
        return {

        }
    },
    mounted() {
        this.draw();
    },
    methods: {
        draw() {
            var oc = this.$refs['canvas_board'];
            if (oc.getContext) {
                var ctx = oc.getContext("2d")

                //在画布上随机生成圆
                var arr = []

                //将数组中的圆绘制到画布上
                for (let i = 0; i < 15; i++) {
                    var r = Math.random() * 6 + 2
                    var x = oc.width / 2;
                    var y = oc.height - 10 * r;
                    var red = Math.round(Math.random() * 255)
                    var green = Math.round(Math.random() * 255)
                    var blue = Math.round(Math.random() * 255)
                    var alp = 1

                    var deg = 0
                    var startX = x
                    var startY = y
                    var step = Math.random() * 20 + 10

                    arr.push({
                        x: x,
                        y: y,
                        r: r,
                        red: red,
                        green: green,
                        blue: blue,
                        alp: alp,
                        deviete_x_deg: Math.random().toFixed(2),
                        deviete_y_deg: Math.random().toFixed(2),
                        deg: deg,
                        startX: startX,
                        startY: startY,
                        step: step
                    })

                }
                setInterval(function () {
                    /*console.log(arr)*/

                    ctx.clearRect(0, 0, oc.width, oc.height)
                    ctx.fillStyle = 'rgba(100, 100, 100, 1)';
                    ctx.fill();
                    // ctx.globalAlpha =0.1;
                    // 背景色
                    // #ffd3d3
                    // ctx.fillStyle('#ffd3d3');
                    // ctx.fillCircle(this.circle_dia/2,this.circle_dia/2,this.circle_dia/2);
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].y <= 50) {
                            arr.splice(i, 1)
                        }
                        arr[i].deg += 1;
                        // arr[i].x = arr[i].startX + Math.sin(arr[i].deg*Math.PI/180)*arr[i].step*2 ;
                        arr[i].x = (Math.sin(arr[i].deg * arr[i].deviete_x_deg * Math.PI / 80) * arr[i].step) * 10;
                        // arr[i].y = arr[i].startY - Math.cos( arr[i].deg*arr[i].deviete_y_deg*arr[i].deviete_deg*Math.PI/180 )*arr[i].step;
                        arr[i].y = (arr[i].startY - Math.cos(arr[i].deg * arr[i].deviete_deg * Math.PI / 180) * arr[i].step) * arr[i].deviete_y_deg;

                    }
                    //绘制图形
                    for (var i = 0; i < arr.length; i++) {
                        /*  console.log(i)*/
                        ctx.save()
                        // ctx.fillStyle = "rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].alp+")"
                        ctx.fillStyle = "#ff5e5e"
                        ctx.beginPath()
                        ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, 2 * Math.PI)
                        ctx.fill()
                        ctx.restore()
                    }
                }, 5)
                // },1000/60)

                //往arr数组中存放每一个随机圆的数据
                // setInterval(function () {

                // },50)

            }
        }
    },
    computed: {
        c_offset() {
            let offset = `${(this.circle_dia-this.pie_dia)/2}${this.unit}`
            return offset;
        },
        // 图片偏移距离
        deviete_img() {
            return this.cirecle_dia - 123;
        },
        containerStyleObj() {
            return {
                height: `${this.circle_dia}${this.unit}`,
                width: `${this.circle_dia}${this.unit}`,
            }
        },
        imgStyleObj() {
            return {};
        },
        pieStyleObj() {
            return {
                height: `${this.pie_dia}${this.unit}`,
                width: `${this.pie_dia}${this.unit}`,
                position: 'absolute',
                left: this.c_offset,
                top: this.c_offset,
                borderRadius: '50%',
                background: 'linear-gradient(#ff7c09,red)',
                zIndex: '100',
            };
        },
        markStyleObj() {
            return {
                position: 'absolute',
                fontSize: '40px',
                // color:'white',
                left: this.c_offset,
                top: this.c_offset,
                height: `${this.pie_dia}${this.unit}`,
                width: `${this.pie_dia}${this.unit}`,
                zIndex: 100,
            };
        },
        circleStyleObj() {
            return {
                height: `${this.circle_dia}${this.unit}`,
                width: `${this.circle_dia}${this.unit}`,
                position: 'absolute',
                borderRadius: '50%',
                // background: '#ffc6c6',
                background: 'rgb(255, 228, 228)',
                zIndex: '50',
            };
        },
        canvasBoardStyleObj() {
            return {
                height: `${this.circle_dia}${this.unit}`,
                width: `${this.circle_dia}${this.unit}`,
                position: 'absolute',
                borderRadius: '50%',
                zIndex: '75',
            };
        }
    },
}
</script>

<style lang="scss" scoped>
.mark-icon {
    width: 100%;
    height: 100%;

    .container {

        // background-color: #999;
        // 图片容器
        position: relative;
        .imgContainer {}

        // 分数容器
        .numContainer {}

        .round {
            border-radius: 50%;
        }

        // 圆环容器
        .circleContainer {

            // 点容器
            .circle {
                width: 100%;
                height: 80%;
                position: absolute;
            }

            .circleB {
                bottom: 5px;
                width: 95%;
                height: 75%;
                position: absolute;
            }

            // 亮椭圆
            .lightCircleA {
                width: 80%;
                height: 70%;
                position: absolute;
                background: radial-gradient(#ff646441,#ff242441);
                left: 34px;
                top: 20px;
            }
            .lightCircleB {
                width: 72%;
                height: 80%;
                position: absolute;
                background-color: #ffa6a67c;
                left: 34px;
                top: 20px;
            }

            // 点
            .pointA {
                width: 10px;
                height: 10px;
                left: 60px;
                top: 30px;
                background-color: rgb(255, 5, 5);
                position: absolute;
            }

            .pointB {
                width: 10px;
                height: 10px;
                left: 30px;
                top: 30px;
                background-color: rgb(255, 5, 5);
                position: absolute;
            }
        }

        // 旋转
        .animate {
            animation: rotate_cir 1.7s linear infinite;
        }

        .animate-blink{
            animation: scale_ani 1s linear infinite;
        }

        @keyframes rotate_cir {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);

            }
        }

        @keyframes scale_ani {
            from {
                transform: scale(1);
            }
            50% {
                transform: scale(0);
            }
            to {
                transform: scale(1);
            }
        }
    }
}
</style>
