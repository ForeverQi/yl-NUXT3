<template>
    <div>
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <div ref="navBox" class="top-bar-box">
            <div class="top-bar" :class="{ fixed: isFixed }">
                <div class="top-bar-content">
                    <div class="tab-list" v-swiper:mySwiper="swiperOption">
                        <div class="swiper-wrapper">
                            <div
                                class="item swiper-slide"
                                v-for="(item, index) in list"
                                :key="index"
                                :class="{ active: activeIndex === index }"
                                @click="goTop(item.learnToolTypeId)"
                            >
                                {{ item.typeName }}
                            </div>
                        </div>
                    </div>
                    <div class="switch" v-show="isShowSwitch">
                        <span class="to-left swiper-button-prev"></span>
                        <span class="to-right swiper-button-next"></span>
                    </div>
                </div>
            </div>
        </div>
        <learning-tools ref="learningTools" :list="list" />
        <!-- 公共底部 -->
        <global-footer />
    </div>
</template>

<script>
import GlobalHeader from '~/layouts/components/global-header';
import GlobalFooter from '~/layouts/components/global-footer';

import LearningTools from '@/www/components/learning-tools';

export default {
    components: {
        GlobalHeader,
        GlobalFooter,
        LearningTools,
    },
    layout: 'nullLayout',
    data() {
        return {
            swiperOption: {
                centeredSlides: false,
                slidesPerView: 'auto',
                freeMode: true,
                navigation: {
                    nextEl: '.to-right',
                    prevEl: '.to-left',
                },
            },
            isFixed: false,
            activeIndex: 0,
            list: [],
            isShowSwitch: false,
        };
    },
    head() {
        return this.$head({
            title: '学习工具_点亮职业人生_优路教育',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '刷题,视频,看课,小程序,公众号,视频号,客户端,APP,学习工具,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
    mounted() {
        this.$yiguan.track('youlu_click_all_pages', {
            page_name: '学习工具_点亮职业人生_优路教育', // 页面名称
            page_url: location.href,
            page_type: '工具类页面',
            course_type: '学习工具',
            sort_name: '-',
            channel_name: '-',
            project_id: '-',
            subject_id: '',
        });
        this.getLearningTools();
        this.computedNavState();
        window.addEventListener('scroll', this.computedNavState);
    },
    destroyed() {
        // 离开该页面需要移除这个监听的事件，不然会报错
        window.removeEventListener('scroll', this.computedNavState);
    },
    methods: {
        computedNavState() {
            const scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            const moduleObjs = this.$refs.learningTools.$el.querySelectorAll('.module');

            for (let i = 0; i < moduleObjs.length; i++) {
                if (scrollTop >= moduleObjs[i].offsetTop - this.$el.querySelector('.header-wrap').offsetHeight) {
                    this.activeIndex = i;
                }
            }

            if (scrollTop === 0) {
                this.activeIndex = 0;
            }

            const navTop = this.$refs.navBox.offsetTop;
            this.isFixed = scrollTop > navTop;
        },
        goTop(id) {
            const moduleObjs = this.$refs.learningTools.$el.querySelectorAll('.module');
            for (let i = 0; i < moduleObjs.length; i++) {
                if (id === moduleObjs[i].getAttribute('data-id')) {
                    window.scrollTo(0, moduleObjs[i].offsetTop - this.$el.querySelector('.header-wrap').offsetHeight + 5);
                    break;
                }
            }
        },
        getLearningTools() {
            //op/learnTool/user/list
            this.$callApi('learntool/learnTool-list', {
                onsuccess: (res) => {
                    res.forEach((item) => {
                        item.childList &&
                            item.childList.forEach((child) => {
                                child.content = JSON.parse(child.content);
                            });
                    });
                    this.list = res;
                    this.$nextTick(() => {
                        if (document.querySelector('.swiper-wrapper').scrollWidth > document.querySelector('.tab-list').clientWidth) {
                            this.isShowSwitch = true;
                        }
                    });
                },
                onerror: () => {},
                oncomplete: () => {},
            });
        },
    },
};
</script>

<style lang="less" scoped>
.top-bar-box {
    height: 60px;
    width: 1200px;
    margin: 20px auto 0;

    .top-bar {
        box-sizing: border-box;
        width: 100%;
        min-width: 1200px;
        background-color: #fff;

        &.fixed {
            margin-top: 0;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
            box-shadow: 0px 4px 10px 0px rgb(68 68 68 / 5%);
        }

        .top-bar-content {
            width: 1200px;
            margin: 0 auto;
            padding: 0 42px 0 37px;
            height: 60px;
            line-height: 60px;
            display: flex;
            box-sizing: border-box;
            position: relative;
        }
    }

    .item {
        margin-right: 60px;
        position: relative;
        font-size: 16px;
        color: #3a3d4b;
        cursor: pointer;

        &:hover {
            font-weight: bold;
        }

        &.active {
            font-weight: bold;
            color: #333;

            &::after {
                content: '';
                width: 34px;
                height: 4px;
                background-color: #ff2e30;
                border-radius: 2px;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
}

.tab-list {
    width: 1121px;
    overflow: hidden;
    padding-right: 20px;
}
.switch {
    width: 80px;
    height: 60px;
    background: url('./asset/images/switch-bg.png') no-repeat;
    background-size: 100%;
    position: absolute;
    right: 42px;
    top: 0;
    z-index: 1;
}
.to-right,
.to-left {
    position: absolute;
    z-index: 1;
    right: 0px;
    top: 41px;
    width: 10px;
    height: 17px;
    background: url('./asset/images/clickable.png') no-repeat;
    background-size: 100%;
}
.to-left {
    transform: rotate(180deg);
    left: 30px;
    background-size: 100%;
}
/deep/ .swiper-button-next.swiper-button-disabled,
.swiper-button-prev.swiper-button-disabled {
    background: url('./asset/images/unclickable.png') no-repeat;
    background-size: 100%;
}
.swiper-slide {
    width: auto !important;
}
</style>
