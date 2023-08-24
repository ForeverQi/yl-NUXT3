<template>
    <div class="progress">
        <svg :height="height" :width="width" viewBox="0 0 80 80" x-mlns="http://www.w3.org/200/svg">
            <defs>
                <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color: #fe686f" />
                    <stop offset="100%" style="stop-color: #f93d47" />
                </linearGradient>
            </defs>
            <circle r="35" cx="40" cy="40" stroke="#fff1eb" :stroke-width="strokeWidth" fill="none" />
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
                <span class="num">{{ circleType === 'rate' ? rate : propsRate }}</span>
                <span class="num2" v-if="circleType === 'rate'">%</span>
            </div>
            <div class="name">{{ name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'circle-progress',
    props: {
        width: {
            type: String,
            default: '80',
        },
        height: {
            type: String,
            default: '80',
        },
        strokeWidth: {
            type: String,
            default: '6',
        },
        propsRate: {
            type: String,
            default: '0',
        }, // circleType为rate时是传入的百分比，为score时为得分
        name: {
            type: String,
            default: '得分',
        },
        circleType: {
            type: String,
            default: 'rate', // 枚举值：rate百分比 score得分
        },
        progressLength: {
            type: String,
            default: '100',
        }, // 当circleType为score时，总分数值
    },
    data() {
        return {};
    },
    computed: {
        circleLength() {
            return Math.ceil(35 * 2 * Math.PI);
        },
        arcLength() {
            let progressLength = this.circleLength - (this.circleLength / 100) * this.rate;
            return progressLength;
        },
        rate() {
            if (this.circleType === 'rate') return Math.round(Number(this.propsRate));
            let rate = Math.round((Number(this.propsRate) / Number(this.progressLength)) * 100);
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
    margin-right: 30px;

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
                font-size: 24px;
                font-weight: 700;
                color: #f8323c;
                line-height: 26px;
            }

            .num2 {
                font-size: 12px;
                font-weight: 600;
                color: #f8323c;
                line-height: 17px;
            }
        }

        .name {
            font-size: 12px;
            font-weight: 400;
            color: #f8323c;
            line-height: 16px;
        }
    }
}
</style>
