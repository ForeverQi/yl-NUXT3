<script>
import AuditionDialogView from './components/dialog-view/index.vue';
export default {
    /**
     * 默认值配置
     *
     * @returns {object} 初始值设置
     */
    data() {
        return {
            showQrcode: false,
            pageUrl: '',
        };
    },
    /**
     * 初始化回调钩子
     */
    mounted() {
        this.pageUrl = location.href;
    },
    /**
     *@returns {object} vue 虚拟dom对象
     */
    render() {
        return (
            <div
                class="bottom-view"
                onMouseleave={() => {
                    this.showQrcode = false;
                }}
            >
                {this.showQrcode && <AuditionDialogView page-url={this.pageUrl} />}
                <div
                    class="share"
                    onMouseenter={() => {
                        this.showQrcode = true;
                    }}
                >
                    分享给好友
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.bottom-view {
    height: 50px;
    display: flex;
    justify-content: flex-end;

    .share {
        font-size: 12px;
        text-align: left;
        color: #dddddd;
        line-height: 50px;
        margin-right: 20px;
        padding-left: 20px;
        cursor: pointer;
        background-image: url('./asset/images/share.png');
        background-size: 16px 16px;
        background-repeat: no-repeat;
        background-position: left center;
    }
}
</style>
