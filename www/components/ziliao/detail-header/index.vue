<template>
    <div :class="'information-header-' + className">
        <div class="information-header-left">
            <img v-if="className" :src="require(`./asset/images/` + className + `.png`)" alt="" />
            <div :class="className + '-left-txt'">
                <p class="name">{{ file.docName }}</p>
                <div class="other">
                    <div class="other-left">
                        <div class="num" v-if="file.docPackstatus === 'N'">共{{ file.docPagenum }}页｜{{ changeDocSize(file.docSize) }}</div>
                        <div class="num" v-if="file.docPackstatus === 'Y'">共{{ file.docPacknum || 0 }}条资料｜{{ changeDocSize(file.docSize) }}</div>
                        <div class="btns">
                            <template v-if="file.docAvlstatus === 'Y'">
                                <template v-if="file.isOwned == 'Y'">
                                    <!-- 已购买 -->
                                    <p class="price" v-if="file.isOwned == 'Y'">已购</p>
                                </template>
                                <template v-else>
                                    <!-- 免费 -->
                                    <p class="price" v-if="file.docAccess == 'F'">免费</p>
                                    <!-- 收费  无促销-->
                                    <p
                                        class="price"
                                        v-if="isTimeLimit === 'N' || (file.docAccess == 'C' && file.docPromotiontype == 'N' && file.isOwned == 'N')"
                                    >
                                        <span class="money">{{ file.docPrice | veMoneyCent }}</span>
                                    </p>
                                    <template v-if="isTimeLimit === 'Y'">
                                        <!-- 限时免费 -->
                                        <p class="price" v-if="file.docAccess == 'C' && file.docPromotiontype == 'F' && file.isOwned == 'N'">
                                            <span class="cuxiao">限时免费</span>
                                            <span class="money">0</span>
                                        </p>
                                        <!-- 限时特价 -->
                                        <p class="price" v-if="file.docAccess == 'C' && file.docPromotiontype == 'L' && file.isOwned == 'N'">
                                            <span class="cuxiao">限时特价</span>
                                            <span class="money">{{ file.docPromotionprice | veMoneyCent }}</span>
                                        </p>
                                    </template>

                                    <!-- 特价 -->
                                    <p class="price" v-if="file.docAccess == 'C' && file.docPromotiontype == 'S' && file.isOwned == 'N'">
                                        <span class="cuxiao">特价</span>
                                        <span class="money">{{ file.docPromotionprice | veMoneyCent }}</span>
                                    </p>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="information-header-btns">
            <!-- 分享功能 -->
            <information-share :file="file" :type="file.docPackstatus === 'Y' ? 'pack' : 'doc'" />
            <!-- 下载按钮/限时倒计时 -->
            <div class="information-header-btns-bottom">
                <p
                    class="down"
                    v-if="file.docAvlstatus === 'Y'"
                    @click.stop="downloadDoc(file, file.docPackstatus === 'Y' ? '【资料包详情页-下载资料按钮】' : '【资料详情页-下载资料按钮】')"
                >
                    下载资料{{ file.docPackstatus === 'Y' ? '包' : '' }}
                </p>
                <p class="countdown" v-if="isTimeLimit === 'Y' && !(file.isOwned == 'Y')">
                    <span class="countdown-text">离活动结束还剩：</span>
                    <span class="countdown-time" v-if="day">{{ day || '0' }}</span>
                    <span class="day-text" v-if="day">天</span>
                    <span class="countdown-time">{{ hr }}</span>
                    <span class="mao">:</span>
                    <span class="countdown-time">{{ min }}</span>
                    <span class="mao">:</span>
                    <span class="countdown-time">{{ sec }}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import MixIn from '../mixin/index.js';
import CountDown from '../mixin/countDown';
import InformationShare from '@/www/components/ziliao/share/index.vue'; //分享资料
export default {
    name: 'detail-header',
    components: {
        InformationShare,
    },
    mixins: [MixIn, CountDown],
    props: {
        //资料数据
        file: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            className: '',

            pageType: 'info',
            pageData: this.file,
        };
    },
    fetch() {
        return Promise.resolve();
    },
    watch: {
        file: {
            immediate: true,
            handler(val) {
                if (this.$platform.isClient()) {
                    this.initDown();
                }
                this.className = val.docPackstatus === 'Y' ? 'package' : 'single';
            },
        },
    },
};
</script>
<style lang="less" scoped>
.cuxiao {
    font-size: 12px;
    margin-right: 6px;
}
.countdown {
    margin-top: 12px;
}
.countdown-text {
    font-size: 12px;
    text-align: left;
    color: #a5acb7;
    line-height: 16px;
}
.countdown-time {
    width: 15px;
    height: 13px;
    color: #f8323c;
    font-size: 12px;
    font-weight: 700;
    background: #fff3f3;
    border-radius: 4px;
}
.mao,
.day-text {
    font-size: 8px;
    color: #333333;
}
.information-header-package {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    img {
        width: 153px;
        height: 180px;
        margin-right: 24px;
    }
    .package-left-txt {
        box-sizing: border-box;
        padding: 10px 0;
        height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name {
            width: 695px;
            font-size: 20px;
            font-weight: 700;
            text-align: left;
            color: #3a3d4b;
            line-height: 29px;
            letter-spacing: 0.71px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .other {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        .other-left {
            display: flex;
            flex-direction: column;
        }
        .num {
            font-size: 14px;
            color: #99a1af;
            line-height: 20px;
            margin-bottom: 12px;
        }
        .btns {
            display: flex;
            align-items: center;
        }
        .down {
            margin-left: 24px;
            width: 120px;
            height: 39px;
            background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
            border-radius: 20px;
            line-height: 39px;
            text-align: center;
            color: #fff;
            cursor: pointer;
        }
        .price {
            font-size: 20px;
            color: #ff2e30;
            font-weight: 700;
        }
        .money {
            padding: 0;
            margin: 0;
            font-weight: 700;
            &::before {
                content: '¥';
                font-size: 12px;
            }
        }
    }
    .information-header-btns {
        flex-shrink: 0;
        box-sizing: border-box;
        padding: 10px 0;
        height: 180px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
    }
}
.information-header-single {
    width: 1200px;
    display: flex;
    align-items: center;
    margin-top: 15px;
    img {
        width: 120px;
        height: 141px;
        margin-right: 24px;
    }
    .single-left-txt {
        width: 820px;
        box-sizing: border-box;
        padding: 10px 0;
        height: 165px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .name {
            width: 695px;
            font-size: 20px;
            font-weight: 700;
            text-align: left;
            color: #3a3d4b;
            line-height: 29px;
            letter-spacing: 0.71px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        .other {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-top: 10px;
        }
        .other-left {
            display: flex;
            flex-direction: column;
        }
        .num {
            font-size: 14px;
            color: #99a1af;
            line-height: 20px;
            margin-bottom: 12px;
        }
        .btns {
            display: flex;
            align-items: center;
        }

        .price {
            font-size: 20px;
            color: #ff2e30;
            font-weight: 700;
        }
        .money {
            padding: 0;
            margin: 0;
            font-weight: 700;
            &::before {
                content: '¥';
                font-size: 12px;
            }
        }
    }
    .information-header-btns {
        flex-shrink: 0;
        box-sizing: border-box;
        padding: 10px 0;
        height: 165px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
    }
}
.information-header-left {
    flex: 1;
    display: flex;
    align-items: center;
}
.information-header-btns {
    box-sizing: border-box;
    padding: 10px;
    .information-header-btns-bottom {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .down {
        width: 120px;
        height: 39px;
        background: linear-gradient(301deg, #ff737a 0%, #f8323c 100%);
        border-radius: 20px;
        line-height: 39px;
        text-align: center;
        color: #fff;
        cursor: pointer;
    }
}
</style>
