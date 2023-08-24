<template>
    <div :class="['doc-preview', isFullScreen ? 'doc-preview-big' : '']">
        <img src="./asset/images/suo.png" alt="" @click="handleLookFullScreen(false)" v-if="isFullScreen" class="initScreenBtn" />
        <div class="doc-preview-inner-box-top" v-for="(item, index) in docList" :key="index">
            <img :src="item" alt="" />
        </div>
        <!-- 资料包底部登录/购买-->
        <detail-footer v-if="!isFullScreen" :file="file" :index="lookIndex"></detail-footer>
        <!-- 从属资料包 上一篇下一篇 -->
        <detail-up-down v-if="file.docIdPack === 'Y' && !isFullScreen" :file="file"></detail-up-down>
        <!-- 吸顶底部-->
        <fixed-bottom
            @lookFullScreen="handleLookFullScreen"
            :is-fixed="isFixedFooter"
            :width="width"
            :index="lookIndex"
            ref="fixedBottom"
            :file="file"
            :praise-status="praiseStatus"
            @doc-praise="updatePraise"
        ></fixed-bottom>
    </div>
</template>
<script>
import DetailFooter from './components/detail-footer.vue';
import FixedBottom from './components/fixed-bottom.vue';
import DetailUpDown from './components/detail-up-down.vue'; //下一篇
export default {
    name: 'docPreview',
    components: {
        DetailFooter,
        FixedBottom,
        DetailUpDown,
    },
    props: {
        docList: {
            type: Array,
            default: () => [],
        },
        file: {
            type: Object,
            default: () => {},
        },
        praiseStatus: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            onFetching: false,
            isFullScreen: false,
            isFixedFooter: true, // 底部是否固定
            width: 0,
            lookIndex: 1,
        };
    },
    fetch() {
        return Promise.resolve();
    },
    mounted() {
        if (this.$platform.isClient()) {
            document.addEventListener('scroll', this.scrollLoad);
            this.width = $('.doc-preview').width();
            this.$nextTick(this.initIsFixedFooter);
        }
    },
    beforeDestroy() {
        if (this.$platform.isClient()) {
            document.removeEventListener('scroll', this.scrollLoad, false);
            document.querySelector('.doc-preview').removeEventListener('scroll', this.scrollLoad, false);
        }
    },
    methods: {
        initIsFixedFooter() {
            let screenHeight = document.documentElement.clientHeight || document.body.clientHeight; //可视区高度
            let domTop = 0;
            if ($('.doc-preview').position()) {
                domTop = $('.doc-preview').position().top || 0;
            }
            let domHeight = $('.doc-preview').height();
            if (screenHeight - domTop >= domHeight) {
                this.isFixedFooter = false;
            } else {
                this.isFixedFooter = true;
            }
        },
        scrollLoad() {
            let screenHeight = document.documentElement.clientHeight || document.body.clientHeight; //可视区高度
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
            let domTop = 0;
            if ($('.doc-preview').position()) {
                domTop = $('.doc-preview').position().top || 0;
            }
            let domHeight = $('.doc-preview').height();
            let innerDomHeight = $('.doc-preview-inner-box-top').height();
            let innerDomLen = $('.doc-preview-inner-box-top').length;

            // 底部是否定位
            if (scrollTop <= domTop + domHeight - screenHeight) {
                this.isFixedFooter = true;
            } else {
                this.isFixedFooter = false;
            }
            // 底部数字显示
            if (scrollTop > domTop) {
                this.lookIndex =
                    Math.round((scrollTop - domTop) / innerDomHeight) + 1 > innerDomLen ? innerDomLen : Math.round((scrollTop - domTop) / innerDomHeight) + 1;
            } else {
                this.lookIndex = 1;
            }

            if (this.onFetching) {
                console.log('加载中......');
            } else if (!this.isFullScreen && scrollTop + screenHeight + innerDomHeight >= domTop + domHeight) {
                this.onFetching = true;
                setTimeout(() => {
                    this.onFetching = false;
                    this.$emit('load-preview-info');
                }, 500);
            }
        },
        divScrollLoad() {
            let scrollTop = document.querySelector('.doc-preview').scrollTop; //已滚动高度
            let domHeight = document.getElementsByClassName('doc-preview')[0].offsetHeight;
            let innerDomHeight = document.getElementsByClassName('doc-preview-inner-box-top')[0].offsetHeight;

            this.lookIndex = Math.round(scrollTop / innerDomHeight) + 1;
            if (this.onFetching) {
                // do nothing
                console.log('加载中......');
            } else if (this.isFullScreen && scrollTop + innerDomHeight >= domHeight) {
                this.onFetching = true;
                setTimeout(() => {
                    this.onFetching = false;
                    this.$emit('load-preview-info');
                }, 500);
            }
        },
        handleLookFullScreen(data) {
            this.isFullScreen = data;
            if (data) {
                // 全屏
                this.onFetching = false;
                document.querySelector('body').setAttribute('style', 'overflow: hidden;');
                document.querySelector('.doc-preview').setAttribute('style', 'overflow: scroll; height: 100vh;');
                document.querySelector('.doc-preview').addEventListener('scroll', this.divScrollLoad);
            } else {
                // 非全屏
                this.$refs.fixedBottom.isFull = false;
                this.isFixedFooter = true;
                this.$nextTick((res) => {
                    // 销毁
                    document.querySelector('body').removeAttribute('style');
                    document.querySelector('.doc-preview').removeAttribute('style');
                    document.querySelector('.doc-preview').removeEventListener('scroll', this.scrollLoad, false);
                    this.initIsFixedFooter();
                });
            }
        },
        //更新点赞信息
        updatePraise() {
            this.$emit('doc-praise');
        },
    },
    beforeDestory() {
        document.removeEventListener('scroll', this.scrollLoad, false);
        document.querySelector('.doc-preview').removeEventListener('scroll', this.scrollLoad, false);
    },
};
</script>

<style lang="less" scoped>
.doc-preview {
    margin-bottom: 100px;
    .doc-preview-inner-box-top {
        img {
            width: 100%;
            height: auto;
        }
    }
    .doc-preview-inner-box-top:last-child {
        margin: 10px 0 10px 50px;
    }
    .doc-preview-inner-box-bottom {
        height: 50px;
    }
}
.doc-preview-big {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100vw - 600px);
    height: auto;
    overflow: auto;
    z-index: 99;
    padding: 20px 300px;
    background-color: #fff;
}
.overflow-hidden {
    overflow: hidden;
}
.initScreenBtn {
    position: fixed;
    top: 50px;
    right: 50px;
    cursor: pointer;
}
</style>
