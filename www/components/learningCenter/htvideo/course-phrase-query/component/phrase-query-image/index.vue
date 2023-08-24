<template>
    <div class="phrase-query-image">
        <!-- 展示图片 -->
        <img :src="imageUrl" class="img" alt="" @click="showBigImage($event)" />
        <!-- 展示大图 -->
        <div class="mask" v-if="isShowMask" @click.stop="closeWrap">
            <i class="el-icon-error" @click.stop="closeWrap"></i>
            <img ref="image" :src="imageUrl" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'phrase-query-image',
    props: {
        url: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            imageStyle: {}, //动态设置图片大小
            isShowMask: false, //是否显示大图
            imageUrl: '',
        };
    },
    watch: {
        url(val) {
            this.imageUrl = this.$urlUtils.getViewUrl(val);
        },
    },
    methods: {
        /**
         * @description 显示大图
         */
        showBigImage(e) {
            if (e.target.nodeName == 'IMG') {
                this.isShowMask = true;
                this.$nextTick(() => {
                    this.setImageStyle();
                });
            }
        },
        //设置图片大小
        setImageStyle() {
            let imageHeight = this.$refs.image.offsetHeight;
            if (imageHeight * 1.5 >= window.innerHeight || imageHeight >= window.innerHeight) {
                this.activeImg.height = window.innerHeight - 20 + 'px';
                return;
            }
            this.activeImg.height = imageHeight * 1.5 + 'px';
        },
        //关闭
        closeWrap() {
            this.isShowMask = false;
            this.imageStyle = {};
        },
    },
};
</script>

<style scoped lang="less">
.phrase-query-image {
    width: inherit;
    .mask {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0px;
        left: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        .el-icon-error {
            position: absolute;
            top: 40px;
            right: 40px;
            width: 40px;
            height: 40px;
            font-size: 24px;
            color: #606266;
            opacity: 0.8;
            cursor: pointer;
            user-select: none;
        }
    }
    .img {
        width: 100%;
    }
}
</style>
