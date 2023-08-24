<template>
    <div
        class="progress el-progress--circle"
        role="progressbar"
        aria-valuenow="10"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ backgroundColor: wrapBgColor }"
    >
        <div class="progress__text">
            <slot>
                <div class="rate">{{ percentage }}%</div>
                <div class="name" v-if="false">正确率</div>
            </slot>
        </div>
        <div class="progress-circle" :style="{ height: `${width}px`, width: `${width}px` }">
            <svg viewBox="0 0 100 100">
                <path class="el-progress-circle__track" :d="trackPath" :stroke="bgColor" :stroke-width="relativeStrokeWidth" fill="none"></path>
                <path
                    class="el-progress-circle__path"
                    :d="trackPath1"
                    :stroke="stroke"
                    fill="none"
                    stroke-linecap="round"
                    :stroke-width="10"
                    :style="circlePathStyle"
                ></path>
            </svg>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CourseProgress',
    props: {
        percentage: {
            type: Number,
            default: 0,
        },
        width: {
            type: Number,
            default: 40,
        },
        strokeWidth: {
            type: Number,
            default: 4,
        },
        bgColor: {
            type: String,
            default: '#ffece8',
        },
        wrapBgColor: {
            type: String,
            default: '#fff',
        },
    },
    data() {
        return {};
    },
    computed: {
        relativeStrokeWidth() {
            return ((this.strokeWidth / this.width) * 100).toFixed(1);
        },
        radius() {
            return parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);
        },
        trackPath() {
            const radius = this.radius - 2;
            // console.log(radius, 'radius');
            return `
            M 50 50
            m 0 -${radius}
            a ${radius} ${radius} 0 1 1 0 ${radius * 2}
            a ${radius} ${radius} 0 1 1 0 -${radius * 2}
            `;
        },
        trackPath1() {
            const radius = this.radius - 2;
            return `
            M 50 50
            m 0 -${radius}
            a ${radius} ${radius} 0 1 1 0 ${radius * 2}
            a ${radius} ${radius} 0 1 1 0 -${radius * 2}
            `;
        },
        stroke() {
            return '#f97277';
        },
        perimeter() {
            return 2 * Math.PI * this.radius;
        },
        strokeDashoffset() {
            return `0px`;
        },
        circlePathStyle() {
            return {
                strokeDasharray: `${this.perimeter * 1 * (this.percentage / 100)}px, ${this.perimeter}px`,
                strokeDashoffset: this.strokeDashoffset,
                transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease',
            };
        },
    },
};
</script>
<style lang="less" scoped>
.progress {
    position: relative;
    line-height: 1;
    max-width: max-content;
    border-radius: 50%;

    &.progress--circle {
        display: inline-block;
    }

    .progress-circle {
        position: relative;
    }

    .progress__text {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        text-align: center;
        margin: 0;
        transform: translate(0, -50%);

        .rate {
            font-size: 12px;
            font-weight: bold;
            color: #f83c47;
        }

        .name {
            line-height: 1.8;
        }
    }
}
</style>
