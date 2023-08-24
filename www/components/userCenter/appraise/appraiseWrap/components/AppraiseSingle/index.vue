<template>
    <div class="appraise-single">
        <div class="title">{{ showIndex }}.{{ itemData.questionName }}</div>
        <div class="content">
            <div class="hidden">{{ showIndex }}.</div>
            <div class="content-wrap">
                <div class="item" v-for="item in itemData.questionOptions" :key="item.id" @click="changeValue(item)">
                    <div class="crcle">
                        <img src="./asset/images/select_radio_check.png" v-if="(',' + replyContent + ',').includes(item.id + ',')" />
                        <img src="./asset/images/select_radio.png" v-else />
                    </div>
                    <span class="txt">{{ item.optionName }}</span>
                </div>
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
            orgData: {},
            replyContent: '',
        };
    },
    mounted() {
        this.replyContent = this.itemData.replyContent;
        this.orgData = this.itemData;
    },
    methods: {
        changeValue(ev) {
            if (this.$parent.type === 'show') {
                return;
            }
            this.replyContent = ev.id;
            this.orgData.replyContent = ev.id;

            this.$emit('updateData', this.orgData.id, this.orgData);
        },
    },
};
</script>
<style lang="less" scoped>
.appraise-single {
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
            width: 100%;
        }
        .item {
            display: flex;
            margin-bottom: 10px;
            cursor: pointer;
            .crcle {
                width: 14px;
                height: 14px;
                flex-shrink: 0;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .txt {
                font-size: 14px;
                color: #333;
                margin-left: 8px;
            }
        }
    }
}
</style>
