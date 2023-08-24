<!--
 * @Author: Li
 * @Date: 2022-03-08 09:22:28
 * @LastEditors: Li
 * @LastEditTime: 2022-04-01 16:13:25
 * @Description:
-->
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
import freeGetClassPopup from '../../../components/freeGetClassPopup/freeGetClassPopup/index.vue';
import payPopup from '../../../components/payPopup/payPopup/index.vue';
import { mcpTrialWebFree, orderingOrderapprovalApplyPost, mcpTrialWebDetail } from '../../apis/index.js';
import eccm from '../js/mixin.js';

export default {
    components: {
        freeGetClassPopup,
        payPopup,
    },
    mixins: [eccm],
    inject: ['experienceClass'],
    data() {
        return {
            showSuccessPopup: false,
            orderNo: '',
            showPayPopup: false,
        };
    },
    computed: {
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
        mcpTrialWebFree(validLogin = true, isFirstRefresh = true) {
            if (validLogin === false) {
                return this.getFree();
            }
            return this.$mcuLogin.checkLogin().then(({ isFirst }) => {
                if (isFirst) {
                    if (isFirstRefresh) {
                        this.$PageUtil.reflush();
                    } else {
                        return this.refreshCourseDrawStatus();
                    }
                } else if (isFirst === false) {
                    return this.getFree();
                }
            });
        },
        getFree() {
            // 领取之前发送线索
            this.freeCluePush();
            return mcpTrialWebFree(this, {
                goodsId: this.experienceClass.goodsId,
            })
                .then(() => {
                    this.experienceClass.drawStatus = 0b1;
                    this.showSuccessPopup = this.flowAvlstatus === 'Y';
                    console.warn('getFree-领取成功', this.showSuccessPopup);
                    if (this.flowAvlstatus === 'N') {
                        console.warn('没有设置引流');
                        this.$emit('freePopupShow', false);
                    }
                    this.receiveTrack();
                    return 'success';
                })
                .catch((err) => {
                    this.receiveTrack({
                        is_success: false,
                        fail_reason: String(err),
                    });
                    return Promise.reject(err);
                });
        },
        receiveTrack(track = {}) {
            console.debug('领取埋点');
            this.$yiguan.mcuTrack('wk_receive_class', {
                course_name: this.experienceClass?.courseName ?? '未获取课程信息',
                mycourse_subject_name: this.experienceClass?.subjectName ?? '未获取科目信息',
                receive_type: '免费领取',
                fail_reason: '',
                ail_page_source: location.href,
                is_success: true,
                current_pirce: 0,
                ...track,
            });
        },
        orderingOrderapprovalApplyPost(validLogin = true, isFirstRefresh = true) {
            if (validLogin === false) {
                return this.approvalApply();
            }
            return this.$mcuLogin.checkLogin().then(({ isFirst }) => {
                if (isFirst) {
                    if (isFirstRefresh) {
                        this.$PageUtil.reflush();
                    } else {
                        return this.refreshCourseDrawStatus();
                    }
                } else if (isFirst === false) {
                    this.approvalApply();
                }
            });
        },
        approvalApply() {
            // 购买线索
            this.buyCluePush();
            return orderingOrderapprovalApplyPost(this, {
                brandId: 'YOULU',
                approvalAction: 'ORDCRE',
                applyForm: JSON.stringify({
                    coType: 'WK',
                }),
                orderInfo: {
                    orderSource: 'YP',
                    orderPlatformappcode: 'OP.WKWEB',
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
            }).then((orderNo) => {
                this.orderNo = orderNo;
                this.showPayPopup = true;
                console.info('提交订单埋点');
                this.$yiguan.mcuTrack('wk_submit_order', {
                    course_name: this.experienceClass?.courseName ?? '未获取课程信息',
                    mycourse_subject_name: this.experienceClass?.subjectName ?? '未获取科目信息',
                    order_number: this.orderNo,
                });
            });
        },
        payCallback(result) {
            console.log('支付结果', result);
        },
        paySuccess() {
            //支付成功回调
            console.log('支付成功回调');
            this.experienceClass.drawStatus = 0b1;
            this.showSuccessPopup = this.flowAvlstatus === 'Y';
            // this.$Message.success('购买成功');
        },
        refreshCourseDrawStatus() {
            return mcpTrialWebDetail(this, {
                goodsId: this.experienceClass.goodsId,
            })
                .then((res) => {
                    this.experienceClass.drawStatus = res.drawStatus;
                    if (this.experienceClass.drawStatus) {
                        console.warn('refreshCourseDrawStatus', '已经领取过了');
                        this.$emit('freePopupShow', false);
                    }
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    console.warn(err);
                });
        },
    },
};
</script>
<style lang="less" scoped></style>
