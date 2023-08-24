<template>
    <div class="section">
        <div class="left" @click="toPage()">
            <div v-swiper:mySwiper="swiperOption" class="swiper-no-swiping">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(pic, index) in bigPics" :key="`${index}_${pic.img}`">
                        <div class="infoContent">
                            <img v-if="pic.img" :src="$urlUtils.getViewUrl(pic.img)" />
                            <img v-else src="./assets/images/big.png" />
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination" v-if="itemData.data.items_bigPic"></div>
            </div>
        </div>
        <div class="right">
            <div class="wrap" @click="toPage(itemData.data.items_smallPic.link)">
                <img v-if="itemData.data.items_smallPic.img" :src="$urlUtils.getViewUrl(itemData.data.items_smallPic.img)" />
                <img v-else src="./assets/images/small.png" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        itemData: {
            type: Object,
            default() {
                return {
                    data: {
                        items_bigPic: [],
                        items_smallPic: {},
                    },
                };
            },
        },
    },
    data() {
        return {
            swiperOption: {
                loop: true,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: true,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            },
        };
    },
    computed: {
        bigPics() {
            if (this.itemData.data.items_bigPic.length === 0) {
                return [{}];
            }
            return this.itemData.data.items_bigPic;
        },
    },
    mounted() {
        if (this.itemData.data.items_bigPic.length === 0) {
            this.autoplay = false;
        }
    },
    methods: {
        toPage(item) {
            if (!item) {
                item = this.bigPics[this.mySwiper.realIndex].link;
            }
            if (item.type === 'H') {
                this.$PageUtil.openNewPage(item.url);
            }
        },
    },
};
</script>
<style lang="less" scoped>
.section {
    width: 1200px;
    margin: auto;
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;

    .left {
        width: 824px;
        height: 175px;
        cursor: pointer;
        border-radius: 10px;
        overflow: hidden;
    }

    .right {
        width: 360px;
        height: 175px;
        cursor: pointer;
        border-radius: 10px;
        overflow: hidden;

        .wrap {
            height: 175px;

            img {
                height: 100%;
                width: 100%;
            }
        }
    }
}
.infoContent {
    height: 175px;

    img {
        width: 100%;
        height: 100%;
    }
}
.swiper-pagination {
    /deep/ .swiper-pagination-bullet {
        width: 16px;
        height: 3px;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 4px;

        &.swiper-pagination-bullet-active {
            background: #ffffff;
        }
    }
}
</style>
