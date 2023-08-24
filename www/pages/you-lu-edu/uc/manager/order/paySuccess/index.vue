<template>
    <div class="payDetail">
        <div class="py_ordercont">
            <div>
                <div class="py_odcrm">
                    <img src="./asset/images/true.png" />
                    <p style="font-size: 26px; margin-top: 10px">操作成功</p>
                    <p style="font-size: 16px; color: #ccc; margin-top: 30px">刚支付完成的订单状态可能无法立即变更为已付款，请耐心等待系统预处理完成.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'payLayout',
    mounted() {
        if (this.isMobile()) {
            if (process.env.config) {
                if (process.env.config) {
                    this.$PageUtil.mobileHref('/uc/order/paySuccess');
                }
            }
        }
    },
    methods: {
        isMobile() {
            if (
                navigator.userAgent.match(
                    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                )
            ) {
                return true;
            }
            return false;
        },
    },
};
</script>

<style scoped lang="less">
.payDetail {
    div {
        box-sizing: content-box;
    }
    a {
        text-decoration: none;
        color: #999;
    }
    body {
        background: #fff;
    }
    .clear {
        clear: both;
    }
    .w1100 {
        width: 1200px;
        margin: 0 auto;
    }
    .py_ordercont {
        padding: 40px 0 40px;
        background: #f4f4f4;
    }
    .py_odcrm {
        background: #fff;
        padding: 245px 30px;
        text-align: center;
    }
}
</style>
