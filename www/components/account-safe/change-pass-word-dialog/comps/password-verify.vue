<template>
    <div>
        <div class="input-password">
            <span class="item-class">&emsp;原始密码：</span>
            <div class="input-wrapper">
                <input class="iitem-input" placeholder="请输入原始密码" maxlength="20" :type="types[0].pwdType" v-model.trim="oldPassword" />
                <i class="eye" :class="types[0].pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus(0)"></i>
            </div>
        </div>
        <div class="input-password">
            <span class="item-class">设置新密码：</span>
            <div class="input-wrapper">
                <input class="iitem-input" placeholder="请输入新密码" maxlength="20" :type="types[1].pwdType" v-model.trim="newPassword" />
                <i class="eye" :class="types[1].pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus(1)"></i>
            </div>
        </div>
        <div class="input-password">
            <span class="item-class">&emsp;确认密码：</span>
            <div class="input-wrapper">
                <input class="iitem-input" placeholder="请再次确认密码" maxlength="20" :type="types[2].pwdType" v-model.trim="confirmPassword" />
                <i class="eye" :class="types[2].pwdType == 'password' ? '' : 'open'" @click="switchPwdStatus(2)"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    /**
     * @returns {object} 数据模型
     */
    data() {
        return {
            oldPassword: '', // 原密码
            newPassword: '', // 新密码
            confirmPassword: '', // 二次确认的密码
            types: [{ pwdType: 'password' }, { pwdType: 'password' }, { pwdType: 'password' }],
        };
    },
    methods: {
        /**
         * 验证密码
         *
         * @returns { boolean } 是否通过校验
         */
        verifyPassword() {
            if (this.confirmPassword != this.newPassword) {
                this.$Message.error('两次输入的新密码不一致！');
                return false;
            }
            if (this.oldPassword.trim().length == 0 || this.newPassword.trim().length == 0 || this.confirmPassword.trim().length == 0) {
                this.$Message.error('密码不能为空！');
                return false;
            }
            if (
                !/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(this.newPassword.trim()) ||
                !/^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,20}$/.test(this.confirmPassword.trim())
            ) {
                this.$Message.error('密码格式为8-20位，包含字母、数字、特殊符号的两种及以上组合！');
                return false;
            }
            return true;
        },
        /**
         * 切换密码显示隐藏
         *
         * @param { number } index 索引
         */
        switchPwdStatus(index) {
            if (this.types[index].pwdType == 'password') {
                this.types[index].pwdType = 'text';
            } else {
                this.types[index].pwdType = 'password';
            }
        },
        /**
         * 获取请求参数
         *
         * @returns { object } 请求参数
         */
        getParams() {
            return {
                userLoginpwd: this.oldPassword,
                userLoginpwd_new: this.newPassword,
            };
        },
        /**
         * 数据重置
         */
        init() {
            this.oldPassword = '';
            this.newPassword = '';
            this.types = [{ pwdType: 'password' }, { pwdType: 'password' }, { pwdType: 'password' }];
            this.confirmPassword = '';
        },
    },
};
</script>
<style lang="less" scoped>
.input-password + .input-password {
    margin-top: 16px;
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
        border-radius: 20px;
        overflow: hidden;
        width: 233px;
    }
    .iitem-input {
        // width: 240px;
        width: 166px;
        padding: 13px 16px;
        outline: none;
        font-size: 12px;
        color: #3a3d4b;
        background-color: transparent;
        border: 0;
    }
    i {
        vertical-align: middle;
        width: 16px;
        height: 16px;
        display: inline-block;
        background: url('../../asset/images/hidden-icon.png') no-repeat;
    }
    i.password {
        background: url('../../asset/images/hidden-icon.png') no-repeat;
    }
    i.eye {
        background: url('../../asset/images/hidden-icon.png') no-repeat;
        cursor: pointer;
        display: none \9;
    }
    i.eye.open {
        background-position: 0 0;
        background-size: contain !important;
        background: url('../../asset/images/show-icon.png') no-repeat;
        cursor: pointer;
        display: none \9;
    }
}
</style>
