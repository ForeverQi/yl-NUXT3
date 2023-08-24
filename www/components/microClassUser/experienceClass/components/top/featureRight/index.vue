<template>
    <div class="btn-type-box">
        <!-- 免费-直播课 -->
        <div class="flex jc-end ai-center" v-if="courseUI === 'free_live_undraw'">
            <div class="price-text mr24">免费</div>
            <button class="feature-btn light-blue mr16" v-if="auditionAble" @click="handleFreeListen">试听</button>
            <button class="feature-btn dark-blue" @click="handleGetFree" :disabled="isDrawing">{{ isDrawingLabel }}</button>
        </div>
        <!-- 免费-直播课-“免费领取”后 -->
        <div class="flex jc-end ai-center" v-else-if="courseUI === 'free_live_draw'">
            <div class="mr24" v-show="isShowLatelyLiveTime">
                <div class="flex jc-end">
                    <img src="./asset/images/living2.png" alt="" class="living2-img mr8" />
                    <div class="living-time">{{ latelyLiveTime | datetimeFormate }}</div>
                </div>
                <p class="living-text">最近一场直播时间</p>
            </div>
            <button class="feature-btn dark-blue" @click="handleLearn">去学习</button>
        </div>
        <!-- 免费-录播课 -->
        <div class="flex jc-end ai-center" v-else-if="courseUI === 'free_relive_undraw'">
            <div class="price-text mr24">免费</div>
            <button class="feature-btn light-blue mr16" v-if="auditionAble" @click="handleFreeListen">试听</button>
            <button class="feature-btn dark-blue" @click="handleGetFree" :disabled="isDrawing" v-if="!drawStatus">{{ isDrawingLabel }}</button>
        </div>
        <!-- 免费-录播课-“免费领取”后 -->
        <div class="flex jc-end ai-center" v-else-if="courseUI === 'free_relive_draw'">
            <button class="feature-btn dark-blue" @click="handleLearn">去学习</button>
        </div>
        <!-- 限时免费 -->
        <!-- 在限定的时间内可以领取 -->
        <div class="flex jc-end ai-center" v-else-if="courseUI === 'F' && isFreeDatetime">
            <div class="mr16">
                <div class="price-text mb14">限免</div>
                <time-box ref="timeFun"></time-box>
            </div>
            <button class="feature-btn light-blue mr16" v-if="auditionAble" @click="handleFreeListen">试听</button>
            <button class="feature-btn dark-blue" @click="handleGetFree" :disabled="isDrawing">{{ isDrawingLabel }}</button>
        </div>
        <!--付费-限时特价 -->
        <div class="flex jc-end ai-center" v-else-if="courseUI === 'L' && isFreeDatetime">
            <div class="mr16">
                <div class="price-num mr24">
                    <span class="mr8">限时特价</span>
                    <span class="fs14">¥</span>
                    <span class="fs24">{{ coursePromotionprice | priceFormate }}</span>
                </div>
                <time-box ref="timeFun"></time-box>
            </div>
            <button class="feature-btn light-blue mr16" v-if="auditionAble" @click="handleFreeListen">免费试听</button>
            <button class="feature-btn dark-blue" @click="handleShowPayPopup" :disabled="isOrdering">{{ isOrderingLabel }}</button>
        </div>
        <!-- 付费-特价 -->
        <div class="flex jc-end ai-center" v-else-if="courseUI === 'S'">
            <div class="mr16">
                <div class="price-num mr24">
                    <span class="mr8">特价</span>
                    <span class="fs14">¥</span>
                    <span class="fs24">{{ coursePromotionprice | priceFormate }}</span>
                </div>
            </div>
            <button class="feature-btn light-blue mr16" v-if="auditionAble" @click="handleFreeListen">免费试听</button>
            <button class="feature-btn dark-blue" @click="handleShowPayPopup" :disabled="isOrdering">{{ isOrderingLabel }}</button>
        </div>
        <!-- 付费-直播课 -->
        <div class="flex jc-end ai-center" v-else-if="courseUI === 'pay_live_unbuy'">
            <div class="price-num mr24">
                <span class="fs14">¥</span>
                <span class="fs24">{{ coursePrice | priceFormate }}</span>
            </div>
            <button class="feature-btn light-blue mr16" v-if="auditionAble" @click="handleFreeListen">免费试听</button>
            <button class="feature-btn dark-blue" @click="handleShowPayPopup" :disabled="isOrdering">{{ isOrderingLabel }}</button>
        </div>
        <!-- 付费-直播课-“立即购买”后 -->
        <div class="flex jc-end ai-center" v-else-if="courseUI === 'pay_live_buy'">
            <div class="mr24" v-show="isShowLatelyLiveTime">
                <div class="flex jc-end">
                    <img src="./asset/images/living2.png" alt="" class="living2-img mr8" />
                    <div class="living-time">{{ latelyLiveTime | datetimeFormate }}</div>
                </div>
                <p class="living-text">最近一场直播时间</p>
            </div>
            <button class="feature-btn dark-blue" @click="handleLearn">去学习</button>
        </div>
        <div class="flex jc-end ai-center" v-else>
            <div class="price-num mr24">
                <span class="fs14">¥</span>
                <span class="fs24">{{ coursePrice | priceFormate }}</span>
            </div>
            <button class="feature-btn light-blue mr16" v-if="auditionAble" @click="handleFreeListen">免费试听</button>
            <button class="feature-btn dark-blue" @click="handleShowPayPopup" :disabled="isDrawing">{{ isOrderingLabel }}</button>
        </div>
        <pay-model ref="payModel"></pay-model>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import payModel from '../../payModel/index.vue';
import timeBox from '../timeBox/index.vue';
import eccm from '../../js/mixin.js';
/**
 * 促销类型(N:无促销;F:限时免费;L:限时特价;S特价)
 */
/**
 * 观看权限 2:免费;3:付费
 * courseOpenstatus
 */
/**
 * 视频类型 [枚举]M:录播;N:直播
 *  String courseType;
 */
export default {
    name: 'featureRightModel',
    components: {
        timeBox,
        payModel,
    },
    filters: {
        priceFormate(value) {
            return parseFloat((value / 100).toFixed(2));
        },
        datetimeFormate(value) {
            return value;
        },
    },
    mixins: [eccm],
    inject: ['experienceClass'],
    data() {
        return {
            showSuccessPopup: false,
            showPayPopup: false,
            isDrawing: false,
            isOrdering: false,
            orderNo: '',
        };
    },
    computed: {
        ...mapState('logout', ['islogin', 'userInfo']),
        goodsId() {
            return this.experienceClass.goodsId;
        },
        courseOpenstatus() {
            return this.experienceClass.courseOpenstatus;
        },
        coursePromotiontype() {
            return this.experienceClass.coursePromotiontype;
        },
        coursePromotionendtime() {
            return this.experienceClass.coursePromotionendtime;
        },
        courseType() {
            return this.experienceClass.courseType;
        },
        drawStatus() {
            return this.experienceClass.drawStatus;
        },
        coursePrice() {
            return this.experienceClass.coursePrice;
        },
        coursePromotionprice() {
            // (N:无促销;F:限时免费;L:限时特价;S特价)
            if (this.experienceClass.coursePromotionendtime) {
                return Date.parse(this.experienceClass.coursePromotionendtime) > Date.now()
                    ? this.experienceClass.coursePromotionprice
                    : this.experienceClass.coursePrice;
            } else {
                return this.experienceClass.coursePromotionprice;
            }
        },
        flowAvlstatus() {
            return this.experienceClass.flowAvlstatus;
        },
        qrcodeImage() {
            return this.experienceClass.qrcodeImage;
        },
        dialogContent1() {
            return this.experienceClass.dialogContent1;
        },
        dialogContent2() {
            return this.experienceClass.dialogContent2;
        },
        limitDrawAble() {
            return this.experienceClass.coursePromotiontype === 'F' && Date.parse(this.experienceClass.coursePromotionendtime).getTime() > Date.now();
        },
        latelyLiveTime() {
            return this.experienceClass.latelyLiveTime;
        },
        auditionAble() {
            return Boolean(
                this.experienceClass.catalogList
                    .map((item) => {
                        return item.coursewareList;
                    })
                    .flat(Number.POSITIVE_INFINITY)
                    .filter((item) => {
                        if (item.coursewareType === '2' && Date.now() < Date.parse(item.coursewareEndtime)) {
                            return false;
                        }
                        return item.coursewareAuditionstatus !== 'N' && item.coursewareShowstatus === 'Y';
                    }).length
            );
        },
        courseUI() {
            // 观看权限 2:免费;3:付费
            // 视频类型 [枚举]M:录播;N:直播
            //(N:无促销;F:限时免费;L:限时特价;S特价)
            if (this.courseOpenstatus === '2') {
                if (this.courseType === 'M') {
                    //录播
                    if (!this.drawStatus) {
                        console.error('free_relive_undraw');
                        return 'free_relive_undraw';
                    } else if (this.drawStatus === 1) {
                        console.error('free_relive_draw');
                        return 'free_relive_draw';
                    }
                } else if (this.courseType === 'N') {
                    // 直播
                    if (!this.drawStatus) {
                        console.error('free_live_undraw');
                        return 'free_live_undraw';
                    } else if (this.drawStatus === 1) {
                        console.error('free_live_draw');
                        return 'free_live_draw';
                    }
                }
            } else if (this.courseOpenstatus === '3') {
                // 付费
                if (this.drawStatus === 1 && this.courseType === 'N') {
                    console.error('pay_live_buy');
                    return 'pay_live_buy';
                } else if (this.coursePromotiontype === 'F') {
                    return this.drawStatus ? 'free_relive_draw' : 'F';
                } else if (this.coursePromotiontype === 'L') {
                    console.error('L');
                    return this.drawStatus ? 'pay_live_buy' : 'L';
                } else if (this.coursePromotiontype === 'S') {
                    console.error('S');
                    return this.drawStatus ? 'pay_live_buy' : 'S';
                } else if (this.coursePromotiontype === 'N') {
                    console.error('S');
                    return this.drawStatus ? 'pay_live_buy' : 'pay_live_unbuy';
                } else if (this.drawStatus === 0) {
                    console.error('pay_live_unbuy');
                    return 'pay_live_unbuy';
                }
            }
            console.log('this.courseUI----', Date.now());
            return '';
        },
        isDrawingLabel() {
            return this.isDrawing ? '领取中...' : '免费领取';
        },
        isOrderingLabel() {
            return this.isOrdering ? '下单中...' : '立即购买';
        },
        isFreeDatetime() {
            if (Date.parse(this.experienceClass.coursePromotionendtime) < this.getTimerStartTime()) {
                this.clearPriceTimerRefresh();
            }
            return (
                this.priceTimeRefVal &&
                Date.parse(this.experienceClass.coursePromotionstarttime) < this.getTimerStartTime() &&
                Date.parse(this.experienceClass.coursePromotionendtime) > this.getTimerStartTime()
            );
        },
        coursewareList() {
            return this.experienceClass.catalogList.map((item) => item.coursewareList).flat(Number.POSITIVE_INFINITY);
        },
        isShowLatelyLiveTime() {
            //如果没有即将直播和正在进行的直播
            return !!this.latelyLiveTime;
        },
    },
    watch: {
        isFreeDatetime(newVal) {
            if (!newVal) {
                return;
            } else if (!this.$refs.timeFun) {
                this.$nextTick(() => {
                    console.log('开始计时1');
                    this.$refs.timeFun?.lastTime(parseInt(this.getTimerStartTime() / 1e3), parseInt(new Date(this.coursePromotionendtime).getTime() / 1e3));
                });
                return;
            }
            console.log('开始计时2');
            this.$refs.timeFun?.lastTime(parseInt(this.getTimerStartTime() / 1e3), parseInt(new Date(this.coursePromotionendtime).getTime() / 1e3));
        },
    },
    mounted() {
        // 促销类型(N:无促销;F:限时免费;L:限时特价;S特价)
        if (this.isFreeDatetime && this.$refs.timeFun) {
            console.log('开始计时3');
            this.$refs.timeFun.lastTime(parseInt(this.getTimerStartTime() / 1e3), parseInt(new Date(this.coursePromotionendtime).getTime() / 1e3));
        }
        this.payAutoPlay = this.experienceClass.drawStatus === 1;
        this.priceTimerRefresh();
    },
    methods: {
        getTimerStartTime() {
            return this.experienceClass.currentTime + Date.now() - this.experienceClass.localCurrentTime;
        },
        handleGetFree() {
            this.isDrawing = true;
            this.ecValid()
                .then(() => {
                    return this.$refs.payModel.mcpTrialWebFree(true, false).catch((err) => {
                        console.error(err);
                    });
                })
                .catch((err) => {
                    console.warn(err);
                    err = err.getDescription();
                    if (err === '该课程有新变化，刷新页面获取最新信息') {
                        this.ecPriceTypeUpdateTip(err);
                    } else if (err && err.endsWith('去学习吧！')) {
                        this.ecHasDrawTip(err);
                    } else {
                        this.ecErrorTip(err);
                    }
                })
                .finally(() => {
                    this.isDrawing = false;
                });
        },
        handleShowPayPopup() {
            this.isOrdering = true;
            this.ecValid()
                .then(() => {
                    this.$refs.payModel.orderingOrderapprovalApplyPost(true, false).catch((err) => {
                        console.error(err);
                    });
                })
                .catch((err) => {
                    console.warn(err);
                    err = err.getDescription();
                    if (err === '该课程有新变化，刷新页面获取最新信息') {
                        this.ecPriceTypeUpdateTip(err);
                    } else if (err && err.endsWith('去学习吧！')) {
                        this.ecHasDrawTip(err);
                    } else {
                        this.ecErrorTip(err);
                    }
                })
                .finally(() => {
                    this.isOrdering = false;
                });
        },
        handleFreeListen() {
            if (this.experienceClass.catalogList.length <= 0) {
                return console.error(this.experienceClass.catalogList);
            }
            this.experienceClass.catalogList.forEach((catalog) => {
                catalog.isVideoExpand = false;
                catalog.coursewareList.forEach((item) => (item.isPlaying = false));
            });
            let item;
            for (const catalog of this.experienceClass.catalogList) {
                item = catalog.coursewareList.find((item) => {
                    if (item.coursewareType === '2' && Date.parse(item.coursewareEndtime) > Date.now()) {
                        return false;
                    }
                    return item.coursewareAuditionstatus !== 'N';
                });
                catalog.isVideoExpand = Boolean(item);
                if (item) {
                    break;
                }
            }
            if (!item) {
                return console.error('不存在试听课程');
            }
            console.log('this.islogin', this.islogin);

            this.ecValid()
                .then(() => {
                    this.$emit('play', ((item.isPlaying = true), item));
                })
                .catch((err) => {
                    console.error(err);
                    this.ecErrorTip(err);
                });
        },
        handleLearn() {
            if (this.experienceClass.catalogList.length <= 0) {
                return console.error(this.experienceClass.catalogList);
            }
            this.experienceClass.catalogList.forEach((catalog) => {
                catalog.isVideoExpand = false;
                catalog.coursewareList.forEach((item) => (item.isPlaying = false));
            });
            let item;
            for (const catalog of this.experienceClass.catalogList) {
                item = catalog.coursewareList.find((item) => {
                    return Boolean(item);
                });
                catalog.isVideoExpand = Boolean(item);
                if (item) {
                    break;
                }
            }
            if (!item) {
                return console.error('不存在学习课程');
            }

            this.ecValid()
                .then(() => {
                    this.payAutoPlay === false && setTimeout((itm) => (itm.autoPlay = false), 0, item);
                    this.$emit('play', ((item.isPlaying = true), (item.autoPlay = this.payAutoPlay), item));
                })
                .catch((err) => {
                    console.error(err);
                    this.ecErrorTip(err);
                });
        },
    },
};
</script>
<style lang="less" scoped>
.btn-type-box {
    .feature-btn {
        height: 46px;
        line-height: 46px;
        padding: 0 32px;
        font-size: 16px;
        border-radius: 32px;
        font-weight: bold;
        cursor: pointer;
    }
    .light-blue {
        background-image: linear-gradient(to right, #eef4ff, #dbe8ff);
        color: #025eff;
    }
    .light-blue:hover {
        background-image: linear-gradient(to right, #c3d6f8, #c3d6f8);
        color: #025eff;
    }
    .dark-blue {
        background-image: linear-gradient(to right, #3a85fe, #025eff);
        color: #fff;
    }
    .dark-blue:hover {
        background-image: #025eff;
    }
    .price-text {
        font-size: 24px;
        line-height: 24px;
        color: #f8323c;
        font-weight: bold;
    }
    .price-num {
        span {
            color: #f8323c;
            line-height: 24px;
            font-weight: bold;
        }
    }
    .fs14 {
        font-size: 14px;
    }
    .fs24 {
        font-size: 24px;
    }
    .mr24 {
        margin-right: 24px;
    }
    .mr16 {
        margin-right: 16px;
    }
    .mr8 {
        margin-right: 8px;
    }
    .mt6 {
        margin-top: 6px;
    }
    .mb14 {
        margin-bottom: 14px;
    }
    .living2-img {
        width: 22px;
        height: 21px;
    }
    .living-time {
        font-size: 20px;
        line-height: 24px;
        color: #333;
    }
    .living-text {
        font-size: 14px;
        line-height: 16px;
        color: #999;
        margin-top: 6px;
        text-align: right;
    }
}
</style>
