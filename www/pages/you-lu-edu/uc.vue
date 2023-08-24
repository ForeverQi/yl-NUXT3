<template>
    <div class="user-center-wrap">
        <div class="ads-wrapper" v-show="ads.adPicture">
            <a><img :src="ads.adPicture" class="ads" @click="handleAdClick" /></a>
        </div>
        <!-- <payment-tips :close-show="true" /> -->
        <div class="wrap-layout">
            <div class="side-nav">
                <side-nav />
            </div>
            <div class="content-wrap">
                <nuxt />
            </div>
        </div>
        <!-- <online /> -->
    </div>
</template>
<script>
// import online from '../components/online_repeat/index.vue';
import SideNav from '@/www/components/userCenter/SideNav/index.vue';
import '@/api/mcu/api.mcu-07.home-ad-pic.js';
import track from '@/www/components/course/trial-course/js/track.js';

export default {
    components: {
        SideNav,
        // online,
    },
    mixins: [track],
    layout: 'new-default',
    middleware({ route, redirect }) {
        if (route.path == '/uc' || route.path == '/uc/') {
            return redirect('/uc/manager/order/orderClass');
        }
    },
    data() {
        return { ads: { adLink: '', adPicture: '' } };
    },
    mounted() {
        this.getAdvertise();
    },
    methods: {
        getAdvertise() {
            return new Promise((resolve, reject) => {
                this.$callApi('home/home-ad-pic', {
                    lytCode: 'YLWEB_PCD01',
                    projectId: '',
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then((res) => {
                    const item = res.pop();
                    if (!item) {
                        return;
                    }
                    this.ads = item;
                    this.ads.adLink = item.adLink;
                    this.ads.adPicture = this.$urlUtils.getViewUrl(item.adPicture);
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                });
        },
        handleAdClick() {
            setTimeout(() => {
                window.open(this.ads.adLink, '_self');
            }, 200);
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: this.ads.adName,
                jump_type: this.ads.adLinkType === 1 ? 'URL链接' : this.ads.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: this.ads.adLinkType === 1 || this.ads.adLinkType === 2 ? this.ads.adLink : '',
                ad_position_name: `个人中心_顶部横幅`,
                page_name: document.title,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.suggestions {
    .idea {
        width: 36px;
        height: 54px;
        margin: 0 auto;
        background-image: url(./uc/asset/images/idea.png);
        background-size: 100%;
    }
    .txt {
        margin-top: -15px;
        text-align: center;
        line-height: 28px;
        font-size: 12px;
        color: #763709;
        width: 73px;
        height: 28px;
        background: linear-gradient(228deg, #f0c862 9%, #ffe7a4);
        border: 1px solid #ffffff;
        border-radius: 15px;
    }
}
.user-center-wrap {
    .wrap-layout {
        width: 1200px;
        margin: 0 auto;
        padding: 30px 0;
        display: flex;
        justify-content: space-between;

        .side-nav {
            flex-shrink: 0;
            width: 222px;
        }
        .content-wrap {
            margin-left: 16px;
            flex: 1;
            background-color: white;
            width: 100%;
        }
    }
    .ads-wrapper {
        .ads {
            height: 100px;
            width: 100%;
        }
    }
}
</style>
