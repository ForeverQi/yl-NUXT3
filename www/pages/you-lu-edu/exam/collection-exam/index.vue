<template>
    <div class="collection-exam">
        <div v-if="!noProject">
            <Breadcrumb title="错题本/收藏夹/练习记录" />
            <div class="content-box">
                <div class="content-list">
                    <div class="content-nav">
                        <div class="nav-box">
                            <div
                                v-for="(value, key) in navMap"
                                :key="key"
                                class="nav-item"
                                :class="{ active: memberpapertypeCode === key }"
                                @click="toPath(key)"
                            >
                                <span class="name">{{ value }}</span>
                                <div class="bottom" />
                            </div>
                        </div>
                        <Confirm-dialog @doHandle="clearHandle" ref="dialog" />
                        <div v-if="isData" class="btn-box">
                            <div class="clear btn" @click="clickClear">{{ `清空${navMap[memberpapertypeCode]}` }}</div>
                            <div
                                v-if="showUpdateNotice && updateNoticeData.praciticeStatus && memberpapertypeCode !== 'LXJL'"
                                class="update btn"
                                @click="clickUpdate"
                            >
                                {{ `更新${navMap[memberpapertypeCode]}` }}
                            </div>
                        </div>
                    </div>
                    <div v-if="isShowToast" class="toast">{{ `${navMap[memberpapertypeCode]}已更新` }}</div>
                    <Wrong-question
                        v-if="memberpapertypeCode === 'CTB'"
                        ref="wrongQuestion"
                        :class-uniquecode="classUniquecode"
                        :subject-id="subjectId"
                        :project-id="examProject.projectId"
                        @show-btn="showBtn"
                    />
                    <Favorites
                        v-if="memberpapertypeCode === 'SCLX'"
                        ref="favorites"
                        :class-uniquecode="classUniquecode"
                        :subject-id="subjectId"
                        :project-id="examProject.projectId"
                        @show-btn="showBtn"
                    />
                    <ExerciseRecords
                        v-if="memberpapertypeCode === 'LXJL'"
                        ref="exerciseRecords"
                        :class-uniquecode="classUniquecode"
                        :subject-id="subjectId"
                        :project-id="examProject.projectId"
                        @show-btn="showBtn"
                    />
                </div>
                <div class="top-img-box">
                    <div class="top-img" v-show="false">
                        <AdSection :project-id="examProject.projectId" ad-code="YLWEB_TKLTD" />
                    </div>
                    <HotCoursesList v-if="examProject.projectId" class="hot-coursesList" :project-id="examProject.projectId" search-all />
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
import Breadcrumb from '../components/breadcrumb';
import mix from '../exam-list/components/mixins/index.js';
import WrongQuestion from './components/wrong-question';
import Favorites from './components/favorites';
import ExerciseRecords from './components/exercise-records';
import AdSection from '@/www/components/components/ad-section';
import ConfirmDialog from '@/www/components/uc/member/confirm-dialog/index.vue';
import HotCoursesList from '@/www/components/components/hot-courses-list/index.vue';
import track from '@/www/components/course/trial-course/js/track.js';
import '@/api/qb/api..qb-business-question-msg-query.js';
import '@/api/qb/api.QB3210201.query-errorquestion-remove.js';
import '@/api/qb/api.QB3210301.query-collect-remove.js';
import '@/api/qb/api.QB3210101.query-answersheet-remove.js';
import '@/api/qb/api..qb-business-question-msg-user-update.js';
import '@/api/qb/api.QB0001.subject-profile-list.js';
import '@/api/qb/api..qb-business-subject-convert.js';
import '@/api/bd/api.BD4928.query-subject-ptag-list.js';

export default {
    components: {
        Breadcrumb,
        WrongQuestion,
        AdSection,
        ConfirmDialog,
        Favorites,
        ExerciseRecords,
        HotCoursesList,
    },
    mixins: [mix, track],
    data() {
        return {
            examProject: {
                projectName: '',
                projectId: '',
                projectShortName: '',
            },
            examSubject: {
                subjectName: '',
                subjectId: '',
            },
            navMap: {
                CTB: '错题本',
                SCLX: '收藏夹',
                LXJL: '练习记录',
            },
            classUniquecode: '', // 项目编码
            subjectId: '', // 科目id
            memberpapertypeCode: '', // 类型编码
            isData: false, // 是否有数据展示按钮
            isShowToast: false, // 更新按钮轻提示
            noProject: false,
            updateNoticeData: {
                showUpdateNotice: false, // 是否打开部分更新通知
                updateNoticeList: [], // 打开部分更新通知的科目
                praciticeStatus: false, // 是否更新错题本/收藏夹
            },
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
                    content: '优路教育 | 题库中心，海量题库资源选择，每日一练、随机抽题、章节训练，历年真题、模拟试卷、模拟考试。',
                },
            ],
        });
    },
    computed: {
        showUpdateNotice() {
            return this.updateNoticeData.showUpdateNotice && this.updateNoticeData.updateNoticeList.indexOf(this.subjectId) !== -1;
        },
        pageTitle() {
            return `${this.examProject.projectName}-${this.examSubject.subjectName}_${this.navMap[this.memberpapertypeCode]}_优路教育题库`;
        },
    },
    watch: {
        '$route.params.memberpapertypeCode'() {
            this.$nextTick(() => {
                this.init();
                this.examProject = this.$storage.get('examProject');
                this.getUpdateNotice();
                Object.assign(this.examSubject, this.$storage.get('examSubject') || {});

                this.trackChannel();
            });
        },
        '$route.params.subjectId'() {
            this.$nextTick(() => {
                this.init();
                this.examProject = this.$storage.get('examProject');
                this.getUpdateNotice();
                Object.assign(this.examSubject, this.$storage.get('examSubject') || {});

                this.trackChannel();
            });
        },
    },
    created() {
        this.init();
    },
    mounted() {
        var examProject = this.$storage.get('examProject');
        var ptagId = examProject ? examProject.ptagId : '';
        if (examProject) {
            this.examProject = examProject;
        }
        if (!this.subjectId) {
            if (ptagId) {
                this.getPtagSubjects(ptagId);
            } else {
                this.getSubjects();
            }
            return;
        } else {
            Object.assign(this.examSubject, this.$storage.get('examSubject') || {});
        }
        this.getUpdateNotice();
        this.trackChannel();
        this.eaSetClueInfo({
            pageTitle: this.examProject
                ? `${this.examProject.projectName}_${this.navMap[this.memberpapertypeCode]}_优路教育题库`
                : `${this.navMap[this.memberpapertypeCode]}_优路教育题库`,
            url: location.href,
        });
    },
    methods: {
        trackChannel() {
            this.trackWebYouluQuestionChanne({
                channe_name: this.navMap[this.memberpapertypeCode],
                project_id: this.examProject.projectId,
                subject_id: this.examSubject.subjectId,
            });
        },
        // 初始化加载数据
        init() {
            this.classUniquecode = this.$route.params.classUniquecode;
            this.subjectId = this.$route.params.subjectId;
            this.memberpapertypeCode = this.$route.params.memberpapertypeCode;
            this.isData = false;
        },
        // 打开学院-项目选择弹窗
        handleSwitchProject() {
            this.$router.push('/exam/index/choose');
        },
        // 获取list回调
        showBtn(isData) {
            this.isData = isData;
        },
        // 更新按钮
        clickUpdate() {
            this.$baseUI.confirm({
                title: `更新${this.navMap[this.memberpapertypeCode]}`,
                content: `更新后将清除${this.navMap[this.memberpapertypeCode]}中已被停用的试题，更新后不可恢复~`,
                showCancel: true,
                confirm: () => {
                    niceloo.api.call('qb/qb-business-question-msg-user-update', {
                        classCode: this.memberclassUniquecode,
                        subjectId: this.subjectId,
                        type: this.memberpapertypeCode === 'CTB' ? 'E' : 'C',
                        onsuccess: (res) => {
                            // this.getcollectList();
                            this.memberpapertypeCode === 'CTB' ? this.$refs.wrongQuestion.getData() : this.$refs.favorites.getData();
                            this.isShowToast = true;
                            setTimeout(() => {
                                this.isShowToast = false;
                            }, 2000);
                        },
                        onerror: this.$niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                },
            });
        },
        // 清除按钮
        clickClear() {
            // 显示清除提示框
            this.$refs.dialog.showConfirm({
                title: `清空${this.navMap[this.memberpapertypeCode]}`,
                content: `确定要清空${this.navMap[this.memberpapertypeCode]}吗？清空后不可恢复，请谨慎操作哦~`,
                btns: [
                    {
                        txt: '清空当前科目',
                        classList: ['confirm'],
                        handle: () => {
                            this.verifyHandle();
                        },
                    },
                ],
            });
        },
        // 二次确认
        verifyHandle() {
            this.$refs.dialog.showConfirm({
                title: `清空${this.navMap[this.memberpapertypeCode]}`,
                content: '真的要清空吗？为了防止误操作，请在下方输入框内输入“<strong style="font-weight: bold">确定清空</strong>”',
                btnType: 'input',
                verifyTxt: '确定清空',
                btns: [],
            });
        },
        // 清除二次确认回调
        clearHandle() {
            var api = '';
            var ref = '';
            switch (this.memberpapertypeCode) {
                case 'CTB':
                    api = 'query-errorquestion-remove';
                    ref = 'wrongQuestion';
                    break;
                case 'SCLX':
                    api = 'query-collect-remove';
                    ref = 'favorites';
                    break;
                case 'LXJL':
                    api = 'query-answersheet-remove';
                    ref = 'exerciseRecords';
                    break;
            }
            this.clearWrong(api, ref);
        },
        // 清除错题本
        clearWrong(api, ref) {
            niceloo.api.call(`qb/${api}`, {
                classUniquecode: this.classUniquecode,
                subjectIds: [this.subjectId],
                sourceType: $nuxt.context.env.config.sourceType,
                onsuccess: (res) => {
                    console.log(res);
                    this.$refs.dialog.hideConfirm();
                    if (res.operationStatus === 'yes') {
                        this.$refs[ref].getData();
                    } else {
                        this.$refs.dialog.showWebToast({
                            txt: res.operationStatusDesc ? res.operationStatusDesc : '删除失败，请稍后重试！',
                            time: 2000,
                        });
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 重定向页面
        toPath(memberpapertypeCode) {
            if (this.memberpapertypeCode === memberpapertypeCode) {
                return;
            }
            var classUniquecode = this.$route.params.classUniquecode;
            var subjectId = this.$route.params.subjectId;
            var papertypeCode = this.$route.params.papertypeCode;
            var ptagId = this.$route.params.ptagId;
            this.$router.replace(`/exam/index/collection/${memberpapertypeCode}/${classUniquecode}/${ptagId}/${papertypeCode}/${subjectId}`);
        },
        // 获取题库更新通知
        getUpdateNotice() {
            niceloo.api.call('qb/qb-business-question-msg-query', {
                classCode: this.classUniquecode,
                onsuccess: (res) => {
                    console.log(res);
                    if (!res || res.status === 'N') return;
                    this.updateNoticeData.showUpdateNotice = res.validStatus === 'Y';
                    this.updateNoticeData.updateNoticeList = res.subjectIds;
                    this.updateNoticeData.updatePcMsg = res.updatePcMsg;
                    this.updateNoticeData.praciticeStatus = res.praciticeStatus === 'Y';
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 获取科目列表
        getSubjects() {
            niceloo.api.call('qb/subject-profile-list', {
                classUniquecode: this.classUniquecode,
                onsuccess: (res) => {
                    console.log(res);
                    if (res.data && res.data.length) {
                        Object.assign(this.examSubject, res.data[0]);
                        this.subjectId = res.data[0].subjectId;
                        var papertypeCode = this.$route.params.papertypeCode;
                        var ptagId = this.$route.params.ptagId;
                        this.$router.replace(
                            `/exam/index/collection/${this.memberpapertypeCode}/${this.classUniquecode}/${ptagId}/${papertypeCode}/${this.subjectId}`
                        );
                    }
                },
                onerror: () => {
                    this.noProject = true;
                },
                oncomplete: () => {},
            });
        },
        // 科目转换
        subjectConversion(subjectIds) {
            niceloo.api.call('qb/qb-business-subject-convert', {
                bdsubjectIds: subjectIds,
                onsuccess: (res) => {
                    console.log(res);
                    if (res.subjectInfos && res.subjectInfos.length) {
                        this.subjectId = res.subjectInfos[0].subjectId;
                        var papertypeCode = this.$route.params.papertypeCode;
                        var ptagId = this.$route.params.ptagId;
                        this.$router.replace(
                            `/exam/index/collection/${this.memberpapertypeCode}/${this.classUniquecode}/${ptagId}/${papertypeCode}/${this.subjectId}`
                        );
                    }
                    if (res.subjectInfos.length === 0) {
                        this.noProject = true;
                    }
                },
                onerror: () => {
                    this.noProject = true;
                },
                oncomplete: () => {},
            });
        },
        // 获取科目列表
        getPtagSubjects(ptagId) {
            niceloo.api.call('bd/query-subject-ptag-list', {
                ptagId,
                onsuccess: (res) => {
                    console.log(res);
                    var subjectIds = res.data.map((item) => {
                        return item.subjectId;
                    });
                    this.subjectConversion(subjectIds);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>

<style lang="less" scoped>
strong {
    border: 0;
    font-weight: normal;
}
.collection-exam {
    margin: 0 auto;
    width: 1200px;
    .toast {
        padding: 10px 20px;
        color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 30;
        border-radius: 10px;
    }
    .content-box {
        margin-top: 20px;
        display: flex;
        align-items: flex-start;
        .content-list {
            position: relative;
            margin-right: 24px;
            padding: 32px 40px 32px 40px;
            box-sizing: border-box;
            width: 852px;
            background: #fff;
        }
        .content-nav {
            padding-bottom: 26px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            border-bottom: 1px solid rgba(0, 0, 0, 0.03);
        }
        .nav-box {
            display: flex;
            align-items: center;
            .nav-item {
                position: relative;
                margin-right: 48px;
                cursor: pointer;
                .name {
                    font-size: 20px;
                    font-weight: 400;
                    color: #3a3d4b;
                    line-height: 26px;
                }
                .bottom {
                    display: none;
                    position: absolute;
                    left: 35%;
                    bottom: -10px;
                    width: 20px;
                    height: 4px;
                    background: #ff2e30;
                    border-radius: 2px;
                }
                &.active {
                    .name {
                        font-weight: 700;
                        color: #ff2e30;
                    }
                    .bottom {
                        display: block;
                    }
                }
            }
        }
        .btn-box {
            display: flex;
            align-items: center;
            .btn {
                font-size: 14px;
                font-weight: 400;
                color: #ff2e30;
                line-height: 20px;
                cursor: pointer;
                &.clear {
                    margin-right: 24px;
                }
            }
        }
        .top-img {
            margin-bottom: 15px;
            width: 324px;
            height: 180px;
            border-radius: 8px;
            overflow: hidden;
        }
    }
    .no-project {
        height: 500px;
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
}
</style>
