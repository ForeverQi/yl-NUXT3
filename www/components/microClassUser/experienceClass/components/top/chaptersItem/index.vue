<template>
    <div class="chapters-item flex ai-center">
        <div>
            <div class="flex ai-center mb12">
                <img src="./asset/images/living.png" alt="" class="living-img" />
                <div class="chapters-name">2021年下半年教资全国报考政策解读，5个务必、3个新政策</div>
                <div class="shiting-box">
                    <img src="./asset/images/shiting.png" alt="" class="shiting-img" />
                    <div class="font-bold">可试听</div>
                </div>
            </div>
            <div class="chapters-time">直播时间：2021.11.24 18:00</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'topChaptersItemModel',
    props: {
        item: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {};
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang="less" scoped>
.chapters-item {
    width: 100%;
    height: 83px;
    cursor: pointer;
    .living-img {
        width: 22px;
        height: 22px;
        margin-right: 16px;
        display: block;
    }
    .shiting-img {
        width: 12px;
        height: 12px;
        margin-right: 4px;
    }
    .chapters-name {
        font-size: 16px;
        line-height: 16px;
        color: #333333;
    }
    .chapters-time {
        font-size: 14px;
        line-height: 14px;
        color: #666;
        padding-left: 38px;
    }
    .mb12 {
        margin-bottom: 12px;
    }
    .shiting-box {
        padding: 4px 8px;
        border-radius: 4px;
        color: #f8323c;
        background-color: rgba(248, 50, 60, 0.1);
        font-size: 12px;
        display: flex;
        align-items: center;
        margin-left: 14px;
    }
    .font-bold {
        font-weight: bold;
    }
}
</style>
