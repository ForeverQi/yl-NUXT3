<template>
    <div>
        <module-title title="我的申请" />
        <div class="content-wrap">
            <!-- 申请进度步骤条 -->
            <div class="progress-box">
                <!-- 申请 -->
                <div class="step-item complete">
                    <div class="step-name">提交申请</div>
                </div>
                <div class="progress-bar complete"></div>
                <!-- 支付 -->
                <div class="step-item" :class="{ ing: applyData.payStatus === 'wait', complete: applyData.payStatus !== 'wait' }">
                    <div v-if="applyData.payStatus === 'wait'" class="step-name">待支付</div>
                    <div v-else-if="applyData.payStatus === 'success'" class="step-name">已支付</div>
                    <div v-else-if="applyData.payStatus === 'noNeed'" class="step-name">无需支付</div>
                </div>
                <div class="progress-bar" :class="{ complete: applyData.payStatus !== 'wait' }"></div>
                <!-- 审核 -->
                <div
                    class="step-item"
                    :class="{
                        ing: applyData.payStatus !== 'wait' && applyData.approvalResult === 'wait',
                        complete: applyData.approvalResult === 'success',
                        'reject-status': applyData.approvalResult === 'reject',
                    }"
                >
                    <div v-if="applyData.approvalResult === 'success'" class="step-name">审核通过</div>
                    <div v-else-if="applyData.approvalResult === 'reject'" class="step-name">已驳回</div>
                    <div v-else-if="applyData.approvalResult === 'wait'" class="step-name">审核中</div>
                    <div v-else class="step-name">审核</div>
                </div>
                <div
                    class="progress-bar"
                    :class="{
                        complete: checkApprovalProgress,
                    }"
                ></div>
                <!-- 暂时没有开课状态，展示退款状态 -->
                <template v-if="checkApprovalProgress && applyData.approvalResult === 'reject'">
                    <div
                        class="step-item"
                        :class="{
                            ing: applyData.refundStatus === 'wait',
                            complete: applyData.refundStatus === 'noNeed' || applyData.refundStatus === 'success',
                        }"
                    >
                        <div v-if="applyData.refundStatus === 'wait'" class="step-name">退款中</div>
                        <div v-else-if="applyData.refundStatus === 'success'" class="step-name">已退款</div>
                        <div v-else-if="applyData.refundStatus === 'noNeed'" class="step-name">无需退款</div>
                    </div>
                    <div class="progress-bar" :class="{ complete: applyData.refundStatus === 'noNeed' || applyData.refundStatus === 'success' }"></div>
                </template>
                <div class="step-item" :class="{ complete: checkFinish }">
                    <div class="step-name">办理完成</div>
                </div>
            </div>
            <!-- 内容区块 -->
            <div class="detail-wrap">
                <div class="info">
                    <div class="item">
                        <span class="label">学员姓名：</span>
                        {{ applyData.userName }}
                    </div>
                    <div class="item">
                        <span class="label">优路号：</span>
                        {{ applyData.userYoulunum }}
                    </div>
                    <div class="item">
                        <span class="label">报班项目：</span>
                        {{ projectName }}
                    </div>
                </div>
                <!-- 班级列表 -->
                <apply-table-content :data-list="classList" />
                <!-- 成绩信息 -->
                <div class="apply-input-content">
                    <apply-input-content :form-data="applyData" type="show" :setting-info="oriIntro" />
                </div>
            </div>
            <!-- 底部提交区块 -->
            <div class="bottom-wrap">
                <div class="msg-box">
                    <div class="items">订单编号：{{ applyData.newOrderNo }}</div>
                    <div class="items">
                        续学服务费：
                        <span class="c-red">¥{{ (applyData.feeTotal / 100).toFixed(2) }}元</span>
                    </div>
                    <div class="items">
                        支付状态：
                        <template v-if="applyData.payStatus === 'success'">已支付</template>
                        <template v-else-if="applyData.payStatus === 'wait'">待支付</template>
                        <template v-else>无需支付</template>
                    </div>
                </div>
                <div class="reject" v-if="applyData.approvalResult === 'reject'">驳回原因：{{ dialogContent }}</div>
                <div class="buttons-wrap">
                    <div class="link-btn" @click="$router.replace('/uc/manager/apply')">返回</div>
                    <nuxt-link v-if="checkAlter" :to="{ name: 'editSelfLearn', params: { applyData: applyData } }" class="link-btn">修改</nuxt-link>
                    <button v-if="applyData.payStatus === 'wait'" class="link-btn edit" @click="clickPay(applyData)">去支付</button>
                    <button v-if="applyData.approvalResult === 'success' && applyData.approvalNode === 'recheck'" class="link-btn edit" @click="toCourse">
                        开始学习
                    </button>
                </div>
            </div>
        </div>
        <template v-if="isShowDialog">
            <alert-dialog :title="dialogTitle" @do-close="isShowDialog = false" :content="dialogContent" :show="true">
                <div class="content">{{ dialogContent }}</div>
            </alert-dialog>
        </template>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import '@/api/selfLearn/api..query-apply-info.js';
import '@/api/selfLearn/api.self-learn-002.query-class-info.js';
import '@/api/selfLearn/api..query-self-learn-apply-intro.js';
import '@/api/selfLearn/api..query-apply-audit-info.js';
import '@/api/selfLearn/api..apply-order-check.js';

import ModuleTitle from '../components/module-title.vue';
import ApplyInputContent from '@/www/components/order/components/applyInputContent';
import ApplyTableContent from '@/www/components/order/components/applyTableContent';
import AlertDialog from '@/www/components/order/components/applyAlert';

export default {
    components: {
        ApplyInputContent,
        ApplyTableContent,
        ModuleTitle,
        AlertDialog,
    },
    data() {
        return {
            classData: [], // 班级列表
            applyData: {
                // 从列表那获取的申请单详情信息
                applyId: '',
                refuseReason: '',
                approvalReason: '',
            },
            classList: [],

            oriIntro: {},

            rejectMap: {
                SU: '成绩截图不清晰',
                IU: '身份证照片不清晰',
                SM: '考试成绩无法查询',
                CM: '不符合续学标准',
                0: '其他',
            },
            userInfo: {},
            projectName: '',
            dialogContent: '',
            isShowDialog: false,
        };
    },
    computed: {
        checkAlter() {
            // 是否展示修改按钮
            const check1 = this.applyData.approvalResult === 'reject' && this.applyData.refuseType === 'UM';
            const check2 = this.applyData.payStatus === 'wait';
            const check3 = this.applyData.approvalNode === 'first' || this.applyData.approvalNode === '';
            return check1 || (check3 && this.applyData.approvalResult === 'wait') || check2;
        },
        checkApprovalProgress() {
            // 审核状态 是否完成
            // 审核成功 进入下一步展示
            const check1 = this.applyData.approvalResult === 'success';
            // 驳回
            let check2 = this.applyData.approvalResult === 'reject';
            // 驳回-退款重新申请，驳回-退款不可重新申请进入下一步展示
            check2 = check2 && (this.applyData.refuseType === 'RA' || this.applyData.refuseType === 'RU');
            return check1 || check2;
        },
        checkFinish() {
            // 复审通过审核完成
            const check1 = this.applyData.approvalResult === 'success' && this.applyData.approvalNode === 'recheck';
            // 审核驳回
            let check2 = this.applyData.approvalResult === 'reject';
            // 驳回-退款重新申请，驳回-退款不可重新申请 审核结束
            check2 = check2 && (this.applyData.refuseType === 'RA' || this.applyData.refuseType === 'RU');
            check2 = check2 && (this.applyData.refundStatus === 'success' || this.applyData.refundStatus === 'noNeed');
            return check1 || check2;
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
            if (!this.$route.params.applyData) {
                this.$router.replace('/uc/manager/apply');
                return;
            }
            this.applyData = this.$route.params.applyData;
            // this.applyData.scoreQueryPwd = this.applyData.scoreQueryPwd_secret;
            this.applyData.scoreQueryPwd = this.applyData.scoreQueryPwd ? '********' : '';
            this.projectName = this.applyData.projectName;
            if (this.applyData.approvalResult === 'reject') {
                this.getRejectInfo();
            }
            this.getSettingInfo().then(() => {
                this.getData();
            });
        },
        getRejectInfo() {
            this.$callApi('selfLearn/query-apply-audit-info', {
                // 申请单标识
                applyId: this.applyData.applyId,
                onsuccess: (data) => {
                    this.dialogTitle = '驳回原因';
                    if (Array.isArray(data) && data.length > 0) {
                        let item = {};
                        let t = 0;
                        data.forEach((r) => {
                            let t2 = dayjs(r.approvalCreateDate).unix();
                            if (t2 > t) {
                                item = r;
                                t = t2;
                            }
                        });
                        if (item.refuseReason === 'O') {
                            this.dialogContent = item.approvalReason;
                        } else {
                            this.dialogContent = this.rejectMap[item.refuseReason];
                        }
                    }
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        getSettingInfo() {
            // 获取配置信息
            let params = {
                settingId: this.applyData.settingId,
            };
            return this.$callApi('selfLearn/query-self-learn-apply-intro', {
                ...params,
            })
                .then((res) => {
                    this.oriIntro = res.getData();
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                });
        },
        getData() {
            this.$callApi('selfLearn/query-apply-info', {
                applyId: this.applyData.applyId,
                onsuccess: (res) => {
                    this.classList = res.map((r) => {
                        r.className = r.oriClassName;
                        return r;
                    });
                    // 获取协议服务
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
                            let check = '';
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
                },
                onerror(err) {
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
                            onerror: niceloo.api.handleFailure,
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
        toCourse() {
            this.$PageUtil.href('/learningCenter/index/myCourse');
        },
    },
};
</script>

<style lang="less" scoped src="./index.less"></style>
