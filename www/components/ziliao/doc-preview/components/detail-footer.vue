<template>
    <div>
        <!-- 免费-->
        <div class="doc-login-box flex column jc-center" v-if="file.docAccess === 'F' && !isLogined && file.docPagenum != file.docPreviewnum">
            <p class="login-text">已读{{ index }}页，剩余{{ remainPercent }}%未读，登录即可查看完整内容</p>
            <div class="login-btn" @click="handleLogin">立即登录</div>
        </div>
        <template v-if="file.docAccess === 'C' && file.isOwned === 'N' && file.docPagenum != file.docPreviewnum">
            <!-- 付费 -->
            <div class="doc-login-box flex column jc-center" v-if="isTimeLimit === 'N' || file.docPromotiontype === 'N'">
                <p class="login-text">已读{{ index }}页，剩余{{ remainPercent }}%未读，购买即可查看完整内容</p>
                <div class="buy-btn" @click="handlePay">立即购买</div>
                <p class="text-center fs-14 color-red price-money">{{ file.docPrice | veMoneyCent }}</p>
            </div>

            <!-- 限时免费 -->
            <div class="doc-login-box flex column jc-center" v-if="file.docPromotiontype === 'F' && !isLogined && isTimeLimit === 'Y'">
                <p class="login-text">已读{{ index }}页，剩余{{ remainPercent }}%未读，登录即可阅读全部</p>
                <div class="login-btn" @click="handleLogin">立即登录</div>
                <p class="text-center fs-14 flex jc-center ai-center">
                    <span class="color-red price-money">{{ file.docPromotionprice | veMoneyCent }}</span>
                    <span class="text-through fs-12 color-999 price-money">{{ file.docPrice | veMoneyCent }}</span>
                    <span class="line mlr-8 color-999"></span>
                    <img src="../asset/images/time.png" alt="" class="timeImg" />
                    <span class="color-999 font-12">{{ day }}天 {{ hr }}:{{ min }}:{{ sec }}</span>
                </p>
            </div>

            <!--  特价 -->
            <div class="doc-login-box flex column jc-center" v-if="file.docPromotiontype === 'S'">
                <p class="login-text">已读{{ index }}页，剩余{{ remainPercent }}%未读，购买即可查看完整内容</p>
                <div class="buy-btn" @click="handlePay">立即购买</div>
                <p class="text-center fs-14 color-red">
                    特价
                    <span class="price-money">{{ file.docPromotionprice | veMoneyCent }}</span>
                    <span class="line mlr-8 color-999"></span>
                    <span class="text-through fs-12 color-999 price-money">{{ file.docPrice | veMoneyCent }}</span>
                </p>
            </div>

            <!-- 限时特价 -->
            <div class="doc-login-box flex column jc-center" v-if="file.docPromotiontype === 'L' && isTimeLimit === 'Y'">
                <p class="login-text">已读{{ index }}页，剩余{{ remainPercent }}%未读，购买即可查看完整内容</p>
                <div class="buy-btn" @click="handlePay">立即购买</div>
                <p class="text-center fs-14 flex jc-center ai-center">
                    <span class="color-red price-money">{{ file.docPromotionprice | veMoneyCent }}</span>
                    <span class="text-through fs-12 color-999 price-money">{{ file.docPrice | veMoneyCent }}</span>
                    <span class="line mlr-8 color-999"></span>
                    <img src="../asset/images/time.png" alt="" class="timeImg" />
                    <span class="color-999 font-12">
                        <span v-if="day">{{ day }}天</span>
                        {{ hr }}:{{ min }}:{{ sec }}
                    </span>
                </p>
            </div>
        </template>
    </div>
</template>
<script>
import MixIn from '../../mixin/index.js';
import CountDown from '../../mixin/countDown';

export default {
    name: 'detail-footer',
    mixins: [MixIn, CountDown],
    props: {
        file: {
            type: Object,
            default: () => {},
        },
        //预览页码
        index: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            isLogined: false,
            pageType: 'info',
            pageData: this.file,
        };
    },
    async fetch() {
        if (this.$platform.isClient()) {
            this.isLogined = await this.userLogin();
            this.initDown();
        }
        return Promise.resolve();
    },
    computed: {
        remainPercent() {
            return Math.floor(((this.file.docPagenum - this.file.docPreviewnum) / this.file.docPagenum) * 100);
        },
    },
    methods: {
        // 登录弹窗
        handleLogin() {
            this.loginAndClue({}, '资料-登录引导').then(() => {
                this.$PageUtil.reflush();
            });
        },
        //立即购买
        async handlePay() {
            const isLogin = await this.userLogin();
            if (!isLogin) {
                // 弹出登录框
                this.loginAndClue({}, '资料-下载').then(() => {
                    this.$PageUtil.reflush();
                });
            } else {
                this.setClueInfo(this.file);
                this.cluePush();
                let skipUrl = window.location.href;
                let data = {
                    type: 'doc',
                    docId: this.file.docId,
                    packId: '',
                    skipUrl,
                };
                //从属资料包
                if (this.file.docIdPack) {
                    data.packId = this.file.packdocId;
                }
                this.docPay(data);
            }
        },
    },
};
</script>
<style lang="less" scoped>
.doc-login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
    margin-bottom: 10px;
    padding: 32px 0 42px;
    border-radius: 8px;
    .login-text {
        width: 500px;
        height: 16px;
        font-size: 12px;
        text-align: center;
        color: #77798d;
        line-height: 16px;
    }
    .login-btn,
    .buy-btn {
        width: 189px;
        height: 35px;
        text-align: center;
        line-height: 35px;
        color: #fff;
        font-size: 14px;
        margin: 10px auto 0;
        cursor: pointer;
        border-radius: 18px;
        background: -webkit-linear-gradient(301deg, #ff737a 0%, #f8323c 100%); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(301deg, #ff737a 0%, #f8323c 100%); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(301deg, #ff737a 0%, #f8323c 100%); /* Firefox 3.6 - 15 */
        background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%); /* 标准的语法（必须放在最后） */
    }
    .buy-btn,
    .login-btn {
        margin: 10px auto 16px;
    }
    .timeImg {
        width: 12px;
        height: 12px;
        margin-right: 6px;
    }
    .font-12 {
        font-size: 12px;
    }
    .text-through {
        margin-left: 4px;
    }
    .line {
        display: inline-block;
        width: 1px;
        height: 8px;
        background: #d8d8d8;
        border-radius: 1px;
    }
    .price-money {
        &::before {
            content: '¥';
            font-size: 12px;
        }
    }
}
</style>
