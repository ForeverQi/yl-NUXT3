<template>
    <div v-if="isShow" class="coupon-qrcode-dialog">
        <div class="container">
            <div class="title">手机扫一扫</div>
            <div class="subtitle">{{ couponDetail.goodsType === 'single' ? '使用优惠券购课' : '查看优惠券可用商品' }}</div>
            <div class="qrcode-wrapper">
                <vb-jrcode :option="option"></vb-jrcode>
            </div>
            <div class="link-wrap">
                <div class="value">{{ goodsUrl }}</div>
                <div class="copy" @click="handleCopy">复制链接</div>
            </div>
            <div v-if="isShowMsg" class="msg-tip">已复制</div>
            <div class="close" @click="$emit('update:isShow', false)"></div>
        </div>
    </div>
</template>

<script>
import vbJrcode from '@/www/components/uc/manager/order/vbJrcode/index.vue';
export default {
    name: 'coupon-qrcode',
    components: {
        vbJrcode,
    },
    props: {
        // 是否显示
        isShow: {
            type: Boolean,
            default: false,
        },
        // 优惠券详情
        couponDetail: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    /**
     * @returns {object} 默认数据设置;
     */
    data() {
        return {
            activeIndex: 0,
            option: {
                width: 180,
                height: 180,
                text: ' ',
            },
            setTime: null, // 定时器
            isShowMsg: false, // 是否显示轻提示
        };
    },
    computed: {
        /**
         * 获取商品链接
         *
         * @returns {string} 链接地址;
         */
        goodsUrl() {
            console.log(this.$nuxt.context.env.config.goods_coupon_url);
            let url =
                this.couponDetail.goodsType === 'single' ? this.$nuxt.context.env.config.goods_coupon_url : this.$nuxt.context.env.config.goods_list_coupon_url;
            return this.couponDetail.goodsType === 'single'
                ? `${url}?classtypeId=${this.couponDetail.productId}&cType=YOULU.WEB`
                : `${url}?couponId=${this.couponDetail.couponId}&userCouponId=${this.couponDetail.userCouponId}&cType=YOULU.WEB`;
        },
    },
    /**
     * 初始化加载
     */
    created() {
        this.option.text = this.goodsUrl;
    },
    methods: {
        /**
         * 点击复制
         */
        handleCopy() {
            clearTimeout(this.setTime);
            this.isShowMsg = true;
            let input = document.createElement('input');
            document.body.appendChild(input);
            input.setAttribute('value', this.goodsUrl);
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
            }
            document.body.removeChild(input);
            this.setTime = setTimeout(() => {
                this.isShowMsg = false;
            }, 2000);

            this.$emit('copy-coupon', this.couponDetail);
        },
    },
};
</script>

<style scoped lang="less">
.coupon-qrcode-dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    position: relative;
    width: 384px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 56px 0 43px;
    background: url(./asset/images/bg.png) left top/100% 100% no-repeat;

    .title {
        font-size: 20px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 16px;
    }

    .subtitle {
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 24px;
        color: #333333;
    }

    .qrcode-wrapper {
        padding: 10px;
        box-sizing: border-box;
        background: #ffffff;
        border: 2px solid #868a9d;
        border-radius: 4px;
        margin-bottom: 20px;
        /deep/ img {
            vertical-align: middle;
        }
    }

    .link-wrap {
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        width: auto;
        height: 28px;
        font-size: 12px;
        color: #333333;
        background: #ffffff;
        border: 0.5px solid #c3c9d7;
        border-radius: 14px;

        .value {
            padding-left: 12px;
            width: 162px;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .copy {
            width: 72px;
            height: 28px;
            cursor: pointer;
            font-size: 12px;
            color: #333333;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 28px;
            background: #d1d7e4;
            border-radius: 0 14px 14px 0;
            border-radius: 14px;
        }
    }

    .msg-tip {
        position: absolute;
        left: 0;
        bottom: 20px;
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #67c23a;
        margin-top: 10px;
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
        width: 24px;
        height: 24px;
        background: url(./asset/images/close.png) left top/100% 100% no-repeat;
        cursor: pointer;
    }
}
</style>
