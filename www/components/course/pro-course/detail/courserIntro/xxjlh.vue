<template>
    <!-- 学员线下交流会 -->
    <div class="xxjlhInfo" v-if="propsData != undefined">
        <div class="xxjlh">
            <div class="xxjlhTop">
                <span>{{ propsData.title }}</span>
            </div>
            <div class="xxjlhCon">
                <div class="pageFullScreen" id="xxxFullScreen">
                    <!-- 内容 -->
                    <div class="swiper-container" id="swiper1">
                        <!-- 轮播图 -->
                        <swiper :options="swiperOption">
                            <swiper-slide class="swiper-slide" v-for="(item, key) in propsData.imgList" :key="key" style="width: 648px; height: 372px">
                                <div><img :src="item | fileParse" style="width: 100%; height: 372px" /></div>
                            </swiper-slide>
                        </swiper>
                        <div class="swiper-button-prev swiper-button-white"></div>
                        <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
                        <div class="swiper-button-next swiper-button-white"></div>
                        <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
export default {
    name: 'xxjlh',
    filters: {
        fileParse(url) {
            return niceloo.path.getServerFileViewPath(url);
        },
    },
    components: {},
    props: {
        propsData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            asyna: false,
            list: [],
            xxjlhCon: '',
            swiperOption: {
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                loop: true, // 无限循环
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 12,
                loopAdditionalSlides: 100,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            },
        };
    },
    watch: {
        propsData(val) {
            let vm = this;
            vm.propsData = val;
            vm.xxjlhCon = val;
        },
    },
    mounted() {
        this.list = [];
    },
    methods: {},
};
</script>
<style lang="less" scoped>
.xxjlhInfo {
    padding: 30px 0 50px 30px;
    margin: 20px 30px 0 0;
    border-radius: 2px;
    background-color: #fff;
    .xxjlh {
        text-align: center;
        .xxjlhTop {
            color: #333333;
            font-size: 40px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            text-align: center;
            line-height: 92px;
            display: inline-block;
            height: 92px;
            width: 976px;
            background: url('./asset/images/header_decorate.png') no-repeat;
            background-size: 100% 100%;
        }
        .xxjlhCon {
            padding: 40px 0 0 0;

            #xxxFullScreen {
                background-color: #fff;
            }
            #swiper1 {
                width: 100%;
                overflow: hidden;
                padding: 0 0 10px 0;
            }
            .swiper-container {
                // --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
                --swiper-navigation-color: #000; /* 单独设置按钮颜色 */
                --swiper-navigation-size: 10px; /* 设置按钮大小 */
            }
            .swiper-button-prev,
            .swiper-button-next {
                position: absolute;
                top: 50%;
                width: 50px;
                height: 50px;
                margin-top: -22px;
                z-index: 10;
                cursor: pointer;
                background-size: 27px 44px;
                background-position: center;
                background-repeat: no-repeat;
                opacity: 0.6;
                border-radius: 50%;
                outline: none;
            }
            .swiper-button-prev {
                background: url('./asset/images/left_arrow.png') no-repeat 47%;
                background-color: #000;
            }
            .swiper-button-next {
                background: url('./asset/images/right_arrow.png') no-repeat 47%;
                background-color: #000;
            }
            .swiper-container,
            .swiper-container2 {
                width: 100%;
                height: 372px;
                /* overflow: visible !important; */
                position: relative;
            }
            #swiper1 .swiper-container .swiper-wrapper .swiper-slide {
                width: 648px;
                border-radius: 10px;
                background-color: #fff;
            }
            #swiper1 .swiper-container .swiper-wrapper .swiper-slide img {
                border-radius: 10px;
            }
            /* 上一张 */
            #swiper1 .swiper-container .swiper-wrapper .swiper-slide-prev img {
                margin-top: 20px;
                height: 332px !important;
            }
            /* 下一张 */
            #swiper1 .swiper-container .swiper-wrapper .swiper-slide-next img {
                margin-top: 20px;
                height: 332px !important;
            }

            /* 中间的图片 */
            .swiper-container .swiper-wrapper .swiper-slide-active {
                height: 372px !important;
            }
        }
    }
}
</style>
