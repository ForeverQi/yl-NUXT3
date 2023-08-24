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
                    <nuxt-link to="/about/youlu" class="link-item" :class="{ active: $route.path === '/about/youlu' }">关于我们</nuxt-link>
                    <nuxt-link to="/about/culture" class="link-item" active-class="active">企业文化</nuxt-link>
                    <nuxt-link v-if="columsList.length" :to="`/about/qualification/${columsList[0].columnId}`" class="link-item" active-class="active">
                        {{ columsList[0].columnName }}
                    </nuxt-link>
                    <div v-for="(item, index) in columsList" :key="index">
                        <nuxt-link
                            class="link-item"
                            :to="`/about/article/${item.columnId}`"
                            v-if="index === 1 || index === 2"
                            :class="[$route.path === `/about/article/${item.columnId}` ? 'active' : '']"
                        >
                            {{ item.columnName }}
                        </nuxt-link>
                    </div>
                    <nuxt-link to="/about/contact" class="link-item" active-class="active">联系我们</nuxt-link>
                    <nuxt-link v-if="false" :to="`/about/join-us/${columsList[columsList.length - 1].columnId}`" class="link-item" active-class="active">
                        加入我们
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/cp/api.CMP2015.query-column-list.js';
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
            default: 10,
        },
        // 背景色透明度 0-1
        backgroundOpacity: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            columsList: [],
        };
    },
    fetch() {
        return this.queryColumns();
    },
    methods: {
        queryColumns() {
            return new Promise((resolve) => {
                this.$callApi('cp/query-column-list', {
                    // 栏目类型编码
                    columnCode: 'WEBPINPAI',
                    projectId: this.$nuxt.context.env.config.new_web_project_id,
                    onsuccess: (data) => {
                        this.columsList = data;
                        resolve();
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            });
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

    .link-item {
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
