<template>
    <div class="list-box">
        <order-null v-show="orderList.length == 0 && loading == false" words="您还没有订单哦"></order-null>
        <div class="list-item" v-for="(item, index) in orderList" :key="index">
            <div class="item-header flex ai-center jc-between">
                <div class="order-time">
                    <span>订单编号：</span>
                    <span class="mr64">{{ item.orderNo }}</span>
                    <span>订单日期：</span>
                    <span>{{ item.orderCreateddate }}</span>
                </div>
            </div>
            <div class="class-info flex">
                <img class="class-img" :src="$urlUtils.getViewUrl(item.orderItems[0].orderitemPictureurl)" alt="" :onerror="errorImg" />
                <div class="class-body">
                    <p class="class-title">
                        {{ item.orderItems[0].skuName }}
                    </p>
                    <div class="class-price">原价：¥{{ (item.orderItems[0].skuAmount / 100).toFixed(2) }}</div>
                    <div class="class-footer flex jc-between">
                        <div class="true-price flex ai-end">
                            <div class="price-title">{{ cashLabel }}：</div>
                            <div class="price-num">
                                <span class="money">¥</span>
                                {{ (item.orderTotalamount / 100).toFixed(2) }}
                            </div>
                            <span class="class-grow"></span>
                            <span class="return-tag" v-if="item.orderItems[0].orderitemStatus === 'CREF'">{{ item.orderItems[0].orderitemStatusname }}</span>
                        </div>
                    </div>
                    <div></div>

                    <div class="class-btns flex" v-if="tabVal === 1 && item.orderStatus">
                        <button class="delete-btn" @click="handleShowDelPopup(item.aiId)">删除</button>
                        <button class="pay-btn" v-if="item.orderStatus === 'CRE'" @click="toPay(item.orderNo)">立即支付</button>
                    </div>
                    <div class="last-time flex" v-if="tabVal === 1 && item.orderStatus === 'CRE'">
                        <div class="">剩余支付时间：</div>
                        <div class="time">
                            <template v-if="item.countDown.day > 0">{{ item.countDown.day }}天</template>
                            <span class="hour">{{ item.countDown.hour }}</span>
                            :
                            <span class="hour">{{ item.countDown.minutes }}</span>
                            :
                            <span class="hour">{{ item.countDown.seconds }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 失效 -->
            <template v-if="tabVal == 1 && item.orderStatus === 'EXP'">
                <img src="./asset/images/failureImg.png" alt="" class="failure-img" />
                <input type="button" class="collect1" @click="handleShowDelPopup(item.aiId)" />
            </template>
        </div>

        <!--分页-->
        <div class="pagewrap" v-if="page.pageCount > 10">
            <!-- <pagination :total="page.pageCount" :page-size="page.pageSize" @pageChange="pageChange" :current-page="page.pageIndex" /> -->
            <pagination :total="page.pageCount" :page-size="page.pageSize" @current-change="pageChange" :current-page.sync="page.pageIndex" />
        </div>

        <pay-popup :show.sync="payPopupShow" :order-no="orderNo" @success="handleSuccess" :page-source="'体验课待支付订单页'"></pay-popup>
    </div>
</template>
<script>
import '@/api/mcu/api.MCU4010.cancel-own-order.js';
import '@/api/mcu/api.MCU4008.microclass-unpaid.js';
import '@/api/mcu/api.MCU4009.microclass-paid.js';

import Pagination from '@/www/components/components/pagination';
//import Pagination from '@/www/components/microClassUser/components/pagination/Index.vue';
import PayPopup from '@/www/components/course/trial-course/pay-popup/index.vue';
import OrderNull from '@/www/components/uc/manager/myCourse/orderNull/index.vue';

export default {
    name: 'orderListModel',
    components: { Pagination, PayPopup, OrderNull },
    props: {
        tabVal: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            errorImg: 'this.src="' + require('./asset/images/errorimg.png') + '"',
            orderList: [],
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
            },
            payPopupShow: false, //支付弹窗
            orderNo: '',
            loading: false,
        };
    },
    computed: {
        errTips() {
            return this.tabVal === 0 ? '暂无数据' : '您还没有订单哦';
        },
        cashLabel() {
            return this.tabVal === 0 ? '实付金额' : '应付金额';
        },
    },
    watch: {
        tabVal() {
            this.orderList.forEach((item) => {
                item?.timer?.stopTime?.();
            });
            this.page.pageIndex = 1;
            this.getDataList();
        },
    },
    destroyed() {
        this.orderList.forEach((item) => {
            item?.timer?.stopTime?.();
        });
    },
    mounted() {
        this.getDataList();
    },
    methods: {
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
        //删除订单
        sure() {
            return new Promise((resolve, reject) => {
                this.$callApi('order/cancel-own-order', {
                    aiId: this.aiId,
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then(() => {
                    this.getDataList();
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                });
        },
        getDataList() {
            this.loading = true;
            if (this.tabVal === 0) {
                this.getPaidList().then(() => {
                    this.loading = false;
                });
            } else if (this.tabVal === 1) {
                this.getUnPaidList().then(() => {
                    this.loading = false;
                });
            }
        },
        getPaidList() {
            return new Promise((resolve, reject) => {
                this.$callApi('order/microclass-paid', {
                    brandId: 'YOULU',
                    pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                    pageSize: this.page.pageSize,
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then(({ data, total }) => {
                    data.forEach((item) => {
                        item.countDown = '';
                    });
                    this.orderList.splice(0, this.orderList.length, ...data);
                    this.page.pageCount = +total;
                })
                .catch((err) => {
                    console.warn(err);
                    this.$niceloo.api.handleFailure(err);
                });
        },
        getUnPaidList() {
            return new Promise((resolve, reject) => {
                this.$callApi('order/microclass-unpaid', {
                    brandId: 'YOULU',
                    pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                    pageSize: this.page.pageSize,
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then(({ data, total }) => {
                    data.forEach((item) => {
                        item.countDown = '';
                    });
                    this.orderList.splice(0, this.orderList.length, ...data);
                    this.page.pageCount = +total;

                    this.orderList.forEach((item) => {
                        if (item.orderStatus !== 'CRE') {
                            return;
                        }
                        item.timer = this.$countDown.runTime(new Date(item.orderTimeexpire).getTime(), Date.now(), (val) => {
                            if (val === '') {
                                return;
                            } else if (val === undefined) {
                                this.getDataList();
                            }
                            item.countDown = val;
                        });
                    });
                })
                .catch((err) => {
                    console.warn(err);
                    this.$niceloo.api.handleFailure(err);
                });
        },
        //翻页
        pageChange(num) {
            this.page.pageIndex = num;
            this.getDataList();
        },
        toPay(orderNo) {
            this.payPopupShow = true;
            this.orderNo = orderNo;
        },
        handleSuccess() {
            this.getDataList();
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
        .class-info {
            padding: 24px;
            .class-img {
                width: 220px;
                height: 136px;
                margin-right: 20px;
                display: block;
                border-radius: 8px;
            }
            .class-body {
                flex: 1;
                .class-title {
                    color: #3a3d4b;
                    font-size: 16px;
                    line-height: 21px;
                    font-weight: bold;
                    margin-top: 11px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .class-price {
                    height: 16px;
                    line-height: 16px;
                    margin-top: 12px;
                    font-size: 12px;
                    color: #9698a2;
                }

                .class-footer {
                    margin-top: 9px;
                    .true-price {
                        height: 20px;
                        margin-top: 20px;
                        flex: 1;

                        .price-title {
                            font-size: 14px;
                            color: #3a3d4b;
                            font-size: 14px;
                        }
                        .price-num {
                            color: #f8323c;
                            font-size: 18px;
                            font-weight: bold;
                            .money {
                                font-size: 14px;
                                font-weight: bold;
                            }
                        }
                        .return-tag {
                            // background-color: #f5f5f5;
                            // padding: 1px 8px;
                            // border-radius: 2px;
                            color: #ef6500;
                            font-size: 14px;
                            align-self: flex-end;
                        }
                        .class-grow {
                            flex: 1;
                        }
                    }
                }
                .class-btns {
                    position: absolute;
                    right: 24px;
                    bottom: 34px;

                    .delete-btn,
                    .pay-btn {
                        width: 100px;
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        cursor: pointer;
                        border-radius: 8px;
                        border: none;
                    }
                    .delete-btn {
                        background: white;
                        color: #ff2e30;
                        border: 0.5px solid #ff2e30;
                    }

                    .delete-btn:hover {
                        background: #ffeaea;
                    }

                    .pay-btn {
                        // background-image: url('./asset/images/bg.png');
                        // background-repeat: repeat;
                        // background-size: 100% 100%;
                        background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
                        color: #fff;
                        margin-left: 16px;
                    }
                }
                .last-time {
                    font-size: 12px;
                    color: #a5acb7;
                    height: 16px;
                    line-height: 16px;
                    position: absolute;
                    right: 24px;
                    bottom: 82px;
                    .time {
                        color: #333333;
                        font-size: 12px;
                        font-weight: bold;
                        span {
                            width: 18px;
                            height: 19px;
                            text-align: center;
                            line-height: 19px;
                            background: #f4f4f4;
                            border-radius: 4px;
                            display: inline-block;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }
    .invalid {
        position: absolute;
        top: 0px;
        right: 0px;
        left: 0;
        bottom: 0;
        opacity: 0.2;
        background: #9d9d9d;
    }
    .collect,
    .collect1 {
        width: 100px;
        height: 40px;
        background: #fff3f3;
        border-radius: 8px;
        opacity: 0;
        position: absolute;
        bottom: 34px;
        right: 140px;
        cursor: pointer;
        border: none;
    }
    .collect1 {
        right: 24px;
    }
    .failure-img {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 57px;
        height: 58px;
    }
}

.popup-footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    padding: 0 32px;
    div {
        width: 120px;
        height: 38px;
        line-height: 38px;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
    }
    .btn-left {
        border: 1px solid #d6d6d6;
        color: #666666;
    }
    .btn-right {
        color: #fff;
        background-image: linear-gradient(to bottom, #3a85fe, #025eff);
    }
}
.pagewrap {
    width: 100%;
    text-align: center;
    margin-top: 30px;
}
</style>
