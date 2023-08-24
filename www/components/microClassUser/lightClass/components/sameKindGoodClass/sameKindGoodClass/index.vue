<template>
    <div class="same-class-box">
        <div class="live-calendar-title">
            <span class="live-calendar-title-text">同类好课</span>
            <span class="paging" v-if="page.pageCount > 1">
                <span class="arrow-left" @click="prePage" :class="page.pageIndex > 1 ? 'arrow-left-check' : ''"></span>
                &nbsp;&nbsp;
                <span class="active">{{ page.pageIndex }}</span>
                /{{ page.pageCount }}&nbsp;&nbsp;
                <span class="arrow-right" :class="page.pageIndex < page.pageCount ? 'arrow-right-check' : ''" @click="nextPage"></span>
            </span>
        </div>

        <div class="class-list flex">
            <div class="class-item" v-for="(item, index) in currentList" :key="index" @click="toDetail(item)">
                <div class="top-img">
                    <img :src="$urlUtils.getViewUrl(item.goodsCover)" alt="" class="item-img" :onerror="errorimg" />
                    <div class="date" v-if="item.countDown">
                        <span class="intro">距活动结束</span>
                        <span class="time">
                            <template v-if="item.countDown.day > 0">{{ item.countDown.day }}天</template>
                            {{ item.countDown.hour }}:{{ item.countDown.minutes }}:{{ item.countDown.seconds }}
                        </span>
                    </div>
                </div>
                <div class="item-title">
                    {{ item.goodsName }}
                </div>
                <div class="item-num">共{{ item.coursewareCount }}节</div>
                <div class="item-price">
                    <!--<div class="money-type">¥</div>
                    <div class="money-num">{{ (item.coursePrice / 100).toFixed(2) }}</div>-->
                    <template v-if="item.courseOpenstatus === '2'">
                        <span class="money-num">免费</span>
                    </template>
                    <template v-if="item.courseOpenstatus === '3'">
                        <!--在促销时间内显示限免-->
                        <!--促销类型-N:无促销;F:限时免费;L:限时特价;S特价-->
                        <span class="money-num" v-if="item.coursePromotiontype === 'N'">
                            <span class="money-type">¥</span>
                            {{ (item.coursePrice / 100).toFixed(2) }}
                        </span>
                        <span class="money-num" v-else-if="item.coursePromotiontype === 'F' && checkDate(item)">{{ typeMap[item.coursePromotiontype] }}</span>
                        <span class="money-num" v-else-if="item.coursePromotiontype === 'L' && checkDate(item)">
                            <span class="money-type">{{ typeMap[item.coursePromotiontype] }}¥</span>
                            {{ (item.coursePromotionprice / 100).toFixed(2) }}
                        </span>
                        <span class="money-num" v-else-if="item.coursePromotiontype === 'S'">
                            <span class="money-type">{{ typeMap[item.coursePromotiontype] }}¥</span>
                            {{ (item.coursePromotionprice / 100).toFixed(2) }}
                        </span>
                        <span class="money-num" v-else>
                            <span class="money-type">¥</span>
                            {{ (item.coursePrice / 100).toFixed(2) }}
                        </span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { mcpTrialWebSimilar } from '../../../../experienceClass/apis/index.js';
export default {
    name: 'sameClassBox',
    components: {},
    data() {
        return {
            errorimg: 'this.src="' + require('./asset/images/errorimg.png') + '"',
            dataList: [],
            currentList: [],
            page: {
                pageIndex: 1,
                pageSize: 4,
                pageCount: 0,
            },
            typeMap: {
                F: '限免',
                L: '限时特价',
                S: '特价',
            },
            timerList: [],
            timer: null,
        };
    },
    mounted() {
        this.getDataList();
    },
    destroyed() {
        if (this.timerList.length > 0) {
            this.timerList.forEach((item) => {
                // clearTimeout(item.timer);
                item.stopTime();
            });
        }
    },
    methods: {
        checkDate(item) {
            let endDate = dayjs(item.coursePromotionendtime);
            let startDate = dayjs(item.coursePromotionstarttime);
            if (endDate.diff(item.currentTime) > 0 && startDate.diff(item.currentTime) < 0) {
                return true;
            } else {
                return false;
            }
        },
        prePage() {
            if (this.page.pageIndex > 1) {
                this.page.pageIndex = this.page.pageIndex - 1;
                this.updateList();
            }
        },
        nextPage() {
            if (this.page.pageIndex < this.page.pageCount) {
                this.page.pageIndex = this.page.pageIndex + 1;
                this.updateList();
            }
        },
        updateList() {
            this.currentList = this.dataList.filter(
                (item, index) => index > (this.page.pageIndex - 1) * this.page.pageSize - 1 && index < this.page.pageIndex * this.page.pageSize
            );
        },
        getDataList() {
            mcpTrialWebSimilar(this, {
                categoryId: '',
                clientType: 'W',
                // projectId: this.$route.query.projectId,
            })
                .then((res) => {
                    if (Array.isArray(res)) {
                        this.dataList = res.slice(0, 8);
                        this.dataList.forEach((item) => {
                            let endDate = dayjs(item.coursePromotionendtime);
                            let startDate = dayjs(item.coursePromotionstarttime);
                            if (
                                item.courseOpenstatus === '3' &&
                                (item.coursePromotiontype === 'F' || item.coursePromotiontype === 'L') &&
                                endDate.diff(item.currentTime) > 0 &&
                                startDate.diff(item.currentTime) < 0
                            ) {
                                let vm = this;
                                this.timer = vm.$countDown.runTime(new Date(endDate).getTime(), new Date(item.currentTime).getTime(), function (val) {
                                    if (val != '') {
                                        vm.$set(item, 'countDown', '');
                                        item.countDown = val;
                                        console.log(val);
                                        vm.$set(vm.dataList, item.countDown, item.countDown);
                                        if (typeof val === 'undefined') {
                                            this.getDataList();
                                        }
                                    }
                                });
                                this.timerList.push(this.timer);
                            }

                            if (
                                item.courseOpenstatus === '3' &&
                                (item.coursePromotiontype === 'F' || item.coursePromotiontype === 'L') &&
                                startDate.diff(dayjs(item.currentTime)) > 0
                            ) {
                                // 活动未开始 创建开始倒计时
                                this.timer = this.$countDown.runTime(new Date(startDate).getTime(), new Date(item.currentTime).getTime(), (obj) => {
                                    if (typeof obj === 'undefined') {
                                        this.getDataList();
                                    }
                                    console.log('000000');
                                });
                                this.timerList.push(this.timer);
                            }
                        });
                        this.page.pageCount = Math.max(1, Math.ceil(this.dataList.length / this.page.pageSize));
                        this.updateList();
                    }
                })
                .catch((err) => {
                    console.error(4444, err);
                });
        },
        toDetail(item) {
            window.open(`/agile-course/course/${item.goodsId}`, '_blank');
        },
    },
};
</script>
<style lang="less" scoped>
.same-class-box {
    width: 1200px;
    margin: 0 auto 110px;
    .same-class-top {
        margin: 12px 0;
        height: 62px;
        line-height: 62px;
        font-size: 20px;
        color: #3a3d4b;
        font-weight: bold;
    }
    .class-list {
        .class-item {
            width: 280px;
            margin-right: 26px;
            padding-bottom: 18px;
            border-radius: 8px;
            background-color: #fff;
            border: 1px solid #ededf2;
            cursor: pointer;
            box-sizing: border-box;
            overflow: hidden;
            transition: all 0.2s linear;

            &:hover {
                transform: translate3d(0, -5px, 0);
                box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
            }

            .top-img {
                position: relative;
                height: 175px;
            }
            .item-img {
                display: block;
                width: 280px;
                height: 175px;
                border-radius: 8px 8px 0 0;
            }
            .item-title {
                padding: 12px 16px 0;
                color: #3a3d4b;
                font-size: 14px;
                line-height: 22px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                height: 48px;
                margin-bottom: 6px;
                font-weight: bold;
                box-sizing: content-box;
            }
            .item-num {
                color: #9698a2;
                font-size: 12px;
                line-height: 16px;
                margin-top: 6px;
                padding-left: 16px;
            }
            .item-price {
                margin-top: 5px;
                height: 20px;
                display: flex;
                justify-content: flex-end;
                color: #f8323c;
                padding-right: 16px;
                .money-num {
                    font-size: 18px;
                    font-weight: bold;
                    .money-type {
                        font-size: 14px;
                        margin-top: 5px;
                        font-weight: bold;
                    }
                }
            }
            &:last-child {
                margin-right: 0;
            }
        }
    }
}

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

.live-calendar-title {
    margin: 12px 0;
    .live-calendar-title-text {
        font-size: 20px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 62px;
    }
    .paging {
        line-height: 20px;
        float: right;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #414452;
        margin-top: 20px;
        .arrow-left,
        .arrow-right {
            width: 18px;
            height: 18px;
            display: inline-block;
            background: url('./asset/images/liveroomDetail_13.png');
            background-size: 100%;
            align-items: center;
            cursor: pointer;
        }
        .arrow-right {
            background: url('./asset/images/liveroomDetail_16.png');
            background-size: 100%;
        }
        .arrow-left-check {
            background: url('./asset/images/liveroomDetail_14.png');
            background-size: 100%;
        }
        .arrow-right-check {
            background: url('./asset/images/liveroomDetail_15.png');
            background-size: 100%;
        }
        .active {
            font-size: 16px;
            color: #025eff;
        }
    }
}
</style>
