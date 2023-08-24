<template>
    <div class="share-popup">
        <div class="share-popup_content">
            <div class="share-head">
                <span>分享</span>
                <img @click="$emit('doClose', 'close')" src="../../asset/images/popup-close.png" />
            </div>
            <div class="share-code">
                <img :src="shareImg" alt="" class="share-img" />
            </div>
            <div class="share-text">手机扫描</div>
            <div class="share-url">
                <div class="share-content">{{ url }}</div>
                <div class="share-btn" @click="copyText(url)">复制链接</div>
            </div>
        </div>
        <div class="share-bgc">
            <img src="../../asset/images/weixin-popup.png" />
        </div>
    </div>
</template>

<script>
import QRCode from 'qrcode';
export default {
    props: {},
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            shareImg: '',
            url: location.href,
        };
    },
    /**
     * mounted生命周期
     */
    mounted() {
        this.generateQRCodeUrl();
    },
    methods: {
        /**
         * 将当前页面的url生成二维码
         */
        generateQRCodeUrl() {
            const url = location.href;
            const options = {
                width: 160, // 二维码宽度
                height: 160, // 二维码高度
            };

            QRCode.toDataURL(url, options, (error, url) => {
                if (error) {
                    console.error(error);
                } else {
                    this.shareImg = url;
                }
            });
        },
        /**
         *  复制链接
         *
         * @param {string} text 链接的url
         */
        copyText(text) {
            let inputNode = document.createElement('input');
            inputNode.value = text;
            document.body.appendChild(inputNode);
            // 复制关键
            inputNode.select();

            let supportExec = true; //true 支持复制功能 复制成功
            if (document.execCommand && typeof document.execCommand == 'function') {
                supportExec = document.execCommand('Copy');
            } else {
                supportExec = false; //不支持  复制失败
            }

            if (supportExec) {
                this.$Message.success('复制成功');
            } else {
                this.$baseUI.alert('复制失败');
            }

            document.body.removeChild(inputNode);
        },
    },
};
</script>

<style lang="less" scoped>
.share-popup {
    width: 320px;
    height: 360px;
    box-sizing: border-box;
    // background: url('../../asset/images/weixin-popup.png') 100% 100% no-repeat;
    .share-popup_content {
        position: relative;
        z-index: 2;
    }
    .share-bgc {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        transform: scale(1.2);
        img {
            width: 100%;
            height: 100%;
        }
    }
    .share-code {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .share-img {
        width: 160px;
        height: 160px;
        box-shadow: 0px 0px 9px 0px rgba(200, 200, 200, 0.3);
    }
    .share-text {
        color: #333333;
        text-align: center;
        font-size: 16px;
        margin-bottom: 24px;
    }
    .share-url {
        width: 289px;
        height: 40px;
        background: #f5f6fa;
        border: 1px solid rgba(141, 144, 170, 0.1);
        border-radius: 21px;
        font-size: 15px;
        color: #99a1af;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        margin: 0 auto;
    }
    .share-content {
        width: 100%;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        padding: 10px 16px;
        box-sizing: border-box;
    }
    .share-btn {
        width: 92px;
        height: 40px;
        border-radius: 19px;
        color: #f5f6fa;
        font-size: 15px;
        background-color: #8d90aa;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .share-head {
        display: flex;
        justify-content: space-between;
        padding: 21px 10px 25px 24px;
        span {
            color: #3a3d4b;
            font-weight: 700;
            font-size: 16px;
        }
        img {
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
    }
}
</style>
