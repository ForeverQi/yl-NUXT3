<script lang="jsx">
import '@/api/api..check-user-identity.js';
export default {
    /**
     * @returns {object} - 返回预定义的变量
     */
    data() {
        return {
            form: [],

            showError: false,
            error: '',
        };
    },
    computed: {
        /**
         * @returns {string} - 返回输入的身份证后六位
         */
        idCard() {
            console.log(this.form, '--');
            return this.form.join('');
        },
    },
    methods: {
        /**
         *
         * @param {number} index - 第几个输入框
         * @param {InputEvent} ev  - input输入框内容变化时的参数
         */
        listenerInp(index, ev) {
            if (!ev.data) {
                return;
            }
            this.$refs[`inp_${index}`].value = ev.data;
            this.$set(this.form, index, ev.data);
            if (index < 5) {
                this.$refs[`inp_${index + 1}`].focus();
            }
        },
        /**
         *
         * @param {number} index - 删除第几个输入框
         */
        deleteInp(index) {
            this.form.splice(index, 1);
            this.$refs[`inp_${index}`].value = '';
            if (index > 0) {
                setTimeout(() => {
                    this.$refs[`inp_${index - 1}`].focus();
                }, 50);
            }
        },
        /**
         * 判断用户输入的身份证后6位是否正确
         */
        doVerify() {
            //
            if (this.idCard.length < 6) {
                // this.showError = true;
                // this.error = '请输入正确的身份证后六位！';
                this.$Message.error('请输入正确的身份证后六位！');
                return;
            }
            this.doGetIdCard();
        },
        /**
         * 获取学员身份证后6位
         */
        doGetIdCard() {
            const data = {
                url: 'uc/check-user-identity',
                params: {
                    idcard: this.idCard,
                },
                isCustom: true,
            };
            this.$httpClient(data)
                .then((res) => {
                    console.log(res, '===');
                    this.$emit('doClose', {
                        type: 'success',
                        idCard: res,
                    });
                })
                .catch((err) => {
                    // this.error = err.getDescription();
                    // this.showError = true;
                    this.$Message.error(err.getDescription());
                });
        },
    },
    /**
     * @returns {object} - 虚拟dom树
     */
    render() {
        return (
            <div class="id-card-check">
                <div class="title">
                    请确认身份信息
                    <div
                        class="close"
                        onClick={() => {
                            this.$emit('doClose', {
                                type: 'close',
                            });
                        }}
                    >
                        <img src={require('./asset/images/close.png')} class="close-img" />
                    </div>
                </div>
                <div class="tip">
                    为保护您的隐私安全，请输入<span class="red">身份证后六位</span>进行校验
                </div>
                <div class="inp-wrap">
                    {Array.from(new Array(6)).map((res, index) => {
                        return (
                            <div class="inp-box">
                                <input
                                    type="text"
                                    onInput={(ev) => {
                                        this.listenerInp(index, ev);
                                    }}
                                    onKeydown={(ev) => {
                                        if (ev.key.toLowerCase() === 'backspace') {
                                            this.deleteInp(index);
                                        }
                                    }}
                                    ref={`inp_${index}`}
                                    class="inp"
                                />
                            </div>
                        );
                    })}
                </div>
                {this.showError && <div class="error-txt">{this.error}</div>}
                <div class="intro">
                    <img src={require('./asset/images/w.png')} class="w" />
                    不记得身份证号码，
                    <span
                        class="txt"
                        onClick={() => {
                            this.$emit('doClose', {
                                type: 'change',
                            });
                        }}
                    >
                        点我进行手机号验证
                    </span>
                </div>
                <div class="btn" onClick={this.doVerify}>
                    确定
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.id-card-check {
    position: relative;
    width: 360px;
    height: 301px;
    border-radius: 10px;
    background-color: #fff;
    .title {
        position: relative;
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        color: #3a3d4b;
        padding-top: 30px;
        line-height: 28px;
        border-radius: 10px;

        .close {
            position: absolute;
            right: 14px;
            width: 12px;
            height: 12px;
            top: 14px;
            cursor: pointer;

            .close-img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .tip {
        padding-top: 8px;
        font-size: 12px;
        text-align: center;
        color: #99a1af;
        line-height: 17px;

        .red {
            color: #f8323c;
        }
    }

    .inp-wrap {
        padding: 0 39px;
        padding-top: 28px;
        display: flex;
        justify-content: space-between;
        .inp-box {
            width: 32px;
            padding: 8px 0;
            border-bottom: 1px solid #d9dbe5;
            .inp {
                width: 100%;
                padding: 0 10px;
                font-size: 22px;
                line-height: 30px;
                outline: none;
                border: none;
                box-sizing: border-box;
            }
        }
    }

    .intro {
        padding-top: 38px;
        text-align: center;
        .w {
            width: 12px;
            height: 12px;
            margin-right: 6px;
        }

        font-size: 12px;
        text-decoration: underline;
        color: #8d90aa;
        line-height: 17px;

        .txt {
            color: #1890ff;
            cursor: pointer;
        }
    }

    .btn {
        width: 218px;
        height: 38px;
        margin: 0 auto;
        margin-top: 20px;
        background: linear-gradient(270deg, #ff8d74, #ff2e30);
        border-radius: 21px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        line-height: 38px;
    }

    .error-txt {
        position: absolute;
        top: 165px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        text-align: left;
        color: #f8323c;
        line-height: 17px;
    }
}
</style>
