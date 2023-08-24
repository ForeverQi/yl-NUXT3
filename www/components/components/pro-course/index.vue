<template>
    <a :href="`/pro-course/detail/${courseData.classtypeId}`" target="_blank" class="pro-course-item" @click="clickYiGuan">
        <div class="pro-course-box" :style="{ width: `${width}`, height: `${height}` }">
            <div v-if="courseData.classtypeHotstatus === 'Y'" class="hot-tag">
                <div class="tag-text">热卖</div>
            </div>
            <div class="img-box" :style="{ width: `${width}`, height: `${imgHeight}` }">
                <image-view
                    :placeholder-height="'100%'"
                    :src="courseData && courseData.classtypeAppcoverimgurl"
                    class="img"
                    :style="{ height: `${imgHeight}` }"
                />
                <div v-if="isShowType" class="course-type">系统课</div>
                <div v-if="courseData.extraData === 'Y'" class="course-recommend">推荐</div>
            </div>
            <div class="title-box">
                <span class="tag-txt">{{ courseData.ctapName }}</span>
                {{ courseData.classtypeName }}
            </div>
            <div class="tags-box">
                <span v-if="courseData.currentAreaStatus === 'Y'" class="tag-txt c-yellow">{{ areaName }}</span>
                <template v-for="(tag, index2) in classtypeHighlights">
                    <span :key="index2" v-if="index2 < 2" class="tag-txt c-gray">{{ tag }}</span>
                </template>
            </div>
            <div class="bottom-money-box" v-if="isShowPrice">
                <div class="money-box">
                    <span class="symbol">￥</span>
                    <!-- 有促销价展示促销价，没有促销价展示原价 -->
                    <span>{{ courseData | filterPrice }}</span>
                </div>
                <div v-if="courseData.auditionStatus === 'Y'" class="listen-btn" @click.prevent="clickListen(courseData)">
                    <img class="sound-icon" src="./asset/images/sound-ico.png" alt="" />
                    试听
                </div>
            </div>
        </div>
    </a>
</template>
<script>
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
        collegeName: {
            type: String,
            default: '-',
        },
        collegeId: {
            type: String,
            default: '-',
        },
        pageType: {
            type: String,
            default: '-',
        },
        entranceResource: {
            type: String,
            default: '-',
        },
        width: {
            type: String,
            default: '280px',
        },
        height: {
            type: String,
            default: '313px',
        },
        imgHeight: {
            type: String,
            default: '175px',
        },
        isShowPrice: {
            type: Boolean,
            default: true,
        },
        areaName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {};
    },
    fetch() {
        return Promise.resolve();
    },
    computed: {
        classtypeHighlights() {
            let classtypeHighlights = this.courseData.classtypeHighlights || '';
            return classtypeHighlights.split(',');
        },
        asertype() {
            return this.courseData.asertype.split(',');
        },
    },
    methods: {
        clickListen(courseData) {
            // window.open(`/pro-course/detail/${classtypeId}/catalogue`);
            ylPlugin.login.isLogined().then((check) => {
                this.yiguanTrack(courseData, check);
                if (check === true) {
                    this.toDetail(courseData.classtypeId);
                } else {
                    this.doLogin(courseData);
                }
            });
        },
        doLogin(courseData) {
            this.$Promotion.setCLueInfo({
                url: location.href,
                pageName: courseData.classtypeName,
                projectId: courseData.projectId,
                originCode: 'xitongke',
                clueWaycode: 'yindao',
            });
            const regExtension = this.$Promotion.getClueExtensionInfo({
                clueWaycode: 'yindao',
                originCode: 'xitongke',
                pageName: courseData.classtypeName,
            });
            regExtension.clueFormdata = [
                {
                    key: 'clueRemarks',
                    value: '进入官网',
                    desc: '该用户通过【系统课试听】',
                },
            ];
            this.$ylPlugin.showLoginModal(
                { clue: { regExtension, clueExtension: regExtension } },
                { pageName: document.title || '课程集合页', entranceResource: this.entranceResource, courseType: '系统课', pageType: this.pageType }
            );
        },
        toDetail(classtypeId) {
            window.open(`/pro-course-tryout/${classtypeId}`);
        },
        yiguanTrack(courseData, isLoginIn) {
            const track = {
                course_name: courseData.classtypeName, // 课程名称
                project_id: this.courseData.projectId, // 项目名称
                page_type: this.pageType, // 页面类型
                page_name: document.title, // 页面名称
                channel_name: this.collegeName, // 频道页名称
                entrance_resource: this.entranceResource, // 点击位置
            };
            this.$yiguan.track('youlu_click_to_listen', track);
        },
        // 点击获取易观所需要的信息
        clickYiGuan() {
            this.$emit('click-yi-guan', {
                module_type: '系统课',
                course_name: this.courseData.classtypeName,
                project_position: this.courseData.projectId,
            });

            this.$yiguan.track('youlu_click_list_course', {
                course_name: this.courseData.classtypeName,
                project_id: this.courseData.projectId,
                subject_id: this.courseData.subjectId ? this.courseData.subjectId : '-',
                course_type: '系统课',
                page_type: '课程集合页',
                page_name: document.title,
                sort_name: '-',
                channel_name: this.collegeName,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.pro-course-item {
    -webkit-backface-visibility: visible;
    backface-visibility: visible;
}
.pro-course-item {
    position: relative;
    transition: all 0.2s linear;
    overflow: hidden;
}
.pro-course-box {
    position: relative;
    transition: all 0.2s linear;
    border-radius: 8px;
    background-color: #fff;
    // overflow: hidden;
    border-radius: 8px;
}
.pro-course-box:hover {
    transform: translate3d(0, -5px, 0);
    box-shadow: 0 0 10px 0 rgba(58, 61, 75, 0.1);
    /deep/.img {
        will-change: transform;
        transform: scale(1.08) translateZ(0);
    }
}

.img-box {
    width: 100%;
    overflow: hidden;
    border-radius: 8px 8px 0 0;
    position: relative;
    .img {
        transition: all 0.5s;
        width: 100%;
    }
}
.hot-tag {
    box-sizing: border-box;
    width: 65px;
    height: 26px;
    line-height: 26px;
    color: #df1a1c;
    font-size: 12px;
    background-image: url('./asset/images/hot-tag.png');
    background-size: 65px 26px;
    padding-left: 32px;
    position: absolute;
    left: 0;
    top: -12px;
    z-index: 2;
    .tag-text {
        margin-top: 2px;
    }
}

.title-box {
    margin: 12px 0 8px;
    padding: 0px 16px;
    height: 44px;
    line-height: 22px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
    font-weight: bold;
    color: #3a3d4b;
}

.tag-txt {
    padding: 0px 16px;
    float: left;
    margin-right: 6px;
    line-height: 22px;
    padding: 0 7px;
    font-size: 12px;
    color: #f8323c;
    background-color: #ffeff0;
    border-radius: 2px;

    &.c-yellow {
        color: #fa6400;
        background-color: rgba(251, 135, 21, 0.1);
    }

    &.c-gray {
        color: #53586c;
        background-color: #eeeff6;
    }
}

.tags-box {
    height: 22px;
    padding: 0px 16px;
    box-sizing: border-box;
    align-items: center;
    overflow: hidden;
    margin-bottom: 9px;
}

.course-type {
    position: absolute;
    top: 8px;
    right: 8px;
    height: 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 5px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 12px;
    font-weight: 400;
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
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 12px;
    font-weight: 400;
}

.bottom-money-box {
    padding: 0px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    color: #ff2e30;
    line-height: 20px;
    letter-spacing: normal;
    .money-box {
        display: flex;
        align-items: baseline;
        font-weight: bold;
    }

    .symbol {
        font-size: 14px;
        font-weight: bold;
        letter-spacing: -0.13px;
    }
    .listen {
        width: 72px;
        height: 26px;
    }
}
.listen-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 72px;
    height: 26px;
    background: #ffffff;
    border: 1px solid #ff2e30;
    border-radius: 14px;
    font-size: 14px;
    font-weight: 400;
    color: #ff2e30;
    .sound-icon {
        margin-right: 5px;
        width: 16px;
        height: auto;
    }
}
</style>
