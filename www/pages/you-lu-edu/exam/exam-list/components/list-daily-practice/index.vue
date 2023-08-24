<template>
    <div class="daily-practice-box">
        <div class="title-box">
            <p class="title">每日一练</p>
            <div class="more-box" @click="toPath">
                <span class="more-btn">更多</span>
                <img class="more-img" src="../../../assets/img/left.png" alt="" />
            </div>
        </div>
        <p class="text">不积跬步，无以至千里</p>
        <div class="now-box">
            <img class="exam-img" src="../../../assets/img/exam.png" alt="" />
            <div class="now">
                <div class="time">
                    <span class="number">{{ month }}</span>
                    <span class="text">月</span>
                    <span class="number">{{ day }}</span>
                    <span class="text">日</span>
                </div>
                <div>
                    <p class="prompt" v-if="!isLoagin">请在登录后做题</p>
                    <p class="prompt" v-if="isLoagin && !examNone">{{ answerStatus ? '今天的练习已完成~' : '今日还未做题哦~' }}</p>
                    <p class="text" v-if="isLoagin && examNone">
                        {{ interfaceErr ? '暂无数据，去看看以前的练习吧~' : '今天没有练习题哦，去看看以前的练习吧~' }}
                    </p>
                </div>
            </div>
        </div>
        <div v-if="isLoagin && !examNone" :class="{ disabled: isDisabled }" class="btn-box" @click="toEXamPath">
            <img class="btn-img" src="../../../assets/img/edit_exam.png" alt="" />
            <span>{{ answerStatus ? '查看解析' : '开始做题' }}</span>
        </div>
        <div v-if="isLoagin && examNone" :class="{ disabled: isDisabled }" class="btn-box" @click="toPath">
            <img class="btn-img" src="../../../assets/img/edit_exam.png" alt="" />
            <span>查看全部</span>
        </div>
        <div v-if="!isLoagin" class="btn-box" @click="toLogin">
            <img class="btn-img" src="../../../assets/img/edit_exam.png" alt="" />
            <span>请登录</span>
        </div>
        <div class="tip-popup" v-if="isShowTipPopup">加载中，请稍后</div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import mix from '../mixins/index.js';
import track from '@/www/components/course/trial-course/js/track.js';
import '@/api/qb/api..query-business-paper-daily_practice.js';

export default {
    mixins: [mix, track],
    data() {
        return {
            isLoagin: false, // 登录状态
            examNone: false, // 当天是否没有考试
            month: '', // 当前月
            day: '', // 当前日
            classUniquecode: '',
            subjectId: '', // 科目id
            paperId: '', // 试卷id
            answersheetId: '', // 答卷Id
            answerStatus: '', // 今日答题情况
            interfaceErr: false, // 获取每日一练接口挂掉
            isShowTipPopup: false, // 是否显示轻提示弹框
            isDisabled: false, // 是否禁用做题按钮
        };
    },
    watch: {
        '$route.params.subjectId'() {
            this.$nextTick(() => {
                this.init();
            });
        },
        '$store.state.common.userLogin.popUpLogin'() {
            this.isLoagin = true;
            this.init();
        },
    },
    mounted() {
        this.getLoaginStatus();

        // 获取当前日期
        this.month = dayjs(new Date()).format('MM');
        this.day = dayjs(new Date()).format('DD');
    },
    methods: {
        toPath() {
            const { projectId } = this.$storage.get('examProject') || { projectId: '' };
            this.trackWebYouluQuestionChanne({
                channe_name: '每日一练',
                project_id: projectId,
                subject_id: this.subjectId,
            });
            if (this.isLoagin) {
                var papertypeCode = this.$route.params.papertypeCode;
                var ptagId = this.$route.params.ptagId;
                this.$router.push(`/exam/index/daily/practice/${this.classUniquecode}/${ptagId}/${papertypeCode}/${this.subjectId}`);
            } else {
                this.toLogin();
            }
        },
        init() {
            this.subjectId = this.$route.params.subjectId;
            this.classUniquecode = this.$route.params.classUniquecode;
            if (this.subjectId && this.isLoagin) {
                this.getDailyPractice();
            }
        },
        // 获取当日每日一练情况
        getDailyPractice() {
            this.isDisabled = true;
            niceloo.api.call('qb/query-business-paper-daily_practice', {
                subjectId: this.subjectId,
                sourceType: $nuxt.context.env.config.sourceType,
                onsuccess: (res) => {
                    console.log('====>', res);
                    if (!res) {
                        this.examNone = true;
                        return;
                    }
                    this.answerStatus = res.answerStatus === 'yes';
                    this.paperId = res.paperId;
                    this.answersheetId = res.answersheetId;
                    this.month = dayjs(res.nowDate).format('MM');
                    this.day = dayjs(res.nowDate).format('DD');
                    this.examNone = false;
                },
                onerror: (err) => {
                    this.$baseUI.alert(err.getDescription());
                    this.examNone = true;
                    this.interfaceErr = true;
                },
                oncomplete: () => {
                    this.isDisabled = false;
                },
            });
        },
        toLogin() {
            const examProject = this.$storage.get('examProject') || { subjectName: '' };
            const examSubject = this.$storage.get('examSubject') || { subjectName: '' };
            const pageName = `${examProject.projectName}-${examSubject.subjectName}_每日一练_优路教育题库`;
            const { papertypeCode, ptagId } = this.$route.params;
            const url = `/exam/index/daily/practice/${this.classUniquecode}/${ptagId}/${papertypeCode}/${this.subjectId}`;

            this.loginAndClue(
                {
                    pageName,
                    url,
                },
                '题库-去登录'
            );
        },
        toEXamPath() {
            if (this.isDisabled) {
                this.isShowTipPopup = true;
                const timeFun = setTimeout(() => {
                    this.isShowTipPopup = false;
                    clearTimeout(timeFun);
                }, 1000);
                return;
            }
            if (this.answerStatus) {
                this.$PageUtil.href(`/exam/ks/donegy/${this.classUniquecode}/${this.subjectId}/${this.paperId}/${this.answersheetId}`);
            } else {
                this.$PageUtil.href(`/exam/ks/new/${this.classUniquecode}/${this.subjectId}/${this.paperId}`);
            }
        },
        // 获取登录状态
        getLoaginStatus() {
            var promise = ylPlugin.login.isLogined();
            promise.then(
                /* 过程中没有失败 */
                (isLogined) => {
                    /* eslint-disable */
                    if (!!isLogined) {
                        this.isLoagin = true;
                        this.init();
                    } else {
                        this.isLoagin = false;
                    }
                },
                function (err) {
                    /* 过程中有失败 */
                    console.error(err, '登录状态失败');
                }
            );
        },
    },
};
</script>

<style lang="less" scoped>
.daily-practice-box {
    box-sizing: border-box;
    padding: 24px;
    width: 324px;
    height: 249px;
    background: #ffffff;
    border-radius: 8px;
}
.title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
        font-size: 17px;
        font-weight: 700;
        color: #3a3d4b;
        line-height: 20px;
        letter-spacing: 0.6px;
    }
    .more-box {
        display: flex;
        align-items: center;
        cursor: pointer;
        .more-btn {
            margin-right: 2px;
            font-size: 12px;
            font-weight: 400;
            color: #99a1af;
            line-height: 16px;
            letter-spacing: 0.33px;
        }
        .more-img {
            width: 10px;
            height: 10px;
        }
    }
}
.text {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 400;
    color: #99a1af;
    line-height: 16px;
    letter-spacing: 0.5px;
}
.now-box {
    margin-top: 24px;
    display: flex;
    align-items: center;
    .exam-img {
        margin-right: 24px;
        width: 72px;
        height: 72px;
    }
    .time {
        display: flex;
        align-items: flex-end;
        .number {
            font-size: 24px;
            font-weight: 700;
            color: #3a3d4b;
            line-height: 26px;
            letter-spacing: 0.6px;
        }
        .text {
            font-size: 13px;
            font-weight: 400;
            color: #53586c;
            line-height: 17px;
            letter-spacing: 0.33px;
        }
    }
    .prompt {
        margin-top: 8px;
        font-size: 14px;
        font-weight: 400;
        color: #99a1af;
        line-height: 20px;
        letter-spacing: 0.58px;
    }
}
.btn-box {
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 276px;
    height: 39px;
    background: #fff2f0;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 400;
    color: #ff2e30;
    line-height: 39px;
    cursor: pointer;
    .btn-img {
        margin-right: 8px;
        width: 14px;
        height: 14px;
    }

    &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
}

.tip-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 144px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    z-index: 199;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.75);
    transform: translate3d(-50%, -50%, 0);
}
</style>
