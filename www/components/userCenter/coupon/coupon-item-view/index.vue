<template>
    <div class="coupon-item" :class="{ 'coupon-item-used': isCouponNoUse }">
        <div class="amount">
            <div class="mark" v-if="isOrderShow">
                <img src="./asset/images/mark.png" />
            </div>
            <div class="amount-content">
                <div class="full-discount" v-if="couponDetail.couponType !== 'discount'">
                    <label>￥</label>
                    <span>
                        {{
                            (couponDetail.couponType === 'full-discount' ? couponAmountDetail.satisfyPrice : couponAmountDetail.immediatelyPrice) | veMoneyCent
                        }}
                    </span>
                </div>
                <div class="full-discount-tip" v-if="couponDetail.couponType !== 'discount'">
                    <span v-if="couponDetail.couponType === 'full-discount'">满{{ couponAmountDetail.satisfyCondition | veMoneyCent }}元可用</span>
                    <span v-else>立减</span>
                </div>
                <div class="discount" v-if="couponDetail.couponType === 'discount'">
                    <label>{{ couponAmountDetail.discount }}</label>
                    <span>折</span>
                </div>
            </div>
        </div>
        <div class="coupon-detail">
            <div class="coupon-detail-content">
                <div class="info">
                    <div class="name">{{ couponDetail.couponName }}</div>
                    <div class="date">{{ userUsageStartTime }} 至 {{ userUsageEndTime }}</div>
                </div>
                <div class="explain">
                    <div class="explain-title" :class="{ active: isShowExplain }" @click="handleExplain">使用说明</div>
                    <span v-if="isShowOperation && !isCouponNoUse" class="button" @click="handle">
                        {{ couponDetail.goodsType === 'single' ? '立即使用' : '可用商品' }}
                    </span>
                </div>
                <img
                    v-if="isShowOperation && isCouponNoUse"
                    class="used-bg"
                    :src="require(isExpired ? './asset/images/expired.png' : './asset/images/consumed.png')"
                    alt="图片占位"
                />
            </div>
        </div>
        <div class="explain-container" v-show="isShowExplain">
            <div class="content">
                <div class="item" v-for="(item, index) in couponDetail.rules" :key="index">
                    <span>{{ item }}</span>
                </div>
            </div>
            <div class="popper_arrow"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'coupon-item-view',
    props: {
        // 优惠券详情
        couponDetail: {
            type: Object,
            default: () => {
                return {};
            },
        },
        // 是否显示操作按钮
        isShowOperation: {
            type: Boolean,
            default: true,
        },
        isOrderShow: {
            type: Boolean,
            default: false,
        },
    },

    /**
     * @returns {object} 默认数据设置;
     */
    data() {
        return {
            isShowExplain: false, // 是否显示使用说明
        };
    },
    computed: {
        /**
         * 格式化优惠券金额数据格式
         *
         * @returns {object} 优惠券金额数据
         */
        couponAmountDetail() {
            let couponAmountDetail = {};
            if (this.couponDetail.couponAmountDetail && typeof this.couponDetail.couponAmountDetail === 'string') {
                couponAmountDetail = JSON.parse(this.couponDetail.couponAmountDetail);
            }
            return couponAmountDetail;
        },
        /**
         * 格式化优惠券使用开始时间
         *
         * @returns {string} 时间
         */
        userUsageStartTime() {
            return this.couponDetail.userUsageStartTime ? this.couponDetail.userUsageStartTime.substring(0, 16).replace(/-/g, '.') : '';
        },
        /**
         * 格式化优惠券使用结束时间
         *
         * @returns {string} 时间
         */
        userUsageEndTime() {
            return this.couponDetail.userUsageEndTime ? this.couponDetail.userUsageEndTime.substring(0, 16).replace(/-/g, '.') : '';
        },
        /**
         * 优惠券是否是不可使用状态
         *
         * @returns {boolean}  true/false
         */
        isCouponNoUse() {
            // 'frozen',
            let arr = [];
            if (this.isOrderShow === true) {
                arr = ['consumed', 'expired'];
            } else {
                arr = ['frozen', 'consumed', 'expired'];
            }
            return arr.indexOf(this.couponDetail.useStatus) !== -1;
        },

        /**
         * 优惠券是否是已过期状态状态
         *
         * @returns {boolean}  true/false
         */
        isExpired() {
            return this.couponDetail.useStatus === 'expired';
        },
    },
    methods: {
        /**
         * 点击使用
         */
        handle() {
            console.log('立即使用');
            this.$emit('handle-button', this.couponDetail);
        },

        /**
         * 点击使用说明
         */
        handleExplain() {
            this.isShowExplain = !this.isShowExplain;
            this.$emit('change-explain', this.couponDetail.userCouponId);
        },
    },
};
</script>

<style scoped lang="less">
.coupon-item {
    position: relative;
    width: 431px;
    height: 126px;
    display: flex;
    background: url(./asset/images/bg.png) left top/100% 100% no-repeat;
    .amount {
        width: 120px;
        height: 122px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #f8323c;
        background: url(./asset/images/price.png) left top/ 100% 100% no-repeat;
        margin: 2px 0 2px 2px;
        .mark {
            position: absolute;
            top: 0;
            right: 0;
            height: 30px;
            width: 30px;

            img {
                width: 100%;
                height: 100%;
            }
        }
        .full-discount {
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            justify-content: center;
            label {
                font-weight: 700;
                font-size: 16px;
            }
            span {
                font-weight: 700;
                font-size: 24px;
            }
        }

        .full-discount-tip {
            font-weight: 400;
            font-size: 12px;
            text-align: center;
        }

        .discount {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            label {
                font-weight: 700;
                font-size: 24px;
            }
            span {
                font-weight: 400;
                font-size: 12px;
                margin-left: 2px;
                margin-top: 2px;
            }
        }
    }

    .coupon-detail {
        flex: 1;
        padding: 6px 2px 6px 0;
        box-sizing: border-box;
        .coupon-detail-content {
            position: relative;
            width: 100%;
            height: 100%;
            padding: 10px 24px 6px 24px;
            box-sizing: border-box;
            border-left: 1px dashed #ff737a;
        }

        .info {
            .name {
                font-size: 15px;
                font-weight: 600;
                color: #3a3d4b;
                margin-bottom: 8px;
                text-overflow: -o-ellipsis-lastline;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .date {
                font-size: 12px;
                font-weight: 400;
                color: #99a1af;
            }
        }

        .explain {
            position: absolute;
            bottom: 8px;
            left: 0;
            width: 100%;
            padding: 0 24px;
            height: 28px;
            display: flex;
            box-sizing: border-box;
            align-items: center;
            justify-content: space-between;

            .explain-title {
                font-size: 12px;
                color: #99a1af;
                display: flex;
                align-items: center;
                cursor: pointer;

                &:after {
                    content: '';
                    width: 12px;
                    height: 12px;
                    background: url(./asset/images/arrows.png) left top/100% 100% no-repeat;
                    margin-left: 2px;
                }

                &.active {
                    &:after {
                        transform-origin: center;
                        transform: rotate(180deg);
                    }
                }
            }

            .button {
                width: 72px;
                height: 28px;
                background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
                border-radius: 21px;
                font-size: 12px;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
            }
        }

        .used-bg {
            position: absolute;
            right: 0;
            bottom: -4px;
            width: 62px;
            height: 59px;
        }
    }

    .explain-container {
        position: absolute;
        left: 0;
        top: 140px;
        width: 100%;
        padding: 17px 15px;
        z-index: 1;
        box-shadow: 0 0 13px 1px rgba(51, 51, 51, 0.1);
        border-radius: 8px;
        background: #ffffff;
        border: 1px solid #f2f2f2;
        box-sizing: border-box;

        .popper_arrow {
            position: absolute;
            display: block;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
            border-width: 10px;
            top: -10px;
            left: 160px;
            border-top-width: 0;
            border-bottom-color: #f2f2f2;
            &:after {
                position: absolute;
                display: block;
                width: 0;
                height: 0;
                border-color: transparent;
                border-style: solid;
                content: '';
                border-width: 10px;
                top: 1px;
                margin-left: -10px;
                border-top-width: 0;
                border-bottom-color: #fff;
            }
        }
        .content {
            font-size: 12px;
            font-weight: 400;
            color: #99a1af;
            line-height: 20px;
            text-align: justify;

            .item {
                display: flex;
                &:before {
                    content: '';
                    width: 4px;
                    height: 4px;
                    background: #c0c2d0;
                    border-radius: 50%;
                    margin: 9px 6px 0 0;
                }
                span {
                    flex: 1;
                    word-break: break-all;
                }
            }
        }
    }

    &.coupon-item-used {
        background-image: url(./asset/images/black-bg.png);
        .amount {
            width: 122px;
            height: 126px;
            color: #7d7f8f;
            background-image: url(./asset/images/black-price.png);
            margin: 0;
        }
        .coupon-detail {
            .coupon-detail-content {
                border-left-color: #989898;
            }
        }
    }
}
</style>
