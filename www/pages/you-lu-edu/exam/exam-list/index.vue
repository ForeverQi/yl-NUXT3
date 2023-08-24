<template>
    <div class="exam-list-page">
        <div class="header-box">
            <div class="banner-c">
                <div class="title-box">
                    <p class="title">{{ examProject.projectName }}</p>
                    <div class="switch-box" @click="handleSwitchProject">
                        <img class="icon" src="../assets/img/toggle.png" alt="" />
                        <span class="switch-exam">切换考试</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!noProject">
            <div class="subject-box">
                <div class="banner-c">
                    <SubjectNav ref="subjectNav" @no-project="noProjectCB" />
                </div>
            </div>
            <div class="recommend-box banner-c">
                <div class="gg-box">
                    <div v-for="(item, index) in topCode" :key="item" class="img">
                        <AdSection
                            :project-id="examProject.projectId"
                            :empty-hide="false"
                            :ad-code="item"
                            @item-click="
                                (ev) => {
                                    handleAdItemClick(ev, index);
                                }
                            "
                        />
                    </div>
                </div>
                <ExamCollection />
            </div>
            <div v-if="showUpdateNotice" class="banner-c notification-box">
                <img class="notification-img" src="../assets/img/notification.png" alt="" />
                <p class="notification-text">{{ updateNoticeData.updatePcMsg }}</p>
            </div>
            <div class="exam-content-box banner-c">
                <div class="exam-list">
                    <TypeList :papertype-code="papertypeCode" :setting-list="moduleSettingList" />
                    <ChapterBrush v-if="papertypeCode === 'ZJLX' && isShowModule('ZJLX')" ref="examList" />
                    <PastExams v-if="papertypeCode === 'LNZT' && isShowModule('LNZT')" ref="examList" />
                    <MockTestPapers v-if="papertypeCode === 'MNST' && isShowModule('MNST')" ref="examList" />
                    <SmartExercise v-if="papertypeCode === 'ZNLX' && isShowModule('ZNLX')" ref="examList" />
                    <SpecialRegionPractice v-if="papertypeCode === 'DQZL' && isShowModule('DQZL')" ref="examList" />
                    <MockExam v-if="papertypeCode === 'MKDS' && isShowModule('MKDS')" ref="examList" />
                    <SpecialQuestionBrushing
                        v-if="papertypeCode === 'ZXTK' && isShowModule('ZXTK')"
                        ref="examList"
                        :crumbs="crumbs"
                        :question-bank-status="1"
                    />
                </div>
                <div class="exam-list-recommend">
                    <DailyPractice v-if="isShowModule('MRYL')" />
                    <ActivityBrush v-if="isShowModule('HDYQT')" class="activity-brush" />
                    <div class="wechart" v-show="false">
                        <AdSection :project-id="examProject.projectId" :ad-code="generalCode" @item-click="handleAdClick" />
                    </div>
                    <div class="romotion" v-show="false">
                        <AdSection :project-id="examProject.projectId" :ad-code="rightBtoomCode" @item-click="handleAdBClick" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="no-project banner-c">
            <div>
                <img class="img" src="../assets/img/no_project.png" alt="" />
                <p class="no-project-text">该考试暂无试题，去看看其他考试的题库吧～</p>
                <div class="btn" @click="handleSwitchProject">切换考试</div>
            </div>
        </div>
    </div>
</template>

<script>
import mix from './components/mixins/index.js';
import SubjectNav from './components/subject-nav';
import ExamCollection from './components/exam-collection';
import DailyPractice from './components/list-daily-practice';
import ActivityBrush from './components/activity-brush';
import TypeList from './components/type-list';
import ChapterBrush from './components/chapter-brush';
import PastExams from './components/past-exams';
import MockTestPapers from './components/mock-test-papers';
import SmartExercise from './components/smart-exercise';
import SpecialRegionPractice from './components/special-region-practice';
import MockExam from './components/mock-exam';
import SpecialQuestionBrushing from './components/special-question-brush';
import AdSection from '@/www/components/components/ad-section';
import track from '@/www/components/course/trial-course/js/track.js';
import '@/api/qb/api..qb-business-question-msg-query.js';
import '@/api/qb/api..query-classPaperType-setting-list.js';

export default {
    components: {
        SubjectNav,
        AdSection,
        ExamCollection,
        DailyPractice,
        ActivityBrush,
        TypeList,
        ChapterBrush,
        PastExams,
        MockTestPapers,
        SmartExercise,
        SpecialRegionPractice,
        MockExam,
        SpecialQuestionBrushing,
    },
    mixins: [mix, track],
    data() {
        return {
            topCode: ['YLWEB_TKLD01', 'YLWEB_TKLD02', 'YLWEB_TKLD03'], // 顶部广告 code
            generalCode: 'YLWEB_TKLTD', // 右侧通用广告 code
            rightBtoomCode: 'YLWEB_TKLD04', // 右侧底部广告 code
            // 缓存中用户选择的项目
            examProject: {
                projectName: '',
                projectId: '',
                projectShortname: '',
            },
            classUniquecode: '', // 项目编码
            subjectId: '', // 科目id
            papertypeCode: '', // 类型编码
            noProject: false, // 项目是否在题库存在
            updateNoticeData: {
                showUpdateNotice: false, // 是否打开部分更新通知
                updateNoticeList: [], // 打开部分更新通知的科目
                updatePcMsg: '', // 题库更新通知
                praciticeStatus: false, // 是否更新错题本/收藏夹
            },
            examSubject: {
                subjectId: '',
                subjectName: '',
            },
            examType: {
                ZJLX: '章节刷题',
                LNZT: '历年真题',
                MNST: '模拟试卷',
                ZNLX: '智能练习',
                DQZL: '地区专练',
                MKDS: '模考大赛',
                ZXTK: '专项刷题',
            },
            moduleSettingList: [],
            crumbs: [],
        };
    },
    head() {
        return this.$head({
            title: this.pageTitle,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `${this.examProject.projectName},${this.examProject.projectShortname},在线题库,题库,刷题,真题,历年真题,考试试题,试题,模拟考试,模拟试题,优路,优路教育,优路教育网,在线教育,在线培训,职业教育,素质提升,技能提升`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育 | 题库中心，海量题库资源选择，每日一练、随机抽题、章节训练，历年真题、模拟试卷、模考大赛。',
                },
            ],
        });
    },
    computed: {
        showUpdateNotice() {
            return this.updateNoticeData.showUpdateNotice && this.updateNoticeData.updateNoticeList.indexOf(this.subjectId) !== -1;
        },
        pageTitle() {
            if (this.noProject) {
                return `${this.examProject.projectName}_优路教育题库`;
            }
            return `${this.examProject.projectName}-${this.examSubject.subjectName}_${this.examType[this.$route.params.papertypeCode]}_优路教育题库`;
        },
    },
    watch: {
        '$route.params.subjectId'() {
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            this.$nextTick(() => {
                this.init();
                window.scrollTo(0, scrollTop);
            });
            Object.assign(this.examSubject, this.$storage.get('examSubject') || {});
            this.eaSetClueInfo({
                pageTitle: this.pageTitle,
                originCode: this.$route.params.papertypeCode === 'MKDS' ? this.originCodeMoKao : this.originCode,
            });
        },
        '$route.params.papertypeCode'(newV) {
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            this.$nextTick(() => {
                this.init();
                window.scrollTo(0, scrollTop);
                this.setCrumbs();
                this.eaSetClueInfo({
                    pageTitle: this.pageTitle,
                    originCode: newV === 'MKDS' ? this.originCodeMoKao : this.originCode,
                });
                this.trackWebYouluQuestionChanne({
                    channe_name: this.examType[this.$route.params.papertypeCode],
                    project_id: this.examProject.projectId,
                    subject_id: this.examSubject.subjectId,
                });
            });
        },
        examProject: {
            immediate: true,
            handler() {
                if (this.examProject.projectId) {
                    this.getModuleSettingList();
                }
            },
        },
    },
    mounted() {
        this.init();
        this.setCrumbs();
        this.eaSetClueInfo({
            pageTitle: this.pageTitle,
            originCode: this.$route.params.papertypeCode === 'MKDS' ? this.originCodeMoKao : this.originCode,
        });

        // const examCollege = this.$storage.get('examCollege');
        // this.t-rackWebYouluClickAllPages({
        //     page_type: '题库项目首页',
        //     page_name: this.pageTitle,
        //     course_name: '题库',
        //     course_type: '题库',
        //     college_name: examCollege?.collegeId ?? '',
        //     project_position: this.examProject?.projectId ?? '',
        //     subject_name: this.examSubject?.subjectId ?? '',
        //     sort_name: this.examType[this.$route.params.papertypeCode],
        //     is_pay: false,
        //     course_price: 0,
        // });
        this.$yiguan.track('youlu_click_all_pages', {
            page_name: this.pageTitle, // 页面名称
            page_url: location.href,
            page_type: '题库-首页',
            course_type: '题库',
            sort_name: '-',
            channel_name: this.examType[this.$route.params.papertypeCode],
            project_id: this.examProject.projectId ? this.examProject.projectId : '-',
            subject_id: this.examSubject.subjectId ? this.examSubject.subjectId : '-',
        });
    },
    methods: {
        init(papertypeCode = null) {
            this.classUniquecode = this.$route.params.classUniquecode;
            this.papertypeCode = papertypeCode || this.$route.params.papertypeCode;
            this.subjectId = this.$route.params.subjectId;
            this.getUpdateNotice();
            var examProject = this.$storage.get('examProject');
            if (examProject) {
                this.examProject = examProject;
            }
            Object.assign(this.examSubject, this.$storage.get('examSubject') || {});
        },
        // 项目找不到回调
        noProjectCB() {
            this.noProject = true;
        },
        // 打开学院-项目选择弹窗isTrusted
        handleSwitchProject() {
            this.$router.push('/exam/index/choose/user');
        },
        // 获取题库更新通知
        getUpdateNotice() {
            niceloo.api.call('qb/qb-business-question-msg-query', {
                classCode: this.classUniquecode,
                onsuccess: (res) => {
                    if (!res || res.status === 'N') return;
                    this.updateNoticeData.showUpdateNotice = res.validStatus === 'Y';
                    this.updateNoticeData.updateNoticeList = res.subjectIds;
                    this.updateNoticeData.updatePcMsg = res.updatePcMsg;
                    this.updateNoticeData.praciticeStatus = res.praciticeStatus === 'Y';
                },
                onerror: () => {},
                oncomplete: () => {},
            });
        },
        handleAdClick(item) {
            // this.trackWebYouluAdSpace({
            //     ad_type: '单张广告',
            //     ad_position: '题库右侧广告',
            //     ad_name: item.adName,
            //     ad_url: item.adLink,
            //     page_name: this.pageTitle,
            //     project_position: this.examProject?.projectId ?? '',
            // });
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: `题库列表页_右侧通用`,
                page_name: document.title,
            });
        },
        handleAdBClick(item) {
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: `题库列表页_右侧`,
                page_name: document.title,
            });
        },
        handleAdItemClick(item, index) {
            console.log('@@@333', item, index);
            this.$yiguan.track('web_youlu_ad_space', {
                ad_name: item.adName,
                jump_type: item.adLinkType === 1 ? 'URL链接' : item.adLinkType === 2 ? '小程序' : '无跳转',
                ad_url: item.adLinkType === 1 || item.adLinkType === 2 ? item.adLink : '',
                ad_position_name: `题库列表页-顶部0${index + 1}`,
                page_name: document.title,
            });
        },
        getModuleSettingList() {
            niceloo.api.call('qb/query-classPaperType-setting-list', {
                projectId: this.examProject.projectId,
                onsuccess: (res) => {
                    this.moduleSettingList = res;
                },
            });
        },
        isShowModule(code) {
            const item = this.moduleSettingList.find((item) => item.code === code);
            if (item) {
                return item.showStatus !== 'H';
            } else if (code === 'HDYQT') {
                return false;
            } else if (code === 'DQZL') {
                return false;
            } else if (code === 'MKDS') {
                return false;
            }
            return true;
        },
        // 配置跳转到题库详情页面包屑导航
        setCrumbs() {
            const crumbs = [
                {
                    name: '题库首页',
                    href: `/exam/index/list/${this.classUniquecode}/${this.$route.params.ptagId}/${this.$route.params.papertypeCode}/${this.subjectId}`,
                },
            ];
            this.crumbs = crumbs;
        },
    },
};
</script>

<style lang="less" scoped>
.banner-c {
    margin: 0 auto;
    width: 1200px;
}
.header-box,
.subject-box {
    background: #fff;
}
.exam-list-page {
    padding-bottom: 74px;
}
.title-box {
    padding-top: 32px;
    padding-bottom: 34px;
    display: flex;
    align-items: center;
    // background: #fff;
    .title {
        margin-right: 20px;
        font-size: 24px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 31px;
    }
    .switch-box {
        display: flex;
        align-items: center;
        cursor: pointer;
        .icon {
            width: 16px;
            height: 16px;
        }
        .switch-exam {
            margin-left: 4px;
            font-size: 14px;
            font-weight: 400;
            color: #77798d;
            line-height: 16px;
            letter-spacing: 0.58px;
        }
    }
}
.recommend-box {
    margin-top: 40px;
    display: flex;
    align-items: center;
    .gg-box {
        margin-right: 4px;
        display: flex;
        align-items: center;
        .img {
            margin-right: 20px;
            width: 270px;
            height: 144px;
            border-radius: 8px;
            cursor: pointer;
            overflow: hidden;
        }
    }
}
.notification-box {
    margin-top: 14px;
    padding: 16px 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    background: #fff;
    border-radius: 8px;
    .notification-img {
        margin-right: 12px;
        width: 20px;
        height: 20px;
    }
    .notification-text {
        font-size: 14px;
        font-weight: 400;
        color: #ff2e30;
        line-height: 19px;
        letter-spacing: 0.58px;
    }
}
.exam-content-box {
    margin-top: 16px;
    display: flex;
    align-items: flex-start;
    .exam-list {
        margin-right: 24px;
        padding: 24px 40px 32px 40px;
        padding-bottom: 51px;
        box-sizing: border-box;
        flex-shrink: 0;
        width: 852px;
        background: #fff;
    }
    .exam-list-recommend {
        .activity-brush {
            margin-top: 16px;
        }
        .wechart {
            margin-top: 16px;
            width: 324px;
            height: 180px;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
        }
        .romotion {
            margin-top: 16px;
            width: 324px;
            height: 440px;
            border-radius: 8px;
            overflow: hidden;
        }
    }
}
.no-project {
    display: flex;
    align-items: center;
    justify-content: center;
    .img {
        display: block;
        width: 260px;
        height: 180px;
    }
    .no-project-text {
        margin-top: 16px;
        font-size: 14px;
        font-weight: 400;
        color: #3a3d4b;
        line-height: 19px;
        text-align: center;
    }
    .btn {
        margin: 0 auto;
        margin-top: 40px;
        width: 136px;
        height: 38px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 38px;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 29px;
        cursor: pointer;
    }
}
</style>
