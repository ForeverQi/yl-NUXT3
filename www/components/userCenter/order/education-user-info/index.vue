<template>
    <div class="edu-mask" v-show="show">
        <div class="info-wrap">
            <button class="close" @click="handleCloseClick" type="button">
                <img src="./asset/images/close.png" class="icon" />
            </button>
            <div class="info-header">
                <h2>{{ title }}</h2>
            </div>
            <form class="user-form" name="improveFormUserInfo">
                <div class="form-item">
                    <div>
                        <label for="userName">&emsp;&emsp;姓名：</label>
                        <input id="userName" v-model.trim="userInfo.userName" placeholder="请输入真实姓名" class="item-val" name="name" />
                    </div>
                </div>
                <div class="form-item">
                    <div>
                        <label for="userName">身份证号：</label>
                        <input id="userIdcard" v-model.trim="userInfo.userIdcard" placeholder="请输入身份证号码" class="item-val" name="idNum" />
                    </div>
                </div>
                <div class="form-item" v-if="isShowErr">
                    <p class="err-info">您的信息有误，为保证学员服务，请提供该学员的真实姓名、身份证号及学员本人的手机号</p>
                </div>
            </form>
            <div class="info-footer">
                <button class="btn sure" @click="handleSureClick" type="button" :disabled="disabled">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/edu/api..threeelementcheck.js';
import '@/api/edu/api..twoelementcheck.js';
import { Validator } from '@/plugins/common/utils/validator.js';

export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        userName: {
            type: String,
            default: '',
        },
        idCardNo: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '修改实名信息',
        },
        scene: {
            type: String,
            default: '',
        },
        isThreeVerify: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            userInfo: {
                userIdcard: '',
                userName: '',
            },
            isShowErr: false,
        };
    },
    computed: {
        disabled() {
            return this.userInfo.userIdcard.length <= 0 || this.userInfo.userName <= 0;
        },
    },
    watch: {
        'userInfo.userIdcard'(newV, oldV) {
            if (newV.length > 50) {
                this.userInfo.userIdcard = oldV;
            }
        },
        'userInfo.userName'(newV, oldV) {
            if (newV.length > 50) {
                this.userInfo.userName = oldV;
            }
        },
        show() {
            this.userInfo.userName = this.userName;
            this.userInfo.userIdcard = this.idCardNo.includes('*') ? '' : this.idCardNo;
            if (this.validator) {
                this.validator.clear();
            }
            this.isShowErr = false;
        },
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            this.rules = {
                idNum: 'required|I',
                name: 'required|name',
            };
            this.errors = {
                idNum: {
                    required: '请输入正确的身份证号码',
                    I: '请输入正确的身份证号码',
                    H: '请输入正确的身份证号码',
                    T: '请输入正确的身份证号码',
                    O: '请输入正确的身份证号码',
                },
                name: {
                    required: '请输入正确的姓名',
                    name: '请输入正确的姓名',
                },
            };
            this.validator = new Validator('improveFormUserInfo', this.rules, this.errors);
        },
        handleCloseClick() {
            this.$emit('update:show', false);
        },
        handleSureClick() {
            const param = {
                name: this.userInfo.userName,
                idNum: this.userInfo.userIdcard,
            };
            this.loadingInstance = this.$baseUI.loading();
            this.validator
                .validate(param)
                .then(() => {
                    this.userInfo.userIdcard = this.xToUpperCase(this.userInfo.userIdcard);
                    this.validBaseInfo()
                        .then(() => {
                            this.isShowErr = false;
                            this.handleCloseClick('click');
                            this.$emit('success', this.userInfo.userName, this.userInfo.userIdcard);
                        })
                        .catch(() => {
                            this.isShowErr = true;
                            // 您的个人信息有误。请检查您的姓名和身份证号是否正确，手机号码是否为本人身份证办理；若有疑问可联系您的课程老师或拨打优路教育全国服务热线： 400-861-8800 。
                            return this.$baseUI.alert(
                                '您的个人信息有误。请检查您的姓名和身份证号是否正确，手机号码是否为本人身份证办理；若有疑问可联系您的课程老师或拨打优路教育全国服务热线： 400-861-8800。'
                            );
                        })
                        .finally(() => {
                            this.loadingInstance.close();
                        });
                })
                .catch((err) => {
                    console.warn(err);
                    err.showError();
                })
                .finally(() => {
                    this.loadingInstance.close();
                });
        },
        xToUpperCase(idCard) {
            const preIdCard = idCard.slice(0, -1);
            const lastLetter = idCard.slice(-1);
            return `${preIdCard}${lastLetter === 'x' ? lastLetter.toUpperCase() : lastLetter}`;
        },
        validBaseInfo() {
            return this.$User.getUser().then(() => {
                if (this.isThreeVerify === false) {
                    return this.validTwo().then((res) => {
                        const { code, message } = res.getData();
                        if (code === '1') {
                            return Promise.reject(message);
                        }
                    });
                }
                return this.validThree().then((res) => {
                    const { code } = res.getData();
                    if (code === '1') {
                        return this.validTwo().then((res) => {
                            const { code, message } = res.getData();
                            if (code === '1') {
                                return Promise.reject(message);
                            }
                        });
                    }
                });
            });
        },
        validThree() {
            return this.$callApi('edu/threeelementcheck', {
                idCardno: this.userInfo?.userIdcard ?? '',
                name: this.userInfo?.userName ?? '',
                action: '1',
                terminal: 'WEB',
                scene: this.scene,
            });
        },
        validTwo() {
            return this.$callApi('edu/twoelementcheck', {
                idCardno: this.userInfo?.userIdcard ?? '',
                name: this.userInfo?.userName ?? '',
                action: '1',
                terminal: 'WEB',
                scene: this.scene,
            });
        },
    },
};
</script>
<style lang="less" scoped>
.edu-mask {
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 3000;
    .info-wrap {
        min-width: 272px;
        overflow: auto;
        background-color: white;
        display: inline-block;
        border-radius: 10px;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        .user-form {
            margin: 20px 20px 0;
            .form-item + .form-item {
                margin-top: 8px;
            }
            .form-item {
                display: flex;
                label {
                    align-self: center;
                    color: gray;
                    font-size: 14px;
                }
                .item-val {
                    width: 232px;
                    height: 36px;
                    background-color: white;
                    border: 1px solid rgba(0, 0, 0, 0.15);
                    border-radius: 4px;
                    outline: none;
                    padding-left: 16px;
                    padding-right: 16px;
                    box-sizing: border-box;
                }
                .err-info {
                    color: #f8323c;
                    font-size: 12px;
                    width: 300px;
                }
            }
        }

        .info-footer {
            text-align: center;
            margin-top: 40px;
            margin-bottom: 28px;
            .btn {
                width: 218px;
                height: 38px;
                border: none;
                outline: none;
                border-radius: 19px;
                cursor: pointer;
            }
            .cancel {
                background: #fff3f3;
                color: #f8323c;
            }
            .sure {
                background: linear-gradient(90deg, #ff6870, #f8323c);
                color: white;
                font-weight: bold;
                &[disabled='disabled'] {
                    background: gray;
                }
            }
        }

        .info-header {
            position: relative;
            h2 {
                font-size: 20px;
                font-weight: 500;
                text-align: center;
                margin-top: 30px;
            }
        }
        .close {
            background-color: transparent;
            border: none;
            outline: none;
            position: absolute;
            top: 14px;
            right: 14px;
            cursor: pointer;
            .icon {
                width: 12px;
                height: 12px;
            }
        }
    }
}
</style>
