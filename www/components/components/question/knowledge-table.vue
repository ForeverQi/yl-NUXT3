<template>
    <div class="knowledge-table" v-loading="isLoading">
        <table>
            <thead>
                <tr>
                    <th>考点名称</th>
                    <th width="164">考点重要程度</th>
                    <th width="164">考点学习</th>
                </tr>
            </thead>
        </table>
        <div class="body-box" :style="{ 'max-height': maxHeight }">
            <table>
                <tbody>
                    <tr v-for="knowledge in showKnowledgeList" :key="knowledge.knowledgeId">
                        <td>{{ knowledge.knowledgeTitle }}</td>
                        <td width="164">
                            <img v-for="i in knowledge.knowledgeStarLevel" :key="i" src="./asset/images/star-ico.png" class="star-ico" />
                        </td>
                        <td width="164">
                            <span class="text-btn" v-if="knowledge.state === 'Y'" @click="onClickKnowledgeVideo(knowledge, 'knowledge')">考点讲解</span>
                            <span class="text-btn knowledge-explain" v-if="knowledge.paperId" @click="onClickKnowledgeVideo(knowledge, 'question')">
                                精准练习
                            </span>
                            <span class="text-no" v-if="knowledge.state !== 'Y' && !knowledge.paperId">无需重点学习</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="knowledge-more" v-if="hasMore">
            <div class="knowledge-more-btn" @click="getMore">
                <span class="text">加载更多</span>
                <img class="arrow-bottom" src="./asset/images/arrow-bottom.png" alt="" />
            </div>
        </div>
        <!-- 考察考点解析 -->
        <knowledge-video
            ref="videoRef"
            show-next
            v-model="knowledgeVideoData.knowledgeId"
            :show.sync="knowledgeVideoData.isShow"
            :type="knowledgeVideoData.type"
            :list="knowledgeVideoData.list"
            @change="changeKnowledge"
            @click-question-button="handleClickQuestionButton"
        />
    </div>
</template>

<script>
import '@/api/qb/api..query-question-knowledge-list'; //试题下知识点列表
import '@/api/qb/api..query-knowledge-paper-list'; //知识点对应试卷列表
import '@/api/qb/api..query-knowledge-starlevel'; //根据知识点ids获取对应星级接口
import '@/api/qb/api..query-resourcevideo-dot-status'; //获取知识点或试题ids下考点讲解状态（视频）
import '@/api/qb/api..query-resourcevideo-associated-dot'; //获取视频解析vid信息

import KnowledgeVideo from './knowledge-video/index.vue';
export default {
    components: {
        KnowledgeVideo,
    },
    props: {
        maxHeight: {
            type: String,
            default: '470px',
        },
        questionId: {
            //试题ID
            type: String,
            default: '',
        },
        // 查看解析 是否展开
        paperParsing: {
            type: Boolean,
            default: false,
        },
        showParseImmediately: {
            type: Boolean,
            default: false,
        },
        // 专项小题库判断学员有没有做题权限
        authorStatus: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
            },
            showPageIndex: 1,
            knowledgeIds: [], //进一步查询知识点信息的id
            knowledgeList: [], //知识点数组
            knowledgeVideoData: {
                isShow: false,
                type: '',
                knowledgeId: '',
                index: 0,
                list: [],
            },
            isLoading: true,
        };
    },
    computed: {
        //表格显示的知识点数组
        showKnowledgeList() {
            return this.knowledgeList.filter((knowledge, index) => index < this.page.pageSize * this.showPageIndex);
        },
        //控制表格是否显示加载更多
        hasMore() {
            return this.showKnowledgeList.length < this.page.pageCount;
        },
        // 同时监听questionId和showParseImmediately
        listenQuestionChange() {
            const { questionId, showParseImmediately, paperParsing } = this;
            return { questionId, showParseImmediately, paperParsing };
        },
        /**
         * @returns {string} special: 从专项小题库进入
         */
        questionBankStatus() {
            return this.$route.query.questionBankStatus;
        },
    },
    watch: {
        // questionId: {
        //     handler(val) {
        //         console.log(val);
        //         val && this.queryQuestionKnowledgeList();
        //     },
        //     immediate: true,
        // },
        listenQuestionChange: {
            // handler(val) {
            //     if (val.questionId && val.showParseImmediately) {
            //         this.queryQuestionKnowledgeList();
            //     }
            // },
            handler(val) {
                const pathname = location.pathname;
                // 判断是试卷做题页和解析页，通过 paperParsing（是否展开解析）的参数来加载考察考点的内容
                const pageStatus = pathname.indexOf('/learningCenter/paper-test-result') != -1 || pathname.indexOf('/learningCenter/do-paper-test') != -1;
                if (this.questionBankStatus === 'special') {
                    // 专项小题库获取视频规则
                    if (val.paperParsing) this.queryQuestionKnowledgeList();
                } else if (pageStatus) {
                    if (val.paperParsing) this.queryQuestionKnowledgeList();
                } else if (val.showParseImmediately) {
                    this.queryQuestionKnowledgeList();
                }
            },
            immediate: true,
        },
    },
    methods: {
        //点击考点讲解中的做题练习
        handleClickQuestionButton(currentKnowledgeId) {
            const knowledge = this.knowledgeList.find((knowledge) => knowledge.knowledgeId === currentKnowledgeId);
            this.$emit('click-knowledge-question', knowledge || {});
        },
        //表格知识点加载更多
        getMore() {
            if (this.showPageIndex === this.page.pageIndex) {
                this.page.pageIndex++;
                this.showPageIndex++;
                this.queryQuestionKnowledgeList();
            } else {
                this.showPageIndex++;
            }
        },
        //考点解析弹出内切换知识点
        async changeKnowledge() {
            let index = this.knowledgeVideoData.list.findIndex((knowledge) => knowledge.knowledgeId === this.knowledgeVideoData.knowledgeId);
            if (index === this.knowledgeVideoData.list.length - 2 && this.knowledgeList.length < this.page.pageCount) {
                this.page.pageIndex++;
                await this.queryQuestionKnowledgeList();
                this.knowledgeVideoData.list = this.knowledgeList.filter((knowledge) => knowledge.state === 'Y');
            }
        },
        //点击考点解析/精准练弹窗逻辑
        async onClickKnowledgeVideo(knowledge, type) {
            if (this.questionBankStatus === 'special') {
                // 判断是否有权限
                if (!this.authorStatus) {
                    this.checkCourses();
                    return false;
                }
            }
            // 用户点击做题练习
            if (type === 'question') {
                this.$emit('click-knowledge-question', knowledge);
            } else {
                //用户点击考点讲解
                this.$emit('click-knowledge-video', knowledge);
            }

            if (this.knowledgeList.length < this.page.pageCount) {
                this.page.pageIndex++;
                await this.queryQuestionKnowledgeList();
            }
            this.knowledgeVideoData.knowledgeId = knowledge.knowledgeId;
            this.knowledgeVideoData.type = type;
            if (type === 'question' && knowledge.state === 'N') {
                //点击做题练习但是这个知识点没有
                this.knowledgeVideoData.list = this.knowledgeList.filter((item) => item.state === 'Y' || item.knowledgeId === knowledge.knowledgeId);
            } else {
                this.knowledgeVideoData.list = this.knowledgeList.filter((knowledge) => knowledge.state === 'Y');
            }

            this.knowledgeVideoData.isShow = true;
        },
        /**
         * 查询试题下知识点id列表
         * 注意：使用此接口返回的paperId用来判断是否有做题练习
         */
        queryQuestionKnowledgeList() {
            return new Promise((resolve, reject) => {
                this.isLoading = true;
                const params = {
                    questionId: this.questionId,
                    pageIndex: this.$PageUtil.getStartIndex(this.page),
                    pageSize: this.page.pageSize,
                };
                this.$callApi('qb/query-question-knowledge-list', {
                    ...params,
                    onsuccess: async (res) => {
                        this.page.pageCount = res.count;
                        this.knowledgeIds = res.data.map((knowledge) => knowledge.knowledgeId);
                        if (params.pageIndex === 0) {
                            this.knowledgeList = res.data;
                        } else {
                            this.knowledgeList.push(...res.data);
                        }
                        this.knowledgeList = JSON.parse(JSON.stringify(this.knowledgeList));
                        if (this.knowledgeList.length) {
                            const questTask = [];
                            questTask.push(this.queryKnowledgeStarlevel(), this.queryResourceVideoDotStatus());
                            await Promise.all(questTask);
                        }
                        if (!this.knowledgeList.length) {
                            this.$el.parentNode.style.display = 'none';
                        }
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {
                        this.isLoading = false;
                    },
                });
            });
        },
        //查询知识点的名称和星级
        queryKnowledgeStarlevel() {
            return new Promise((resolve, reject) => {
                this.$callApi('qb/query-knowledge-starlevel', {
                    knowledgeIds: this.knowledgeIds.toString(),
                    onsuccess: (res) => {
                        const levelList = res;
                        if (levelList && levelList.length) {
                            this.knowledgeList.forEach((knowledge) => {
                                const level = levelList.find((levelItem) => levelItem.knowledgeId === knowledge.knowledgeId);
                                if (level) {
                                    knowledge.knowledgeTitle = level.knowledgeTitle;
                                    knowledge.knowledgeStarLevel = level.knowledgeStarLevel;
                                }
                            });
                        }
                        this.knowledgeList = JSON.parse(JSON.stringify(this.knowledgeList));
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        /**
         * 根据知识点ids获取对应试卷id
         * -------注意-------
         * 因试题下知识点列表返回了paperId,所以试题解析暂时不用这个接口获取知识点关联的paperId,暂时保留，避免后续更改接口
         * -------注意-------
         */
        queryKnowledgePaperList() {
            return new Promise((resolve, reject) => {
                this.$callApi('qb/query-knowledge-paper-list', {
                    knowledgeIds: this.knowledgeIds,
                    onsuccess: (res) => {
                        const paperList = res.papers;
                        this.knowledgeList.forEach((knowledge) => {
                            const paper = paperList.find((paper) => paper.knowledgeId === knowledge.knowledgeId);
                            if (paper) {
                                knowledge.paperId = paper.paperId;
                            }
                        });
                        this.knowledgeList = JSON.parse(JSON.stringify(this.knowledgeList));
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        //根据知识点下是否有考点讲解
        queryResourceVideoDotStatus() {
            return new Promise((resolve, reject) => {
                this.$callApi('qb/query-resourcevideo-dot-status', {
                    associatedContentIds: this.knowledgeIds,
                    associatedContentType: 'K',
                    onsuccess: async (res) => {
                        const statusList = res;
                        if (statusList.length) {
                            this.knowledgeList.forEach((knowledge) => {
                                const status = statusList.find((status) => status.associatedContentId === knowledge.knowledgeId);
                                if (status) {
                                    knowledge.state = status.state;
                                }
                            });
                            const hasVedioList = this.knowledgeList.filter((knowledge) => knowledge.state === 'Y');
                            const ids = hasVedioList.map((knowledge) => knowledge.knowledgeId);
                            if (ids.length) {
                                await this.queryResourceVideoDot(ids);
                            }
                            this.knowledgeList = JSON.parse(JSON.stringify(this.knowledgeList));
                        }
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        //根据知识点下考点讲解的vid信息
        queryResourceVideoDot(knowledgeIds) {
            return new Promise((resolve, reject) => {
                this.$callApi('qb/query-resourcevideo-associated-dot', {
                    associatedContentIds: knowledgeIds,
                    associatedContentType: 'K',
                    onsuccess: (res) => {
                        const videoList = res;
                        this.knowledgeList.forEach((knowledge) => {
                            const status = videoList.find((status) => status.associatedContentId === knowledge.knowledgeId);
                            if (status) {
                                knowledge.resourceId = status.resourceId;
                                knowledge.option = {
                                    videoId: status.vid,
                                    start: status.startTime,
                                    end: status.endTime,
                                };
                            }
                        });
                        this.knowledgeList = JSON.parse(JSON.stringify(this.knowledgeList));
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
        },
        //做题
        gotoTestPage({ knowledgeId, paperId }) {
            console.log(knowledgeId, paperId);
        },
        /**
         * 非学员查看系统课的提示弹窗
         */
        checkCourses() {
            this.$baseUI.confirm({
                title: '提示',
                content: '开通本项目系统课即可查看考点讲解视频和考点下的精选习题',
                confirmText: '查看系统课',
                showCancel: false,
                confirm: () => {
                    this.$PageUtil.openNewPage('/pro-course');
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.knowledge-table {
    width: 100%;
    position: relative;
    table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
    }
    table,
    tbody,
    thead,
    th,
    td {
        border: 0;
        font-weight: normal;
    }
    th,
    td {
        padding: 14px 0 14px 10px;
        line-height: 19px;
        font-size: 14px;
        text-align: left;
    }

    th {
        background-color: #fafafa;
        color: rgba(0, 0, 0, 0.85);
    }

    td {
        border-bottom: 1px solid #e8e8e8;
        color: rgba(0, 0, 0, 0.65);
        word-break: break-all;
    }

    tr:hover td {
        background-color: #ffece8;
    }

    tr > :first-child {
        padding-left: 38px;
    }

    .star-ico {
        width: 14px;
        margin-right: 5px;
    }

    .text-btn {
        color: #057aff;
        margin-right: 16px;
        cursor: pointer;
    }
    .text-no {
        color: #999;
    }
}
.body-box {
    overflow: auto;
}
.knowledge-more {
    height: 48px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
        font-size: 14px;
        color: #99a1af;
        line-height: 20px;
    }
    .knowledge-more-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .arrow-bottom {
            width: 12px;
            height: 12px;
            margin-left: 6px;
        }
    }
}
</style>
