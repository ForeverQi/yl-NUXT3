<template>
    <div class="share-popup_box">
        <div class="title-box_share">
            <span>分享</span>
            <button class="img-div mr16 weixin" @click="generateQRCodePopup"></button>
            <button class="img-div mr16 qq" @click="handleShowHaiBao('qq')"></button>
            <button class="img-div mr16 kongjian" @click="handleShowHaiBao('kongjian')"></button>
            <button class="img-div weibo" @click="handleShowHaiBao('weibo')"></button>
        </div>
    </div>
</template>

<script>
import SharePopup from '../share-popup/index.vue';
export default {
    components: {
        SharePopup,
    },
    props: {
        /**
         * 文章数据
         */
        articleInfo: {
            type: Object,
            default: () => ({}),
        },
    },
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            showSharePopup: false,
            shareImg: '',
            qrCodeUrl: '',
        };
    },
    /**
     *
     */
    mounted() {},
    methods: {
        /**
         * 微信分享弹窗
         */
        generateQRCodePopup() {
            this.$baseUI
                .createModel(
                    {
                        modalContent: SharePopup,
                    },
                    {},
                    {
                        width: '320px',
                        height: '360px',
                        radius: '8px',
                        padding: '0',
                        showHead: false,
                    }
                )
                .then(({ type, ret }) => {
                    // if (type === 'close') {
                    // }
                });
        },
        /**
         *
         * @param {string} type 类型
         */
        handleShowHaiBao(type) {
            this.shareType = type;
            if (this.shareType === 'qq') {
                this.onMenuShareQQ();
            } else if (this.shareType === 'kongjian') {
                this.onMenuShareQzone();
            } else if (this.shareType === 'weibo') {
                this.onMenuShareWeibo();
            }
        },
        /**
         * qq分享
         */
        onMenuShareQQ() {
            let url = `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(
                location.href
            )}%230-sqq-1-10190-9737f6f9e09dfaf5d3fd14d775bfee85&title=${this.articleInfo.title}`;
            window.open(url + '&desc=&summary=&site=优路教育', '_blank');
        },
        /**
         * qq空间分享
         */
        onMenuShareQzone() {
            let url = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=
                ${encodeURIComponent(location.href)}%230-qzone-1-50071-d020d2d2a4e8d1a374a433f596ad1440&title=${this.articleInfo.title}&pics=`;
            window.open(url + '&desc=&summary=&site=优路教育', '_blank');
        },
        /**
         * 微博分享
         */
        onMenuShareWeibo() {
            // count=表示是否显示当前页面被分享数量(1显示)(可选，允许为空)
            // &url=将页面地址转成短域名，并显示在内容文字后面。(可选，允许为空)
            // &appkey=用于发布微博的来源显示，为空则分享的内容来源会显示来自互联网。(可选，允许为空)
            // &title=分享时所示的文字内容，为空则自动抓取分享页面的title值(可选，允许为空)
            // &pic=自定义图片地址，作为微博配图(可选，允许为空)
            // &ralateUid=转发时会@相关的微博账号(可选，允许为空)
            // &language=语言设置(zh_cn|zh_tw)(可选)
            let url = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(
                location.href
            )}%230-tsina-1-32009-397232819ff9a47a7b7e80a40613cfe1&title=${this.articleInfo.title}&pic=`;
            console.warn('onMenuShareWeibo', this.shareInfo);
            window.open(url + '&appkey=&searchPic=true#_loginLayer_1606211528644', '_blank');
        },
    },
};
</script>

<style lang="less" scoped>
.share-popup_box {
    position: relative;
    .popup-parent {
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1;
    }
    .title-box_share {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #999999;
        span {
            margin-right: 10px;
        }
        .img-div {
            width: 32px;
            height: 32px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-color: transparent;
            cursor: pointer;
        }
        .weixin {
            background-image: url('@/www/components/course/trial-course/right/right-share-box/asset/images/weixin.png');
        }
        .weixin:hover {
            background-image: url('@/www/components/course/trial-course/right/right-share-box/asset/images/weixin-hover.png');
        }

        .qq {
            background-image: url('@/www/components/course/trial-course/right/right-share-box/asset/images/qq.png');
        }
        .qq:hover {
            background-image: url('@/www/components/course/trial-course/right/right-share-box/asset/images/qq-hover.png');
        }

        .kongjian {
            background-image: url('@/www/components/course/trial-course/right/right-share-box/asset/images/kongjian.png');
        }
        .kongjian:hover {
            background-image: url('@/www/components/course/trial-course/right/right-share-box/asset/images/kongjian-hover.png');
        }

        .weibo {
            background-image: url('@/www/components/course/trial-course/right/right-share-box/asset/images/weibo.png');
        }
        .weibo:hover {
            background-image: url('@/www/components/course/trial-course/right/right-share-box/asset/images/weibo-hover.png');
        }
    }
    .share-popup-footer {
        width: 100%;
        color: #333333;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
    }
}
.paper-title-wrap {
    .title {
        color: #3a3d4b;
        font-size: 16px;
        font-weight: 700;
    }
}
</style>
