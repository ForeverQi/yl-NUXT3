<!--
 * @Author: Li
 * @Date: 2022-03-08 09:22:28
 * @LastEditors: Li
 * @LastEditTime: 2022-04-04 18:15:08
 * @Description:
-->
<template>
    <div class="content-left">
        <!-- tab 切换 -->
        <nav-box v-if="online" :tab-val.sync="tabValc"></nav-box>
        <div class="wrapper" v-if="online">
            <!-- 课程介绍 -->
            <class-introduce ref="introduce" v-if="isShowIntroduce"></class-introduce>
            <!-- 课程目录 -->
            <class-catalog ref="catalog" @play="play" v-if="isShowCatalog"></class-catalog>
        </div>
        <!-- 课程下线 -->
        <div class="content-empty" v-if="online === false">
            <img :src="offlineUrl" alt="" />
            <p class="empty-text">该课程已下架，去看看其他课程吧~</p>
            <button class="go-back-btn" @click="handleGoHome">返回首页</button>
        </div>
        <div class="content-empty" v-else-if="isShowIntroduce === false && isShowCatalog === false">
            <img :src="uploadingUrl" alt="" />
            <p class="empty-text">内容正在上传中，请耐心等待</p>
        </div>
    </div>
</template>
<script>
import images from '../../../components/NoNet/js/image.js';
import navBox from '../left/navBox/index.vue';
import classCatalog from '../left/leftClassCatalog/index.vue';
import classIntroduce from '../left/leftClassIntro/index.vue';
export default {
    name: 'contentLeftModel',
    components: {
        navBox,
        classCatalog,
        classIntroduce,
    },
    inject: ['experienceClass'],
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
    computed: {
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
        tabVal(newV) {
            if (newV === 2 && this.isShowCatalog) {
                const dm = this.$refs.catalog.$el;
                dm &&
                    dm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                    });
            } else if (newV === 1 && this.isShowIntroduce) {
                const dm = this.$parent.$el;
                dm &&
                    dm.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
            }
        },
    },
    methods: {
        play(item) {
            console.log('contentLeft', item);
            this.$emit('play', item);
        },
        handleGoHome() {
            this.$router.push({
                path: '/agile-course',
            });
        },
    },
};
</script>
<style lang="less" scoped>
.content-left {
    width: 852px;
    margin-bottom: 30px;
    .wrapper {
        overflow: auto;
    }
    .content-empty {
        min-height: calc(100vh - 200px);
        margin-top: 16px;
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
            background-image: linear-gradient(to right, #3a85fe, #025eff);
            padding-top: 9.5px;
            padding-bottom: 9.5px;
        }
        .go-back-btn:hover {
            background-image: linear-gradient(to right, blue, blue);
        }
    }
}
</style>
