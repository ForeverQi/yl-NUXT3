<template>
    <button :disabled="disabled" class="vb-button pointer" @click="handClick" :class="[type, round ? 'round' : '']">
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'default',
        },
        round: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handClick() {
            this.$emit('click');
        },
    },
};
</script>

<style lang="less" scoped>
.vb-button {
    padding: 6px 12px;
    font-size: 12px;
    font-weight: 400;
    text-align: left;
    line-height: 18px;
    -webkit-appearance: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    outline: none;
    &.default {
        border: 1px solid #ececec;
        color: #666666;
        background-color: transparent;
    }
    &.round {
        border-radius: 20px;
    }
    &.primary {
        background-color: #fff3f0;
        color: #e73928;
        border: none;
    }

    &.text {
        border: none;
        background-color: transparent;
        color: #999999;
    }
    &:disabled {
        color: rgba(#666666, 0.5);
        cursor: not-allowed;
    }
    &:active {
        outline: none;
    }
}
</style>
