<template>
    <li>
        <a :href="`/free-course/detail/${item.goodsId}`" target="_blank">
            <div class="small">
                <!-- 推荐标签 -->
                <div class="public-label" v-if="item.recommend === 'Y'">推荐</div>
                <image-view class="live-cover-picture" type="banner" placeholder-width="70%" :src="$urlUtils.getViewUrl(item.appletCover)"></image-view>
                <div class="scale">
                    <div class="scale-content">
                        <!-- 推荐标签 -->
                        <div class="public-label" v-if="item.recommend === 'Y'">推荐</div>
                        <div @click="clickTrack('横版封面图卡片')">
                            <image-view
                                class="live-cover-picture-hover"
                                type="banner"
                                placeholder-width="70%"
                                :src="$urlUtils.getViewUrl(item.goodsCover)"
                            ></image-view>
                        </div>
                        <div class="teacher-style">{{ item.goodsName }}</div>
                        <div class="bright-spots">
                            <template v-for="(val, index) in item.lights">
                                <div class="bright-spots-item" :key="index" v-if="index < 3">
                                    <span></span>
                                    {{ val.content }}
                                </div>
                            </template>
                        </div>
                        <button class="enter-live-big" @click="clickTrack('横版封面图-免费学习')">免费学习</button>
                    </div>
                </div>
            </div>
            <div class="live-time">{{ dayFormat }}</div>
            <div class="live-time-week">{{ item.liveTimeWeek }} {{ item.liveTimeTime }}</div>
            <button class="enter-live" @click="clickTrack('竖版封面图-免费学习')">免费学习</button>
        </a>
    </li>
</template>

<script>
import dayjs from 'dayjs';
export default {
    name: 'OpenListItem',
    props: {
        item: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    computed: {
        dayFormat() {
            return dayjs(this.item.courseStartTime).format('MM/DD');
        },
    },
    methods: {
        clickTrack(position) {
            const userInfo = this.$storage.get('loginStatus') || {};
            const data = {
                user_project_position: this.item.projectId ?? '-', // 用户已选项目名称
                course_name: this.item.goodsName,
                project_id: this.item.projectId ?? '-', // 用户已选项目ID
                user_project_id: this.item.projectId ?? '-', // 用户已选项目ID
                subject_id: '-',
                platform_type: '优路教育官网-Web端', // 平台名称
                page_sate: '首页公开课', //
                entrance_resource: position, //
                user_id: userInfo.userId, // 用户标识 （已登录的用户）
                is_login_in: !!userInfo.userId,
                is_student: userInfo.studentDeposittype === 'T',
            };
            this.$yiguan.track('youlu_click_the_live_class_on_the_home_page', data);
        },
    },
};
</script>

<style scoped lang="less">
@font-face {
    font-family: numfont;
    src: url('./asset/images/D-DIN-Bold.woff.ttf');
}
li {
    width: 224px;
    height: 368px;
    background: #ffffff;
    border-radius: 8px;
    position: relative;
    margin-right: 20px;
    &:last-child {
        margin-right: 0;
    }
    float: left;
    > a {
        height: 100%;
        backface-visibility: visible;
        display: block;
    }
    .small {
        cursor: pointer;
        position: relative;
        &:hover {
            -webkit-transition: all 1s;
            transition: all 1s;
            -webkit-transition: 0.5s;
            transition: 0.5s;
            .scale {
                cursor: pointer;
                display: block;
                visibility: visible;
                opacity: 1;
                // position: relative;
                background-color: #fff;
                -webkit-animation: ani_x_layer_card_hover___1vACB 0.2s ease forwards;
                animation: ani_x_layer_card_hover___1vACB 0.2s ease forwards;
            }
        }
        .live-cover-picture {
            width: 224px;
            height: 291px;
            display: block;
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
            overflow: hidden;
        }
        .scale {
            top: -20px;
            left: -26px;
            overflow: hidden;
            display: none;
            visibility: hidden;
            opacity: 0;
            position: absolute;
            z-index: 13;
            width: 276px;
            height: 411px;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0px 0px 12px 0px rgba(58, 61, 75, 0.1);
            -webkit-box-shadow: 0px 0px 12px 0px rgba(58, 61, 75, 0.1);
            .live-cover-picture-hover {
                width: 276px;
                height: 172px;
                display: block;
            }
            .teacher-style {
                margin: 18px 16px 16px 16px;
                font-size: 14px;
                font-weight: 700;
                line-height: 22px;
                color: #3a3d4b;
                text-shadow: 0px 0px 12px 0px rgba(58, 61, 75, 0.1);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .bright-spots {
                margin-left: 16px;
                margin-right: 16px;
                height: 86px;
                box-sizing: border-box;
                background: #f8f9fa;
                border-radius: 8px;
                box-shadow: 0px 0px 12px 0px rgba(58, 61, 75, 0.1);
                padding-left: 12px;
                padding-right: 12px;
                padding-top: 10px;
                .bright-spots-item {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-bottom: 9px;
                    font-size: 12px;
                    color: #53586c;
                    text-shadow: 0px 0px 12px 0px rgba(58, 61, 75, 0.1);
                    span {
                        width: 4px;
                        height: 4px;
                        margin-right: 8px;
                        display: inline-block;
                        background: linear-gradient(90deg, #ff6870, #f8323c);
                        border-radius: 50%;
                        box-shadow: 0px 0px 12px 0px rgba(58, 61, 75, 0.1);
                        position: relative;
                        top: -3px;
                    }
                }
            }
            .enter-live-big {
                width: 120px;
                height: 39px;
                background: linear-gradient(90deg, #ff6870, #f8323c);
                border-radius: 23px;
                box-shadow: 0px 0px 12px 0px rgba(58, 61, 75, 0.1);
                margin: 28px auto;
                font-size: 14px;
                text-align: center;
                color: #ffffff;
                line-height: 39px;
                border-radius: 23px;
                margin-left: 78px;
                cursor: pointer;
            }
        }
        .scale-content {
            position: relative;
        }
        .public-label {
            position: absolute;
            left: 14px;
            top: 0;
            z-index: 10;
            padding: 0 11px;
            height: 24px;
            line-height: 24px;
            background: rgba(0, 0, 0, 0.5);
            border-bottom-left-radius: 11px;
            border-bottom-right-radius: 11px;
            backdrop-filter: blur(11.53px);
            font-size: 14px;
            color: #ffffff;
            font-weight: 500;
        }
    }
    .live-time {
        margin-bottom: 7px;
        margin-top: 17px;
        padding-left: 16px;
        font-size: 22px;
        font-weight: 700;
        color: #3a3d4b;
        letter-spacing: 0.69px;
        font-family: numfont;
    }
    .live-time-week {
        font-size: 12px;
        font-weight: 400;
        color: #53586c;
        padding-left: 16px;
    }
    .enter-live {
        width: 80px;
        height: 32px;
        background: linear-gradient(84deg, #ff737a 5%, #f8323c 93%);
        border-radius: 19px;
        font-size: 14px;
        text-align: center;
        color: #ffffff;
        line-height: 32px;
        position: absolute;
        right: 16px;
        bottom: 22px;
        cursor: pointer;
    }
    // &:nth-child(5) {
    //     margin-right: 0;
    // }
    /*&:hover {
        display: block;
        visibility: visible;
        opacity: 1;
        background-color: #fff;
        -webkit-animation: ani_x_layer_card_hover___1vACB 0.2s ease forwards;
        animation: ani_x_layer_card_hover___1vACB 0.2s ease forwards;
        transition-duration: 1s;
    }*/
}
/*@-webkit-keyframes ani_x_layer_card_hover___1vACB {
    0% {
        -webkit-transform: translateZ(0) scale(1);
        transform: translateZ(0) scale(1);
        opacity: 0;
    }
    100% {
        opacity: 1;
        -webkit-transform: translateZ(0) scale(1.23);
        transform: translateZ(0) scale(1.23);
        box-shadow: 0px 0px 12px 0px rgba(58, 61, 75, 0.1);
        z-index: 9999;
    }
    to {
        -webkit-transform: translateZ(0) scale(1.23);
        transform: translateZ(0) scale(1.23);
        opacity: 1;
    }
}
@keyframes ani_x_layer_card_hover___1vACB {
    0% {
        -webkit-transform: translateZ(0) scale(1);
        transform: translateZ(0) scale(1);
        opacity: 0;
    }
    100% {
        opacity: 1;
        -webkit-transform: translateZ(0) scale(1.23);
        transform: translateZ(0) scale(1.23);
        box-shadow: 0px 0px 12px 0px rgba(58, 61, 75, 0.1);
        z-index: 9999;
    }
    to {
        -webkit-transform: translateZ(0) scale(1.23);
        transform: translateZ(0) scale(1.23);
        opacity: 1;
    }
}*/

/*
@-webkit-keyframes ani_x_layer_card_hover___1vACB {
    0% {
        -webkit-transform: translateZ(0) scale(.93);
        transform: translateZ(0) scale(.93);
        opacity: 0
    }

    50% {
        opacity: 1
    }

    to {
        -webkit-transform: translateZ(0) scale(1);
        transform: translateZ(0) scale(1);
        opacity: 1
    }
}

@keyframes ani_x_layer_card_hover___1vACB {
    0% {
        -webkit-transform: translateZ(0) scale(.93);
        transform: translateZ(0) scale(.93);
        opacity: 0
    }

    50% {
        opacity: 1
    }

    to {
        -webkit-transform: translateZ(0) scale(1);
        transform: translateZ(0) scale(1);
        opacity: 1
    }
}
*/
</style>
