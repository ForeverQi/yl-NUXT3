<template>
    <div class="yl-message-container">
        <div
            class="yl-notify"
            v-for="item in noticeList"
            :key="item.index"
            :class="{ 'yl-notify__show': item.show }"
            @transitionend="animationEnd(item)"
            ref="list"
        >
            <div class="yl-notify-container">
                <div class="yl-notify-content">
                    <div>
                        <i
                            :class="{
                                'el-icon-success green': item.type === 'success',
                                'el-icon-error error': item.type === 'error',
                                'el-icon-info info': item.type === 'info',
                                'el-icon-warning warning': item.type === 'warning',
                            }"
                        ></i>
                        {{ item.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            content: '',
            type: '',
            noticeList: [],
            closeCb: null,
        };
    },
    methods: {
        showMessage(opt) {
            this.content = opt.content;
            this.type = opt.type;
        },
        close() {
            this.visible = false;
            this.closeCb && this.closeCb();
        },
        handleAfterLeave() {
            this.$destroy(true);
            this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
        },
        animationEnd(item) {
            item.closeCb && item.closeCb(item, this);
        },
    },
};
</script>
<style lang="less" scoped>
div {
    box-sizing: border-box;
}
.yl-message-container {
    position: fixed;
    top: 60px;
    z-index: 1010;
    pointer-events: none;
    left: 0;
    text-align: center;
    right: 0;
}
.yl-notify {
    &&__show {
        .yl-notify-container {
            max-height: 1000px;
            margin-top: 10px;
            opacity: 1;

            .yl-notify-content {
                max-width: 1000px;
                text-align: left;
                padding-top: 8px;
                padding-bottom: 8px;
                font-size: 14px;
            }
        }
    }
    .yl-notify-container {
        margin: 0 auto;
        position: relative;
        overflow: hidden;
        display: inline-block;
        pointer-events: initial;
        max-height: 0;
        opacity: 0;
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 5px 10px rgb(0 0 0 / 10%);
        transition: 0.2s;

        .yl-notify-content {
            padding: 0px 18px;
            transition: 0.2s;
            position: relative;
        }
    }
}
.green {
    color: #13ce66;
}
.error {
    color: #f56c6c;
}
.warning {
    color: #e6a23c;
}
.info {
    color: #909399;
}
</style>
