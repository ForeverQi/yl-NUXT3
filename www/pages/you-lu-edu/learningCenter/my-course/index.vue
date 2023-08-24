<template>
    <div class="my-class-box margin-auto" v-loading="initLoading">
        <div v-if="classExistStatus === 'Y' && classList.length > 0">
            <template v-for="classItem in classList">
                <class-card
                    :key="classItem.classId"
                    :class-data="classItem"
                    :class-statistics="classStatistics[classItem.classId]"
                    :transfer-info="transferInfo[classItem.classId]"
                    :project-map="projectMap"
                    @learning-report="toLearningReport"
                    @all-task="toAllTask"
                    @to-study="toStudy"
                    @attendance-record="toAttendanceRecord"
                    @delete-item="deleteItem"
                />
            </template>
            <div class="load-more" v-show="isLoading">加载更多...</div>
        </div>
        <div class="look-hidden-course" v-if="classList.length != 0 && classList.length == page.pageCount">
            <div @click="toCourseHidden">
                查看隐藏课程
                <img src="./asset/images/look_more.png" alt="" />
            </div>
        </div>
        <!-- 有报班信息,课程全部隐藏 -->
        <class-empty
            v-if="!isLoadFail && !initLoading && classExistStatus === 'Y' && !classList.length"
            :img-url-type="'empty'"
            :txt="'您的课程已全部设置隐藏，请把课程设为显示后再次学习'"
            :next-txt="'去查看'"
            @to-class="toClass"
        />
        <!-- 没有报班信息 v-if="noClass && !classList.length"-->
        <class-empty
            v-if="!isLoadFail && classExistStatus === 'N'"
            class="whitebg"
            :txt="'暂无报班课'"
            :next-txt="'去报班'"
            @to-class="toClass"
            :img-url-type="'empty'"
        />
        <class-empty v-if="isLoadFail" :txt="'内容加载失败，请刷新页面'" :img-url-type="'error'" />
        <!--已过期班级-->
        <div class="past-class-title" v-if="expiredClass">
            已过期班级
            <span :class="isShowExpiredClass ? 'expiredClass_open' : 'expiredClass_close'" @click="isShowExpiredClass = !isShowExpiredClass"></span>
            <router-link to="/learningCenter/overdueClass" v-if="expiredClassCount > 1">更多>></router-link>
        </div>
        <div class="past-class" v-if="expiredClass && isShowExpiredClass">
            <past-class-card :expired-class="expiredClass" :expired-class-statistics="expiredClassStatistics[0]" />
        </div>

        <!-- 确认订单信息 确认订单信息(转班) -->
        <order-true-order ref="orderTrueOrder" @success="getOrderPaidList" />
        <!-- 完善个人信息（重读） 确认个人信息(重读)) -->
        <improve-info ref="improveInfo" @bindSuccess="getOrderPaidList" @learncenter-mycourse="toOrderList"></improve-info>
        <!-- 完善地址信息 -->
        <improve-address ref="improveAddress" @addAddressSuccess="addAddressSuccess" @learncenter-mycourse="toOrderList"></improve-address>
        <!-- 家庭教育指导师 报名入口 -->
        <edu-entry v-if="showQREntry" />
        <!-- 账号注销审核中 -->
        <logout-audit-tips />
    </div>
</template>

<script>
import '@/api/cc/api.CC7004.query-mycourse-list'; //接口-我的班级列表
import '@/api/cc/api.CC3102.query-mycourse-past-list'; // 接口-我的班级列表-已过期
import '@/api/cc/api.CC3101.query-my-class-stat'; // 接口-我的班级统计
import '@/api/cc/api.CC8001.query-study-style.js'; // 接口-查询是否为智能学习方式
import '@/api/oc/api.OC2014.query-class-signstatus.js'; // 接口-已付款班级协议签收信息
import '@/api/igt/api..courseware-answer-info'; // 接口-查询上一次答题记录
import '@/api/cc/api.CC3105.courseware-video-auth'; // 接口-视频鉴权
import '@/api/qb/api..courseware-paper-authentication'; // 接口-视频鉴权
import '@/api/cc/api..query-class-transfer-status.js'; //接口-转班听课率
import '@/api/cc/api.CC3034.cc-playrd-batch-add.js';

import ClassCard from '@/www/components/learningCenter/classList/classCard/index.vue'; //班级卡片
import ClassEmpty from '@/www/components/learningCenter/classList/classEmpty/index.vue'; //没有班级信息
import PastClassCard from '@/www/components/learningCenter/classList/pastClassCard/index.vue'; //过期班级
import OrderTrueOrder from '@/www/components/uc/manager/order/orderTrueOrder/index.vue'; // 确认订单信息
import ImproveInfo from '@/www/components/uc/manager/order/improveInfo/index.vue'; // 完善个人信息 确认个人信息
import ImproveAddress from '@/www/components/uc/manager/order/improveAddress/index.vue'; //完善地址信息
import EduEntry from '@/www/components/learningCenter/classList/eduEntry/index.vue'; //家庭教育
import LogoutAuditTips from '@/www/components/uc/manager/logout/logoutAuditTips/index.vue'; // 账号注销审核中
import DialogContent from '@/www/components/learningCenter/course-list/dialog-content/index.vue';
import ModeSelection from '@/www/pages/you-lu-edu/special-question-brushing/components/mode-selection/mode-selection.vue';

export default {
    name: 'myCourse',
    components: {
        ClassCard,
        ClassEmpty,
        PastClassCard,
        OrderTrueOrder,
        ImproveInfo,
        ImproveAddress,
        EduEntry,
        LogoutAuditTips,
        ModeSelection,
    },
    data() {
        return {
            isShowExpiredClass: false, //过期课程隐藏
            showQREntry: false, // 是否显示家庭教育入口
            initLoading: true,
            isLoading: false,
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 0,
            },
            classList: [],
            /*noClass: false,*/
            classIds: '',
            transferInfo: {}, //转班听课率信息
            classStatistics: {}, //key-value存储班级统计信息 {classId:{}}
            expiredClassStatistics: [],
            expiredClass: null,
            curClass: {},
            choseItem: {}, //组装协议认证相关参数
            toNextPage: '',
            answersheetInfo: null,
            imgUrl: '',
            projectMap: {}, // 项目和学员的对应
            reset: false,
            classExistStatus: 'Y', //课程是否存在
            isLoadFail: false,
        };
    },
    head() {
        return this.$head({
            title: '我的课程_系统课_用学习创造美好人生_优路教育',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: '',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '',
                },
            ],
        });
    },
    mounted() {
        this.upCourseRecord();
        this.getProjectTree(); // 获取项目学院
        //我的班级列表
        this.getMyClass(true);
        this.attachEventListener();
    },
    beforeDestroy() {
        this.removeEventListener();
    },
    methods: {
        showDialog() {
            const mark = this.$storage.get('learning_center_questionnaire');
            if (mark == 1) {
                return;
            }
            this.$baseUI
                .createModel(
                    {
                        modalContent: DialogContent,
                        modalHeader: <div style="display: none"></div>,
                    },
                    {},
                    {
                        width: '606px',
                        radius: '32px',
                        showClose: false,
                        showHead: false,
                        isTransparent: true,
                        isShadow: false,
                    }
                )
                .then((res) => {
                    if (res.ret === true) {
                        // 跳转到新地址
                        // this.$PageUtil.openNewPage('https://www.youlu.com/help/CC20211125010000000003/CA20220809010000000004');
                        this.$PageUtil.openNewPage('https://jinshuju.net/f/ZFlHHB');
                    }
                    this.$storage.set('learning_center_questionnaire', 1);
                });
        },
        toOrderList() {
            console.log('@@@@@');
            this.$PageUtil.href('/uc/manager/order/orderClass');
        },
        attachEventListener() {
            if (typeof window === 'undefined') {
                return;
            }
            document.addEventListener('wheel', this.handleScroll, false);
            document.addEventListener('scroll', this.handleScroll, false);
        },
        removeEventListener() {
            if (typeof window === 'undefined') {
                return;
            }
            document.removeEventListener('wheel', this.handleScroll, false);
            document.removeEventListener('scroll', this.handleScroll, false);
        },
        async upCourseRecord() {
            let user = await ylPlugin.login.getUser();
            if (user) {
                // this.showDialog();
            } else {
                // 没有获取到用户信息
                return;
            }

            let params = this.$storage.get(user.userId + 'cc/playrd/batch/add');
            if (params) {
                return this.$callApi('cc/cc-playrd-batch-add', {
                    ...params,
                })
                    .catch(() => {
                        // this.$niceloo.api.handleFailure(err);
                        return Promise.resolve();
                    })
                    .then((res) => {
                        console.log('通过getData返回数据');
                        return Promise.resolve();
                    });
            }
            this.$storage.set(user.userId + 'cc/playrd/batch/add', null);
        },
        //获取项目信息
        async getProjectTree() {
            const projectData = await this.$callRawApi({
                api: 'ctc/project/web/tree/noptag',
                params: {},
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((res) => {
                    return res.getData();
                });
            projectData.data.forEach((project) => {
                project.children.forEach((children) => {
                    const { projectName } = children;
                    this.projectMap[children.projectId] = {
                        mycourse_project_name: projectName,
                        college_name: projectName,
                    };
                });
            });
        },
        /**
         * 我的班级列表
         */
        getMyClass(init) {
            if (init) {
                this.initLoading = true;
            }
            this.$callApi('cc/query-mycourse-list', {
                pageSize: this.page.pageSize, //第一个参数是取几条
                pageIndex: this.$PageUtil.getStartIndex(this.page), //从第几个取其
                clientType: 'W',
                classType: 'A',
                isShow: 'Y',
                onsuccess: (result) => {
                    if (result) {
                        this.classExistStatus = result.classExistStatus;
                        this.page.pageCount = result.total;
                        this.classIds = result.classIds || '';
                        let midData = result.list || [];
                        if (this.reset) {
                            this.classList = [];
                            midData.forEach((val, index) => {
                                val.isShow = 'Y';
                                if ($nuxt.context.env.config.HomeEducationProjectID.includes(val.projectId)) {
                                    this.showQREntry = true;
                                }
                                this.classList.push(val);
                            });
                            this.page.pageIndex = this.classList.length / 10;
                        } else {
                            midData.forEach((val, index) => {
                                val.isShow = 'Y';
                                var sw = false;
                                if ($nuxt.context.env.config.HomeEducationProjectID.includes(val.projectId)) {
                                    this.showQREntry = true;
                                }
                                this.classList.forEach((v, i) => {
                                    if (val.classId == v.classId) {
                                        sw = true;
                                        this.classList[i] = val;
                                    }
                                });
                                if (!sw) {
                                    this.classList.push(val);
                                }
                            });
                        }
                    }

                    /*this.noClass = !(this.classList.length >= 1);*/
                    if (this.classIds) {
                        //我的班级统计
                        this.getClassStat(true);
                        this.getTransferStatus();
                    }
                    if (this.classList.length == this.page.pageCount) {
                        //我的过期班级列表
                        this.getExpiredClass();
                    }
                },
                onerror: () => {
                    this.isLoadFail = true;
                    this.$niceloo.api.handleFailure();
                },
                oncomplete: () => {
                    if (init) {
                        this.initLoading = false;
                    }
                    this.isLoading = false;
                },
            });
        },
        /**
         * 我的班级统计
         * @param
         * @param success 成功回调
         */
        getClassStat(val) {
            this.$callApi('cc/query-my-class-stat', {
                classIds: this.classIds,
                onsuccess: (result) => {
                    if (result) {
                        result.data.forEach((item) => {
                            const ucsCompulsoryRate = parseFloat(item.ucsCompulsoryRate);
                            /*+ '%'*/
                            item.ucsCompulsoryRate = isNaN(ucsCompulsoryRate) ? 0 : ucsCompulsoryRate;
                        });
                        if (val) {
                            if (this.reset) {
                                this.classStatistics = {};
                            }
                            /**
                             * key-value形式存储班级id和班级统计信息
                             * {
                             *   classId:统计信息
                             * }
                             */
                            const classStatistics = this.classStatistics;
                            result.data.forEach((classStat) => {
                                classStatistics[classStat.classId] = classStat;
                            });

                            this.classStatistics = JSON.parse(JSON.stringify(classStatistics));
                        } else {
                            this.expiredClassStatistics = this.expiredClassStatistics.concat(result.data);
                        }
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        //【转班听课率平移】温馨提醒展示状态
        getTransferStatus() {
            // cc/user/class/transfer/display/status
            let classIds = this.classIds.split(',');
            this.$callApi('cc/query-class-transfer-status', {
                classIds,
                onsuccess: (result) => {
                    console.log('输出转班听课率', result);
                    if (result) {
                        if (this.reset) {
                            this.transferInfo = {};
                        }
                        /**
                         * key-value形式存储班级id和班级统计信息
                         * {
                         *   classId:统计信息
                         * }
                         */
                        const transferInfo = this.transferInfo;
                        result.forEach((item) => {
                            transferInfo[item.classId] = item;
                        });

                        this.transferInfo = JSON.parse(JSON.stringify(transferInfo));
                        console.log(this.transferInfo);
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        /**
         * 我的过期班级列表
         * @param
         * @param success 成功回调
         */
        getExpiredClass() {
            let params = {
                pageSize: 1, //第一个参数是取几条
                pageIndex: 0, //从第几个取其
            };
            this.$callApi('cc/query-mycourse-past-list', {
                ...params,
                onsuccess: (result) => {
                    if (result) {
                        this.expiredClassCount = result.total;
                        this.expiredClass = result.data[0];
                        console.log('我的课程');
                        this.classIds = result.classIds || '';
                        if (this.classIds) {
                            //我的过期班级统计
                            this.getClassStat(false);
                        }
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        handleScroll() {
            if (this.isLoading) {
                return;
            }
            // 获取最后一条数据
            var datas = document.querySelectorAll('.my-class-card');
            if (!datas[datas.length - 1]) {
                return;
            }
            var lastDataTop = datas[datas.length - 1].getBoundingClientRect().bottom;
            // 如果最后一条数据的底部离浏览器顶部的距离 <= 浏览器窗口内的可视高度
            if (lastDataTop <= window.innerHeight && this.classList.length != this.page.pageCount) {
                this.reset = false;
                this.isLoading = true;
                this.page.pageIndex++;
                this.page.pageSize = 10;
                setTimeout(() => {
                    this.getMyClass(false);
                }, 2000);
            }
        },
        //查看隐藏课程
        toCourseHidden() {
            this.$PageUtil.openNewPage(`/learningCenter/hidden-course`);
        },
        //去报班
        toClass() {
            if (this.classExistStatus === 'N') {
                this.$PageUtil.openNewPage(`/pro-course`);
            } else {
                this.$PageUtil.openNewPage(`/learningCenter/hidden-course`);
            }
        },
        toAttendanceRecord(item) {
            this.$PageUtil.openNewPage(`/learningCenter/index/attendanceRecord/${item.classId}?className=${item.className}`);
        },
        deleteItem(classData) {
            this.classList = this.classList.filter((item) => item.classId !== classData.classId);
            this.page.pageSize = Math.ceil(this.classList.length / 10) * 10;
            this.page.pageIndex = 0;
            if (this.page.pageSize === 0) {
                return;
            }
            this.reset = true;
            this.getMyClass(true);
        },
        //查看学习报告
        toLearningReport(item) {
            let sendLog = {
                AIL_class_name: item.className, // 课程一级目录名称
            };
            this.$yiguan.aiLearning('AIL_mycourse_report', sendLog, this.projectMap, item.projectId);
            this.toNextPage = 'classLearningReport';
            this.curClass = item;
            if (item.studentclassCertificationstatus != 'Y') {
                // 判断登录来源
                if (!this.$baseUI.clickStop()) {
                    return;
                }
                //班级认证状态获取(CRM)
                this.getClassSignstatusByCRM();
            } else {
                this.toPage();
            }
        },
        //订单班级签署状态获取
        getClassSignstatusByCRM() {
            this.$callApi('oc/query-class-signstatus', {
                skuId: this.curClass.classId,
                onsuccess: async (item) => {
                    if (!item) {
                        return;
                    }
                    let userInfo = await this.$User.getUser();
                    this.choseItem = item;

                    // if ((item.orderSource != 'TM' && item.orderSource != 'JD' && item.orderSource != 'DA')//TM:天猫;JD:京东;DA:分销联盟) 电商不需要确认协议
                    //     &&
                    if (
                        item.orderAgreement &&
                        item.orderAgreement.agreementNeedconfirmstatus == 'Y' &&
                        item.orderAgreement.agreementStatus == 'N' &&
                        item.orderSubtype != 'REP'
                    ) {
                        //协议确认页面
                        this.$refs.orderTrueOrder.open(item);
                        return;
                    }
                    if (item.orderAddressneedcompletestatus == 'Y' && item.orderAddresscompletedstatus == 'N') {
                        //完善收货地址
                        if (item.orderSource == 'OP' && item.orderSubtype != 'REP') {
                            //运营平台录单要求弹确认协议那个大弹窗
                            this.$refs.orderTrueOrder.open(item);
                        } else {
                            this.$refs.improveAddress.open(item);
                        }
                        return;
                    }
                    if (item.orderAgreement && item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && userInfo.userIdcardstatus != 'S') {
                        //看当前用户是否实名认证 S标识已实名
                        if (item.orderSource == 'OP' && item.orderSubtype != 'REP') {
                            //运营平台录单要求弹确认协议那个大弹窗
                            this.$refs.orderTrueOrder.open(item);
                        } else {
                            this.$refs.improveInfo.open(item);
                        }
                        return;
                    }
                    if (
                        item.orderAgreement &&
                        item.orderAgreement.userinfoNeedconfirmstatus == 'Y' &&
                        item.orderAgreement.agreementUserinfoconfirmstatus == 'N'
                    ) {
                        //确认个人信息
                        if (item.orderSource == 'OP' && item.orderSubtype != 'REP') {
                            //运营平台录单要求弹确认协议那个大弹窗
                            this.$refs.orderTrueOrder.open(item);
                        } else {
                            this.$refs.improveInfo.open(item);
                        }
                        return;
                    }

                    //上面都走完之后  听课前先查询二次收货地址确认情况  TODO 不存在二次确认的订单了
                    // this.getOrderTwiceStatus();
                    this.toPage();
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        getOrderPaidList(isperfect) {
            //获取已付款订单列表
            this.classList = [];
            this.page.pageIndex = 0;
            this.getMyClass(true);
            if (isperfect) {
                this.$baseUI
                    .alert({
                        title: '认证成功！',
                        content: '请确保您在看课前已阅读《优路课程购买协议》，该协议可以个人中心-我的订单中查看。',
                        confirmText: '我知道了',
                    })
                    .then(function () {
                        //console.log("提示信息已经点击确认")
                    });
            }
        },
        //开始听课
        toAllTask(item) {
            // 易观埋点
            let sendLog = {
                mycourse_class_name: item.className, // 班级名称
                mycourse_project_name: item.projectName, // 项目名称
            };
            this.$yiguan.aiLearning('click_mycourse_listen', sendLog, this.projectMap, item.projectId);

            this.toNextPage = 'allTask';
            this.curClass = item;
            if (item.studentclassCertificationstatus != 'Y') {
                //班级认证状态获取(CRM)
                this.getClassSignstatusByCRM();
            } else {
                // this.getOrderTwiceStatus();  //TODO 不存在二次确认的订单了
                this.toPage();
            }
        },
        toPage() {
            const { classId, ctapId, coursewareId, coursewareType, projectId } = this.curClass;
            if (this.toNextPage == 'classLearningReport') {
                this.toNextPage = '';
                this.$PageUtil.href(`/learningCenter/classLearningReport/${classId}?ctapId=${ctapId}&projectId=${projectId}`);
                return;
            }
            if (this.toNextPage == 'allTask') {
                this.toNextPage = '';
                // 判断是否开启了智能学习
                this.$callApi('cc/query-study-style', {
                    classId,
                    onsuccess: (res) => {
                        if (res && res.enableStatus == 'Y') {
                            this.$PageUtil.href(`/learningCenter/ai/course/${classId}?ctapId=${ctapId}`);
                        } else {
                            this.$PageUtil.href(`/learningCenter/allTask/${classId}?ctapId=${ctapId}`);
                        }
                    },
                    onerror: niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            }
            if (this.toNextPage == 'toStudy') {
                this.toNextPage = '';
                let params = {
                    classId,
                    coursewareId,
                    playrdNeed: 'Y',
                };
                if (coursewareType == 'S') {
                    // 录播课
                    if (this.curClass.coursewareVideoprividers == 'SP') {
                        this.$PageUtil.href(`/pro-course-learn/${classId}/${coursewareId}?source=myCourse&ctapId=${ctapId}`);
                    } else if (this.curClass.coursewareVideoprividers == 'SC') {
                        params.coursewareOnlineurl = this.curClass.coursewareOnlineurl;
                        this.coursewareVideoAuth(params);
                    }
                }
                if (coursewareType == 'L') {
                    // 判断登录来源
                    if (!this.$baseUI.clickStop()) {
                        return;
                    }
                    this.$PageUtil.openNewPage(`${this.curClass.coursewareLiveurl}&form=myCourse`);
                }
                if (coursewareType == 'P') {
                    // 验学
                    if (!this.$baseUI.clickStop()) {
                        return;
                    }
                    // 权限效验
                    this.paperAuthentication();
                }
            }
        },
        // 试卷鉴权
        paperAuthentication() {
            this.$callApi('qb/courseware-paper-authentication', {
                coursewareId: this.curClass.coursewareId,
                paperId: this.curClass.paperId,
                classId: this.curClass.classId,
                onsuccess: (res) => {
                    this.getCoursewareAnswersheetInfo(this.curClass.paperId, () => {
                        console.log(this.answersheetInfo);
                        if (!this.answersheetInfo) {
                            this.$baseUI.alert('试卷不正确，请联系客服');
                            return;
                        }
                        const { classId, ctapId, coursewareId, className } = this.curClass;
                        const fullPath = encodeURIComponent(
                            `${this.$PageUtil.getOriginUrl()}${this.$route.fullPath}?classId=${classId}&ctapId=${ctapId}&coursewareId=${coursewareId}`
                        );
                        const { classUniquecode, bdSubjectId, paperId, paperTypeCode } = this.answersheetInfo;
                        if (res.answerStyle === 'NORMAL') {
                            let url = `/learningCenter/do-paper-test/${bdSubjectId}/${paperId}/${coursewareId}/${paperTypeCode}/${classId}`;
                            url += `?className=${encodeURIComponent(className)}&ctapId=${ctapId}`;
                            // 做题模式的判断
                            const userInfo = this.$storage.get('loginStatus') || {};
                            const modeObj = this.$storage.get('problemSolvingMode') || {};
                            const str = `${userInfo.userId}-${this.curClass.paperId}`;
                            if (modeObj && modeObj[str]) {
                                url += `&solvingMode=${modeObj[str]}`;
                                this.$PageUtil.openNewPage(url);
                            } else {
                                this.solvingPopup(url);
                            }
                        } else if (res.answerStyle === 'FZJK1') {
                            //仿真机考1
                            this.$PageUtil.openNewPage(`/exam/examinfo/${classUniquecode}/${bdSubjectId}/${paperId}?url=${fullPath}&enableStatus=Y`);
                        } else if (res.answerStyle === 'FZJK2') {
                            //仿真机考2
                            this.$PageUtil.openNewPage(`/exam/examinfo/${classUniquecode}/${bdSubjectId}/${paperId}?url=${fullPath}&enableStatus=Y`);
                        } else if (res.answerStyle === 'FZJK3') {
                            //仿真机考3
                            // PageUtil.href(`/emulation/fire-exam/login?classUniquecode=${this.classUniquecode}&subjectId=${this.subjectId}&paperId=${this.paperId}&classId=${classId}&coursewareId=${coursewareId}&ctapId=${this.$route.query.ctapId}`);
                            this.$PageUtil.openNewPage(
                                `/emulation/fire-exam/login?classUniquecode=${classUniquecode}&subjectId=${bdSubjectId}&paperId=${paperId}&classId=${classId}&coursewareId=${coursewareId}&ctapId=${ctapId}`
                            );
                        }
                    });
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        //继续学习
        toStudy(item) {
            this.toNextPage = 'toStudy';
            this.curClass = item;

            if (item.studentclassCertificationstatus != 'Y') {
                //班级认证状态获取(CRM)
                this.getClassSignstatusByCRM();
            } else {
                // this.getOrderTwiceStatus();  // TODO不存在二次确认的订单了
                this.toPage();
            }
        },
        //继续做题记录
        getCoursewareAnswersheetInfo(paperId, callback) {
            let params = {
                paperId,
                classId: this.curClass.classId,
                coursewareId: this.curClass.coursewareId,
            };
            this.$callApi('zhinengxuexi/courseware-answer-info', {
                ...params,
                onsuccess: (res) => {
                    if (res) {
                        this.answersheetInfo = res;
                        callback();
                    }
                },
                onerror: niceloo.api.handleFailure,
            });
        },
        /**
         * 背题、做题模式弹窗
         *  @param {string} url 做题页的路径
         */
        solvingPopup(url) {
            this.$baseUI
                .createModel(
                    {
                        modalHeader: (
                            <div class="paper-title-wrap">
                                <div class="title">模式选择</div>
                            </div>
                        ),
                        modalContent: ModeSelection,
                    },
                    {},
                    {
                        width: '328px',
                        height: '230px',
                        radius: '16px',
                        padding: '0',
                        backgroundColor: '#fff',
                    }
                )
                .then(({ type, ret }) => {
                    if (type === 'close') {
                        // 背题模式（可随时看解析）
                        if (ret === 1) {
                            url += `&solvingMode=do-exercise`;
                            this.problemSolvingMode('do-exercise');
                            this.$PageUtil.openNewPage(url);
                        } else if (ret === 2) {
                            // 做题模式（交卷后看解析）
                            url += `&solvingMode=do-exam`;
                            this.problemSolvingMode('do-exam');
                            this.$PageUtil.openNewPage(url);
                        }
                    }
                });
        },
        /**
         * 做题模式数据的存储
         * @param {string} solvingMode 做题模式：do-exercise：背题模式，do-exam：做题模式
         */
        problemSolvingMode(solvingMode) {
            const userInfo = this.$storage.get('loginStatus') || {};
            const modeObj = this.$storage.get('problemSolvingMode') || {};
            const str = `${userInfo.userId}-${this.curClass.paperId}`;
            modeObj[str] = solvingMode;
            this.$storage.set('problemSolvingMode', modeObj);
        },
        //完善地址成功后
        async addAddressSuccess() {
            //完善地址成功后
            let item = this.choseItem;
            let userInfo = await this.$User.getUser();
            if (item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && userInfo.userIdcardstatus != 'S') {
                //看当前用户是否实名认证 S标识已实名
                this.$refs.improveInfo.open(item);
            } else if (item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && item.orderAgreement.agreementUserinfoconfirmstatus == 'N') {
                //确认个人信息
                this.$refs.improveInfo.open(item);
            } else {
                this.getOrderPaidList();
            }
        },
        // 圆点直播视频鉴权
        coursewareVideoAuth(params) {
            this.$callApi('cc/courseware-video-auth', {
                ...params,
                onsuccess: (res) => {
                    this.$PageUtil.openNewPage(res.videoAddress);
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.my-class-box {
    width: 1200px;
    min-height: 600px;
    // 加载更多
    .load-more {
        text-align: center;
        font-size: 20px;
        height: 100px;
        line-height: 100px;
        color: #999999;
    }
    .look-hidden-course {
        text-align: center;
        font-size: 14px;
        color: #999999;
        cursor: pointer;
        margin-bottom: 30px;
        div {
            width: 108px;
            margin: 0 auto;
            img {
                width: 10px;
                height: 11px;
                margin-left: 4px;
            }
        }
    }
    // 班级列表
    .my-class-list {
        background: #fff;
        box-shadow: 0px 2px 9px 1px rgba(26, 39, 90, 0.06);
        border-radius: 6px;
        padding: 30px 30px 20px 20px;
        position: relative;
        margin-bottom: 18px;
    }
    // 过期课程
    .past-class-title {
        font-size: 16px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 16px;
        padding-left: 8px;
        .expiredClass_open,
        .expiredClass_close {
            width: 32px;
            height: 16px;
            display: inline-block;
            background: url('./asset/images/expiredClass_open.png') no-repeat;
            background-size: 100%;
            border-radius: 10px;
            margin-left: 16px;
            position: relative;
            top: 2px;
            cursor: pointer;
        }
        .expiredClass_close {
            background: url('./asset/images/expiredClass_close.png') no-repeat;
            background-size: 100%;
        }
        a {
            float: right;
            font-size: 14px;
            color: #666;
            margin-top: 5px;
            margin-right: 8px;
        }
    }
}
.whitebg {
    background: #ffffff;
}
.paper-title-wrap {
    text-align: center;
    margin-bottom: 18px;
    .title {
        font-size: 18px;
        color: #333333;
        font-weight: 700;
    }
}
</style>
