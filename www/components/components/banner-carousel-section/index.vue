<template>
    <div v-swiper:mySwiper="swiperOption" class="bcs-swiper" v-if="isRenderSwiper" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
        <div class="swiper-wrapper" ref="swiperWrapper">
            <template v-if="dataList.length">
                <div class="swiper-slide" v-for="(item, key) in dataList" :key="key">
                    <a
                        v-if="item.adLink"
                        :href="item.adLinkType === 3 ? 'javascript: void(0);' : item.adLink"
                        :target="item.adLinkType === 3 ? '_self' : '_blank'"
                        @click="handleItemClick(item, key)"
                    >
                        <img class="slide-item" :src="item.adPicture" />
                    </a>
                    <img v-else class="slide-item" :src="item.adPicture" @click="handleItemClick(item, key)" />
                </div>
            </template>
            <!-- 一个广告也不存在时的占位图 -->
            <div v-else class="swiper-slide">
                <image-view type="banner" placeholder-width="30%"></image-view>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-banner" slot="pagination" v-show="isOneSlide === false"></div>
        <div class="swiper-button-prev swiper-button-banner swiper-button-prev-banner" v-show="isOneSlide === false && isShowSlideButton">
            <img class="swiper-button-banner-icon swiper-button-banner-icon-prev" src="./asset/images/left.webp" />
        </div>
        <div class="swiper-button-next swiper-button-banner swiper-button-next-banner" v-show="isOneSlide === false && isShowSlideButton">
            <img class="swiper-button-banner-icon swiper-button-banner-icon-next" src="./asset/images/right.webp" />
        </div>
    </div>
</template>
<script>
import '@/api/cp/api.CP2001.query-adv-list.js';

export default {
    props: {
        // 广告代码
        lytCode: {
            type: String,
            default: '',
        },
        // 展示的最多广告数量
        maxSize: {
            type: Number,
            default: 6,
        },
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 'auto',
                centeredSlides: true,
                loopAdditionalSlides: 100,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                loop: true,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                noSwiping: false,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
            isRenderSwiper: true,
            isOneSlide: false,
            isShowSlideButton: false,
            dataList: [],
        };
    },
    fetch() {
        return this.getBannerList();
    },
    watch: {
        lytCode() {
            this.getBannerList();
        },
    },
    methods: {
        getBannerList() {
            return this.$callApi('cp/query-adv-list', {
                lytCode: this.lytCode,
                projectId: '',
            })
                .then((res) => res.getData())
                .then((res) => {
                    const resultArr = [];
                    res.forEach((element, index) => {
                        element.adPicture = this.$urlUtils.getViewUrl(element.adPicture);
                        if (index < this.maxSize) {
                            resultArr.push({
                                ...element,
                                adPicture: this.$urlUtils.getViewUrl(element.adPicture),
                            });
                        }
                    });
                    this.dataList = resultArr;
                    this.updateSwiper();
                })
                .catch(this.$niceloo.api.handleFailure);
        },
        updateSwiper() {
            this.isOneSlide = this.dataList.length <= 1;
            this.isRenderSwiper = false;
            this.swiperOption.loop = !this.isOneSlide;
            this.$nextTick(() => {
                this.isRenderSwiper = true;
            });
        },
        handleMouseenter() {
            this.isShowSlideButton = true;
        },
        handleMouseleave() {
            this.isShowSlideButton = false;
        },
        handleItemClick(item, index) {
            this.$emit('item-click', item, index);
        },
    },
};
</script>
<style scoped lang="less">
.bcs-swiper {
    border-radius: 12px;
    height: 300px;
    overflow: hidden;
    .swiper-wrapper {
    }
}
.swiper-button-banner {
    height: 50px;
    width: 30px;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
}
.swiper-button-prev-banner {
    border-radius: 0px 4px 4px 0px;
    left: 0;
}

.swiper-button-next-banner {
    border-radius: 4px 0px 0px 4px;
    right: 0;
}

.swiper-button-banner-icon {
    width: 8px;
    height: 16px;
}

.swiper-button-banner-icon-prev {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.swiper-button-banner-icon-next {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
}

.bcs-swiper /deep/.swiper-pagination-bullet-active {
    width: 20px;
    height: 8px;
    background: #ffffff;
    border-radius: 5px;
}

.swiper-pagination-banner {
    text-align: right;
}

.swiper-pagination-banner /deep/.swiper-pagination-bullet:last-child {
    margin-right: 30px;
}

.slide-item {
    width: 1200px;
    height: 300px;
    background-size: contain;
    display: inline-block;
    vertical-align: bottom;
}
</style>
