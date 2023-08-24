<template>
    <div class="practice-result" v-html="showText">
        <!-- 同学你好！你本次做对<span class="num">1</span>道单选题、<span class="num">1</span>道多选题、<span class="num">1</span>道判断题、<span class="num">1</span>道不定项题、 -->
    </div>
</template>
<script>
// 练习结果内容展示
export default {
    props: {
        itemData: {
            type: Object,
            default() {
                return {
                    content: '',
                };
            },
        },
    },
    data() {
        return {
            showText: '',
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.showText = this.itemData.content.replace(/\d+/g, (num) => {
                return `<span class="num">${num}</span>`;
            });
        },
    },
};
</script>
<style lang="less" scoped>
.practice-result {
    padding: 12px 24px;
    background: #ffecd8;
    border-radius: 6px;
    display: inline-block;
    margin: 0 auto;

    font-size: 14px;
    text-align: left;
    color: #3a3d4b;
    line-height: 20px;

    /deep/ .num {
        color: #ff2e30;
    }
}
</style>
