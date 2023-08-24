<template>
    <div>
        <div
            class="list-item1 flex"
            v-for="(item, index) in courseList"
            :key="index"
            @click="toDetail(item)"
            :class="{
                'list-item': !item.courseExpiredtime || new Date(item.courseExpiredtime).getTime() > new Date().getTime(),
            }"
            :disabled="item.isInvalid"
        >
            <image-view class="item-img" :src="$urlUtils.getViewUrl(item.coursePicpath)"></image-view>
            <div class="item-left">
                <div class="item-title text-overflow-2">
                    {{ item.courseName }}
                </div>
                <div class="flex mt12">
                    <p class="item-time">共{{ item.coursewareAmount }}节</p>
                    <template v-if="item.recentLiveTime">
                        <span class="divider"></span>
                        <p class="item-time">最近直播时间：{{ item.recentLiveTime | dayFormat }}</p>
                    </template>
                </div>

                <div class="item-footer flex jc-between">
                    <div class="share-btn flex ai-end" v-if="!item.isInvalid" @click.stop="handleShowSharePopup(item)">
                        <img src="./asset/images/share.png" alt="" />
                        <div class="share-text">分享</div>
                    </div>
                    <div class="share-btn flex ai-end" v-else></div>
                    <div class="flex ai-center jc-center opera-button" v-if="!item.isInvalid">
                        <div class="item-btn item-btn-blue flex ai-center jc-center mr16">
                            <span class="item-btn-goLiving"></span>
                            <template v-if="tab === 0" @click.stop="toDetail(item)">去学习</template>
                            <template v-if="tab === 1 && item.drawStatus === 1" @click.stop="toDetail(item)">去学习</template>
                            <template v-else-if="tab === 1 && item.drawStatus !== 1" @click.stop="toDetail(item)">去领取</template>
                            <!-- 继续上次 -->
                            <!--<div class="learn-history-btn" v-if="tab == 1 && item.isContinue">继续上次</div>-->
                        </div>
                        <div class="item-btn item-btn-red flex ai-center jc-center" v-if="tab === 1" @click.stop="handleShowDelPopup(item)">
                            <span class="item-btn-collect"></span>
                            <div class="learn-btn">已收藏</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 失效 -->
            <template v-if="item.isInvalid">
                <!-- <div class="invalid"></div> -->
                <img src="./asset/images/failureImg.png" alt="" class="failure-img" />
                <div class="collect" v-if="tab === 1" @click="handleShowDelPopup(item)"></div>
            </template>
        </div>

        <pagination :page-size="page.pageSize" :total="page.pageCount" @current-change="pageChange" class="pagination"></pagination>
        <!--分页-->
        <!--<div class="pagewrap" v-if="page.pageCount > 10">
            <pagination :total="page.pageCount" :page-size="page.pageSize" @pageChange="pageChange" :current-page="page.pageIndex" />
        </div>-->

        <!--分享弹窗-->
        <popup-share :show.sync="showSharePopup" :share-img="$urlUtils.getViewUrl(shareImg)" title="扫码分享">
            <template #footer>
                <div class="share-popup-footer">微信扫一扫，分享给好友</div>
            </template>
        </popup-share>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import '@/api/mcu/api.MCU4007.collection-cancel.js';
import '@/api/mcu/api.mcu-003.mcp-web-poster.js'; //分享-海报生成
import PopupShare from '@/www/components/components/popup-share/index.vue';
/*import Pagination from '@/www/components/microClassUser/components/pagination/Index.vue';*/
import Pagination from '@/www/components/components/pagination/index.vue';
export default {
    name: 'classItemModel',
    components: {
        PopupShare,
        Pagination,
    },
    filters: {
        dayFormat(value) {
            return dayjs(value).format('YYYY.MM.DD HH:mm');
        },
    },
    props: {
        tab: {
            type: Number,
            default: 0,
        },
        courseList: {
            type: Array,
            default: () => {
                return [];
            },
        },
        page: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            showSharePopup: false,
            shareImg: '',
            errorimg: 'this.src="' + require('./asset/images/errorimg.png') + '"',
            goods: null,
            shareGoods: null,
        };
    },
    created() {},
    mounted() {},
    methods: {
        //展示分享弹窗
        handleShowSharePopup(val) {
            this.showSharePopup = true;
            this.shareGoods = val;
            this.webPoster(val.goodsId);
            this.trackShare();
        },
        webPoster() {
            this.$callApi('public/mcp-web-poster', {
                goodsId: this.shareGoods.goodsId,
                shareType: 'W',
                resourceType: 'TY',
                onsuccess: (res) => {
                    this.shareImg = res.posterImg;
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {},
            });
        },
        //展示取消收藏弹窗
        handleShowDelPopup(item) {
            this.goods = item;

            this.$baseUI.confirm({
                title: '提示',
                content: '确定要取消收藏吗？',
                showCancel: true,
                confirm: () => {
                    this.sure();
                },
                cancel: () => {
                    // this.collectTrack({ is_cancel: false });
                },
            });

            /*this.$baseUI
                .confirm({ content: '确定要取消收藏吗？',success：this.sure })
                .then(() => {
                    this.sure();
                })
                .catch(() => {
                    this.collectTrack({ is_cancel: false });
                });*/
        },
        //确认-取消收藏
        sure() {
            this.$callApi('myMicroClass/collection-cancel', {
                resourceId: this.goods.goodsId,
                onsuccess: (res) => {
                    this.$emit('update-list');
                    this.collectTrack();
                    this.$Message.success('取消成功！');
                },
                onerror: (err) => {
                    // this.collectTrack({ is_cancel: false });
                    console.error(err);
                },
                oncomplete: () => {},
            });
        },
        collectTrack(track = {}) {
            this.$yiguan.mcuTrack('youlu_quxiao_shoucang', {
                course_name: this.goods.courseName,
                project_id: this.goods.projectId,
                subject_id: '-',
                course_type: '体验课',
                page_type: '收藏成功页',

                // mycourse_subject_name: this.goods.subjectName,
                // web_is_collect: true,
                // is_cancel: true,
                // ...track,
            });
        },
        trackShare(track = {}) {
            this.$yiguan.mcuTrack('wk_share', {
                course_type: '体验课',
                course_name: this.shareGoods.goodsName,
                mycourse_subject_name: this.shareGoods.subjectName,
                web_share_category: '微信',
                ...track,
            });
        },
        //翻页
        pageChange(num) {
            this.$emit('page-change', num);
        },
        toDetail(item) {
            if (item.validStatus === 'N') {
                return;
            }
            if (!item.courseExpiredtime || new Date(item.courseExpiredtime).getTime() > new Date().getTime()) {
                window.open(`/trial-course/detail/${item.goodsId}`, '_blank');
            }
        },
    },
};
</script>
<style lang="less" scoped>
.list-item1 {
    padding: 16px 24px;
    position: relative;
    .item-img {
        width: 220px;
        height: 136px;
        margin-right: 20px;
        display: block;
        border-radius: 8px;
        overflow: hidden;
    }
    .item-left {
        flex: 1;
        .item-title {
            color: #3a3d4b;
            font-size: 16px;
            line-height: 21px;
            font-weight: bold;
            margin-top: 23px;
        }
        .item-time {
            font-size: 12px;
            color: #53586c;
        }
        .divider {
            width: 1px;
            height: 8px;
            background-color: #d8d8d8;
            border-radius: 1px;
            display: block;
            position: relative;
            top: 4px;
            margin-left: 16px;
            margin-right: 16px;
        }

        .living-line {
            color: #025eff;
            font-size: 12px;
        }
        .live-img {
            display: block;
            width: 14px;
            height: auto;
        }
        .mt12 {
            margin-top: 12px;
        }
        .item-footer {
            margin-top: 6px;
            .share-btn {
                cursor: pointer;
                img {
                    width: 12px;
                    height: 12px;
                    display: block;
                    margin: 0 2px 2px 0;
                }
                div {
                    font-size: 12px;
                    color: #9698a2;
                    height: 16px;
                    line-height: 16px;
                }
            }
            .item-btn {
                height: 40px;
                width: 100px;
                border-radius: 8px;
                cursor: pointer;
                position: relative;
                border: 0.5px solid #ff2e30;
                box-sizing: border-box;
                font-size: 14px;
                span {
                    width: 18px;
                    height: 18px;
                    display: inline-block;
                    margin: 0 6px 0 0;
                }
                .learn-history-btn {
                    position: absolute;
                    top: -26px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 68px;
                    height: 26px;
                    color: #fff;
                    font-size: 12px;
                    background-image: url('./asset/images/goOnStudy.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    text-align: center;
                    line-height: 20px;
                }
                .mr16 {
                    margin-right: 16px;
                }
            }
            .item-btn-blue {
                color: #ff2e30;
                .item-btn-goLiving {
                    background: url('./asset/images/goLiving.png') no-repeat;
                    background-size: 100%;
                }
            }
            .item-btn-red {
                color: #f8323c;
                background-color: #fff3f3;
                cursor: pointer;

                .item-btn-collect {
                    background: url('./asset/images/collect.png') no-repeat;
                    background-size: 100%;
                }
            }
        }
    }

    .invalid {
        position: absolute;
        top: 0px;
        right: 0px;
        left: 0;
        bottom: 0;
        opacity: 0.2;
        background: #9d9d9d;
    }
    .failure-img {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 55px;
        height: 55px;
    }
    .collect {
        width: 100px;
        height: 40px;
        background: #fff3f3;
        border-radius: 8px;
        opacity: 0;
        position: absolute;
        bottom: 22px;
        right: 24px;
        cursor: pointer;
    }
    &:last-child {
        margin-bottom: 30px;
    }
}
.list-item:hover {
    background: #f5f6f9;
    cursor: pointer;
    .item-title {
        color: #ff2e30;
    }

    .item-left .item-footer .item-btn-blue {
        color: #ffffff;
        background: linear-gradient(90deg, #ff6870, #f8323c);
        .item-btn-goLiving {
            background: url('./asset/images/goLiving_hover.png') no-repeat;
            background-size: 100%;
        }
    }
}
.popup-footer {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    padding: 0 32px;
    div {
        width: 120px;
        height: 38px;
        line-height: 38px;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
    }
    .btn-left {
        border: 1px solid #d6d6d6;
        color: #666666;
    }
    .btn-right {
        color: #fff;
        background-image: linear-gradient(to bottom, #3a85fe, #025eff);
    }
}
.share-popup-footer {
    width: 100%;
    color: #333333;
    font-size: 18px;
    line-height: 18px;
    text-align: center;
}
.pagewrap {
    width: 100%;
    text-align: center;
}
.opera-button {
    position: absolute;
    right: 24px;
    bottom: 22px;
}
.pagination {
    margin-bottom: 120px;
    margin-top: 30px;
}

.list-item1[disabled] {
    cursor: not-allowed;
    .item-title {
        color: rgba(58, 61, 75, 0.5);
    }
    .item-time {
        color: rgba(58, 61, 75, 0.5);
    }
}
</style>
