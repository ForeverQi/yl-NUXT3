<template>
    <div class="dict-header" @mousedown.stop="mouseDown">
        <div class="back" v-if="isShowBack" @click="$emit('go-back')"></div>
        <div class="icon"></div>
        <div class="text">词点快查</div>
        <div class="close" @click.stop="closeDict"></div>
    </div>
</template>

<script>
export default {
    name: 'dict-header',
    props: {
        isbox: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isShowBack: false, // 是否显示返回按钮
        };
    },
    watch: {},
    beforeDestroy() {},
    methods: {
        mouseDown(event) {
            // event.stopPropagation();

            var drag = this.isbox ? $('.dict-box')[0] : $('.dict-widget-box')[0];

            var offsetHeight = $('.dict-header')[0].offsetHeight;
            var diffX = event.clientX - drag.offsetLeft;
            var diffY = event.clientY - drag.offsetTop;
            if (drag.setCapture) {
                drag.setCapture();
            } else {
                // event.preventDefault()
            }
            document.onmousemove = function (e) {
                var left = e.clientX - diffX;
                var top = e.clientY - diffY;
                if (left < 0) {
                    left = 0;
                } else if (left > window.innerWidth - drag.offsetWidth) {
                    left = window.innerWidth - drag.offsetWidth;
                }
                if (top < 0) {
                    top = 0;
                } else if (top > document.documentElement.clientHeight - offsetHeight) {
                    top = document.documentElement.clientHeight - offsetHeight;
                }
                drag.style.left = left + 'px';
                drag.style.top = top + 'px';
                $('.el-autocomplete-suggestion').hide();
            };
            document.onmouseup = function (e) {
                this.onmousemove = null;
                this.onmouseup = null;
                if (drag.releaseCapture) {
                    drag.releaseCapture();
                }
            };
        },
        closeDict() {
            this.$emit('close-dict');
        },
    },
};
</script>

<style scoped lang="less">
.dict-header {
    user-select: none;
    cursor: move;
    z-index: 9999;
    background: url('./asset/images/top.png') no-repeat center center;
    width: 580px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 0;
    top: 0;
    background-size: 580px 60px;
    .close {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url(./asset/images/close.png) no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 17px;
        background-size: 24px 24px;
    }
    .text {
        font-size: 24px;
        font-family: SourceHanSansCN, SourceHanSansCN-Bold;
        font-weight: 700;
        text-align: left;
        color: #ffffff;
        line-height: 36px;
    }
    .icon {
        width: 24px;
        height: 24px;
        background: url('./asset/images/icon.png') no-repeat center center;
        margin-right: 6px;
        background-size: 24px 24px;
    }

    .back {
        width: 24px;
        height: 24px;
        background: url('./asset/images/dict-back.png') no-repeat center center;
        cursor: pointer;
        position: absolute;
        left: 20px;
        top: 18px;
        background-size: 24px 24px;
    }
}
</style>
