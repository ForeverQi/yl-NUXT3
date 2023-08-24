<template>
    <div>
        <!-- 免费获取 成功弹窗 -->
        <free-get-class-popup
            :show.sync="showSuccessPopup"
            :share-img="qrcodeImage"
            :title="dialogContent1"
            :description="dialogContent2"
        ></free-get-class-popup>
        <!-- 支付弹窗 -->
        <pay-popup :show.sync="showPayPopup" @pay_result="payCallback" @success="paySuccess" :order-no="orderNo" ail-page-source="体验课详情页"></pay-popup>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import '@/api/mcu/api.MCU0001.mcp_trial_web_detail.js';
import '@/api/mcu/api.MCU0005.mcp_trial_web_free.js';
import '@/api/mcu/api.MCU5001.ordering_orderapproval_apply_post.js';
import freeGetClassPopup from '../free-get-class-popup';
import payPopup from '../pay-popup';
import eccm from '../js/mixin.js';
import track from '@/www/components/course/trial-course/js/track.js';

export default {
    components: {
        freeGetClassPopup,
        payPopup,
    },
    mixins: [eccm, track],
    data() {
        return {
            showSuccessPopup: false,
            orderNo: '',
            showPayPopup: false,
        };
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        qrcodeImage() {
            return this.experienceClass.qrcodeImage;
        },
        dialogContent1() {
            return this.experienceClass.dialogContent1;
        },
        dialogContent2() {
            return this.experienceClass.dialogContent2;
        },
        flowAvlstatus() {
            return this.experienceClass.flowAvlstatus;
        },
    },
    watch: {
        showSuccessPopup(newV) {
            if (this.experienceClass.drawStatus === 1) {
                // 领取成功发送事件
                this.$emit('freePopupShow', newV);
            }
        },
        showPayPopup(newV) {
            if (this.experienceClass.drawStatus === 1) {
                // 付款成功发送事件
                this.$emit('payPopupShow', newV);
            }
        },
    },
    methods: {
        ...mapMutations('trial-course/course', { updateCourse: 'updateCourse' }),
        mcpTrialWebFree(opts = {}) {
            return ylPlugin.login.isLogined().then((isLogin) => {
                if (isLogin) {
                    return this.getFree(opts);
                }
                return this.ylLoginByPwd(this.ecOriginCodeGet, opts.entranceResource).then(() => {
                    this.refreshCourseDrawStatus();
                });
            });
        },
        getFree(opts = {}) {
            // 领取之前发送线索
            return this.requestWrapper('experience/mcp_trial_web_free', {
                goodsId: this.experienceClass.goodsId,
            })
                .then(() => {
                    this.updateCourse({
                        drawStatus: 1,
                    });
                    this.showSuccessPopup = this.flowAvlstatus === 'Y';
                    console.warn('getFree-领取成功', this.showSuccessPopup);
                    if (this.flowAvlstatus === 'N') {
                        console.warn('没有设置引流');
                        this.$emit('freePopupShow', false);
                        this.$Message.success('领取成功');
                    }
                    // this.freeCluePush();
                    this.receiveTrack(opts);
                    return 'success';
                })
                .catch((err) => {
                    this.receiveTrack({
                        is_success: false,
                        fail_reason: String(err),
                        ...opts,
                    });
                    return Promise.reject(err);
                });
        },
        receiveTrack(track = {}) {
            // 宣传头图下方【免费领取/立即购买】按钮/
            // 吸顶横条【免费领取/立即购买】按钮/
            // 播放器下方【免费领取/立即购买】按钮/
            // 加锁目录(课程介绍-课程目录)触发领取/
            // 加锁目录(播放器)触发领取/
            // 播放器试听引导【去领取】按钮/
            this.trackWebYouluExperienceAppointment({
                course_name: this.experienceClass?.courseName ?? '-',
                project_id: this.experienceClass?.projectId ?? '-',
                subject_id: this.experienceClass?.subjectId ?? '-',
                receive_time: track.receive_time === '付费领取' ? '付费领取' : '免费领取',
                entrance_resource: track.entrance_resource || '-',
                is_paid_courses: track.receive_time === '付费领取',
            });
        },
        orderingOrderapprovalApplyPost(opts = {}) {
            return ylPlugin.login.isLogined().then((isLogin) => {
                if (isLogin) {
                    return this.approvalApply(opts);
                }
                this.receiveTrack(opts);
                return this.ylLoginByPwd(this.ecOriginCodeGet, opts.entranceResource).then(() => {
                    return this.refreshCourseDrawStatus();
                });
            });
        },
        approvalApply(opts = {}) {
            // 购买线索
            return this.requestWrapper('order/ordering_orderapproval_apply_post', {
                brandId: 'YOULU',
                approvalAction: 'ORDCRE',
                applyForm: JSON.stringify({
                    coType: 'WK',
                }),
                orderInfo: {
                    orderSource: 'YP',
                    orderPlatformappcode: 'YP.TRIALCLASS.WEB', // 枚举类型,优路微课小程序 YOULU.WX.WEIKE 优路微课官网 OP.WKWEB
                    // 优路官网体验课 YP.TRIALCLASS.WEB ,  优路教育APP体验课 YA.TRIALCLASS.APP
                    orderBusinesstype: 'I',
                    orderTimeoutseconds: 1800,
                },
                orderItems: [
                    {
                        productType: 'WK',
                        skuId: this.experienceClass.goodsId,
                        oiQuantity: 1,
                    },
                ],
            }).then((res) => {
                this.orderNo = res;
                this.showPayPopup = true;
                console.info('提交订单埋点');

                // this.$yiguan.track('youlu_submit_order', {
                //     course_name: this.experienceClass?.courseName ?? '-',
                //     class_name: this.experienceClass?.courseName ?? '-',
                //     project_id: this.experienceClass.project_id,
                //     subject_id: this.experienceClass.subject_id,
                //     course_type: '体验课',
                //     order_type: '体验课订单',
                //     order_price: this.price + '',
                //     payable_price: this.price + '',
                // });
                // this.trackWebYouluSubmitOrder({
                //     course_name: this.experienceClass?.courseName ?? '',
                //     project_position: this.experienceClass?.projectId ?? '',
                //     subject_name: this.experienceClass?.subjectId ?? '',
                //     course_type: '体验课',
                //     order_number: this.orderNo,
                //     order_type: '体验课订单',
                //     order_price: this.price,
                //     payable_price: this.price + '',
                // });

                this.receiveTrack({ ...opts, receive_time: '付费领取', is_success: false, is_paid_courses: true });
            });
        },
        payCallback(result) {
            console.log('支付结果', result);
        },
        paySuccess() {
            //支付成功回调
            console.log('支付成功回调');
            this.updateCourse({
                drawStatus: 1,
            });
            this.showSuccessPopup = this.flowAvlstatus === 'Y';
            this.buyCluePush();
        },
        refreshCourseDrawStatus() {
            return this.requestWrapper('experience/mcp_trial_web_detail', {
                goodsId: this.experienceClass.goodsId,
            })
                .then(({ drawStatus = 0 }) => {
                    this.updateCourse({
                        drawStatus,
                    });
                    if (this.experienceClass.drawStatus) {
                        console.warn('refreshCourseDrawStatus', '已经领取过了');
                        this.$emit('freePopupShow', false);
                    }
                })
                .catch((err) => {
                    console.warn(err);
                });
        },
    },
};
</script>
<style lang="less" scoped></style>
