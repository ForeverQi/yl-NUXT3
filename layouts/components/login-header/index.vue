<template>
    <!-- 设定高度，用于浮动元素占位 -->
    <div class="header-wrap">
        <!-- 背景色 -->
        <div
            class="header-bg"
            :style="{
                position: isFixed ? 'fixed' : 'static',
                top: top + 'px',
                'z-index': zIndex,
                'background-color': `rgba(255,255,255, ${backgroundOpacity})`,
            }"
        >
            <!-- 内容区域 -->
            <div class="header-box">
                <div class="left-box">
                    <nuxt-link to="/" class="logo-img">
                        <img src="./asset/images/logo.png" alt="优路教育" class="logo" />
                    </nuxt-link>
                </div>
                <div class="right-box">
                    <div class="back-text" @click="goBack()">返回</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'module-header',
    props: {
        // 布局是否要求相对页面定位(浮动在顶部)
        isFixed: {
            type: Boolean,
            default: true,
        },
        // 页面定位时据页面顶部的像素距离,isFixed为true时才有意义
        top: {
            type: Number,
            default: 0,
        },
        // 定位的层级
        zIndex: {
            type: Number,
            default: 600,
        },
        // 背景色透明度 0-1
        backgroundOpacity: {
            type: Number,
            default: 1,
        },
    },
    methods: {
        goBack() {
            this.$emit('back');
        },
    },
};
</script>

<style lang="less" scoped>
@h: 80px;
.header-wrap {
    height: @h;
}
.header-bg {
    width: 100%;
    min-width: 1200px;
    left: 0;
    box-shadow: 0px 4px 10px 0px rgba(68, 68, 68, 0.05);
}
.header-box {
    width: 1200px;
    height: @h;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left-box {
    line-height: 26px;
    .logo-img {
        margin-right: 46px;
        float: left;

        .logo {
            display: block;
        }
    }
}

.right-box {
    display: flex;
    align-items: center;

    .back-text {
        margin-right: 30px;
        color: #3a3d4b;
        float: left;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;

        &:hover {
            color: #444444;
            font-weight: 700;
        }

        &.active {
            color: #444444;
            font-weight: 700;
        }
    }
}
</style>
