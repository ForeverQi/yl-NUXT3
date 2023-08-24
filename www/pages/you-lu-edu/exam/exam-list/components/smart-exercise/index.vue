<template>
    <div class="smart-exercise-box">
        <div class="smart-exercise-c">
            <img class="img" src="../../../assets/img/smart-exercise-bg.png" alt="" />
            <p class="title">快速智能练习</p>
            <p class="content">结合您该学科的学习情况，为您智能抽取20道试题</p>
            <div class="btn" @click="getZNLXExam">开始抽题</div>
        </div>
        <VipMask v-if="showVip" :channel="'智能练习'" :is-loagin="isLoagin" :text="isLoagin ? '本项目系统课学员可学习该模块哦' : '请在登录后再开始练习'" />
    </div>
</template>

<script>
import VipMask from '../vip-mask';
import track from '@/www/components/course/trial-course/js/track.js';
import '@/api/qb/api..query-business-common-author.js';
import '@/api/qb/api..query-business-paper-intelligent-generate.js';

export default {
    components: {
        VipMask,
    },
    mixins: [track],
    data() {
        return {
            projectId: '',
            classUniquecode: '', // 项目编码
            showVip: false, // 是否打开 vip 遮罩
            isLoagin: false, // 是否登录
        };
    },
    watch: {
        '$store.state.common.userLogin.popUpLogin'() {
            this.loginSuccess();
        },
    },
    mounted() {
        var examProject = this.$storage.get('examProject');
        this.classUniquecode = this.$route.params.classUniquecode;
        this.projectId = examProject ? examProject.projectId : '';
        this.getLoaginStatus();
    },
    methods: {
        // 获取登录状态
        getLoaginStatus() {
            var promise = ylPlugin.login.isLogined();
            promise.then(
                /* 过程中没有失败 */
                (isLogined) => {
                    /* eslint-disable */
                    if (!!isLogined) {
                        this.isLoagin = true;
                        this.getAuthor();
                    } else {
                        this.showVip = true;
                        this.isLoagin = false;
                    }
                },
                (err) => {
                    /* 过程中有失败 */
                    console.error(err, '登录状态失败');
                }
            );
        },
        // 弹窗登录成功回调
        loginSuccess() {
            this.isLoagin = true;
            this.getAuthor();
        },
        // 获取是否有做题权限
        getAuthor() {
            niceloo.api.call('qb/query-business-common-author', {
                projectId: this.projectId,
                onsuccess: (res) => {
                    console.log(res);
                    this.showVip = false;
                },
                onerror: () => {
                    this.showVip = true;
                },
                oncomplete: () => {},
            });
        },
        // 智能练习获取试卷
        getZNLXExam() {
            var subjectId = this.$route.params.subjectId;
            niceloo.api.call('qb/query-business-paper-intelligent-generate', {
                classUniqueCode: this.classUniquecode,
                subjectId: subjectId,
                onsuccess: (res) => {
                    console.log(res);
                    this.$PageUtil.href(`/exam/ks/new/${this.classUniquecode}/${subjectId}/${res.paperId}`);
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        }
    },
};
</script>

<style lang="less" scoped>
.smart-exercise-box {
    position: relative;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    .smart-exercise-c {
        .img {
            margin: 0 auto;
            display: block;
            width: 120px;
            height: 120px;
        }
        .title {
            margin-top: 10px;
            font-size: 20px;
            font-weight: 600;
            text-align: center;
            color: #3a3d4b;
            line-height: 32px;
            letter-spacing: 0.6px;
        }
        .content {
            margin-top: 10px;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            color: #77798d;
            line-height: 20px;
            letter-spacing: 0.4px;
        }
        .btn {
            margin: 0 auto;
            margin-top: 32px;
            width: 152px;
            height: 46px;
            font-size: 18px;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 46px;
            background: linear-gradient(100deg, #ff2e30 8%, #ff957a 100%);
            border-radius: 23px;
            cursor: pointer;
        }
    }
}
</style>
