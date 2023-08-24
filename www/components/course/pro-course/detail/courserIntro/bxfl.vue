<template>
    <!-- 伴学福利 -->
    <div class="bxflInfo" v-if="propsData != undefined">
        <div class="bxfl">
            <div class="bxflTop">
                <span class="topNumber">
                    {{ propsData.num }}
                    <i></i>
                </span>
                <span class="topText">
                    {{ propsData.title }}
                </span>
                <div class="topCornor">
                    <span></span>
                    <span>{{ propsData.subtitle }}</span>
                    <span></span>
                </div>
            </div>
            <div class="bxflCon">
                <div class="conTop">
                    <p>{{ propsData.title2 }}</p>
                </div>
                <div class="conBody">
                    <ul v-if="propsData.dataList != undefined">
                        <li v-for="item in propsData.dataList" :key="item.a">
                            <div class="top">
                                <p>{{ item.title }}</p>
                            </div>
                            <div class="bottom">
                                <p>{{ item.introduce }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'bxfl',
    components: {},
    filters: {
        filterN(val) {
            let value = val.replace(/↵/g, '<br/>');
            return value;
        },
    },
    propsData: {
        type: Object,
        default: () => {},
    },
    data() {
        return {
            imgSrc: '',
            bxflCon: '',
        };
    },
    watch: {
        propsData(val) {
            let vm = this;
            vm.propsData = val;
            vm.bxflCon = val;
        },
    },
    mounted() {
        let vm = this;
        if (vm.propsData) {
            vm.bxflCon = vm.propsData;
        }
    },
    methods: {},
};
</script>
<style lang="less" scoped>
.bxflInfo {
    padding: 30px 20px 50px 12px;
    margin: 20px 30px 0 0;
    border-radius: 2px;
    background-color: #fff;
    .bxfl {
        text-align: center;
        .bxflTop {
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
        .bxflCon {
            .conTop {
                width: 1008px;
                height: 164px;
                background: url('./asset/images/zjls_top.png') no-repeat -7px 0;
                display: flex;
                justify-content: center;
                align-items: center;
                p {
                    font-size: 20px;
                    font-family: Source Han Sans CN;
                    font-weight: bold;
                    font-style: italic;
                    color: #626feb;
                    // line-height:30px;
                    margin-left: 80px;
                    letter-spacing: 0.8px;
                    margin-top: 12px;
                }
            }
            .conBody {
                width: 100%;
                ul {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    li {
                        width: 340px;
                        height: 460px;
                        .top {
                            width: 100%;
                            height: 72px;
                            line-height: 72px;
                            margin-top: 34px;
                            p {
                                font-size: 20px;
                                font-family: Source Han Sans CN;
                                font-weight: bold;
                                color: #fff;
                                text-shadow: 0px 0px 5px rgba(11, 26, 175, 0.3);
                            }
                        }
                        .bottom {
                            padding: 30px;
                            text-align: left;
                            p {
                                font-size: 18px;
                                font-family: Source Han Sans CN;
                                font-weight: 400;
                                color: #333;
                                line-height: 28px;
                                letter-spacing: 0.2px;
                                white-space: pre-wrap;
                            }
                        }
                    }

                    li:nth-child(1) {
                        background: url('./asset/images/bxfl_01.png') no-repeat;
                        .bottom {
                            p {
                                font-size: 16px;
                            }
                        }
                    }
                    li:nth-child(2) {
                        background: url('./asset/images/bxfl_02.png') no-repeat;
                    }
                    li:nth-child(3) {
                        background: url('./asset/images/bxfl_03.png') no-repeat;
                    }
                }
            }
        }
    }
}
</style>
