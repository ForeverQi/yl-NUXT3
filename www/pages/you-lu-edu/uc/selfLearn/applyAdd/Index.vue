<template>
    <div class="add-apply">
        <tab-list :tabs="tabs" :active-index="activeIndex" />
        <class-content :list="propList" :project-name="projectName" />
        <score-upload :sum-price="sumPrice" @doSubmit="doSubmit" :setting-info="settingInfo" :show-prev="true" />
    </div>
</template>
<script>
import TabList from '@/www/components/order/components/tabList';
import ClassContent from '@/www/components/order/applyAdd/classContent';
import ScoreUpload from '@/www/components/order/applyAdd/scoreUpload';
import '@/api/selfLearn/api..add-self-learn-apply.js';
import '@/api/uc/api.OC2006.create-payment-address.js';
export default {
    components: {
        TabList,
        ClassContent,
        ScoreUpload,
    },
    data() {
        return {
            tabs: [
                {
                    name: '续学申请',
                },
            ],
            activeIndex: 0,
            list: [],
            propList: [],
            userInfo: {},
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

            settingInfo: {
                accountShow: '',
                accountType: '',
                pwdShow: '',
                pwdType: '',
            },
            oldclasstypeIdMap: {},
            oriData: {},
        };
    },
    computed: {
        sumPrice() {
            let total = 0;
            if (this.list.length === 0) {
                return 0;
            }

            // debugger;
            this.list.forEach((r) => {
                let map = {};
                r.newClass.subjectList.forEach((rs) => {
                    map[rs.subjectId] = rs;
                });
                if (r.repeatFeeWay === 1) {
                    r.subjectList.forEach((rs) => {
                        if (rs.isNext) {
                            if (r.repeatFeeType === 1 || r.repeatFeeType === 2) {
                                // 按资料收费 或 按服务收费
                                if (r.mustGooodsStatus === true) {
                                    if (map[rs.subjectId].gooodsStatus === 'Y') {
                                        total += r.repeatFee;
                                    }
                                }
                            }
                        }
                    });
                } else if (r.repeatFeeWay === 2) {
                    let check = false;
                    r.subjectList.forEach((rs) => {
                        if (rs.isNext) {
                            if (r.repeatFeeType === 1 || r.repeatFeeType === 2) {
                                // 按资料收费 或 按服务收费
                                if (r.mustGooodsStatus === true) {
                                    if (map[rs.subjectId].gooodsStatus === 'Y') {
                                        check = true;
                                    }
                                }
                            }
                        }
                    });
                    if (check) {
                        total += r.repeatFee;
                    }
                }
            });

            return total;
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (Array.isArray(this.$route.params.list) && this.$route.params.list.length > 0) {
                this.init2();
            } else if (this.$route.query.orderId) {
                // 存在订单号直接返回订单详情
                this.$router.push(`/uc/manager/orderPaidDetails?orderNo=${this.$route.query.orderId}`);
            } else {
                // 没有订单号的返回订单列表
                this.$router.push('/uc/manager/order/orderClass');
            }
        },
        init2() {
            this.$User.getUser().then((user) => {
                this.userInfo = user;
            });
            this.oldclasstypeIdMap = this.$route.params.oldclasstypeIdMap;
            this.settingId = this.$route.params.settingId;
            this.projectId = this.$route.params.projectId;
            this.projectName = this.$route.params.projectName;
            this.examAreacode = this.$route.params.examAreacode;
            this.applySource = this.$route.params.applySource; //  O-订单，C-课程
            this.applyType = this.$route.params.applyType; // 正常申请:N;分批次申请:B;
            this.orderInfo = this.$route.params.orderInfo;
            this.list = this.$route.params.list;
            this.settingInfo = this.$route.params.settingInfo;
            this.oriData = this.$route.params.originData;

            let tmpList = [];
            this.list.forEach((r) => {
                let subjectList = [];
                r.newClassList.forEach((r1) => {
                    r1.subjectList.forEach((r2) => {
                        subjectList.push(r2);
                    });
                });

                tmpList.push({
                    ...r,
                    className: r.oriClassName,
                    subjectList,
                });
            });
            this.propList = tmpList;
        },
        doSubmit(item) {
            let subjectList = [];
            if (!item.scoreImageUrl) {
                this.$baseUI.alert('成绩截图不能为空！');
                return;
            }
            if (this.settingInfo.accountShow === 'Y' && this.settingInfo.accountType === 'Y' && !item.scoreQueryAccount) {
                this.$baseUI.alert('成绩查询账号不能为空！');
                return;
            }
            if (this.settingInfo.pwdShow === 'Y' && this.settingInfo.pwdType === 'Y' && !item.scoreQueryPwd) {
                this.$baseUI.alert('成绩查询密码不能为空！');
                return;
            }
            const loading = this.$baseUI.loading();
            this.list.forEach((r) => {
                r.newClassList.forEach((r1, index) => {
                    let singlePrice = 0;
                    // console.log(r, '====');
                    if (r.repeatFeeType === 3) {
                        singlePrice = 0;
                    } else if (r.repeatFeeWay === 1) {
                        // 资料费 服务费
                        // 按科目收费
                        r1.subjectList.forEach((subject) => {
                            if (subject.gooodsStatus === 'Y' && r.mustGooodsStatus === true && subject.subjectGooodsStatus === 'Y') {
                                singlePrice += r.repeatFee;
                            }
                        });
                    } else if (r.repeatFeeWay === 2 && index === 0) {
                        r1.subjectList.forEach((subject) => {
                            if (subject.gooodsStatus === 'Y' && r.mustGooodsStatus === true && subject.subjectGooodsStatus === 'Y') {
                                singlePrice = r.repeatFee;
                            }
                        });
                    }

                    let r2 = r1.subjectList[0];
                    subjectList.push({
                        newClassId: r1.newClassId,
                        oriClassFee: singlePrice,
                        oriClassFeeType: r.repeatFeeWay === 1 ? 'S' : 'T',
                        oriClassId: r.oriClassId,
                        oriClassType: r.subjectNature,
                        oriClassTypeId: this.oldclasstypeIdMap[r.oriClassId] ? this.oldclasstypeIdMap[r.oriClassId] : '',
                        oriServContent: r.oriServContent,
                        requiredGoods: r1.gooodsStatus === 'Y' ? (r2.gooodsStatus === 'Y' ? 'Y' : 'N') : '',
                        subjectId: r1.subjectId,
                    });
                });
            });
            let params = {
                // userId: this.userInfo.userId,
                // studentId: this.userInfo.userId,
                settingId: this.settingId,
                scoreQueryPwd: item.scoreQueryPwd,
                scoreQueryAccount: item.scoreQueryAccount,
                scoreImageUrl: item.scoreImageUrl,
                projectId: this.projectId,
                oriOrderType: this.orderInfo.oriOrderType,
                oriOrderNo: this.orderInfo.oriOrderNo,
                oriOrderId: this.orderInfo.oriOrderId,
                feeTotal: this.sumPrice,
                examYear: this.oriData.courseList[0].examservYear,
                examCap: this.oriData.courseList[0].examservSeq,
                examAreacode: this.examAreacode,
                applySource: this.applySource,
                applyType: this.applyType,
                classAddVos: subjectList,
            };
            console.log(params, 'params');
            // loading.close();
            this.$callApi('selfLearn/add-self-learn-apply', {
                ...params,
                onsuccess: (res) => {
                    loading.close();
                    if (this.sumPrice === 0) {
                        this.$router.replace('/uc/manager/apply/success');
                    } else {
                        this.$callApi('uc/create-payment-address', {
                            sceneCode: 'PC', //场景编码	String	否				运营中心：使用固定值MP；网站根据实际情况选择
                            tradeClientCode: this.$nuxt.context.env.config.tradeclientCode, //客户端编码	String	否				运营中心：使用固定值OP;网站根据实际情况选择
                            orderNo: res.orderNo, //订单编号	String	否
                            tradeRecordFrontUrl: location.origin + '/uc/manager/apply',
                            onsuccess: (res) => {
                                if (res.cashUrl.indexOf('?') > -1) {
                                    res.cashUrl += '&type=selfLearn';
                                } else {
                                    res.cashUrl += '?type=selfLearn';
                                }
                                window.location.href = res.cashUrl;
                            },
                        });
                    }
                },
                onerror: (err) => {
                    loading.close();
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
    },
};
</script>
