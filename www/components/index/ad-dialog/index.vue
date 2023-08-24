<script lang="jsx">
export default {
    name: 'AdDialog',
    props: {
        itemData: {
            type: Object,
            default() {
                return {
                    adPicture: '',
                    adLink: '',
                };
            },
        },
    },
    mounted() {
        this.track();
    },
    methods: {
        track() {
            // 广告展示时的埋点
            const data = {
                adv_name: this.itemData.adName, // 广告名称
                adv_url: this.itemData.adLink, // 广告url
            };
            this.$yiguan.track('youlu_pop_up_ads_appear', data);
        },
        clickTrack() {
            // 广告展示时的埋点
            const data = {
                adv_name: this.itemData.adName, // 广告名称
                adv_url: this.itemData.adLink, // 广告url、
            };

            this.$yiguan.track('youlu_click_pop_up_ads', data);
        },
        closeDialog(ev) {
            ev.preventDefault();
            // 广告展示时的埋点
            const data = {
                adv_name: this.itemData.adName, // 广告名称
                adv_url: this.itemData.adLink, // 广告url
            };

            this.$yiguan.track('youlu_pop_up_ads_closed', data);
            this.$emit('close-dialog');
        },
    },
    render() {
        let link = this.itemData.adLink;
        let target = '_blank';
        if (!link) {
            link = 'javascript:void(0)';
            target = '_self';
        }
        return (
            <div class="wrap-dialog">
                <div class="box">
                    <div class="close" onClick={this.closeDialog}></div>
                    <a
                        href={link}
                        onClick={() => {
                            this.clickTrack();
                        }}
                        target={target}
                    >
                        <img src={this.$urlUtils.getViewUrl(this.itemData.adPicture)} class="img" />
                    </a>
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.wrap-dialog {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 60;
    background-color: rgba(0, 0, 0, 0.6);

    .box {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        width: 460px;
        height: 500px;
        padding-top: 60px;

        a {
            display: block;
            width: 100%;
            height: 500px;
        }

        .img {
            max-width: 100%;
            max-height: 100%;
        }
        .close {
            position: absolute;
            top: 2px;
            right: 0;
            width: 36px;
            height: 36px;
            z-index: 10;
            background-image: url(./asset/images/close.png);
            background-size: 100% 100%;
            cursor: pointer;
        }
    }
}
</style>
