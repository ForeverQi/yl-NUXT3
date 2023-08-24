<template>
    <div class="appraise-score">
        <div class="title">{{ showIndex }}.{{ itemData.questionName }}</div>
        <div class="content">
            <div class="hidden">{{ showIndex }}.</div>
            <div class="content-wrap">
                <span class="txt">评分</span>
                <el-rate
                    :value="starNum"
                    :disabled="$parent.type === 'show'"
                    :max="5"
                    :icon-classes="iconClasses"
                    void-icon-class="icon-rate-face-off"
                    @change="changeValue"
                ></el-rate>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
        showIndex: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            starNum: 1,
            orgData: {},
            iconClasses: ['icon-rate-face', 'icon-rate-face', 'icon-rate-face', 'icon-rate-face', 'icon-rate-face'],
        };
    },
    mounted() {
        this.starNum = this.itemData.replyContent;
        this.orgData = this.itemData;
    },
    methods: {
        changeValue(ev) {
            if (this.$parent.type === 'show') {
                return;
            }
            this.starNum = ev;
            this.orgData.replyContent = ev;
            this.$emit('updateData', this.orgData.id, this.orgData);
        },
    },
};
</script>
<style lang="less" scoped>
.appraise-score {
    padding: 16px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .title {
        font-size: 16px;
        color: #333333;
        font-weight: 700;
    }

    .hidden {
        visibility: hidden;
    }

    .content {
        display: flex;
        padding-top: 10px;
        // padding-left: 16px;
        .content-wrap {
            display: flex;
            width: 100%;
        }
        .txt {
            margin-right: 10px;
            font-size: 14px;
            color: #333333;
        }
        /deep/ .icon-rate-face-off {
            width: 20px;
            height: 20px;
            display: block;
            background-image: url(./asset/images/noselect.png);
            background-size: 100%;
        }

        /deep/ .icon-rate-face {
            width: 20px;
            height: 20px;
            display: block;
            background-image: url(./asset/images/select.png);
            background-size: 100%;
        }
    }
}
</style>
