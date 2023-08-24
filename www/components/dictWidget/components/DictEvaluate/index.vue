<template>
    <div class="dict-evaluate fc">
        <div class="check-btn">
            <div class="like fc">
                <div class="fr">
                    <div @click="onClickLike" class="icon" :class="activeLike ? 'active' : ''"></div>
                </div>
                <p>我懂了</p>
                <span v-show="ani.like" class="animate__animated animate__slideInUp">+1</span>
            </div>

            <div class="feed-back fc">
                <div class="fr">
                    <div @click="onClickFeedBack" class="icon" :class="activeFeedBack ? 'active' : ''"></div>
                </div>
                <p>提建议</p>
                <span class="text animate__animated2 animate__show" v-show="ani.fb">感谢反馈！老师会根据你的建议，持续优化内容</span>
            </div>
        </div>
        <div class="bottom" v-if="activeFeedBack">
            <div class="label-list fr">
                <div v-for="item in tabs" :key="item.name" @click="onClickCheck(item)" :class="item.check ? 'active' : ''" class="button" size="medium" round>
                    {{ item.name }}
                </div>
            </div>
            <el-input type="textarea" placeholder="其他建议，可以在这里反馈哦~" v-model="form.textarea" maxlength="100" show-word-limit />

            <div class="footer fr">
                <div class="line">
                    <el-button class="fr" @click="onCancel">取消</el-button>
                </div>
                <div class="line">
                    <el-button v-loading="searchLoding" type="primary" @click="onSubmit" class="red fr">确定</el-button>
                    <span v-show="tips.show">{{ tips.text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dict-evaluate',
    props: {
        currentSubject: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            activeLike: false,
            activeFeedBack: false,
            ani: {
                like: false,
                fb: false,
            },
            tabs: [],
            form: {
                textarea: '',
            },
            tips: {
                text: '请至少设置一项',
                show: false,
            },
            searchLoding: false,
        };
    },
    watch: {
        'currentSubject.subjectId': {
            handler(nv, ov) {
                this.activeLike = false;
                this.activeFeedBack = false;
                this.ani = {
                    like: false,
                    fb: false,
                };
                this.tabs = [];
                this.form = {
                    textarea: '',
                };
                this.tips = {
                    text: '请至少设置一项',
                    show: false,
                };
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        debounce(fn, wait, immediate) {
            let timer;
            return function () {
                if (timer) clearTimeout(timer);
                if (immediate) {
                    // 如果已经执行过，不再执行
                    var callNow = !timer;
                    timer = setTimeout(() => {
                        timer = null;
                    }, wait);
                    if (callNow) {
                        fn.apply(this, arguments);
                    }
                } else {
                    timer = setTimeout(() => {
                        fn.apply(this, arguments);
                    }, wait);
                }
            };
        },
        onClickLike() {
            this.activeLike = !this.activeLike;
            let data = {
                groupId: this.currentSubject.groupId,
                isPraise: this.activeLike ? 'Y' : 'N',
                referId: this.currentSubject.referId,
            };
            this.$callRawApi({
                api: 'cbn/noun/user/praise',
                params: data,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    this.activeLike ? (this.ani.like = true) : (this.ani.like = false);
                });
        },
        onClickFeedBack() {
            this.activeFeedBack = !this.activeFeedBack;

            this.ani.fb = false;

            if (this.activeFeedBack) {
                this.form.textarea = '';
                this.queryProposalList();
            }
        },
        queryProposalList() {
            this.$callRawApi({
                api: 'cbn/noun/proposal/list',
                params: {},
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let data = _reponse.getData();
                    data.forEach((item) => {
                        item.check = false;
                    });
                    this.tabs = data || [];

                    this.$emit('scroll-bottom');
                });
        },
        onSubmit() {
            this.debounce(this.criticismNoun, 1000, true)();
        },
        criticismNoun() {
            let arr = [];
            this.tabs.forEach((item) => {
                item.check && arr.push(item.id);
            });
            if (this.form.textarea.trim().length < 1 && !arr.length) {
                this.tips.show = true;
                return;
            }
            if (this.searchLoding) {
                return;
            }

            this.searchLoding = true;
            let params = {
                groupId: this.currentSubject.groupId,
                criticismType: arr.join(','),
                criticismDetail: this.form.textarea,
            };
            this.$callRawApi({
                api: 'cbn/noun/user/criticism',
                params,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    this.tips.show = false;
                    this.searchLoding = false;
                    this.ani.fb = true;
                    this.$nextTick(() => {
                        this.activeFeedBack = false;
                    });
                });
        },
        onCancel() {
            this.activeFeedBack = !this.activeFeedBack;
            this.tips.show = false;
            this.ani.fb = false;
        },
        onClickCheck(item) {
            item.check = !item.check;
        },
    },
};
</script>
<style lang="less" scoped>
.dict-evaluate {
    width: 100%;
    max-height: 428px;
    z-index: 2901;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.label-list {
    margin-top: 40px;
    margin-bottom: 32px;
    .button {
        font-size: 14px;
        font-family: SourceHanSansCN, SourceHanSansCN-Regular;
        font-weight: 400;
        color: #8d90aa;
        padding: 10px 20px;
        margin-right: 16px;
        background: #ecedef;
        border-radius: 20px;
        cursor: pointer;
        &.active {
            color: #fff;
            background: linear-gradient(301deg, #f8323c 0%, #ff737a 100%);
        }
    }
}
.check-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    // position: absolute;
    p {
        width: 48px;
        height: 21px;
        font-size: 16px;
        font-family: MicrosoftYaHei, MicrosoftYaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #3a3d4b;
        line-height: 21px;
        margin-top: 9px;
    }
    .like {
        margin-right: 87px;
        width: 48px;
        position: relative;
        .icon {
            display: inline-block;
            background: url('./asset/images/like.png') no-repeat center center;
            width: 24px;
            height: 24px;
            background-size: 24px 24px;
            &.active {
                background: url('./asset/images/like_1.png') no-repeat center center;
                background-size: 24px 24px;
            }
        }
    }

    .feed-back {
        position: relative;
        .text {
            position: absolute;
            right: -165px;
            top: 0;
            font-size: 12px;
            font-weight: 400;
            color: #f8323c;
            line-height: 17px;
            width: 158px;
        }
        .icon {
            display: inline-block;
            background: url('./asset/images/feed-back.png') no-repeat center center;
            width: 24px;
            height: 24px;
            background-size: 24px 24px;
            &.active {
                background: url('./asset/images/feed-back_1.png');
                background-size: 24px 24px;
            }
        }
    }
}
.fc {
    display: flex;
    align-items: center;
    flex-direction: column;
}
.fr {
    display: flex;
    align-items: center;
    justify-content: center;
    //   &.fb {
    //     width: 104px;
    //   }
    //   &.like {
    //     width: 45px;
    //   }
}
.operation {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    .icon {
        margin-bottom: 6px;
    }
}
.bottom {
    // position: absolute;
    /deep/ .el-textarea__inner {
        width: 516px;
        min-height: 91px !important;
        background: #fbfbfc;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
    }
    .footer {
        margin: 28px 0 0px;
        .line {
            height: 32px;
            margin-bottom: 34px;
            /deep/ .el-loading-spinner {
                top: 72%;
                .circular {
                    width: 25px;
                    height: 25px;
                }
                .path {
                    stroke: #f56c6c;
                }
            }
        }
        .el-button {
            padding: 10px 20px;
            width: 75px;
            height: 30px;
            background: #ffffff;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            color: #333333;
            font-size: 16px;
            margin-right: 10px;
            &.red {
                background: linear-gradient(301deg, #f8323c 0%, #ff737a 100%);
                border-radius: 4px;
                color: #fff;
                font-weight: 400;
                border: none;
            }
        }
        span {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: #f8323c;
            line-height: 17px;
        }
    }
}

.animate__animated {
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

.animate__animated2 {
    -webkit-animation-duration: 4.5s;
    animation-duration: 4.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.animate__slideInUp {
    color: #f8323c;
    position: absolute;
    right: 15px;
    top: -19px;
    -webkit-animation-name: slideInUp;
    animation-name: slideInUp;
}

@-webkit-keyframes slideInUp {
    0% {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
        visibility: visible;
    }

    to {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        visibility: hidden;
    }
}

@keyframes slideInUp {
    0% {
        -webkit-transform: translate3d(0, 100%, 0);
        transform: translate3d(0, 100%, 0);
        visibility: visible;
    }

    to {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        visibility: hidden;
    }
}

@-webkit-keyframes fadeIn {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.animate__show {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
}
</style>
