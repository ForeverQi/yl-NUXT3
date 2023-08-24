<template>
    <div class="progress">
        <svg :height="height" :width="width" viewBox="0 0 80 80" x-mlns="http://www.w3.org/200/svg">
            <defs>
                <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color: #62a5ff; stop-opacity: 1" />
                    <stop offset="100%" style="stop-color: #4494ff; stop-opacity: 0.3" />
                </linearGradient>
            </defs>
            <circle r="35" cx="40" cy="40" stroke="#4796ff" stroke-opacity="0.1" :stroke-width="strokeWidth" fill="none" />
            <circle
                r="35"
                cx="40"
                cy="40"
                stroke="url(#gradient)"
                :stroke-dashoffset="arcLength"
                :stroke-dasharray="circleLength"
                transform="rotate(-90)"
                transform-origin="center"
                :stroke-width="strokeWidth"
                fill="none"
                stroke-linecap="round"
            />
        </svg>
        <div class="num-wrap">
            <div class="rate">
                <span class="num">{{ circleType === 'rate' ? rate : sRate }}</span>
                <span class="num" v-if="circleType === 'rate'">%</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'circle-progress-view',
    props: {
        width: {
            type: String,
            default: '90',
        },
        height: {
            type: String,
            default: '90',
        },
        strokeWidth: {
            type: String,
            default: '8',
        },
        sRate: {
            type: Number,
            default: 0,
        }, // circleType为rate时是传入的百分比，为score时为得分
        circleType: {
            type: String,
            default: 'rate', // 枚举值：rate百分比 score得分
        },
        progressLength: {
            type: String,
            default: '100',
        }, // 当circleType为score时，总分数值
    },
    /**
     * @returns {object} 默认值
     */
    data() {
        return {};
    },
    computed: {
        /**
         * @returns {number} 圆环
         */
        circleLength() {
            return Math.ceil(35 * 2 * Math.PI);
        },
        /**
         * @returns {number} 圆环
         */
        arcLength() {
            let progressLength = this.circleLength - (this.circleLength / 100) * this.rate;
            return progressLength;
        },
        /**
         * @returns {number} 进度
         */
        rate() {
            if (this.circleType === 'rate') return Number(this.sRate);
            let rate = Math.round((Number(this.sRate) / Number(this.progressLength)) * 100);
            if (isNaN(rate)) {
                rate = 0;
            }
            return rate;
        },
    },
};
</script>

<style lang="less" scoped>
.progress {
    position: relative;

    .num-wrap {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        transform: translate(-50%, -50%);

        .rate {
            display: flex;
            align-items: baseline;

            .num {
                font-size: 16px;
                font-weight: 700;
                color: #057aff;
                line-height: 26px;
            }
        }
    }
}
</style>
