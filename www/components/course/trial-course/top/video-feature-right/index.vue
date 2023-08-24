<template>
    <div class="btn-type-box" v-if="show">
        <!-- 付费-直播课 -->
        <!-- 观看权限 2:免费;3:付费-->
        <!-- 免费 -->
        <div class="flex jc-end ai-center" v-if="courseOpenstatus === '2'">
            <div class="mr16">
                <div class="price-num mr24">
                    <span class="mr8">免费</span>
                </div>
            </div>
            <button class="feature-btn dark-blue" @click="handleGetFree()" :disabled="isDrawing">{{ isDrawingLabel }}</button>
        </div>
        <!-- N:无促销;F:限时免费;L:限时特价;S特价 -->
        <div class="flex jc-end ai-center" v-else-if="coursePromotiontype === 'N'">
            <div class="price-num mr24">
                <span class="fs14">¥</span>
                <span class="fs24">{{ coursePrice | priceFormate }}</span>
            </div>
            <button class="feature-btn dark-blue" :disabled="isOrdering" @click="handleBuy()">{{ isOrderingLabel }}</button>
        </div>
        <!--付费-限时免费 -->
        <div class="flex jc-end ai-center" v-else-if="coursePromotiontype === 'F' && isFreeDatetime">
            <div class="mr16">
                <div class="price-num mr24">
                    <span class="mr8">限免</span>
                </div>
                <time-box ref="timeFun" :bg-color="false"></time-box>
            </div>
            <button class="feature-btn dark-blue" :disabled="isOrdering" @click="handleGetFree()">{{ isDrawingLabel }}</button>
        </div>
        <!--付费-限时特价 -->
        <div class="flex jc-end ai-center" v-else-if="coursePromotiontype === 'L' && isFreeDatetime">
            <div class="mr16">
                <div class="price-num mr24">
                    <span class="mr8">限时特价</span>
                    <span class="fs14">¥</span>
                    <span class="fs24">{{ coursePromotionprice | priceFormate }}</span>
                </div>
                <time-box ref="timeFun" :bg-color="false"></time-box>
            </div>
            <button class="feature-btn dark-blue" :disabled="isOrdering" @click="handleBuy()">{{ isOrderingLabel }}</button>
        </div>
        <!-- 付费-特价 -->
        <div class="flex jc-end ai-center" v-else-if="coursePromotiontype === 'S'">
            <div class="mr16">
                <div class="price-num mr24">
                    <span class="mr8">特价</span>
                    <span class="fs14">¥</span>
                    <span class="fs24">{{ coursePromotionprice | priceFormate }}</span>
                </div>
            </div>
            <button class="feature-btn dark-blue" :disabled="isOrdering" @click="handleBuy()">{{ isOrderingLabel }}</button>
        </div>
        <div class="flex jc-end ai-center" v-else>
            <div class="price-num mr24">
                <span class="fs14">¥</span>
                <span class="fs24">{{ coursePrice | priceFormate }}</span>
            </div>
            <button class="feature-btn dark-blue" :disabled="isOrdering" @click="handleBuy()">{{ isOrderingLabel }}</button>
        </div>
        <pay-model ref="payModel" @freePopupShow="handleFreePopupShow" @payPopupShow="handlePayPopupShow"></pay-model>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import timeBox from '../time-box';
import payModel from '../../pay-model';
import eccm from '../../js/mixin.js';

export default {
    name: 'videoFeatureRightModel',
    components: {
        timeBox,
        payModel,
    },
    filters: {
        priceFormate(value) {
            return parseFloat((value / 100).toFixed(2));
        },
    },
    mixins: [eccm],
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showSuccessPopup: false,
            showPayPopup: false,
            isOrdering: false,
            isDrawing: false,
            orderNo: '',
        };
    },
    fetch() {
        // 促销类型(N:无促销;F:限时免费;L:限时特价;S特价)
        this.$nextTick(() => {
            this.isFreeDatetime &&
                this.$refs.timeFun?.lastTime(parseInt(this.getTimerStartTime() / 1e3), parseInt(new Date(this.coursePromotionendtime).getTime() / 1e3));
        });
        this.priceTimerRefresh();
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
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
    },
    watch: {
        isFreeDatetime(newVal) {
            if (!newVal) {
                return;
            } else if (!this.$refs.timeFun) {
                this.$nextTick(() => {
                    this.$refs.timeFun?.lastTime(parseInt(this.getTimerStartTime() / 1e3), parseInt(new Date(this.coursePromotionendtime).getTime() / 1e3));
                });
                return;
            }
            this.$refs.timeFun.lastTime(parseInt(this.getTimerStartTime() / 1e3), parseInt(new Date(this.coursePromotionendtime).getTime() / 1e3));
        },
    },
    methods: {
        getTimerStartTime() {
            return this.experienceClass.currentTime + Date.now() - this.experienceClass.localCurrentTime;
        },
        handleGetFree(location = '播放器下方【免费领取/立即购买】按钮', entranceResource = '体验课-立即领取') {
            this.isDrawing = true;
            this.ecValid()
                .then(() => {
                    return this.$refs.payModel
                        .mcpTrialWebFree({
                            entrance_resource: location,
                            entranceResource,
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                })
                .catch((err) => {
                    console.error(err);
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
        handleBuy(location = '播放器下方【免费领取/立即购买】按钮', entranceResource = '体验课-立即领取') {
            this.isOrdering = true;
            this.ecValid()
                .then(() => {
                    return this.$refs.payModel
                        .orderingOrderapprovalApplyPost({
                            entrance_resource: location,
                            entranceResource,
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                })
                .catch((err) => {
                    console.error(err);
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
        handleFreePopupShow(val) {
            console.info('videoFeatureRight-handleFreePopupShow', val);
            this.$emit('update:show', val);
        },
        handlePayPopupShow(val) {
            console.info('videoFeatureRight-handlePayPopupShow', val);
            this.$emit('update:show', this.drawStatus === 0 ? true : val);
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
        cursor: pointer;
    }

    .dark-blue {
        background-image: linear-gradient(to right, #ff6870, #f8323c);
        color: #fff;
    }
    .dark-blue:hover {
        background: #f8323c;
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
    /deep/ .time-box {
        color: #fff !important;
    }
}
</style>
