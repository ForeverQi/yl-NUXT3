<template>
    <div class="video-class-box">
        <div class="flex">
            <div class="left-box">
                <div class="video-box">
                    <!-- 课程下线 -->
                    <down-class v-if="!isClassOnLine"></down-class>
                    <vb-video v-show="isClassOnLine && currentWareDto" ref="vbVideo" @ready="courseReady" @isFullScreen="doFullScreen" :is-overflow="true">
                        <div
                            slot="mask"
                            class="goods-cover"
                            v-if="!isPlay && currentWareDto"
                            :style="{ 'background-image': 'url(' + $urlUtils.getViewUrl(currentWareDto.goodsCover) + ')' }"
                        ></div>
                        <div slot="comment" class="switch-playback" v-if="playList.length > 1">
                            <span class="arrow-top" :class="currentWareDtoIndex > 0 ? 'arrow-top-check' : ''" @click="toPre"></span>
                            <span class="arrow-bottom" :class="currentWareDtoIndex < playList.length ? 'arrow-bottom-check' : ''" @click="toNext"></span>
                        </div>
                        <div slot="commentPop" v-if="!isPlay" class="status-wrap" @click="play"></div>
                    </vb-video>
                </div>
            </div>
            <!-- 菜单-->
            <class-right></class-right>
        </div>
        <!-- 课程底部 -->
        <div class="flex jc-between ai-center class-footer">
            <div class="class-left-footer video-info">
                <template v-if="isClassOnLine">
                    <div class="video-type">
                        <img src="./asset/images/light-class.png" alt="" class="type-img" />
                        <div class="share-btn flex ai-center" @click="handleShowSharePopup">
                            <img src="./asset/images/share.png" alt="" />
                            <div class="share-text">分享</div>
                        </div>
                    </div>
                    <div class="video-title" v-if="currentWareDto">{{ currentWareDto.goodsName }}</div>
                </template>
            </div>
            <div class="class-right-footer" v-if="isClassOnLine">
                <img src="./asset/images/right-footer.png" alt="" class="right-footer" @mouseover="handleShowShareModel" />
                <span class="focus-applets">关注小程序</span>
                <!-- 分享 -->
                <div class="share-model" v-show="showShareModel">
                    <share-model :share-img="$urlUtils.getViewUrl(shareImg)" @close="showShareModel = false"></share-model>
                </div>
            </div>
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
import { mapMutations } from 'vuex';
import downClass from '../downClass/index.vue';
import classRight from '../classRight/index.vue';
import { easyStudyWebDetail, webPoster } from '../../../../apis';
import shareModel from '@/www/components/microClassUser/components/shareModel/shareModel/index.vue';
import sharePopup from '@/www/components/microClassUser/components/sharePopup/sharePopup/index.vue';
import vbVideo from '@/www/components/business/vbVideo/index.vue';

export default {
    name: 'videoClassBox',
    components: {
        downClass,
        sharePopup,
        classRight,
        shareModel,
        vbVideo,
    },
    inject: ['copyOpt'],
    data() {
        return {
            showSharePopup: false, //全屏弹窗
            shareImg: '',
            showShareModel: false, // 定位弹窗
            isClassOnLine: true, //课程是否在线
            PlayReturn: null,
            isPlay: false,
            page: {
                pageIndex: 1,
                pageSize: 4,
                pageCount: 0,
            },
            playList: [],
            currentWareDto: null,
            currentWareDtoIndex: 0,
            opt: null,
        };
    },
    computed: {
        computedCopyOpt() {
            return this.copyOpt();
        },
    },
    watch: {
        computedCopyOpt: {
            immediate: true,
            handler(val) {
                this.opt = val;
                console.log('切换运营分类');
                console.log(val);
                //如果当前的运营分类存在，去查询详情
                if (val.optId === this.$route.query.optId) {
                    this.getDetail();
                }
            },
        },
    },
    created() {},
    mounted() {
        // this.getDetail();
        this.$bus.$on('switch-play-back', (item1, index) => {
            this.currentWareDtoIndex = index;
            this.changeVid();
        });
        this.$bus.$on('get-play-List', (item) => {
            this.playList = item;
        });
    },
    methods: {
        ...mapMutations('mcuStore', ['setProjectId', 'setPageName', 'setProjectName', 'setRemark']),
        // 打开微信分享弹窗,判断课程是否下线，未下线显示分享弹窗，下线显示下线弹窗
        async handleShowSharePopup() {
            await this.getIsOffline();
            if (this.isClassOnLine) {
                this.showSharePopup = true;
            }
            this.trackShare();
        },
        trackShare(track = {}) {
            this.$yiguan.mcuTrack('wk_share', {
                course_type: '轻学课',
                course_name: this.currentWareDto.goodsName,
                mycourse_subject_name: this.currentWareDto.subjectName,
                web_share_category: '微信',
                ...track,
            });
        },
        handleShowShareModel() {
            this.showShareModel = true;
        },
        webPoster() {
            console.log('5555555555');
            /*    ? this.opt.optId : this.$route.query.optId*/
            console.log(this.opt);
            return webPoster(this, {
                goodsId: this.currentWareDto.goodsId,
                shareType: 'W',
                resourceType: 'QX',
                optId: this.opt.optId,
            })
                .then((res) => {
                    this.shareImg = res.posterImg;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        courseReady() {},
        doFullScreen(type) {
            this.isFullScreen = type;
        },
        getDetail() {
            easyStudyWebDetail(this, {
                goodsId: this.$route.params.courseId,
                optId: this.$route.query.optId,
                showClient: 'W',
            })
                .then((res) => {
                    this.isClassOnLine = true;
                    this.currentWareDto = res;
                    this.setProjectId(res.projectId);
                    this.setPageName(`[轻学课]${res.goodsName}`);
                    this.setProjectName(res.projectName);
                    this.setRemark(`【轻学课】${res.goodsName}`);
                    this.webPoster();
                })
                .catch((err) => {
                    this.isClassOnLine = false;
                    if (err.getAttachedData().getData().code === '4999') {
                        this.isClassOnLine = false;
                        this.isPlay = true;
                    }
                });
        },
        play() {
            this.isPlay = true;
            this.changeVid();
        },
        getIsOffline() {
            /*this.opt ? this.opt.optId : this.$route.query.optId,*/
            return easyStudyWebDetail(this, {
                goodsId: this.currentWareDto.goodsId,
                optId: this.opt.optId,
                showClient: 'W',
            })
                .then((res) => {
                    this.isClassOnLine = true;
                })
                .catch((err) => {
                    if (err.getAttachedData().getData().code === '4999') {
                        this.isClassOnLine = false;
                        this.offlinePopup();
                    }
                });
        },
        //下线提示
        offlinePopup() {
            this.$baseUI
                .alert('该轻学课已下线', '提示', { confirmText: '返回【微课首页】' })
                .then(() => {
                    this.$router.push(`/agile-course/${this.$route.query.projectId}`);
                })
                .catch(() => {
                    this.$PageUtil.reflush();
                });
        },
        intPlay() {
            this.$refs.vbVideo
                .playVid(
                    {
                        videoId: this.currentWareDto.coursePath,
                        type: 'C',
                    },
                    {
                        autoplay: true,
                        goodsId: this.currentWareDto.goodsId,
                    }
                )
                .then((instance) => {
                    this.PlayReturn = instance;
                    this.PlayReturn.start(() => {});
                    this.PlayReturn.over(() => {
                        //播放完触发
                        this.toNext();
                    });
                })
                .catch((err) => {
                    this.$baseUI.alert(err);
                });
        },
        async changeVid() {
            if (this.playList.length !== 0) {
                this.currentWareDto = this.playList[this.currentWareDtoIndex];
            }
            await this.getIsOffline();
            if (this.isClassOnLine) {
                if (this.PlayReturn) {
                    this.PlayReturn.changeVid({
                        videoId: this.currentWareDto.coursePath,
                        type: 'C',
                        goodsId: this.currentWareDto.goodsId,
                    });
                } else {
                    //初始化进来时，不点击左侧的播放按钮，直接点击右侧轻学课列表
                    this.intPlay();
                    this.isPlay = true;
                }
                this.webPoster();
                this.trackCoursePlay();
                /*let opt = this.opt ? this.opt.optId : this.$route.query.optId;
                history.replaceState(
                    { key: Date.now().toFixed(3) },
                    '',
                    `/agile-course/knowledge/${this.currentWareDto.goodsId}?projectId=${this.$route.query.projectId}&optId=${opt}`
                );*/
            }
        },
        trackCoursePlay(track = {}) {
            this.$yiguan.mcuTrack('wk_course_play', {
                course_name: this.currentWareDto.goodsName,
                mycourse_subject_name: this.currentWareDto.subjectName,
                web_is_order: false,
                course_type: '轻学课',
                paly_type: '看录播',
                ail_page_source: location.href,
                ...track,
            });
        },
        toPre() {
            this.playList.forEach((item, index) => {
                if (item.goodsId === this.currentWareDto.goodsId && index != 0) {
                    this.currentWareDto = this.playList[index - 1];
                    this.currentWareDtoIndex = index - 1;
                }
            });
            this.changeVid();
        },
        toNext() {
            this.playList.forEach((item, index) => {
                if (item.goodsId === this.currentWareDto.goodsId) {
                    index === this.playList.length - 1 ? (this.currentWareDtoIndex = 0) : (this.currentWareDtoIndex = index + 1);
                }
            });
            this.changeVid();
        },
    },
};
</script>
<style lang="less" scoped>
.video-class-box {
    background-color: #1c1d30;
    .left-box {
        width: 884px;
        .video-box {
            width: 884px;
            height: 552px;
            background-color: #eee;
            position: relative;
        }
    }
    .right-box {
        width: calc(100% - 884px);
    }
}
.class-footer {
    .video-info {
        height: 80px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-left: 16px;
        .video-type {
            display: flex;
            align-items: center;
            .type-img {
                width: 104px;
                height: 16px;
                display: block;
                margin-right: 60px;
            }
            .share-btn {
                cursor: pointer;
                img {
                    width: 14px;
                    height: 14px;
                    display: block;
                    margin: 0 8px 0 0;
                }
                div {
                    font-size: 14px;
                    color: #99a1af;
                    height: 18px;
                    line-height: 18px;
                }
            }
        }
        .video-title {
            font-size: 16px;
            line-height: 21px;
            color: #fcfbfb;
            margin-top: 14px;
        }
    }

    .class-right-footer {
        width: 316px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        .right-footer {
            width: 284px;
            height: 56px;
        }
        .focus-applets {
            width: 89px;
            height: 30px;
            background: linear-gradient(-270deg, #ffffff 0%, #c5c8f8 100%);
            border-radius: 2px;
            font-size: 13px;
            text-align: center;
            color: #454aa3;
            line-height: 30px;
            display: inline-block;
            position: absolute;
            top: 25px;
            right: 32px;
        }
        .share-model {
            width: 358px;
            height: 430px;
            position: absolute;
            top: 87px;
            left: -30px;
            z-index: 3;
        }
    }
}
.share-popup-footer {
    width: 100%;
    color: #333333;
    font-size: 18px;
    line-height: 18px;
    text-align: center;
}
.popup-footer {
    width: 150px;
    height: 38px;
    text-align: center;
    line-height: 38px;
    color: #fff;
    background-image: linear-gradient(to right, #3a85fe, #025eff);
    border-radius: 8px;
    cursor: pointer;
}
.goods-cover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    cursor: pointer;
    background-size: cover;
    background-repeat: no-repeat;
}
.status-wrap {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.6) url('./asset/images/liveroomDetail_27.png') no-repeat;
    background-size: 80px 80px;
    background-position: center;
}
.switch-playback {
    width: 36px;
    height: 80px;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 18px;
    position: absolute;
    right: 24px;
    top: 50%;
    margin-top: -40px;
    padding-left: 5px;
    padding-top: 8px;
}
.arrow-top,
.arrow-bottom {
    width: 26px;
    height: 26px;
    display: inline-block;
    background: url('./asset/images/pre.png');
    background-size: 100%;
    align-items: center;
    cursor: pointer;
}
.arrow-bottom {
    background: url('./asset/images/next.png');
    background-size: 100%;
    margin-top: 12px;
}
.arrow-top-check {
    background: url('./asset/images/pre-check.png');
    background-size: 100%;
}
.arrow-bottom-check {
    background: url('./asset/images/next-check.png');
    background-size: 100%;
}
</style>
