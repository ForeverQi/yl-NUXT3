<template>
    <div class="title-module_box">
        <div class="title-module">
            <div class="title-module_date">
                <h2>{{ baseInfo.name }}</h2>
                <p>更新日期：{{ baseInfo.updateTime }}</p>
                <p>生效日期：{{ baseInfo.assertTime }}</p>
            </div>
            <div class="title-list">
                <div
                    class="title-list_child"
                    :class="{ checkTitleClass: item.isChecked }"
                    v-for="(item, index) in dataList"
                    :key="index"
                    @click="checkTitle(item.serial)"
                >
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * 标题数据
         */
        dataList: {
            type: Array,
            default: () => [],
        },
        /**
         * 隐私正常名称、日期
         * name: 名称
         * updateTime: 更新日期
         * assertTime: 生效日期
         */
        baseInfo: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        /**
         *  选择title
         *
         * @param { number } serial 序号
         */
        checkTitle(serial) {
            this.$emit('title-change', serial, true);
        },
    },
};
</script>

<style lang="less" scoped>
.title-module_box {
    .title-module {
        background-color: #fff;
        width: 240px;
        height: 816px;
        display: inline-block;
        vertical-align: top;
        font-size: 13px;
        color: #3a3d4b;
        padding: 20px 16px 20px 24px;
        box-sizing: border-box;
    }

    .title-module_date {
        margin-bottom: 36px;

        p {
            font-size: 12px;
            color: #99a1af;
            margin-bottom: 6px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        h2 {
            font-size: 16px;
            color: #3a3d4b;
            font-weight: 700;
            margin-bottom: 16px;
        }
    }

    .title-list_child {
        color: #3a3d4b;
        font-size: 13px;
        margin-bottom: 26px;
        cursor: pointer;

        &:hover {
            font-weight: 700;
            font-size: 13px;
        }
    }

    .checkTitleClass {
        font-weight: 700;
        font-size: 13px;
    }
}
</style>
