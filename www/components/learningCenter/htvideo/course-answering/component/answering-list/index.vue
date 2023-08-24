<template>
    <div class="dy-list">
        <ul class="qa" @scroll="scrollEvent" v-if="dyList.length">
            <li v-for="(item, index) in dyList" :key="index">
                <div class="question" :class="item.questionFilePath && item.questionFilePath.length ? '' : 'mar-btm6'">
                    <span class="tag">问</span>
                    {{ item.questionContent }}
                </div>
                <ul class="img-list" v-if="item.questionFilePath && item.questionFilePath.length">
                    <li v-for="(img, i) in item.questionFilePath" :key="i">
                        <img class="question-img" :src="$urlUtils.getViewUrl(img)" @click="handlePreviewImg(img)" alt="" />
                    </li>
                </ul>
                <div class="answer-section" v-if="item.isHaveAnswer === 'Y'">
                    <div class="answer-txt">解答：</div>
                    <div class="answer-title">{{ item.answerContent }}</div>
                    <ul class="img-list" v-if="item.answerFilePath && item.answerFilePath.length">
                        <li v-for="(answerImg, i) in item.answerFilePath" :key="i">
                            <img class="answer-img" :src="$urlUtils.getViewUrl(answerImg)" @click="handlePreviewImg(answerImg)" alt="" />
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
        <div class="empty-tip" v-else>
            <img src="./asset/images/empt.png" alt="" />
            <div class="empty-text">您还没有提交过答疑问题，学习过程中有疑问可以随时提交哦～</div>
        </div>
        <CourseImagePreview :pic="currentImg" v-if="isShowPreview" @close="closePreview"></CourseImagePreview>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CourseImagePreview from '@/www/components/learningCenter/htvideo/course-image-preview/index.vue';
import '@/api/qa/api.QA0010.query-question-courseware-info-list.js';
export default {
    name: 'index',
    components: { CourseImagePreview },
    data() {
        return {
            pageIndex: 1,
            dyList: [],
            dyCount: 0,
            currentImg: '',
            isShowPreview: false,
        };
    },
    computed: {
        ...mapState('course/info', {
            coursewareId: 'coursewareId',
            courseId: 'courseId',
        }),
    },
    watch: {
        coursewareId: {
            handler(newVal, oldVal) {
                if (newVal && newVal !== oldVal) {
                    this.getQuestionList('N');
                }
            },
            immediate: true,
        },
    },
    methods: {
        //图片预览
        handlePreviewImg(val) {
            this.currentImg = this.$urlUtils.getViewUrl(val);
            this.isShowPreview = true;
        },
        closePreview() {
            this.isShowPreview = false;
        },
        scrollEvent(e) {
            if (this.isLoading) {
                return;
            }
            if (e.currentTarget.scrollTop + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight) {
                this.loadMore();
            }
        },
        loadMore() {
            if (this.dyList.length < this.dyCount) {
                this.pageIndex++;
                this.getQuestionList('Y');
            }
        },

        getQuestionList(loadMore) {
            this.isLoading = true;
            if (loadMore === 'N') {
                this.pageIndex = 1;
            }
            //qa/web/question/courseware/info/list
            this.$callApi('qa/query-question-courseware-info-list', {
                courseId: this.courseId,
                courseWareId: this.coursewareId, //课时ID
                pageSize: 10,
                pageIndex: this.getStartIndex(),
                onsuccess: (data) => {
                    let res = data.data;
                    this.dyCount = data.count;
                    res.forEach((item) => {
                        if (item.questionFilePath && item.questionFilePath.length) {
                            item.questionFilePath = item.questionFilePath.split(',');
                        }
                        if (item.isHaveAnswer && item.answerFilePath) {
                            item.answerFilePath = item.answerFilePath.split(',');
                        }
                    });
                    console.log(res, 'GetGradeQuestionList');
                    this.isLoading = false;
                    if (loadMore == 'Y') {
                        this.dyList = this.dyList.concat(res);
                    } else {
                        this.dyList = res;
                    }
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {
                    this.isLoading = false;
                },
            });
        },
        getStartIndex() {
            if (this.pageIndex <= 0) {
                this.pageIndex = 1;
            }
            return (this.pageIndex - 1) * 10;
        },
    },
};
</script>

<style scoped lang="less">
.dy-list {
    flex: 1;
    overflow-y: auto;
}
.qa {
    // width: 376px;
    width: 100%;
    background: #2a3440;
    height: 100%;
    overflow-y: auto;
    padding-right: 18px;
    box-sizing: border-box;
    > li {
        margin-left: 18px;
        padding-bottom: 10px;
        border-bottom: 1px solid #39414b;
        padding-top: 16px;
        .question {
            font-size: 14px;
            color: #dddddd;
            line-height: 22px;
            margin-bottom: 14px;
            word-wrap: break-word;
            word-break: break-all;
            .tag {
                display: inline-block;
                width: 14px;
                height: 14px;
                background: #ff575f;
                border-radius: 2px;
                font-size: 12px;
                line-height: 14px;
                text-align: center;
                float: left;
                position: relative;
                top: 4px;
                margin-right: 4px;
            }
        }
        .mar-btm6 {
            margin-bottom: 6px;
        }
        .answer-section {
            margin-top: 14px;
            padding: 10px 10px 13px;
            background: #3d4854;
            border-radius: 4px;
            .answer-txt {
                font-size: 14px;
                color: #ffffff;
                line-height: 19px;
            }
            .answer-title {
                font-size: 14px;
                color: #dddddd;
                line-height: 22px;
                letter-spacing: 0.26px;
                margin-top: 6px;
                margin-bottom: 12px;
                word-wrap: break-word;
                word-break: break-all;
            }
        }
        &:last-child {
            border-bottom: 0;
        }
    }
}
.img-list {
    display: inline-block;
    li {
        float: left;
        margin-right: 8px;
        .question-img {
            width: 56px;
            height: 56px;
            border-radius: 4px;
        }
        .answer-img {
            width: 52px;
            height: 52px;
            border-radius: 4px;
        }
        &:last-child {
            margin-right: 0;
        }
    }
}

.empty-tip {
    text-align: center;
    margin-top: 30px;
    img {
        width: 220px;
        height: 152px;
    }
    .empty-text {
        width: 232px;
        font-size: 14px;
        text-align: center;
        color: #dddddd;
        line-height: 22px;
        margin: 0 auto;
    }
}
</style>
