<!-- 没有班级card-->
<template>
    <div class="my-class-card">
        <div class="clearfix class-List-box">
            <div class="class-List-box-left">
                <div class="class-Img">
                    <img class="img" :src="$urlUtils.getViewUrl(expiredClass.classCoverpic)" @error="errorFn" v-if="expiredClass.classCoverpic" />
                    <img class="img" :src="imgUrl" v-else />

                    <div
                        v-if="expiredClass.studentclassBizsrctype == 'O' && expiredClass.classtypePypcount && expiredClass.classtypePypcount != '一'"
                        class="common-period"
                    >
                        共{{ expiredClass.classtypePypcount }}考期
                    </div>
                </div>
                <div class="validity-date">
                    <div class="termvalidity">
                        <span>
                            <span v-if="expiredClass.studentclassBizsrctype == 'O' && expiredClass.pypSeq && expiredClass.classtypePypcount != '一'">
                                第{{ expiredClass.pypSeq }}考期
                            </span>
                            有效期至：{{ expiredClass.studentclassExpiredate }}
                        </span>
                    </div>
                    <div class="underline"></div>
                </div>
            </div>
            <div class="class-List-box-right">
                <div class="class-List-box-right-top">
                    <div class="title">
                        <h3>
                            <span v-if="expiredClass.studentclassGift == 'Y'">赠</span>
                            <span v-if="expiredClass.studentclassGift != 'Y' && expiredClass.ctapName" class="periods-num">{{ expiredClass.ctapName }}</span>
                            {{ expiredClass.className }}
                        </h3>
                    </div>
                </div>
                <!--<div class="class-List-box-right-bottom">
                    <div class="class-Info cursor" @click="toAttendanceRecord(expiredClass)">
                        <div class="icon"><img src="./asset/images/icon-learned-time.png" /></div>
                        <div class="num">
                            <h3>{{ expiredClassStatistics ? expiredClassStatistics.ucarLasttime : '-' }}</h3>
                            <el-popover trigger="hover" content="点击可查看班级下所有听课记录" popper-class="el-popover1">
                                <p slot="reference">听课记录</p>
                            </el-popover>
                        </div>
                    </div>
                </div>-->
            </div>
        </div>
    </div>
</template>
<script>
const imgUrl = require('../imgs/icon-default-class.png');
export default {
    name: 'course-past-card',
    props: {
        expiredClass: {
            type: Object,
            required: true,
        },
        expiredClassStatistics: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            imgUrl,
        };
    },
    methods: {
        toAttendanceRecord(item) {
            this.$PageUtil.openNewPage(`/learningCenter/index/attendanceRecord/${item.classId}?className=${item.className}`);
        },
        errorFn(e) {
            var img = e.srcElement;
            img.src = this.imgUrl;
            img.onerror = null;
        },
    },
};
</script>
<style lang="less" scoped>
.my-class-card {
    background: #fff;
    padding: 32px 24px 32px 24px;
    position: relative;
    margin-bottom: 18px;
    /*width: 1200px;
    height: 265px;*/
    border-radius: 4px;
    .ask-study-report {
        position: absolute;
        right: 0;
        bottom: 40px;
        width: 144px;
        height: 36px;
        background: rgba(251, 135, 21, 0.1);
        border-radius: 18px 0px 0px 18px;
        font-size: 14px;
        cursor: pointer;
        .asr-icon {
            box-sizing: border-box;
            background: url('../imgs/icon-asr.png') no-repeat center right 15px;
            display: inline-block;
            width: 140px;
            height: 36px;
            padding-left: 16px;
            color: #fa6400;
            line-height: 36px;
        }
    }
    .clearfix:after {
        content: '';
        clear: both;
        display: block;
    }
    .class-List-box {
        box-sizing: border-box;
        .class-List-box-left {
            float: left;
            /*border-right: 1px dashed rgba(0, 0, 0, 0.05);*/
            /*padding-right: 30px;*/
            /* margin: 5px 0 0 0px;*/
            .class-Img {
                box-sizing: border-box;
                /*width: 272px;
                height: 176px;*/
                border-radius: 8px;
                display: block;
                /*padding: 8px;*/
                /*box-shadow: 0px 4px 9px 1px rgba(26, 39, 90, 0.1);*/
                position: relative;
                cursor: pointer;

                .continue-study {
                    width: 76px;
                    height: 24px;
                    background: linear-gradient(135deg, #ffa8ad, #f8323c);
                    border-radius: 6px 0px 6px 0px;
                    position: absolute;
                    left: 0;
                    top: 0;
                    line-height: 24px;
                    color: #fff;
                    font-size: 12px;
                    text-align: center;
                    float: left;
                    margin-right: 10px;
                }

                .common-period {
                    box-sizing: border-box;
                    width: 256px;
                    height: 30px;
                    line-height: 30px;
                    opacity: 0.7;
                    background: #000000;
                    border-radius: 0px 0px 6px 6px;
                    position: absolute;
                    bottom: 8px;
                    color: #ffffff;
                    color: #fff;
                    text-align: center;
                }
            }

            .class-Img .img {
                width: 260px;
                height: 169px;
                border-radius: 6px;
                object-fit: cover;
                display: block;
            }

            .class-Img .pop {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 1);
                opacity: 0.7;
                border-radius: 6px;
                z-index: 0;
            }

            .class-Img .popCon {
                position: absolute;
                z-index: 1;
                text-align: center;
                width: 272px;
                height: 176px;
                top: 0;
                left: 0;
                cursor: pointer;
            }

            .class-Img .popCon dt {
                margin: 45px 0 20px;
            }

            .class-Img .popCon dd {
                font-size: 22px;
                color: #fff;
            }

            .validity-date {
                margin-top: 15px;
                position: relative;
                text-align: center;
                height: 20px;
            }

            .validity-date .termvalidity {
                position: absolute;
                z-index: 1;
                left: -5px;
                width: 272px;
                text-align: center;
            }

            .validity-date .termvalidity > span {
                display: inline-block;
                color: #99a1af;
                font-size: 14px;
                background: #fff;
                padding: 0 10px;
            }
            .underline {
                position: absolute;
                top: 10px;
                left: 0;
                background: rgba(0, 0, 0, 0.1);
                height: 1px;
                width: 100%;
                z-index: 0;
            }
        }
        .class-List-box-right {
            float: left;
            margin-left: 24px;
            width: 852px;
        }

        .class-List-box-right-top {
            /*border-bottom: 1px dashed rgba(0, 0, 0, 0.05);*/
            overflow: hidden;
            height: 93px;
        }

        .class-List-box-right-top .title {
            float: left;
            width: 90%;
            margin-top: 12px;
        }

        .class-List-box-right-top .title h3 {
            font-weight: normal;
            font-size: 18px;
            cursor: pointer;
            display: inline-block;
        }

        .class-List-box-right-top .title h3 span {
            width: 20px;
            height: 20px;
            background: linear-gradient(0deg, rgba(255, 109, 88, 1) 0%, rgba(253, 28, 18, 1) 100%);
            border-radius: 2px;
            color: #fff;
            font-size: 16px;
            text-align: center;
            line-height: 20px;
            display: inline-block;
            margin-right: 10px;
        }

        .class-List-box-right-top .title h3 .periods-num {
            width: 60px;
            height: 20px;
            background: linear-gradient(#ff4436 0%, #f96b54 100%);
            border-radius: 2px;
            color: #fff;
            font-size: 16px;
            text-align: center;
        }
        .class-List-box-right-bottom {
            overflow: hidden;
        }
        .class-Info {
            float: left;
            margin: 35px 32px 0 0;
        }

        .cursor {
            cursor: pointer;
        }
        .class-Info .icon {
            img {
                width: 40px;
                height: 40px;
            }
            float: left;
            margin-right: 15px;
        }

        .class-Info .num {
            float: left;
        }

        .class-Info .num h3 {
            font-weight: normal;
            font-size: 18px;
            color: #3a3d4b;
            font-weight: 700;
            /*height: 30px;*/
        }

        .class-Info .num h3 .txt {
            font-size: 12px;
        }

        .class-Info .num p,
        .class-Info.num .popover {
            color: #99a1af;
            font-size: 12px;
        }
    }
}
</style>
<style lang="less">
.el-popover1 {
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    min-width: 150px;
    border-radius: 8px;
    border: 1px solid #ebeef5;
    padding: 14px 24px;
    z-index: 2000;
    line-height: 1.4;
    text-align: justify;
    font-size: 12px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    word-break: break-all;
    color: #ffffff;

    .popper__arrow,
    .popper__arrow::after {
        border-bottom-color: #666666 !important;
    }
}
</style>
