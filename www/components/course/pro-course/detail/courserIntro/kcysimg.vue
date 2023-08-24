<template>
    <!-- 课程优势 -->
    <div :class="['kcysInfo', propsData != undefined && !propsData.title ? '' : 'plr30']" v-if="propsData != undefined">
        <!-- 1备考路上 -->
        <div class="bkls">
            <div class="bklsTop" v-if="propsData.title">
                <span class="topNumber">
                    {{ propsData.num }}
                    <i></i>
                </span>
                <span class="topText">
                    {{ propsData.title }}
                </span>
            </div>
            <div class="bklsContent">
                <img style="width: 100%; height: 100%" :src="propsData.src | fileParse" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'kcysimg',
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
    mounted() {},
    methods: {},
};
</script>
<style lang="less" scoped>
.plr30 {
    padding: 30px !important;
}
.kcysInfo {
    padding: 0;
    margin: 20px 30px 0 0;
    border-radius: 2px;
    background-color: #fff;
    .bkls {
        text-align: center;
        .bklsTop {
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
        }
        .bklsContent {
            margin-top: 20px;
            position: relative;
            // width:1040px;
            min-width: 980px;
            // height:640px;
            min-height: 200px;
            .con_left {
                float: left;
                div {
                    width: 702px;
                    height: 149px;
                    // line-height:149px;
                    .leftText {
                        font-size: 26px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #fff;
                        float: left;
                        width: 180px;
                        line-height: 109px;
                        letter-spacing: 4px;
                        height: 109px;
                        margin-top: 40px;
                        box-sizing: border-box;
                        padding: 0 40px 0 20px;
                        display: inline-block;
                        span {
                            font-weight: bold;
                            line-height: 30px;
                        }
                    }
                    .twospan {
                        line-height: 32px;
                        padding-top: 20px;
                        text-align: left;
                    }
                    .rightText {
                        font-size: 18px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #282828;
                        float: left;
                        margin-left: 40px;
                        width: 385px;
                        height: 110px;
                        text-align: left;
                        margin-top: 20px;
                        line-height: 110px;
                        border: 1px solid transparent;
                        span {
                            display: inline-block;
                            line-height: 30px;
                            margin-top: 25px;
                        }
                    }
                }
                .kcys_huang {
                    background: url('./asset/images/kcys_huang.png') no-repeat;
                    background-size: 100% 100%;
                }
                .kcys_lan {
                    background: url('./asset/images/kcys_lan.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
            .con_right {
                float: right;
                width: 310px;
                height: 546px;
                background: url('./asset/images/kcys_right.png') no-repeat;
                background-size: 100% 100%;
                position: absolute;
                bottom: 0;
                right: -20px;
                div {
                    width: 198px;
                    text-align: left;
                    position: absolute;
                    bottom: 74px;
                    right: 30px;
                    box-sizing: border-box;
                    padding: 0px 18px;
                    p {
                        font-size: 18px;
                        font-family: Source Han Sans CN;
                        font-style: italic;
                        color: #333;
                        line-height: 30px;
                        letter-spacing: 1px;
                    }
                }
            }
        }
    }
}
</style>
