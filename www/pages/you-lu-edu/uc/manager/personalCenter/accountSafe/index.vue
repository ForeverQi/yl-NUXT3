<template>
    <div class="account-safe-wrap">
        <tab :data="tabArray" :active-index="activeIndex" @select="selectTab"></tab>
        <div class="account-safe-container">
            <div class="account-safe-item" v-for="(item, index) in accountSafeList" :key="index">
                <AccountItem
                    :type="item.type"
                    :title="item.title"
                    :describe="item.describe"
                    :button-text="item.buttonText"
                    @sure="handleClick"
                    :key="item.type"
                ></AccountItem>
            </div>
        </div>
        <ChangePassWordDialog ref="changePassWordDialog" v-show="isShowChangePasswordDialog" @cancel="handleCloseChangePassword" />
        <CancelBindWxTipDialog v-if="isShowCancelBindWxTipDialog" @cancel="handleCloseCancelBindWxTipDialog" @sure="handleSureCancelBindWxTip" />
        <CancelBindWxDialog v-show="isShowCancelBindWxDialog" @cancel="handleCloseCancelBindWxDialog" />
    </div>
</template>
<script>
import { tabData, accountSafeList } from './js/data.js';
import Tab from '@/www/components/tab/tabX/index.vue';
import AccountItem from '@/www/components/account-safe/account-item.vue';
import ChangePassWordDialog from '@/www/components/account-safe/change-pass-word-dialog/index.vue';
import CancelBindWxDialog from '@/www/components/account-safe/cancel-bind-wx-dialog.vue';
import CancelBindWxTipDialog from '@/www/components/account-safe/cancel-bind-wx-tip-dialog.vue';
import loginRegisterTrack from '@/plugins/yiguan/login-register-track.js';

export default {
    components: {
        Tab,
        AccountItem,
        ChangePassWordDialog,
        CancelBindWxDialog,
        CancelBindWxTipDialog,
    },
    data() {
        return {
            tabArray: tabData,
            activeIndex: 1, // 选中tab的索引
            accountSafeList: [],
            isShowChangePasswordDialog: false,
            isShowCancelBindWxDialog: false,
            isShowCancelBindWxTipDialog: false,
            isShowCancelAccountDialog: false,
            userInfo: {},
        };
    },
    head() {
        return this.$head({
            title: '个人中心_账号安全_点亮职业人生_优路教育',
            meta: [],
        });
    },
    mounted() {
        this.initAccountList();
    },
    methods: {
        ...loginRegisterTrack,
        async initAccountList() {
            let isBind = await ylPlugin.login.isWx3MiniprogramBoundByCurrentUser();
            if (this.$User.getToken()) {
                this.userInfo = await this.$User.getUser();
            }
            let accountList = accountSafeList;
            if (isBind) {
                accountList[1] = {
                    title: '微信绑定',
                    describe: this.userInfo.wxuserNickname ? `已绑定；绑定微信：${this.userInfo.wxuserNickname}` : '已绑定',
                    buttonText: '微信解绑',
                    type: 'cancelBind',
                };
            }
            this.accountSafeList = accountList;
        },
        //tab切换
        selectTab(index) {
            if (index === 0) {
                this.$router.replace({
                    path: `/uc/manager/personalCenter/personalInfo`,
                });
            }
        },
        handleClick(type) {
            const typeToMethodsMap = new Map([
                ['change', this.showChangePasswordDialog],
                ['bind', this.showBindWxDialog],
                ['cancelBind', this.showCancelBindWxTipDialog],
                ['cancel', this.cancelAccount],
            ]);
            typeToMethodsMap.get(type)();
        },
        // 关闭修改密码弹窗
        handleCloseChangePassword() {
            this.isShowChangePasswordDialog = false;
            this.$refs.changePassWordDialog.init();
        },
        // 打开修改密码弹窗
        showChangePasswordDialog() {
            this.isShowChangePasswordDialog = true;
        },
        // 打开解除绑定微信提示弹窗
        showCancelBindWxTipDialog() {
            this.trackUserClickCancelBindWxMiniprograme();
            this.isShowCancelBindWxTipDialog = true;
        },
        // 关闭解除绑定微信提示弹窗
        handleCloseCancelBindWxTipDialog() {
            this.isShowCancelBindWxTipDialog = false;
        },
        // 打开解除绑定微信弹窗
        handleSureCancelBindWxTip() {
            this.handleCloseCancelBindWxTipDialog();
            this.isShowCancelBindWxDialog = true;
        },
        // 关闭解除绑定微信弹窗
        handleCloseCancelBindWxDialog() {
            this.isShowCancelBindWxDialog = false;
        },
        // 注销账号
        cancelAccount() {
            this.$router.push({
                path: '/uc/manager/personalCenter/logoutConfirm',
            });
        },
        showBindWxDialog() {
            this.trackUserClickBindWxMiniprograme();
            ylPlugin.login.tipBindWx3MiniprogramIfNeeded({
                onstatechange: (state) => {
                    console.log(state);
                    if (state.isBound) {
                        this.$Message.success('绑定成功');
                        this.trackWxMiniprogrameBind('个人中心-账号安全-微信绑定');
                        location.reload();
                    }
                    if (state.isQRCodeScanned) {
                        this.trackMiniprogrameBindScan('个人中心-账号安全-微信绑定');
                    }
                    if (state.isBound === 'fail') {
                        this.trackWxMiniprogrameBind('个人中心-账号安全-微信绑定', false);
                    }
                },
            });
        },
    },
};
</script>
<style lang="less" scoped>
.account-safe-wrap {
    .table-details {
        background: #fff;
        padding: 40px 0;
    }
    .account-safe-container {
        padding: 32px 111px 0px 38px;
        .account-safe-item {
            margin-bottom: 20px;
        }
    }
}
</style>
