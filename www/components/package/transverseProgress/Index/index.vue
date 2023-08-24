<!-- canvas横向进度条;-->
<template>
    <div>
        <div class="canvasWrap">
            <canvas :id="id" class="canvas" :style="canvasStyle"></canvas>
        </div>
    </div>
</template>

<script>
export default {
    name: 'vbTransverseProgress',
    props: {
        canvasStyle: {
            type: Object,
            default() {
                return {
                    width: '400px',
                    height: '10px',
                };
            },
        },
        bgColor: {
            //底环颜色
            type: String,
            default: '#ccc',
        },
        gradation: {
            //渐变色
            type: Array,
            default() {
                return [];
            },
        },
        topColor: {
            //顶环颜色
            type: String,
            default: '#000',
        },
        percentage: {
            type: Number,
            default: 75,
        },
    },
    data() {
        return {
            canvas_: '',
            ctx: '',
            id: 'canvas_' + Math.floor(Math.random() * 100000),
        };
    },
    watch: {},
    mounted() {
        var canvas_ = (this.canvas_ = document.getElementById(this.id));
        canvas_.height = 100;
        canvas_.width = (100 * canvas_.offsetWidth) / canvas_.offsetHeight;
        this.ctx = canvas_.getContext('2d');
        this.canvasInit();
        ['canvasStyle', 'bgColor', 'topColor', 'percentage'].forEach((val) => {
            this.$watch(val, {
                handler() {
                    this.canvasInit();
                },
                deep: true,
            });
        });
    },
    methods: {
        canvasInit() {
            //初始化
            var ctx = this.ctx;
            var canvas_ = this.canvas_;
            ctx.clearRect(0, 0, canvas_.width, canvas_.height);
            ctx.lineWidth = 100;

            this.initBackLine();
            this.initTopLine();
        },
        initBackLine() {
            // 底线描绘
            var ctx = this.ctx;
            var canvas_ = this.canvas_;
            ctx.beginPath();
            ctx.lineCap = 'butt';
            ctx.moveTo(0, canvas_.height / 2);
            ctx.lineTo(canvas_.width, canvas_.height / 2);
            ctx.strokeStyle = this.bgColor;
            ctx.stroke();
        },
        initTopLine() {
            //顶线描绘
            var ctx = this.ctx;
            var canvas_ = this.canvas_;
            var _this = this;
            if (this.gradation.length > 0) {
                var g = ctx.createLinearGradient(0, 0, (canvas_.width * this.percentage) / 100, 0); //创建渐变对象  渐变开始点和渐变结束点

                g.addColorStop(0, this.gradation[0]); //添加颜色点
                g.addColorStop(1, this.gradation[1]); //添加颜色点

                ctx.strokeStyle = g; //使用渐变对象作为圆环的颜色
            } else {
                ctx.strokeStyle = this.topColor;
            }
            function draw(current) {
                ctx.beginPath();
                ctx.lineCap = 'butt';
                ctx.moveTo(0, canvas_.height / 2);
                ctx.lineTo(current * canvas_.width, canvas_.height / 2);
                ctx.stroke();
            }
            var t = 0;
            var timer = null;
            function loadCanvas(now) {
                timer = setInterval(function () {
                    console.log(now + ' ' + _this.id);
                    if (t > now) {
                        draw(now); //最后一次绘制
                        clearInterval(timer);
                    } else {
                        draw(t);
                        t += 0.01;
                    }
                }, 20);
            }
            loadCanvas(this.percentage / 100);
        },
    },
};
</script>
<style lang="less" scoped>
canvas {
    border: 0;
    font-weight: normal;
}
.canvasWrap {
    display: inline-block;
    border-radius: 1000px;
    overflow: hidden;
    font-size: 0;
}
.canvas {
    height: 100%;
    width: 100%;
}
</style>
