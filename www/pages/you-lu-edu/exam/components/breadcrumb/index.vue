<template>
    <div class="breadcrumb-box">
        <div class="breadcrumb-item">
            <span class="title active" @click="toPage">题库</span>
            <img class="icon" src="../../assets/img/left.png" alt="" />
        </div>
        <div class="breadcrumb-item">
            <span class="title">{{ title }}</span>
            <img class="icon" src="../../assets/img/left.png" alt="" />
        </div>
        <div class="breadcrumb-item">
            <span class="title end">{{ projectName }}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            projectName: '',
        };
    },
    mounted() {
        var examProject = this.$storage.get('examProject');
        this.projectName = examProject ? examProject.projectName : '';
    },
    methods: {
        toPage() {
            var classUniquecode = this.$route.params.classUniquecode;
            var papertypeCode = this.$route.params.papertypeCode;
            var subjectId = this.$route.params.subjectId;
            var ptagId = this.$route.params.ptagId;
            this.$router.push(`/exam/index/list/${classUniquecode}/${ptagId}/${papertypeCode}/${subjectId}`);
        },
    },
};
</script>

<style lang="less" scoped>
.breadcrumb-box {
    padding: 12px 0;
    display: flex;
    align-items: center;
    .breadcrumb-item {
        margin-right: 15px;
        display: flex;
        align-items: center;
        .title {
            margin-right: 5px;
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: rgba(119, 121, 141, 0.8);
            line-height: 19px;
            &.active {
                cursor: pointer;
            }
            &.end {
                color: #53586c;
            }
        }
        .icon {
            width: 15px;
        }
    }
}
</style>
