<template>
    <div class="edu-mask" v-show="show">
        <div class="info-wrap">
            <button class="close" @click="handleCloseClick" type="button">
                <img src="./asset/images/close.png" class="icon" />
            </button>
            <div class="info-header">
                <h2>请补全信息</h2>
            </div>
            <p class="tips">为保护您的隐私，请输入缺失信息进行校验</p>
            <p class="tips-card">请输入此学员手机号码中间四位</p>
            <form class="user-form">
                <input
                    v-model.trim="item.num"
                    class="item-val"
                    v-for="(item, index) in mobileMidNum"
                    :key="index"
                    :ref="'input' + index"
                    @keyup.delete="handleDelete(index)"
                />
            </form>
            <div class="info-footer">
                <button class="btn sure" @click="handleSureClick" :disabled="disabled" type="button">确定</button>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/edu/api..getstumobile.js';

export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            userInfo: {
                userIdcard: '',
                userName: '',
            },
            mobileMidNum: [
                {
                    num: '',
                },
                {
                    num: '',
                },
                {
                    num: '',
                },
                {
                    num: '',
                },
            ],
        };
    },
    computed: {
        disabled() {
            return this.mobileMidNum.some((item) => item.num.length <= 0);
        },
    },
    watch: {
        mobileMidNum: {
            deep: true,
            handler(newV) {
                newV.forEach((item) => {
                    if (item.num.length > 1) {
                        item.num = item.num.slice(0, 1);
                    }
                });
                const idx = newV.findIndex((item) => item.num.length <= 0);
                if (idx < 0) {
                    this.handleSureClick();
                } else {
                    const v = this.$refs[`input${idx}`][0];
                    v.focus();
                }
            },
        },
        show(newV) {
            if (newV) {
                this.mobileMidNum.forEach((item) => (item.num = ''));
            }
        },
    },
    methods: {
        handleCloseClick() {
            this.$emit('update:show', false);
        },
        handleSureClick() {
            if (this.isSaving === true) {
                return;
            }
            this.isSaving = true;
            this.loadingIntance = this.$baseUI.loading();
            this.getMobile()
                .then((res) => {
                    this.handleCloseClick('click');
                    this.$emit('success', res);
                })
                .catch(() => {
                    this.$baseUI.alert('信息错误，请重新填写');
                })
                .finally(() => {
                    this.loadingIntance.close();
                    this.isSaving = false;
                });
        },
        getMobile() {
            return this.$callApi('edu/getstumobile', {
                mobile: this.mobileMidNum.map((item) => item.num).join(''),
            }).then((res) => res.getData());
        },
        handleDelete(idx) {
            if (idx <= 0) {
                return;
            }
            const v = this.$refs[`input${idx - 1}`][0];
            v.focus();
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
            text-align: center;
            .item-val {
                width: 38px;
                height: 36px;
                background-color: white;
                border-bottom: 1px solid #d9dbe5;
                outline: none;
                box-sizing: border-box;
                text-align: center;
                font-weight: bold;
                font-size: 22px;
                border-top: 0;
                border-left: 0;
                border-right: 0;
            }
            .item-val:nth-child(n + 2) {
                margin-left: 8px;
            }
        }

        .info-footer {
            text-align: center;
            margin-top: 20px;
            margin-bottom: 28px;
            .btn {
                width: 218px;
                height: 38px;
                border: none;
                outline: none;
                border-radius: 19px;
            }
            .sure {
                background: linear-gradient(270deg, #ff8d74, #ff2e30);
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
.tips {
    color: #f8323c;
    font-size: 12px;
    text-align: center;
    margin-top: 8px;
}
.tips-card {
    margin-top: 24px;
    color: #8d90aa;
    font-size: 12px;
    text-align: center;
}
</style>
