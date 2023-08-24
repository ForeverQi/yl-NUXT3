<template>
    <div class="course-item" @click="goToExperienceList(itemData)">
        <div class="top-img">
            <image-view class="img-path" :src="$urlUtils.getViewUrl(itemData.coursePicPath)" />
            <div class="date" v-if="isTimeLimit == 'Y'">
                <span class="intro">距活动结束</span>
                <span class="time">{{ timeStr }}</span>
            </div>
        </div>
        <div class="course-name">
            <span class="sale-tag" v-if="itemData.saleTagName">{{ itemData.saleTagName }}</span>
            {{ itemData.goodsName }}
        </div>
        <div class="course-traits">{{ courseBright }}</div>
        <!-- 特价 -->
        <template v-if="itemData.coursePromotionType === 'S'">
            <div class="price">
                <span class="money">{{ itemData.coursePromotionPrice | veMoneyCent }}</span>
                <div class="course-tag">特价</div>
            </div>
        </template>
        <!-- 无促销 -->
        <template v-else-if="itemData.coursePromotionType === 'N' || isTimeLimit === 'N'">
            <div class="price">
                <span class="money">{{ itemData.coursePrice | veMoneyCent }}</span>
            </div>
        </template>
        <template v-else-if="isTimeLimit === 'Y'">
            <div class="price">
                <span v-if="itemData.coursePromotionType === 'F'" class="money">0</span>
                <span v-else class="money">{{ itemData.coursePromotionPrice | veMoneyCent }}</span>
                <div class="course-tag">
                    {{ typeMap[itemData.coursePromotionType] ? typeMap[itemData.coursePromotionType] : '' }}
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    props: {
        itemData: {
            type: Object,
            default() {
                return {
                    coursePromotionType: '',
                };
            },
        },
    },
    data() {
        return {
            typeMap: {
                F: '限时免费',
                L: '限时特价',
                S: '特价',
            },
            day: 0,
            hr: 0,
            min: 0,
            sec: 0,
            now: 0,
            end: 0,
            start: 0,
            time_fun: null,
            isTimeLimit: '',
            timeStr: '',
        };
    },
    computed: {
        courseBright() {
            if (this.itemData && this.itemData.courseBright) {
                const courseBright3 = this.itemData.courseBright.find((item) => item.type === '3');
                return courseBright3 ? courseBright3.content : '';
            }
            return '';
        },
    },
    watch: {
        itemData(val) {
            this.init();
        },
    },
    destroyed() {
        if (this.timer) {
            this.timer.stopTime();
        }
    },
    mounted() {
        this.initDown();
    },
    methods: {
        initDown() {
            if (this.itemData.coursePromotionType === 'L' || this.itemData.coursePromotionType === 'F') {
                //定义结束时间戳
                let now = Number(this.itemData.currentTime);
                //定义当前时间戳
                let end = Date.parse(new Date(this.itemData.coursePromotionEndTime));
                let start = Date.parse(new Date(this.itemData.coursePromotionStartTime));
                this.beginCountDown(now, end, start);
            }
        },
        beginCountDown(now, end, start) {
            //定义结束时间戳
            this.now = now;
            this.start = start;
            //定义当前时间戳
            this.end = end;
            if (this.time_fun) {
                clearTimeout(this.time_fun);
            }
            this.countdown();
        },
        // 倒计时
        countdown() {
            if (this.now < this.start) {
                this.day = '';
                this.hr = '';
                this.min = '';
                this.sec = '';
            }
            if (this.now >= this.end) {
                this.isTimeLimit = 'N';
                return;
            }
            if (this.now < this.start) {
                this.isTimeLimit = 'N';
            }
            if (this.now <= this.end && this.now >= this.start) {
                this.isTimeLimit = 'Y';
            }
            //用结束时间戳减去当前时间获得倒计时时间戳
            this.now = this.now + 1000;
            const msec = this.end - this.now;
            let day = parseInt(msec / 1000 / 60 / 60 / 24); //天数
            let hr = parseInt((msec / 1000 / 60 / 60) % 24); //小时
            let min = parseInt((msec / 1000 / 60) % 60); //分钟
            let sec = parseInt((msec / 1000) % 60); //秒数
            //给数据赋值
            this.day = day;
            this.hr = hr > 9 ? hr : '0' + hr;
            this.min = min > 9 ? min : '0' + min;
            this.sec = sec > 9 ? sec : '0' + sec;
            let str = '';
            if (this.day) {
                str += this.day + '天 ';
            }
            str += `${this.hr}:${this.min}:${this.sec}`;
            this.timeStr = str;
            this.time_fun = setTimeout(() => {
                this.countdown();
            }, 1000);
        },
        //跳转到体验课详情页面
        goToExperienceList() {
            this.$PageUtil.openNewPage(`/trial-course/detail/${this.itemData.goodsId}`);
        },
    },
};
</script>
<style lang="less" scoped>
.date {
    position: absolute;
    right: 0;
    bottom: 0;
    line-height: 28px;
    background: rgba(0, 0, 0, 0.6);
    font-size: 12px;
    color: #ffffff;
    text-align: center;
    padding: 0 10px;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 21px 0px 0px 21px;

    .intro {
        display: inline-block;
        padding-right: 6px;
    }
    .time {
        display: inline-block;
    }
}
.course-item {
    width: 280px;
    height: 310px;
    background: #ffffff;
    border: 1px solid #ededf2;
    border-radius: 8px;
    margin: 0 13px;
    overflow: hidden;
    transition: all 0.2s linear;
    cursor: pointer;

    &:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
    }
    &:last-child {
        margin-right: 0;
    }

    .top-img {
        position: relative;
        height: 175px;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            display: block;
            transition: 0.5s ease-in-out;
        }
        .img-path:hover {
            will-change: transform;
            transform: scale(1.1) translateZ(0);
        }
    }

    .course-name {
        box-sizing: border-box;
        font-size: 14px;
        line-height: 22px;
        padding: 0 16px;
        margin-bottom: 8px;
        padding-top: 12px;
        height: 56px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
        font-weight: 700;
        color: #3a3d4b;
        .sale-tag {
            display: inline-block;
            padding: 2px 10px;
            height: 12px;
            font-size: 12px;
            color: #fff;
            line-height: 1;
            margin-right: 3px;
            vertical-align: baseline;
            background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
            border-radius: 0px 6px 0px 6px;
        }
    }

    .course-traits {
        font-size: 12px;
        text-align: justify;
        color: #caa586;
        padding-left: 16px;
        margin-bottom: 16px;
        height: 13px;
        line-height: 13px;
    }
    .course-tag {
        width: 60px;
        height: 20px;
        background: url('../asset/images/tag.png');
        font-size: 12px;
        color: #a96b00;
        text-align: center;
        margin-left: 6px;
        line-height: 20px;
    }
    .price {
        text-align: left;
        padding-left: 16px;
        color: #f8323c;
        font-size: 14px;
        font-weight: 700;
        padding-right: 16px;
        letter-spacing: -0.13px;
        text-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
        display: flex;
        .money {
            font-size: 18px;
            font-weight: 700;
            letter-spacing: -0.13px;
            text-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
            padding: 0;
            margin: 0;
            &::before {
                content: '¥';
                font-size: 12px;
            }
        }
    }
}
</style>
