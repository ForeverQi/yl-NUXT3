<template>
    <div class="class-wrap">
        <!-- 公共头部 -->
        <global-header :is-fixed="false" />
        <div ref="contentRef" class="content-wrap" v-loading="isLoading">
            <!-- 加载出错页面 -->
            <div v-show="isError" class="empty-state">
                <img src="./asset/images/error.png" alt="暂无数据" />
                <p class="hint-txt">您的网络开小差了，刷新页面再试一次～</p>
                <button class="reload-btn" @click="queryInfoData">刷新试试</button>
            </div>
            <!-- 产品不存在页面 -->
            <div v-show="isNull" class="empty-state">
                <img src="./asset/images/null.png" alt="暂无数据" />
                <p class="hint-txt">该产品已下架，去看看去其他产品吧～</p>
                <a href="/pro-course" class="reload-btn">返回系统课</a>
            </div>
            <div v-if="!isError && !isNull">
                <!-- 主宣传图区域 -->
                <banner-module :is-loading="isLoading" :data="classData" :project-seo-code="project.projectSeoCode" @click-buy="openBuyDialog('1')" />
                <!-- 主要内容 -->
                <div class="content-box main">
                    <!-- 浮动导航条 -->
                    <div v-show="isShowFixedNav" class="fixed-nav">
                        <div class="fixed-content">
                            <div class="left-box">
                                <span class="nav-item" :class="{ active: activePage === 'intro' }" @click="activePage = 'intro'">课程介绍</span>
                                <span
                                    v-if="moduleList.length"
                                    class="nav-item"
                                    :class="{ active: activePage === 'catalogue' }"
                                    @click="activePage = 'catalogue'"
                                >
                                    课程目录
                                </span>
                                <span
                                    v-if="classData.teacherIntroduce.length"
                                    class="nav-item"
                                    :class="{ active: activePage === 'teacher' }"
                                    @click="activePage = 'teacher'"
                                >
                                    授课教师
                                </span>
                            </div>
                            <div class="price-box">
                                <span class="price-num">
                                    <span class="price-ico">¥</span>
                                    <span>{{ classData | filterPrice }}</span>
                                </span>
                                <span class="audition" v-if="classData.auditionStatus === 'Y'" @click="toAudition">免费试听</span>
                                <div class="buy-btn" @click="openBuyDialog('2')">立即购买</div>
                            </div>
                        </div>
                    </div>
                    <!-- 固定导航条 -->
                    <div ref="navBox" class="nav-wrap">
                        <div class="left">
                            <span class="nav-item" :class="{ active: activePage === 'intro' }" @click="activePage = 'intro'">课程介绍</span>
                            <span
                                v-if="moduleList.length"
                                class="nav-item"
                                :class="{ active: activePage === 'catalogue' }"
                                @click="(activePage = 'catalogue'), (selectIndex = 1)"
                            >
                                课程目录
                            </span>
                            <span
                                v-if="classData.teacherIntroduce.length"
                                class="nav-item"
                                :class="{ active: activePage === 'teacher' }"
                                @click="activePage = 'teacher'"
                            >
                                授课教师
                            </span>
                        </div>

                        <div class="right" v-if="classData.auditionStatus === 'Y' && activePage === 'catalogue'">
                            <div class="item" :class="{ this: selectIndex === 1 }" @click="changeSelectIndex(1)">
                                <div class="checkbox"></div>
                                查看全部目录
                            </div>
                            <div class="item" :class="{ this: selectIndex === 2 }" @click="changeSelectIndex(2)">
                                <div class="checkbox"></div>
                                仅看试听目录
                            </div>
                        </div>
                    </div>
                    <!-- 课程介绍 -->
                    <intro-page
                        v-show="activePage === 'intro'"
                        :is-nav-fixed="isShowFixedNav"
                        :component-arr-nav="componentArr"
                        :classtype-lessonintroduce-after="classtypeLessonintroduceAfter"
                    />
                    <!-- 课程列表 -->
                    <catalogue-page
                        ref="catalogue"
                        v-show="activePage === 'catalogue'"
                        :classtype-id="classtypeId"
                        :project="project"
                        :class-data="classData"
                        :select-index="selectIndex"
                        @module-ready="moduleReady"
                        @update-course-list="updateCourseList"
                        @click-listen="openPlay"
                    />
                    <!-- 授课教师 -->
                    <teacher-page v-if="classData.teacherIntroduce.length" v-show="activePage === 'teacher'" :teacher-list="classData.teacherIntroduce" />
                </div>
            </div>
        </div>
        <!-- 同类好课 -->
        <div class="content-box similar">
            <similar-course :classtype-id="classtypeId" :project-seo-code="project.projectSeoCode" />
        </div>
        <!-- 购买弹窗 -->
        <buy-dialog :data="classData" :project="project" :page-type="pageType" :show.sync="isShowBuyDialog" :click-position="clickPosition" />
        <!-- 视频预览弹窗 -->
        <video-dialog
            v-if="isShowVideo"
            :default-vid="defaultVid"
            :default-courseware-id="defaultCoursewareId"
            :default-courseware-name="defaultCoursewareName"
            :default-courseware-duration="defaultCoursewareDuration"
            :class-data="classData"
            :course-list="courseList"
            @close="isShowVideo = false"
            @click-buy="openBuyDialog('3')"
        />
        <!-- 公共底部 -->
        <global-footer />
        <!-- <side-fixed-section /> -->
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import '@/www/components/package/index';
import '@/api/ctc/api..quey-system-class.js';
import '@/api/ctc/api..query-project-detail.js';

import GlobalHeader from '@/layouts/components/global-header/index.vue';
import GlobalFooter from '@/layouts/components/global-footer/index.vue';
// import SideFixedSection from '@/www/components/components/side-fixed-section/index.vue';

import BannerModule from '@/www/components/course/pro-course/detail/banner-module.vue';
import IntroPage from '@/www/components/course/pro-course/detail/intro-page.vue';
import CataloguePage from '@/www/components/course/pro-course/detail/catalogue-page.vue';
import TeacherPage from '@/www/components/course/pro-course/detail/teacher-page.vue';
import SimilarCourse from '@/www/components/course/pro-course/detail/similar-course.vue';
import BuyDialog from '@/www/components/course/pro-course/detail/buy-dialog.vue';
import VideoDialog from '@/www/components/course/pro-course/detail/video-dialog.vue';
import track from '@/www/components/course/free-course/js/track.js';

export default {
    components: {
        // SideFixedSection,
        GlobalHeader,
        GlobalFooter,
        BannerModule,
        IntroPage,
        CataloguePage,
        TeacherPage,
        SimilarCourse,
        BuyDialog,
        VideoDialog,
    },
    mixins: [track],
    provide() {
        return {
            queryIsLose: this.queryIsLose,
        };
    },
    layout: 'nullLayout',
    data() {
        return {
            isNull: false, // 是否为不存在的课程（可能为下架）
            isError: false, // 接口请求是否异常
            isLoading: true, // 加载状态
            isShowVideo: false, //是否展示视频弹窗
            isShowFixedNav: false, // 详情引导条是否需要浮动
            activePage: 'intro', // 当前展示的页面intro详情 catalogue课程列表 teacher 授课教师
            isShowBuyDialog: false, // 是否展示购买弹窗
            clickPosition: '', //点击立即购买的位置
            classtypeLessonintroduce: [], //班型课程介绍
            classtypeLessonintroduceAfter: [],
            componentArr: [], //锚点数组
            // 查询到的课程数据
            classData: {
                highlightJson: [],
                teacherIntroduce: [],
            },
            project: {
                projectId: '',
                projectSeoCode: '', // 所属的项目seoCode
                projectCode: '',
            },
            courseList: [], // 当前选中的课程列表
            moduleList: [], //课程模块列表
            defaultVid: '', // 当前试题的课件vid
            defaultCoursewareId: '', // 当前试题的课件id
            defaultCoursewareName: '', // 当前试题的课件名称
            defaultCoursewareDuration: '', // 当前试题的课件时长
            cLueInfo: {
                url: '',
                pageName: '',
                projectId: '',
                projectCode: '',
                projectSeocode: '',
                originCode: 'xitongke',
                clueWaycode: 'yindao',
            },
            filterMinPrice: 0,
            filterMaxPrice: 0,
            selectIndex: 1,
            pageType: '资源详情页', //页面类型
        };
    },
    fetch() {
        this.activePage = this.$route.params.checked || 'intro';
        // this.classtypeId = this.$route.params.classtypeId;
        return this.queryInfoData()
            .then(() => {
                return this.queryModuleList();
            })
            .catch(() => {});
    },
    head() {
        return {
            title: `${this.classData.classtypeName != undefined ? this.classData.classtypeName + '_' : ''}优路教育`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `${this.classData ? this.classData.projectName + ',' : ''}${
                        this.project.projectShortname != undefined ? this.project.projectShortname + ',' : ''
                    }课程,视频,学习,系统学习,培训,职业培训,融合式教学,OMO,在线答疑,优路,优路教育,优路教育网,在线教育,在线培训,职业教育,素质提升,技能提升`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '',
                },
            ],
        };
    },
    computed: {
        classtypeId() {
            return this.$route.params.classtypeId;
        },
    },
    watch: {
        // 切换页面tab时如果页面过于靠下，滚动到顶部
        activePage() {
            if (process.client) {
                const scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
                if (scrollTop > this.$refs.navBox.offsetTop + this.$refs.contentRef.offsetTop) {
                    window.scrollTo(0, this.$refs.navBox.offsetTop + this.$refs.contentRef.offsetTop + 5);
                }
            }
        },
    },
    mounted() {
        window.addEventListener('scroll', this.computedNavState);
    },
    destroyed() {
        // 离开该页面需要移除这个监听的事件，不然会报错
        window.removeEventListener('scroll', this.computedNavState);
    },
    methods: {
        ...mapMutations('onlineService', { setProjectCode: 'setProjectCode' }),
        changeSelectIndex(index) {
            this.selectIndex = index;
            if (index === 2) {
                const track = {
                    course_name: this.classData.classtypeName,
                    project_id: this.classData.projectId,
                };
                this.$yiguan.track('youlu_click_jinkanshitingmulu', track);
            }
        },
        toAudition() {
            ylPlugin.login.isLogined().then((check) => {
                this.yiguanTrack(this.classData, check);
                if (check === true) {
                    this.toDetail(this.classData);
                } else {
                    this.doLogin(this.classData);
                }
            });
        },
        toDetail(data) {
            window.open(`/pro-course-tryout/${data.classtypeId}`);
        },
        doLogin(data) {
            this.$Promotion.setCLueInfo({
                url: location.href,
                pageName: document.title,
                projectId: data.projectId,
                originCode: 'xitongke',
                clueWaycode: 'yindao',
            });
            const regExtension = this.$Promotion.getClueExtensionInfo({
                clueWaycode: 'yindao',
                originCode: 'xitongke',
                pageName: data.classtypeName,
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
                { pageName: document.title, entranceResource: '系统课-免费试听', courseType: '系统课', pageType: '资源详情页' }
            );
        },
        yiguanTrack(courseData, isLoginIn) {
            const track = {
                course_name: courseData.classtypeName, // 课程名称
                project_id: courseData.projectId, // 项目名称
                page_type: '课程详情页', // 页面类型
                page_name: `${classData.classtypeName != undefined ? classData.classtypeName + '_' : ''}优路教育`, // 页面名称
                channel_name: '-', // 频道页名称
                entrance_resource: '课程详情页-免费试听按钮', // 点击位置
            };
            this.$yiguan.track('youlu_click_to_listen', track);
        },
        // 计算详情引导条是否需要浮动
        computedNavState() {
            if (this.isNull || this.isError) {
                // 如果页面为异常状态，元素不存在，避免报错
                return;
            }
            const scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
            const navTop = this.$refs.navBox.offsetTop + this.$refs.contentRef.offsetTop;
            this.isShowFixedNav = scrollTop > navTop;
        },
        // 查询模块列表
        queryModuleList() {
            return new Promise((resolve, reject) => {
                this.$callApi('cc/query-class-module-list', {
                    classtypeId: this.classtypeId,
                    onsuccess: (data) => {
                        this.moduleList = data;
                        resolve();
                    },
                    onerror: (err) => {
                        niceloo.api.handleFailure(err);
                        reject(err);
                    },
                    oncomplete: () => {},
                });
            });
        },
        updateCourseList(list) {
            this.courseList = list;
        },
        // 课程模块初始化完成，用于判断是否需要展示课程模块
        moduleReady(moduleList) {
            this.moduleList = moduleList;
        },
        // 播放视频
        async openPlay({ coursewareOnlineurl, coursewareId, coursewareName, coursewareDuration }) {
            // 如果产品已下架，后续不再执行
            if (await this.queryIsLose()) {
                return;
            }
            this.defaultVid = coursewareOnlineurl;
            this.defaultCoursewareId = coursewareId;
            this.defaultCoursewareName = coursewareName;
            this.defaultCoursewareDuration = coursewareDuration;
            // this.isShowVideo = true;
            window.open(`/pro-course-tryout/${this.classData.classtypeId}?coursewareId=${coursewareId}&moduleId=${this.$refs.catalogue.moduleId}`);
        },
        async openBuyDialog(val) {
            this.clickPosition = val;
            // 如果产品已下架，后续不再执行
            if (await this.queryIsLose()) {
                return;
            }
            this.isShowBuyDialog = true;
        },
        // 查询详情数据
        queryInfoData() {
            //返回的json格式的字段的文档说明 https://youlu.yuque.com/docs/share/5ae326fe-005b-43b3-a74a-75bbc8b074a1?#
            if (process.server) {
                this.isLoading = false;
            } else {
                this.isLoading = true;
            }

            return new Promise((resolve, reject) => {
                this.$callApi('ctc/quey-system-class', {
                    // 显示端
                    showitem: 'WEB',
                    isNeedintroducepc: 'yes',
                    isNeedintroduceapp: 'no',
                    // 班型标识
                    classTypeId: this.classtypeId,
                    onsuccess: (res) => {
                        let highlightJson = [];
                        let teacherIntroduce = [];
                        try {
                            highlightJson = JSON.parse(res.highlightJson);
                            teacherIntroduce = JSON.parse(res.teacherIntroduce);
                        } catch (error) {}
                        if (!highlightJson.length) {
                            // 如果没有json亮点字段，取老数据中的字段
                            highlightJson = res.classTypeWelfare
                                .split(',')
                                .filter((i) => i)
                                .map((i) => ({ classtypeHighlight: i }));
                        }
                        let tmpStr = '';
                        if (this.isMinPriceEqMaxPrice(res) === true) {
                            if (res.minPrice > 0) {
                                tmpStr += res.minPrice;
                            } else {
                                tmpStr += res.stdminPrice;
                            }
                        } else if (res.maxPrice > 0) {
                            tmpStr += res.maxPrice;
                        } else {
                            tmpStr += res.maxStdPrice;
                        }
                        console.log(highlightJson, res.auditionStatus, '@@');
                        if (highlightJson.length > 0 && res.auditionStatus === 'Y') {
                            // 有亮点
                            let arr = [];
                            highlightJson.forEach((r) => {
                                tmpStr += r.classtypeHighlight;
                                console.log(tmpStr, '@@');
                                if (tmpStr.split('').length < 30) {
                                    arr.push(r);
                                }
                            });
                            if (arr.length < 3) {
                                highlightJson.slice(0, 3);
                            } else {
                                highlightJson = arr;
                            }
                        }

                        // 课程介绍
                        if (res.classtypeIntroducepc != null && res.classtypeIntroducepc != '') {
                            this.classtypeLessonintroduce = JSON.parse(res.classtypeIntroducepc);
                        }
                        // 课程介绍不同类别不同处理
                        if (this.classtypeLessonintroduce.type === 'img') {
                            // this.classtypeLessonintroduce.src
                            this.componentArr = this.classtypeLessonintroduce.data.map((item) => {
                                return {
                                    name: item.linkType,
                                    key: item.locate,
                                };
                            });
                            this.classtypeLessonintroduceAfter = this.classtypeLessonintroduce;
                        } else if (this.classtypeLessonintroduce.type === 'combination') {
                            let classtypeLessonintroduce = this.classtypeLessonintroduce.data;
                            let introduceArr = [];
                            for (let i = 0; i < classtypeLessonintroduce.length; i++) {
                                if (classtypeLessonintroduce[i].data.length > 0) {
                                    introduceArr.push(classtypeLessonintroduce[i]);
                                }
                            }
                            this.classtypeLessonintroduce = introduceArr;
                            let componentArrChild = [];
                            let classtypeLessonintroduceAfterChild = [];
                            this.classtypeLessonintroduce.forEach((v, i) => {
                                if (v.data[0].type != 'temp5') {
                                    componentArrChild.push({ key: 'linkType' + i, datainfo: v, name: v.linkType });
                                }
                                if (v.data.length > 0) {
                                    v.data[0].linkType = 'linkType' + i;
                                }
                                v.data.forEach((val, index) => {
                                    val.projectId = res.projectId;
                                    classtypeLessonintroduceAfterChild.push(val);
                                });
                            });
                            this.classtypeLessonintroduceAfter = classtypeLessonintroduceAfterChild;
                            this.componentArr = componentArrChild;
                        } else {
                            let classtypeLessonintroduce = this.classtypeLessonintroduce;
                            let introduceArr = [];
                            for (let i = 0; i < classtypeLessonintroduce.length; i++) {
                                if (classtypeLessonintroduce[i].data.length > 0) {
                                    introduceArr.push(classtypeLessonintroduce[i]);
                                }
                            }
                            this.classtypeLessonintroduce = introduceArr;
                            let componentArrChild = [];
                            let classtypeLessonintroduceAfterChild = [];
                            this.classtypeLessonintroduce.forEach((v, i) => {
                                if (v.data[0].type != 'temp5') {
                                    componentArrChild.push({ key: 'linkType' + i, datainfo: v, name: v.linkType });
                                }
                                if (v.data.length > 0) {
                                    v.data[0].linkType = 'linkType' + i;
                                }
                                v.data.forEach((val, index) => {
                                    val.projectId = res.projectId;
                                    classtypeLessonintroduceAfterChild.push(val);
                                });
                            });
                            this.classtypeLessonintroduceAfter = classtypeLessonintroduceAfterChild;
                            this.componentArr = componentArrChild;
                        }

                        this.classData = {
                            ...res,
                            highlightJson,
                            teacherIntroduce,
                        };
                        if (process.client) {
                            //线索
                            this.cLueInfo.url = window.location.href;
                            this.cLueInfo.projectId = res.projectId;
                            this.cLueInfo.pageName = res.classtypeName + '_优路教育';
                            console.log('线索信息', this.cLueInfo);
                            this.$Promotion.setCLueInfo(this.cLueInfo);
                            this.trackPages();
                        }
                        /*this.isLoading = false;*/
                        resolve(res.projectId);
                    },
                    onerror: (err) => {
                        if (err.getAttachedData() && err.getAttachedData().getData().code === '1003') {
                            // 课程失效
                            this.isNull = true;
                        } else {
                            this.isError = true;
                        }
                        this.isLoading = false;
                        reject();
                    },
                    oncomplete: () => {},
                });
            }).then((projectId) => {
                this.queryProjectInfo(projectId);
            });
        },
        /**
         * 判断最低价格和最高价格是否一致
         * @retruns {boolean}
         */
        isMinPriceEqMaxPrice(data) {
            return (data.minPrice > 0 ? data.minPrice : data.stdminPrice) === (data.maxPrice > 0 ? data.maxPrice : data.stdmaxPrice);
        },
        /**
         * 查询当前产品是否失效
         * @returns {boolean}
         */
        queryIsLose() {
            return new Promise((resolve) => {
                this.$callApi('ctc/quey-system-class', {
                    // 显示端
                    showitem: 'WEB',
                    isNeedintroducepc: 'yes',
                    isNeedintroduceapp: 'no',
                    // 班型标识
                    classTypeId: this.classtypeId,
                    onsuccess: () => {
                        resolve(false);
                    },
                    onerror: (err) => {
                        if (err.getAttachedData() && err.getAttachedData().getData().code === '1003') {
                            // 课程失效
                            this.$baseUI.confirm({
                                content: '该产品已下架',
                                showCancel: false,
                                confirmText: '返回系统课',
                                success: ({ confirm }) => {
                                    if (confirm) {
                                        this.$router.replace(this.project.projectSeoCode ? `/pro-course/all/${this.project.projectSeoCode}` : '/pro-course');
                                    } else {
                                        this.isNull = true;
                                    }
                                },
                            });
                        } else {
                            this.isError = true;
                        }
                        resolve(true);
                    },
                });
            });
        },
        // 查询项目信息
        queryProjectInfo(projectId) {
            return new Promise((resolve, reject) => {
                this.$callApi('ctc/query-project-detail', {
                    // 项目标识
                    projectId,
                    onsuccess: (project) => {
                        this.isError = false;
                        this.project = {
                            ...project,
                            projectId,
                        };
                        this.setProjectCode(project.projectSeoCode);
                        this.isLoading = false;
                        // console.log('详细的项目信息', this.project);
                        resolve();
                    },
                    onerror: () => {
                        this.isError = true;
                        this.isLoading = false;
                    },
                    oncomplete: () => {
                        /*this.isLoading = false;*/
                    },
                });
            });
        },
        trackPages() {
            this.filterMinPrice = this.classData.minPrice > 0 ? this.classData.minPrice : this.classData.minStdPrice;
            this.filterMaxPrice = this.classData.maxPrice > 0 ? this.classData.maxPrice : this.classData.maxStdPrice;
            // this.t-rackWebYouluClickAllPages({
            //     page_type: '系统课详情页',
            //     page_name: this.classData.classtypeName + '优路教育',
            //     course_name: this.classData.classtypeName,
            //     course_type: '系统课',
            //     college_name: '-',
            //     project_position: this.classData.projectId,
            //     subject_name: '系统课',
            //     sort_name: '-',
            //     is_pay: true,
            //     course_price: this.filterMinPrice / 100 + '-' + this.filterMaxPrice / 100,
            // });

            this.$yiguan.track('youlu_click_all_pages', {
                page_name: `${this.classData.classtypeName != undefined ? this.classData.classtypeName + '_' : ''}优路教育`, // 页面名称
                page_url: location.href,
                page_type: '资源详情页',
                course_type: '系统课',
                sort_name: '-',
                channel_name: '-',
                project_id: this.classData.projectId,
                subject_id: '-',
            });
        },
    },
};
</script>

<style lang="less" scoped>
.class-wrap {
    overflow-x: hidden;
}
.empty-state {
    box-sizing: border-box;
    padding-top: 50px;
    height: 500px;
    text-align: center;

    .hint-txt {
        margin-top: 16px;
        font-size: 14px;
        color: #3a3d4b;
    }

    .reload-btn {
        display: block;
        width: 136px;
        height: 38px;
        margin: 40px auto 0;
        line-height: 38px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 29px;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
    }
}
.content-wrap {
    position: relative;
}
.content-box {
    width: 1200px;
    margin: 0 auto;

    &.main {
        padding-top: 64px;
    }

    &.similar {
        padding-bottom: 64px;
    }
}

.audition {
    width: 128px;
    height: 46px;
    background: #ffece8;
    border-radius: 23px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: #ff2e30;
    line-height: 46px;
    margin-right: 16px;
    cursor: pointer;
}

.nav-wrap {
    width: 1200px;
    height: 65px;
    display: flex;
    justify-content: space-between;
    padding-top: 24px;
    background-color: #f5f5f5;
}

.nav-wrap .right {
    display: flex;
    padding-top: 10px;
}

.nav-wrap .right .item {
    display: flex;
    align-items: flex-start;
    font-size: 14px;
    color: #3a3d4b;
    line-height: 16px;
    margin-left: 20px;
    cursor: pointer;
}

.nav-wrap .right .item .checkbox {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    // border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    background-image: url(./asset/images/checkbox_no.png);
    background-size: 100% 100%;
}

.nav-wrap .right .item.this .checkbox {
    border-color: #ff2e30;
    // background-color: #ff2e30;
    background-image: url(./asset/images/checkbox_y.png);
}

.nav-wrap .right .item.this {
    color: #ff2e30;
}

.nav-item {
    padding-top: 5px;
    margin-right: 56px;
    line-height: 26px;
    font-size: 20px;
    font-weight: bold;
    color: #3a3d4b;
    cursor: pointer;
    position: relative;

    &:hover {
        color: #ff2e30;
    }

    &.active {
        cursor: default;
        color: #ff2e30;

        &::after {
            content: '';
            width: 20px;
            height: 4px;
            background: #ff2e30;
            border-radius: 2px;
            position: absolute;
            left: 50%;
            top: 43px;
            transform: translateX(-50%);
        }
    }
}

.fixed-nav {
    height: 80px;
    width: 100%;
    min-width: 1200px;
    background-color: #fff;
    box-shadow: 0px 4px 10px 0px rgb(68 68 68 / 5%);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;

    .fixed-content {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .left-box {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .nav-item {
        padding-top: 0;

        &.active::after {
            top: 36px;
        }
    }

    .price-box {
        display: flex;
        align-items: center;
    }

    .price-num {
        font-size: 24px;
        font-weight: bold;
        color: #f8323c;
        margin-right: 24px;

        span {
            font-weight: bold;
        }
    }

    .price-ico {
        font-weight: bold;
        font-size: 14px;
    }
    .buy-btn {
        display: block;
        height: 46px;
        line-height: 46px;
        padding: 0 32px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 23px;
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        cursor: pointer;
    }
}
</style>
