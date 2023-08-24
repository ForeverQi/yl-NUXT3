<template>
    <div class="change-password-wrap">
        <tab :data="tabArray" :active-index="activeIndex" @select="selectTab"></tab>
        <div class="table-details">
            <div class="input-password">
                <span class="item-class">原始密码：</span>
                <div class="input-wrapper">
                    <input class="iitem-input" :type="types[0].pwdType" v-model="oldPassword" />
                    <i class="eye" :class="types[0].pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus(0)"></i>
                </div>
            </div>
            <div class="input-password">
                <span class="item-class">&emsp;新密码：</span>
                <div class="input-wrapper">
                    <input class="iitem-input" :type="types[1].pwdType" v-model="newPassword" />
                    <i class="eye" :class="types[1].pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus(1)"></i>
                </div>
            </div>
            <div class="input-password">
                <span class="item-class">确认密码：</span>
                <div class="input-wrapper">
                    <input class="iitem-input" :type="types[2].pwdType" v-model="confirmPassword" />
                    <i class="eye" :class="types[2].pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus(2)"></i>
                </div>
            </div>
            <input type="button" class="submit" @click="editPassword()" value="提交" />
        </div>
        <maskConfirm v-if="isShowDialog" :title="'提示'" :content="tipMessage" :confirm-text="'确定'" @ok="closeDialog"></maskConfirm>
    </div>
</template>
<script>
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import '@/api/uc/api.UC0006.edit-password.js';
import { tabData } from './js/data.js';
import Tab from '@/www/components/tab/tabX';
import maskConfirm from '@/www/components/personalCenter/maskConfirm/maskConfirm';
export default {
    components: {
        Tab,
        maskConfirm,
    },
    data() {
        return {
            tabArray: tabData, // tab数据
            activeIndex: 1, // 选中tab的索引
            oldPassword: '', // 原密码
            newPassword: '', // 新密码
            confirmPassword: '', // 二次确认的密码
            isShowDialog: false, // 是否展示弹窗
            tipMessage: '', // 提示消息
            types: [{ pwdType: 'password' }, { pwdType: 'password' }, { pwdType: 'password' }],
        };
    },
    head() {
        return this.$head({
            title: '个人中心_账号管理_点亮职业人生_优路教育',
            meta: [],
        });
    },
    methods: {
        //tab切换
        selectTab(index) {
            if (index === 0) {
                this.$router.replace({
                    path: `/uc/manager/personalCenter/personalInfo`,
                });
            }
        },
        //切换密码显示隐藏
        switchPwdStatus(number) {
            if (this.types[number].pwdType == 'password') {
                this.types[number].pwdType = 'text';
            } else {
                this.types[number].pwdType = 'password';
            }
        },
        //修改密码
        editPassword() {
            if (this.confirmPassword != this.newPassword) {
                this.tipMessage = '两次输入的新密码不一致！';
                this.showDialog();
                return;
            }
            if (this.oldPassword.trim().length == 0 || this.newPassword.trim().length == 0 || this.confirmPassword.trim().length == 0) {
                this.tipMessage = '密码不能为空！';
                this.showDialog();
                return;
            }
            if (
                !/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(this.newPassword.trim()) ||
                !/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(this.confirmPassword.trim())
            ) {
                this.tipMessage = '密码格式为8-20位，包含字母、数字、特殊符号的两种及以上组合！';
                this.showDialog();
                return;
            }
            niceloo.api.call('uc/edit-password', {
                userLoginpwd: this.oldPassword,
                userLoginpwd_new: this.newPassword,
                onsuccess: () => {
                    this.tipMessage = '密码修改成功！';
                    this.$User.removeLoginInfo();
                    this.showDialog();
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        showDialog() {
            this.isShowDialog = true;
        },
        closeDialog() {
            // 修改密码成功需要跳转登陆页面
            if (this.tipMessage === '密码修改成功！') {
                this.$User.toLogin(); // 修改成功,调转志登录页面
            }
            this.tipMessage = '';
            this.isShowDialog = false;
        },
    },
};
</script>
<style lang="less" scoped>
.change-password-wrap {
    .table-details {
        background: #fff;
        padding: 40px 0;
    }
    .input-password + .input-password {
        margin-top: 15px;
    }
    .input-password {
        position: relative;
        margin-left: 200px;
        display: flex;
        align-items: center;
        margin: 0 auto;
        justify-content: center;

        .item-class {
            text-align: right;
            font-size: 14px;
            color: #53586c;
        }

        .input-wrapper {
            background-color: #f4f5f8;
            // border: 1px solid #dcdcdc;
            border-radius: 8px;
            overflow: hidden;
            padding-right: 16px;
        }
        .iitem-input {
            width: 240px;
            padding: 13.5px 16px;
            outline: none;
            font-size: 14px;
            margin-left: 12px;
            color: #3a3d4b;
            background-color: transparent;
        }
        i {
            vertical-align: middle;
            width: 20px;
            height: 20px;
            display: inline-block;
            background: url('./asset/images/nl_icon2.png') no-repeat;
        }
        i.password {
            background-position: -20px -20px;
        }
        i.eye {
            background-position: -40px -20px;
            cursor: pointer;
            display: none \9;
        }
        i.eye.open {
            background-position: 0 0;
            background-size: contain !important;
            background: url('./asset/images/detail.png') no-repeat;
            cursor: pointer;
            display: none \9;
        }
    }
    .submit {
        text-align: center;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        border-radius: 8px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        margin: 40px auto 10px;
        display: block;
        padding: 9px 50px;
    }
}
</style>
