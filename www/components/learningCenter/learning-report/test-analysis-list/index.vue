<template>
    <div class="understand-content">
        <div class="understand-content-left">
            <div class="subject" v-swiper:mySwiper="swiperOption">
                <ul class="subject-ul swiper-wrapper">
                    <li
                        class="swiper-slide"
                        :class="currentSubject && currentSubject.subjectId === item.subjectId ? 'active' : ''"
                        v-for="item in dataSubject.subjectList"
                        :key="item.subjectId"
                        @click="handleSubject(item)"
                    >
                        {{ item.subjectName }}
                    </li>
                </ul>
                <span class="to-left swiper-button-prev"><img src="./asset/images/to-next.png" alt="" /></span>
                <span class="to-right swiper-button-next">
                    <img src="./asset/images/to-next.png" alt="" />
                </span>
            </div>

            <ul class="chapter-ul">
                <li v-for="item in dataChapterTree" :key="item.chapterId">
                    <div class="chapter-title" @click="handleChapter(item)">
                        <img class="chapter-icon" src="./asset/images/chapter-icon.png" alt="" />
                        <div class="chapter-title-text">
                            {{ item.chapterTitle }}
                        </div>
                        ({{ item.count }})
                        <img class="fold-icon" :class="item.isFold ? '' : 'fold-icon-up'" src="./asset/images/fold-icon.png" alt="" />
                    </div>
                    <ul class="knob-ul" v-if="item.childChapterList && item.childChapterList.length > 0 && item.isFold">
                        <li
                            :class="currentChapter && item1.chapterId === currentChapter.chapterId ? 'active' : ''"
                            v-for="item1 in item.childChapterList"
                            :key="item1.chapterId"
                            @click="handleNode(item1)"
                        >
                            <div class="one-node">
                                <span></span>
                                <div class="node-title">
                                    {{ item1.chapterTitle }}
                                </div>
                                ({{ item1.count }})
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="understand-content-right">
            <div class="search-test">
                <input
                    type="text"
                    placeholder="请输入考点名称"
                    class="search-test-centre"
                    v-model="knowledgeTitle"
                    @keyup.enter="handleSearch"
                    maxlength="50"
                />
                <span class="search-btn" @click="handleSearch"></span>
                <span class="clear-input" v-show="knowledgeTitle" @click="knowledgeTitle = ''"></span>
            </div>
            <img src="./asset/images/test-img.png" class="test-img" alt="" v-if="page.pageCount > 0" />
            <ul class="test-centre-ul" v-if="page.pageCount > 0">
                <li>
                    <div class="first-title">考点</div>
                    <div>考点星级</div>
                    <div>掌握程度</div>
                    <div>精准学习</div>
                </li>
                <li v-for="item in dataKnowledgeList" :key="item.knowledgeId">
                    <div class="first">{{ item.knowledgeTitle }}</div>
                    <div class="second">
                        <img src="../test-analysis/asset/images/star.png" v-for="index in item.knowledgeStarLevel" :key="index" alt="" />
                    </div>
                    <div class="third">
                        <span class="mastery-degree"><span class="true-mastery-degree" :style="{ width: (item.rightRate / 100) * 90 + 'px' }"></span></span>
                        <!--{{ item.rightRate }}%-->
                    </div>
                    <div class="four">
                        <span @click="handleTestOn(item)" v-if="item.state === 'Y'">考点讲解</span>
                        <span @click="handlePractice(item)" v-if="item.paperId">精准练习</span>
                        <span class="no-need-focus" v-if="item.state !== 'Y' && !item.paperId">无需重点学习</span>
                    </div>
                </li>
            </ul>
            <div class="empty-tip" v-else>
                <img src="./asset/images/empt-tip.png" alt="" />
                <div v-if="isFirstNull">您还没有做题，暂时看不到考点分析内容哦~ 快点去做班级中习题吧！</div>
                <div v-else-if="isSearch">没有找到要搜索的考点，请输入正确的考点内容进行搜索哦！</div>
                <div v-else>此处暂时没有知识点内容哦，去看看其他章节的知识点吧~</div>
            </div>
            <pagination
                :page-size="page.pageSize"
                :total="page.pageCount"
                :current-page="page.pageIndex"
                @current-change="handleChangePage"
                class="pagination"
            ></pagination>
        </div>
        <!--type：knowledge 展示知识讲解 question 展示做题-->
        <knowledge-video
            v-if="currentKnowledge.length > 0"
            :subject-id="currentSubject.subjectId"
            :class-id="$route.params.classId"
            v-model="currentKnowledge[0].knowledgeId"
            :show.sync="isShow"
            :type="type"
            :list="currentKnowledge"
            @change="changeKnowledge"
            @close-report="closeReport"
            @post-success="postSuccess"
            @click-question-button="handleChangePractice"
        />
    </div>
</template>

<script>
import Pagination from '@/www/components/components/pagination/index.vue';
import KnowledgeVideo from '@/www/components/components/question/knowledge-video/index.vue';
import '@/api/cc/api..query-class-subjects.js'; //接口-科目列表
import '@/api/igt/api..user-knowledge-chapter-tree.js';
import '@/api/igt/api..user-knowledge-learned-list.js';
import '@/api/ks/api..knowledge-starlevel.js';
import '@/api/qb/api..query-resourcevideo-dot-status.js';
import '@/api/qb/api..query-knowledge-paper-list.js';
import '@/api/qb/api..query-resourcevideo-associated-dot.js';
export default {
    name: 'testAnalysisList',
    components: {
        KnowledgeVideo,
        Pagination,
    },
    props: {
        dataSubject: {
            type: Object,
            default: () => {
                return null;
            },
        },
    },
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
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
            },
            currentSubject: null,
            currentChapter: null,
            dataChapterTree: [],
            knowledgeTitle: '',
            dataKnowledgeList: [],
            knowledgeIdArry: [],
            currentKnowledge: [],
            type: '',
            isShow: '',
            isFirstNull: false, //true 初始化进来为空
            isSearch: false, //是否是点击了搜索按钮
        };
    },
    watch: {
        currentSubject: {
            handler(newVal, oldVal) {
                this.isFirstNull = false;
                this.init();
                if (newVal) {
                    this.getChapterTree();
                    this.knowledgeTitle = '';
                }
            },
            immediate: true,
        },
        currentChapter() {
            !this.isFirstNull && this.getKnowledgeList();
        },
    },
    mounted() {
        this.currentSubject = this.dataSubject.subjectList[0];
    },
    methods: {
        //章节树，知识点列表设置为空
        init() {
            this.dataChapterTree = [];
            this.dataKnowledgeList = [];
            this.page = {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
            };
            this.currentChapter = null;
        },
        handleSubject(val) {
            this.currentSubject = val;
        },
        handleChapter(val) {
            this.dataChapterTree.forEach((item) => {
                if (item.chapterId === val.chapterId) {
                    item.isFold = !item.isFold;
                } else {
                    item.isFold = false;
                }
            });
        },
        handleNode(val) {
            this.isSearch = false;
            if (val === this.currentChapter) {
                this.currentChapter = null;
            } else {
                this.currentChapter = val;
            }
            this.page.pageIndex = 1;
            this.$yiguan.learningCenter('web_learning_center_check_knowledge', {
                college_name: '',
                page_name: '学习中心-学习报告',
                project_name: this.dataSubject.projectName,
                subject_name: this.currentSubject.subjectName,
                chapter_name: this.currentChapter ? this.currentChapter.chapterTitle : '',
            });
        },
        handleSearch(val) {
            this.page.pageIndex = 1;
            this.isSearch = true;
            if (!this.currentChapter) {
                this.getKnowledgeList();
            }
            this.currentChapter = null;
            this.$yiguan.learningCenter('web_learning_center_search_knowledge', {
                college_name: '',
                page_name: '学习中心-学习报告',
                project_name: this.dataSubject.projectName,
                subject_name: this.currentSubject.subjectName,
            });
        },
        handleChangePage(val) {
            this.isSearch = false;
            this.page.pageIndex = val;
            this.getKnowledgeList();
        },
        //考点讲解
        handleTestOn(val) {
            this.type = 'knowledge';
            this.isShow = true;
            this.currentKnowledge = [];
            this.currentKnowledge.push(val);
            console.log(val);
            this.buryingPoint('web_learning_center_chapter_knowledge_parse');
        },
        //做题练习
        handlePractice(val) {
            this.type = 'question';
            this.isShow = true;
            this.currentKnowledge = [];
            this.currentKnowledge.push(val);
            console.log(this.currentChapter);
            this.buryingPoint('web_learning_center_chapter_knowledge_exercises');
        },
        handleChangePractice() {
            this.buryingPoint('web_learning_center_chapter_knowledge_exercises');
        },
        buryingPoint(eventId) {
            this.$yiguan.learningCenter(eventId, {
                college_name: '',
                page_name: '学习中心-学习报告',
                project_name: this.dataSubject.projectName,
                subject_name: this.currentSubject.subjectName,
                chapter_name: this.currentChapter ? this.currentChapter.chapterTitle : '',
                knowledge_name: this.currentKnowledge[0].knowledgeTitle,
            });
        },
        changeKnowledge() {},
        closeReport() {
            this.getKnowledgeList();
        },
        postSuccess() {},
        getChapterTree() {
            //igt/user/knowledge/chapter/tree
            this.$callApi('igt/user-knowledge-chapter-tree', {
                subjectId: this.currentSubject.subjectId,
                classId: this.$route.params.classId,
                onsuccess: (result) => {
                    result.forEach((item) => {
                        item.isFold = false;
                    });
                    this.dataChapterTree = result;
                    this.getKnowledgeList();
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },

        getKnowledgeList() {
            //考点分析列表接口igt/user/knowledge/learned/list
            this.$callApi('igt/user-knowledge-learned-list', {
                subjectId: this.currentSubject.subjectId,
                classId: this.$route.params.classId,
                knowledgeTitle: this.knowledgeTitle, //輸入框值
                chapterId: this.currentChapter ? this.currentChapter.chapterId : '',
                pageSize: this.page.pageSize,
                pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                onsuccess: (result) => {
                    this.dataKnowledgeList = result.data;
                    this.knowledgeIdArry = [];
                    result.data.forEach((item) => {
                        this.knowledgeIdArry.push(item.knowledgeId);
                    });
                    if (this.knowledgeIdArry.length > 0) {
                        this.getKnowledStarlevel();
                        this.getKnowledgeResourcevideoDot();
                        this.getKnowledgePaper();
                    }
                    this.page.pageCount = result.count;
                    //初始化进来就是空值
                    if (!this.currentChapter && this.knowledgeTitle === '' && this.page.pageCount === 0) {
                        this.isFirstNull = true;
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        getKnowledStarlevel() {
            //星级原点库ks/knowledge/starlevel
            this.$callApi('ks/knowledge-starlevel', {
                knowledgeIds: this.knowledgeIdArry.join(','),
                onsuccess: (result) => {
                    result.forEach((item) => {
                        this.dataKnowledgeList.forEach((item1, index) => {
                            if (item.knowledgeId === item1.knowledgeId) {
                                this.$set(this.dataKnowledgeList[index], 'knowledgeStarLevel', item.knowledgeStarLevel);
                            }
                        });
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        //考点讲解
        getKnowledgeResourcevideoDot() {
            //rc/web/resourcevideo/dot/status
            this.$callApi('qb/query-resourcevideo-dot-status', {
                associatedContentIds: this.knowledgeIdArry,
                associatedContentType: 'K',
                onsuccess: (result) => {
                    let videoOnArry = [];
                    result.forEach((item) => {
                        if (item.state === 'Y') {
                            videoOnArry.push(item.associatedContentId);
                        }
                        this.dataKnowledgeList.forEach((item1, index) => {
                            if (item.associatedContentId === item1.knowledgeId) {
                                this.$set(this.dataKnowledgeList[index], 'state', item.state);
                            }
                        });
                    });
                    if (videoOnArry.length > 0) {
                        this.getResourcevideoDot(videoOnArry);
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        //做题练习
        getKnowledgePaper() {
            //qb/business/support/knowledge/paper/list
            this.$callApi('qb/query-knowledge-paper-list', {
                knowledgeIds: this.knowledgeIdArry,
                onsuccess: (result) => {
                    result.papers.forEach((item) => {
                        this.dataKnowledgeList.forEach((item1, index) => {
                            if (item.knowledgeId === item1.knowledgeId) {
                                this.$set(this.dataKnowledgeList[index], 'paperId', item.paperId);
                            }
                        });
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        getResourcevideoDot() {
            //rc/web/resourcevideo/associated/dot
            this.$callApi('qb/query-resourcevideo-associated-dot', {
                associatedContentIds: this.knowledgeIdArry,
                associatedContentType: 'K',
                onsuccess: (result) => {
                    result.forEach((item) => {
                        this.dataKnowledgeList.forEach((item1, index) => {
                            if (item.associatedContentId === item1.knowledgeId) {
                                let option = {};
                                option.videoId = item.vid;
                                option.start = item.startTime;
                                option.end = item.endTime;
                                this.$set(this.dataKnowledgeList[index], 'resourceId', item.resourceId);
                                this.$set(this.dataKnowledgeList[index], 'option', option);
                            }
                        });
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>

<style scoped lang="less">
.understand-content {
    display: flex;
    padding-bottom: 50px;
}
.understand-content-left {
    width: 344px;
    background: #ffffff;
    border-radius: 6px 0px 0px 6px;
    margin-right: 12px;
    padding-bottom: 90px;
}
.understand-content-right {
    flex: 1;
    background: #ffffff;
    padding-left: 12px;
    padding-right: 24px;
    padding-bottom: 90px;
    position: relative;
}
/*左侧css*/
.subject {
    border-bottom: 1px solid #e4e5eb;
}
.to-right,
.to-left {
    position: absolute;
    right: 0;
    top: 22px;
    bottom: 0;
    width: 70px;
    height: 69px;
    background: linear-gradient(90deg, rgba(250, 250, 253, 0) 14%, #ffffff 50%);

    img {
        width: 16px;
        height: 16px;
        margin-left: 39px;
        margin-top: 32px;
    }
}
.to-left {
    left: 0;
    background: linear-gradient(-90deg, rgba(250, 250, 253, 0) 14%, #ffffff 50%);
    img {
        transform: rotate(180deg);
        margin-left: 15px;
        margin-top: 32px;
    }
}
/deep/.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
    opacity: 0;
}

.subject-ul {
    padding-top: 27px;
    height: 42px;
    li {
        height: 42px;
        font-size: 16px;
        text-align: center;
        color: #77798d;
        display: inline-block;
        padding: 0 10px;
        cursor: pointer;
    }
    .active {
        color: #ff2e30;
        font-weight: bold;
        position: relative;
        &::after {
            content: '';
            width: 22px;
            height: 4px;
            background: #ff2e30;
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 27px;
            margin-left: -11px;
        }
    }
}

.chapter-ul {
    margin-bottom: 60px;
    max-height: 700px;
    overflow: auto;
    > li {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
        border-bottom: 1px solid #e4e5eb;
        .chapter-title {
            display: flex;
            padding: 16px 0px 15px 16px;
            cursor: pointer;
            position: relative;
            align-items: center;
            .chapter-icon {
                width: 14px;
                height: 14px;
                position: relative;
                align-self: normal;
                top: 3px;
            }
            .chapter-title-text {
                padding-left: 8px;
                max-width: 243px;
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                line-clamp: 2;
                -webkit-line-clamp: 2; //显示几行
                line-height: 21px;
            }

            .fold-icon {
                width: 10px;
                height: 10px;
                float: right;
                margin-right: 20px;
                position: absolute;
                right: 0;
            }
            .fold-icon-up {
                transform: rotate(180deg);
            }
        }
        .knob-ul {
            li {
                padding-left: 22px;
                padding-right: 22px;
                font-size: 14px;
                color: #84879d;
                cursor: pointer;
                .one-node {
                    border-top: 1px solid #e4e5eb;
                    padding: 16px 16px 15px 0;
                    display: flex;
                    align-items: center;
                    span {
                        width: 8px;
                        height: 8px;
                        border: 1px solid #8d90aa;
                        border-radius: 50%;
                        display: inline-block;
                        margin-right: 8px;
                        position: relative;
                        top: 6px;
                        align-self: normal;
                    }
                    .node-title {
                        border: 0;
                        max-width: 243px;
                        padding-left: 0;
                        display: -webkit-box;
                        overflow: hidden;
                        -webkit-box-orient: vertical;
                        line-clamp: 2;
                        -webkit-line-clamp: 2; //显示几行
                        line-height: 21px;
                    }
                }
            }
            .active {
                border-left: 2px solid #ff2e30;
                background: #f3f4f9;
                color: #333333;
                div {
                    span {
                        width: 8px;
                        height: 8px;
                        border: 1px solid #333333;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}
/*右侧css*/
.search-test {
    position: relative;
    .search-test-centre {
        margin: 22px 0 24px 20px;
        width: 232px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #e4e5ee;
        border-radius: 17px;
        background: url('./asset/images/search-icon.png') no-repeat;
        background-size: 16px 16px;
        background-position: 16px 9px;
        padding-left: 40px;
        padding-right: 30px;
        box-sizing: border-box;
        font-size: 12px;
    }
    .search-btn {
        position: absolute;
        display: inline-block;
        width: 32px;
        height: 32px;
        left: 28px;
        top: 23px;
        cursor: pointer;
    }
    .clear-input {
        width: 16px;
        height: 16px;
        display: inline-block;
        background: #f0ecec url('./asset/images/clear-input.png') no-repeat;
        background-size: 10px 10px;
        background-position: center;
        border-radius: 50%;
        top: 4px;
        left: -31px;
        position: relative;
        cursor: pointer;
    }
}

.test-img {
    width: 110px;
    height: 82px;
    position: absolute;
    top: 6px;
    right: 24px;
}

.test-centre-ul {
    border: 1px solid #f5f5f5;
    border-radius: 6px 6px 0px 0px;
    background: #fbfbfc;
    li {
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        margin: 0 20px;
        line-height: 21px;
        font-size: 14px;
        padding-top: 14px;
        padding-bottom: 20px;
        div {
            flex: 1;
        }
        .first-title {
            flex: 1.5;
            padding-left: 23px;
            padding-right: 23px;
        }
        .first {
            flex: 1.5;
            color: #53586c;
            padding-left: 23px;
            padding-right: 23px;
            word-break: break-all;
        }
        .second {
            img {
                width: 14px;
                height: 13px;
                margin-right: 3px;
            }
        }
        .third {
            font-size: 12px;
            color: #ff2e30;
            .mastery-degree {
                width: 90px;
                height: 4px;
                background: #ebedf0;
                border-radius: 4px;
                display: inline-block;
                position: relative;
                margin-right: 5px;
                .true-mastery-degree {
                    width: 55px;
                    height: 4px;
                    background: #ff2e30;
                    display: inline-block;
                    position: absolute;
                    border-radius: 4px;
                    left: 0;
                    top: 0;
                }
            }
        }
        .four {
            color: #057aff;
            span {
                margin-right: 16px;
                cursor: pointer;
            }
            .no-need-focus {
                color: #bdc1d7;
                margin-right: 0;
                cursor: default;
            }
        }
        &:first-child {
            background: #f3f4f9;
            color: #333333;
            margin: 0;
            padding: 0 20px;
            height: 52px;
            line-height: 52px;
        }
        &:last-child {
            border: 0;
        }
    }
}

.empty-tip {
    padding-top: 162px;
    text-align: center;
    img {
        width: 260px;
        height: 180px;
        margin: 0 auto 16px;
    }
    div {
        font-size: 14px;
        color: #3a3d4b;
    }
}
.pagination {
    margin-top: 30px;
}
.swiper-slide {
    width: auto !important;
}
</style>
