<template>
    <div>
        <tab :data="tabArray" :active-index="activeIndex" @select="selectTab" />
        <div class="wrap">
            <div class="go-back-box" @click="goBack">
                <img class="back-icon" src="./asset/images/back-icon.png" alt="" />
                返回上一页
            </div>
            <p class="title">请选择注销账号的原因：</p>
            <ul>
                <li v-for="(item, index) in reasonList" :key="item.sysdictId" @click="handleReasonChoose(index, item)">
                    <p>
                        <i :class="['checkbox', { active: index === currentIndex }]"></i>
                        <span>{{ item.sysdictValue }}</span>
                    </p>
                </li>
            </ul>
            <div class="textarea-wrap" v-if="isShowTextarea">
                <textarea class="textarea" ref="textarea" v-model.trim="textareaContent" placeholder="请输入其他注销原因"></textarea>
                <p>{{ textareaContent.length }} / {{ maxCharacter }}</p>
            </div>
            <button type="button" v-if="!isBtnClick">提交申请</button>
            <button type="button" v-else class="active" @click="submit">提交申请</button>
        </div>
        <verifyPhone ref="verifyPhone" :is-show="isShowVerifyPhoneMask" @noCancellation="noCancellation" @logoutSubmit="logoutSubmit" />
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

import verifyPhone from './components/verifyPhone/index.vue';
import { tabData } from './js/data.js';
import tab from '@/www/components/tab/tabX/index.vue';

export default {
    components: {
        tab,
        verifyPhone,
    },
    data() {
        return {
            tabArray: tabData, // tab按钮
            activeIndex: 1, // 选中的tab
            maxCharacter: 200, // 最大输入字符限制
            isShowTextarea: false, // 输入框是否显示
            isBtnClick: false, // 提交按钮是否可以点击
            currentIndex: null, // 当前选择的注销原因索引
            textareaContent: '', // 输入的内容
            reasonList: [
                { id: 1, content: '厌烦营销信息骚扰' },
                { id: 2, content: '隐私安全考虑' },
                { id: 3, content: 'APP功能体验不好' },
                { id: 4, content: '使用了其他学习平台' },
                { id: 5, content: '暂时不想学习了' },
                { id: 6, content: '以后再也不想使用优路教育了' },
                { id: 7, content: '其他原因' },
            ],
            isShowVerifyPhoneMask: false, // 注销-验证手机号
            sysdictId: '', // 注销原因的id
        };
    },
    watch: {
        textareaContent: {
            handler(newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                newValue.length > 0 ? (this.isBtnClick = true) : (this.isBtnClick = false);
                if (newValue.length >= this.maxCharacter) {
                    this.textareaContent = newValue.slice(0, 200);
                }
                this.autoTextAreaHeight();
            },
        },
    },
    mounted() {
        this.getLogoutReasonType();
    },
    methods: {
        ...mapMutations('logout', ['setUserInfo']),
        noCancellation() {
            this.isShowVerifyPhoneMask = false;
        },
        logoutSubmit(phoneCode) {
            if (!phoneCode) {
                return false;
            }
            let params = {
                applyCause: this.sysdictId,
                cause: this.sysdictId === 'SYSDICT20210825010000000015' ? this.textareaContent : '',
                source: 'SYSDICT20211209010000000001',
                verify: {
                    verifyValue: phoneCode,
                },
            };
            console.log(params);
            this.$callRawApi({
                api: 'ws/cancel/add',
                params,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    this.isShowVerifyPhoneMask = false;
                    this.$router.replace({
                        path: `/uc/manager/personalCenter/logoutExamine`,
                    });
                });
        },
        //textarea自适应高度
        autoTextAreaHeight() {
            this.$nextTick(() => {
                var textArea = this.$refs.textarea;
                var scrollHeight = textArea.scrollHeight; // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
                var height = textArea.offsetHeight; // 屏幕上显示的高度
                if (height <= scrollHeight) {
                    textArea.style.height = 'auto'; // 恢复默认值，这个作用就是根据内容自适应textarea高度
                    textArea.style.height = textArea.scrollHeight + 'px'; // 拿到最新的高度改变textarea的高度
                }
            });
        },
        handleReasonChoose(index, item) {
            this.currentIndex = index;
            this.sysdictId = item.sysdictId;
            if (item.sysdictId === 'SYSDICT20210825010000000007') {
                this.isShowTextarea = true;
                this.isBtnClick = false;
                this.textareaContent.length ? (this.isBtnClick = true) : (this.isBtnClick = false);
            } else {
                this.isShowTextarea = false;
                this.isBtnClick = true;
            }
        },
        submit() {
            this.isShowVerifyPhoneMask = true;
        },
        //tab切换
        selectTab(index) {
            this.isShowVerifyPhoneMask = false;
            if (index === 0) {
                this.$router.replace({
                    path: `/uc/manager/personalCenter/personalInfo`,
                });
            } else if (index === 1) {
                this.$router.replace({
                    path: `/uc/manager/personalCenter/accountSafe`,
                });
            }
        },
        getLogoutReasonType() {
            this.$callRawApi({
                api: 'ws/sysdict/dictValue/type',
                params: { type: 'APPLY_CAUSE' },
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let res = _reponse.getData();
                    this.reasonList = res;
                    console.log(this.reasonList, res);
                });
        },
        goBack() {
            this.$router.replace({
                path: `/uc/manager/personalCenter/logoutConfirm`,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.wrap {
    background: #fff;
    text-align: center;
    padding: 32px 0 80px;
    margin-top: 10px;
    .go-back-box {
        margin-left: 38px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;
        font-weight: 400;
        text-align: LEFT;
        color: #53586c;
        line-height: 14px;
        cursor: pointer;
        .back-icon {
            margin-right: 8px;
            width: 18px;
            height: 18px;
        }
    }
    .title {
        width: 280px;
        font-size: 20px;
        font-weight: 700;
        color: #3a3d4b;
        margin: 0 auto 20px;
        text-align: left;
    }
    ul {
        width: 280px;
        margin: 0 auto;
        li {
            margin-bottom: 13px;
            cursor: pointer;
            p {
                overflow: hidden;
                i {
                    width: 20px;
                    height: 20px;
                    background: url('./asset/images/radio.png') no-repeat 0 0;
                    background-size: 40px 20px;
                    float: left;
                    margin: 1px 10px 0 0;
                    &.active {
                        background-position: -20px 0;
                    }
                }
                span {
                    float: left;
                    font-size: 14px;
                    color: #3a3d4b;
                }
            }
        }
    }
    .textarea-wrap {
        width: 256px;
        margin: 0 auto;
        border: 1px solid #ededf2;
        border-radius: 6px;
        padding: 12px 16px;
        position: relative;
        .textarea {
            width: 100%;
            min-height: 100px;
            resize: none;
            font-size: 14px;
            line-height: 19px;
            color: #3a3d4b;
            border: none;
            outline: none;
        }
        p {
            text-align: right;
            font-size: 12px;
            color: #99a1af;
        }
        .tips {
            font-size: 12px;
            color: #f8323c;
            position: absolute;
            left: 0;
            bottom: -20px;
        }
    }
    button {
        width: 280px;
        height: 44px;
        background: #eeeff6;
        border-radius: 22px;
        margin: 48px auto 0;
        border: none;
        cursor: pointer;
        color: #99a1af;
        font-size: 16px;
        transition: all 0.2s;
        cursor: not-allowed;
        &.active {
            background: linear-gradient(90deg, #f8323c, #ff737a 100%);
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>
