<script lang="jsx">
export default {
    name: 'AdBottom',
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
            this.$yiguan.track('youlu_bottom_ads_appear', data);
        },
        clickTrack() {
            const data = {
                adv_name: this.itemData.adName, // 广告名称
                adv_url: this.itemData.adLink, // 广告url
            };
            this.$yiguan.track('youlu_click_bottom_ads', data);
        },
        doClose() {
            const data = {
                adv_name: this.itemData.adName, // 广告名称
                adv_url: this.itemData.adLink, // 广告url
            };
            this.$yiguan.track('youlu_bottom_ads_closed', data);
            this.$emit('close-ad-bottom');
        },
        // 易观埋点
        clickYiguan(item) {
            this.trackWebYouluClickBottomColumn({
                bottom_title: item.name,
                page_name: document.title || '-',
                page_belong_type: '专题页面',
            });
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
            <div class="ad-bottom">
                <div class="close" onClick={this.doClose}></div>
                <a href={link} onClick={this.clickTrack} target={target}>
                    <img src={this.$urlUtils.getViewUrl(this.itemData.adPicture)} class="img" />
                </a>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.ad-bottom {
    height: 80px;
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 60;

    .img {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        min-width: 1200px;
        height: 100%;
    }

    .close {
        position: absolute;
        top: 28px;
        right: 48px;
        width: 32px;
        height: 32px;
        background-image: url(./asset/images/close.png);
        background-size: 100% 100%;
        cursor: pointer;
        z-index: 1;
    }
}
</style>
