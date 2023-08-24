<template>
    <!-- 头像轮播 -->
    <div class="barWrap">
        <div class="prve" @click="next()"></div>
        <div class="next" @click="prve()"></div>
        <div class="crowWrap">
            <ul class="imgWrap" :style="{ width: width + 'px', left: left + 'px' }">
                <template v-for="item in imgList">
                    <li
                        class="imgItem"
                        :class="{ active: item.active }"
                        :key="item.a"
                        :style="{ marginLeft: marginLeft + 'px' }"
                        v-if="item.teacherId"
                        @click="chooseItem(item)"
                    >
                        <img :src="item.teacherImage | fileParse" alt="" />
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
export default {
    name: 'headBar',
    filters: {
        fileParse(url) {
            return niceloo.path.getServerFileViewPath(url);
        },
    },
    props: {
        imgList: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            left: 0,
            width: 0,
            marginLeft: 0,
            prevEnd: 0,
        };
    },
    watch: {
        imgList: {
            handler() {
                if (this.imgList.length > 6) {
                    this.prevEnd = -(this.imgList.length - 6) * (this.marginLeft + 114);
                }
                this.imgList.forEach((val, i) => {
                    if (i == 0) {
                        this.$set(val, 'active', true);
                    } else {
                        this.$set(val, 'active', false);
                    }
                });
            },
            immediate: true,
        },
    },
    mounted() {
        this.width = document.querySelector('.crowWrap').offsetWidth;
        this.marginLeft = (this.width - 114 * 6) / 7;
    },
    methods: {
        prve() {
            if (this.left <= this.prevEnd) {
                return;
            }
            this.left = this.left - (this.marginLeft + 114);
        },
        next() {
            if (this.left >= 0) {
                return;
            }
            this.left = this.left + (this.marginLeft + 114);
        },
        chooseItem(item) {
            this.imgList.forEach((val) => {
                val.active = false;
            });
            item.active = true;
            this.$emit('chooseItem', item);
        },
    },
};
</script>
<style lang="less" scoped>
.barWrap {
    position: relative;
    background: #fff;
    padding: 0 40px;
    .prve,
    .next {
        height: 28px;
        width: 16px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
    }
    .prve {
        left: 10px;
        background: url(./asset/images/prve@2x.png) no-repeat 0 0 / cover;
    }
    .next {
        right: 10px;
        background: url(./asset/images/next@2x.png) no-repeat 0 0 / cover;
    }
    .crowWrap {
        overflow: hidden;
        height: 114px;
        position: relative;
    }
    .imgWrap {
        display: flex;
        transition: all 0.2s linear;
        position: absolute;
        left: 0;
        cursor: pointer;
        .imgItem {
            flex-shrink: 0;
            width: 110px;
            height: 110px;
            box-shadow: 0px 0px 10px 0px rgba(39, 6, 6, 0.05);
            border: 2px solid #fff;
            border-radius: 55px;
            overflow: hidden;
            img {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
            // margin: 0 15px;
            // &:first-child{
            // 	margin-left:30px;
            // }
            // &:last-child{
            // 	margin-right:30px;
            // }
            &.active {
                border: 2px solid rgba(98, 111, 235, 1);
                box-shadow: 0px 0px 10px 0px rgba(104, 116, 236, 0.3);
            }
            &:hover {
                border: 2px solid rgba(98, 111, 235, 1);
                box-shadow: 0px 0px 10px 0px rgba(104, 116, 236, 0.3);
            }
        }
    }
}
</style>
