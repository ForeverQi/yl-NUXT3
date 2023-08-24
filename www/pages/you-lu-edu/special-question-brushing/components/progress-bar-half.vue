<!--
 * @Author       : zhouqi
 * @description  : 半圆环组件
 * @Date         : 2023-07-06 14:49:33
 * @LastEditors  : zhouqi
 * @LastEditTime : 2023-07-10 15:23:39
 * @FilePath     : \nuxt\www\pages\you-lu-edu\special-question-brushing\components\progress-bar-half.vue
-->
<template>
    <canvas ref="canvas" :width="`${options.width}`" :height="`${options.height}`"></canvas>
</template>

<script>
export default {
    name: 'ProgressBarHalf',
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    /**
     *
     */
    mounted() {
        this.drawHalfRing();
    },
    methods: {
        /**
         * canvas实现的半圆环
         *
         */
        drawHalfRing() {
            //底部圆
            const ctx = this.$refs.canvas.getContext('2d');

            const centerX = this.options.width / 2;
            const centerY = this.options.height / 2;
            const radius = this.options.radius;
            let startAngle = Math.PI;
            let endAngle = 2 * Math.PI;

            ctx.clearRect(0, 0, this.options.width, this.options.height);
            ctx.lineCap = 'round';
            // 设置阴影
            // 模糊度
            ctx.shadowBlur = this.options.shadowBlur;
            // 阴影颜色
            ctx.shadowColor = this.options.shadowColor;

            // 创建外环渐变色
            const outerGradient = ctx.createLinearGradient(0, this.options.width, this.options.height, 0);
            outerGradient.addColorStop(0, '#FFECE8');
            outerGradient.addColorStop(1, '#FFECE8');

            // 绘制外环
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.lineWidth = this.options.lineWidth;
            ctx.strokeStyle = outerGradient;
            ctx.stroke();

            // 创建内环渐变色
            const innerGradient = ctx.createLinearGradient(0, this.options.width, this.options.height, 0);
            innerGradient.addColorStop(0, 'rgba(254,104,111,0.3)');
            innerGradient.addColorStop(1, 'rgba(249,61,71,1)');

            // 计算内环的结束角度
            let innerEndAngle = startAngle + this.options.percent * Math.PI;

            // 绘制内环
            if (this.options.percent > 0) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, startAngle, innerEndAngle);
                ctx.lineWidth = this.options.lineWidth;
                ctx.strokeStyle = innerGradient;
                ctx.stroke();
            }
        },
    },
};
</script>

<style scoped></style>
