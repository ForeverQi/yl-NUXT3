<template>
    <!-- 课程介绍 -->
    <div class="courserIntros" id="courserIntroTmplete">
        <!-- 侧边的导航锚点 -->
        <div v-if="componentArrNav && componentArrNav.length" class="point-box" :class="{ fixed: isNavFixed }">
            <div class="content-wrap">
                <div class="title-img">课程介绍</div>
                <div class="items-box">
                    <div v-for="item in componentArrNav" :key="item.a" class="point-item" @click="goAnchor(item.key)">{{ item.name }}</div>
                    <div class="top-btn" @click="goTop">TOP</div>
                </div>
            </div>
        </div>
        <!-- 内容区域 -->
        <div class="noData" v-if="Array.isArray(lessonintroduce) ? !lessonintroduce.length : !lessonintroduce.type">
            <img src="../asset/images/empty.png" />
            <p>小编正在努力上传，请耐心等待哦</p>
        </div>
        <template v-else-if="Array.isArray(lessonintroduce)">
            <div
                v-for="(item, i) in componentArr"
                :key="i"
                :id="item.datainfo.linkType != undefined ? 'anchor-' + item.datainfo.linkType : ''"
                :class="item.id"
            >
                <component :is="item.id" :props-data="item.datainfo"></component>
            </div>
        </template>
        <div class="img-cont" v-else>
            <image-view :src="lessonintroduce.src" type="banner" placeholder-width="35%" :style="{ width: imgWidth + 'px' }" />
        </div>
    </div>
</template>

<script>
import kcxq from './courserIntro/kcxq.vue';
import cxdyimg from './courserIntro/cxdyimg.vue';
import kcys from './courserIntro/kcys.vue';
import kcysimg from './courserIntro/kcysimg.vue';
import kcmk from './courserIntro/kcmk.vue';
import zjls from './courserIntro/zjls.vue';
import bkcl from './courserIntro/bkcl.vue';
import bxfl from './courserIntro/bxfl.vue';
import xxjlh from './courserIntro/xxjlh.vue';
import xugsInfo from './courserIntro/xugsInfo.vue';
import yljyLetter from './courserIntro/yljyLetter.vue';
import sumtext from './courserIntro/sumtext.vue';

export default {
    components: { kcxq, cxdyimg, kcys, kcysimg, kcmk, zjls, bkcl, bxfl, xxjlh, xugsInfo, yljyLetter, sumtext },
    props: {
        isNavFixed: {
            type: Boolean,
            default: false,
        },
        componentArrNav: {
            type: Array,
            default: () => [],
        },
        classtypeLessonintroduceAfter: {
            type: [Array, Object],
            default: () => [],
        },
    },
    data() {
        return {
            lessonintroduce: [],
            kcxqConVideo: {}, //课程详情
            kcxqConImg: {}, //课程详情
            kcysCon: {}, //课程优势
            kcmkCon: {}, //课程模块
            zjlsCon: {}, //主讲老师
            bkclCon: {}, //备考材料
            bxflCon: {}, //伴学福利
            xxjlhCon: {}, //学员线下交流会
            xugsInfoCon: {}, //学员故事
            yljyLetterCon: {}, //写给优路教育的学员们
            kcysimgCon: {}, //课程优势 备考路上img
            summarycon: {},
            temp1: '',
            temp2: '',
            componentArr: [],
            imgWidth: 1200,
        };
    },
    fetch() {
        this.lessonintroduce = this.classtypeLessonintroduceAfter;
        if (this.classtypeLessonintroduceAfter.type !== 'img') {
            this.getData();
        }
        return Promise.resolve();
    },
    watch: {
        classtypeLessonintroduceAfter: {
            handler(val) {
                let vm = this;
                vm.lessonintroduce = val;
                if (val.type !== 'img') {
                    vm.getData();
                }
            },
            immediate: true,
            deep: true,
        },
    },
    methods: {
        //锚点跳转
        goAnchor(selector) {
            // 判断
            if (this.classtypeLessonintroduceAfter.type === 'img') {
                // 后台是把图片等比缩放到980px宽度后获取的定位高度，前台是把图片等比缩放到1200px宽度，所以从后台获取的锚点定位高度需要进行换算
                const endHeight = (this.imgWidth / 980) * selector;

                let obj = document.querySelector('#courserIntroTmplete');
                let iTop = -80; // 因为会出现浮动条
                while (obj !== window.document.body && obj !== null) {
                    iTop += obj.offsetTop;
                    obj = obj.offsetParent;
                }
                window.scrollTo(0, iTop + endHeight);
            } else {
                document.querySelector('#anchor-' + selector).scrollIntoView(true);
                const scrollTop = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
                window.scrollTo(0, scrollTop - 80);
            }
        },
        //获取数据
        getData() {
            let vm = this;
            if (vm.lessonintroduce && vm.lessonintroduce.length != 0) {
                let componentArrChild = [];
                vm.lessonintroduce.forEach((v, i) => {
                    //课程详情  视频和图片
                    if (v.type == 'video') {
                        vm.kcxqConVideo = v;
                        componentArrChild.push({ id: 'kcxq', datainfo: v });
                    }
                    if (v.type == 'img') {
                        vm.kcxqConImg = v;
                        componentArrChild.push({ id: 'cxdyimg', datainfo: v });
                    }
                    //课程优势 备考路上和领跑
                    if (v.type == 'temp11') {
                        vm.kcysCon = v;
                        componentArrChild.push({ id: 'kcys', datainfo: v });
                    }
                    //课程模块
                    if (v.type == 'temp4') {
                        vm.kcmkCon = v;
                        componentArrChild.push({ id: 'kcmk', datainfo: v });
                    }
                    //备考材料
                    if (v.type == 'temp6') {
                        vm.bkclCon = v;
                        componentArrChild.push({ id: 'bkcl', datainfo: v });
                    }
                    //伴学福利
                    if (v.type == 'temp7') {
                        vm.bxflCon = v;
                        componentArrChild.push({ id: 'bxfl', datainfo: v });
                    }
                    //学员线下交流会
                    if (v.type == 'temp8') {
                        vm.xxjlhCon = v;
                        componentArrChild.push({ id: 'xxjlh', datainfo: v });
                    }
                    //写给优路教育的学员们
                    if (v.type == 'temp9') {
                        vm.yljyLetterCon = v;
                        componentArrChild.push({ id: 'yljyLetter', datainfo: v });
                    }
                    //最后总结语
                    if (v.type == 'temp10') {
                        vm.summarycon = v;
                        componentArrChild.push({ id: 'sumtext', datainfo: v });
                    }
                    //优路故事
                    if (v.type == 'temp12') {
                        vm.xugsInfoCon = v;
                        componentArrChild.push({ id: 'xugsInfo', datainfo: v });
                    }
                    //课程优势 备考路上图片模板
                    if (v.type == 'temp13') {
                        vm.kcysimgCon = v;
                        componentArrChild.push({ id: 'kcysimg', datainfo: v });
                    }
                });
                vm.componentArr = componentArrChild;
            }
        },
        goTop() {
            window.scrollTo(0, 0);
        },
    },
};
</script>
<style scoped lang="less">
.courserIntros {
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 50px;
    border-radius: 16px;
    position: relative;
    .noData {
        text-align: center;
        padding-top: 50px;
        p {
            margin-top: 15px;
            font-size: 14px;
            color: #3a3d4b;
            line-height: 19px;
        }
    }
}

.point-box {
    position: absolute;
    top: 0;
    right: 1240px;

    &.fixed {
        padding-right: 40px;
        position: fixed;
        top: 100px;
        z-index: 9;
        right: auto;
        transform: translateX(-100%);
    }

    .content-wrap {
        padding-top: 136px;
        position: relative;
    }

    .title-img {
        box-sizing: border-box;
        width: 204px;
        height: 136px;
        margin: 0 auto;
        padding-top: 93px;
        background-image: url('./asset/images/intro-title-point.png');
        background-size: 100% 100%;
        font-size: 20px;
        color: #ffac00;
        text-align: center;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }

    .items-box {
        min-width: 140px;
        box-sizing: border-box;
        padding: 10px 8px 80px;
        background-color: #ffffff;
        border-radius: 30px 30px 100px 100px;
        box-shadow: 0px 0px 9px 0px rgba(255, 212, 119, 0.24), 0px 0px 7px 0px rgba(255, 220, 96, 0.2) inset;
        position: relative;
    }

    .point-item {
        padding: 0 10px;
        white-space: nowrap;
        line-height: 50px;
        font-size: 16px;
        color: #3a3d4b;
        text-align: center;
        border-radius: 25px;
        cursor: pointer;

        &:hover {
            color: #fff;
            font-weight: bold;
            background: linear-gradient(180deg, #ffd57b, #ffb92c);
        }
    }

    .top-btn {
        padding-top: 10px;
        background: url('./asset/images/top-ico.png') no-repeat center 0;
        background-size: 10px 10px;
        white-space: nowrap;
        font-size: 16px;
        font-weight: bold;
        color: #ffab00;
        position: absolute;
        bottom: 35px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
    }
}
.img-cont {
    /deep/ .yl-image-wrap-error,
    /deep/ .yl-image-wrap-loading {
        height: 300px;
    }
}

@media screen and (min-width: 1400px) and (max-width: 1500px) {
    .point-box.fixed {
        left: 210px;
    }
}
@media screen and (max-width: 1400px) {
    .point-box.fixed {
        left: 200px;
    }
}
</style>
