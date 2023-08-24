<template>
    <div class="teacher-box">
        <div class="box-title">
            <img src="./asset/images/icon.png" alt="" class="top-icon" />
            <img src="./asset/images/teacher.png" alt="" class="top-img" />
        </div>
        <div v-swiper:mySwiper="swiperOption" class="teacher-swiper" v-if="teacherList.length > 0">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, key) in teacherList" :key="key">
                    <div class="content-top">
                        <img class="teacher-img" :src="item.teacherImage || avatarUrl" @error="item.teacherImage = avatarUrl" />
                        <h2 class="teacher-name">{{ item.teacherNickname || item.userName }}</h2>
                        <p class="teacher-type">
                            {{
                                item.teachProjectListVos
                                    .filter((item) => item.projectId === experienceClass.projectId)
                                    .map((item) => item.projectName)
                                    .join()
                            }}
                        </p>
                    </div>
                    <p class="teacher-des">
                        {{ item.teacherBrief }}
                    </p>
                </div>
            </div>
            <div class="swiper-pagination" slot="pagination" v-if="teacherList.length > 1"></div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    name: 'contentRightTeacherModel',
    data() {
        return {
            swiperOption: {
                slidesPerView: 'auto',
                centeredSlides: true,
                spaceBetween: 12,
                loopAdditionalSlides: 100,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    type: 'bullets',
                },
                loop: true,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                noSwiping: false,
            },
            avatarUrl: require('./asset/images/teacher_avatar.png'),
        };
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        teacherList() {
            return this.experienceClass.teacherList;
        },
    },
    watch: {
        teacherList() {
            this.updateSetting();
        },
    },
    created() {
        this.updateSetting();
    },
    methods: {
        updateSetting() {
            this.swiperOption.noSwiping = this.teacherList.length <= 1;
            this.swiperOption.loop = this.teacherList.length > 1;
        },
    },
};
</script>
<style lang="less" scoped>
.teacher-box {
    width: 324px;
    background-color: white;
    padding-bottom: 16px;
    margin-bottom: 24px;
    border-radius: 8px;
    overflow: hidden;
    .box-title {
        background-image: url('./asset/images/title-bg.png');
        background-size: contain;
        height: 60px;
        padding-left: 18px;
        display: flex;
        align-items: center;
        .top-img {
            width: auto;
            height: 20px;
            display: block;
        }
        .top-icon {
            width: 20px;
            height: 20px;
            margin-right: 8px;
        }
    }
    .content-top {
        width: 250px;
        border-bottom: 1px solid #dddddd;
        padding: 19px 0 16px;
        margin: 0 auto;
        .teacher-img {
            width: 60px;
            height: 60px;
            margin: 0 auto;
            display: block;
            background-color: #dddddd;
            border-radius: 50%;
        }
        .teacher-name {
            font-size: 16px;
            line-height: 21px;
            color: #333;
            text-align: center;
            margin: 8px 0 4px;
        }
        .teacher-type {
            font-size: 12px;
            line-height: 16px;
            color: #666;
            text-align: center;
        }
    }
    .teacher-des {
        font-size: 14px;
        line-height: 19px;
        color: #666;
        padding: 16px 24px 59px;
    }
    /deep/ .swiper-pagination-bullet {
        width: 16px;
        height: 4px;
        border-radius: 2px;
        background-color: #000;
        opacity: 0.1;
    }
    /deep/ .swiper-pagination-bullet-active {
        background-color: #000;
        opacity: 1;
    }
}
</style>
