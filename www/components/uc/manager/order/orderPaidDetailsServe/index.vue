<template>
    <!-- 申请发票 售后服务 -->
    <div class="invoiceAndAfterSale" v-if="serverList.length > 0">
        <div class="applyAfterSale">
            <div class="applyShow" :class="{ active: firstItem.orderitemAfterservicename == '售后服务' }">
                <span @click="apply(firstItem)">{{ firstItem.orderitemAfterservicename }}</span>
                <div class="point" v-show="isShowPoint">
                    <div class="serverListWrap">
                        <ul class="serverList">
                            <li @click="apply(item)" v-for="item in serverList" :key="item.a" v-show="!item.active">{{ item.orderitemAfterservicename }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'order',
    props: {
        paidDetails: {
            type: Object,
            default() {
                return {};
            },
        },
        serverList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            firstItem: { orderitemAfterservicename: '售后服务' },
        };
    },
    computed: {
        isShowPoint() {
            return (
                (this.firstItem.orderitemAfterservicename === '售后服务' && this.serverList.length > 0) ||
                (this.firstItem.orderitemAfterservicename !== '售后服务' && this.serverList.length > 1)
            );
        },
    },
    watch: {
        serverList: {
            deep: true,
            immediate: true,
            handler(val) {
                val.forEach((val) => {
                    if (val.orderitemAfterservicename === '申请重读') {
                        val.active = true;
                        this.firstItem = {
                            ...this.firstItem,
                            ...val,
                        };
                    }
                });
            },
        },
    },
    methods: {
        apply(item) {
            if (item.orderitemAfterservicename === '售后服务') {
                return;
            }
            const baseUrl = `/inside/user/uc/`;
            let pages = '';
            //订单项售后服务类型(48小时退费:48HR;24小时退费:24HR;申请重读:REA;申请退费:REF)
            if (item.orderitemAfterservicetype === 'REF') {
                //申请退费
                pages = 'refund';
            }
            if (item.orderitemAfterservicetype === '48HR' || item.orderitemAfterservicetype === '24HR') {
                //48小时退费:48HR;24小时退费:24HR
                pages = 'refund-hours';
            }
            if (item.orderitemAfterservicetype === 'REA') {
                //申请重读
                pages = 're-reading';
            }

            const url = `${baseUrl}${pages}?orderId=${this.$route.query.orderNo}&classId=${this.paidDetails.skuId}`;

            this.$PageUtil.openNewPage(url);
        },
    },
};
</script>

<style scoped lang="less">
.invoiceAndAfterSale {
    text-align: right;
    .applyAfterSale {
        position: relative;
        .applyShow {
            font-size: 12px;
            color: #999;
            display: flex;
            line-height: 20px;
            span {
                cursor: pointer;
            }
            &.active:hover {
                .serverListWrap {
                    display: block;
                }
            }
            .point {
                cursor: pointer;
                height: 20px;
                width: 20px;
                margin-left: 4px;
                background: url('./asset/images/points.png') no-repeat;
                background-position: center center;
                &:hover {
                    .serverListWrap {
                        display: block;
                    }
                }
            }
        }
    }
}
.serverListWrap {
    display: none;
    position: absolute;
    top: 16px;
    right: 0;
    padding-top: 5px;
}
.serverList {
    width: 90;
    box-shadow: 0 1px 6px 1px rgba(83, 19, 19, 0.05);
    border-radius: 4px;
    padding: 10px;
    background: #fff;
    li {
        height: 32px;
        border-radius: 4px;
        font-size: 12px;
        color: #333;
        line-height: 32px;
        border-bottom: 1px solid #eee;
        white-space: nowrap;
        text-align: center;
        &:hover {
            opacity: 0.8;
        }
        &:last-child {
            border-bottom: none;
        }
    }
}
</style>
