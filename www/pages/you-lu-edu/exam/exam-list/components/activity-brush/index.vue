<template>
    <div class="daily-practice-box">
        <div class="title-box">
            <p class="title">活动刷题</p>
        </div>
        <p class="text">您参与活动解锁的试卷</p>
        <div class="btn-box" @click="getLoaginStatus">
            <img class="btn-img" src="../../../assets/img/edit_exam.png" alt="" />
            <span>查看全部</span>
        </div>
    </div>
</template>

<script>
import mix from '../mixins/index.js';
import track from '@/www/components/course/trial-course/js/track.js';
import '@/api/qb/api.QB9014.query-paper-activity-profile-list.js';

export default {
    mixins: [mix, track],
    methods: {
        // 活动刷题
        clickActiveDoing() {
            var subjectId = this.$route.params.subjectId;
            niceloo.api.call('qb/query-paper-activity-profile-list', {
                subjectId,
                papertypeCode: 'HDYQT',
                pageIndex: 0,
                pageSize: 8,
                sourceType: $nuxt.context.env.config.sourceType,
                onsuccess: (res) => {
                    console.log(res);
                    if (res.count === 0) {
                        this.$baseUI.alert('您在当前科目下没有已解锁的活动试卷');
                    } else {
                        var classUniquecode = this.$route.params.classUniquecode;
                        var papertypeCode = this.$route.params.papertypeCode;
                        var subjectId = this.$route.params.subjectId;
                        var ptagId = this.$route.params.ptagId;
                        this.$router.push(`/exam/index/activity/doing/${classUniquecode}/${ptagId}/${papertypeCode}/${subjectId}`);
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        // 获取登录状态
        getLoaginStatus() {
            const { projectId } = this.$storage.get('examProject') || { projectId: '' };
            this.trackWebYouluQuestionChanne({
                channe_name: '活动刷题',
                project_id: projectId,
                subject_id: this.$route.params.subjectId,
            });

            var promise = ylPlugin.login.isLogined();
            promise.then(
                /* 过程中没有失败 */
                (isLogined) => {
                    /* eslint-disable */
                    if (!!isLogined) {
                        this.clickActiveDoing();
                    } else {
                        this.openLoading();
                    }
                },
                function (err) {
                    /* 过程中有失败 */
                    console.error(err, '登录状态失败');
                }
            );
        },
        // 打开登录弹窗
        openLoading() {
            const examProject = this.$storage.get('examProject') || { subjectName: '' };
            const examSubject = this.$storage.get('examSubject') || { subjectName: '' };
            const pageName = `${examProject.projectName}-${examSubject.subjectName}_活动刷题_优路教育题库`;
            const { papertypeCode, classUniquecode, subjectId, ptagId } = this.$route.params;
            const url = `/exam/index/activity/doing/${classUniquecode}/${ptagId}/${papertypeCode}/${subjectId}`;

            this.loginAndClue({
                pageName,
                url,
            }, '题库-去登录');
        },
    },
};
</script>

<style lang="less" scoped>
.daily-practice-box {
    box-sizing: border-box;
    padding: 24px;
    width: 324px;
    height: 153px;
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
}
.text {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 400;
    color: #99a1af;
    line-height: 16px;
    letter-spacing: 0.5px;
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
}
</style>
