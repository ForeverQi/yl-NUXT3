<template>
    <div class="vip-mask">
        <div class="mask-c">
            <img class="vip-img" src="../../../assets/img/vip-mask.png" alt="" />
            <p class="text">{{ text }}</p>
            <div class="btn" @click="toPath">{{ !isLoagin ? '去登录' : '查看系统课' }}</div>
        </div>
    </div>
</template>

<script>
import mix from '../mixins';

export default {
    mixins: [mix],
    props: {
        isLoagin: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            default: '',
        },
        channel: {
            type: String,
            default: '',
        },
    },
    methods: {
        toPath() {
            if (this.isLoagin) {
                var examCollege = this.$storage.get('examCollege');
                var examProject = this.$storage.get('examProject');
                // var examSubjectId = this.$storage.get('examSubjectId');
                // this.$router.push(
                //     `/pro-course/${examCollege.collegeId}/${examProject.projectSeoCode}${examProject.ptagId ? `/${examProject.ptagId}` : ''}/${examSubjectId}`
                // );
                this.$router.push(`/pro-course/${examCollege.collegeId}/${examProject.projectSeoCode}${examProject.ptagId ? `/${examProject.ptagId}` : ''}`);
            } else {
                const examProject = this.$storage.get('examProject') || { subjectName: '' };
                const examSubject = this.$storage.get('examSubject') || { subjectName: '' };
                const pageName = `${examProject.projectName}-${examSubject.subjectName}_${this.channel}_优路教育题库`;

                this.loginAndClue(
                    {
                        pageName,
                    },
                    '题库-去登录'
                );
            }
        },
    },
};
</script>

<style lang="less" scoped>
.vip-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 8px;
    .vip-img {
        margin: 0 auto;
        display: block;
        width: 132px;
        height: 132px;
    }
    .text {
        margin-top: 16px;
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 21px;
        letter-spacing: 0.83px;
    }
    .btn {
        margin: 0 auto;
        margin-top: 24px;
        width: 174px;
        height: 46px;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 46px;
        letter-spacing: 0.75px;
        background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
        border-radius: 27px;
        cursor: pointer;
    }
}
</style>
