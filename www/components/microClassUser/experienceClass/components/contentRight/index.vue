<!--
 * @Author: Li
 * @Date: 2022-03-08 09:22:28
 * @LastEditors: Li
 * @LastEditTime: 2022-04-04 18:21:08
 * @Description: 
-->
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
import rightSameClass from '../../../components/sameClass/sameClass/index.vue';
import shareBox from '../right/rightShareBox/index.vue';
import rightBlackbord from '../right/rightBlackbord/index.vue';
import rightTeacherBox from '../right/rightTeacherBox/index.vue';
export default {
    name: 'contentRightModel',
    components: {
        shareBox,
        rightBlackbord,
        rightTeacherBox,
        rightSameClass,
    },
    inject: ['experienceClass'],
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
            },
        };
    },
    computed: {
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
            !this.sameClassParams.projectId && this.$refs.sameClass.mcpTrialWebSimilar();
        },
    },
    created() {
        this.sameClassParams.coursePromotiontype = this.experienceClass.coursePromotiontype;
        this.sameClassParams.projectId = this.experienceClass.projectId;
        this.sameClassParams.subjectId = this.experienceClass.subjectId;
    },
};
</script>
<style lang="less" scoped>
.content-right {
    width: 324px;
}
</style>
