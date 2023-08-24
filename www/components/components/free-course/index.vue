<template>
    <a :href="`/free-course/detail/${courseData.goodsId}`" target="_blank" @click="handlerClick">
        <div class="free-course-box" :style="{ width: `${width}`, height: `${height}` }">
            <div class="top-imag-box">
                <image-view class="top-img" :placeholder-heigt="'100%'" :src="courseData.goodsCover"></image-view>
                <div class="course-status">
                    <div v-if="courseData.courseStatus == 2" class="live-status">
                        <div class="live-status-box">
                            <img class="live-status-icon" src="./asset/start.gif" alt="" />
                        </div>
                        <div class="live-status-text">直播中</div>
                    </div>
                    <div v-else></div>
                    <div v-if="isShowType" class="course-type">公开课</div>
                </div>
                <div v-if="courseData.extraData === 'Y'" class="course-recommend">推荐</div>
            </div>
            <div class="free-course-info-box">
                <div class="course-title">
                    {{ courseData.goodsName }}
                </div>
                <div class="course-live-time">
                    {{ liveTime }}
                </div>
                <div class="course-prise">
                    <span class="price-icon">￥</span>
                    0
                </div>
            </div>
        </div>
    </a>
</template>
<script>
import dayjs from 'dayjs';
export default {
    props: {
        courseData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        isShowType: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String,
            default: '280px',
        },
        height: {
            type: String,
            default: '313px',
        },
    },
    data() {
        return {};
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        liveTime() {
            return `直播时间：${dayjs(this.courseData.courseStartTime).format('YYYY-MM-DD HH:mm')}`;
        },
    },
    methods: {
        handlerClick() {
            this.$yiguan.track('youlu_click_list_course', {
                course_name: this.courseData.goodsName,
                project_id: this.courseData.projectId,
                subject_id: this.courseData.subjectId ? this.courseData.subjectId : '-',
                course_type: '公开课',
                page_type: '课程集合页',
                page_name: document.title,
                sort_name: '-',
                channel_name: '-',
            });
        },
    },
};
</script>
<style lang="less" scoped>
.free-course-box {
    width: 100%;
    height: 313px;
    border-radius: 8px;
    background-color: #fff;
}

.free-course-box {
    margin-right: 26px;
    transition: all 0.2s linear;
    overflow: hidden;
}

.free-course-box:hover {
    transform: translate3d(0, -5px, 0);
    box-shadow: 0 0 10px 0 rgba(58, 61, 75, 0.1);
    /deep/.top-img {
        will-change: transform;
        transform: scale(1.08) translateZ(0);
    }
}

.top-imag-box {
    position: relative;
    width: 100%;
    height: 175px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
    .top-img {
        width: 100%;
        height: 175px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .top-img {
        width: 100%;
        transition: 0.5s ease-in-out;
        cursor: pointer;
    }

    .top-img:hover {
        will-change: transform;
        transform: scale(1.08) translateZ(0);
    }
    .course-status {
        position: absolute;
        padding: 0px 8px;
        box-sizing: border-box;
        top: 8px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        font-size: 12px;
        .live-status {
            height: 20px;
            padding: 0px 8px 0px 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.6);
            border-radius: 10px;
            .live-status-box {
                margin-right: 4px;
                width: 16px;
                height: 16px;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: linear-gradient(90deg, #ff6870, #f8323c);
                img {
                    width: 8px;
                    height: 8px;
                }
            }
        }
        .course-type {
            width: 46px;
            height: 24px;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

.course-recommend {
    position: absolute;
    bottom: 5px;
    left: 8px;
    width: 38px;
    height: 18px;
    box-sizing: border-box;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 7px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 12px;
    font-weight: 400;
}

.free-course-info-box {
    padding: 12px 18px 20px;
    width: 100%;
    box-sizing: border-box;
    .course-title {
        width: 244px;
        height: 48px;
        font-size: 14px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 22px;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    .course-live-time {
        margin-top: 8px;
        width: 244px;
        height: 13px;
        font-size: 12px;
        font-weight: 400;
        color: #53586c;
        line-height: 13px;
    }
    .course-prise {
        display: flex;
        align-items: center;
        margin-top: 16px;
        width: 20px;
        height: 20px;
        font-size: 18px;
        font-weight: 700;
        text-align: left;
        color: #ff2e30;
        line-height: 20px;
        .price-icon {
            margin-top: 4px;
            font-weight: 800;
            font-size: 14px;
        }
    }
}
</style>
