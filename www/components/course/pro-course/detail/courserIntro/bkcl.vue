<template>
    <!-- 备考材料 -->
    <div class="bkclInfo">
        <div class="bkcl" v-if="bkclCon != undefined">
            <div class="bkclTop">
                <span class="topNumber">
                    {{ bkclCon.num }}
                    <i></i>
                </span>
                <span class="topText">
                    <!-- <span>资料包</span> -->
                    {{ bkclCon.title }}
                </span>
                <div class="topCornor">
                    <span></span>
                    <span>{{ bkclCon.subtitle }}</span>
                    <span></span>
                </div>
            </div>
            <div class="bkclCon">
                <div class="conTop">
                    <p>{{ bkclCon.title2 }}</p>
                </div>
                <div class="conBody">
                    <ul>
                        <li
                            :class="activeFlag == index ? 'active' : ''"
                            v-for="(item, index) in bkclCon.dataList"
                            @click="tabChange(item, index)"
                            :key="item.a"
                        >
                            {{ item.dataType }}
                        </li>
                    </ul>
                </div>
                <div class="conFoot">
                    <div class="footLeft">
                        <img :src="activeItem.img | fileParse" />
                        <span class="six_img_ab">
                            <img src="./asset/images/six_002.png" />
                        </span>
                    </div>
                    <div class="footRight">
                        <p>{{ activeItem.dataType }}</p>
                        <!-- <p class="xueke">全科班包含：<span>3本</span></p>
						<p class="xueke">单科班包含：<span>该学科</span></p> -->
                        <p class="content">{{ activeItem.introduce }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- {{propsData}} -->
    </div>
</template>
<script>
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
export default {
    name: 'bkclInfo',
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
        return {
            activeFlag: 0,
            // tabList:[
            // 	{name:'《考点精讲教案》'},
            // 	{name:'《历年真题详解》'},
            // 	{name:'《高频考点串讲》'},
            // 	{name:'《2020仿真预测试卷》'},
            // 	{name:'《考前集训秘笈》'},
            // ],
            activeItem: '',
            bkclCon: '',
        };
    },
    watch: {
        propsData(val) {
            let vm = this;
            vm.propsData = val;
            vm.bkclCon = val;
            vm.tabChange(vm.bkclCon.dataList[0], 0);
        },
    },
    mounted() {
        let vm = this;
        if (vm.propsData) {
            vm.bkclCon = vm.propsData;
            vm.tabChange(vm.bkclCon.dataList[0], 0);
        }
    },
    methods: {
        tabChange(item, i) {
            let vm = this;
            vm.activeFlag = i;
            vm.activeItem = item;
        },
    },
};
</script>
<style lang="less" scoped>
.bkclInfo {
    padding: 30px 0 50px 30px;
    margin: 20px 30px 0 0;
    border-radius: 2px;
    background-color: #fff;
    .bkcl {
        text-align: center;
        .bkclTop {
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
                // white-space: pre-wrap;
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
                    white-space: pre-wrap;
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
        .bkclCon {
            .conTop {
                width: 1008px;
                height: 164px;
                background: url('./asset/images/bkcl_top.png') no-repeat -7px 0;
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
                    margin-left: -125px;
                }
            }
            .conBody {
                ul {
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    li {
                        padding: 25px 10px 30px;
                        font-size: 20px;
                        font-family: Source Han Sans CN;
                        font-weight: bold;
                        color: #666;
                        line-height: 30px;
                        border-radius: 10px 10px 0px 0px;
                        background: #fff;
                        margin-left: 4px;
                        cursor: pointer;

                        &.active {
                            color: #fff;
                            background: url(./asset/images/bkcl_tab_bgc.png) no-repeat 0 0 / cover;
                            z-index: 1;
                        }
                    }
                }
            }
            .conFoot {
                width: 980px;
                height: 500px;
                border-top: 1px solid rgba(0, 0, 0, 0.05);
                background: #fff;
                box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.06);
                position: relative;
                top: -10px;

                .footLeft {
                    float: left;
                    width: 47%;
                    margin-top: 50px;
                    position: relative;
                    img {
                        width: 440px;
                        height: 440px;
                    }
                    .six_img_ab {
                        display: block;
                        width: 100%;
                        position: absolute;
                        top: 36%;
                        left: 0;
                        animation: ballon 2s linear infinite;
                        -webkit-animation: ballon 2s linear infinite;
                        img {
                            border: none;
                            vertical-align: middle;
                            display: block;
                            max-width: 100%;
                            height: auto;
                            margin-left: 30px;
                            object-fit: cover;
                        }
                    }
                }
                .footRight {
                    float: left;
                    margin-top: 190px;
                    margin-left: 100px;
                    text-align: left;
                    p:nth-child(1) {
                        font-size: 24px;
                        font-family: Source Han Sans CN;
                        font-weight: 500;
                        color: #333;
                        line-height: 10px;
                        margin-bottom: 30px;
                        box-sizing: border-box;
                        border-bottom: 8px solid #ffce7d;
                        display: inline-block;
                    }
                    .xueke {
                        font-size: 18px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #666;
                        line-height: 36px;
                        span {
                            color: #333;
                        }
                    }
                    .content {
                        white-space: pre-wrap;
                        width: 394px;
                        font-size: 16px;
                        font-family: Source Han Sans CN;
                        font-weight: 400;
                        color: #333;
                        line-height: 28px;
                    }
                }
            }
        }
        @keyframes ballon {
            0% {
                -webkit-transform: translateY(0);
                opacity: 0;
            }
            50% {
                -webkit-transform: translateY(-30px);
                opacity: 1;
            }
            100% {
                -webkit-transform: translateY(-50px);
                opacity: 0;
            }
        }
        @-webkit-keyframes ballon {
            0% {
                -webkit-transform: translateY(0);
                opacity: 0;
            }
            50% {
                -webkit-transform: translateY(-30px);
                opacity: 1;
            }
            100% {
                -webkit-transform: translateY(-50px);
                opacity: 0;
            }
        }
    }
}
</style>
