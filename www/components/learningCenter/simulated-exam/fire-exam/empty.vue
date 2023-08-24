<template>
    <div class="paper-empty ai-center jc-center flex column">
        <img src="./asset/images/112.gif" class="icon" />
        <span class="tip">{{ tip }}</span>
        <button class="know" @click="handleClick">我知道了</button>
    </div>
</template>
<script>
export default {
    props: {
        tip: {
            type: String,
            default: '当前试卷已被停用，不能再做题了哦~',
        },
    },
    methods: {
        handleClick() {
            // 跳转到nuxt页面
            this.$PageUtil.href(`/learningCenter/ai/course/${this.$route.query.classId}?ctapId=${this.$route.query.ctapId}`);
        },
    },
};
</script>
<style lang="less" scoped>
.paper-empty {
    flex: 1;
    background-color: #ddebf6;

    .know {
        background-color: rgba(255, 114, 0, 1);
        color: white;
        margin-top: 20px;
        padding: 7px 40px;
        border-radius: 15px;
    }
    .icon {
        width: 180px;
    }
    .tip {
        margin-top: 30px;
    }
}
</style>
