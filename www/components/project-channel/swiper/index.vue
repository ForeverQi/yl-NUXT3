<template>
    <div v-swiper:mySwiper="swiperOption" class="bcs-swiper" v-if="isRenderSwiper" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
        <div class="swiper-wrapper" ref="swiperWrapper">
            <template v-if="dataList.length">
                <div class="swiper-slide" v-for="(item, index) in dataList" :key="index">
                    <a v-if="item.eventPath" :href="item.eventPath" target="_blank" @click="handleAdItemClick(item)">
                        <img class="slide-item" :src="item.imgUrl" />
                    </a>
                    <img v-else class="slide-item" :src="item.imgUrl" @click="handleAdItemClick(item)" />
                </div>
            </template>
            <!-- 一个广告也不存在时的占位图 -->
            <div v-else class="swiper-slide">
                <image-view type="banner" :placeholder-width="'30%'"></image-view>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-banner" slot="pagination" v-show="isOneSlide === false"></div>
        <div class="swiper-button-prev swiper-button-banner swiper-button-prev-banner" v-show="isOneSlide === false && isShowSlideButton">
            <img class="swiper-button-banner-icon swiper-button-banner-icon-prev" src="../asset/images/left.webp" />
        </div>
        <div class="swiper-button-next swiper-button-banner swiper-button-next-banner" v-show="isOneSlide === false && isShowSlideButton">
            <img class="swiper-button-banner-icon swiper-button-banner-icon-next" src="../asset/images/right.webp" />
        </div>
    </div>
</template>
<script>
import '@/api/channel/api..query-config-model-info.js';
export default {
    props: {
        // 广告代码
        lytCode: {
            type: String,
            default: '',
        },
        columnId: {
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
                // spaceBetween: 12,
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
                on: {
                    slideChangeTransitionStart: () => {
                        if (this.mySwiper) {
                            this.currentIndex = this.mySwiper.realIndex;
                        }
                    },
                },
            },
            isRenderSwiper: true,
            isOneSlide: false,
            isShowSlideButton: false,
            dataList: [],
            currentIndex: null,
        };
    },
    async fetch() {
        await this.getBannerList();
    },
    watch: {
        lytCode() {
            this.getBannerList();
        },
        currentIndex() {
            if (this.$platform.isIE) {
                this.$emit('change', {
                    backgroundColor: `#fff`,
                });
                return;
            }
            if (!this.dataList.length) {
                this.$emit('change', {
                    backgroundColor: `#fff`,
                });
                return;
            }
            let currentSrc = this.dataList[this.currentIndex].imgUrl;
            this.$emit('change', {
                backgroundImage: `url(${this.$urlUtils.getViewUrl(currentSrc)})`,
            });
        },
    },
    methods: {
        handleAdItemClick(item) {
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.advertName,
                jump_type: item.eventPath ? 'URL链接' : '无跳转',
                ad_url: item.eventPath ? item.eventPath : '',
                ad_position_name: `轮播图管理`,
                page_name: document.title,
            });
            this.clickYiGuan(item);
        },
        getBannerList() {
            return new Promise((resolve, reject) => {
                this.$callApi('channel/query-config-model-info', {
                    // 频道标识
                    columnId: this.columnId,
                    // 模块编码
                    moduleCode: 'LBT',
                    // 启用状态筛选
                    enableStatus: 'Y',
                    // 教师姓名模糊搜索
                    // 页码
                    pageIndex: 1,
                    // 记录数
                    pageSize: this.maxSize,
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then((res) => {
                    const resultArr = [];
                    res.content.forEach((element, index) => {
                        element.imgUrl = this.$urlUtils.getViewUrl(element.imgUrl);
                        if (index < this.maxSize) {
                            resultArr.push({
                                ...element,
                                imgUrl: this.$urlUtils.getViewUrl(element.imgUrl),
                            });
                        }
                    });
                    this.dataList = resultArr;
                    this.currentIndex = 0;
                    this.updateSwiper();
                })
                .catch((err) => {
                    this.updateSwiper();
                    this.$niceloo.api.handleFailure(err);
                });
        },
        updateSwiper() {
            return new Promise((resolve) => {
                this.isOneSlide = this.dataList.length <= 1;
                this.isRenderSwiper = false;
                this.swiperOption.loop = !this.isOneSlide;
                this.$nextTick(() => {
                    this.isRenderSwiper = true;
                });
                resolve();
            });
        },
        handleMouseenter() {
            this.isShowSlideButton = true;
        },
        handleMouseleave() {
            this.isShowSlideButton = false;
        },
        // 点击获取易观所需要的信息
        clickYiGuan(item) {
            this.$emit('click-yi-guan', {
                module_type: '轮播图',
                ad_number: item.sort,
            });
        },
    },
};
</script>
<style scoped lang="less">
.bcs-swiper {
    border-radius: 12px;
    height: 300px;
    width: 1200px;
    overflow: hidden;
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

.bcs-swiper /deep/.swiper-pagination-bullet {
    background: #ffffff;
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
