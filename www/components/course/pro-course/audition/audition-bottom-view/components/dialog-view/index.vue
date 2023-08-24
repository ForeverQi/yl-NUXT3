<script lang="jsx">
import QRCode from 'qrcode';
export default {
    name: 'AuditionDialogView',
    props: {
        pageUrl: {
            type: String,
            default: '',
        },
    },
    /**
     * @returns {object} 默认值初始化
     */
    data() {
        return {
            qrcodeUrl: '',
        };
    },
    /**
     * 初始化回调钩子
     */
    mounted() {
        this.init();
    },
    methods: {
        /**
         * 初始化方法
         */
        init() {
            this.$nextTick(() => {
                QRCode.toDataURL(this.pageUrl, (err, url) => {
                    console.log(url, err);
                    this.qrcodeUrl = url;
                });
            });
        },
    },
    /**
     *@returns {object} vue虚拟dom
     */
    render() {
        return (
            <div class="dialog-wrap">
                <div class="title">手机扫一扫，分享给好友</div>
                <div class="qrcode-wrap">
                    <img src={this.qrcodeUrl} class="img" />
                </div>
                <div class="show-txt">
                    <div class="txt">{this.pageUrl}</div>
                    <div
                        class="copy-btn"
                        onClick={(e) => {
                            let inputDom = document.createElement('input');
                            inputDom.setAttribute('readonly', 'readonly');
                            inputDom.value = this.pageUrl;
                            document.body.appendChild(inputDom);
                            inputDom.select();
                            document.execCommand('Copy');
                            inputDom.style.display = 'none';
                            inputDom.remove();
                            this.$Message.success('复制成功');
                        }}
                    >
                        复制链接分享
                    </div>
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.dialog-wrap {
    position: absolute;
    bottom: 50px;
    right: 20px;
    width: 364px;
    height: 400px;
    z-index: 2;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url('./asset/images/bg.png');

    .title {
        padding-top: 50px;
        font-size: 20px;
        font-weight: 700;
        text-align: left;
        color: #333333;
        line-height: 24px;
        text-align: center;
    }

    .qrcode-wrap {
        width: 200px;
        height: 200px;
        background: #ffffff;
        border: 2px solid #868a9d;
        border-radius: 16px;
        margin: 0 auto;
        margin-top: 24px;
        overflow: hidden;

        .img {
            width: 100%;
            height: 100%;
        }
    }

    .show-txt {
        display: flex;
        justify-content: space-between;
        width: 310px;
        height: 36px;
        background: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 19px;
        margin: 0 auto;
        margin-top: 24px;

        .txt {
            width: 100%;
            font-size: 14px;
            text-align: left;
            color: #3a3d4b;
            line-height: 36px;
            white-space: nowrap;
            overflow: hidden;
            margin-left: 24px;
            margin-right: 20px;
        }

        .copy-btn {
            flex-shrink: 0;
            width: 116px;
            height: 36px;
            background: #e3e5eb;
            border: 1px solid #f5f6fa;
            border-radius: 19px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            color: #3a3d4b;
            line-height: 36px;
        }
    }
}
</style>
