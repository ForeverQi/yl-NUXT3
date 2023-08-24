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
        <pay-model ref="payModel" @freePopupShow="handleFreePopupShow" @payPopupShow="handlePayPopupShow"></pay-model>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import payModel from '../../pay-model/index.vue';
import timeBox from '../time-box';
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
    props: {
        location: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            showSuccessPopup: false,
            showPayPopup: false,
            isDrawing: false,
            isOrdering: false,
            orderNo: '',

            clickPosition: '',
        };
    },
    fetch() {
        // 促销类型(N:无促销;F:限时免费;L:限时特价;S特价)
        if (this.isFreeDatetime && this.$refs.timeFun) {
            this.$refs.timeFun.lastTime(parseInt(this.getTimerStartTime() / 1e3), parseInt(new Date(this.coursePromotionendtime).getTime() / 1e3));
        }
        this.payAutoPlay = this.experienceClass.drawStatus === 1;
        this.priceTimerRefresh();
        return Promise.resolve();
    },
    computed: {
        ...mapState('logout', ['islogin', 'userInfo']),
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
    methods: {
        ...mapMutations('trial-course/course', { updateCatalog: 'updateCatalog', updateCourseWare: 'updateCourseWare' }),
        getTimerStartTime() {
            return this.experienceClass.currentTime + Date.now() - this.experienceClass.localCurrentTime;
        },
        handleGetFree() {
            this.isDrawing = true;
            this.ecValid()
                .then((res) => {
                    return this.$refs.payModel
                        .mcpTrialWebFree({
                            entrance_resource: this.location,
                            entranceResource: '体验课-立即领取',
                        })
                        .then(() => {
                            this.trackData(false);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                })
                .catch((err) => {
                    console.warn(err);
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
        handleShowPayPopup(location = '') {
            this.isOrdering = true;
            this.ecValid()
                .then(() => {
                    this.$refs.payModel
                        .orderingOrderapprovalApplyPost({
                            entrance_resource: this.location,
                            entranceResource: '体验课-立即领取',
                        })
                        .then(() => {
                            this.trackData(true);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                })
                .catch((err) => {
                    console.warn(err);
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
                this.updateCatalog({
                    catalogId: catalog.catalogId,
                    isVideoExpand: false,
                });
                catalog.coursewareList.forEach((item) => {
                    this.updateCourseWare({
                        coursewareId: item.coursewareId,
                        isPlaying: false,
                    });
                });
            });
            let item;
            for (const catalog of this.experienceClass.catalogList) {
                item = catalog.coursewareList.find((item) => {
                    if (item.coursewareType === '2' && Date.parse(item.coursewareEndtime) > Date.now()) {
                        return false;
                    }
                    return item.coursewareAuditionstatus !== 'N';
                });
                this.updateCatalog({
                    catalogId: catalog.catalogId,
                    isVideoExpand: Boolean(item),
                });
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
                    this.updateCourseWare({
                        coursewareId: item.coursewareId,
                        isPlaying: true,
                    });
                    this.$emit('play', item);
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
                this.updateCatalog({
                    catalogId: catalog.catalogId,
                    isVideoExpand: false,
                });
                catalog.coursewareList.forEach((item) => {
                    this.updateCourseWare({
                        coursewareId: item.coursewareId,
                        isPlaying: false,
                    });
                });
            });
            let item;
            for (const catalog of this.experienceClass.catalogList) {
                item = catalog.coursewareList.find((item) => {
                    return Boolean(item);
                });
                this.updateCatalog({
                    catalogId: catalog.catalogId,
                    isVideoExpand: Boolean(item),
                });
                if (item) {
                    break;
                }
            }
            if (!item) {
                return console.error('不存在学习课程');
            }

            this.ecValid()
                .then(() => {
                    this.payAutoPlay === false &&
                        setTimeout(
                            (itm) => {
                                this.updateCourseWare({
                                    coursewareId: itm.coursewareId,
                                    autoPlay: false,
                                });
                            },
                            0,
                            item
                        );
                    this.updateCourseWare({
                        coursewareId: item.coursewareId,
                        autoPlay: this.payAutoPlay,
                        isPlaying: true,
                    });
                    this.$emit('play', item);
                })
                .catch((err) => {
                    console.error(err);
                    this.ecErrorTip(err);
                });
        },
        handleFreePopupShow(val) {
            console.info('videoFeatureRight-handleFreePopupShow', val);
            this.$emit('freePopupShow', val);
        },
        handlePayPopupShow(val) {
            console.info('videoFeatureRight-handlePayPopupShow', val);
            this.$emit('payPopupShow', this.drawStatus === 0 ? true : val);
        },
        // 体验课领取成功-埋点
        trackData(coursesStatus) {
            this.$yiguan.track('youlu_appointment_of_experience_classes_chenggong', {
                course_name: this.experienceClass.courseName, //资源名称
                project_id: this.experienceClass.projectId, //项目ID
                subject_id: this.experienceClass.subjectId, //科目ID
                receive_time: coursesStatus ? '付费领取' : '免费领取', //领取方式
                is_paid_courses: coursesStatus, //是否付费课程
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
        background-image: linear-gradient(to right, #ffece8, #ffece8);
        color: #f8323c;
    }
    .light-blue:hover {
        background-image: linear-gradient(to right, #ffece8, #ffece8);
        color: #f8323c;
    }
    .dark-blue {
        background-image: linear-gradient(to right, #ff6870, #f8323c);
        color: #fff;
    }
    .dark-blue:hover {
        background-image: #f8323c;
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
