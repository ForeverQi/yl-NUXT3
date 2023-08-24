<template>
    <div class="project-chnnel-wrap" v-if="!isError && !isLoading && !isInvalid">
        <div class="top-banner-container">
            <div class="bg" :style="bgStyle"></div>
            <div class="banner-box">
                <Banner :column-id="columnId" @change="changeBg" @click-yi-guan="clickYiGuan"></Banner>
            </div>
            <AdSection :column-id="columnId" @click-yi-guan="clickYiGuan"></AdSection>
        </div>
        <div class="project-chnnel-container">
            <div class="left-course-box" :class="[isHaveInformation ? '' : 'no-information-left-course-box']">
                <!-- 体验课 -->
                <div
                    v-if="projectChannelConfig['trial'] && projectChannelConfig['trial'].enableStatus === 'Y'"
                    class="course-container"
                    :class="[isHaveInformation ? 'have-information-height' : '']"
                >
                    <div class="top-title-box">
                        <div class="top-course-title">体验课</div>
                        <div class="watch-more" @click="jumpLookMoreTrialCourse">更多体验课</div>
                        <div class="right-arrow-box"></div>
                    </div>
                    <div class="course-content" v-if="trialList.length">
                        <div
                            class="trial-course-item"
                            v-for="(item, index) in trialList"
                            :key="index"
                            :class="[
                                isHaveInformation && (index + 1) % 3 === 0 ? 'no-margin' : '',
                                !isHaveInformation && (index + 1) % 5 === 0 ? 'no-margin' : '',
                            ]"
                        >
                            <TrialCourse
                                :width="isHaveInformation ? '266px' : '224px'"
                                :height="isHaveInformation ? '285px' : '269px'"
                                :img-heght="isHaveInformation ? '166px' : '140px'"
                                :course-data="item"
                                :is-one-line-title="true"
                                @click-yi-guan="clickYiGuan"
                            ></TrialCourse>
                        </div>
                    </div>
                    <div v-else class="trial-empty-box" :class="[isHaveInformation ? '' : 'no-information-trial-empty-box']">
                        <Empty :status="loadingData.trial.isError ? 'error' : 'empty'"></Empty>
                    </div>
                </div>
                <!-- 系统课 -->
                <div
                    class="course-container"
                    v-if="projectChannelConfig['pro'] && projectChannelConfig['pro'].enableStatus === 'Y'"
                    :class="[isHaveInformation ? 'no-margin-course-container' : '']"
                >
                    <div class="top-title-box">
                        <div class="top-course-title">系统课</div>
                        <div class="watch-more" @click="jumpLookMoreProCourse">更多系统课</div>
                        <div class="right-arrow-box"></div>
                    </div>
                    <div class="course-content" v-if="proCourseList.length">
                        <div
                            class="course-item"
                            v-for="(item, index) in proCourseList"
                            :key="index"
                            :class="[
                                isHaveInformation ? 'have-information-margin' : '',
                                isHaveInformation && (index + 1) % 3 === 0 ? 'no-margin' : '',
                                !isHaveInformation && (index + 1) % 4 === 0 ? 'no-margin' : '',
                            ]"
                        >
                            <ProCourse
                                :course-data="item"
                                :area-name="areaName"
                                :width="isHaveInformation ? '266px' : '280px'"
                                :height="isHaveInformation ? '303px' : '312px'"
                                :img-height="isHaveInformation ? '166px' : '175px'"
                                :college-name="titleName"
                                page-type="项目频道页"
                                entrance-resource="系统课-免费试听"
                                @click-yi-guan="clickYiGuan"
                            ></ProCourse>
                        </div>
                    </div>
                    <div v-else class="pro-empty-box">
                        <Empty :status="loadingData.pro.isError ? 'error' : 'empty'"></Empty>
                    </div>
                </div>
                <!-- 师资 -->
                <div
                    class="teacher-section-box"
                    :class="[isHaveInformation ? 'h-300' : 'h-360']"
                    v-if="projectChannelConfig['teacher'] && projectChannelConfig['teacher'].enableStatus === 'Y'"
                >
                    <TeacherSection :is-have-information="isHaveInformation" :column-id="columnId"></TeacherSection>
                </div>
                <!-- 图书 -->
                <div class="book-wrap" v-if="projectChannelConfig['book'] && projectChannelConfig['book'].enableStatus === 'Y'">
                    <!-- 顶部标题 -->
                    <div class="top-title-box">
                        <div class="top-course-title">图书</div>
                        <span class="watch-more" @click="jumpLookMoreBooks">更多图书</span>
                        <div class="right-arrow-box"></div>
                    </div>
                    <div class="book-container" :class="[isHaveInformation ? '' : 'no-information-book-container']" v-if="bookList.length">
                        <Book
                            v-for="(item, index) in bookList"
                            :key="index"
                            :class="[
                                isHaveInformation ? 'have-information-book-item' : 'no-information-book-item',
                                isHaveInformation && (index + 1) % 2 === 0 ? 'no-margin-book' : '',
                                !isHaveInformation && index + 1 === bookList.length ? 'no-margin-book' : '',
                            ]"
                            :is-have-information="isHaveInformation"
                            :item="item"
                            @click-yi-guan="clickYiGuan"
                        ></Book>
                    </div>
                    <div v-else class="book-empty-box">
                        <Empty :status="loadingData.book.isError ? 'error' : 'empty'"></Empty>
                    </div>
                </div>
            </div>
            <!-- 右边内容 -->
            <div class="right-information-box" v-show="isHaveInformation">
                <div
                    class="information-item"
                    v-for="(item, index) in rightContentList"
                    :key="index"
                    :class="[index === 1 ? 'tk-information-item' : '', index === rightContentList.length - 1 ? 'information-item-no-margin' : '']"
                >
                    <template v-if="item.moduleCode === 'article'">
                        <ArticleOne
                            v-if="item.enableTemplateCode === 'mould1'"
                            :column-id="columnId"
                            :title-name="item.customerModuleName"
                            @click-yi-guan="clickYiGuan"
                        ></ArticleOne>
                        <ArticleTwo
                            v-if="item.enableTemplateCode === 'mould2'"
                            :column-id="columnId"
                            :title-name="item.customerModuleName"
                            @click-yi-guan="clickYiGuan"
                        ></ArticleTwo>
                    </template>
                    <template v-if="item.moduleCode === 'exam'">
                        <ExamOne
                            v-if="item.enableTemplateCode === 'mould1'"
                            :project-info="projectInfo"
                            :column-id="columnId"
                            :title-name="item.customerModuleName"
                            @click-yi-guan="clickYiGuan"
                        ></ExamOne>
                        <ExamTwo
                            v-if="item.enableTemplateCode === 'mould2'"
                            :column-id="columnId"
                            :title-name="item.customerModuleName"
                            @click-yi-guan="clickYiGuan"
                        ></ExamTwo>
                    </template>
                    <template v-if="item.moduleCode === 'information'">
                        <ExamInformation
                            :column-id="columnId"
                            :project-info="projectInfo"
                            :title-name="item.customerModuleName"
                            @click-yi-guan="clickYiGuan"
                        ></ExamInformation>
                    </template>
                    <template v-if="item.moduleCode === 'ad1'">
                        <AdCustom :column-id="columnId" :ad-code="'ZDYGG1'" :title-name="item.customerModuleName" @click-yi-guan="clickYiGuan"></AdCustom>
                    </template>
                    <template v-if="item.moduleCode === 'ad2'">
                        <AdCustom :column-id="columnId" :ad-code="'ZDYGG2'" :title-name="item.customerModuleName" @click-yi-guan="clickYiGuan"></AdCustom>
                    </template>
                    <template v-if="item.moduleCode === 'ad3'">
                        <AdCustom :column-id="columnId" :ad-code="'ZDYGG3'" :title-name="item.customerModuleName" @click-yi-guan="clickYiGuan"></AdCustom>
                    </template>
                </div>
            </div>
        </div>
        <!-- 关于优路 -->
        <div
            :class="[
                projectChannelConfig['introduce'] && projectChannelConfig['introduce'].enableStatus === 'Y' ? 'about-section' : '',
                isHaveInformation ? '' : 'no-information',
            ]"
        >
            <AboutSection v-if="projectChannelConfig['introduce'] && projectChannelConfig['introduce'].enableStatus === 'Y'" @click-yi-guan="clickYiGuan" />
        </div>
        <!-- 分校 -->
        <div :class="projectChannelConfig['introduce'] && projectChannelConfig['introduce'].enableStatus === 'Y' ? 'have-school-section' : 'no-school-section'">
            <SchoolSection
                v-if="projectChannelConfig['introduce'] && projectChannelConfig['introduce'].enableStatus === 'Y'"
                @click-yi-guan="clickYiGuan"
            ></SchoolSection>
        </div>
    </div>
    <div v-else class="project-chnnel-empty-wrap">
        <Empty :status="errorStatus"></Empty>
    </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import track from './js/track.js';
import Banner from '@/www/components/project-channel/swiper/index.vue';
import TeacherSection from '@/www/components/project-channel/teacher-section/index.vue';
import ArticleOne from '@/www/components/project-channel/article0.1/index.vue';
import ArticleTwo from '@/www/components/project-channel/article0.2/index.vue';
import ExamOne from '@/www/components/project-channel/exam0.1/index.vue';
import ExamTwo from '@/www/components/project-channel/exam0.2/index.vue';
import AdCustom from '@/www/components/project-channel/ad-custom/index.vue';
import ExamInformation from '@/www/components/project-channel/exam-information/index.vue';
import AdSection from '@/www/components/project-channel/ad-section/index.vue';
import Empty from '@/www/components/components/empty/index.vue';
import AboutSection from '@/www/components/index/about-section/index.vue';
import SchoolSection from '@/www/components/index/school-section/index.vue';
import FreeCourse from '@/www/components/components/free-course/index.vue';
import TrialCourse from '@/www/components/components/trial-course/index.vue';
import ReferenceInformation from '@/www/components/components/reference-information/index.vue';
import ProCourse from '@/www/components/components/pro-course/index.vue';
import Book from '@/www/components/project-channel/book/index.vue';
import '@/api/channel/api..query-project-channel-config.js';
import '@/api/channel/api..query-project-channel-pro-course-list.js';
import '@/api/channel/api..query-project-channel-trial-course-list.js';
import '@/api/channel/api..query-info-by-seoCode.js';
import '@/api/ctc/api..query-project-detail.js';
import '@/api/channel/api..query-column-bookList.js';
export default {
    components: {
        Banner,
        AdSection,
        FreeCourse,
        TrialCourse,
        ProCourse,
        TeacherSection,
        ArticleOne,
        ArticleTwo,
        ExamOne,
        ExamTwo,
        ExamInformation,
        AdCustom,
        Empty,
        ReferenceInformation,
        AboutSection,
        SchoolSection,
        Book,
    },
    mixins: [track],
    layout: 'channelLayout',
    data() {
        return {
            isHaveInformation: false, //  是否含有资讯
            projectChannelConfig: {}, // 项目频道配置集合
            rightContentList: [], // 右侧资讯列表
            projectInfo: {}, // 项目信息
            projectIds: '', // 项目id
            channelCode: '', // 频道页code
            columnId: '', // 频道页id
            areaCode: '', // 地域编码
            areaName: '', // 地域名称
            trialList: [], // 体验课列表
            proCourseList: [], // 系统课列表
            bookList: [], //图书列表
            isError: false, // 是否异常
            isLoading: true, // 是否加载中
            isInvalid: false, // 是否失效
            titleName: '', // 频道页名称
            loadingData: {
                trial: {
                    isError: false,
                },
                pro: {
                    isError: false,
                },
                book: {
                    isError: false,
                },
            }, // 加载的data
            bgStyle: {},
            columnConfig: '', // 频道页基本信息
        };
    },
    fetch() {
        const { channelCode } = this.$route.params;
        this.channelCode = channelCode;
        this.$Promotion.setCLueInfo({
            url: typeof location === 'undefined' ? '' : location.href,
            pageName: this.pageName,
            projectCode: '',
            originCode: 'guanwangzhuc',
            clueWaycode: 'zhuce',
        });
        return this.queryProjectChannelInfo();
    },
    head() {
        return this.$head({
            // eslint-disable-next-line
            title: this.pageName,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    // eslint-disable-next-line
                    content: `考试培训,考试辅导,报考条件,报考时间,视频教程,免费试听,培训视频,系统学习,备考资料,${this.titleName || '项目频道'}${
                        this.projectInfo.projectName ? `,${this.projectInfo.projectName}` : ''
                    },优路,优路教育,优路教育网,在线教育,在线培训`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
    computed: {
        errorStatus() {
            let status = 'empty';
            if (this.isLoading) {
                status = 'load';
            }
            if (this.isInvalid) {
                status = 'invalid';
            }
            if (this.isError) {
                status = 'error';
            }
            return status;
        },

        // 页面名称
        pageName() {
            return `${this.titleName || '项目频道'}${
                this.projectInfo.projectName ? `_${this.projectInfo.projectName}` : ''
            }|考试辅导|报考条件|视频教程|免费试听|备考资料_优路教育`;
        },
    },
    methods: {
        ...mapActions('common/city', {
            getArea: 'getArea',
        }),
        ...mapMutations('onlineService', { setProjectCode: 'setProjectCode' }),
        // 查询项目频道页信息
        queryProjectChannelInfo() {
            return new Promise((resolve, reject) => {
                this.$callApi('channel/query-info-by-seoCode', {
                    // 频道编码
                    columnSeoNo: this.channelCode,
                    onsuccess: (data) => {
                        this.isLoading = false;
                        if (data.columnId) {
                            this.columnConfig = data;
                            this.columnId = data.columnId;
                            this.projectIds = data.projectIds || '';
                            this.titleName = data.columnTitle || data.columnName;
                            Promise.all([this.queryProjectChannelConfig(), this.queryProjectInfo()])
                                .then(() => {
                                    this.isLoading = false;
                                    console.log(data, this.projectInfo);
                                    // 预览页面易观埋点
                                    // this.t-rackWebYouluClickAllPages({
                                    //     page_type: '项目频道页',
                                    //     page_name: this.pageName || '项目频道',
                                    //     course_type: '项目频道页',
                                    //     college_name: '-',
                                    //     project_position: this.projectInfo.projectName,
                                    //     subject_name: '-',
                                    //     sort_name: '-',
                                    //     is_pay: false,
                                    //     course_price: '-',
                                    // });

                                    this.$yiguan.track('youlu_click_all_pages', {
                                        page_name: document.title, // 页面名称
                                        page_url: location.href,
                                        page_type: '项目频道页',
                                        course_type: '-',
                                        sort_name: '-',
                                        channel_name: '-',
                                        project_id: this.projectInfo.projectId ?? '-',
                                        subject_id: '-',
                                    });

                                    resolve();
                                })
                                .catch(() => {
                                    this.isLoading = false;
                                    this.isInvalid = true;
                                    resolve();
                                });
                        } else {
                            this.isLoading = false;
                            this.isInvalid = true;
                            reject();
                        }
                    },
                    onerror: () => {
                        this.isLoading = false;
                        this.isError = true;
                        reject();
                    },
                });
            });
        },
        // 查询项目频道页关联的第一个项目信息
        queryProjectInfo() {
            return new Promise((resolve) => {
                this.$callApi('ctc/query-project-detail', {
                    // 项目seo编码
                    projectId: this.projectIds.split(',')[0],
                    onsuccess: (data) => {
                        this.projectInfo = data;
                        this.$Promotion.setCLueInfo({
                            url: process.client ? location.href : '',
                            pageName: this.pageName,
                            projectCode: this.projectInfo.projectCode,
                            originCode: 'guanwangzhuc',
                            clueWaycode: 'zhuce',
                        });
                        this.setProjectCode(data.projectSeoCode);
                    },
                    onerror: () => {},
                    oncomplete: () => {
                        resolve();
                    },
                });
            });
        },
        // 查询项目频道页配置信息
        queryProjectChannelConfig() {
            return new Promise((resolve, reject) => {
                this.$callApi('channel/query-project-channel-config', {
                    // 频道标识
                    columnId: this.columnId,
                    onsuccess: (data) => {
                        if (data.avlStatus === 'N') {
                            this.isInvalid = true;
                            return;
                        }
                        // styleType Y 有资讯 N 无资讯
                        let configList = data.styleType === 'Y' ? data.advisoryData : data.noneAdvisoryData;
                        let configObject = {};
                        let rightContentList = [];
                        configList.forEach((element) => {
                            let key = element.moduleCode;
                            configObject[key] = element;
                            if (element.moduleType === 'R') {
                                rightContentList.push(element);
                            }
                        });
                        this.rightContentList = rightContentList;
                        this.projectChannelConfig = configObject;
                        this.isHaveInformation = data.styleType === 'Y';
                        this.getArea()
                            .then((res) => {
                                this.areaCode = res.cityCode;
                                this.areaName = res.cityName;
                                Promise.all([this.queryProjectChannelProCourseList(), this.queryProjectChannelTrailList(), this.queryProjectChannelBooksList()])
                                    .then(() => {
                                        resolve();
                                    })
                                    .catch(() => {
                                        reject();
                                    });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    },
                    onerror: () => {
                        this.isLoading = false;
                        this.isError = true;
                        reject();
                    },
                    oncomplete: () => {
                        this.isLoading = false;
                    },
                });
            });
        },
        // 跳转体验课更多
        jumpLookMoreTrialCourse() {
            console.log(this.projectInfo.projectSeoCode);
            let linkUrl = `/trial-course/all/all`;
            if (this.projectInfo) {
                linkUrl = `/trial-course/all/${this.projectInfo.projectSeoCode}`;
            }
            if (this.projectInfo && this.projectInfo.ptagId) {
                linkUrl = `/trial-course/all/all/${this.projectInfo.ptagId}`;
            }
            this.$PageUtil.openNewPage(linkUrl);
        },
        // 跳转系统课更多
        jumpLookMoreProCourse() {
            let linkUrl = `/pro-course/all/all`;
            if (this.projectInfo) {
                linkUrl = `/pro-course/all/${this.projectInfo.projectSeoCode}`;
            }
            if (this.projectInfo && this.projectInfo.ptagId) {
                linkUrl = `/pro-course/all/all/${this.projectInfo.ptagId}`;
            }
            this.$PageUtil.openNewPage(linkUrl);
        },
        // 跳转图书更多
        jumpLookMoreBooks() {
            let linkUrl = `/books/all/all`;
            if (this.projectInfo) {
                linkUrl = `/books/all/${this.projectInfo.projectSeoCode}`;
            }
            if (this.projectInfo && this.projectInfo.ptagId) {
                linkUrl = `/books/all/all/${this.projectInfo.ptagId}`;
            }
            this.$PageUtil.openNewPage(linkUrl);
        },
        queryProjectChannelProCourseList() {
            return new Promise((resolve, reject) => {
                this.$callApi('channel/query-project-channel-pro-course-list', {
                    // 地区编码
                    areacode: this.areaCode,
                    // 班型显示端WEB:网站;ADR:安卓;IOS:ios;WAP:wap;CRM:crm
                    classtypeShowitem: 'WEB',
                    // 频道标识
                    columnId: this.columnId,
                    // 获取数量
                    pageSize: this.isHaveInformation ? 6 : 8,
                    onsuccess: (data) => {
                        if (data.classTypeList && data.classTypeList.length) {
                            this.proCourseList = data.classTypeList;
                        }
                        resolve();
                    },
                    onerror: () => {
                        this.loadingData.pro.isError = true;
                        reject();
                    },
                    oncomplete: () => {},
                });
            });
        },
        // 查询图书
        queryProjectChannelBooksList() {
            return new Promise((resolve) => {
                this.$callApi('channel/query-column-bookList', {
                    columnId: this.columnId,
                    findCount: this.isHaveInformation ? 4 : 3,
                    showClient: 'W',
                    onsuccess: (res) => {
                        this.bookList = res;
                    },
                    onerror: () => {
                        this.loadingData.book.isError = true;
                    },
                    oncomplete: () => {
                        this.loading = false;
                        resolve();
                    },
                });
            });
        },
        queryProjectChannelTrailList() {
            return new Promise((resolve, reject) => {
                this.$callApi('channel/query-project-channel-trial-course-list', {
                    // 栏目id
                    columnId: this.columnId,
                    // 查询条数
                    findCount: this.isHaveInformation ? 6 : 5,
                    // 显示端
                    showClient: 'W',
                    onsuccess: (data) => {
                        if (data.trialCourseUserVoList && data.trialCourseUserVoList.length) {
                            this.trialList = data.trialCourseUserVoList;
                        }
                        resolve();
                    },
                    onerror: () => {
                        this.loadingData.trial.isError = true;
                        reject();
                    },
                    oncomplete: () => {},
                });
            });
        },
        changeBg(style) {
            this.bgStyle = style;
        },

        // 点击易观埋点
        clickYiGuan(ops) {
            this.trackWebYouluProjectChannelPage({
                channel_name: this.columnConfig.columnName,
                abbreviation_name: this.columnConfig.columnShortName,
                channel_project_id: this.projectIds ? this.projectIds : '-',
                module_type: ops.module_type || '-',
                type_formwork: ops.type_formwork || '-',
                course_name: ops.course_name || '-',
                project_id: this.columnConfig.projectIds,
                subject_id: ops.subject_id || '-',
            });
        },
    },
};
</script>
<style scoped lang="less" src="./css/index.less"></style>
