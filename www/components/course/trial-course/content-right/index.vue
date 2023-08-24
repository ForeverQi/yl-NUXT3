<template>
    <div class="content-right">
        <!-- 分享 -->
        <share-box v-if="online"></share-box>
        <!-- 敲黑板 -->
        <right-blackbord v-if="online && hasBlackLights"></right-blackbord>
        <!-- 主讲老师 -->
        <right-teacher-box v-if="online"></right-teacher-box>
        <!-- 同类好课 -->
        <right-same-class :params="sameClassParams" ref="sameClass"></right-same-class>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import rightSameClass from '../same-class';
import shareBox from '../right/right-share-box';
import rightBlackbord from '../right/right-blackbord';
import rightTeacherBox from '../right/right-teacher-box';
export default {
    name: 'contentRightModel',
    components: {
        shareBox,
        rightBlackbord,
        rightTeacherBox,
        rightSameClass,
    },
    props: {
        online: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            sameClassParams: {
                categoryId: '',
                clientType: 'W',
                courseOpenstatus: '',
                coursePromotiontype: '',
                operateCategoryId: '',
                projectId: '',
                subjectId: '',
                isWebSimilar: '1',
                goodsId: '',
            },
        };
    },
    fetch() {
        const { id } = this.$route.params;
        this.sameClassParams.coursePromotiontype = this.experienceClass.coursePromotiontype;
        this.sameClassParams.projectId = this.experienceClass.projectId;
        this.sameClassParams.subjectId = this.experienceClass.subjectId;
        this.sameClassParams.goodsId = id;

        return Promise.resolve();
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        hasBlackLights() {
            return this.experienceClass.lights.filter((item) => item.type === '2').length > 0;
        },
        projectId() {
            return this.experienceClass.projectId;
        },
    },
    watch: {
        projectId() {
            this.sameClassParams.projectId = this.experienceClass.projectId;
        },
        online() {
            this.sameClassParams.projectId ? this.$refs.sameClass.mcpTrialWebSimilar() : this.$refs.sameClass.getTrialList();
        },
    },
};
</script>
<style lang="less" scoped>
.content-right {
    width: 324px;
}
</style>
