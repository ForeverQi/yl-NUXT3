<template>
    <!-- 课程优势 -->
    <div class="kcmsInfo">
        <!-- 1备考路上 -->
        <div class="kcms" v-if="kcmkCon != undefined">
            <div class="kcmsTop">
                <span class="topNumber">
                    {{ kcmkCon.num }}
                    <i></i>
                </span>
                <span class="topText">
                    <!-- <span>课程模块</span> -->
                    {{ kcmkCon.title }}
                </span>
                <div class="topCornor">
                    <span></span>
                    <span>{{ kcmkCon.subtitle }}</span>
                    <span></span>
                </div>
            </div>
            <div class="kcmkCon">
                <div class="kcmkTop">
                    <p>{{ kcmkCon.title2 }}</p>
                </div>
                <!-- 夯实基础 -->
                <div class="hsjc" v-for="(item, index) in kcmkCon.content" :key="item.a">
                    <div :class="['hsjcTop', index % 2 == 0 ? 'backLan' : 'backHuang']">
                        <div class="leftText">
                            <p>{{ item.title }}</p>
                        </div>
                        <div class="rightText">
                            <p>
                                <!-- <span>（共计54学时）</span> -->
                                {{ item.desc }}
                            </p>
                        </div>
                        <!-- <span class="zeng"></span> -->
                    </div>
                    <div class="hsjcCon">
                        <ul>
                            <li v-for="item_child in item.moduleList" :key="item_child.a">
                                <div class="liTop">
                                    <!-- 网课 -->
                                    <p v-if="item_child.moduleType == 'WK'" class="wangkeBorder">{{ item_child.moduleName }}</p>
                                    <!-- 习题课 -->
                                    <p v-if="item_child.moduleType == 'XT'" class="xitikeBorder">{{ item_child.moduleName }}</p>
                                    <!-- 直播课 -->
                                    <p v-if="item_child.moduleType == 'ZB'" class="zhibokeBorder">{{ item_child.moduleName }}</p>
                                    <!-- 线上-->
                                    <p v-if="item_child.moduleType == 'XS'" class="xianshangBorder">{{ item_child.moduleName }}</p>
                                    <!-- 面授 -->
                                    <p v-if="item_child.moduleType == 'MS'" class="mianshouBorder">{{ item_child.moduleName }}</p>

                                    <p>{{ item_child.moduleDesc }}</p>
                                </div>
                                <p class="keshi">
                                    <span>{{ item_child.moduleCount }}</span>
                                    <span></span>
                                </p>
                                <!-- 网课 -->
                                <span v-if="item_child.moduleType == 'WK'" class="kebiao wangkeflag"></span>
                                <!-- 习题课 -->
                                <span v-if="item_child.moduleType == 'XT'" class="kebiao xitikeflag"></span>
                                <!-- 直播课 -->
                                <span v-if="item_child.moduleType == 'ZB'" class="kebiao zhibokeflag"></span>
                                <!-- 线上-->
                                <span v-if="item_child.moduleType == 'XS'" class="kebiao xianshangflag"></span>
                                <!-- 面授 -->
                                <span v-if="item_child.moduleType == 'MS'" class="kebiao mianshouflag"></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'kcysInfo',
    components: {},
    propsData: {
        type: Object,
        default: () => {},
    },
    data() {
        return {
            kcmkCon: '',
        };
    },
    watch: {
        propsData(val) {
            let vm = this;
            vm.propsData = val;
            vm.kcmkCon = val;
        },
    },
    mounted() {
        let vm = this;
        if (vm.propsData) {
            vm.kcmkCon = vm.propsData;
        }
    },
    methods: {},
};
</script>
<style lang="less" scoped>
.kcmsInfo {
    padding: 30px 0 50px 30px;
    margin: 20px 30px 0 0;
    border-radius: 2px;
    background-color: #fff;
    // width:100%;
    // box-sizing: border-box;

    // 学员故事
    .kcms {
        text-align: center;
        .kcmsTop {
            color: #333333;
            font-size: 40px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            text-align: center;
            line-height: 92px;
            display: inline-block;
            .topNumber {
                color: #fbf1f2;
                width: 36px;
                height: 36px;
                line-height: 36px;
                display: inline-block;
                background: linear-gradient(0deg, rgba(177, 195, 255, 1) 0%, rgba(97, 111, 235, 1) 100%);
                position: relative;
                margin-right: 20px;
                i {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(0deg, rgba(177, 195, 255, 1) 0%, rgba(97, 111, 235, 1) 100%);
                    opacity: 0.2;
                    position: absolute;
                    bottom: -10px;
                    right: -10px;
                }
            }
            .topText {
                span {
                    font-weight: 700;
                    color: #626feb;
                }
            }
            .topCornor {
                height: 20px;
                display: flex;
                justify-content: center;
                width: 100%;
                span:nth-child(1) {
                    width: 130px;
                    height: 18px;
                    float: left;
                    background: url('./asset/images/cornor_left.png') no-repeat;
                    // margin-right: 20px;
                }
                span:nth-child(2) {
                    font-size: 18px;
                    font-family: Source Han Sans CN;
                    font-weight: 400;
                    color: #666;
                    line-height: 14px;
                    float: left;
                    padding: 0 15px;
                }
                span:nth-child(3) {
                    width: 130px;
                    height: 18px;
                    float: left;
                    background: url('./asset/images/cornor_right.png') no-repeat;
                    // margin-left: 20px;
                }
            }
        }
        .kcmkCon {
            .kcmkTop {
                width: 1008px;
                height: 164px;
                background: url('./asset/images/kcmk_top.png') no-repeat -7px 0;
                display: flex;
                justify-content: center;
                align-items: center;
                p {
                    font-size: 22px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    font-style: italic;
                    color: #626feb;
                    line-height: 30px;
                    letter-spacing: 5px;
                    margin-left: -120px;
                    margin-top: 15px;
                }
            }
            // 蓝底
            .backLan {
                background: url('./asset/images/kcmk_lan.png') no-repeat -12px 0;
            }
            .backHuang {
                background: url('./asset/images/kcmk_huang.png') no-repeat -12px 0;
            }
            //网课
            .wangkeBorder {
                border-bottom: 6px solid #93a5ff;
            }
            .wangkeflag {
                background: url('./asset/images/wangke.png') no-repeat 0 0;
            }
            //习题课
            .xitikeBorder {
                border-bottom: 6px solid #f1c479;
            }
            .xitikeflag {
                background: url('./asset/images/xitike.png') no-repeat 0 0;
            }
            //面授
            .mianshouBorder {
                border-bottom: 6px solid #88e8c8;
            }
            .mianshouflag {
                background: url('./asset/images/mianshou.png') no-repeat 0 0;
            }
            //线上
            .xianshangBorder {
                border-bottom: 6px solid #cdabf0;
            }
            .xianshangflag {
                background: url('./asset/images/xianshang.png') no-repeat 0 0;
            }
            //直播课
            .zhibokeBorder {
                border-bottom: 6px solid #fca27d;
            }
            .zhibokeflag {
                background: url('./asset/images/zhiboke.png') no-repeat 0 0;
            }
            .hsjc {
                .hsjcTop {
                    width: 1000px;
                    height: 150px;
                    // background: url('./asset/images/kcmk_lan.png') no-repeat -12px 0;
                    position: relative;

                    .leftText {
                        width: 112px;
                        height: 124px;
                        float: left;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 0 16px;
                        box-sizing: border-box;
                        margin-top: 14px;
                        p {
                            font-size: 28px;
                            font-family: Source Han Sans CN;
                            font-weight: bold;
                            color: #fff;
                            line-height: 32px;
                            text-shadow: 0px 2px 5px rgba(97, 112, 235, 0.5);
                        }
                    }
                    .rightText {
                        width: 868px;
                        height: 124px;
                        float: left;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-sizing: border-box;
                        margin-top: 14px;
                        text-align: left;
                        p {
                            font-size: 18px;
                            font-family: Source Han Sans CN;
                            color: #333333;
                            line-height: 30px;
                            letter-spacing: 0.4px;
                            width: 734px;
                            span {
                                color: #626feb;
                            }
                        }
                    }
                    .zeng {
                        display: inline-block;
                        width: 58px;
                        height: 70px;
                        background: url('./asset/images/zeng.png') no-repeat;
                        position: absolute;
                        right: 60px;
                        top: 18px;
                    }
                }
                .hsjcCon {
                    padding-right: 30px;
                    ul {
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        li {
                            width: 478px;
                            height: 206px;
                            background: #fff;
                            box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.06);
                            border-radius: 10px;
                            margin: 5px 0 10px 0;
                            box-sizing: border-box;
                            text-align: left;
                            position: relative;
                            .liTop {
                                height: 143px;
                                box-sizing: border-box;
                                padding: 30px 0 0 30px;
                                border-bottom: 1px solid rgba(0, 0, 0, 0.06);
                                p:nth-child(1) {
                                    font-size: 24px;
                                    font-family: Source Han Sans CN;
                                    font-weight: bold;
                                    color: #333;
                                    line-height: 14px;
                                    display: inline-block;
                                    // border-bottom:6px solid #93A5FF;
                                    box-sizing: border-box;
                                }

                                p:nth-child(2) {
                                    width: 368px;
                                    font-size: 16px;
                                    font-family: Source Han Sans CN;
                                    font-weight: 400;
                                    color: #333;
                                    line-height: 26px;
                                    letter-spacing: 0.5px;
                                    margin-top: 20px;
                                }
                            }

                            .keshi {
                                line-height: 62px;
                                span:nth-child(1) {
                                    display: inline-block;
                                    float: left;
                                    font-size: 20px;
                                    font-family: Source Han Sans CN;
                                    font-weight: 500;
                                    color: #333;
                                    margin-left: 30px;
                                }
                                span:nth-child(2) {
                                    font-size: 20px;
                                    font-family: Source Han Sans CN;
                                    display: inline-block;
                                    font-weight: 400;
                                    color: #666;
                                    float: right;
                                    margin-right: 30px;
                                }
                            }
                            .kebiao {
                                display: inline-block;
                                width: 93px;
                                height: 90px;
                                position: absolute;
                                right: 0;
                                top: 0;
                                border-radius: 0 10px 0 0;
                                // background: url('./asset/images/xitike.png') no-repeat 0 0;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
