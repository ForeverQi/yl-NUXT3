<template>
    <canvas ref="canvas" :width="`${option.width}`" :height="`${option.height}`"></canvas>
</template>

<script>
export default {
    name: 'index',
    props: {
        /*defOption: {
        width: 150,//canvas宽度
        height: 150,//canvas高度
        strokeWidth: 8,//弧线宽度
        percent: 0.2,//占比
        circleColor: 'rgba(255, 236, 232, 0.5)',//圆的颜色
        textColor: '#F8323C',//中间文字颜色
        radius：45,//半径
        },*/
        option: {
            type: Object,
            default: () => {
                return null;
            },
        },
    },
    mounted() {
        this.draw2();
    },
    methods: {
        draw2() {
            //底部圆
            const ctx = this.$refs.canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(this.option.width / 2, this.option.height / 2, this.option.radius, -Math.PI / 2, -Math.PI / 2 + 1 * (Math.PI * 2), false);
            ctx.lineWidth = this.option.strokeWidth;
            ctx.lineCap = 'round';
            ctx.strokeStyle = this.option.circleColor;
            ctx.stroke();

            //添加文字
            ctx.font = 'bold ' + this.option.fontSize + ' MicrosoftYaHei';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = this.option.textColor;
            ctx.fillText(this.option.text, this.option.width / 2, this.option.height / 2);

            if (this.option.percent) {
                //环形图的进度条
                ctx.beginPath();
                ctx.arc(
                    this.option.width / 2,
                    this.option.height / 2,
                    this.option.radius,
                    -Math.PI / 2,
                    -Math.PI / 2 + this.option.percent * (Math.PI * 2),
                    false
                );
                ctx.lineWidth = this.option.strokeWidth;
                ctx.lineCap = 'round';

                //渐变
                var lingrad = ctx.createLinearGradient(this.option.width, 0, 0, this.option.height);
                lingrad.addColorStop(0.1, 'rgba(254,104,111,0.30)');
                lingrad.addColorStop(0.75, '#f93d47');
                lingrad.addColorStop(1, '#f93d47');
                ctx.strokeStyle = lingrad;

                //阴影
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 6;
                ctx.shadowBlur = 8;
                ctx.shadowColor = 'rgba(231,57,40,0.30)';
                ctx.stroke();
            }
        },
    },
};
</script>

<style scoped>
canvas {
    border: 0;
    font-weight: normal;
}
</style>
