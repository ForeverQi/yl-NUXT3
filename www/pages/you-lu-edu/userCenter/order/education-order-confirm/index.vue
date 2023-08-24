<template>
    <!-- 已付款正常订单详情 -->
    <div class="ucIndex">
        <div class="indexCont clearfix">
            <div class="contentWrap">
                <div class="title-wrapper">
                    <span class="order-no">订单编号：{{ orderDetail.orderNumber }}</span>
                    <span class="order-status">{{ orderDetail.orderTypeName }}</span>
                    <span class="order-date">订单日期：{{ orderDetail.creationTime }}</span>
                </div>
                <h3 class="section-title">订单信息</h3>
                <div class="detail-wrapper">
                    <div class="order-wrapper">
                        <img class="order-icon" src="./asset/images/default-course-pic.png" />
                        <div class="order-info">
                            <p class="order-title">{{ orderDetail.title }}</p>
                            <span class="city">所属城市：{{ orderDetail.schoolName }}</span>
                            <div class="price-wrapper">
                                <span class="price">售价：￥{{ orderDetail.amount | veMoneyCent }}</span>
                                <span class="price price-real">
                                    实付金额：￥
                                    <b class="red">{{ 0 > orderDetail.factualAmount ? '-' : '' }}{{ orderDetail.factualAmount | veMoneyCent }}</b>
                                </span>
                            </div>
                        </div>
                    </div>
                    <ul class="relate-course" v-if="orderDetail.classNameList && orderDetail.classNameList.length > 0">
                        <li class="course-item" v-for="item in orderDetail.classNameList" :key="item">
                            <img class="course-icon" src="./asset/images/exam-course.png" />
                            <span class="course-name">{{ item }}</span>
                        </li>
                    </ul>
                </div>

                <h3 class="section-title stu-title">
                    学员信息
                    <button class="edit-btn" @click="handleEditClick" type="button" v-if="isShowModify || orderDetail.isNameChecked === false">
                        <img class="edit-icon" src="./asset/images/edit.png" />
                        修改信息
                    </button>
                </h3>
                <div class="user-wrapper">
                    <span class="info-item">学员姓名：{{ orderDetail.custName }}</span>
                    <span class="info-item mobile">手机号码：{{ orderDetail.mobile }}</span>
                    <button v-if="isShowMobileDetailBtn" class="detail-btn" @click="handleMobileDetailClick" type="button">查看</button>
                    <span class="info-item idCard">身份证号：{{ orderDetail.idCardNo }}</span>
                    <button v-if="isShowCardDetailBtn" class="detail-btn" @click="handleIdCardDetailClick" type="button">查看</button>
                </div>
                <div class="notice-wrapper">
                    <input type="checkbox" id="huey" name="drone" @change="handleRead" v-model="isRead" />
                    <label for="huey">我已阅读并同意</label>
                    <em class="payment-notice" @click="handlePayNotice">《缴费须知》</em>
                    <span class="info-read-tip" v-if="isRead !== true">请阅读并同意《缴费须知》</span>
                </div>
                <div class="confirm-wrapper">
                    <button class="btn cancel" @click="handleCancelClick" type="button">取消</button>
                    <button class="btn confirm" @click="handleConfirmOrderClick" type="button" :disabled="isRead !== true">确认订单与个人信息</button>
                </div>
            </div>
        </div>
        <education-user-mobile :show.sync="isShowMobile" @success="handleMobileSuccess" />
        <education-user-card :show.sync="isShowCard" @success="handleIdCardSuccess" />
        <education-user-info
            :show.sync="isShowInfo"
            @success="handleInfoSuccess"
            :user-name="orderDetail.custName"
            :id-card-no="orderDetail.idCardNo"
            :scene="'ORDER_COMFRIM'"
            :is-three-verify="orderDetail.isThreeVerify"
        />
        <education-pay-notice :show.sync="isShowPayNotice" :content="notice" @success="handleNoticeSuccess" />
    </div>
</template>
<script>
import orderDetailsTitle from '@/www/components/uc/manager/order/orderDetailsTitle/index.vue';
import EducationUserMobile from '@/www/components/userCenter/order/education-user-mobile/index.vue';
import EducationUserCard from '@/www/components/userCenter/order/education-user-card/index.vue';
import EducationUserInfo from '@/www/components/userCenter/order/education-user-info/index.vue';
import EducationPayNotice from '@/www/components/userCenter/order/education-pay-notice/index.vue';

import '@/api/edu/api..query-eduordering-detail.js';
import '@/api/edu/api..query-eduordering-student-preview.js';
import '@/api/edu/api..query-edubasicdata-sysdict-list.js';
import '@/api/edu/api..confirmorder.js';
import '@/api/edu/api..edupaynotice';
import '@/api/edu/api..threeelementcheck.js';
import '@/api/edu/api..twoelementcheck.js';
import '@/api/edu/api..user-idcard-identify-name-valid.js';

export default {
    components: {
        EducationUserCard,
        EducationUserMobile,
        orderDetailsTitle,
        EducationUserInfo,
        EducationPayNotice,
    },
    data() {
        return {
            orderDetail: {
                orderTypeName: '',
                orderNumber: '',
                creationTime: '',
                majorName: '',
                eduModeName: '',
                eduLevelTypeName: '',
                orderAllAmount: 0,
                materialList: [],
                classNameList: [],
                title: '',
                receiptList: [],
                className: '',
                orderId: '',
                eduYears: '',
                factualAmount: 0,
                amount: 0,
                orderType: '',
                transferInAmount: '',
                transferDetail: {
                    amount: '',
                    title: '',
                    eduYears: '',
                    payModeName: '',
                    examCity: '',
                    materialList: [],
                    classNameList: [],
                },
                credConfirmTime: '',
                transferState: '',
                approvalStatus: '',
                mobile: '',
                custName: '',
                idCardNo: '',
                schoolName: '',
                confirmAllowStatus: 'N',
                isThreeVerify: false,
                isNameChecked: true,
                isMobileChecked: true,
            },
            userInfo: {
                userMobile: '',
                userIdcard: '',
            },
            isRead: undefined,
            isShowMobile: false,
            isShowCard: false,
            isShowInfo: false,
            isShowPayNotice: false,
            notice: '',
            isShowMobileDetailBtn: true,
            isShowCardDetailBtn: true,
            action: '0',
            isShowModify: false,
        };
    },
    computed: {
        waitPay() {
            return this.orderDetail.orderAllAmount - this.orderDetail.factualAmount;
        },
        disabled() {
            return this.orderDetail.transferState === 'REFUND' || this.orderDetail.transferState === 'TRANSFER' || this.orderDetail.transferState === 'GIVEN';
        },
        isNormal() {
            return this.orderDetail.orderType === 'ZC';
        },
        isTransfer() {
            // // <!-- 订单类型 ZC-正常订单 PZ-平转订单 SZ-升转订单 JZ-降转订单 TF-退费订单 ZF-作废订单 SZR-升转让订单 PZR-平转让订单 -->
            return (
                this.orderDetail.orderType === 'PZ' ||
                this.orderDetail.orderType === 'SZ' ||
                this.orderDetail.orderType === 'JZ' ||
                this.orderDetail.orderType === 'SZR' ||
                this.orderDetail.orderType === 'PZR'
            );
        },
        isArrears() {
            return this.orderDetail.factualAmount + this.orderDetail.transferInAmount < this.orderDetail.orderAllAmount;
        },
        transferLabel() {
            if (this.isArrears) {
                return '待支付金额';
            } else if (this.orderDetail.orderType === 'PZR') {
                return '实付金额';
            } else if (this.orderDetail.orderType === 'SZR') {
                return '已付金额';
            } else if (this.orderDetail.orderType === 'JZ') {
                return '退费金额';
            } else if (this.orderDetail.orderType === 'PZ') {
                return '实付金额';
            } else if (this.orderDetail.orderType === 'SZ') {
                return '已付金额';
            }
            return '';
        },
        transferCash() {
            if (this.isArrears) {
                return this.orderDetail.orderAllAmount - this.orderDetail.factualAmount - this.orderDetail.transferInAmount;
            } else if (this.orderDetail.orderType === 'PZR') {
                return this.orderDetail.factualAmount;
            } else if (this.orderDetail.orderType === 'SZR') {
                return this.orderDetail.factualAmount;
            } else if (this.orderDetail.orderType === 'JZ') {
                return this.orderDetail.receivableAmount;
            } else if (this.orderDetail.orderType === 'PZ') {
                return this.orderDetail.factualAmount;
            } else if (this.orderDetail.orderType === 'SZ') {
                return this.orderDetail.factualAmount;
            }
            return 0;
        },
        isAuditPass() {
            // public static ApprovalStatusEnum Prepare = new ApprovalStatusEnum("PRE", "待提交");
            // public static ApprovalStatusEnum Processing = new ApprovalStatusEnum("PRO", "审核中");
            // public static ApprovalStatusEnum Pass = new ApprovalStatusEnum("PAS", "审核通过");
            // public static ApprovalStatusEnum PartPass = new ApprovalStatusEnum("PTP", "部分款已审核");
            // public static ApprovalStatusEnum Refuse = new ApprovalStatusEnum("REF", "审核拒绝");
            // public static ApprovalStatusEnum Back = new ApprovalStatusEnum("BAC", "被驳回");
            // public static ApprovalStatusEnum Cancel = new ApprovalStatusEnum("CAN", "取消申请");
            if (this.disabled) {
                return false;
            }
            return this.orderDetail.approvalStatus === 'PAS' || this.orderDetail.receiptList.some((item) => item.approvalStatus === 'PAS');
        },
    },
    mounted() {
        const { orderId } = this.$route.params;
        this.orderDetail.orderId = orderId;
        this.getOrderPaidDetail();
        this.$User.getUser().then((user) => {
            console.warn(user);
            Object.assign(this.userInfo, user || {});
        });
    },
    methods: {
        getOrderPaidDetail() {
            this.$callApi('edu/query-eduordering-detail', {
                orderId: this.orderDetail.orderId,
            })
                .then((res) => res.getData())
                .then((data) => {
                    Object.assign(this.orderDetail, data);
                    this.orderDetail.orderAllAmount = +this.orderDetail.orderAllAmount;
                    this.orderDetail.factualAmount = +this.orderDetail.factualAmount;
                    this.orderDetail.transferInAmount = +this.orderDetail.transferInAmount;
                    this.orderDetail.amount = +this.orderDetail.amount;
                    return this.getSysBasic();
                })
                .then(() => {
                    return this.getPayNotice();
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        getSysBasic() {
            this.$callApi('edu/query-edubasicdata-sysdict-list', {
                dictType: 'EduYears',
                payMode: 'DSDT',
                eduMode: 'CRZZ',
                orderType: 'ZC',
            })
                .then((res) => res.getData())
                .then(({ data = [] }) => {
                    data.forEach((item) => {
                        if (this.orderDetail.eduYears === item.dictCode) {
                            this.orderDetail.eduYears = item.dictName;
                        }
                        if (this.orderDetail.transferDetail && this.orderDetail.transferDetail.eduYears === item.dictCode) {
                            this.orderDetail.transferDetail.eduYears = item.dictName;
                        }
                    });
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        getPayNotice() {
            this.$callApi('edu/edupaynotice', {
                dictType: 'EduStuPayNotice',
                orderType: this.orderDetail.orderType,
                eduMode: this.orderDetail.eduMode,
                payMode: this.orderDetail.payMode,
            })
                .then((res) => res.getData())
                .then(({ data = {} }) => {
                    this.notice = data.dictName;
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        handleEditClick() {
            this.isShowInfo = true;
        },
        handleMobileDetailClick() {
            this.isShowMobile = true;
        },
        handleIdCardDetailClick() {
            this.isShowCard = true;
        },
        handleCancelClick() {
            this.$router.back();
        },
        handleConfirmOrderClick() {
            this.loading = this.$baseUI.loading();
            this.validBaseInfo()
                .then(() => {
                    return this.confirmOrder();
                })
                .then(() => {
                    this.$Message.success('已确认');
                    this.handleCancelClick();
                })
                .catch((err) => {
                    if (typeof err === 'string') {
                        this.loading?.close?.();
                        this.loading = null;
                        return this.$baseUI.alert('您的信息有误，确认订单信息需姓名、身份证号码、手机号码所属人实名信息一致，请修改信息或联系课程老师确认！');
                    } else if (err && 'getCategory' in err) {
                        this.$niceloo.api.handleFailure(err);
                    }
                })
                .finally(() => {
                    this.loading?.close?.();
                    this.loading = null;
                });
        },
        validBaseInfo() {
            if (this.orderDetail.isThreeVerify === true) {
                return this.validThreeBusiness();
            }
            return this.validTwoBusiness();
        },
        validThreeBusiness() {
            return this.validThree().then((res) => {
                const { code } = res.getData();
                if (code === '1' && this.orderDetail.confirmAllowStatus !== 'Y') {
                    return this.validTwoBusiness().then(() => {
                        this.loading.close();
                        return this.$baseUI
                            .confirm({
                                title: '温馨提示',
                                content:
                                    '您的手机号不是本人实名办理的。由于院校要求学员报名手机号需是本人实名办理，故可能会影响您后续入学，确定继续确认信息吗？',
                                showCancel: true,
                                cancelText: '取消',
                                confirmText: '确定',
                            })
                            .then(() => {
                                this.loading = this.$baseUI.loading();
                            });
                    });
                }
            });
        },
        validThree() {
            return this.$callApi('edu/threeelementcheck', {
                idCardno: this.orderDetail.idCardNo,
                name: this.orderDetail.custName,
                mobile: this.orderDetail?.mobile ?? '',
                action: '0',
                terminal: 'WEB',
                scene: 'ORDER_COMFRIM',
            });
        },
        validTwoBusiness() {
            return this.validTwo().then((res) => {
                const { code } = res.getData();
                this.isShowModify = code === '1';
                if (code === '1') {
                    return Promise.reject('您的信息有误，确认订单信息需姓名、身份证号码所属人实名信息一致，请修改信息或联系课程老师确认！');
                }
            });
        },
        validTwo() {
            return this.$callApi('edu/twoelementcheck', {
                idCardno: this.orderDetail?.idCardNo ?? '',
                name: this.orderDetail?.custName ?? '',
                mobile: this.orderDetail?.mobile ?? '',
                action: '0',
                terminal: 'WEB',
                scene: 'ORDER_COMFRIM',
            });
        },
        confirmOrder() {
            return this.$callApi('edu/confirmorder', {
                orderId: this.orderDetail.orderId,
                type: 2,
            });
        },
        handleMobileSuccess(res) {
            this.orderDetail.mobile = res;
            this.isShowMobileDetailBtn = false;
        },
        handleIdCardSuccess(res) {
            this.orderDetail.idCardNo = res;
            this.isShowCardDetailBtn = false;
        },
        handleInfoSuccess(custName, idCardNo) {
            this.orderDetail.custName = custName;
            this.orderDetail.idCardNo = idCardNo;
            // this.isShowCardDetailBtn = false;
            this.isShowModify = false;
        },
        handlePayNotice() {
            this.isShowPayNotice = true;
            // this.isRead = true;
        },
        handleNoticeSuccess() {
            this.isRead = true;
            this.isShowPayNotice = false;
        },
        handleRead() {
            if (this.isRead) {
                this.isShowPayNotice = true;
                this.$nextTick(() => {
                    this.isRead = false;
                });
            }
        },
    },
};
</script>

<style scoped lang="less">
em {
    border: 0;
    font-weight: normal;
}
.msg-content {
    font-size: 14px;
    color: #333333;
    margin: 0 -14px;
}
.ucIndex {
    background: #f5f5f5;
    .indexCont {
        margin: 0 auto;
        position: relative;
    }
}
.contentWrap {
    background-color: white;
    padding-bottom: 150px;
    position: relative;
}
.title-wrapper {
    font-size: 16px;
    color: #3a3d4b;
    padding: 20px 32px 26px;
    border-bottom: 1px solid #f1f1f1;
    .order-status {
        color: #8d90aa;
        margin-left: 24px;
    }
    .order-date {
        float: right;
    }
}
.section-title {
    font-size: 16px;
    color: #273344;
    margin: 24px 20px 0;
    .section-title-icon {
        margin-right: 8px;
        width: 13px;
        height: 12px;
    }
}
.detail-wrapper {
    margin: 12px 20px 0;
    border: 1px solid #ecedf6;
    padding: 24px 24px 16px;
    .order-wrapper {
        font-size: 14px;
        color: #3a3d4b;
        display: flex;
        align-items: center;
        .order-info {
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            .order-title {
                font-weight: bold;
                font-size: 16px;
                margin-top: 6px;
                line-height: 24px;
            }
            .city {
                font-size: 14px;
                margin-top: 27px;
            }

            .price-wrapper {
                margin-top: 11px;
                font-size: 14px;
                .price-real {
                    margin-left: 23px;
                }

                .red {
                    color: #f8323c;
                    font-weight: bold;
                }
            }
        }
    }

    .order-edu {
        color: #9698a2;
        font-size: 12px;
        margin-top: 20px;
        .mode,
        .city {
            margin-left: 40px;
        }
    }
    .order-material {
        margin-top: 8px;
        color: #9698a2;
        font-size: 12px;
    }
    .relate-course {
        margin: 12px 0 0;
        border-radius: 4px;
        .course-item {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            background-color: #f5f6fa;
            .course-icon {
                width: 74px;
                height: 15px;
            }
            .course-name {
                color: #3a3d4b;
                font-size: 14px;
                line-height: 20px;
                margin-left: 11px;
            }
        }
        .course-item + .course-item {
            margin-top: 8px;
        }
    }
    .order-icon {
        width: 224px;
        height: 140px;
    }
}
.stu-title {
    .edit-btn {
        font-size: 14px;
        background-color: transparent;
        border: none;
        outline: none;
        margin-left: 12px;
        color: #f8323c;
        cursor: pointer;
        .edit-icon {
            width: 12px;
            height: 12px;
            margin-right: 6px;
        }
    }
}

.user-wrapper {
    display: flex;
    padding: 24px 28px;
    margin: 13px 24px 0;
    border: 1px solid #ecedf6;
    font-size: 14px;
    color: #3a3d4b;
    .mobile {
        margin-left: 80px;
    }
    .idCard {
        margin-left: 80px;
    }
    .detail-btn {
        background-color: transparent;
        outline: none;
        border: 1px #f8323c solid;
        cursor: pointer;
        color: #f8323c;
        font-size: 12px;
        border-radius: 5px;
        margin-left: 8px;
        padding-left: 5px;
        padding-right: 5px;
    }
}

.confirm-wrapper {
    display: flex;
    margin: 23px 24px 0;
    justify-content: center;
    .btn {
        background-color: transparent;
        outline: none;
        border: none;
        cursor: pointer;
        font-size: 14px;
        height: 40px;
        border-radius: 8px;
    }

    .cancel {
        background-color: #fff3f3;
        width: 100px;
        color: #f8323c;
    }

    .confirm {
        background: linear-gradient(90deg, #ff6870, #f8323c);
        color: white;
        margin-left: 20px;
        width: 170px;
        &[disabled='disabled'] {
            background: gray;
        }
    }
}
.notice-wrapper {
    margin: 20px 48px;
    font-size: 14px;
    color: #3a3d4b;
    input[type='checkbox'] {
        width: 16px;
        height: 16px;
        background-image: url('./asset/images/check-circle.png');
        vertical-align: middle;
        appearance: none;
        -webkit-appearance: none;
        background-size: contain;
        &:checked {
            background-image: url('./asset/images/check-circle-checked.png');
        }
    }
    .payment-notice {
        font-style: normal;
        color: #f8323c;
        cursor: pointer;
    }
    .info-read-tip {
        color: #f8323c;
        display: block;
        margin-left: 20px;
        font-size: 12px;
    }
}
</style>
