<template>
    <base-popup ref="basePopup">
        <div class="content">
            <div class="content-left">
                <img :src="shareInfo.img" alt="" />
            </div>
            <div class="content-right">
                <h3>{{ shareInfo.viewTitle }}</h3>
                <div class="share-tips flex jc-between column">
                    <div>点击分享后，将以海报方式分享至上述渠道</div>
                    <div>用户可扫码海报，进入微信小程序查看课程详情</div>
                </div>
                <div class="share-tips2">
                    <img src="./asset/images/pointer.png" alt="" class="pointer-img" />
                    快快把好课，分享给你的好友吧
                </div>
                <div class="share-btn" @click="handleShare">去分享</div>
            </div>
            <img src="./asset/images/close.png" alt="" class="close-img" @click="handleClosePopup" />
        </div>
    </base-popup>
</template>
<script>
import basePopup from '../base-popup';
export default {
    name: 'sharePopupModel',
    components: {
        basePopup,
    },
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: '', //qq 、kongjian： qq空间 、 weibo： 微博
        },
        shareInfo: {
            type: Object,
            default: () => {
                return {
                    url: '',
                    title: '',
                    img: '',
                    viewTitle: '',
                };
            },
        },
    },
    data() {
        return {};
    },
    watch: {
        show(val) {
            this.$refs.basePopup.show = val;
        },
    },
    methods: {
        handleClosePopup() {
            this.$refs.basePopup.show = false;
            this.$emit('update:show', false);
        },
        handleShare() {
            let type = this.type; //qq 、kongjian： qq空间 、 weibo： 微博
            if (type == 'qq') {
                this.onMenuShareQQ();
            } else if (type == 'kongjian') {
                this.onMenuShareQzone();
            } else {
                this.onMenuShareWeibo();
            }
        },
        // 微博分享
        onMenuShareWeibo() {
            // count=表示是否显示当前页面被分享数量(1显示)(可选，允许为空)
            // &url=将页面地址转成短域名，并显示在内容文字后面。(可选，允许为空)
            // &appkey=用于发布微博的来源显示，为空则分享的内容来源会显示来自互联网。(可选，允许为空)
            // &title=分享时所示的文字内容，为空则自动抓取分享页面的title值(可选，允许为空)
            // &pic=自定义图片地址，作为微博配图(可选，允许为空)
            // &ralateUid=转发时会@相关的微博账号(可选，允许为空)
            // &language=语言设置(zh_cn|zh_tw)(可选)
            let url =
                'https://service.weibo.com/share/share.php?pic=' +
                encodeURIComponent(this.shareInfo.img) +
                '&url=' +
                encodeURIComponent(this.shareInfo.url) +
                '%230-tsina-1-32009-397232819ff9a47a7b7e80a40613cfe1&title=' +
                this.shareInfo.title;
            console.warn('onMenuShareWeibo', this.shareInfo);
            window.open(url + '&appkey=&searchPic=true#_loginLayer_1606211528644', '_blank');
        },
        // qq分享
        onMenuShareQQ() {
            let url =
                'https://connect.qq.com/widget/shareqq/index.html?url=' +
                encodeURIComponent(this.shareInfo.url) +
                '%230-sqq-1-10190-9737f6f9e09dfaf5d3fd14d775bfee85&title=' +
                this.shareInfo.title;
            console.warn('onMenuShareQQ', this.shareInfo);
            window.open(url + '&desc=&summary=&site=优路教育', '_blank');
        },
        // qq空间分享
        onMenuShareQzone() {
            let url =
                'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' +
                encodeURIComponent(this.shareInfo.url) +
                '%230-qzone-1-50071-d020d2d2a4e8d1a374a433f596ad1440&title=' +
                this.shareInfo.title +
                '&pics=' +
                encodeURIComponent(this.shareInfo.img);
            console.warn('onMenuShareQzone', this.shareInfo);
            window.open(url + '&desc=&summary=&site=优路教育', '_blank');
        },
    },
};
</script>
<style lang="less" scoped>
.content {
    width: 660px;
    height: 480px;
    background-color: #fff;
    border-radius: 16px;
    position: relative;
    padding: 24px 0 24px 24px;
    display: flex;
    .content-left {
        width: 270px;
        height: 432px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .content-right {
        width: 390px;
        height: 100%;
        h3 {
            font-size: 20px;
            line-height: 24px;
            color: #333;
            margin: 80px 0 24px;
            text-align: center;
        }
        .share-tips {
            width: 300px;
            height: 117px;
            padding: 24px 16px;
            margin: 0 auto 29px;
            background-color: #f6f7f9;
            font-size: 14px;
            line-height: 19px;
            color: #666;
        }
        .share-tips2 {
            width: 278px;
            height: 44px;
            margin: 0 auto 32px;
            padding: 0 24px 0 58px;
            position: relative;
            line-height: 44px;
            border-radius: 0 22px 22px 0;
            background-color: #f1f5ff;
            color: #333;
            .pointer-img {
                width: 42px;
                height: 64px;
                position: absolute;
                left: 0;
                bottom: 0;
            }
        }
        .share-btn {
            width: 208px;
            height: 46px;
            text-align: center;
            line-height: 46px;
            font-size: 16px;
            color: #fff;
            background: linear-gradient(to right, #3a85fe, #025eff);
            margin: 0 auto;
            border-radius: 23px;
            cursor: pointer;
        }
    }

    .close-img {
        width: 16px;
        height: 16px;
        display: block;
        position: absolute;
        right: 37px;
        top: 30px;
        cursor: pointer;
    }
}
</style>
