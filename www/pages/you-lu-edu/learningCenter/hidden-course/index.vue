<template>
    <div class="my-class-box margin-auto">
        <span class="back-my-course" @click="toMyCourse">返回我的课程</span>
        <div v-if="!noClass && classList.length > 0">
            <template v-for="(classItem, index) in classList">
                <class-card
                    :key="classItem.classId"
                    :class-data="classItem"
                    :class-statistics="classStatistics[index]"
                    :transfer-info="transferInfo[index]"
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
        <!-- 没有隐藏课程 -->
        <class-empty v-if="noClass && !classList.length" :txt="'暂无隐藏课程'" :next-txt="''" :img-url-type="'empty'" />

        <!-- 确认订单信息 确认订单信息(转班) -->
        <order-true-order ref="orderTrueOrder" @success="getOrderPaidList" />
        <!-- 完善个人信息（重读） 确认个人信息(重读)) -->
        <improve-info ref="improveInfo" @bindSuccess="getOrderPaidList"></improve-info>
        <!-- 完善地址信息 -->
        <improve-address ref="improveAddress" @addAddressSuccess="addAddressSuccess"></improve-address>
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
import '@/api/cc/api.CC3034.cc-playrd-batch-add.js';
import '@/api/cc/api..query-class-transfer-status.js'; //接口-转班听课率

import ClassCard from '@/www/components/learningCenter/classList/classCard/index.vue'; //班级卡片
import ClassEmpty from '@/www/components/learningCenter/classList/classEmpty/index.vue'; //没有班级信息
import PastClassCard from '@/www/components/learningCenter/classList/pastClassCard/index.vue'; //过期班级
import OrderTrueOrder from '@/www/components/uc/manager/order/orderTrueOrder/index.vue'; // 确认订单信息
import ImproveInfo from '@/www/components/uc/manager/order/improveInfo/index.vue'; // 完善个人信息 确认个人信息
import ImproveAddress from '@/www/components/uc/manager/order/improveAddress/index.vue'; //完善地址信息
import LogoutAuditTips from '@/www/components/uc/manager/logout/logoutAuditTips/index.vue'; // 账号注销审核中

export default {
    name: 'hiddenCourse',
    components: {
        ClassCard,
        ClassEmpty,
        PastClassCard,
        OrderTrueOrder,
        ImproveInfo,
        ImproveAddress,
        LogoutAuditTips,
    },
    layout: 'new-default',
    data() {
        return {
            isLoading: false,
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 0,
            },
            classList: [],
            noClass: false,
            classIds: '',
            transferInfo: [], //转班听课率信息
            classStatistics: [],
            curClass: {},
            choseItem: {}, //组装协议认证相关参数
            toNextPage: '',
            answersheetInfo: {},
            imgUrl: '',
            projectMap: {}, // 项目和学员的对应
            reset: false,
        };
    },
    mounted() {
        this.upCourseRecord();
        this.getProjectTree(); // 获取项目学院
        //我的班级列表
        this.getMyClass();
        this.attachEventListener();
    },
    beforeDestroy() {
        this.removeEventListener();
    },
    methods: {
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
            let user = await this.$User.getUser();
            if (!user || !user.userId) {
                return;
            }
            let params = this.$storage.get(user.userId + 'cc/playrd/batch/add');
            if (params) {
                await this.$callApi('cc/cc-playrd-batch-add', {
                    ...params,
                }).catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
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
                    console.log('通过getData返回数据');
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
        //我的班级列表
        getMyClass() {
            this.$callApi('cc/query-mycourse-list', {
                pageSize: this.page.pageSize, //第一个参数是取几条
                pageIndex: this.$PageUtil.getStartIndex(this.page), //从第几个取其
                clientType: 'W',
                classType: 'A',
                isShow: 'N',
                onsuccess: (result) => {
                    if (result) {
                        this.page.pageCount = result.total;
                        this.classIds = result.classIds || '';
                        let midData = result.list || [];
                        if (this.reset) {
                            this.classList = [];
                            midData.forEach((val, index) => {
                                val.isShow = 'N';
                                this.classList.push(val);
                            });
                            this.page.pageIndex = this.classList.length / 10;
                        } else {
                            midData.forEach((val) => {
                                val.isShow = 'N';
                                var sw = false;
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
                    this.noClass = !(this.classList.length >= 1);
                    if (this.classIds) {
                        //我的班级统计
                        this.getClassStat();
                        this.getTransferStatus();
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.isLoading = false;
                },
            });
        },
        //我的班级统计
        getClassStat() {
            this.$callApi('cc/query-my-class-stat', {
                classIds: this.classIds,
                onsuccess: (result) => {
                    if (result) {
                        result.data.forEach((item) => {
                            const ucsCompulsoryRate = parseFloat(item.ucsCompulsoryRate);
                            /*+ '%'*/
                            item.ucsCompulsoryRate = isNaN(ucsCompulsoryRate) ? 0 : ucsCompulsoryRate;
                        });
                        if (this.reset) {
                            this.classStatistics = [];
                        }
                        this.classStatistics = this.classStatistics.concat(result.data);
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
                            this.transferInfo = [];
                        }
                        this.transferInfo = this.transferInfo.concat(result);
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
                    this.getMyClass();
                }, 2000);
            }
        },
        //返回我的课程
        toMyCourse() {
            //跳转我的课程
            /*this.$PageUtil.href*/
            this.$PageUtil.href('/learningCenter/index/myCourse');
        },
        //去报班
        toClass() {
            this.$PageUtil.openNewPage(`/class`);
        },
        toAttendanceRecord(item) {
            this.$PageUtil.openNewPage(`/learningCenter/index/attendanceRecord/${item.classId}?className=${item.className}`);
        },
        deleteItem(classData) {
            this.classList = this.classList.filter((item) => item.classId !== classData.classId);
            this.page.pageSize = Math.ceil(this.classList.length / 10) * 10;
            this.page.pageIndex = 0;
            this.noClass = !(this.classList.length >= 1);
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
                    if (item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && userInfo.userIdcardstatus != 'S') {
                        //看当前用户是否实名认证 S标识已实名
                        if (item.orderSource == 'OP' && item.orderSubtype != 'REP') {
                            //运营平台录单要求弹确认协议那个大弹窗
                            this.$refs.orderTrueOrder.open(item);
                        } else {
                            this.$refs.improveInfo.open(item);
                        }
                        return;
                    }
                    if (item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && item.orderAgreement.agreementUserinfoconfirmstatus == 'N') {
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
            this.getMyClass();
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
            const { classId, ctapId, coursewareId, coursewareType } = this.curClass;
            if (this.toNextPage == 'classLearningReport') {
                this.toNextPage = '';
                this.$router.push(`/learningCenter/classLearningReport/${classId}?ctapId=${ctapId}`);
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
                    // 试卷（周作业）
                    this.getCoursewareAnswersheetInfo(this.curClass.paperId, () => {
                        if (!this.answersheetInfo) {
                            this.$baseUI.alert('试卷不正确，请联系客服');
                            return;
                        }
                        this.$callApi('cc/query-study-style', {
                            classId,
                            onsuccess: (res) => {
                                const { answerSheetStatus, answerSheetId, classUniquecode, subjectId, paperId } = this.answersheetInfo;
                                if (res && res.enableStatus == 'Y') {
                                    // 阶段测评交卷要回到测评报告页面，需要加上测评报告所需参数classId、ctapId、coursewareId
                                    const fullPath = encodeURIComponent(
                                        `${this.$PageUtil.getOriginUrl()}${
                                            this.$route.fullPath
                                        }?classId=${classId}&ctapId=${ctapId}&coursewareId=${coursewareId}`
                                    );
                                    //upsLastanswersheetid	答卷标识	String	否	空:没有做过
                                    //upsLastanswersheetstatus	答卷状态	String	否	A:已完成;G:待继续;空:没有做过

                                    if (answerSheetStatus == 'G' && answerSheetId) {
                                        this.$PageUtil.openNewPage(
                                            `/exam/ks/goon/${classUniquecode}/${subjectId}/${paperId}/${answerSheetId}?url=${fullPath}&enableStatus=Y`
                                        );
                                    } else {
                                        this.$PageUtil.openNewPage(`/exam/examinfo/${classUniquecode}/${subjectId}/${paperId}?url=${fullPath}&enableStatus=Y`);
                                    }
                                } else {
                                    const fullPath = encodeURIComponent(`${this.$PageUtil.getOriginUrl()}${this.$route.fullPath}`);
                                    //upsLastanswersheetid	答卷标识	String	否	空:没有做过
                                    //upsLastanswersheetstatus	答卷状态	String	否	A:已完成;G:待继续;空:没有做过
                                    if (this.answersheetInfo.answerSheetStatus == 'G' && answerSheetId) {
                                        this.$PageUtil.openNewPage(`/exam/ks/goon/${classUniquecode}/${subjectId}/${paperId}/${answerSheetId}?url=${fullPath}`);
                                    } else {
                                        this.$PageUtil.openNewPage(`/exam/examinfo/${classUniquecode}/${subjectId}/${paperId}?url=${fullPath}`);
                                    }
                                }
                            },
                            onerror: niceloo.api.handleFailure,
                        });
                    });
                }
            }
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
                    }
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {
                    callback();
                },
            });
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
    .back-my-course {
        background: url('../asset/images/attendace_record/toback.png') no-repeat;
        background-size: 10px 11px;
        background-position-x: left;
        background-position-y: 4px;
        height: 56px;
        line-height: 56px;
        font-size: 14px;
        color: #77798d;
        margin-left: 18px;
        padding-left: 12px;
        cursor: pointer;
    }
    // 加载更多
    .load-more {
        text-align: center;
        font-size: 20px;
        height: 100px;
        line-height: 100px;
        color: #999999;
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
</style>
