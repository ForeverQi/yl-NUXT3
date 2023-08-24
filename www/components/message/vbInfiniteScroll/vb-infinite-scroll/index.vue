<template>
    <div>
        <div class="vb-infinite-scroll" @scroll="handleScroll">
            <div class="scroll-wrap">
                <slot />
            </div>
        </div>
    </div>
</template>

<script>
import debounce from '~/plugins/common/utils/debounce.js';

// 滚动加载
export default {
    name: 'vbInfiniteScroll',
    props: {
        delay: {
            // 延迟时间
            type: Number,
            default: 200,
        },
        distance: {
            //到底部触发的距离
            type: Number,
            default: 50,
        },
        disabled: {
            //是否禁用
            type: Boolean,
            default: false,
        },
        immediate: {
            type: Boolean,
            default: true,
        },
    },
    created() {
        // 防抖
        this.handleScroll = debounce(this.delay, this.handleScroll.bind(this));
        if (this.immediate) this.$emit('load');
    },

    methods: {
        /**
         * @param {Event} e
         */
        handleScroll({ target }) {
            if (!this.disabled) {
                const { clientHeight, scrollHeight, scrollTop } = target;
                const scrollBottom = scrollTop + clientHeight;
                const shouldTrigger = scrollHeight - scrollBottom <= this.distance;
                if (shouldTrigger) {
                    this.$emit('load');
                }
            }
        },
    },
};
</script>

<style lang="less" scoped>
// 滚动条兼容处理
::-webkit-scrollbar {
    width: 3px;
    height: 3px;
}

::-webkit-scrollbar-thumb {
    border-radius: 1em;
    background-color: rgba(50, 50, 50, 0.3);
}

::-webkit-scrollbar-track {
    border-radius: 1em;
    background-color: rgba(50, 50, 50, 0.1);
}
.vb-infinite-scroll {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    -ms-overflow-y: auto;
    .scroll-wrap {
        width: 100%;
    }
}
</style>
