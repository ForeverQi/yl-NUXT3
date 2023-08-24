<template>
    <div class="list-box">
        <order-null v-show="orderList.length == 0 && loading == false" words="您还没有订单哦"></order-null>
        <div class="list-item" v-for="item in orderList" :key="item.orderId">
            <div class="item-header flex ai-center jc-between">
                <div class="order-time">
                    <span>订单编号：</span>
                    <span class="mr64">{{ item.orderNo }}</span>
                    <span>订单日期：</span>
                    <span>{{ item.orderCreateddate }}</span>
                </div>
            </div>
            <div class="order-content">
                <div class="order-info">
                    <span class="product-type">{{ item.productTagName }}</span>
                    <ul class="product-list">
                        <li v-for="citem in item.orderItems" :key="citem.oiId" class="product-item">
                            <p class="product-name">
                                {{ citem.skuName }}
                            </p>
                            <span class="refund-tag" v-if="citem.orderitemStatus === 'CREF'">{{ citem.orderitemStatusname }}</span>
                            <span class="origin-price">原价：¥{{ parseFloat(citem.skuAmount / 100) }}</span>
                        </li>
                    </ul>
                </div>
                <div class="pay-info">
                    <span class="price-title">{{ cashLabel }}：</span>
                    <div class="price-num">
                        <span class="unit">¥</span>
                        {{ parseFloat(item.orderTotalamount / 100) }}
                    </div>
                </div>
            </div>
            <!-- 失效 -->
            <img v-if="tabVal == 1 && item.orderStatus === 'EXP'" src="./asset/images/failureImg.png" alt="" class="failure-img" />
            <div class="oper-container" v-if="tabVal === 1 && item.orderStatus">
                <div class="pay-timer" v-if="item.isShowTimer">
                    <span class="pay-timer-title">剩余支付时间：</span>
                    <div class="time">
                        <!-- <template v-if="item.countDown.day > 0">{{ item.countDown.day }}天</template> -->
                        <template v-if="+item.countDown.hour > 0">
                            <span class="hour">{{ item.countDown.hour }}</span>
                            :
                        </template>
                        <span class="hour">{{ item.countDown.minutes }}</span>
                        :
                        <span class="hour">{{ item.countDown.seconds }}</span>
                    </div>
                </div>
                <button type="button" class="delete-btn" v-if="item.orderStatus !== 'PAI'" @click="handleShowDelPopup(item.aiId)">删除</button>
                <button type="button" class="pay-btn" v-if="item.orderStatus === 'CRE'" @click="toPay(item)">立即支付</button>
            </div>
        </div>

        <!--分页-->
        <div class="pagewrap" v-if="page.pageCount > 10">
            <pagination :total="page.pageCount" :page-size="page.pageSize" @current-change="pageChange" :current-page.sync="page.pageIndex" />
        </div>
    </div>
</template>
<script>
import '@/api/mcu/api.MCU4010.cancel-own-order.js';
import '@/api/order/api..query-other-order-unpaid-list.js';
import '@/api/order/api..query-other-order-paid-list.js';
import '@/api/order/api..query-other-order-detail.js';

import Pagination from '@/www/components/components/pagination';
import OrderNull from '@/www/components/uc/manager/myCourse/orderNull/index.vue';

export default {
    name: 'orderListModel',
    components: { Pagination, OrderNull },
    props: {
        tabVal: {
            type: Number,
            default: 1,
        },
    },
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            orderList: [],
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
            },
            orderNo: '',
            loading: false,
        };
    },
    computed: {
        /**
         * @returns {string} 提示
         */
        errTips() {
            return this.tabVal === 0 ? '暂无数据' : '您还没有订单哦';
        },
        /**
         * @returns {string} 金额文本
         */
        cashLabel() {
            return this.tabVal === 0 ? '实付金额' : '应付金额';
        },
    },
    watch: {
        /**
         * 选项页切换监听
         */
        tabVal() {
            this.orderList.forEach((item) => {
                item?.timer?.stopTime?.();
            });
            this.page.pageIndex = 1;
            this.getDataList();
        },
    },
    /**
     * 销毁定时器
     */
    beforeDestroy() {
        this.orderList.forEach((item) => {
            item?.timer?.stopTime?.();
        });
    },
    /**
     * 挂载刷新数据
     */
    mounted() {
        this.getDataList();
    },
    methods: {
        /**
         *
         * @param {string} aiId id
         */
        handleShowDelPopup(aiId) {
            this.aiId = aiId;
            this.$baseUI.confirm({
                content: '您确定要删除该订单吗？',
                cancelText: '我再想想',
                confirm: () => {
                    this.sure();
                },
            });
        },
        /**
         * 删除订单
         *
         * @returns {Promise} 状态机
         */
        sure() {
            return new Promise((resolve, reject) => {
                this.$callApi('order/cancel-own-order', {
                    aiId: this.aiId,
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then(this.getDataList)
                .catch(this.$niceloo.api.handleFailure);
        },
        /**
         * 获取数据请求
         */
        getDataList() {
            this.loading = true;
            this.orderList.forEach(({ timer }) => {
                if (timer) {
                    timer.stopTime();
                }
            });
            if (this.tabVal === 0) {
                this.getPaidList().finally(() => {
                    this.loading = false;
                });
            } else if (this.tabVal === 1) {
                this.getUnPaidList().finally(() => {
                    this.loading = false;
                });
            }
        },
        /**
         * 获取已支付列表
         *
         * @returns {Promise} 状态机
         */
        getPaidList() {
            return new Promise((resolve, reject) => {
                this.$callApi('order/query-other-order-paid-list', {
                    brandId: 'YOULU',
                    pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                    pageSize: this.page.pageSize,
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then(({ data, total }) => {
                    this.orderList.splice(0, this.orderList.length, ...data);
                    this.page.pageCount = +total;
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        /**
         * 未支付列表
         *
         * @returns {Promise} 状态机
         */
        getUnPaidList() {
            return new Promise((resolve, reject) => {
                this.$callApi('order/query-other-order-unpaid-list', {
                    brandId: 'YOULU',
                    pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                    pageSize: this.page.pageSize,
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then(({ data, total }) => {
                    const arr = ['ATI', 'WK', 'CARD', 'TC', 'DRA'];
                    data.forEach((item) => {
                        item.countDown = {
                            day: 0,
                            hour: '00',
                            minutes: 11,
                            seconds: '21',
                            show: true,
                        };
                        item.isShowTimer = item.orderStatus === 'CRE' && item.orderItems.length > 0 && arr.includes(item.orderItems[0].productType);
                    });
                    this.orderList.splice(0, this.orderList.length, ...data);
                    this.page.pageCount = +total;

                    this.orderList.forEach((item) => {
                        if (item.isShowTimer === false) {
                            return;
                        }
                        item.timer = this.$countDown.runTime(new Date(item.orderTimeexpire).getTime(), Date.now(), (val) => {
                            if (val === '') {
                                return;
                            } else if (val === undefined) {
                                this.getDataList();
                            }
                            console.warn(val);
                            Object.assign(item.countDown, val);
                        });
                    });
                })
                .catch((err) => {
                    console.warn(err);
                    this.$niceloo.api.handleFailure(err);
                });
        },
        /**
         * 翻页
         *
         * @param {number} num 页码
         */
        pageChange(num) {
            this.page.pageIndex = num;
            this.getDataList();
        },
        /**
         * 去支付
         *
         * @param {object} item 订单号
         */
        toPay(item) {
            const orderNo = item.orderNo;
            this.$callApi('order/query-other-order-detail', {
                orderNo,
                onsuccess: (res) => {
                    console.warn(res);
                    const arr = ['ATI', 'WK', 'CARD', 'TC', 'DRA'];
                    const { orderTimeexpire } = res;
                    //  Orderstatus("CRE"
                    // new orderstatus("PAI"，"已支付")
                    // ed = new OrderStatus("EXP"
                    // ，"已过期")
                    //  new
                    // Orderstatus("CAN"
                    // "已取消")
                    if (arr.includes(res.orderItems[0].productType)) {
                        if (res.orderStatus === 'PAI') {
                            this.$baseUI
                                .alert('订单已支付', '提示')
                                .then(() => {
                                    item.orderStatus = res.orderStatus;
                                })
                                .catch(() => {});
                        } else if (res.orderStatus === 'EXP') {
                            console.warn('已过期');
                            this.$baseUI
                                .alert('订单已过期', '提示')
                                .then(() => {
                                    item.orderStatus = res.orderStatus;
                                })
                                .catch(() => {});
                        } else if (res.orderStatus === 'CAN') {
                            console.warn('已取消');
                            this.$baseUI
                                .alert('订单已取消', '提示')
                                .then(() => {
                                    item.orderStatus = res.orderStatus;
                                })
                                .catch(() => {});
                        } else if (res.orderStatus === 'CRE' && res.orderItems.length > 0 && Date.parse(orderTimeexpire) > Date.now()) {
                            this.orderList.forEach(({ timer }) => {
                                if (timer) {
                                    timer.stopTime();
                                }
                            });
                            this.$router.push(`/uc/manager/order/orderOther/confirm/${orderNo}`);
                        } else {
                            this.$baseUI.alert('订单已过期', '提示').catch(() => {});
                            console.warn('超时');
                        }
                    } else {
                        this.orderList.forEach(({ timer }) => {
                            if (timer) {
                                timer.stopTime();
                            }
                        });
                        this.$router.push(`/uc/manager/order/orderOther/confirm/${orderNo}`);
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.list-box {
    padding: 0 20px;
    .list-item {
        margin-top: 25px;
        border: 1px solid #ecedf6;
        position: relative;
        overflow: hidden;
        .item-header {
            height: 36px;
            background-color: #f4f5f8;
            padding: 0 24px;
            .order-time {
                span {
                    font-size: 14px;
                    color: #99a1af;
                }
            }
            .order-status {
                color: #025eff;
                font-size: 14px;
            }
            .mr64 {
                margin-right: 64px;
            }
        }
    }
}

.order-content {
    padding: 35px 24px 24px 40px;
}
.order-info {
    display: flex;
    align-items: flex-start;

    .product-type {
        background: #ffeaea;
        border-radius: 4px;
        color: #f8323c;
        font-size: 14px;
        line-height: 1;
        padding: 4px 8px;
        display: inline-block;
    }

    .product-list {
        margin-left: 8px;
        flex: 1;
        .product-item {
            display: flex;
            align-items: center;
            .refund-tag {
                color: #ef6500;
                font-size: 12px;
                margin-left: 16px;
            }
            .product-name {
                color: #3a3d4b;
                font-size: 16px;
                font-weight: bold;
                color: #3a3d4b;
                line-height: 21px;
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .origin-price {
                color: #9698a2;
                font-size: 12px;
                margin-left: 16px;
                flex: none;
            }
        }
        .product-item:nth-child(n + 2) {
            margin-top: 12px;
        }
    }
}
.pay-info {
    display: flex;
    align-items: flex-end;
    margin-top: 53px;
    .price-title {
        color: #3a3d4b;
        line-height: 19px;
        font-size: 14px;
    }
    .price-num {
        color: #f8323c;
        font-size: 18px;
        font-weight: bold;
        margin-left: 6px;
        .unit {
            font-size: 14px;
            font-weight: normal;
        }
    }
}

.pagewrap {
    margin-top: 20px;
}
.failure-img {
    position: absolute;
    width: 48px;
    height: 48px;
    top: 36px;
    left: 0;
}
.oper-container {
    position: absolute;
    bottom: 14px;
    right: 24px;

    .delete-btn,
    .pay-btn {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
    }
    .delete-btn {
        color: #ff2e30;
        border-radius: 8px;
        border: 1px solid #ff2e30;
        background: white;
    }

    .pay-btn {
        border-radius: 8px;
        background-image: url('asset/images/bg.png');
        background-size: 100% 100%;
        color: white;
        margin-left: 16px;
        background-repeat: no-repeat;
    }
    .pay-timer {
        font-size: 12px;
        margin-right: 4px;
        margin-bottom: 16px;
        text-align: right;
        .pay-timer-title {
            color: #9698a2;
        }
        .time {
            display: inline-block;
            .hour {
                color: #333;
                font-size: 12px;
                background: #f4f4f4;
                border-radius: 4px;
                display: inline-flex;
                font-weight: bold;
                width: 23px;
                height: 22px;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>
