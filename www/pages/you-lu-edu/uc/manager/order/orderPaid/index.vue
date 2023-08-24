<template>
    <!-- 已付款订单paidOrder --unpaidOrder-->
    <div class="tabDetails">
        <orderNull v-show="orderPaidList.length == 0 && loading == false" words="您还没有订单哦" style="width: auto"></orderNull>
        <orderCard
            :order-list="orderPaidList"
            @toDetais="toDetais"
            @toPay="toPay"
            @doSelfLearn="doSelfLearn"
            @toSchoolOrderConfirm="handleSchoolOrderConfirm"
            @toSchoolOrderDetail="handleSchoolOrderDetail"
        />
        <div class="pagination" v-show="page.pageCount > 10">
            <!-- <vb-pagination :get-page="getOrderPaidList" :page.sync="page" /> -->
            <pagination :total="page.pageCount" :page-size="page.pageSize" @current-change="getOrderPaidList" :current-page.sync="page.pageIndex" />
        </div>
        <order-null v-show="false"></order-null>
        <!-- 完善个人信息（重读） 确认个人信息(重读)) -->
        <improve-info ref="improveInfo" @bindSuccess="getOrderPaidList"></improve-info>
        <!-- 确认订单信息 确认订单信息(转班) -->
        <order-true-order ref="orderTrueOrder" @success="getOrderPaidList" />
        <!-- 完善地址信息 -->
        <improve-address ref="improveAddress" @addAddressSuccess="addAddressSuccess"></improve-address>

        <!-- 自助续学 -->
        <template v-if="showSelectClass">
            <apply-select-class :title="`请选择办理续学的班级`" :show="true" @do-close="doNext" :order-course-list="propListClass"></apply-select-class>
        </template>
        <!-- 自助续学办理须知 -->
        <template v-if="showApplyIntro">
            <apply-intro :setting-id="settingId" @do-close="doStartApplySelfLearn" :show="true" />
        </template>
        <!-- 错误弹窗 -->
        <template v-if="showAlert">
            <apply-alert :show="true" @do-close="closeAlert">
                <div class="msg-content">抱歉！该订单/班级暂不支持自助申请续学，请联系服务老师进行人工办理。</div>
            </apply-alert>
        </template>
    </div>
</template>

<script>
import Pagination from '@/www/components/components/pagination';
import orderNull from '@/www/components/uc/manager/myCourse/orderNull';
import orderCard from '@/www/components/uc/manager/order/orderPaidCard';
import improveInfo from '@/www/components/uc/manager/order/improveInfo'; // 完善个人信息 确认个人信息
import improveAddress from '@/www/components/uc/manager/order/improveAddress'; //完善地址信息
import orderTrueOrder from '@/www/components/uc/manager/order/orderTrueOrder'; // 确认订单信息
import ApplySelectClass from '@/www/components/order/components/applySelectClass';
import ApplyIntro from '@/www/components/order/components/applyIntro'; // 办理须知
import ApplyAlert from '@/www/components/order/components/applyAlert'; // 弹窗
import SchoolOrderVoucher from '@/www/components/userCenter/order/school-order-voucher';

import '@/api/selfLearn/api..query-project-area.js'; // 获取项目区域
import '@/api/selfLearn/api..query-next-class.js'; // 获取下一期信息
import '@/api/selfLearn/api.self-learn-001.check-order-self-learn-status.js'; // 检查订单班级是否可以续学
import '@/api/order/api..query-studentorder-paidorders-list.js';
import '@/api/uc/api.OC2001.query-paid-order-list';

export default {
    name: 'orderPaid',
    components: {
        Pagination,
        orderNull,
        orderCard,
        improveInfo,
        improveAddress,
        orderTrueOrder,
        ApplySelectClass,
        ApplyIntro,
        ApplyAlert,
        SchoolOrderVoucher,
    },
    data() {
        return {
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
                pages: 10,
            },
            orderPaidList: [],
            loading: true,
            botIcon: {
                //1:正常订单;2:转班订单;3:重读订单;4:失效订单  	班级订单子类型(GEN:正常;REP:重读;TRA:转让;CHA:转班;REF:退费DEF:顺延;GIV:赠课)
                GEN: 'normal',
                CHA: 'shiftWork',
                REP: 'stress',
                4: 'invalid',
            },
            choseItem: {}, //选中的订单
            isShowNotice: true,

            // 自助续学
            showSelfLearnDialog: false,
            orderCourseList: [], // 订单中的班级列表
            showSelfLearn: false, // 是否展示续学安纳
            showApplyIntro: false, // 展示续学须知
            showSelectClass: false, // 显示选班弹窗
            showSelectSubject: false, // 显示选择科目弹窗
            showAlert: false, // 弹窗内容
            classList: [], // 办理续学班级的列表
            curClassInfo: {}, // 当前办理续学班级
            areaMap: {}, // 大区信息
            nextClassList: [], // 下期续学班级
            settingId: '', // 配置ID

            newClassList: [],
            propListClass: [], // 分批办理数据
            paidDetails: {
                orderId: '',
                orderNo: '',
                orderCreateddate: '',
            },

            loadHandle: null,
        };
    },
    mounted() {
        console.warn('mounted');
        this.getOrderPaidList();
    },
    methods: {
        doNext(list = []) {
            this.showSelectClass = false;
            if (list.length > 0) {
                this.settingId = list[0].settingId;
                this.showApplyIntro = true;
                this.newClassList = list;
            }
        },
        doSelfLearn(classList, orderInfo) {
            // 获取当前班级是否又下期班级
            /**
             * 1、获取项目对应的校区
             */
            // 要续学的班级，签署协议（实名认证+确认协议）未完成时，不能办理自助续学
            // 点击【自助续学】按钮，提示信息  ：请先签署订单对应的协议后再办理续学！
            // 按钮为【我知道了】，点击我知道了，弹框消失
            // 全端和后端接口都校验

            this.loadHandle = this.$baseUI.loading();
            this.paidDetails = orderInfo;
            let map = {};
            this.areaMap = {};
            this.$User
                .getUser()
                .then((user) => {
                    // agreementStatus 协议确认状态
                    // agreementNeedconfirmstatus 协议是否需要确认状态
                    // agreementUserinfoconfirmstatus 学员个人信息确认状态
                    // userinfoNeedconfirmstatus 学员个人信息是否需要确认状态
                    if (orderInfo.orderValidstatus !== 'N' && orderInfo.orderPaystatus !== 'P') {
                        if (
                            orderInfo?.orderAgreement?.agreementNeedconfirmstatus === 'Y' &&
                            orderInfo?.orderAgreement?.agreementStatus !== 'Y' &&
                            orderInfo.orderSubtype !== 'REP'
                        ) {
                            return Promise.reject('请先签署订单对应的协议后再办理续学！');
                        } else if (orderInfo?.orderAgreement?.userinfoNeedconfirmstatus === 'Y' && user.userIdcardstatus !== 'S') {
                            return Promise.reject('请先签署订单对应的协议后再办理续学！');
                        }
                    }
                    let s = [];
                    classList.forEach((r) => {
                        if (map[r.projectId]) {
                            map[r.projectId].classList.push(r);
                            return;
                        }
                        map[r.projectId] = {
                            classList: [r],
                        };
                        s.push({
                            userId: user.userId,
                            projectId: r.projectId,
                        });
                    });

                    return s;
                })
                .then((res) => {
                    return Promise.all(
                        res.map((r) => {
                            return this.getArea([r]);
                        })
                    );
                })
                .then(() => {
                    return Promise.all(
                        Object.keys(this.areaMap).map((r) => {
                            return this.getNextClassInfo(this.areaMap[r], map[r].classList).then((res) => {
                                let nextClassMap = {};
                                res.forEach((rs) => {
                                    nextClassMap[rs.oriClassId] = rs;
                                });
                                map[r].classList.forEach((r) => {
                                    this.$set(r, 'hasNextClass', !!nextClassMap[r.classId] && nextClassMap[r.classId].nextProuctStatus); // 是否有下一期的班级
                                    if (nextClassMap[r.classId] && nextClassMap[r.classId].nextProuctStatus) {
                                        // 存储下一期班级
                                        this.$set(r, 'nextClass', nextClassMap[r.classId]); // 是否有下一期的班级
                                    } else {
                                        this.$set(r, 'nextClass', null); // 是否又下一期的班级
                                    }
                                });
                            });
                        })
                    ).then(() => {
                        this.classList = classList;
                    });
                })
                .then(() => {
                    this.loadHandle && this.loadHandle.close();
                    // 判断是否需要分批
                    if (this.classList.length === 1) {
                        // 只有一个班级的并且又下期续学班级的走正常办理
                        let curClassInfo = this.classList[0];
                        if (curClassInfo.hasNextClass === false) {
                            // 不能存在下期续学班级
                            this.showAlert = true;
                        } else {
                            // 存在时
                            this.settingId = this.classList[0].settingId;
                            this.showApplyIntro = true;
                        }
                    } else {
                        // 多个班级的时候
                        /**
                         * 1、服务期次不同
                         * 2、项目周期不同
                         * 3、承诺类型不同
                         */
                        let map = {};
                        this.classList.forEach((r) => {
                            if (r.hasNextClass === false) {
                                // 没有下期班级不处理
                                return;
                            }
                            // 服务期次 + 项目周期 + 服务类型
                            let k = r.serviceCount + '' + r.examservYear + r.examservSeq + r.nextClass.classAserschemo;
                            if (map[k]) {
                                map[k].classList.push(r);
                            } else {
                                map[k] = {
                                    ...r,
                                    classList: [r],
                                };
                            }
                        });
                        let keys = Object.keys(map);
                        if (keys.length === 1) {
                            // 存在时
                            this.settingId = map[keys[0]].settingId;
                            this.newClassList = map[keys[0]].classList;
                            this.showApplyIntro = true;
                        } else if (keys.length === 0) {
                            // 所有班级都没有关联续学班级
                            this.showAlert = true;
                        } else {
                            let list = [];
                            keys.forEach((r) => {
                                list.push(map[r]);
                            });
                            this.propListClass = list;
                            this.showSelectClass = true;
                        }
                    }
                })
                .catch((err) => {
                    console.warn(err);
                    this.loadHandle.close();
                    this.$baseUI.alert(err, undefined, {
                        confirmText: '我知道了',
                    });
                });
        },
        getNextClassInfo(areaInfo, classList) {
            // 获取当前班级是否又下期班级
            let classIds = [];
            classList.forEach((r) => {
                classIds.push(r.classId);
            });
            let params = {
                classDptId: areaInfo.dptId,
                classIds: classIds.toString(),
            };
            return this.$callApi('selfLearn/query-next-class', {
                ...params,
            })
                .then((res) => {
                    let ret = res.getData();
                    console.log(ret, '000');
                    ret.forEach((item) => {
                        if (item.nextProuctStatus === true && item.newClass.gooodsStatus === 'Y') {
                            item.newClass.subjectList = item.newClass.subjectList.map((r) => {
                                r.subjectGooodsStatus = 'Y';
                                return r;
                            });
                        }
                    });
                    return ret;
                })
                .catch((err) => {
                    this.loadHandle && this.loadHandle.close();
                    this.$niceloo.api.handleFailure(err);
                });
        },
        getArea(param) {
            // 获取大区
            let params = {
                userProjects: JSON.stringify(param),
            };
            return this.$callApi('selfLearn/query-project-area', {
                ...params,
            })
                .then((res) => {
                    let ret = res.getData();
                    if (Array.isArray(ret.list) && ret.list.length > 0) {
                        this.areaMap[param[0].projectId] = ret.list[0];
                    } else {
                        return null;
                    }
                })
                .catch((err) => {
                    this.loadHandle && this.loadHandle.close();
                    this.$niceloo.api.handleFailure(err);
                });
        },
        closeAlert(check) {
            // 关闭弹窗
            this.showAlert = false;
        },
        doStartApplySelfLearn(check, info) {
            // 开始填写学习内容
            this.showApplyIntro = false;
            this.examAreacode = this.classList[0].examAreacode;
            if (check === true) {
                // 点击底部按钮关闭
                let areaInfo = {};
                let curClassInfo = {};
                let applyType = 'N'; // 正常申请:N;分批次申请:B;
                let classList = [];
                if (this.classList.length === 1) {
                    curClassInfo = this.classList[0];
                    classList = this.classList;
                    areaInfo = this.areaMap[curClassInfo.projectId];
                } else {
                    curClassInfo = this.newClassList[0];
                    classList = this.newClassList;
                    areaInfo = this.areaMap[curClassInfo.projectId];
                }

                this.$router.push({
                    name: 'selfLearnSelectSubject',
                    params: {
                        courseList: classList,
                        classDptId: areaInfo.dptId,

                        settingId: this.settingId,
                        projectId: curClassInfo.projectId,
                        projectName: curClassInfo.projectName,
                        examAreacode: this.examAreacode,
                        applySource: 'O',
                        applyType,
                        orderInfo: {
                            oriOrderType: this.paidDetails.orderSubtype, // orderSubtype // orderType
                            oriOrderNo: this.paidDetails.orderNo,
                            oriOrderId: this.paidDetails.orderId,
                        },
                        settingInfo: info,
                    },
                });
            }
        },
        async toPay(item) {
            //订金订单立即支付
            let classIds = [];
            item.orderItems.forEach((val) => {
                classIds.push(val.skuId);
            });
            let user = await this.$User.getUser();
            this.$cookieUtil.set((user || {}).userId + this.$nuxt.context.env.config.env + 'orderClass', classIds.toString());
            // PageUtil.navigateTo('/uc/manager/order/check?orderId=' + item.orderNo);
            this.$router.push({
                path: '/uc/manager/order/check',
                query: {
                    orderId: item.orderNo,
                },
            });
        },
        async toDetais(item) {
            let userInfo = await this.$User.getUser();
            this.choseItem = item;
            if (item.orderValidstatus != 'N' && item.orderPaystatus != 'P') {
                //N表示订单失效
                // if((item.orderSource != 'TM' && item.orderSource != 'JD' && item.orderSource != 'DA')//TM:天猫;JD:京东;DA:分销联盟) 电商不需要确认协议
                // && 放开电商订单 2021.01.15
                if (
                    item.orderAgreement &&
                    item.orderAgreement.agreementNeedconfirmstatus == 'Y' &&
                    item.orderAgreement.agreementStatus == 'N' &&
                    item.orderSubtype != 'REP'
                ) {
                    console.log('协议确认页面');
                    //协议确认页面
                    this.$refs.orderTrueOrder.open(item);
                    return;
                }
                if (item.orderAddressneedcompletestatus == 'Y' && item.orderAddresscompletedstatus == 'N') {
                    console.log('需要完善');
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
                    console.log('需要完善');
                    //看当前用户是否实名认证 S标识已实名
                    if (item.orderSource == 'OP' && item.orderSubtype != 'REP') {
                        //运营平台录单要求弹确认协议那个大弹窗 重读的除外
                        this.$refs.orderTrueOrder.open(item);
                    } else {
                        this.$refs.improveInfo.open(item);
                    }
                    return;
                }
                if (item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && item.orderAgreement.agreementUserinfoconfirmstatus == 'N') {
                    console.log('确认个人信息');
                    //确认个人信息
                    if (item.orderSource == 'OP' && item.orderSubtype != 'REP') {
                        //运营平台录单要求弹确认协议那个大弹窗 重读的除外
                        this.$refs.orderTrueOrder.open(item);
                    } else {
                        this.$refs.improveInfo.open(item);
                    }
                    return;
                }
            }
            let url = '';
            //orderSubtype (GEN:正常;REP:重读;TRA:转让;CHA:转班;REF:退费DEF:顺延;GIV:赠课)
            //orderPaystatus 	订单支付状态(U:待付款;P:部分付款;A:已付款;M:多付款;F:不付款;)
            if (item.orderPaystatus == 'P' && (item.orderSubtype == 'GEN' || item.orderSubtype == 'TRA')) {
                //定金 已付款详情(包括正常订单和转让订单)
                url = '/uc/manager/orderPaidDetailsEarnest';
            } else if (item.orderPaystatus == 'P' && item.orderSubtype == 'CHA') {
                //定金 转班详情
                url = '/uc/manager/orderPaidDetailsClassEarnest';
            } else if (item.orderSubtype == 'GEN' || item.orderSubtype == 'TRA') {
                //正常订单详情
                url = '/uc/manager/orderPaidDetails';
            } else if (item.orderSubtype == 'REP') {
                //重读订单
                url = '/uc/manager/orderPaidDetailsStress';
            } else if (item.orderSubtype == 'CHA') {
                //转班订单
                url = '/uc/manager/orderPaidDetailsClass';
            } else if (item.orderSubtype == 'DEF') {
                //延期订单
                url = '/uc/manager/orderPaidDetailsDelay';
            }
            this.$router.push({ path: url, query: { orderNo: item.orderNo } });
            // PageUtil.navigateTo(url + '/' + item.orderNo);
        },
        async addAddressSuccess() {
            //完善地址成功后
            let item = this.choseItem;
            this.getOrderPaidList();
            let userInfo = await this.$User.getUser();
            if (item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && userInfo.userIdcardstatus != 'S') {
                //看当前用户是否实名认证 S标识已实名
                this.$refs.improveInfo.open(item);
            } else if (item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && item.orderAgreement.agreementUserinfoconfirmstatus == 'N') {
                //确认个人信息
                this.$refs.improveInfo.open(item);
            }
        },
        getOrderPaidList() {
            //获取已付款订单列表
            this.loading = true;
            this.$niceloo.api.call('order/query-studentorder-paidorders-list', {
                pageIndex: this.$PageUtil.getStartIndex(this.page),
                pageSize: this.page.pageSize,
                onsuccess: ({ data = [], total = 0 }) => {
                    this.orderPaidList = data;
                    this.page.count = +total;
                    this.operationMark(this.orderPaidList).then(() => {
                        this.checkOrderStatus();
                    });
                    this.page.pageCount = +total;
                    console.warn(this.orderPaidList);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
        checkOrderStatus() {
            // 检查订单是否展示自助续学
            let map = {};
            let ret = [];
            let classIds = [];
            this.orderPaidList.forEach((rs) => {
                classIds = [];
                map[rs.orderNo] = rs;
                rs.orderItems.forEach((r) => {
                    if (r.orderitemStatus === 'GEND') {
                        classIds.push(r.skuId);
                    }
                });

                if (classIds.length === 0) {
                    return;
                }
                ret.push({
                    studentclassOrderno: rs.orderNo,
                    // userId: user.userId,
                    classIds: classIds.toString(),
                });
            });
            let params = {
                selfLearnApplyCheckVo: JSON.stringify(ret),
            };
            this.$callApi('selfLearn/check-order-self-learn-status', {
                ...params,
                onsuccess: (res) => {
                    res.forEach((r) => {
                        if (typeof r.studentclassOrderno === 'undefined') {
                            return;
                        }
                        r.classList = r.classList.map((rs) => {
                            rs.orderitemStatus = 'GEND';
                            return rs;
                        });

                        this.$set(map[r.studentclassOrderno], 'showSelfLearn', r[r.studentclassOrderno] === 'Y');
                        this.$set(map[r.studentclassOrderno], 'selfLearnClassList', r.classList);
                    });
                },
            });
        },
        //判断每个订单的下一步 该干嘛
        async operationMark(orderPaidList) {
            let userInfo = await this.$User.getUser();
            orderPaidList.forEach((item) => {
                if (item.orderValidstatus != 'N' && item.orderPaystatus != 'P') {
                    //N标识已失效订单
                    //重读的也不签协议
                    // if((item.orderSource != 'TM' && item.orderSource != 'JD' && item.orderSource != 'DA')//TM:天猫;JD:京东;DA:分销联盟) 电商不需要确认协议
                    // && 放开电商订单 2021.01.15
                    if (
                        item.orderAgreement &&
                        item.orderAgreement.agreementNeedconfirmstatus == 'Y' &&
                        item.orderAgreement.agreementStatus == 'N' &&
                        item.orderSubtype != 'REP'
                    ) {
                        //协议确认页面
                        this.$set(item, 'operationMark', 0);
                        return;
                    }
                    if (item.orderAddressneedcompletestatus == 'Y' && item.orderAddresscompletedstatus == 'N') {
                        //完善收货地址
                        this.$set(item, 'operationMark', 0);
                        return;
                    }
                    if (item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && userInfo.userIdcardstatus != 'S') {
                        //看当前用户是否实名认证 S标识已实名
                        this.$set(item, 'operationMark', 0);
                        return;
                    }
                    if (item.orderAgreement.userinfoNeedconfirmstatus == 'Y' && item.orderAgreement.agreementUserinfoconfirmstatus == 'N') {
                        //确认个人信息
                        this.$set(item, 'operationMark', 0);
                        return;
                    }
                }
                this.$set(item, 'operationMark', 1);
            });
        },
        handleSchoolOrderConfirm(item) {
            this.$baseUI
                .createModel(
                    {
                        modalContent: SchoolOrderVoucher,
                        modalHeader: (
                            <div class="title-wrap">
                                <h2 class="title" style="text-align: center;font-size: 18px;font-weight: normal;">
                                    请确认院校专业
                                </h2>
                            </div>
                        ),
                    },
                    {
                        order: item,
                    },
                    {
                        width: '890px',
                        radius: '16px',
                    }
                )
                .then(({ type, ret }) => {
                    if (type === 'close' && ret === 'click') {
                        this.getOrderPaidList();
                    }
                });
        },
        handleSchoolOrderDetail(item) {
            this.$baseUI.createModel(
                {
                    modalContent: SchoolOrderVoucher,
                    modalHeader: (
                        <div class="title-wrap">
                            <h2 class="title" style="text-align: center;font-size: 18px;font-weight: normal;">
                                查看院校确认单
                            </h2>
                        </div>
                    ),
                },
                {
                    order: item,
                },
                {
                    width: '890px',
                    radius: '16px',
                }
            );
        },
    },
};
</script>

<style scoped lang="less">
.tabDetails {
    min-height: 662px;
    background-color: white;
    padding-bottom: 30px;
}
</style>
