<template>
    <div>
        <div class="list-item1 flex ai-center" v-for="item in courseList" :key="item.courseId" :class="'list-item'" @click="toDetail(item)">
            <img class="item-img" :src="$urlUtils.getViewUrl(item.courseWebPicPath)" alt="" :onerror="errorimg" />
            <div class="item-left ai-center">
                <div class="item-title text-overflow-2">{{ item.courseName }}</div>
                <div class="flex mt12">
                    <template v-if="item.avlStatus === 'Y' && item.delStatus === 'N' && item.courseStatus === 2">
                        <p class="flex living-line">
                            <img src="./asset/images/living.gif" alt="" class="live-img" />
                            直播中
                        </p>
                        <span class="divider"></span>
                    </template>
                    <p class="item-time" v-if="item.courseStatus != 3">直播时间：{{ item.liveTime | dayFormat }}</p>
                    <p class="item-time" v-if="item.courseStatus === 3">总时长：{{ timeForm(item.diffDateMinute) }}</p>
                    <template v-if="item.courseStatus === 4">
                        <span class="divider"></span>
                        <p class="item-time">直播已结束，回放上传中</p>
                    </template>
                </div>
                <div class="last-time flex jc-end" v-if="item.avlStatus === 'Y' && item.delStatus === 'N' && item.courseStatus == 1">
                    距直播开始还剩：
                    <div class="time">
                        <template v-if="item.countDown.day > 0">{{ item.countDown.day }}天</template>
                        {{ item.countDown.hour }}:{{ item.countDown.minutes }}:{{ item.countDown.seconds }}
                    </div>
                </div>
                <div class="item-footer flex jc-between">
                    <div class="share-btn flex ai-end" v-if="item.avlStatus === 'Y' && item.delStatus === 'N'" @click.stop="handleShowSharePopup(item)">
                        <img src="./asset/images/share.png" alt="" />
                        <div class="share-text">分享</div>
                    </div>
                    <div class="share-btn flex ai-end" v-else></div>
                    <div class="item-btn flex ai-center jc-center" v-if="item.courseStatus === 3" @click.stop="toDetail(item)">
                        <img src="./asset/images/reloading.png" alt="" />
                        <div>观看回放</div>
                    </div>
                    <div
                        class="item-btn flex ai-center jc-center"
                        v-if="item.courseStatus === 1 || item.courseStatus === 2 || item.courseStatus === 4"
                        @click.stop="toDetail(item)"
                    >
                        <img src="./asset/images/goLiving.png" alt="" />
                        <div>进入直播间</div>
                    </div>
                </div>
            </div>
            <!-- 失效 -->
            <!--<template v-if="item.avlStatus === 'N' || item.delStatus === 'Y'">
                <div class="invalid"></div>
                <img src="./asset/images/failureImg.png" alt="" class="failure-img" />
            </template>-->
        </div>

        <!--分页-->
        <div class="pagewrap" v-if="page.pageCount > 10">
            <pagination :total="page.pageCount" :page-size="page.pageSize" @pageChange="pageChange" :current-page="page.pageIndex" />
        </div>

        <!--  分享弹窗-->
        <share-popup :show.sync="showSharePopup" :share-img="$urlUtils.getViewUrl(shareImg)" title="扫码分享">
            <template #footer>
                <div class="share-popup-footer">微信扫一扫，分享给好友</div>
            </template>
        </share-popup>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { webPoster } from '../../../lightClass/apis';
import sharePopup from '@/www/components/microClassUser/components/sharePopup/sharePopup/index.vue';
import Pagination from '@/www/components/microClassUser/components/pagination/Index.vue';
export default {
    name: 'yuYueItemModel',
    components: { sharePopup, Pagination },
    filters: {
        dayFormat(value) {
            return dayjs(value).format('YYYY.MM.DD HH:mm');
        },
    },
    props: {
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
            this.webPoster();
            this.trackShare();
        },
        webPoster() {
            return webPoster(this, {
                goodsId: this.shareGoods.goodsId,
                shareType: 'W',
                resourceType: 'ZB',
            })
                .then((res) => {
                    this.shareImg = res.posterImg;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        trackShare(track = {}) {
            this.$yiguan.mcuTrack('wk_share', {
                course_type: '直播间课程',
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
            window.open(`/agile-course/live-broadcast/${item.goodsId}`, '_blank');
        },
        timeForm(v) {
            let getH = () => {
                let h = Math.floor(v / 3600);
                return h > 9 ? h : `0${h}`;
            };
            let getM = () => {
                let m = Math.floor((v % 3600) / 60);
                return m > 9 ? m : `0${m}`;
            };
            let getS = () => {
                let s = v % 60;
                return s > 9 ? s : `0${s}`;
            };
            return `${getH()}:${getM()}:${getS()}`;
        },
    },
};
</script>
<style lang="less" scoped>
.list-item1 {
    width: 100%;
    padding: 12px 24px;
    position: relative;

    .item-img {
        width: 220px;
        height: 136px;
        margin-right: 20px;
        display: block;
        border-radius: 8px;
    }
    .item-left {
        width: calc(100% - 240px);
        height: 100%;
        .item-title {
            color: #3a3d4b;
            font-size: 16px;
            line-height: 21px;
            font-weight: bold;
        }
        .item-time {
            font-size: 12px;
            color: #53586c;
        }
        .living-line {
            color: #025eff;
            font-size: 12px;
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
        .live-img {
            display: block;
            width: 14px;
            height: auto;
            margin-right: 6px;
        }
        .mr33 {
            margin-right: 33px;
        }
        .mt12 {
            margin-top: 12px;
        }
        .last-time {
            font-size: 12px;
            color: #a5acb7;
            height: 16px;
            line-height: 16px;
            .time {
                color: #f8323c;
                font-size: 14px;
            }
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
                width: 128px;
                height: 40px;
                border-radius: 8px;
                background: linear-gradient(93deg, #3a85fe 3%, #025eff 97%);
                /* cursor: pointer;*/
                img {
                    width: 18px;
                    height: 18px;
                    display: block;
                    margin: 0 6px 0 0;
                }
                div {
                    color: #fff;
                    font-size: 14px;
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
        top: 0px;
        right: 0px;
        width: 57px;
        height: 58px;
    }
}
.list-item:hover {
    background: #f7fafe;
    cursor: pointer;
    .item-title {
        color: #025eff;
    }
    .item-btn {
        background-image: none !important;
        background-color: #175ae1 !important;
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
</style>
