<template>
    <div class="item" :id="itemData.modulId">
        <div class="studyStageItem" :class="itemData.modulId == curModuleId ? 'cur' : ''" @click="switchModule(itemData)">
            <span class="rank" :class="itemData.modulId == curModuleId ? 'cur' : ''">{{ showIndex + 1 }}</span>
            <span v-if="itemData.modulId != curModuleId">.</span>
            {{ itemData.modulName }}
            <template v-if="itemData.lockedStatus === 'Y'">
                <img class="lock" v-if="itemData.modulId == curModuleId" src="./asset/images/mlock.png" />
                <img class="lock" v-else src="./asset/images/clock.png" />
            </template>
        </div>
        <div class="nexeIcon" :class="itemData.modulId == curModuleId ? 'cur' : ''" v-if="!isLast"></div>
    </div>
</template>
<script>
export default {
    props: {
        showIndex: {
            // 当前模块显示编号
            type: Number,
            default: 0,
        },
        curModuleId: {
            // 当前选中模块ID
            type: String,
            default: '',
        },
        itemData: {
            // 当前组件显示页面
            type: Object,
            default() {
                return {};
            },
        },
        isLast: {
            // 是否最后一个
            type: Boolean,
            default: false,
        },
    },
    methods: {
        switchModule(item) {
            this.$emit('switchStage', item);
        },
    },
};
</script>
<style lang="less" scoped>
.item {
    float: left;
    cursor: pointer;
    margin-bottom: 12px;

    .studyStageItem {
        float: left;
        height: 26px;
        line-height: 26px;
        padding: 0 19px;
        background: #fff;
        box-shadow: 0px 4px 6px -2px rgba(192, 192, 192, 0.3);
        border-radius: 16px;
        border: 1px solid rgba(217, 217, 217, 1);
        font-size: 14px;
        color: #333;
        img.lock {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-top: -2px;
            vertical-align: middle;
        }

        &.cur {
            background: linear-gradient(90deg, rgba(240, 121, 99, 1) 0%, rgba(231, 57, 40, 1) 100%);
            box-shadow: 0px 4px 6px -2px rgba(231, 57, 40, 0.3);
            border-radius: 16px;
            color: #fff;
            border: none;
            height: 28px;
            line-height: 28px;

            img {
                display: inline-block;
                margin-top: -7px;
                &.lock {
                    width: 24px;
                    height: 24px;
                    margin-top: -2px;
                    vertical-align: middle;
                }
            }
        }

        img {
            display: none;
        }

        .rank.cur {
            font-size: 36px;
            background-image: -webkit-linear-gradient(left, #e8796e, #ffe8e8);
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
            margin-top: -7px;
            float: left;
            font-weight: bold;
        }
    }
}

.nexeIcon {
    margin: 0 15px;
    width: 8px;
    height: 28px;
    background: url('./asset/images/next-icon.png') no-repeat center center;
    display: inline-block;
}
.nexeIcon.cur {
    background: url('./asset/images/next-icon-cur.png') no-repeat center center;
}
</style>
