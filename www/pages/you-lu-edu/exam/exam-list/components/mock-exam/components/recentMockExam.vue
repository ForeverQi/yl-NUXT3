<template>
    <div v-loading="loading" loading-background="#fff" class="recent-mock-exam">
        <div v-if="list.length">
            <div v-for="(item, index) in list" :key="index" class="recent-item">
                <div class="recent-info">
                    <p class="recent-title">{{ item.paperName }}</p>
                    <p v-if="item.examSign === 'Y'" class="recent-info-text">{{ `报名时间：${formatApplyTime(item)}` }}</p>
                    <p v-else class="recent-info-text">免报名</p>
                    <p class="recent-info-text">{{ `考试时间：${formatExamTime(item)}` }}</p>
                </div>
                <div class="btn-box">
                    <img v-if="item.answersheetStatus === 'E'" class="registration-img" src="../../../../assets/img/exam_end.png" alt="" />
                    <img v-if="item.answersheetStatus === 'C'" class="registration-img" src="../../../../assets/img/register_end.png" alt="" />
                    <img
                        v-if="item.answersheetStatus === 'U' && item.examApplystatus === 'Y'"
                        class="registration-img"
                        src="../../../../assets/img/registration.png"
                        alt=""
                    />
                    <!-- N:考试报名;C:报名结束;U:开始考试;A:查看成绩;E:考试结束;G:继续考试； -->
                    <div v-if="item.answersheetStatus === 'N'" class="btn registration" @click="examOperation(item)">立即报名</div>
                    <div v-if="item.answersheetStatus === 'U'" class="btn enter" @click="examOperation(item, 'enter')">进入考场</div>
                    <div v-if="item.answersheetStatus === 'G'" class="btn continue" @click="examOperation(item)">继续考试</div>
                    <div v-if="item.answersheetStatus === 'A'" class="btn view" @click="examOperation(item)">查看成绩</div>
                </div>
            </div>
            <Pagination class="pagination" :page-size="page.pageSize" :current-page="page.pageIndex" :total="page.total" @current-change="pageChange" />
        </div>
        <Empty v-else />
    </div>
</template>

<script>
import '@/api/qb/api.QB0003.query-paper-profile-list.js';
import '@/api/qb/api.QB0026.query-exam-operation-check.js';
import '@/api/qb/api.QB0008.query-examapply-apply.js';
import Empty from '../../empty';
import mix from '../../mixins/index.js';
import Pagination from '@/www/components/components/pagination';
import track from '@/www/components/course/trial-course/js/track.js';

export default {
    components: {
        Empty,
        Pagination,
    },
    mixins: [mix, track],
    props: {
        weekMap: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            loading: false,
            classUniquecode: '',
            subjectId: '',
            systemTime: '', // 服务器时间
            list: [],
            page: {
                pageSize: 8,
                pageIndex: 1,
                total: 0,
            },
        };
    },
    computed: {
        formatApplyTime() {
            return (item) => `${item.examApplybegindate.replace(/-/g, '/').slice(0, -3)} -${item.examApplyenddate.replace(/-/g, '/').slice(0, -3)}`;
        },
        formatExamTime() {
            return (item) =>
                `${item.examBegindate.slice(0, -8)} ${this.weekMap[new Date(item.examBegindate.replace(/-/g, '/')).getDay()]} ${item.examBegindate.slice(
                    -8,
                    -3
                )}- ${item.examEnddate.slice(11, -3)}`;
        },
        countApplyTime() {
            return (item) => this.transformTime(new Date(item.examApplybegindate) - new Date());
        },
    },
    watch: {
        '$route.params.subjectId'() {
            this.$nextTick(() => {
                this.subjectId = this.$route.params.subjectId;
                this.page = this.$options.data().page;
                this.getData();
            });
        },
        '$store.state.common.userLogin.popUpLogin'() {
            this.getData();
        },
    },
    mounted() {
        this.classUniquecode = this.$route.params.classUniquecode;
        this.subjectId = this.$route.params.subjectId;
        this.getData();
    },
    methods: {
        transformTime(time) {
            let date = parseInt(time / (1000 * 60 * 60 * 24));
            let hour = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minute = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
            return `${date}天${hour}小时${minute}分钟`;
        },
        // 分页器事件
        pageChange(pageIndex) {
            this.page.pageIndex = pageIndex;
            this.getData();
        },
        // 考试操作校验
        async examOperation(item, tag) {
            console.warn(item);
            var isLoagin = await this.getLoaginStatus(item);
            if (isLoagin) {
                if (tag === 'enter') {
                    const { projectId = '' } = this.$storage.get('examProject') || {};
                    this.trackWebYouluTestPaper({
                        paper_name: item.paperName,
                        project_position: projectId,
                        subject_name: item.subjectId,
                        channe_name: '模拟考试',
                        user_type: '流量订单用户',
                    });
                }
                niceloo.api.call('qb/query-exam-operation-check', {
                    paperId: item.paperId,
                    sourceType: $nuxt.context.env.config.sourceType,
                    operationType: item.answersheetStatus === 'N' ? 'A' : 'E',
                    onsuccess: (res) => {
                        console.log(res);
                        let status = res.checkStatus;
                        switch (item.answersheetStatus) {
                            case 'N':
                                this.registerExam(item, status);
                                break;
                            case 'U':
                            case 'G':
                                this.startExam(item, status);
                                break;
                            case 'A':
                                this.lookScore(item);
                                break;
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            }
        },
        // 报名考试
        registerExam(item, status) {
            switch (status) {
                case 'S':
                    this.$baseUI.alert('可正常进行考试哦', '无需报名');
                    break;
                case 'N':
                    this.$baseUI.alert(`距离报名开始还有${this.countApplyTime(item)}，请耐心等待哦~`, '报名未开始');
                    break;
                case 'C':
                    this.$baseUI.alert('下次一定要注意时间哦', '报名已结束');
                    break;
                case 'P':
                    this.$baseUI.alert('暂无权限,可联系您的老师确认哦', '无权限考试');
                    break;
                case 'O':
                    niceloo.api.call('qb/query-examapply-apply', {
                        paperId: item.paperId,
                        sourceType: $nuxt.context.env.config.sourceType,
                        onsuccess: (res) => {
                            console.log(res);
                            this.$baseUI.alert(`考试时间：${this.formatExamTime(item).slice(0, -7)}，请准时参加考试`, '报名成功');
                            this.getData();
                        },
                        onerror: this.$niceloo.api.handleFailure,
                        oncomplete: () => {},
                    });
                    break;
            }
        },
        // 继续考试、开始考试
        startExam(item, status) {
            switch (status) {
                case 'U':
                    this.$baseUI.alert(`考试时间：${this.formatExamTime(item)}，请准时参加考试`, '考试未开始');
                    break;
                case 'E':
                    this.$baseUI.alert('下次一定要注意时间哦', '考试已结束');
                    break;
                case 'L':
                    this.$baseUI.alert(`您迟到了，超过${item.examRestrictingdate}分钟后不能进入考场`, '迟到了');
                    break;
                case 'P':
                    this.$baseUI.alert('暂无权限,可联系您的老师确认哦', '无权限考试');
                    break;
                case 'O':
                    var path =
                        (item.answersheetId ? '/exam/mockexam/on/' : '/exam/mockexam/notice/') + `${this.classUniquecode}/${item.subjectId}/${item.paperId}`;
                    this.$PageUtil.openNewPage(path);
                    break;
            }
        },
        // 查看成绩事件
        lookScore(item) {
            if (!item.answersheetId) {
                this.$baseUI.alert('您未进行考试，本次模考无成绩。', '无成绩');
                return;
            }
            if (+new Date() < +new Date(item.examEnddate)) {
                this.$baseUI.alert('该科考试暂未结束，考试结束才能查看解析哦。', '温馨提示', { confirmText: '我知道了' });
                return;
            }
            this.$PageUtil.openNewPage(`/exam/mockexam/resolve/${this.classUniquecode}/${item.subjectId}/${item.paperId}`);
        },
        // 获取登录状态
        getLoaginStatus(item = {}) {
            var promise = ylPlugin.login.isLogined();
            return promise.then(
                /* 过程中没有失败 */
                (isLogined) => {
                    /* eslint-disable */
                    if (!!isLogined) {
                        return true;
                    } else {
                        this.openLoagin(item);
                        return false;
                    }
                },
                (err) => {
                    /* 过程中有失败 */
                    console.error(err, '登录状态失败');
                }
            );
        },
        // 打开登录弹窗
        openLoagin(item = {}) {
            this.loginAndClue({
                originCode: this.originCodeMoKao,
                pageName: `【模拟考试】${item.paperName}`,
            }, '题库-模考');
        },
        getData() {
            this.list = [];
            this.loading = true;
            niceloo.api.call('qb/query-paper-profile-list', {
                classUniquecode: this.classUniquecode,
                papertypeCode: 'MKDS',
                subjectId: this.subjectId,
                examRestrictingplatform: 1,
                pageIndex: (this.page.pageIndex - 1) * this.page.pageSize,
                pageSize: this.page.pageSize,
                sourceType: $nuxt.context.env.config.sourceType,
                onsuccess: (res) => {
                    console.log(res);
                    this.systemTime = res.systemTime;
                    this.page.total = res.count;
                    this.list = res.data;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.recent-mock-exam {
    min-height: 500px;
    .recent-item {
        margin-bottom: 20px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 0, 0, 0.03);
        .recent-info {
            .recent-title {
                font-size: 17px;
                font-weight: 700;
                color: #3a3d4b;
                line-height: 24px;
                letter-spacing: 0.71px;
            }
            .recent-info-text {
                font-size: 14px;
                font-weight: 400;
                color: #99a1af;
                line-height: 24px;
                letter-spacing: 0.58px;
            }
        }
        .btn-box {
            display: flex;
            align-items: center;
            .registration-img {
                margin-right: 24px;
                width: 56px;
                height: 56px;
            }
            .btn {
                width: 96px;
                height: 39px;
                font-size: 14px;
                font-weight: 400;
                text-align: center;
                color: #ffffff;
                line-height: 39px;
                border-radius: 20px;
                cursor: pointer;
            }
            .registration {
                color: #ffffff;
                background: #d4151e;
            }
            .enter {
                color: #ffffff;
                background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
            }
            .continue {
                color: #ff2e30;
                background: #fff2f0;
            }
            .view {
                color: #3a3d4b;
                background: #ffffff;
                border: 1px solid rgba(0, 0, 0, 0.12);
            }
        }
        &:hover {
            .recent-title {
                color: #ff2e30;
            }
        }
    }
}
</style>
