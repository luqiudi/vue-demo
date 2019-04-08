<template>
<div class="son">
    123
    <canvas id="solar" ref="solar" height="400" width="400">
        该浏览器不支持canvas
    </canvas>
</div>
</template>

<script>
export default {
    name: 'son',
    data() {
        return {
            sun:'',
            earth:'',
            moon:'',
            ctx:'',
        }
    },
    mounted() {
        this.draw();
    },
    methods: {
        init() {
            

        },
        // 整体绘制
        draw() {
            let oc = this.$refs['solar'];
            if(!this.isSupport(oc)){
                return
            }
            this.ctx = oc.getContext('2d');

            this.drawPoint(this.ctx,50,50,4)
            let offset = 0;
            let i = 0;
            let timer = setInterval(()=>{

                this.clearBoard(this.ctx);
                this.drawPoint(this.ctx,i,50,4)
                i++;
                if(offset>10000){
                    console.log('');
                    clearInterval(timer);
                };
            },10)
        },
        // 绘制点位
        drawPoint(ctx,x,y,r){

            ctx.beginPath();
            ctx.fillStyle='#ff6565';
            ctx.arc(
                x,
                y,
                r,
                0,2*Math.PI,true);
            ctx.fill();
            ctx.save();
        },
        // 清理画板
        clearBoard(ctx){
            ctx.clearRect(0, 0, 400, 400);
        },
        isSupport(o){
            if(o.getContext){
                return true
            }else{
                return false
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.son {
    #solar{
        // height: 300px;
        // width: 300px;
    }
}
</style>
