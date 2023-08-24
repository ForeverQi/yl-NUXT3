<template>
    <div class="dict-result" :class="!list.length ? 'fc' : ''">
        <div class="result-list" v-if="list.length">
            <!--选择科目-->
            <div class="fc">
                <el-tabs v-model="editableTabsValue" type="card" @tab-click="onChangeSubject" v-if="list.length > 1">
                    <el-tab-pane v-for="(item, index) in list" :key="item + index" :name="item.subjectName">
                        <span slot="label">
                            <div class="fcenter">
                                {{ item.subjectName }}
                            </div>
                        </span>
                    </el-tab-pane>
                </el-tabs>
            </div>

            <!--详细内容-->
            <div class="detail">
                <div class="title">{{ currentSubject.name }}</div>
                <div v-html="calcDetailInfo" :class="list.length > 1 ? 'tab' : ''" class="fcTab" @click="zoomImg"></div>

                <!--查看大图-->
                <div class="close el-icon-close" @click="img = null" v-if="img"></div>
                <div class="wrapper" v-show="img">
                    <img :src="img" class="image_zoom" alt="" :style="activeImg" />
                    <div class="image_mask" @click="closeImage"></div>
                </div>

                <!--播放视频-->
                <div class="video_wrapper" v-if="param.videoId">
                    <dict-video ref="vbVideo" class="video-vb" @pause-video="$emit('pause-video')"></dict-video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DictVideo from '../DictVideo/index.vue';

export default {
    name: 'dict-detail',
    components: { DictVideo },
    props: {
        // 词点详情列表
        list: {
            type: Array,
            default() {
                return [];
            },
        },

        // 科目ID
        subjectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            detailInfo: '', // 词点富文本详细内容
            editableTabsValue: '', // 选中的科目信息
            img: '', // 需要放大的图片路径
            PlayReturn: null,
            activeImg: {
                height: '0px',
                width: 'auto',
            },
            currentSubject: {}, // 当前选中的科目
        };
    },
    computed: {
        // 格式化富文本详细内容
        calcDetailInfo() {
            return this.calcSrc(this.detailInfo);
        },

        // 视频播放数据
        param() {
            return {
                videoId: this.currentSubject.video,
                type: 'C',
                groupId: this.currentSubject.groupId,
            };
        },
    },
    watch: {
        list: {
            handler(nv, ov) {
                if (nv.length) {
                    this.setCheckData(nv);
                }
            },
            immediate: true,
            deep: true,
        },
        'currentSubject.video': {
            handler(nv, ov) {
                this.closeVideo();
                nv && this.play();
            },
            immediate: true,
            deep: true,
        },
        img(nv) {
            if (nv) {
                document.onmousedown = function (e) {
                    if (e.button == 2) {
                        return false;
                    }
                };
            } else {
                document.onmousedown = function (e) {
                    if (e.button == 2) {
                        return true;
                    }
                };
            }
        },
    },
    mounted() {
        $('.dict-result').contextmenu(function () {
            return false;
        });
    },
    created() {
        this.setCheckData(this.list);
    },
    methods: {
        closeImage() {
            this.img = null;
        },
        play() {
            if (!this.PlayReturn) {
                this.$nextTick(() => {
                    this.PlayReturn = this.$refs.vbVideo.playVid(this.param).start(() => {
                        this.PlayReturn.getInstance().j2s_setVolume(0.5);
                        this.$emit('pause-video');
                    });
                });
            }
        },
        closeVideo() {
            if (this.PlayReturn && this.PlayReturn != undefined) {
                this.PlayReturn.destroy();
                this.PlayReturn = null;
            }
        },
        videoReady() {
            if (this.param.videoId) {
                this.play();
            }
        },
        changeVid() {
            this.PlayReturn && this.PlayReturn.getInstance().changeVid(this.param);
        },
        zoomImg(e) {
            if (e.target.nodeName == 'IMG') {
                this.img = e.target.src;
                if (e.target.height * 1.5 >= window.innerHeight) {
                    this.activeImg.height = window.innerHeight - 20 + 'px';
                    return;
                } else if (e.target.height >= window.innerHeight) {
                    this.activeImg.height = window.innerHeight - 20 + 'px';
                    return;
                }
                this.activeImg.height = e.target.height * 1.5 + 'px';
            }
        },
        calcSrc(v) {
            return v.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match, capture) {
                return `<img  class="img" src="${$nuxt.$niceloo.path.getServerFileViewPath(capture)}"  alt=""  ></img>`;
            });
        },

        // 点击切换项目
        onChangeSubject(tab, event) {
            let res = this.list.find((item) => item.subjectName === tab.name);
            this.currentSubject = res;
            this.detailInfo = res.text;
            res.active = true;
            this.$emit('set-currentSubject', res);
        },

        // 设置选中的数据
        setCheckData(res) {
            if (this.subjectId && res.find((item) => item.subjectId === this.subjectId)) {
                let activeItem = res.find((item) => item.subjectId === this.subjectId);
                this.detailInfo = activeItem.text;
                this.editableTabsValue = activeItem.subjectName;
                this.currentSubject = activeItem;
            } else {
                this.detailInfo = res[0].text;
                this.editableTabsValue = res[0].subjectName;
                this.currentSubject = res[0];
            }

            this.$emit('set-currentSubject', this.currentSubject);
        },
    },
};
</script>

<style lang="less" scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.dict-result {
    width: 100%;
    min-height: calc(100% - 80px);
}

/deep/ .el-autocomplete-suggestion {
    z-index: 10000;
}
.tab-item {
    height: 30px;
    border: none;
    min-width: 103px;
    font-size: 16px;
    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
    font-weight: 400;
    margin-right: 16px;
    border-radius: 24px;
    transition: none;
    color: #fff;
    background: linear-gradient(301deg, #f8323c 0%, #ff737a 100%);
    padding: 6px;
}
.image_mask {
    //  pointer-events: auto;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.5;
    background: #000;
}

.close {
    position: fixed;
    top: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    font-size: 24px;
    color: #fff;
    background-color: #606266;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: 0.8;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;
    z-index: 30000;
}
.wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    overflow: scroll;
    // pointer-events: auto;
}
.image_zoom {
    //   width: 30vw;
    height: auto;
    z-index: 2901;
}
.arrow-img {
    width: 24px;
    height: 24px;
    cursor: pointer;
}

.fc {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
.fcenter {
    display: flex;
    align-items: center;
    justify-content: center;
}
.result-list {
    width: 100%;
    user-select: none;
    padding: 0 12px;

    .video_wrapper {
        width: 420px;
        height: 280px;
        margin: 16px 48px 0;
    }

    .detail {
        width: 100%;
        height: calc(100% - 30px);
        .fcTab {
            text-align: left !important;
            /deep/ p {
                font-size: 14px !important;
                color: #3a3d4b !important;
                text-align: left !important;
                font-weight: 400 !important;
                line-height: 20px !important;
                margin: 0 !important;
            }
        }
        &.tab {
            margin-top: 44px;
        }
        /deep/ .img {
            width: 420px !important;
            cursor: pointer !important;
            margin: 16px 48px !important;
            &:last-child {
                margin-bottom: 0 !important;
            }
        }
        .title {
            font-size: 16px;
            font-weight: 500;
            color: #f8323c;
            line-height: 24px;
            margin-bottom: 20px;
        }
    }
    .el-tabs {
        width: 530px;
        margin-top: 1px;
        margin-bottom: 40px;
    }
    /deep/ .el-tabs__nav-wrap::after {
        height: 0;
    }
    /deep/ .el-tabs__header {
        margin: 0 10px 0;
        border: none;
    }

    /deep/ .el-tabs__nav-prev {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /deep/ .el-icon-arrow-left,
    /deep/ .el-icon-arrow-right {
        width: 24px;
        height: 24px;
        background: #f5f6f9;
        border-radius: 50%;
        color: #8d90aa;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
        border: none;
    }

    /deep/ .el-tabs--card > .el-tabs__header .el-tabs__active-bar {
        display: none;
    }

    /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item {
        padding: 0 35px;
        color: #3a3d4b;
        background: #edeeef;
        font-size: 16px;
        font-weight: 500;
        margin-right: 16px;
        border-radius: 24px;
        border: 1px solid transparent;
        transition: none;

        &.is-active {
            color: #f8323c;
            border-color: #f8323c;
            background: rgba(248, 50, 60, 0.04);
        }
    }

    /deep/ .el-tabs__nav-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /deep/ .el-tabs__nav-scroll {
        margin: 0 10px;
    }
    /deep/ .el-tabs__nav-wrap.is-scrollable {
        padding: 0 20px;
        box-sizing: border-box;
    }

    .tabs-item {
        min-width: 103px;
        color: #3a3d4b;
        background: #ecedef;
        font-size: 16px;
        font-weight: 400;
        margin-right: 16px;
        border-radius: 24px;
        &.active {
            color: #fff;
            background: linear-gradient(301deg, #f8323c 0%, #ff737a 100%);
        }
    }
}
</style>
