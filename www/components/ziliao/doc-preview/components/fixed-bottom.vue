<template>
    <div :class="['content-left-inner-box-bottom', isFixed ? ' bottom-fixed' : '']" v-if="!isFull">
        <div class="content-btns-left">
            <!-- 缩放按钮 -->
            <img src="../asset/images/fang.png" alt="" @click="handleLookFullScreen" class="icon-fang ml16" />
            <!-- 点赞 -->
            <div class="like-btn-box">
                <img :src="praiseStatus == 'Y' ? praiseStatus_Y : praiseStatus_N" alt="" class="link-btn" @click="handlePraise" />
                <span>({{ file.docLikecount || 0 }})</span>
            </div>
            <!-- 分享按钮 -->
            <div class="share-box">
                <img src="../asset/images/initShare.png" alt="" class="share-btn mr8 initShare" @click="handleShare" />
                <span class="share-text" @click="handleShare">分享</span>
                <div class="share-hover-box">
                    <information-share :file="file" :type="file.docPackstatus === 'Y' ? 'pack' : 'doc'" />
                    <div class="san-jiao"></div>
                </div>
            </div>
        </div>
        <div class="page-num-box">
            <span class="page-num">{{ index }}</span>
            <span class="page-total">/</span>
            <span class="page-total">{{ file.docPagenum }}</span>
        </div>
        <div class="content-btns-right">
            <!-- 从属资料包时显示此文字 -->
            <span v-if="file.docIdPack === 'Y'" class="pack-text">本条资料</span>
            <template v-if="file.isOwned === 'Y'">
                <!-- 已购买 -->
                <div class="price-text" v-if="file.isOwned === 'Y'">已购</div>
            </template>
            <template v-else>
                <!--免费  -->
                <div class="price-text" v-if="file.docAccess === 'F'">免费</div>

                <template v-if="file.docAccess === 'C'">
                    <!-- 付费 -->
                    <div class="price-text" v-if="isTimeLimit === 'N' || file.docPromotiontype === 'N'">
                        <span class="price-money">{{ file.docPrice | veMoneyCent }}</span>
                    </div>
                    <!-- 特价 -->
                    <div class="price-text" v-if="file.docPromotiontype === 'S'">
                        <span>特价</span>
                        <span class="price-money">{{ file.docPromotionprice | veMoneyCent }}</span>
                    </div>
                    <template v-if="isTimeLimit === 'Y'">
                        <!-- 限时免费 -->
                        <div class="price-text" v-if="file.docPromotiontype === 'F'">
                            <span>限时免费</span>
                            <span class="price-money">0</span>
                        </div>
                        <!-- 限时特价 -->
                        <div class="price-text" v-if="file.docPromotiontype === 'L'">
                            <span>限时特价</span>
                            <span class="price-money">{{ file.docPromotionprice | veMoneyCent }}</span>
                        </div>
                    </template>
                </template>
            </template>

            <div class="downlaodBtn" @click="downloadDoc(file, file.docPackstatus === 'Y' ? '【资料包详情页-下载资料按钮】' : '【资料详情页-下载资料按钮】')">
                下载本资料
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/dc/api.DC2001.doc-add-praise.js';
import MixIn from '../../mixin/index.js';
import CountDown from '../../mixin/countDown';
import InformationShare from '@/www/components/ziliao/share/index.vue'; //分享资料

export default {
    name: 'fixedBottom',
    components: {
        InformationShare,
    },
    mixins: [MixIn, CountDown],
    props: {
        //是否固定
        isFixed: {
            type: Boolean,
            default: false,
        },
        //宽度
        width: {
            type: Number,
            default: 0,
        },
        //预览页码
        index: {
            type: Number,
            default: 0,
        },
        //资料详情
        file: {
            type: Object,
            default: () => {},
        },
        //是否点赞
        praiseStatus: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            isFull: false,
            showShare: false,
            praiseStatus_N: require('../asset/images/initLike.png'),
            praiseStatus_Y: require('../asset/images/like.png'),

            pageType: 'info',
            pageData: this.file,
        };
    },
    fetch() {
        if (this.$platform.isClient()) {
            this.initDown();
        }
        return Promise.resolve();
    },
    methods: {
        // 打开分享
        handleShare() {
            this.$emit('handleShare');
        },
        // 全屏
        handleLookFullScreen() {
            this.$emit('lookFullScreen', true);
            this.isFull = true;
        },
        // 点赞
        async handlePraise() {
            const isLogin = await this.userLogin();
            if (!isLogin) {
                this.loginAndClue({}, '资料-下载').then(() => {
                    this.$PageUtil.reflush();
                });
            } else {
                //资料点赞
                this.$callApi('dc/doc-add-praise', {
                    docId: this.file.docId,
                    onsuccess: (res) => {
                        if (this.praiseStatus == 'N') {
                            // 没点赞 点赞次数加一
                            this.$emit('doc-praise');
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            }
        },
    },
};
</script>

<style lang="less" scoped>
.content-left-inner-box-bottom {
    position: relative;
    width: 852px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border-radius: 8px;
    .icon-fang,
    .link-btn,
    .share-btn {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
    .downlaodBtn {
        width: 163px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        cursor: pointer;
        font-size: 12px;
        background: -webkit-linear-gradient(301deg, #ff737a 0%, #f8323c 100%); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(301deg, #ff737a 0%, #f8323c 100%); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(301deg, #ff737a 0%, #f8323c 100%); /* Firefox 3.6 - 15 */
        background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%); /* 标准的语法（必须放在最后） */
    }
    .initShare {
        display: block;
    }
    .icon-fang {
        margin-right: 32px;
    }
    .link-btn {
        margin-right: 6px;
    }
    .like-btn-box {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #99a1af;
        margin-right: 33px;
    }
    .share-text {
        font-size: 12px;
        color: #99a1af;
        flex-shrink: 0;
    }
    // 价格文字样式
    .pack-text,
    .price-text {
        font-size: 12px;
        color: #ff2e30;
    }
    .price-money {
        &::before {
            content: '¥';
            font-size: 12px;
        }
    }
    .pack-text {
        margin-right: 5px;
    }
    .price-text {
        margin-right: 16px;
    }
    .share-box {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        .share-hover-box {
            display: none;
            align-items: center;
            position: relative;
            width: 258px;
            height: 56px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0px 2px 10px 2px rgba(11, 42, 113, 0.1);
            .share {
                margin: 0 auto;
            }
            .san-jiao {
                position: absolute;
                border-color: #fff transparent transparent transparent;
                border-style: solid;
                border-width: 6px 14px 0 14px;
                height: 0;
                width: 0;
                top: 56px;
                left: 22px;
            }
        }
        &:hover {
            .share-hover-box {
                display: flex;
                top: -50px;
                left: -54px;
            }
        }
    }
    .content-btns-left {
        display: flex;
        align-items: center;
    }
    .content-btns-right {
        display: flex;
        align-items: center;
    }
}
.bottom-fixed {
    position: fixed;
    bottom: 0;
    z-index: 51;
}
.page-num-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); /* 50%为自身尺寸的一半 */
    .page-num {
        color: #ff2e30;
        font-size: 12px;
    }
    .page-total {
        font-size: 12px;
        color: #99a1af;
    }
}

.mr32 {
    margin-right: 32px;
}
.mr22 {
    margin-right: 22px;
}
</style>
