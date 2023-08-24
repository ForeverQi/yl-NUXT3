<template>
    <div class="add-apply">
        <tab-list :tabs="tabs" :active-index="activeIndex" />
        <class-content :list="list" :project-name="projectName" :user-name="applyData.userName" />
        <score-upload
            :is-paid="applyData.payStatus !== 'wait'"
            :order-status="applyData.payStatus"
            :sum-price="sumPrice"
            @doSubmit="doSubmit"
            type="repeatEdit"
            :setting-info="oriIntro"
            :default-form-data="formData"
        />
        <template v-if="isShowDialog">
            <alert-dialog :title="dialogTitle" @do-close="isShowDialog = false" :content="dialogContent" :show="true">
                <div class="content">{{ dialogContent }}</div>
            </alert-dialog>
        </template>
    </div>
</template>
<script>
import TabList from '@/www/components/order/components/tabList';
import ClassContent from '@/www/components/order/applyAdd/classContent';
import ScoreUpload from '@/www/components/order/applyAdd/scoreUpload';
import AlertDialog from '@/www/components/order/components/applyAlert';
import '@/api/selfLearn/api..add-self-learn-apply.js';

import '@/api/selfLearn/api..query-apply-info.js';
import '@/api/selfLearn/api.self-learn-002.query-class-info.js';
import '@/api/selfLearn/api..edit-apply-self-learn.js';
import '@/api/selfLearn/api..query-self-learn-apply-intro.js';
import '@/api/selfLearn/api..query-score-query-pwd.js';
export default {
    components: {
        TabList,
        ClassContent,
        ScoreUpload,
        AlertDialog,
    },
    data() {
        return {
            tabs: [
                {
                    name: '续学申请编辑',
                },
            ],
            activeIndex: 0,

            applyData: {
                projectName: '',
                applyId: '',
                feeTotal: 0,
                scoreImageUrl: '',
                refuseType: '',
            },

            classList: [],

            list: [],
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
            oriIntro: {
                accountShow: '',
                accountType: '',
                pwdShow: '',
                pwdType: '',
            },
            formData: {
                scoreImageUrl: '',
                scoreQueryAccount: '',
                scoreQueryPwd: '',
            },
            dialogContent: '',
            isShowDialog: false,
        };
    },
    computed: {
        sumPrice() {
            let num = parseFloat(this.applyData.feeTotal);
            if (isNaN(num)) {
                num = 0;
            }
            return num;
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.$route.params.applyData) {
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
            this.applyData = this.$route.params.applyData;
            this.projectName = this.applyData.projectName;
            this.formData.scoreImageUrl = this.applyData.scoreImageUrl;
            this.formData.scoreQueryAccount = this.applyData.scoreQueryAccount;
            // 获取密码
            this.getQueryPWD();
            this.getSettingInfo();
            this.$User
                .getUser()
                .then((user) => {
                    this.userInfo = user;
                })
                .then(() => {
                    this.getData();
                });
        },
        getQueryPWD() {
            // 获取查询密码
            return this.$callApi('selfLearn/query-score-query-pwd', {
                applyId: this.applyData.applyId,
            }).then((res) => {
                let ret = res.getData();
                this.formData.scoreQueryPwd = ret.scoreQueryPwd;
            });
        },
        getSettingInfo() {
            // 获取配置信息
            let params = {
                settingId: this.applyData.settingId,
            };
            this.$callApi('selfLearn/query-self-learn-apply-intro', {
                ...params,
                onsuccess: (res) => {
                    this.oriIntro = res;
                },
            });
        },
        getData() {
            this.$callApi('selfLearn/query-apply-info', {
                applyId: this.applyData.applyId,
                onsuccess: (res) => {
                    // let classList = [];
                    // res.forEach((r) => {
                    //     r.newClassList.map((r2) => {
                    //         r2.oriClassName = r.oriClassName;
                    //         r2.oriClassId = r.oriClassId;
                    //         return r2;
                    //     });
                    //     classList = classList.concat(r.newClassList);
                    // });
                    // this.classList = classList.map((r) => {
                    //     r.className = r.newClassName;
                    //     r.oriServContent = '';
                    //     r.gooodsStatus = 'Y';
                    //     r.mustGooodsStatus = true;
                    //     r.subjectList = r.subjectList.map((r2) => {
                    //         r2.gooodsStatus = r2.requiredGoods;
                    //         return r2;
                    //     });
                    //     return r;
                    // });
                    this.classList = res.map((r) => {
                        r.className = r.oriClassName;
                        return r;
                    });
                    // 获取协议服务及科目单价
                    this.getClassListInfo();
                },
                onerror: (err) => {
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
        getClassListInfo() {
            let classIds = [];
            this.classList.forEach((r) => {
                classIds.push(r.oriClassId);
            });
            this.$callApi('selfLearn/query-class-info', {
                classIds: classIds.toString(),
                onsuccess: (res) => {
                    let map = {};
                    res.forEach((r) => {
                        map[r.oriClassId] = r;
                    });
                    this.classList.forEach((r) => {
                        if (map[r.oriClassId]) {
                            let check = false;
                            let isHave = false;
                            let subjectList = [];

                            r.newClassList.forEach((r2) => {
                                r2.subjectList.forEach((r3) => {
                                    r3.subjectGooodsStatus = r3.requiredGoods;
                                    r3.gooodsStatus = r3.requiredGoods;
                                    subjectList.push(r3);
                                    if (r3.requiredGoods === 'Y') {
                                        check = true;
                                    }
                                    if (r3.requiredGoods === 'Y' || r3.requiredGoods === 'N') {
                                        isHave = true;
                                    }
                                });
                            });
                            this.$set(r, 'className', r.className);
                            this.$set(r, 'oriServContent', map[r.oriClassId].oriServContent);
                            this.$set(r, 'subjectList', subjectList);
                            this.$set(r, 'mustGooodsStatus', isHave === true ? !!check : null);
                        }
                    });
                    this.list = this.classList;
                },
                onerror(err) {
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
        doSubmit(item) {
            if (!item.scoreImageUrl) {
                this.$baseUI.alert('成绩截图不能为空！');
                return;
            }
            if (this.oriIntro.accountShow === 'Y' && this.oriIntro.accountType === 'Y' && !item.scoreQueryAccount) {
                this.$baseUI.alert('成绩查询账号不能为空！');
                return;
            }
            if (this.oriIntro.pwdShow === 'Y' && this.oriIntro.pwdType === 'Y' && !item.scoreQueryPwd) {
                this.$baseUI.alert('成绩查询密码不能为空！');
                return;
            }
            let params = {
                applyId: this.applyData.applyId,
                scoreQueryPwd: item.scoreQueryPwd,
                scoreQueryAccount: item.scoreQueryAccount,
                scoreImageUrl: item.scoreImageUrl,
            };
            const loading = this.$baseUI.loading();
            this.$callApi('selfLearn/edit-apply-self-learn', {
                ...params,
                onsuccess: (res) => {
                    console.log(res, '00000');
                    loading.close();
                    if (this.applyData.payStatus !== 'wait') {
                        this.$router.replace('/uc/manager/apply/success');
                    } else {
                        this.clickPay(this.applyData);
                    }
                },
                onerror: (err) => {
                    loading.close();
                    this.$niceloo.api.handleFailure(err);
                },
            });
        },
        // 点击去支付
        clickPay({ applyId }) {
            niceloo.api.call('selfLearn/apply-order-check', {
                // 申请标识
                applyId,
                onsuccess: (data) => {
                    if (data.orderNo) {
                        this.$callApi('uc/create-payment-address', {
                            sceneCode: 'PC', //场景编码	String	否				运营中心：使用固定值MP；网站根据实际情况选择
                            tradeClientCode: this.$nuxt.context.env.config.tradeclientCode, //客户端编码	String	否				运营中心：使用固定值OP;网站根据实际情况选择
                            orderNo: data.orderNo, //订单编号	String	否
                            // orderNo: 'CD2022040817203041103074', //订单编号	String	否
                            tradeRecordFrontUrl: location.origin + '/uc/manager/apply',
                            onsuccess: (res) => {
                                if (res.cashUrl.indexOf('?') > -1) {
                                    res.cashUrl += '&type=selfLearn';
                                } else {
                                    res.cashUrl += '?type=selfLearn';
                                }
                                this.$PageUtil.href(res.cashUrl);
                            },
                        });
                        return;
                    }
                    this.dialogTitle = '提示';
                    this.dialogContent = '申请单中的班级已通过后台办理续学，请联系服务老师处理。';
                    this.isShowDialog = true;
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
    },
};
</script>
<style lang="less" scoped>
.content {
    word-break: break-all;
}
</style>
