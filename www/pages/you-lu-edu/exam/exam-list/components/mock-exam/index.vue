<template>
    <div class="mock-exam-box">
        <div class="header-box">
            <p class="title">{{ historyMockExam ? '我的模考记录' : '最近的模考' }}</p>
            <div class="check-out-box" @click="checkMockExam">
                <p class="check-title">{{ historyMockExam ? '最近的模考' : '我的模考记录' }}</p>
                <img class="check-img" src="../../../assets/img/exam_check.png" alt="" />
            </div>
        </div>
        <div class="list">
            <RecentMockExam v-if="!historyMockExam" :week-map="weekMap" />
            <HistoryMockExam v-else :week-map="weekMap" />
        </div>
    </div>
</template>

<script>
import mix from '../mixins';
import RecentMockExam from './components/recentMockExam';
import HistoryMockExam from './components/historyMockExam';

export default {
    components: {
        RecentMockExam,
        HistoryMockExam,
    },
    mixins: [mix],
    data() {
        return {
            historyMockExam: false, // 最近模考/我的模考记录
            weekMap: {
                0: '星期日',
                1: '星期一',
                2: '星期二',
                3: '星期三',
                4: '星期四',
                5: '星期五',
                6: '星期六',
            },
        };
    },
    methods: {
        // 切换我的模考记录和最近模考
        async checkMockExam() {
            if (!this.historyMockExam) {
                var isLoagin = await this.getLoaginStatus(true);
                if (!isLoagin) {
                    return;
                }
            }
            this.historyMockExam = !this.historyMockExam;
        },
        // 获取登录状态
        getLoaginStatus(historyMockExam = true) {
            var promise = ylPlugin.login.isLogined();
            return promise.then(
                /* 过程中没有失败 */
                (isLogined) => {
                    /* eslint-disable */
                    if (!!isLogined) {
                        return true;
                    } else {
                        this.openLoagin(historyMockExam);
                        return false;
                    }
                },
                (err) => {
                    /* 过程中有失败 */
                    console.error(err, '登录状态失败');
                }
            );
        },
        // 打开登录弹窗
        openLoagin() {
            this.loginAndClue({
                originCode: this.originCodeMoKao
            }, '题库-去登录');
        },
    },
};
</script>

<style lang="less" scoped>
.mock-exam-box {
    position: relative;
    margin-top: 20px;
    min-height: 500px;
    .header-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
            font-size: 18px;
            font-weight: 700;
            color: #3a3d4b;
            line-height: 24px;
            letter-spacing: 0.75px;
        }
        .check-out-box {
            padding: 8px 20px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 20px;
            cursor: pointer;
            .check-title {
                font-size: 14px;
                font-weight: 400;
                color: #3a3d4b;
                line-height: 20px;
            }
            .check-img {
                width: 20px;
                height: 20px;
            }
        }
    }
    .list {
        margin-top: 20px;
    }
}
</style>
