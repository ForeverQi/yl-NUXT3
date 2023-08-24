<template>
    <!-- 课程介绍 -->
    <div :class="['kcxqInfo', propsData != undefined && !propsData.title ? '' : 'plr30']" v-if="propsData != undefined">
        <!-- 重新定义 -->
        <div class="cxdy">
            <div class="cxdyTop" v-if="propsData.title">
                <span>
                    <!-- <span>重新定义</span>2020二建金卡班 -->
                    {{ propsData.title }}
                </span>
            </div>
            <div class="cxdyImg">
                <!-- <img style="width:100%;height:100%" src="./asset/images/cxdyImg.png" /> -->
                <img style="width: 100%; height: 100%; object-fit: cover" :src="propsData.src | fileParse" />
            </div>
        </div>
        <!-- {{propsData}} -->
    </div>
</template>
<script>
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
export default {
    name: 'cxdyimg',
    filters: {
        fileParse(url) {
            return niceloo.path.getServerFileViewPath(url);
        },
    },
    components: {},
    props: {
        propsData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {};
    },
    watch: {
        propsData(val) {
            let vm = this;
            vm.propsData = val;
        },
    },
    mounted() {
        // this.changeVid();
    },
    methods: {},
};
</script>
<style lang="less" scoped>
.plr30 {
    padding: 30px !important;
}
.kcxqInfo {
    padding: 0;
    margin: 20px 30px 0 0;
    border-radius: 2px;
    background-color: #fff;

    .cxdy {
        // margin-top: 50px;
        text-align: center;
        .cxdyTop {
            color: #616feb;
            font-size: 54px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            text-align: center;
            line-height: 130px;
            display: inline-block;
            height: 100px;
            width: 775px;
            background: url('./asset/images/header_decorate1.png') no-repeat;
            background-size: 100% 100%;
            span {
                font-weight: bold;
                span {
                    color: #333333;
                    font-weight: bold;
                }
            }
        }
        .cxdyImg {
            min-height: 328px;
            min-width: 980px;
            // background-size: 100% 100%;
            margin-top: 30px;
        }
    }
}
</style>
