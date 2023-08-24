<template>
    <div class="class-detail">
        <div class="nod_tt">
            <span>班级信息</span>
        </div>
        <!-- 班级信息 -->
        <div class="nod_class">
            <ul class="classWrap">
                <li class="chassTit">
                    <div>班级名称</div>
                    <div>授课方式</div>
                    <div>原价</div>
                    <div v-show="!orderNumber">操作</div>
                </li>
                <li v-show="!orderNumber" class="contWrap" v-for="(item, index) in classList" :key="index">
                    <div class="classCont">
                        <div class="className">
                            {{ item.className }}
                            <span
                                v-show="
                                    item.classAtype == 'E' &&
                                    (item.classAsertype == 'R' ||
                                        item.classAsertype == 'F' ||
                                        item.classAsertype == 'U' ||
                                        item.classAsertype == 'N' ||
                                        item.classAsertype == 'K')
                                "
                                @click="openArguments(item)"
                            >
                                产品购买协议
                            </span>
                        </div>
                        <div>{{ item.classTeachmethod | getTeachMethod }}</div>
                        <div>¥{{ item.classStdprice | veMoneyCent }}</div>
                        <div>
                            <span class="del" @click="removeClass(item)">删除</span>
                        </div>
                    </div>
                    <div class="giveClass" v-show="item.giveClasses && item.giveClasses.length > 0">
                        <ul class="addGoods">
                            <li class="addTit">赠送：</li>
                            <li class="addLi classCont" v-for="it in item.giveClasses" :key="it.a">
                                <div class="className">
                                    {{ it.className }}
                                </div>
                                <div>{{ it.classTeachmethod | getTeachMethod }}</div>
                                <div>¥{{ it.classStdprice | veMoneyCent }}</div>
                                <div>
                                    <!-- 占位 误删-->
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li
                    v-show="orderNumber && item.orderitemOperation != 'CHAO' && item.orderitemOperation != 'DEFC' && item.orderitemOperation != 'DEFO'"
                    class="contWrap"
                    v-for="item in orderDetail.orderItems"
                    :key="item.a"
                >
                    <div class="classCont">
                        <div class="className">
                            {{ item.skuName }}
                            <span
                                v-show="
                                    orderDetail.orderSubtype != 'REP' &&
                                    item.orderitemService.orderitemAgreementtype == 'E' &&
                                    item.orderitemService.orderitemServicetype != 'B'
                                "
                                @click="openArguments(item)"
                            >
                                产品购买协议
                            </span>
                        </div>
                        <div>{{ item.specs | specs }}</div>
                        <div>¥{{ item.skuAmount | veMoneyCent }}</div>
                    </div>
                    <div class="giveClass" v-show="item.giftItems && item.giftItems.length > 0">
                        <ul class="addGoods">
                            <li class="addTit">赠送：</li>
                            <li class="addLi classCont" v-for="it in item.giftItems" :key="it.a">
                                <div class="className">
                                    {{ it.skuName }}
                                </div>
                                <div>{{ it.specs | getTeachMethod }}</div>
                                <div>¥{{ it.oiAmount | veMoneyCent }}</div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'class-detail',
    filters: {
        // 授课方式
        getTeachMethod(value) {
            //N:网络;F:面授;L:直播;M:混合
            if (value === 'N') {
                return '网络授课';
            } else if (value === 'F') {
                return '面授';
            } else if (value === 'L') {
                return '直播授课';
            } else if (value === 'M') {
                return '面网混合';
            }
        },
        // 规格
        specs(val) {
            let cont = '';
            if (val && val.length > 0) {
                val.forEach((v) => {
                    if (v.specType === 'TECHMETHOD') {
                        cont = v.specName;
                    }
                });
            }
            return cont;
        },
    },
    props: {
        // 订单编号
        orderNumber: {
            type: String,
            default: '',
        },
        // 班级列表
        classList: {
            type: Array,
            default() {
                return [];
            },
        },
        // 订单信息
        orderDetail: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    methods: {
        // 打开协议
        openArguments(item) {
            this.$emit('open-arguments', item);
        },

        // 删除
        removeClass(item) {
            this.$emit('remove-class', item);
        },
    },
};
</script>

<style scoped lang="less">
.nod_tt {
    border-bottom: 1px solid #eeeeee;
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 34px;
    font-size: 18px;
    color: #333;
    &:before {
        content: '';
        width: 20px;
        height: 20px;
        background: url('../asset/images/class-info.png') center/100% no-repeat;
        margin-right: 12px;
    }
}

.nod_class {
    margin: 20px 30px;
    .classWrap {
        border: 1px solid #eee;
        .contWrap {
            border-bottom: 1px solid #eee;
            &:last-child {
                border-bottom: none;
            }
        }
        .chassTit,
        .classCont {
            display: flex;
            align-items: center;
            line-height: 44px;
            background: rgba(248, 248, 248, 1);
            text-align: center;
            font-size: 16px;
            color: #666;
            div {
                width: 16.5%;
                flex-shrink: 0;
            }
            div:first-child {
                text-align: left;
                padding-left: 90px;
                box-sizing: border-box;
                flex-grow: 1;
            }
            .del {
                color: #476aff;
                cursor: pointer;
            }
        }
        .classCont {
            background: #fff;
            color: #333;
            padding: 7px 0;
            line-height: 30px;
            div:first-child {
                text-align: left;
                padding-left: 30px;
                box-sizing: border-box;
            }
            .className {
                display: flex;
                align-items: center;
                span {
                    width: 94px;
                    height: 22px;
                    background: rgba(250, 100, 0, 0.06);
                    border-radius: 11px;
                    text-align: center;
                    line-height: 22px;
                    color: #f8323c;
                    margin-left: 10px;
                    font-size: 12px;
                    flex-shrink: 0;
                    cursor: pointer;
                }
            }
        }
        .giveClass {
            border-top: 1px solid #eee;
        }
        .addGoods {
            padding: 15px 0;
            .addTit {
                margin-left: 30px;
                height: 18px;
                width: 42px;
                background: linear-gradient(90deg, #ff6870, #f8323c);
                border-radius: 2px;
                text-align: center;
                line-height: 18px;
                font-size: 12px;
                color: #fff;
            }
            .addLi {
                font-size: 14px;
                color: #666;
                line-height: 24px;
                display: flex;
                text-align: center;
                div {
                    width: 16.5%;
                    flex-shrink: 0;
                }
                div:first-child {
                    width: 50%;
                    text-align: left;
                    padding-left: 30px;
                    box-sizing: border-box;
                }
            }
        }
    }
}
</style>
