<template>
    <div class="line-wrap" :style="{ height: rowHeight * pointList.length + 'px' }">
        <ul class="point-box" :style="{ height: rowHeight * pointList.length + 'px' }">
            <li class="point-content" v-for="(item, index) in pointList" :key="index" :style="{ height: rowHeight + 'px' }">
                <div class="point" :style="pointStyle" />
            </li>
        </ul>
        <div class="line-bk" :style="lineStyle" />
    </div>
</template>

<script>
export default {
    name: 'point-line',
    props: {
        backgroundColor: {
            type: String,
            default: '#ffffff',
        }, // 圆点背景色
        circleBorderStyle: {
            type: String,
            default: '1px solid #d6d8e2',
        }, // 圆点边框样式
        circleDiameter: {
            type: [Number, String],
            default: 10,
        }, // 圆点直径，单位px
        lineColor: {
            type: String,
            default: '#d6d8e2',
        }, // 线底色
        lineWidth: {
            type: [Number, String],
            default: 1,
        }, // 线宽，单位px
        rowHeight: {
            type: [Number, String],
            default: 44,
        }, // 行高，单位px
        size: {
            type: Number,
            default: 0,
        }, // 点数量
    },
    computed: {
        // 点样式
        pointStyle() {
            return `background: ${this.backgroundColor};border: ${this.circleBorderStyle};height: ${this.circleDiameter}px;width: ${this.circleDiameter}px;`;
        },
        // 线样式
        lineStyle() {
            return `background: ${this.lineColor}; width: ${this.lineWidth}px; height: ${this.rowHeight * (this.size - 1)}px;`;
        },
        pointList() {
            return new Array(this.size);
        },
    },
};
</script>

<style lang="less" scoped>
.line-wrap {
    position: relative;
    width: 100%;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    .point-box {
        position: absolute;
        z-index: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;

        .point-content {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .point {
            box-sizing: border-box;
            border-radius: 50%;
        }
    }

    .line-bk {
        position: absolute;
    }
}
</style>
