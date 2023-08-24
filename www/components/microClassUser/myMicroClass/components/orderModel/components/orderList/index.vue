<template>
    <div class="list-box">
        <div class="list-item" v-for="(item, index) in orderList" :key="index">
            <div class="item-header flex ai-center jc-between">
                <div class="order-time">
                    <span>下单时间：</span>
                    <span class="mr64">{{ item.orderCreateddate }}</span>
                    <span>订单编号：</span>
                    <span>{{ item.orderNo }}</span>
                </div>
            </div>
            <div class="class-info flex">
                <img class="class-img" :src="$urlUtils.getViewUrl(item.orderItems[0].orderitemPictureurl)" alt="" :onerror="errorimg" />
                <div class="class-body">
                    <div class="class-title">
                        {{ item.orderItems[0].skuName }}
                    </div>
                    <div class="class-price">原价：¥{{ (item.orderItems[0].skuAmount / 100).toFixed(2) }}</div>
                    <div class="class-footer flex jc-between">
                        <div class="true-price flex ai-end">
                            <div class="price-title">应付金额：</div>
                            <div class="price-num">
                                <span class="money">¥</span>
                                {{ (item.orderTotalamount / 100).toFixed(2) }}
                            </div>
                        </div>
                    </div>
                    <div></div>

                    <div class="class-btns flex" v-if="tabVal === 2 && item.orderStatus">
                        <div :class="['delete-btn']" @click="handleShowDelPopup(item.aiId)">删除</div>
                        <div class="pay-btn" v-if="item.orderStatus === 'CRE'" @click="toPay(item.orderNo)">立即支付</div>
                    </div>
                    <div class="last-time flex" v-if="tabVal === 2 && item.orderStatus === 'CRE'">
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
            <template v-if="tabVal == 2 && item.orderStatus === 'EXP'">
                <div class="invalid"></div>
                <img src="./assets/images/failureImg.png" alt="" class="failure-img" />
                <div class="collect1" @click="handleShowDelPopup(item.aiId)"></div>
            </template>
        </div>

        <!--分页-->
        <div class="pagewrap" v-if="page.pageCount > 10">
            <pagination :total="page.pageCount" :page-size="page.pageSize" @pageChange="pageChange" :current-page="page.pageIndex" />
        </div>

        <pay-popup :show.sync="payPopupShow" :order-no="orderNo" @success="handleSuccess"></pay-popup>
    </div>
</template>
<script>
import { microclassUnpaid, microclassPaid, cancelOwnOrder } from '../../../../apis/index.js';
import Pagination from '@/www/components/microClassUser/components/pagination/Index.vue';
import payPopup from '@/www/components/microClassUser/components/payPopup/payPopup/index.vue';

export default {
    name: 'orderListModel',
    components: { Pagination, payPopup },
    props: {
        tabVal: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            errorimg: 'this.src="' + require('./assets/images/errorimg.png') + '"',
            dataList: [microclassPaid, microclassUnpaid],
            orderList: [],
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 2,
            },
            aiId: '',
            payPopupShow: false, //支付弹窗
            orderNo: '',
            timerList: [],
            timer: null,
        };
    },
    watch: {
        tabVal: {
            handler(newval) {
                if (this.timerList.length > 0) {
                    this.timerList.forEach((item) => {
                        item.stopTime();
                    });
                    this.timerList = [];
                }
                this.page.pageIndex = 1;
                this.getDataList();
            },
            immediate: true,
        },
    },
    created() {},
    mounted() {},
    destroyed() {
        if (this.timerList.length > 0) {
            this.timerList.forEach((item) => {
                item.stopTime();
            });
        }
    },
    methods: {
        handleShowDelPopup(aiId) {
            this.aiId = aiId;
            this.$baseUI
                .confirm({ content: '您确定要删除该订单吗？', cancelText: '我再想想' })
                .then(() => {
                    this.sure();
                })
                .catch(() => {});
        },
        //删除订单
        sure() {
            return cancelOwnOrder(this, {
                aiId: this.aiId,
            })
                .then((res) => {
                    this.getDataList();
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        getDataList() {
            return this.dataList[this.tabVal - 1](this, {
                userId: '',
                brandId: 'YOULU',
                pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                pageSize: this.page.pageSize,
            })
                .then((res) => {
                    this.orderList = res.data;
                    this.page.pageCount = parseInt(res.total);
                    this.$emit('update:is-empty', !(this.orderList.length > 0));

                    this.tabVal === 2 &&
                        this.orderList.forEach((item, index) => {
                            if (item.orderStatus === 'CRE') {
                                let vm = this;
                                this.timer = vm.$countDown.runTime(new Date(item.orderTimeexpire).getTime(), new Date().getTime(), function (val) {
                                    if (val != '') {
                                        vm.$set(item, 'countDown', '');
                                        item.countDown = val;
                                        vm.$set(vm.orderList, item.countDown, item.countDown);
                                        if (typeof val === 'undefined') {
                                            this.getDataList();
                                        }
                                    }
                                });
                                this.timerList.push(this.timer);
                            }
                        });
                })
                .catch((err) => {
                    console.error(err);
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
                    }
                    .delete-btn {
                        /*background-image: url('asset/images/delete.png');
                        background-size: 100% 100%;*/
                        background: #eaeeff;
                        background-repeat: no-repeat;
                        color: #025eff;
                        border-radius: 8px;
                    }

                    /*.disable-delete-btn {
                        color: #5793fc !important;
                    }*/
                    .pay-btn {
                        border-radius: 8px;
                        background: linear-gradient(93deg, #3a85fe 3%, #025eff 97%);
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
                        color: #f8323c;
                        font-size: 12px;
                        font-weight: bold;
                        span {
                            width: 18px;
                            height: 19px;
                            background: #fff3f3;
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
