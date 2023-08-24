<template>
    <div v-if="show" class="window-wrap">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'vbWindow',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    serverCacheKey(props) {
        return 0;
    },
    computed: {},
    watch: {
        show: {
            immediate: true, // 很重要！！！
            handler(newV, oldV) {
                if (this.Mask)
                    if (newV) this.Mask.show();
                    else this.Mask.hide();
            },
        },
    },
    mounted() {},
    methods: {
        close() {
            this.$emit('update:show', false);
        },
    },
};
</script>

<style scoped lang="less">
.window-wrap {
    z-index: 2050;
    position: fixed;
}
</style>
