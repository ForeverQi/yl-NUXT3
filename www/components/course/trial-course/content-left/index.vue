<template>
    <div class="content-left">
        <!-- tab 切换 -->
        <nav-box v-if="online" :tab-val.sync="tabValc" @item-click="handleNavClick"></nav-box>
        <div class="wrapper" v-if="online">
            <!-- 课程介绍 -->
            <class-introduce ref="introduce" v-if="isShowIntroduce"></class-introduce>
            <!-- 课程目录 -->
            <class-catalog
                ref="catalog"
                @play="play"
                v-if="isShowCatalog"
                @freePopupShow="handleFreePopupShow"
                @payPopupShow="handlePayPopupShow"
            ></class-catalog>
        </div>
        <!-- 课程下线 -->
        <div class="content-empty" v-if="online === false">
            <img :src="offlineUrl" alt="" />
            <p class="empty-text">该课程已下架，去看看其他课程吧~</p>
            <button class="go-back-btn" @click="handleGoHome">返回体验课</button>
        </div>
        <div class="content-empty" v-else-if="isShowIntroduce === false && isShowCatalog === false">
            <img :src="uploadingUrl" alt="" />
            <p class="empty-text">内容正在上传中，请耐心等待</p>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import images from '../no-net/js/image.js';
import navBox from '../left/nav-box';
import classCatalog from '../left/left-class-catalog';
import classIntroduce from '../left/left-class-intro';
export default {
    name: 'contentLeftModel',
    components: {
        navBox,
        classCatalog,
        classIntroduce,
    },
    props: {
        online: {
            type: Boolean,
            default: undefined,
        },
        tabVal: {
            type: Number,
            default: 1,
        },
    },
    data() {
        return {
            tabList: [
                { name: '课程介绍', val: 1 },
                { name: '课程目录', val: 2 },
            ],
            offlineUrl: images.offline,
            uploadingUrl: images.uploading,
        };
    },
    fetch() {
        this.$platform.isClient() && window.addEventListener('scroll', this.handleScroll);
        return Promise.resolve();
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        isShowIntroduce() {
            try {
                const arr = JSON.parse(this.experienceClass.courseintroduceDetail);
                if (Array.isArray(arr) === false) {
                    return false;
                }
                return (
                    arr.filter((item) => {
                        return item.introduceType === 'textImg' || item.introduceType === 'img';
                    }).length >= 1
                );
            } catch (err) {
                console.error(err.message);
                return false;
            }
        },
        isShowCatalog() {
            return this.experienceClass.catalogList.length >= 1;
        },
        tabValc: {
            get() {
                return this.tabVal;
            },
            set(v) {
                this.$emit('update:tabVal', v);
            },
        },
    },
    watch: {
        isShowCatalog(newV) {
            if (!newV) {
                return;
            }
            this.$nextTick(() => {
                this.catalogDm = document.querySelector('#chapterDiv');
            });
        },
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            clearTimeout(this.timerDebounce);
            this.timerDebounce = setTimeout(this.handleTabActiveItem, 50);
        },
        handleTabActiveItem() {
            if (!this.catalogDm) {
                return;
            }
            const rect = this.catalogDm.getBoundingClientRect();
            this.$emit('update:tabVal', rect.top <= 300 ? 2 : 1);
        },
        play(item) {
            console.log('contentLeft', item);
            this.$emit('play', item);
        },
        handleGoHome() {
            this.$router.push({
                path: '/trial-course',
            });
        },
        scrollToView(val) {
            if (val === 2 && this.isShowCatalog) {
                scroll({
                    top: document.querySelector('#chapterDiv').offsetTop - 100,
                    behavior: 'smooth',
                });
            } else if (val === 1 && this.isShowIntroduce) {
                scroll({
                    top: 300,
                    behavior: 'smooth',
                });
            }
        },
        handleNavClick(val) {
            this.scrollToView(val);
        },
        handleFreePopupShow(val) {
            console.info('handleFreePopupShow', val);
            this.$emit('freePopupShow', val);
        },
        handlePayPopupShow(val) {
            console.info('handlePayPopupShow', val);
            this.$emit('payPopupShow', val);
        },
    },
};
</script>
<style lang="less" scoped>
.content-left {
    width: 852px;
    margin-bottom: 30px;
    margin-top: 15px;
    .wrapper {
        overflow: auto;
    }
    .content-empty {
        min-height: calc(100vh - 200px);
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        img {
            width: 260px;
            height: 180px;
            margin-bottom: 15px;
        }
        .empty-text {
            font-size: 14px;
            line-height: 19px;
            color: #3a3d4b;
            margin-bottom: 40px;
        }
        .go-back-btn {
            width: 136px;
            text-align: center;
            font-size: 14px;
            color: #fff;
            border-radius: 19px;
            cursor: pointer;
            background-image: linear-gradient(90deg, #ff6870, #f8323c);
            padding-top: 9.5px;
            padding-bottom: 9.5px;
        }
        .go-back-btn:hover {
            background-image: linear-gradient(to right, red, red);
        }
    }
}
</style>
