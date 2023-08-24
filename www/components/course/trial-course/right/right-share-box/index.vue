<template>
    <div class="content-top">
        <div class="mr8">收藏</div>
        <!-- 已收藏图标 -->
        <button class="img-div has-save mr22" @click="handleSave(0)" v-if="isSave"></button>
        <button class="img-div save mr22" @click="handleSave(1)" v-else></button>
        <div class="mr16">分享</div>
        <button class="img-div mr16 weixin" @click="handleShowWeixin"></button>
        <button class="img-div mr16 qq" @click="handleShowHaiBao('qq')"></button>
        <button class="img-div mr16 kongjian" @click="handleShowHaiBao('kongjian')"></button>
        <button class="img-div weibo" @click="handleShowHaiBao('weibo')"></button>
        <!--  分享弹窗-->
        <share-popup :show.sync="showSharePopup" :share-img="shareImg" title="扫码分享">
            <template #footer>
                <p class="share-popup-footer">微信扫一扫，分享给好友</p>
            </template>
        </share-popup>
        <!-- 海报分享 -->
        <hai-bao-share-popup :show.sync="showHaiBaoSharePopup" :share-info="shareInfo" :type="shareType"></hai-bao-share-popup>
        <!-- 下线弹窗 -->
        <twice-popup :show.sync="showDownClassPopup" title="提示">
            <template #body>
                <p>该直播课已下线</p>
            </template>
            <template #footer>
                <button class="popup-footer" @click="handleCloseDownClassPopup">知道啦</button>
            </template>
        </twice-popup>
        <div class="save-popup" v-if="showSavePopup">{{ isSave ? '收藏成功' : '取消收藏' }}</div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import sharePopup from '../../share-popup';
import haiBaoSharePopup from '../../hai-bao-share-popup';
import twicePopup from '../../twice-popup';
import eccm from '../../js/mixin.js';
import '@/api/mcu/api.MCU0004.mcp_trial_web_poster.js';
import '@/api/mcu/api.MCU0003.mcp_mine_collection_add.js';
import '@/api/mcu/api.MCU4007.collection-cancel.js';

export default {
    name: 'contentRightSahreModel',
    components: {
        sharePopup,
        haiBaoSharePopup,
        twicePopup,
    },
    mixins: [eccm],
    data() {
        return {
            showSharePopup: false,
            shareImg: '',
            showHaiBaoSharePopup: false,
            shareType: '',
            showDownClassPopup: false, //下线弹窗
            shareInfo: {
                url: '',
                title: '',
                img: '',
                viewTitle: '',
            },
            showSavePopup: false,
        };
    },
    computed: {
        ...mapState('trial-course/course', { experienceClass: 'experienceClass' }),
        isSave() {
            return this.experienceClass.collectStatus;
        },
    },
    methods: {
        handleShowWeixin() {
            // 分享弹窗
            this.ecValid()
                .then(() => {
                    const loding = this.$baseUI.loading();
                    this.getShareWeiXin().then(() => {
                        loding.close();
                        this.showSharePopup = true;
                    });
                })
                .catch((err) => {
                    console.warn('handleShowWeixin', err);
                    this.ecErrorTip(err);
                });
        },
        // 打开 课程下线弹窗
        handleShowDownClassPopup() {
            this.showDownClassPopup = true;
        },
        // 关闭 课程下线弹窗
        handleCloseDownClassPopup() {
            this.showDownClassPopup = false;
        },
        handleShowHaiBao(type) {
            this.shareType = type;
            if (this.shareType === 'qq') {
                this.shareInfo.viewTitle = `分享海报至QQ`;
            } else if (this.shareType === 'kongjian') {
                this.shareInfo.viewTitle = `分享海报至QQ空间`;
            } else if (this.shareType === 'weibo') {
                this.shareInfo.viewTitle = `分享海报至微博`;
            }
            this.ecValid()
                .then(() => {
                    this.shareInfo.url = '';
                    this.shareInfo.img = '';
                    this.getShareInfo();
                })
                .catch((err) => {
                    console.warn('getShareWeiXin', err);
                    this.ecErrorTip(err);
                });
        },
        getShareWeiXin() {
            // mcp/trial/web/poster
            return new Promise((resolve, reject) => {
                this.$callApi('experience/mcp_trial_web_poster', {
                    goodsId: this.experienceClass.goodsId,
                    resourceType: '\u0054\u0059', //资源类型(TY:体验课,QX:轻学课，ZB:直播课)
                    shareType: '\u0057',
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then((res) => {
                    this.shareImg = this.$urlUtils.getViewUrl(res.posterImg);
                    this.trackShare();
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        getShareInfo() {
            const st =
                (this.shareType === 'qq' && String.fromCharCode(0b1010001)) ||
                (this.shareType === 'kongjian' && String.fromCharCode(0b1001011)) ||
                (this.shareType === 'weibo' && String.fromCharCode(0b1000010)) ||
                '';
            const loading = this.$baseUI.loading();
            return new Promise((resolve, reject) => {
                this.$callApi('experience/mcp_trial_web_poster', {
                    goodsId: this.experienceClass.goodsId,
                    resourceType: '\u0054\u0059', //资源类型(TY:体验课,QX:轻学课，ZB:直播课)
                    shareType: st,
                    onsuccess: resolve,
                    onerror: reject,
                });
            })
                .then((res) => {
                    loading.close();
                    this.showHaiBaoSharePopup = true;
                    this.shareImg = res.posterImg;
                    const { posterImg } = res;
                    this.shareInfo.title = this.experienceClass.courseName;
                    this.shareInfo.url = this.shareType === 'qq' ? this.$urlUtils.getViewUrl(posterImg) : location.href;
                    this.shareInfo.img = this.$urlUtils.getViewUrl(posterImg);
                    console.warn(this.shareInfo);
                    this.trackShare();
                })
                .catch((err) => {
                    loading.close();
                    console.error(err);
                });
        },
        trackShare(track = {}) {
            console.info('分享埋点');
            this.$yiguan.mcuTrack('wk_share', {
                course_name: this.experienceClass?.courseName ?? '未获取课程信息',
                mycourse_subject_name: this.experienceClass?.subjectName ?? '未获取科目信息',
                course_type: '体验课',
                web_share_category:
                    (this.shareType === 'qq' && 'QQ') || (this.shareType === 'kongjian' && 'QQ空间') || (this.shareType === 'weibo' && '微博') || '未知类型',
                ...track,
            });
        },
        handleSave(val) {
            this.$yiguan.track('youlu_click_shoucang', {
                course_name: this.experienceClass?.courseName,
                project_id: this.experienceClass?.projectId,
                user_project_id: this.experienceClass?.projectId,
                subject_id: this.experienceClass?.subjectId,
                course_type: '体验课',
            });
            this.ecValid()
                .then(() => {
                    return ylPlugin.login.isLogined().then((isLogin) => {
                        return isLogin || this.ylLoginByPwd('', '体验课-收藏');
                    });
                })
                .then(() => {
                    this.handleShare(val);
                })
                .catch((err) => {
                    console.warn('handleSave', err);
                    if (typeof err === 'string') {
                        this.ecErrorTip(err);
                    }
                });
        },
        handleShare(val) {
            if (val === 0x1) {
                this.mcpMineCollectionAdd()
                    .then(() => {
                        this.experienceClass.collectStatus = 0x1;
                        // this.collectTrack({
                        //     web_is_collect: true,
                        //     is_cancel: false,
                        // });
                        this.$yiguan.track('youlu_chenggong_shoucang', {
                            course_name: this.experienceClass?.courseName,
                            project_id: this.experienceClass?.projectId,
                            user_project_id: this.experienceClass?.projectId,
                            subject_id: this.experienceClass?.subjectId,
                            course_type: '体验课',
                            is_success: true,
                            fail_reason: '-',
                        });
                        this.showSavePopup = true;
                        const timeFun = setTimeout(() => {
                            this.showSavePopup = false;
                            clearTimeout(timeFun);
                        }, 3000);
                    })
                    .catch((err) => {
                        this.$yiguan.track('youlu_chenggong_shoucang', {
                            course_name: this.experienceClass?.courseName,
                            project_id: this.experienceClass?.projectId,
                            user_project_id: this.experienceClass?.projectId,
                            subject_id: this.experienceClass?.subjectId,
                            course_type: '体验课',
                            is_success: false,
                            fail_reason: err.toString(),
                        });
                        console.error(err);
                    });
            } else {
                this.mcpMineCollectionCancel()
                    .then(() => {
                        this.experienceClass.collectStatus = 0x0;
                        this.showSavePopup = true;
                        const timeFun = setTimeout(() => {
                            this.showSavePopup = false;
                            clearTimeout(timeFun);
                        }, 3000);
                        // this.collectTrack({
                        //     web_is_collect: false,
                        //     is_cancel: true,
                        // });

                        this.$yiguan.track('youlu_quxiao_shoucang', {
                            course_name: this.experienceClass?.courseName,
                            project_id: this.experienceClass?.projectId,
                            user_project_id: this.experienceClass?.projectId,
                            subject_id: this.experienceClass?.subjectId,
                            course_type: '体验课',
                            page_type: '资源详情页',
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        },
        collectTrack(track = {}) {
            console.info('收藏埋点');
            this.$yiguan.mcuTrack('wk_collect', {
                course_name: this.experienceClass?.courseName ?? '未获取课程信息',
                mycourse_subject_name: this.experienceClass?.subjectName ?? '未获取科目信息',
                web_is_collect: false,
                is_cancel: true,
                ...track,
            });
        },
        mcpMineCollectionAdd() {
            return new Promise((resolve, reject) => {
                this.$callApi('experience/mcp_mine_collection_add', {
                    resourceId: this.experienceClass.goodsId,
                    onsuccess: resolve,
                    onerror: reject,
                });
            });
        },
        mcpMineCollectionCancel() {
            return new Promise((resolve, reject) => {
                this.$callApi('myMicroClass/collection-cancel', {
                    resourceId: this.experienceClass.goodsId,
                    onsuccess: resolve,
                    onerror: reject,
                });
            });
        },
    },
};
</script>
<style lang="less" scoped>
.content-top {
    width: 324px;
    padding: 38px 0 28px;
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #999999;
    .img-div {
        width: 32px;
        height: 32px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-color: transparent;
        cursor: pointer;
    }
    .has-save {
        background-image: url('./asset/images/has-save.png');
    }
    .save {
        background-image: url('./asset/images/save.png');
    }
    .save:hover {
        background-image: url('./asset/images/save-hover.png');
    }

    .weixin {
        background-image: url('./asset/images/weixin.png');
    }
    .weixin:hover {
        background-image: url('./asset/images/weixin-hover.png');
    }

    .qq {
        background-image: url('./asset/images/qq.png');
    }
    .qq:hover {
        background-image: url('./asset/images/qq-hover.png');
    }

    .kongjian {
        background-image: url('./asset/images/kongjian.png');
    }
    .kongjian:hover {
        background-image: url('./asset/images/kongjian-hover.png');
    }

    .weibo {
        background-image: url('./asset/images/weibo.png');
    }
    .weibo:hover {
        background-image: url('./asset/images/weibo-hover.png');
    }

    .mr22 {
        margin-right: 22px;
    }
    .mr16 {
        margin-right: 16px;
    }
    .mr8 {
        margin-right: 8px;
    }
    .share-popup-footer {
        width: 100%;
        color: #333333;
        font-size: 18px;
        line-height: 18px;
        text-align: center;
    }
    .popup-footer {
        width: 120px;
        height: 38px;
        text-align: center;
        line-height: 38px;
        color: #fff;
        background-image: linear-gradient(to right, #3a85fe, #025eff);
        border-radius: 8px;
        cursor: pointer;
    }
    .save-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 144px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        z-index: 199;
        border-radius: 8px;
        background-color: rgba(0, 0, 0, 0.75);
        transform: translate3d(-50%, -50%, 0);
    }
}
</style>
