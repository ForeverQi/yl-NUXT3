<template>
    <div>
        <div class="liTtitle">
            <span class="titleLeft">订单编号：{{ itemData.orderNo || itemData.orderSourceid }}</span>
            <div class="titleRight">
                <span>订单日期：{{ itemData.orderCreateddate || itemData.subTime }}</span>
                <!-- 只有未付款订单显示取消按钮 -->
                <span
                    class="cancelButton"
                    @click="cancelOrder(itemData)"
                    v-show="itemData.orderSource != 'OP' && itemData.orderSource != 'OA' && orderType === 'unpaidOrder'"
                >
                    取消
                </span>
            </div>
        </div>
        <div class="liCont">
            <div class="contTop">
                <div class="contLi" v-for="it in itemData.items || itemData.orderCourselist || itemData.orderItems" :key="it.a">
                    <span class="contTopLeft">
                        <!-- 只有微课显示“课单”二字 -->
                        <span v-if="it.skuType && it.skuType == 'OCL' && orderType === 'courseOrder'" class="coursetag">课单</span>
                        {{ it.skuName || it.courseName }}
                    </span>
                    <!-- 微课订单不显示原价 -->
                    <span class="contTopRight" v-show="orderType !== 'courseOrder'">原价:￥{{ it.skuAmount | veMoneyCent }}</span>
                </div>
            </div>
            <!-- 微课订单 -->
            <div class="liBot" v-if="orderType === 'courseOrder'">
                <span class="totalMoney">实付金额 :</span>
                <span class="totalNumber">￥ {{ (itemData.orderPayamount || itemData.payMoney) | veMoneyCent }}</span>
            </div>

            <!-- 待付款订单 -->
            <div class="liBot" v-if="orderType === 'unpaidOrder'">
                <div class="passTime" v-show="itemData.orderValidstatus == 'N'"></div>
                <span class="totalMoney">合计 :</span>
                <span class="totalNumber">￥ {{ itemData.orderTotalamount | veMoneyCent }}</span>
                <span class="detailButton" @click="gotoPath(itemData)">{{ itemData.orderValidstatus == 'N' ? '选择课程' : '立即支付' }}</span>
            </div>

            <!-- 已付款订单 -->
            <div class="liBot" v-if="orderType === 'paidOrder'">
                <div
                    class="botIcon"
                    :class="{ [botIcon[itemData.orderSubtype]]: true, dingjin: itemData.orderPaystatus == 'P', invalid: itemData.orderValidstatus == 'N' }"
                ></div>
                <div
                    class="promit"
                    :class="{ active: itemData.orderPaystatus == 'P', selfLearn: showSelfLearn === true }"
                    v-show="
                        itemData.orderValidstatus == 'Y' &&
                        itemData.orderAddressneedcompletestatus == 'Y' &&
                        itemData.orderAddresscompletedstatus == 'N' &&
                        itemData.orderPaystatus != 'P'
                    "
                >
                    不完善将收不到资料哦～
                </div>
                <div class="totalWrap">
                    <div class="totalMoney" v-if="itemData.orderPaystatus != 'P'">
                        {{ itemData.orderPayamount >= 0 ? '实付金额' : '退款金额' }}:
                        <span class="totalNumber">￥ {{ Math.abs(itemData.orderPayamount) | veMoneyCent }}</span>
                    </div>
                    <div v-else>
                        <div class="totalMoney">
                            已付定金:
                            <span class="totalNumber">￥ {{ itemData.orderPayamount | veMoneyCent }}</span>
                        </div>
                        <div class="totalMoney">
                            待支付金额:
                            <span class="totalNumber">￥ {{ itemData.remainPayamount | veMoneyCent }}</span>
                        </div>
                    </div>
                </div>

                <div class="buttonWrap" v-if="itemData.orderCreateddate && milepost(itemData.orderCreateddate)">
                    <span class="detailButton" v-if="itemData.operationMark == 1" @click="toDetais(itemData)">查看详情</span>
                    <span class="detailButton" v-else @click="toDetais(itemData)">立即确认</span>
                    <span class="detailButton topay" @click="toPay(itemData)" v-show="itemData.orderPaystatus == 'P' && itemData.orderValidstatus == 'Y'">
                        立即支付
                    </span>
                    <span class="detailButton" v-if="showSelfLearn" @click="doSelfLearn">申请续学</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/api/selfLearn/api.self-learn-001.check-order-self-learn-status.js';
export default {
    props: {
        itemData: {
            type: Object,
            default: () => ({}),
        },
        orderType: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            botIcon: {
                //1:正常订单;2:转班订单;3:重读订单;4:失效订单  	班级订单子类型(GEN:正常;REP:重读;TRA:转让;CHA:转班;REF:退费DEF:顺延;GIV:赠课)
                GEN: 'normal',
                CHA: 'shiftWork',
                REP: 'stress',
                4: 'invalid',
            },
            showSelfLearn: false,
            classList: [], // 续学班级信息
        };
    },
    computed: {
        milepost() {
            return (orderCreateddate) => {
                //19年3yue1号的不展示按钮 这么写是应为360兼容模式不支持 new Date('年月日 时分秒')的写法，会返回null。
                let fu = new Date('2019-03-01').getTime();
                if (orderCreateddate) {
                    let tim = orderCreateddate.replace(/\s.*/, '');
                    return new Date(tim).getTime() > fu;
                }
            };
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$User.getUser().then((user) => {
                this.checkOrderStatus(user);
            });
        },
        checkOrderStatus(user) {
            let map = {};
            this.itemData.orderItems.forEach((r) => {
                map[r.skuId] = r;
            });
            // 检查订单是否可以显示自助续学
            let classIds = [];
            this.itemData.orderItems.forEach((r) => {
                if (r.orderitemStatus === 'GEND') {
                    classIds.push(r.skuId);
                }
            });
            if (classIds.length === 0) {
                return;
            }
            let s = [
                {
                    studentclassOrderno: this.itemData.orderNo,
                    // userId: user.userId,
                    classIds: classIds.toString(),
                },
            ];
            let params = {
                selfLearnApplyCheckVo: JSON.stringify(s),
            };
            this.$callApi('selfLearn/check-order-self-learn-status', {
                ...params,
                onsuccess: (res) => {
                    if (Array.isArray(res) && res.length > 0) {
                        this.showSelfLearn = res[0][this.itemData.orderNo] === 'Y';
                        if (Array.isArray(res[0].classList)) {
                            this.classList = res[0].classList.map((r) => {
                                let item = map[r.classId];
                                // r.projectName = item.projectName;
                                // r.projectId = item.projectId;
                                r.orderitemStatus = item.orderitemStatus;
                                return r;
                            });
                        }
                    } else {
                        this.showSelfLearn = false;
                    }
                },
            });
        },
        // 未付款订单取消
        cancelOrder(item) {
            this.$emit('cancelOrder', item);
        },
        gotoPath(item) {
            this.$emit('gotoPath', item);
        },
        toDetais(item) {
            // 判断登录来源 -1时不可点击
            if (!this.$baseUI.clickStop()) {
                return;
            }
            this.$emit('toDetais', item);
        },
        doSelfLearn() {
            // 自助续学
            this.$emit('doSelfLearn', this.classList, this.itemData);
        },
        toPay(item) {
            this.$emit('toPay', item);
        },
    },
};
</script>

<style scoped lang="less">
.payContent {
    padding: 30px;
    font-size: 16px;
    color: #333;
}
.payLi {
    border: 2px solid #f2f2f2;
    margin-bottom: 15px;
    background: #fff;
    .liTtitle {
        line-height: 60px;
        height: 60px;
        background: #f8f8f8;
        border-bottom: 2px solid #f2f2f2;
        padding: 0 21px;
        color: #666;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .cancelButton {
        margin-left: 20px;
        cursor: pointer;
    }
    .liCont {
        padding: 0 21px;
        .contTop {
            border-bottom: 1px solid rgba(242, 242, 242, 1);
            padding: 20px 0;
            .contLi {
                line-height: 25px;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
            }
            .contTopLeft {
                color: #333;
                font-size: 14px;
                width: 550px;
            }

            .contTopRight {
                color: #999;
                font-size: 12px;
            }
        }
    }
    .liBot {
        line-height: 65px;
        text-align: right;
        position: relative;
        .botIcon {
            position: absolute;
            left: 21px;
            bottom: 35px;
            width: 104px;
            height: 42px;
            background-repeat: no-repeat;
            background-position: 0 0;
            background-size: 100%;
            &.dingjin {
                background-image: url('./asset/images/earnest@2x.png');
            }
            &.shiftWork {
                background-image: url('./asset/images/shift@2x.png');
            }
            &.stress {
                background-image: url('./asset/images/stress@2x.png');
            }
            &.invalid {
                background-image: url('./asset/images/Invalid@2x.png');
            }
        }
        .passTime {
            position: absolute;
            left: 0;
            bottom: 15px;
            width: 104px;
            height: 42px;
            background: url('./asset/images/Invalid@2x.png') no-repeat 0 0 / cover;
        }
        .totalWrap {
            padding: 15px 0 0;
        }
        .totalMoney {
            color: #666;
            font-size: 14px;
            line-height: 30px;
        }
        .totalNumber {
            color: #f02e00;
            font-size: 22px;
            font-weight: bold;
        }
        .buttonWrap {
            position: relative;
            display: inline-block;
        }
        .promit {
            position: absolute;
            height: 16px;
            line-height: 16px;
            left: 471px;
            bottom: 22px;
            color: #f02e00;
            font-size: 14px;
            padding-left: 24px;
            background: url('./asset/images/mark@2x.png') no-repeat 0 0px;
            background-size: 16px 16px;
            &.selfLearn {
                left: 360px;
            }
            &.active {
                left: 375px;
            }
        }
        .detailButton {
            display: inline-block;
            line-height: 32px;
            height: 32px;
            color: #fff;
            font-size: 14px;
            padding: 0 20px;
            border-radius: 3px;
            background: linear-gradient(36deg, rgba(255, 68, 54, 1) 0%, rgba(249, 107, 84, 1) 100%);
            margin-left: 20px;
            cursor: pointer;
            &.topay {
                background: linear-gradient(90deg, rgba(224, 177, 108, 1) 0%, rgba(220, 157, 49, 1) 100%);
            }
        }
    }
}
</style>
