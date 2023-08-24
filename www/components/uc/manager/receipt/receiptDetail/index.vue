<template>
    <ul class="payContent">
        <li class="payLi" v-for="(item, index) in receiptList" :key="index">
            <div class="liTtitle">
                <span class="title-label">订单编号：</span>
                <span>{{ item.orderId }}</span>
            </div>
            <div class="liCont">
                <ul class="contTop">
                    <li v-for="(it, _index) in item.content" :key="_index" class="grade-item">
                        <span class="contTopLeft">
                            <!-- <span class="nums">{{ index + 1 }}</span> -->
                            {{ it.gradeName }}
                        </span>
                        <span class="contTopRight">原价：￥{{ it.price }}</span>
                    </li>
                </ul>

                <div class="liBot">
                    <input class="detailButton" @click="dowmLoad(item)" type="button" value="下载收据" />
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        receiptList: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        dowmLoad(item) {
            this.$emit('dowmload', item);
        },
    },
};
</script>

<style lang="less" scoped>
.payContent {
    padding: 21px 20px;
    font-size: 16px;
    color: #333;
}
.payLi + .payLi {
    margin-top: 25px;
}
.payLi {
    border: 1px solid #ecedf6;
    .liTtitle {
        border-bottom: 1px solid rgba(242, 242, 242, 1);
        padding: 8px 21px;
        color: #99a1af;
        font-size: 14px;
        background-color: #f4f5f8;
        .date {
            margin-left: 64px;
        }
        .title-label {
            color: #77798d;
        }
    }
    .liCont {
        .contTop {
            padding: 25px 24px 24px 40px;
            .grade-item + .grade-item {
                margin-top: 12px;
            }
            .grade-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .contTopLeft {
                color: #3a3d4b;
                font-size: 16px;
                font-weight: bold;
            }
            .contTopRight {
                color: #9698a2;
                font-size: 12px;
            }
        }
    }
    .nums {
        height: 20px;
        width: 20px;
        background: #999;
        border-radius: 2px;
        text-align: center;
        line-height: 20px;
        margin-right: 10px;
        color: #fff;
    }
    .liBot {
        text-align: right;
        margin: 0 24px 24px 40px;
        .detailButton {
            color: #ff2e30;
            background-color: white;
            font-size: 14px;
            padding: 9.5px 20px 9.5px 46px;
            border-radius: 8px;
            border: 0.5px solid #ff2e30;
            cursor: pointer;
            background-image: url('./asset/images/down.png');
            background-repeat: no-repeat;
            background-size: 12px 15px;
            background-position: left 20px center;
        }

        .detailButton:hover {
            background-color: rgba(255, 46, 48, 0.1);
        }
    }
}
</style>
