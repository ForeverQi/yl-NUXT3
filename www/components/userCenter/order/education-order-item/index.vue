<template>
    <div>
        <div class="liTtitle">
            <span>订单编号：</span>
            <span class="content">{{ order.orderNumber }}</span>
            <span class="titleLeft">订单日期：</span>
            <span class="content">{{ order.creationTime }}</span>
        </div>
        <ul class="contTop">
            <li class="contLi">
                <p class="contTopLeft">{{ order.majorName }}-{{ order.eduModeName }}-{{ order.eduLevelTypeName }}-咨询服务</p>
                <span class="contTopRight">售价:￥{{ order.productPrice | veMoneyCent }}</span>
            </li>
        </ul>

        <!-- 订单类型 ZC-正常订单 PZ-平转订单 SZ-升转订单 JZ-降转订单 TF-退费订单 ZF-作废订单 SZR-升转让订单 PZR-平转让订单 -->
        <img v-if="order.isValid === false" src="./asset/images/Invalid.png" alt="" class="botIcon" />
        <img
            v-else-if="order.orderType === 'PZ' || order.orderType === 'SZ' || order.orderType === 'JZ'"
            src="./asset/images/shift.png"
            alt=""
            class="botIcon"
        />
        <img v-else-if="order.orderType === 'SZR' || order.orderType === 'PZR'" src="./asset/images/transfer.png" alt="" class="botIcon" />

        <div class="liBot">
            <div class="totalMoney totalMoney-inline has-pay" v-if="type !== 'unpaid'">
                {{ order.orderType === 'JZ' ? '退款金额:' : '已付金额:' }}
                <span class="totalNumber" v-if="order.orderType === 'JZ'">{{ order.receivableAmount | veMoneyCent }}</span>
                <span class="totalNumber" v-else>{{ order.factualAmount | veMoneyCent }}</span>
            </div>
            <div class="totalMoney totalMoney-inline" v-if="order.amountInArrears > 0">
                {{ type === 'unpaid' ? '应付金额:' : '待支付金额:' }}
                <span class="totalNumber">{{ order.amountInArrears | veMoneyCent }}</span>
            </div>
            <p class="stench"></p>
            <div class="buttonWrap">
                <nuxt-link v-if="type !== 'unpaid' && order.isOrderConfirmed" :to="`/uc/manager/orderEducationDetail/${order.id}`" class="detailButton">
                    查看详情
                </nuxt-link>
                <button class="detailButton topay" @click="handlePayClick(order)" v-show="isNeedPay">立即支付</button>
                <nuxt-link v-if="order.isNeedConfirm && order.isValid" :to="`/uc/manager/orderEducationConfirm/${order.id}`" class="detailButton topay">
                    确认订单信息
                </nuxt-link>
            </div>
        </div>

        <ul class="relate-course" v-if="order.aboutClasss && order.aboutClasss.length > 0">
            <li class="course-item" v-for="cls in order.aboutClasss" :key="cls.classId">
                <img class="course-icon" src="./asset/images/exam-course.png" />
                <span class="course-name">{{ cls.skuName }}</span>
            </li>
        </ul>
        <education-user-info
            :show.sync="isShowPerfect"
            @success="handlePayClick"
            :user-name="order.custName"
            :title="'请完善学员的个人信息'"
            :scene="'STUDENT_PAY'"
            :is-three-verify="order.isThreeVerify"
        />
    </div>
</template>

<script>
import '@/api/edu/api..query-eduordering-getorderchange.js';
import '@/api/edu/api..eduordering-student-createprepay.js';
import '@/api/edu/api..threeelementcheck.js';
import '@/api/edu/api..twoelementcheck.js';
import EducationUserInfo from '@/www/components/userCenter/order/education-user-info/index.vue'; // 购买协议

export default {
    components: {
        EducationUserInfo,
    },
    props: {
        order: {
            type: Object,
            default: () => ({}),
        },
        type: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isShowPerfect: false,
        };
    },
    computed: {
        isNeedPay() {
            // <!-- 订单类型 ZC-正常订单 PZ-平转订单 SZ-升转订单 JZ-降转订单 TF-退费订单 ZF-作废订单 SZR-升转让订单 PZR-平转让订单 -->
            //  ○ 需支付：订单类型为正常订单，升转让订单，升转订单且订单状态为正常的有欠费的订单；
            if (!this.order) {
                return false;
            } else if (this.order.isValid !== true) {
                return false;
            } else if (this.order.orderType !== 'ZC' && this.order.orderType !== 'SZ' && this.order.orderType !== 'SZR') {
                return false;
            } else {
                return this.order.amountInArrears > 0;
            }
        },
    },
    methods: {
        cancelOrder(item) {
            this.$emit('cancelOrder', item);
        },
        handlePayClick() {
            const loading = this.$baseUI.loading();
            this.validUserInfo()
                .then(() => {
                    return this.payCheck();
                })
                .then(() => {
                    return this.createPreOrder();
                })
                .finally(() => {
                    loading.close();
                });
        },
        payCheck() {
            return this.$callApi('edu/query-eduordering-getorderchange', {
                orderNo: this.order.orderNumber,
                productSpecId: this.order.productId,
                receivableAmount: this.order.receivableAmount,
            }).catch(() => {
                this.$baseUI.alert('当前订单信息已变更，请刷新后重新支付！', '提示', {
                    success: () => {
                        this.$emit('refresh');
                    },
                });
                return Promise.reject('当前订单信息已变更，请刷新后重新支付！');
            });
        },
        createPreOrder() {
            return this.$callApi('edu/eduordering-student-createprepay', {
                orderNumber: this.order.orderNumber,
                tradeRecordFrontUrl: `${location.origin}/uc/manager/orderEducationDetail/${this.order.id}`,
                tradeClientCode: this.$nuxt.context.env.config.tradeclientCode, // this.$nuxt.context.env.config // this.Config.tradeclientCode
                sceneCode: 'PC',
            })
                .then((res) => res.getData())
                .then(({ cashUrl }) => {
                    let cUrl = cashUrl;
                    if (location.href.indexOf('zywinner') > -1) {
                        cUrl = cUrl.replace('niceloo', 'zywinner');
                    }
                    if (/^(https):\/\//i.test(location.href) && /^(http):\/\//i.test(cUrl)) {
                        cUrl = cUrl.replace('http', 'https');
                    }
                    window.location.href = cUrl.indexOf('uc/order') >= 0 ? cUrl.replace('uc/order', 'uc/manager/order') : cUrl;
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        validUserInfo() {
            if (this.order.isThreeVerify === true) {
                return this.validThreeBusiness();
            }
            return this.validTwoBusiness();
        },
        validThreeBusiness() {
            return this.validThree().then((res) => {
                const { code } = res.getData();
                if (code === '1') {
                    return this.validTwoBusiness();
                }
            });
        },
        validTwoBusiness() {
            return this.validTwo().then((res) => {
                const { code, message } = res.getData();
                if (code === '1') {
                    this.isShowPerfect = true;
                    return Promise.reject(message);
                }
            });
        },
        validTwo() {
            return this.$callApi('edu/twoelementcheck', {
                idCardno: this.order.idCardNo,
                name: this.order.custName,
                action: '0',
                terminal: 'WEB',
                scene: 'STUDENT_PAY',
            });
        },
        validThree() {
            return this.$callApi('edu/threeelementcheck', {
                idCardno: this.order.idCardNo,
                name: this.order.custName,
                action: '0',
                terminal: 'WEB',
                scene: 'STUDENT_PAY',
            });
        },
    },
};
</script>

<style scoped lang="less">
.liTtitle {
    background-color: #f8f8f8;
    padding: 8.5px 24px;
    color: #77798d;
    font-size: 14px;
    display: flex;
    align-items: center;
    .titleLeft {
        margin-left: 64px;
    }
    .content {
        color: #99a1af;
    }
}

.contTop {
    padding: 35px 24px 0 40px;
    .contLi {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .contLi + .contLi {
        margin-top: 12px;
    }

    .contTopLeft {
        color: #3a3d4b;
        font-size: 16px;
        flex: 1;
        font-weight: bold;
    }

    .contTopRight {
        color: #9698a2;
        font-size: 12px;
    }
}

.botIcon {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 36px;
    left: 0;
}

.liBot {
    padding: 37px 24px 20px 40px;
    display: flex;
    align-items: center;
    .stench {
        flex: 1;
    }
    .has-pay {
        margin-right: 40px;
    }
    .totalWrap {
        display: flex;
        justify-content: space-between;
        flex: 1;
        align-items: flex-end;
    }
    .totalMoney {
        color: #3a3d4b;
        font-size: 14px;
    }
    .totalMoney-inline {
        display: inline-block;
    }
    .totalNumber {
        color: #f8323c;
        font-weight: bold;
        font-size: 20px;
    }
    .totalNumber::before {
        content: '￥';
        font-size: 14px;
    }
    .buttonWrap {
        position: relative;
        display: inline-block;
    }
    .detailButton {
        display: inline-block;
        color: #f8323c;
        font-size: 14px;
        padding: 10.5px 20px;
        border-radius: 3px;
        background: #fff3f3;
        margin-left: 16px;
        cursor: pointer;
        border-radius: 8px;
        &.topay {
            background: url('./asset/images/bg.png');
            color: white;
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
    }
}
.relate-course {
    margin: 15px 24px 20px;
    border-radius: 4px;
    .course-item {
        background-color: #f5f6fa;
        padding: 8px 16px;
        display: flex;
        align-items: center;
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
</style>
