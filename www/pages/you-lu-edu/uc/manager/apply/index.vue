<template>
    <div>
        <module-title title="我的申请" />
        <div class="wrap-box">
            <orderNull v-if="!tableList.length" words="您还没有续学申请"></orderNull>
            <div v-else class="content-box">
                <table class="content-table">
                    <tr>
                        <th width="170" class="text-left">申请编号</th>
                        <th width="96">申请类型</th>
                        <th width="190">申请时间</th>
                        <th width="100">状态</th>
                        <th class="text-left">操作</th>
                    </tr>
                    <tbody>
                        <tr v-for="item in tableList" :key="item.applyId">
                            <td class="text-left">{{ item.applyNo }}</td>
                            <td class="c-gray">续学</td>
                            <td>{{ item.applyDate }}</td>
                            <td>
                                <span v-if="item.payStatus === 'wait'">待支付</span>
                                <span v-else-if="item.approvalResult === 'wait'">审核中</span>
                                <span v-else-if="item.approvalResult === 'reject'" class="refuse-txt">
                                    已驳回
                                    <img src="./images/question-ico.png" alt="疑问" class="ico-img" @click="clickRejectIco(item)" />
                                </span>
                                <span v-else>办理完成</span>
                            </td>
                            <td class="text-left">
                                <nuxt-link :to="{ name: 'uc-manager-apply-detail', params: { applyData: item } }" class="link-btn">查看</nuxt-link>
                                <nuxt-link
                                    v-if="item.approvalResult === 'reject' && item.refuseType === 'UM'"
                                    :to="{ name: 'editSelfLearn', params: { applyData: item } }"
                                    class="link-btn"
                                >
                                    修改
                                </nuxt-link>
                                <button v-if="item.payStatus === 'wait'" class="link-btn" @click="clickPay(item)">去支付</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <user-el-pagination
                    :total="page.pageCount"
                    :page-size="page.pageSize"
                    :current-page="page.pageIndex"
                    @size-change="sizeChange"
                    @current-change="currentChange"
                />
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
import '@/api/selfLearn/api..query-apply-list.js';
import '@/api/selfLearn/api..query-apply-audit-info.js';
import '@/api/selfLearn/api..apply-order-check.js';

import niceloo from '@youlu/niceloo/libs/@xlib.01/index';

import ModuleTitle from './components/module-title.vue';
import OrderNull from '@/www/components/uc/manager/myCourse/orderNull';
import UserElPagination from '@/www/components/pagination/userElPagination';
import AlertDialog from '@/www/components/order/components/applyAlert';
import '@/api/uc/api.OC2006.create-payment-address.js';

export default {
    components: {
        OrderNull,
        UserElPagination,
        AlertDialog,
        ModuleTitle,
    },
    data() {
        return {
            isShowDialog: false, // 是否展示提示弹窗
            dialogTitle: '', // 提示弹窗的标题
            dialogContent: '', // 提示弹窗的内容
            tableList: [], // 表格数据
            // 默认分页信息
            page: {
                pageIndex: 1,
                pageSize: 10,
                pageCount: 0,
            },

            rejectMap: {
                SU: '成绩截图不清晰',
                IU: '身份证照片不清晰',
                SM: '考试成绩无法查询',
                CM: '不符合续学标准',
                0: '其他',
            },
        };
    },
    head() {
        return this.$head({
            title: '个人中心_我的申请_点亮职业人生_优路教育',
            meta: [],
        });
    },
    computed: {
        query() {
            return this.$route.query;
        },
    },
    watch: {
        // 只是路由参数改变时(翻页)，组件不会重新生成，监听获取新数据
        '$route.query': {
            handler(query) {
                if (!query.pageSize || !query.pageIndex) {
                    this.$router.replace({ query: { ...this.query, pageIndex: this.page.pageIndex, pageSize: this.page.pageSize } });
                } else {
                    this.queryListData();
                }
            },
            immediate: true,
        },
    },
    methods: {
        // 更新表格数据
        async queryListData() {
            let { pageSize, pageIndex } = this.query;
            pageSize = Number(pageSize);
            pageIndex = Number(pageIndex);
            let user = {};
            try {
                user = await this.$User.getUser();
            } catch (err) {
                console.log(err);
                user = {};
            }

            niceloo.api.call('selfLearn/query-apply-list', {
                userId: user.userId,
                isAuth: 'N',
                orderVal: 'N',
                // 分页下标
                pageIndex: pageSize * (pageIndex - 1),
                // 每页数量
                pageSize,
                onsuccess: ({ count, data }) => {
                    this.tableList = data;
                    this.page.pageCount = count;
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        sizeChange(pageSize) {
            this.$router.push({ query: { ...this.query, pageIndex: 1, pageSize } });
        },
        currentChange(pageIndex) {
            this.$router.push({ query: { ...this.query, pageIndex } });
        },
        // 查看驳回详情
        clickRejectIco({ applyId }) {
            this.$callApi('selfLearn/query-apply-audit-info', {
                // 申请单标识
                applyId,
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
                        this.isShowDialog = true;
                    }
                },
                onerror: niceloo.api.handleFailure,
                oncomplete: () => {},
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
    },
};
</script>

<style lang="less" scoped src="./index.less"></style>
<style lang="less" scoped>
.wrap-box {
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    table,
    tbody,
    th,
    td {
        border: 0;
        font-weight: normal;
    }
}
</style>
