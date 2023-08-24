<template>
    <div v-cs-offset-show="show" style="display: none; z-index: 2050; position: fixed">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'vbWindow',
    // 创建指令(可以多个)
    directives: {
        // 指令名称
        csOffsetShow: {
            inserted(el, binding, vnode) {
                if (binding.value != null && binding.value == binding.oldValue) return;
                if (binding.value == true) {
                    el.style.display = 'block';
                    Offset(el, null, true);
                } else {
                    el.style.display = 'none';
                }
            },
        },
    },
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

<style scoped></style>
