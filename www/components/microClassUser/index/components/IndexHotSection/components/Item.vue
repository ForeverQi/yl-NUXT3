<template>
    <div class="item" @click="toDetail(itemData)">
        <div class="top-img">
            <img :src="$urlUtils.getViewUrl(itemData.coursePicpath)" />
            <div class="date" v-if="isShowTime && timeStr !== ''">
                <span class="intro">距活动结束</span>
                <span class="time">{{ timeStr }}</span>
            </div>
        </div>
        <div class="name">
            <!-- <span class="mask">{{ item.projectShortname }}</span> -->
            <span class="saleTag" v-if="itemData.saleTagName">{{ itemData.saleTagName }}</span>
            {{ itemData.goodsName }}
        </div>
        <div class="list">共{{ itemData.coursewareCount }}节</div>
        <template v-if="itemData.coursePromotiontype === 'S'">
            <div class="price">
                特价
                <span class="money">¥{{ (itemData.coursePromotionprice / 100).toFixed(2) }}</span>
            </div>
        </template>
        <template v-else-if="itemData.coursePromotiontype === 'N' || !checkDate">
            <div class="status" v-if="itemData.coursePrice === 0">免费</div>
            <div class="price" v-else>
                <span class="money">¥{{ (itemData.coursePrice / 100).toFixed(2) }}</span>
            </div>
        </template>
        <template v-else-if="checkDate">
            <div class="status" v-if="itemData.coursePromotiontype === 'F'">限免</div>
            <div class="price" v-else>
                {{ typeMap[itemData.coursePromotiontype] ? typeMap[itemData.coursePromotiontype] : '' }}
                <span class="money">¥{{ (itemData.coursePromotionprice / 100).toFixed(2) }}</span>
            </div>
        </template>
    </div>
</template>
<script>
import dayjs from 'dayjs';
export default {
    props: {
        itemData: {
            type: Object,
            default() {
                return {
                    coursePromotiontype: '',
                };
            },
        },
    },
    data() {
        return {
            typeMap: {
                F: '限免',
                L: '限时特价',
                S: '特价',
            },
            isShow: true, // 默认显示日期
            timer: null,
            timeStr: '',
            currentDate: null,
            isShowTime: false,
            checkDate: false,
        };
    },
    watch: {
        itemData() {
            this.init();
        },
    },
    destroyed() {
        if (this.timer) {
            this.timer.stopTime();
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.computedTime();
            if (this.timer) {
                this.timer.stopTime();
            }
            let startDate = dayjs(this.itemData.coursePromotionstarttime);
            let endTime = dayjs(this.itemData.coursePromotionendtime);
            if (startDate.diff(dayjs(this.itemData.currentTime)) > 0) {
                // 活动未开始 创建开始倒计时
                this.timer = this.$countDown.runTime(startDate.unix(), this.itemData.currentTime, (obj) => {
                    if (typeof obj === 'undefined') {
                        // this.init();
                        this.$emit('init');
                    }
                    console.log('000000');
                });
            } else if (endTime.diff(dayjs(this.itemData.currentTime)) > 0) {
                // 活动一开始
                this.timer = this.$countDown.runTime(endTime.unix(), this.itemData.currentTime, (obj) => {
                    if (typeof obj === 'undefined') {
                        this.timeStr = '';
                        this.isShow = false;
                        this.$emit('init');
                        return '';
                    } else {
                        let str = '';
                        if (obj.day) {
                            str += obj.day + '天 ';
                        }
                        str += `${obj.hour}:${obj.minutes}:${obj.seconds}`;
                        this.timeStr = str;
                    }
                });
            }
        },
        computedTime() {
            if (!this.itemData.coursePromotionendtime) {
                this.isShowTime = false;
                this.checkDate = false;
            } else {
                let endDate = dayjs(this.itemData.coursePromotionendtime);
                let startDate = dayjs(this.itemData.coursePromotionstarttime);
                if (endDate.diff(this.itemData.currentTime) > 0 && startDate.diff(this.itemData.currentTime) < 0) {
                    this.checkDate = true;
                } else {
                    this.checkDate = false;
                }
                if (endDate.diff(this.itemData.currentTime) > 0) {
                    this.isShowTime = this.itemData.coursePromotiontype !== 'S' && this.itemData.coursePromotiontype !== 'N';
                } else {
                    this.isShowTime = false;
                }
            }
        },
        toDetail(item) {
            this.$PageUtil.openNewPage(`/agile-course/course/${item.goodsId}`);
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
.item {
    width: 280px;
    height: 300px;
    background: #ffffff;
    border: 1px solid #ededf2;
    border-radius: 8px;
    margin: 0 13px;
    margin-bottom: 32px;
    overflow: hidden;
    transition: all 0.2s linear;
    cursor: pointer;

    &:hover {
        transform: translate3d(0, -5px, 0);
        box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
    }

    .top-img {
        position: relative;
        height: 175px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .name {
        font-size: 14px;
        color: #3a3d4b;
        line-height: 22px;
        font-weight: bold;
        padding: 0 16px;
        padding-top: 12px;
        height: 56px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
        .mask {
            font-size: 12px;
            height: 12px;
            line-height: 12px;
            color: #7b8091;
            padding: 2px 10px;
            background: #eeeff6;
            border-radius: 2px;
            margin-right: 3px;
        }
        .saleTag {
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

    .list {
        padding-left: 16px;
        padding-top: 6px;
        color: #9698a2;
        line-height: 16px;
        font-size: 12px;
    }

    .status {
        color: #f8323c;
        line-height: 24px;
        font-weight: bold;
        font-size: 18px;
        text-align: right;
        padding-right: 16px;
    }

    .price {
        text-align: right;
        color: #f8323c;
        font-size: 14px;
        font-weight: 700;
        padding-right: 16px;
        letter-spacing: -0.13px;
        text-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);

        .money {
            font-size: 18px;
            font-weight: 700;
            letter-spacing: -0.13px;
            text-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
        }
    }
}
</style>
