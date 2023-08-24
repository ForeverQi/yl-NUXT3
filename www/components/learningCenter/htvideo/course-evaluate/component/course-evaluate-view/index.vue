<template>
    <div class="evaluate-view">
        <div class="content-star">
            <img v-for="item in levelDescList" :key="item.level" :src="commentInfo.commentLevel > item.level - 1 ? startNoChoosed : startChoosed" />
            <span>{{ levelDesc }}</span>
        </div>
        <div class="content-label">
            <span class="content-label-checked" v-for="(item, index) in commentInfo.labels" :key="item.commentId + index">
                {{ item.lableName.length > 10 ? item.lableName.substring(0, 10) + '...' : item.lableName }}
            </span>
        </div>
        <div class="content-text">
            {{ commentInfo.commentContent }}
        </div>
        <div class="content-img">
            <template v-for="item in commentInfo.images">
                <img class="pointer" :src="$urlUtils.getViewUrl(item)" alt="" :key="item" @click="handlePreviewImg(item)" />
            </template>
        </div>
        <CourseImagePreview :pic="currentImg" v-if="isShowPreview" @close="closePreview"></CourseImagePreview>
    </div>
</template>

<script>
import '@/api/cmt/api.CMT1102.cmt-label-list.js';
import CourseImagePreview from '@/www/components/learningCenter/htvideo/course-image-preview/index.vue';
export default {
    name: 'index',
    components: { CourseImagePreview },
    props: {
        lableType: {
            type: String,
            default: 'TC', // TC: 录播课，LC: 直播课，FC面授课，HT班主任
        },
        commentInfo: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            levelDesc: '',
            levelDescList: [],
            startNoChoosed: require('../../assets/images/startNoChoosed.svg'),
            startChoosed: require('../../assets/images/startChoosed.svg'),
            isShowPreview: false,
            currentImg: '',
        };
    },
    created() {
        this.getLabelList();
    },
    methods: {
        /**
         * 获取标签列表
         * **/
        getLabelList() {
            this.$callApi('cmt/cmt-label-list', {
                lableType: this.lableType,
                onsuccess: (res) => {
                    if (res.data[0]) {
                        this.levelDescList = res.data[0].typeLables.map((item) => {
                            if (item.level == this.commentInfo.commentLevel) {
                                this.levelDesc = item.levelDesc;
                            }
                            return {
                                level: item.level,
                                levelDesc: item.levelDesc,
                            };
                        });
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        /**
         * 查看图片大图
         * **/
        openBigImg(url) {
            this.bigImgUrl = url;
            this.isShowBigImg = true;
        },
        //图片预览
        handlePreviewImg(val) {
            this.currentImg = this.$urlUtils.getViewUrl(val);
            this.isShowPreview = true;
        },
        closePreview() {
            this.isShowPreview = false;
        },
    },
};
</script>

<style lang="less" scoped>
.evaluate-view {
    width: 100%;
    box-sizing: border-box;
    padding: 32px 18px;
    .content-star {
        img {
            width: 18px;
            height: 18px;
            margin-right: 10px;
        }
        & > span {
            font-size: 16px;
            font-weight: 700;
            color: #fff;
        }
    }
    .content-label {
        display: flex;
        flex-wrap: wrap;
        margin-top: 12px;
        span {
            height: 26px;
            box-sizing: border-box;
            border-radius: 13px;
            line-height: 26px;
            font-size: 12px;
            margin: 0 12px 14px 0;
            padding: 0 16px;
        }
        .content-label-checked {
            color: #fff;
            background: #f8323c;
            background: linear-gradient(90deg, #ff6870, #f8323c);
            border: 0;
        }
    }
    .content-text {
        font-size: 14px;
        color: #dddddd;
        line-height: 24px;
        word-wrap: break-word;
        word-break: normal;
    }
    .content-img {
        display: flex;
        margin-top: 12px;
        .pointer {
            width: 80px;
            height: 80px;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 16px;
        }
    }
    .comment-model-mask {
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        position: fixed;
        z-index: 2999;
        top: 0;
        left: 0;
        .bg-close-img {
            width: 30px;
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            border-radius: 3px;
            position: absolute;
            right: 50px;
            top: 50px;
            cursor: pointer;
        }
        .big-img-comment-model {
            max-width: 100%;
            max-height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>
