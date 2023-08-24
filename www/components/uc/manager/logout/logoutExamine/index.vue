<template>
    <div v-if="auditStatus">
        <tab :data="tabArray" :active-index="activeIndex" @select="selectTab" />
        <div class="wrap">
            <div class="exa-header">
                <steps :steps-data="stepsData" :current-index="currentIndex" />
            </div>
            <tips :audit-status="auditStatus" @cancel-logout="cancelLogout" />
        </div>
        <vb-mask :show="isMaskShow">
            <remind @proceed="proceed" @confirm="confirm" />
        </vb-mask>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

import steps from './components/steps/index.vue';
import tips from './components/tips/index.vue';
import remind from './components/remind/index.vue';
import { tabData } from './js/data.js';
import vbMask from '@/www/components/vbMask/index.vue';
import tab from '@/www/components/tab/tabX/index.vue';
export default {
    components: {
        steps,
        tips,
        vbMask,
        tab,
        remind,
    },
    data() {
        return {
            tabArray: tabData, // tab按钮
            activeIndex: 0, // 选中的tab
            isMaskShow: false,
            userInfo: {},
            stepsData: [],
            currentIndex: NaN, // 当前选中的步骤条
            auditStatus: '', // 注销状态
        };
    },
    async mounted() {
        if (this.$User.getToken()) {
            this.userInfo = await this.$User.getUser();
            this.getLogoutStatus(this.userInfo.userId);
        }
    },
    methods: {
        ...mapMutations('logout', ['setUserInfo']),
        getLogoutStatus(userId) {
            this.$callRawApi({
                api: 'ws/cancel/auditStatus/userId',
                params: { userId },
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((res) => {
                    console.log('通过getData返回数据');
                    return res.getData();
                })
                .then(async (res) => {
                    console.log(res);
                    this.auditStatus = res.auditStatus;
                    switch (this.auditStatus) {
                        case 'NOR': //用户没有提交过注销
                            this.stepsData = [{ title: '注销提交' }, { title: '审核中' }, { title: '注销成功' }];
                            this.currentIndex = NaN;
                            // this.currentIndex = 4;
                            break;
                        case 'PRO': //注销中
                            this.stepsData = [{ title: '注销提交' }, { title: '审核中' }, { title: '注销成功' }];
                            this.currentIndex = 2;
                            if (this.$User.getToken()) {
                                this.userInfo = await this.$User.getUser();
                                this.userInfo.userUnsubscribeStatus = 'A';
                                this.setUserInfo(this.userInfo);
                                this.$User.setUser(this.userInfo);
                            }
                            break;
                        case 'URE': //注销撤回
                            this.stepsData = [{ title: '注销提交' }, { title: '审核中' }, { title: '注销取消' }];
                            this.currentIndex = 4;
                            if (this.$User.getToken()) {
                                this.userInfo = await this.$User.getUser();
                                this.userInfo.userUnsubscribeStatus = 'N';
                                this.setUserInfo(this.userInfo);
                                this.$User.setUser(this.userInfo);
                            }
                            break;
                        case 'REJ': //注销驳回
                            this.stepsData = [{ title: '注销提交' }, { title: '审核中' }, { title: '注销取消' }];
                            this.currentIndex = 4;
                            if (this.$User.getToken()) {
                                this.userInfo = await this.$User.getUser();
                                this.userInfo.userUnsubscribeStatus = 'N';
                                this.setUserInfo(this.userInfo);
                                this.$User.setUser(this.userInfo);
                            }
                            break;
                        case 'SUC': //注销成功
                            this.stepsData = [{ title: '注销提交' }, { title: '审核中' }, { title: '注销成功' }];
                            if (this.$User.getToken()) {
                                this.userInfo = await this.$User.getUser();
                                this.userInfo.userUnsubscribeStatus = 'Y';
                                this.setUserInfo(this.userInfo);
                                this.$User.setUser(this.userInfo);
                                this.$User.removeLoginInfo();
                            }
                            break;
                    }
                });
        },
        //tab切换
        selectTab(index) {
            if (index === 0) {
                this.$router.replace({
                    path: `/uc/manager/personalCenter/personalInfo`,
                });
            } else if (index === 1) {
                this.$router.replace({
                    path: `/uc/manager/personalCenter/accountSafe`,
                });
            }
            this.isMaskShow = false;
        },
        cancelLogout() {
            this.isMaskShow = true;
        },
        proceed() {
            this.isMaskShow = false;
        },
        confirm() {
            this.$callRawApi({
                api: 'ws/cancel/revoke',
                params: {},
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    this.isMaskShow = false;
                    this.getLogoutStatus(this.userInfo.userId);
                });
        },
    },
};
</script>

<style lang="less" scoped>
.wrap {
    background: #fff;
    text-align: center;
    padding-bottom: 209px;
    margin-top: 10px;
    .exa-header {
        padding: 32px 105px 20px;
        border-bottom: 1px solid #e5e5e5;
    }
}
</style>
