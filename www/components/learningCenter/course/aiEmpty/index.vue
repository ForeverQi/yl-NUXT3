<template>
    <div class="empty">
        <img src="./asset/images/empty.png" class="img" :style="styleObj" />
        <div class="txt">{{ tip }}</div>
    </div>
</template>
<script>
export default {
    props: {
        tip: {
            type: String,
            default: '暂无练习记录',
        },
    },
    data() {
        return {
            styleObj: {
                width: '344px',
                height: '194px',
            },
        };
    },
};
</script>
<style lang="less" scoped>
.empty {
    display: inline-block;
}

.txt {
    color: #53586c;
    font-size: 16px;
    text-align: center;
}
</style>
