<template>
    <div class="ad-secton" v-if="leftPic.adPicture || rightPic.adPicture">
        <div class="left" @click="toAdDetail(leftPic)">
            <img v-if="leftPic.adPicture" :src="$urlUtils.getViewUrl(leftPic.adPicture)" />
            <img v-else src="./assets/images/empty.png" />
        </div>
        <div class="right" @click="toAdDetail(rightPic)">
            <img v-if="rightPic.adPicture" :src="$urlUtils.getViewUrl(rightPic.adPicture)" />
            <img v-else src="./assets/images/empty.png" />
        </div>
    </div>
</template>
<script>
import '@/api/mcu/api.mcu-07.home-ad-pic.js';
export default {
    props: {
        projectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            leftPic: {
                adPicture: '',
            },
            rightPic: {
                adPicture: '',
            },
        };
    },
    watch: {
        projectId(val, oldVal) {
            if (val !== oldVal) {
                this.init();
            }
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            Promise.all([this.getLeftPic(), this.getRightPic()]).then(() => {
                console.log();
                if (this.leftPic.adPicture === '' && this.rightPic.adPicture === '') {
                    this.$emit('empty-handle', 'adList');
                }
            });
        },
        getLeftPic() {
            let data = {
                url: 'home/home-ad-pic',
                params: {
                    lytCode: 'YLWKWEB_XMCPYD01',
                    projectId: this.projectId,
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.leftPic = {
                    adPicture: '',
                };
                if (Array.isArray(res) && res.length > 0) {
                    this.leftPic = res[0];
                }
            });
        },
        getRightPic() {
            let data = {
                url: 'home/home-ad-pic',
                params: {
                    lytCode: 'YLWKWEB_XMCPYD02',
                    projectId: this.projectId,
                },
                isCustom: false,
            };
            return this.httpClient(data).then((res) => {
                this.rightPic = {
                    adPicture: '',
                };
                if (Array.isArray(res) && res.length > 0) {
                    this.rightPic = res[0];
                }
            });
        },
        toAdDetail(item) {
            if (!item.adLink) {
                return;
            }
            this.$PageUtil.openNewPage(item.adLink);
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
    },
};
</script>
<style lang="less" scoped>
.ad-secton {
    width: 1200px;
    margin: auto;
    display: flex;
    margin-bottom: 32px;
    justify-content: space-between;
}
.left,
.right {
    width: 592px;
    height: 175px;
    cursor: pointer;
    border-radius: 10px;
    overflow: hidden;
}
img {
    width: 100%;
    height: 100%;
}
</style>
