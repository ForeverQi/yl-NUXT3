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
                <h3 v-show="isNormal" class="section-title">订单信息</h3>
                <div v-show="isNormal" class="detail-wrapper">
                    <div class="order-price-wrapper">
                        <div class="order-price">
                            <span class="order-label">售&emsp;&emsp;价：</span>
                            <span class="order-label">已付金额：</span>
                            <span class="order-label" v-if="waitPay > 0">待支付金额：</span>
                        </div>
                        <div class="order-price">
                            <span class="price">￥{{ orderDetail.amount | veMoneyCent }}</span>
                            <span class="price">￥{{ orderDetail.factualAmount | veMoneyCent }}</span>
                            <span class="price price-wait" v-if="waitPay > 0">￥{{ waitPay | veMoneyCent }}</span>
                        </div>
                    </div>
                    <p class="order-title">{{ orderDetail.title }}</p>
                    <p class="order-edu">
                        <span>学制时间：{{ orderDetail.eduYears }}</span>
                        <span class="mode">缴费模式：{{ orderDetail.payModeName }}</span>
                        <span class="city">考点城市：{{ orderDetail.examCity }}</span>
                    </p>
                    <p class="order-material">所需材料：{{ orderDetail.materialList.join('、') }}</p>
                    <ul class="relate-course" v-if="orderDetail.classNameList && orderDetail.classNameList.length > 0">
                        <li class="course-item" v-for="item in orderDetail.classNameList" :key="item">
                            <img class="course-icon" src="./asset/images/exam-course.png" />
                            <span class="course-name">{{ item }}</span>
                        </li>
                    </ul>
                    <img
                        v-if="orderDetail.transferState === 'TRANSFER'"
                        class="order-sts"
                        src="./asset/images/order-status-transfer.png"
                        :style="{ bottom: orderDetail.classNameList.length > 0 ? '15px' : '3px' }"
                    />
                    <img
                        v-else-if="orderDetail.transferState === 'REFUND'"
                        class="order-sts"
                        src="./asset/images/order-status-refund.png"
                        :style="{ bottom: orderDetail.classNameList.length > 0 ? '15px' : '3px' }"
                    />
                    <img
                        v-else-if="orderDetail.transferState === 'GIVEN'"
                        class="order-sts"
                        src="./asset/images/order-status-given.png"
                        :style="{ bottom: orderDetail.classNameList.length > 0 ? '15px' : '3px' }"
                    />
                </div>
                <!-- v-show="isTransfer" 转出班级 -->
                <h3 v-if="isTransfer" class="section-title">
                    <img src="./asset/images/out.png" class="section-title-icon" />
                    转出班级
                </h3>
                <div v-if="isTransfer" class="detail-wrapper">
                    <div class="order-price-wrapper">
                        <div class="order-price">
                            <span class="order-label">售&emsp;&emsp;价：</span>
                        </div>
                        <div class="order-price">
                            <span class="price">￥{{ orderDetail.transferDetail.amount | veMoneyCent }}</span>
                        </div>
                    </div>
                    <p class="order-title">{{ orderDetail.transferDetail.title }}</p>
                    <p class="order-edu">
                        <span>学制时间：{{ orderDetail.transferDetail.eduYears }}</span>
                        <span class="mode">缴费模式：{{ orderDetail.transferDetail.payModeName }}</span>
                        <span class="city">考点城市：{{ orderDetail.transferDetail.examCity }}</span>
                    </p>
                    <p class="order-material">所需材料：{{ orderDetail.transferDetail.materialList.join('、') }}</p>
                    <ul class="relate-course" v-if="orderDetail.transferDetail.classNameList && orderDetail.transferDetail.classNameList.length > 0">
                        <li class="course-item" v-for="item in orderDetail.transferDetail.classNameList" :key="item">
                            <img class="course-icon" src="./asset/images/exam-course.png" />
                            <span class="course-name">{{ item }}</span>
                        </li>
                    </ul>
                </div>
                <!--v-show="isTransfer"  转入班级 -->
                <h3 v-if="isTransfer" class="section-title">
                    <img src="./asset/images/in.png" class="section-title-icon" />
                    转入班级
                </h3>
                <div v-if="isTransfer" class="detail-wrapper">
                    <img
                        v-if="orderDetail.transferState === 'TRANSFER'"
                        class="order-sts order-sts-transfer"
                        src="./asset/images/order-status-transfer.png"
                        :style="{ bottom: orderDetail.classNameList.length > 0 ? '15px' : '3px' }"
                    />
                    <img
                        v-else-if="orderDetail.transferState === 'REFUND'"
                        class="order-sts order-sts-transfer"
                        src="./asset/images/order-status-refund.png"
                        :style="{ bottom: orderDetail.classNameList.length > 0 ? '15px' : '3px' }"
                    />
                    <img
                        v-else-if="orderDetail.transferState === 'GIVEN'"
                        class="order-sts order-sts-transfer"
                        src="./asset/images/order-status-given.png"
                        :style="{ bottom: orderDetail.classNameList.length > 0 ? '15px' : '3px' }"
                    />
                    <div class="order-price-wrapper">
                        <div class="order-price">
                            <span class="order-label">&emsp;</span>
                            <span class="order-label">&emsp;</span>
                            <span class="order-label" v-if="isArrears">已付金额：</span>
                        </div>
                        <div class="order-price" style="margin-right: 20px">
                            <span class="price">&emsp;</span>
                            <span class="price">&emsp;</span>
                            <span class="price" v-if="isArrears">￥{{ orderDetail.factualAmount | veMoneyCent }}</span>
                        </div>
                        <div class="order-price">
                            <span class="order-label">售&emsp;&emsp;价：</span>
                            <span class="order-label">转入金额：</span>
                            <span class="order-label">{{ transferLabel }}：</span>
                        </div>
                        <div class="order-price">
                            <span class="price">￥{{ orderDetail.amount | veMoneyCent }}</span>
                            <span class="price">￥{{ orderDetail.transferInAmount | veMoneyCent }}</span>
                            <span class="price price-wait">￥{{ transferCash | veMoneyCent }}</span>
                        </div>
                    </div>
                    <p class="order-title">{{ orderDetail.title }}</p>
                    <p class="order-edu">
                        <span>学制时间：{{ orderDetail.eduYears }}</span>
                        <span class="mode">缴费模式：{{ orderDetail.payModeName }}</span>
                        <span class="city">考点城市：{{ orderDetail.examCity }}</span>
                    </p>
                    <p class="order-material">所需材料：{{ orderDetail.materialList.join('、') }}</p>
                    <ul class="relate-course" v-if="orderDetail.classNameList && orderDetail.classNameList.length > 0">
                        <li class="course-item" v-for="item in orderDetail.classNameList" :key="item">
                            <img class="course-icon" src="./asset/images/exam-course.png" />
                            <span class="course-name">{{ item }}</span>
                        </li>
                    </ul>
                </div>
                <div class="pay-wrapper">
                    <h3 class="section-title pay-title">付款信息</h3>
                    <button v-if="orderDetail.credConfirmTime && isAuditPass" class="btn" @click="handleDetailClick" type="button" :disabled="disabled">
                        查看电子凭证
                    </button>
                    <!-- <button v-else-if="!orderDetail.credConfirmTime && isAuditPass" class="btn" @click="handleConfirmClick" type="button" :disabled="disabled">
                        确认电子凭证
                    </button> -->
                </div>
                <table class="pay-table">
                    <thead>
                        <tr class="pay-header">
                            <th>收据编号</th>
                            <th>付款金额</th>
                            <th>付款日期</th>
                            <th>交易流水号</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="pay-item" v-for="item in orderDetail.receiptList" :key="item.receiptNumber">
                            <td>{{ item.receiptNumber }}</td>
                            <td>{{ item.receiptAmount | veMoneyCent }}</td>
                            <td>{{ item.receiptTime && item.receiptTime.slice(0, 10) }}</td>
                            <td>{{ item.serialNumber }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import orderDetailsTitle from '@/www/components/uc/manager/order/orderDetailsTitle/index.vue';
import EducationOrderVoucher from '@/www/components/userCenter/order/education-order-voucher/index.vue'; // 购买协议
import orderPaidDetailsServe from '@/www/components/uc/manager/order/orderPaidDetailsServe/index.vue'; // 售后服务

import '@/api/edu/api..query-eduordering-detail.js';
import '@/api/edu/api..query-eduordering-student-preview.js';
import '@/api/edu/api..query-edubasicdata-sysdict-list.js';
import '@/api/edu/api..user-idcard-identify-name-valid.js';

export default {
    components: {
        EducationOrderVoucher,
        orderPaidDetailsServe,
        orderDetailsTitle,
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
            },
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
            return this.orderDetail.receiptList.some((item) => item.approvalStatus === 'PAS');
        },
    },
    mounted() {
        const { orderId } = this.$route.params;
        this.orderDetail.orderId = orderId;
        this.getOrderPaidDetail();
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
                .catch(this.$niceloo.api.handleFailure);
        },
        getSysBasic() {
            this.$callApi('edu/query-edubasicdata-sysdict-list', {
                dictType: 'EduYears',
                dictAvlStatus: 'Y',
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
        handleConfirmClick() {
            this.$baseUI
                .createModel(
                    {
                        modalContent: EducationOrderVoucher,
                        modalHeader: (
                            <div class="title-wrap">
                                <h2 class="title">确认电子凭证</h2>
                            </div>
                        ),
                    },
                    {
                        order: this.orderDetail,
                        type: 'confirm',
                    },
                    {
                        width: '890px',
                        radius: '16px',
                    }
                )
                .then(({ type, ret }) => {
                    if (type === 'close' && ret === 'click') {
                        this.getOrderPaidDetail();
                    }
                });
        },
        handleDetailClick() {
            const loading = this.$baseUI.loading();
            this.$callApi('edu/query-eduordering-student-preview', {
                id: this.orderDetail.orderId,
            })
                .then((res) => res.getData())
                .then((data) => {
                    this.$baseUI.createModel(
                        {
                            modalContent: EducationOrderVoucher,
                            modalHeader: (
                                <div class="title-wrap">
                                    <h2 class="title">查看电子凭证</h2>
                                </div>
                            ),
                            modalFooter: (
                                <div class="footer-wrap">
                                    <a class="download" download target="_blank" href={this.$urlUtils.getDownloadUrl(data)}>
                                        下载
                                    </a>
                                </div>
                            ),
                        },
                        { order: this.orderDetail, type: 'detail', receiptUrl: this.$urlUtils.getViewUrl(data) },
                        {
                            width: '890px',
                            radius: '16px',
                        }
                    );
                })
                .catch(this.$niceloo.api.handleFailure)
                .finally(() => {
                    loading.close();
                });
        },
    },
};
</script>

<style scoped lang="less">
table {
    border-collapse: collapse;
    border-spacing: 0;
}
table,
tbody,
thead,
th,
td {
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
    font-size: 14px;
    color: #3a3d4b;
    margin: 24px 20px 0;
    .section-title-icon {
        margin-right: 8px;
        width: 13px;
        height: 12px;
    }
}
.detail-wrapper {
    margin: 12px 20px 0;
    padding: 24px 32px 20px;
    border: 1px solid #ecedf6;
    position: relative;
    .order-title {
        font-weight: bold;
        font-size: 16px;
    }
    .order-price-wrapper {
        float: right;
        font-size: 14px;
        clear: right;
        display: flex;
        color: #3a3d4b;
        .order-price {
            display: flex;
            flex-direction: column;
            .order-label {
                text-align: right;
            }
            .order-label + .order-label {
                margin-top: 8px;
            }
            .price {
                font-weight: bold;
                margin-left: 15px;
            }
            .price + .price {
                margin-top: 8px;
            }
            .price-wait {
                color: #f8323c;
                font-size: 14px;
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
        margin: 20px 0 0;
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
    .order-sts {
        width: 80px;
        height: 50px;
        position: absolute;
        right: 32px;
        bottom: 15px;
    }
    .order-sts-transfer {
        right: 200px;
        bottom: auto;
        top: 15px;
    }
}
.pay-title {
    flex: 1;
    margin: 0;
}
.pay-table {
    font-size: 14px;
    margin: 13px 20px 0;
    width: calc(100% - 40px);
    border: 1px solid #ecedf6;
    .pay-header {
        background-color: #f4f5f8;
        color: #77798d;
        th {
            padding: 8px 0;
        }
    }
    .pay-item {
        color: #3a3d4b;
        td {
            border: 1px solid #ecedf6;
            padding: 16px 0;
            text-align: center;
        }
    }
}
.title-wrap {
    .title {
        text-align: center;
        font-weight: bold;
        font-size: 20px;
    }
    box-shadow: 0px 4px 10px 0px rgba(68, 68, 68, 0.05);
    padding-bottom: 20px;
}

.footer-wrap {
    text-align: center;
    padding: 20px 20px 10px;
    background-color: #fff;

    .download {
        color: #ff2e30;
        width: 180px;
        height: 40px;
        border: 1px solid #ff2e30;
        border-radius: 8px;
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
        line-height: 40px;
        background-image: url('./asset/images/download.png');
        background-size: 12px 15px;
        background-repeat: no-repeat;
        background-position: 57px center;
    }
}
/deep/.wrap {
    z-index: 3000;
}
.pay-wrapper {
    display: flex;
    margin: 40px 24px 0;
    .btn {
        background-color: transparent;
        outline: none;
        border: none;
        cursor: pointer;
        color: #f8323c;
        font-weight: bold;
        font-size: 14px;
        &[disabled] {
            color: #8d90aa;
            cursor: default;
        }
    }
}
</style>
