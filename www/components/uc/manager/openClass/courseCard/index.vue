<template>
    <div class="courseCard-wrap" v-bounce>
        <img src="./asset/images/overdue@2x.png" alt="" class="passTimeImg" v-if="courseDetail.courseStatus == 'N'" />
        <div class="tejia" v-show="courseDetail.coursePromotiontype != 'N' && editStatus">{{ courseDetail.coursePromotiontype | coursePromotiontype }}</div>
        <div class="itemTop">
            <div class="checkFrame" v-show="!editStatus" :class="{ active: courseDetail.active }"></div>
            <div class="classTitle">{{ courseDetail.courseName }}</div>
            <div class="subheading">
                共
                <span v-show="courseDetail.courseLevel == 2">{{ courseDetail.coursestatChapternum }}篇，</span>
                {{ courseDetail.coursestatClassnum }}节课
            </div>
            <div class="teachers">
                <div class="teacherItem" v-for="it in courseDetail.teacherList" :key="it.a">
                    <img class="teacherImg" :src="$nuxt.$niceloo.path.getServerFileViewPath(it.teacherImage)" alt="" />
                    <!-- <img class="teacherImg" :src="UrlUtil.getViewUrl(it.teacherImage)" alt="" /> -->
                    <div class="teacherName">{{ it.userName }}</div>
                </div>
            </div>
            <!-- 促销显示促销价格coursePromotiontype N:无促销;F:限时免费;L:限时特价;S特价 -->
            <!--                        <div v-if='courseDetail.coursePromotiontype == "N"'>-->
            <!--                            <div class="classPrice" v-if='courseDetail.coursePrice == 0'>免费</div>-->
            <!--                            <div class="classPrice" v-else>¥{{courseDetail.coursePrice|veMoneyCent}}</div>-->
            <!--                        </div>-->
            <!--                        <div v-else>-->
            <!--                            <div class="classPrice" v-if='courseDetail.coursePromotionprice == 0'>免费</div>-->
            <!--                            <div class="classPrice" v-else>-->
            <!--                                <span class="yuanjia">-->
            <!--                                    原价：{{courseDetail.coursePrice|veMoneyCent}}-->
            <!--                                </span>-->
            <!--                                ¥{{courseDetail.coursePromotionprice|veMoneyCent}}-->
            <!--                            </div>-->
            <!--                        </div>-->
        </div>
        <div class="liBot">
            <!--<div class="listenedNumber">{{courseDetail.coursestatStudynum}}人已学</div>-->
            <div class="botRight">
                <div class="openTime" v-show="courseDetail.coursestatLivestatus != '3'">{{ courseDetail.coursestatLivestarttime }}</div>
                <div class="openType pic" v-show="courseDetail.coursestatLivestatus == '1'"></div>
                <div class="openType" v-show="courseDetail.coursestatLivestatus == '2'">即将开始</div>
                <div class="openType" v-show="courseDetail.coursestatLivestatus == '3'">可回放</div>
                <div class="openType" v-show="courseDetail.coursestatLivestatus == '4'">已结束</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    filters: {
        coursePromotiontype(val) {
            let obj = {
                F: '限时免费',
                L: '限时特价',
                S: '特价',
            };
            if (val) {
                return obj[val];
            }
            return '';
        },
    },
    directives: {
        bounce: {
            bind(el, binding, vnode) {
                const direction = binding.value;
                let transform = '';
                switch (direction) {
                    case 'up':
                        transform = 'translate3d(0, -5px, 0)';
                        break;
                    case 'down':
                        transform = 'translate3d(0, 5px, 0)';
                        break;
                    case 'left':
                        transform = 'translate3d(-5px, 0px, 0)';
                        break;
                    case 'right':
                        transform = 'translate3d(5px, 0px, 0px)';
                        break;
                    default:
                        transform = 'translate3d(0, -5px, 0px)';
                }
                el.onmouseover = (e) => {
                    el.style.transform = transform;
                    el.style.boxShadow = '0 7px 14px #cecece';
                    el.style.transition = 'all linear 0.2s';
                };
                el.onmouseout = () => {
                    el.style.transform = '';
                    el.style.boxShadow = 'none';
                    el.style.transition = 'all linear 0.2s';
                };
            },
        },
    },
    props: {
        courseDetail: {
            type: Object,
            default: () => {
                return {};
            },
        },
        editStatus: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            // fileViewUrl: process.env.config.fileViewUrl,
        };
    },
};
</script>

<style scoped lang="less">
.courseCard-wrap {
    border: 1px solid rgb(238, 238, 238);
    position: relative;
    .passTimeImg {
        width: 100px;
        position: absolute;
        z-index: 1;
        top: 0px;
        left: 0px;
    }
    .itemTop {
        height: 160px;
        position: relative;
        padding: 18px 20px 12px;
        border-bottom: 1px solid rgba(238, 238, 238, 1);
    }
    .checkFrame {
        height: 20px;
        width: 20px;
        position: absolute;
        right: 8px;
        top: 8px;
        background: url('./asset/images/check@2x.png') no-repeat 0 0 / cover;
        &.active {
            background-image: url('./asset/images/check_active@2x.png');
        }
    }
    .classTitle {
        cursor: pointer;
        line-height: 25px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        width: 350px;
    }
    .subheading {
        font-size: 14px;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 21px;
    }
    .teachers {
        position: absolute;
        left: 20px;
        bottom: 12px;
        display: flex;
    }
    .teacherItem {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 14px;
        .teacherImg {
            height: 40px;
            width: 40px;
            border-radius: 50%;
            margin: 0 auto;
        }
        .teacherName {
            text-align: center;
            font-size: 12px;
            color: rgba(102, 102, 102, 1);
        }
    }
    .classPrice {
        position: absolute;
        right: 20px;
        bottom: 12px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(235, 52, 52, 1);
    }
    .liBot {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        .botRight {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .openTime {
            padding-left: 15px;
            background: url('./asset/images/clock@2x.png') no-repeat 0 center / 12px 12px;
            margin-right: 8px;
        }
        .openType {
            width: 60px;
            height: 18px;
            text-align: center;
            line-height: 18px;
            border: 1px solid rgba(249, 107, 84, 1);
            opacity: 0.6;
            border-radius: 2px;
            font-size: 12px;
            font-weight: 400;
            color: rgba(249, 107, 84, 1);
            &.pic {
                opacity: 1;
                background: url('./asset/images/liveing@2x.png') no-repeat 0 center / cover;
            }
        }
    }
    .yuanjia {
        margin-right: 8px;
        color: #999999;
        font-size: 10px;
        text-decoration: line-through;
    }
    .tejia {
        margin-top: 2px;
        margin-right: 2px;
        float: right;
        font-size: 12px;
        color: #fff;
        padding: 5px 8px;
        background-image: linear-gradient(to right, #ff4436, #f96a54);
        background: linear-gradient(90deg, #ff4436 0%, #f96b54 100%);
        box-shadow: 0px 3px 8px 0px rgba(255, 69, 55, 0.2);
        border-radius: 10px 0px 10px 10px;
    }
}
</style>
