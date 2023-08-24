<template>
    <div class="select-subject-wrap">
        <div class="info">
            <div class="item">
                <span class="label">学员姓名：</span>
                {{ userInfo.userName }}
            </div>
            <div class="item">
                <span class="label">优路号：</span>
                {{ userInfo.userYoulunum }}
            </div>
            <div class="item">
                <span class="label">报班项目：</span>
                {{ projectName }}
            </div>
        </div>
        <table class="table">
            <tr>
                <th class="table__class-name">班级名称</th>
                <th class="table__select-subject">
                    <span class="must">*</span>
                    请选择续学科目
                </th>
                <th class="table__desc">备注</th>
            </tr>
            <tr v-for="item in compList" :key="item.oriClassId">
                <td class="table__class-name">
                    <div class="table-wrap">
                        <div class="name">{{ item.oriClassName }}</div>
                        <div class="txt">协议：{{ item.oriServContent }}</div>
                        <!-- <div class="txt">下一期；重读资料费100.00元/科</div> -->
                    </div>
                </td>
                <td class="table__select-subject">
                    <div class="table-wrap">
                        <div class="checkobx-line" v-for="it in item.subjectList" :key="it.subjectId">
                            <div
                                class="checkbox"
                                v-if="item.nextProuctStatus"
                                :class="{ yes: it.isNext, no: !it.isNext, disabled: it.stuscPassstatus === 'Y' }"
                                @click="doSelectSubject(it, item)"
                            ></div>
                            <div class="checkbox no" v-else></div>
                            {{ it.subjectName }}
                        </div>
                    </div>
                </td>
                <td class="table__desc">
                    <div class="table-wrap">
                        <template v-if="!(item.nextProuctStatus === true && item.showGoods && item.newClass.gooodsStatus === 'Y')">
                            <div class="tip">
                                注意：
                                <span class="strong">请选择未通过考试需要办理续学的科目</span>
                            </div>
                        </template>
                        <template v-if="item.nextProuctStatus === false">
                            <div class="intro-tip">该班级暂不支持自助申请续学，请联系人工办理！</div>
                        </template>
                        <template v-else-if="item.nextProuctStatus === true && item.showGoods && item.newClass.gooodsStatus === 'Y'">
                            <div class="intro">
                                <span class="must">*</span>
                                该班级办理续学有配套的纸质资料，您是否需要？
                            </div>
                            <div class="radio-list">
                                <div class="radio-block">
                                    <div class="radio" :class="{ yes: item.mustGooodsStatus === true }" @click="changeGoodsStatus(item, true)"></div>
                                    需要
                                </div>
                                <div class="radio-block">
                                    <div class="radio" :class="{ yes: item.mustGooodsStatus === false }" @click="changeGoodsStatus(item, false)"></div>
                                    不需要
                                </div>
                            </div>
                            <div class="box-section" v-if="item.mustGooodsStatus === false"><sapn class="txt">您已选择不需要纸质资料</sapn></div>
                            <div class="box-section" v-if="item.mustGooodsStatus === true">
                                <div class="txt">请选择需要资料的科目：</div>
                                <div class="checkobx-line" v-for="subject in subjectList(item)" :key="subject.subjectId">
                                    <div
                                        class="checkbox"
                                        :class="{ yes: subject.gooodsStatus === 'Y', no: !subject.gooodsStatus || subject.gooodsStatus === 'N' }"
                                        @click="changeSubjectGoodsStatus(subject, item)"
                                    ></div>
                                    {{ subject.subjectName }}
                                </div>
                            </div>
                        </template>
                    </div>
                </td>
            </tr>
        </table>
        <div class="bottom">
            <div class="price">
                <span class="txt">续学服务费合计：</span>
                <span class="num">&#65509;{{ sumPrice }}</span>
            </div>
            <div class="btn" :class="{ disabled: !allowNext }" @click="doSubmit">下一步</div>
        </div>
        <template v-if="showAlert">
            <apply-alert :show="true" @do-close="closeAlert">
                <div class="msg-content">{{ errorInfo }}</div>
            </apply-alert>
        </template>
    </div>
</template>
<script>
import '@/api/selfLearn/api..query-signle-class-info.js';
import '@/api/selfLearn/api.self-learn-002.query-class-info.js';
import '@/api/ss/api.SS1301.query-stusc-Info';

import ApplyAlert from '../components/applyAlert/index.vue';
export default {
    components: {
        ApplyAlert,
    },
    data() {
        return {
            errorInfo: '',
            areaInfo: {},
            list: [],
            classDptId: '',
            selectClass: {},
            showAlert: false,

            settingId: '',
            projectId: '',
            projectName: '',
            examAreacode: '',
            applySource: '',
            applyType: '',
            orderInfo: {
                oriOrderType: '',
                oriOrderNo: '',
                oriOrderId: '',
            },

            settingInfo: {},
            userInfo: {
                userName: '',
                userYoulunum: '',
            },
            oldclasstypeIdMap: {},
        };
    },
    computed: {
        compList() {
            let ret = [];
            this.list.forEach((r) => {
                ret.push(r.nextClass);
            });
            return ret;
        },
        subjectList() {
            return (item) => {
                let map = {};
                let ret = [];
                item.subjectList.forEach((r) => {
                    map[r.subjectId] = r;
                });
                item.newClass.subjectList.forEach((r) => {
                    let item = map[r.subjectId];
                    if (!item) {
                        return;
                    }
                    if (!item.isNext) {
                        return;
                    }
                    if (r.subjectGooodsStatus !== 'Y') {
                        return;
                    }
                    ret.push(r);
                });
                return ret;
            };
        },
        sumPrice() {
            let total = 0;
            // debugger;
            this.list.forEach((r) => {
                let map = {};
                r.nextClass.newClass.subjectList.forEach((rs) => {
                    map[rs.subjectId] = rs;
                });
                if (r.nextClass.repeatFeeWay === 1) {
                    r.nextClass.subjectList.forEach((rs) => {
                        if (rs.isNext) {
                            if (r.nextClass.repeatFeeType === 1 || r.nextClass.repeatFeeType === 2) {
                                // 按资料收费 或 按服务收费
                                if (r.nextClass.mustGooodsStatus === true) {
                                    if (map[rs.subjectId].gooodsStatus === 'Y' && map[rs.subjectId].subjectGooodsStatus === 'Y') {
                                        total += r.nextClass.repeatFee;
                                    }
                                }
                            }
                        }
                    });
                } else if (r.nextClass.repeatFeeWay === 2) {
                    let check = false;
                    r.nextClass.subjectList.forEach((rs) => {
                        if (rs.isNext) {
                            if (r.nextClass.repeatFeeType === 1 || r.nextClass.repeatFeeType === 2) {
                                // 按资料收费 或 按服务收费
                                if (r.nextClass.mustGooodsStatus === true) {
                                    if (map[rs.subjectId].gooodsStatus === 'Y' && map[rs.subjectId].subjectGooodsStatus === 'Y') {
                                        check = true;
                                    }
                                }
                            }
                        }
                    });
                    if (check) {
                        total += r.nextClass.repeatFee;
                    }
                }
            });
            return (total / 100).toFixed(2);
        },
        allowNext() {
            // 允许下一步操作
            let check = false;
            let allNum = 0;
            let allCheck = true; // 判断有一项不符合条件就不让执行下去
            // debugger;
            this.list.forEach((r) => {
                let tmpNum = 0;
                let allowNum = 0;
                let num = 0;
                let isAllSubject = false;
                let map = {};
                r.nextClass.newClass.subjectList.forEach((rss) => {
                    map[rss.subjectId] = rss;
                });

                r.nextClass.subjectList.forEach((rs) => {
                    if (rs.isNext) {
                        allowNum += 1;
                        isAllSubject = true;
                        // 选择了科目
                        if (r.nextClass.nextProuctStatus === true && r.nextClass.newClass.gooodsStatus === 'Y') {
                            // 新班级有资料
                            if (r.nextClass.mustGooodsStatus === true) {
                                // 需要资料
                                let tmpCheck = false;
                                r.nextClass.newClass.subjectList.forEach((rss) => {
                                    if (rss.gooodsStatus === 'Y') {
                                        tmpNum += 1;
                                        tmpCheck = true;
                                    }
                                });
                                if (tmpCheck === false) {
                                    allCheck = false;
                                }
                            } else if (r.nextClass.mustGooodsStatus === false) {
                                // 不需要资料
                                tmpNum += 1;
                            } else {
                                // 班级有资料，用户没有选择
                                let item = map[rs.subjectId];
                                if (item.subjectGooodsStatus === 'N') {
                                    // 班级有资料，单个科目没有资料
                                    // tmpNum += 1;
                                    allowNum--;
                                } else {
                                    // 班级有资料，科目有资料
                                    allCheck = false;
                                }
                            }
                        } else {
                            // 新班级无资料
                            tmpNum += 1;
                        }

                        if (tmpNum > 0) {
                            num += 1;
                        }
                    }
                });

                if ((num === allowNum && allowNum > 0) || (isAllSubject === true && allowNum === 0) || r.nextClass.nextProuctStatus === false) {
                    allNum += 1;
                }
            });
            if (allNum > 0) {
                check = true;
            }
            return check && allCheck;
        },
        allowNext2() {
            // 允许下一步操作
            let check = false;
            let allNum = 0;
            // debugger;
            this.list.forEach((r) => {
                let tmpNum = 0;
                let allowNum = 0;
                let num = 0;
                let isAllSubject = false;
                let map = {};
                r.nextClass.newClass.subjectList.forEach((rss) => {
                    map[rss.subjectId] = rss;
                });

                r.nextClass.subjectList.forEach((rs) => {
                    if (rs.isNext) {
                        allowNum += 1;
                        isAllSubject = true;
                        // 选择了科目
                        if (r.nextClass.nextProuctStatus === true && r.nextClass.newClass.gooodsStatus === 'Y') {
                            // 新班级有资料
                            if (r.nextClass.mustGooodsStatus === true) {
                                // 需要资料
                                r.nextClass.newClass.subjectList.forEach((rss) => {
                                    if (rss.gooodsStatus === 'Y') {
                                        tmpNum += 1;
                                    }
                                });
                            } else if (r.nextClass.mustGooodsStatus === false) {
                                // 不需要资料
                                tmpNum += 1;
                            } else {
                                // 无资料
                                let item = map[rs.subjectId];
                                if (item.subjectGooodsStatus === 'N') {
                                    // 无资料
                                    // tmpNum += 1;
                                    allowNum--;
                                }
                            }
                        } else {
                            // 新班级无资料
                            tmpNum += 1;
                        }

                        if (tmpNum > 0) {
                            num += 1;
                        }
                    }
                });

                if ((num === allowNum && allowNum > 0) || (isAllSubject === true && allowNum === 0) || r.nextClass.nextProuctStatus === false) {
                    allNum += 1;
                }
            });
            if (allNum === this.list.length) {
                check = true;
            }
            return check;
        },
    },
    mounted() {
        this.$User.getUser().then((user) => {
            this.userInfo = user;
        });
        this.init();
    },
    methods: {
        init() {
            // this.getData();
            if (Array.isArray(this.$route.params.courseList) && this.$route.params.courseList.length > 0) {
                // repeatFeeType 续学费用类型(1 资料费 2服务费3不收取费用)
                // 有课程选中列表的获取相关的数据
                this.list = this.$route.params.courseList;
                this.classDptId = this.$route.params.classDptId;
                this.settingId = this.$route.params.settingId;

                this.projectId = this.$route.params.projectId;
                this.projectName = this.$route.params.projectName;
                this.examAreacode = this.$route.params.examAreacode;
                this.applySource = this.$route.params.applySource; //  O-订单，C-课程
                this.applyType = this.$route.params.applyType; // 正常申请:N;分批次申请:B;
                this.orderInfo = this.$route.params.orderInfo;
                this.settingInfo = this.$route.params.settingInfo;

                this.getStuscInfo();
            } else if (this.$route.query.orderId) {
                // 存在订单号直接返回订单详情
                this.$router.push(`/uc/manager/orderPaidDetailsStress?orderNo=${this.$route.query.orderId}`);
            } else {
                // 没有订单号的返回订单列表
                this.$router.push('/uc/manager/order/orderClass');
            }
        },
        closeAlert(check) {
            // 关闭弹窗
            this.showAlert = false;
        },
        doSubmit() {
            if (!this.allowNext) {
                return;
            }
            let allowClassCheck = []; // 需要检查的班级
            // 判断当前是否可以提交
            // 判断是否有未选择科目的班级
            let isSubject = false;
            let isGoods = false;
            this.list.forEach((r) => {
                let num = 0;
                let num2 = 0;
                if (r.nextClass.nextProuctStatus === false) {
                    // 必须有下期续学
                    return;
                }
                let map = {};
                let ids = [];
                r.nextClass.newClass.subjectList.forEach((rs) => {
                    map[rs.subjectId] = rs;
                    if (rs.subjectGooodsStatus === 'Y' && rs.gooodsStatus === 'Y') {
                        ids.push(rs.subjectId);
                    }
                });
                r.nextClass.subjectList.forEach((rs) => {
                    if (rs.isNext === true) {
                        num += 1;
                        if (r.nextClass.newClass.gooodsStatus === 'Y' && r.nextClass.mustGooodsStatus === true) {
                            // 新班级有资料，选择的需要资料
                            let item = map[rs.subjectId];
                            // 选择了续学班级
                            if (item.subjectGooodsStatus === 'Y' && item.gooodsStatus === 'Y') {
                                num2 += 1;
                            }
                            // num2 += 1;
                        } else if (r.nextClass.newClass.gooodsStatus === 'Y' && r.nextClass.mustGooodsStatus === false) {
                            // 有资料，选择不需要
                            // 新班级无资料 选择不需要
                            num2 = -1;
                        } else if (r.nextClass.newClass.gooodsStatus === 'N') {
                            // 无资料
                            // 新班级无资料
                            num2 = -1;
                        } else if (r.nextClass.newClass.gooodsStatus === 'Y' && r.nextClass.mustGooodsStatus === null) {
                            // 有资料 没有选择需要 判断当前选择的科目是否是无资料的
                            let item = map[rs.subjectId];
                            if (item.subjectGooodsStatus === 'N') {
                                num2 = -1;
                            }
                        }
                    }
                });

                if (num2 === 0) {
                    isGoods = true;
                }
                if (num === 0) {
                    isSubject = true;
                }
                // 续学全部科目
                if (num === r.nextClass.subjectList.length) {
                    // if (num2 !== ids.length && num2 !== -1) {
                    if (r.nextClass.mustGooodsStatus === true && num2 !== r.nextClass.subjectList.length) {
                        // 部分科目需要资料
                        allowClassCheck.push(r.nextClass);
                    }
                } else if (num > 0 && num !== r.nextClass.subjectList.length) {
                    // 部分科目续学
                    allowClassCheck.push(r.nextClass);
                }
            });
            // 判断不同班级中是否有重复的科目需要资料
            let tmpList = [];
            let repeatName = [];
            let checkRepent = false;
            let classIds = [];
            this.list.forEach((r) => {
                let map = [];
                classIds.push(r.classId);
                r.nextClass.subjectList.forEach((r) => {
                    if (r.isNext === true) {
                        map.push(r.subjectId);
                    }
                });
                r.nextClass.newClass.subjectList.forEach((rs) => {
                    if (map.includes(rs.subjectId) && rs.subjectGooodsStatus === 'Y' && rs.gooodsStatus === 'Y') {
                        if (tmpList.includes(rs.subjectId) && !repeatName.includes(rs.subjectName)) {
                            // 已经存在
                            repeatName.push(rs.subjectName);
                            checkRepent = true;
                        }
                        tmpList.push(rs.subjectId);
                    }
                });
            });
            console.log('@@', classIds);
            if (checkRepent === true) {
                this.showAlert = true;
                this.errorInfo = `${repeatName.toString()} 已选择资料，请勿重复选择！`;
                return;
            }
            console.log(isSubject, isGoods);
            // if (isSubject) {
            //     // 有未选择科目的班级
            //     this.showAlert = true;
            //     this.errorInfo = '您有未选择科目的班级，不能进入下一步！';
            //     return;
            // }
            // if (isGoods) {
            //     this.showAlert = true;
            //     this.errorInfo = '请选择续学科目是否需要资料！';
            //     return;
            // }
            // 有需要校验的科目
            if (allowClassCheck.length === 0) {
                // 进入下一步
                this.duNextHandle(this.list);
            } else {
                // 有需要校验的科目
                this.getNextClassInfo(allowClassCheck);
            }
        },
        getClassInfo(classIds) {
            // 获取课程详情
            let params = {
                classIds: classIds.toString(),
            };
            return this.$callApi('selfLearn/query-class-info', {
                ...params,
            }).then((ret) => {
                const res = ret.getData();
                res.forEach((r) => {
                    this.oldclasstypeIdMap[r.oriClassId] = r.oldclasstypeId;
                });
            });
        },
        duNextHandle(list) {
            // 获取下一步续学班级
            let ret = [];
            let classIds = [];
            list.forEach((rs) => {
                if (rs.nextClass.nextProuctStatus === false) {
                    return;
                }
                // 判断是否选择了科目
                let check = false;
                rs.nextClass.subjectList.forEach((r3) => {
                    if (r3.isNext === true) {
                        check = true;
                    }
                });
                if (check === true) {
                    classIds.push(rs.classId);
                    rs.nextClass.newClassList = [rs.nextClass.newClass];
                    ret.push(rs.nextClass);
                }
            });
            this.getClassInfo(classIds).then(() => {
                this.$router.replace({
                    name: 'addSelfLearn',
                    params: {
                        list: ret,

                        settingId: this.settingId,
                        projectId: this.projectId,
                        projectName: this.projectName,
                        examAreacode: this.examAreacode,
                        applySource: this.applySource,
                        applyType: this.applyType,
                        orderInfo: this.orderInfo,

                        settingInfo: this.settingInfo,

                        oldclasstypeIdMap: this.oldclasstypeIdMap,

                        // 为返回上一页做准备
                        originData: this.$route.params,

                        formData: this.$route.params.formData,
                    },
                });
            });
        },
        getNextClassInfo(list) {
            let params = this.getParams(list);
            let params2 = {
                ampleComlexClassRequestVOS: params,
            };
            this.$callApi('selfLearn/query-signle-class-info', {
                ...params2,
            }).then((res) => {
                let ret = res.getData();
                if (ret.length === 0) {
                    // 没有单科班
                    this.showAlert = true;
                    this.errorInfo = '该班级暂不支持自助申请续学，请联系人工办理！';
                } else {
                    let check = false;
                    let map = {};
                    ret.forEach((r) => {
                        if (r.matchSatus === false) {
                            check = true;
                            return;
                        }
                        r.newClassList.map((rs) => {
                            if (rs.subjectNature === 'S') {
                                rs.subjectList = [
                                    {
                                        gooodsStatus: rs.requestGooodsStatus,
                                        subjectGooodsStatus: rs.gooodsStatus,
                                        subjectId: rs.subjectId,
                                        subjectName: rs.subjectName,
                                    },
                                ];
                            }
                            return rs;
                        });
                        map[r.oriClassId] = r.newClassList;
                    });

                    if (check === true) {
                        // 有部分科目没有匹配到班级
                        this.showAlert = true;
                        this.errorInfo = '该班级暂不支持自助申请续学，请联系人工办理！';
                    } else {
                        let ret2 = [];
                        let classIds = [];
                        this.list.forEach((res) => {
                            if (res.nextClass.nextProuctStatus === false) {
                                return;
                            }
                            // 判断是否选择了科目
                            let check = false;
                            res.nextClass.subjectList.forEach((r3) => {
                                if (r3.isNext === true) {
                                    check = true;
                                }
                            });
                            if (check === true) {
                                classIds.push(res.classId);
                                if (map[res.nextClass.oriClassId]) {
                                    res.nextClass.newClassList = map[res.nextClass.oriClassId];
                                } else {
                                    res.nextClass.newClassList = [res.nextClass.newClass];
                                }

                                ret2.push(res.nextClass);
                            }
                        });
                        this.getClassInfo(classIds).then(() => {
                            this.$router.replace({
                                name: 'addSelfLearn',
                                params: {
                                    list: ret2,

                                    settingId: this.settingId,
                                    projectId: this.projectId,
                                    projectName: this.projectName,
                                    examAreacode: this.examAreacode,
                                    applySource: this.applySource,
                                    applyType: this.applyType,
                                    orderInfo: this.orderInfo,
                                    oldclasstypeIdMap: this.oldclasstypeIdMap,

                                    settingInfo: this.settingInfo,

                                    // 为返回上一页做准备
                                    originData: this.$route.params,

                                    formData: this.$route.params.formData,
                                },
                            });
                        });
                    }
                }
            });
        },
        getParams(list) {
            let list2 = [];
            list.forEach((res) => {
                if (res.nextProuctStatus === true) {
                    list2.push(res);
                }
            });
            return list2.map((r) => {
                // 选出选择后的科目
                let subject = [];
                let map = {};
                r.newClass.subjectList.forEach((rs) => {
                    map[rs.subjectId] = rs;
                });
                r.subjectList.forEach((rs) => {
                    let item = map[rs.subjectId];
                    if (rs.isNext === true) {
                        subject.push({
                            subjectId: item.subjectId,
                            subjectName: item.subjectName,
                            gooodsStatus: item.gooodsStatus === 'Y' ? 'Y' : 'N',
                        });
                    }
                });
                return {
                    classAsertype: r.classAsertype,
                    subjectList: subject,
                    classtypeId: r.classtypeId,
                    oriClassId: r.oriClassId,
                    classDptId: this.classDptId,
                };
            });
        },
        changeSubjectGoodsStatus(subject, item) {
            // 选择需要资料的科目
            if (typeof subject.gooodsStatus === 'undefined') {
                this.$set(subject, 'gooodsStatus', 'Y');
            } else if (subject.gooodsStatus === 'Y') {
                if (item.repeatFeeWay === 1 || item.repeatFeeType === 3) {
                    // 按资料收费可以取消资料 最后一项不可取消 按科目收费或者免费
                    let num = 0;
                    let map = [];
                    item.subjectList.forEach((rs) => {
                        if (rs.isNext) {
                            map.push(rs.subjectId);
                        }
                    });
                    item.newClass.subjectList.forEach((r1) => {
                        if (map.includes(r1.subjectId) && r1.gooodsStatus === 'Y' && r1.subjectGooodsStatus === 'Y') {
                            num += 1;
                        }
                    });
                    if (num === 1) {
                        this.errorInfo = '需要至少选择1个科目';
                        this.showAlert = true;
                    } else {
                        subject.gooodsStatus = 'N';
                    }
                }
            } else {
                subject.gooodsStatus = 'Y';
            }
        },
        changeGoodsStatus(item, val) {
            // 选择是否需要资料
            if (typeof item.mustGooodsStatus === 'undefined') {
                this.$set(item, 'mustGooodsStatus', val);
            } else {
                item.mustGooodsStatus = val;
            }

            if (item.mustGooodsStatus === true) {
                // 需要资料
                /**
                 * 续学班级统一收取，需要资料默认勾选不可取消
                 * 续学班级按科目收取，默认勾选可取消
                 */
                // debugger;
                let map = [];
                item.subjectList.forEach((r2) => {
                    if (r2.isNext === true) {
                        map.push(r2.subjectId);
                    }
                });
                item.newClass.subjectList.forEach((r2) => {
                    if (map.includes(r2.subjectId) && r2.subjectGooodsStatus === 'Y') {
                        this.$set(r2, 'gooodsStatus', 'Y');
                    }
                });
            } else {
                item.newClass.subjectList.forEach((r2) => {
                    this.$set(r2, 'gooodsStatus', 'N');
                });
            }
        },
        doSelectSubject(it, item) {
            // 选择科目
            if (typeof it.isNext === 'undefined') {
                this.$set(it, 'isNext', true);
            } else {
                it.isNext = !it.isNext;
            }
            // 判断新班级科目是否有资料
            if (item.newClass.gooodsStatus === 'Y') {
                // 下期班级有资料
                let map = []; // 续学的科目ID
                item.subjectList.forEach((r) => {
                    if (r.isNext === true) {
                        map.push(r.subjectId);
                    }
                });
                let check = false;
                item.newClass.subjectList.forEach((rs) => {
                    // 选择了续学，并且
                    if (map.includes(rs.subjectId) && rs.subjectGooodsStatus === 'Y') {
                        check = true;
                    }
                    if (rs.subjectId === it.subjectId && it.isNext === true && rs.subjectGooodsStatus === 'Y' && item.mustGooodsStatus === true) {
                        this.$set(rs, 'gooodsStatus', 'Y');
                    } else if ((rs.subjectId === it.subjectId && it.isNext === false) || item.mustGooodsStatus !== true) {
                        this.$set(rs, 'gooodsStatus', 'N');
                    }
                });
                this.$set(item, 'showGoods', check);
                if (check === false) {
                    this.$set(item, 'mustGooodsStatus', null);
                }
            } else {
                this.$set(item, 'showGoods', false);
                this.$set(item, 'mustGooodsStatus', null);
            }
        },
        getStuscInfo() {
            return Promise.all(
                this.list.map((item) => {
                    return this.$callApi('ss/query-stusc-Info', {
                        projectId: item.projectId,
                        stuscpExamyear: item.examservYear,
                        stuscpExamcycle: item.examservSeq,
                    });
                })
            )
                .then((resArr) => {
                    this.list.forEach((item, index) => {
                        const resData = resArr[index].getData();
                        item.nextClass.subjectList.forEach((sitem) => {
                            const info = (resData.ssStuscList || []).find((ssItem) => sitem.subjectId === ssItem.subjectId);
                            // stuscExamstatus 	学员成绩考试状态(ZC:正常;QK:缺考;ZB:作弊;WX:无效)
                            // stuscScore 学员成绩分数
                            // stuscScoreline 学员成绩分数线
                            // stuscPassstatus 学员成绩通过状态(Y:通过;N:不通过)
                            if (info) {
                                const isModified = typeof sitem.stuscPassstatus === 'string' && sitem.stuscPassstatus !== info.stuscPassstatus;
                                this.$set(sitem, 'stuscExamstatus', info.stuscExamstatus);
                                this.$set(sitem, 'stuscScore', info.stuscScore);
                                this.$set(sitem, 'stuscScoreline', info.stuscScoreline);
                                this.$set(sitem, 'stuscPassstatus', info.stuscPassstatus);
                                if (isModified) {
                                    this.doSelectSubject(sitem, item.nextClass);
                                }
                            }
                        });
                    });
                })
                .catch((err) => {
                    console.warn(err);
                    niceloo.api.handleFailure(err);
                });
        },
    },
};
</script>
<style lang="less" scoped>
table,
tbody,
thead,
th,
td {
    font-weight: normal;
}
.tip {
    font-size: 14px;
    color: #333333;
    line-height: 21px;

    .strong {
        color: #e73928;
    }
}
.msg-content {
    font-size: 14px;
    color: #333333;
    margin: 0 -14px;
}
.select-subject-wrap {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    background-color: #fff;
}
.bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 70px;
    .price {
        .txt {
            font-size: 16px;
            color: #333333;
        }
        .num {
            color: #e73928;
            font-size: 28px;
        }
    }
    .btn {
        width: 140px;
        height: 40px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 40px;
        background: linear-gradient(90deg, #f07963, #e73928);
        border-radius: 4px;
        cursor: pointer;

        &.disabled {
            background: #cccccc;
        }
    }
}
.table-wrap {
    width: 100%;
    height: 100%;
    // position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-sizing: border-box;
}
.table {
    width: 100%;
    border: 1px solid #f1f1f1;
    border-collapse: collapse;
    border-spacing: 0;
    tr,
    th,
    td {
        position: relative;
        border: 1px solid #f1f1f1;
    }
    th {
        font-weight: bold;
        text-align: center;
        color: #333333;
        font-size: 16px;
        line-height: 44px;
        background: #f8f8f8;
    }
    &__class-name,
    &__desc,
    &__select-subject {
        .table-wrap {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
        }
    }
    &__desc {
        width: 364px;

        .table-wrap {
            padding: 24px 16px;
        }
        .intro {
            font-size: 14px;
            .must {
                color: red;
            }
        }
        .intro-tip {
            color: #999999;
            font-size: 14px;
        }

        .radio-list {
            display: flex;
            padding-top: 20px;
            .radio-block {
                display: flex;
                color: #666666;
                font-size: 14px;
                align-items: center;
                margin-right: 50px;
                .radio {
                    width: 14px;
                    height: 14px;
                    margin-right: 8px;
                    background-image: url(./asset/images/no_select.png);
                    background-size: 100% 100%;

                    &.yes {
                        background-image: url(./asset/images/yes_select.png);
                    }
                }
            }
        }

        .box-section {
            display: flex;
            flex-wrap: wrap;
            width: 332px;
            min-height: 63px;
            padding: 16px 24px;
            margin-top: 17px;
            background: #f9f9f9;
            box-sizing: border-box;

            .txt {
                font-size: 14px;
                padding-bottom: 10px;
            }

            .checkobx-line {
                width: 142px;
                flex-shrink: 0;
            }
        }
    }
    &__class-name {
        width: 271px;

        .table-wrap {
            position: relative;
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
            width: 271px;
        }

        .name {
            line-height: 24px;
            color: #333333;
            font-size: 16px;
            font-weight: bold;
            text-align: left;
            margin-bottom: 3px;
            width: 100%;
        }

        .txt {
            font-size: 12px;
            color: #999999;
            line-height: 16px;
            width: 100%;
        }
    }

    &__select-subject {
        width: 169px;
        .table-wrap {
            position: relative;
            flex-direction: column;
            align-items: flex-start;
            padding: 24px 10px;
        }

        .must {
            color: red;
        }
    }
}
.checkobx-line {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    word-break: break-all;
    .checkbox {
        width: 14px;
        height: 14px;
        flex-shrink: 0;
        border-radius: 2px;
        background-size: 100% 100%;
        margin-right: 8px;

        &.no {
            background-image: url(./asset/images/no_checkbox.png);
        }
        &.yes {
            background-image: url(./asset/images/yes_checkbox.png);
        }
        &.disabled {
            background-image: url(./asset/images/disabled_checkbox.png);
            pointer-events: none;
        }
    }
}
.info {
    display: flex;
    padding-bottom: 24px;

    .item {
        color: #333333;
        font-size: 14px;
        margin-right: 48px;
    }
}
</style>
