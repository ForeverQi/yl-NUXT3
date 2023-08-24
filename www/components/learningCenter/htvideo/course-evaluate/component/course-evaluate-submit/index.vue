<template>
    <div>
        <div>
            <div class="comment-model">
                <div class="header">
                    <div class="header-title">
                        <span>您觉得</span>
                        <span class="header-msg">{{ headerMessage }}</span>
                        <span>如何？</span>
                    </div>
                    <img class="header-line" src="../../assets/images/headerLine.svg" />
                </div>
                <div class="content">
                    <div class="content-star">
                        <img
                            v-for="(item, index) in typeLables"
                            :src="lableLevel > item.level - 1 ? startNoChoosed : startChoosed"
                            :key="index"
                            class="pointer"
                            @click="checkLableLevel(item.level)"
                        />
                        <span>{{ levelDesc }}</span>
                    </div>
                    <div v-show="lableLevel" class="content-label">
                        <span
                            class="content-label-default pointer"
                            :class="{ 'content-label-checked': lableIdList.indexOf(item.lableId) != -1 ? true : false }"
                            v-for="(item, index) in LableList"
                            :key="index"
                            @click="setLableIdList(item.lableId)"
                        >
                            {{ item.lableName.length > 10 ? item.lableName.substring(0, 10) + '...' : item.lableName }}
                        </span>
                    </div>
                    <div v-show="lableLevel">
                        <div class="content-text">
                            <textarea :placeholder="placeholderTxt" v-model="commentContent" maxlength="200"></textarea>
                            <span class="content-text-length">{{ commentContent.length }}/200</span>
                        </div>
                        <vb-upload-img-auto v-show="false" ref="vbUpload" @success="upImgSuccess" limit="3" />
                        <div class="content-img">
                            <div v-if="imgs.length < 3" class="uploadAdd" @click="addImg">
                                <img src="../../assets/images/uploadAdd.svg" />
                            </div>
                            <template v-for="(item, index) in imgs">
                                <div class="content-img-container" :key="item + index">
                                    <img class="pointer" :src="$urlUtils.getViewUrl(item)" alt="" :key="index" @click="handlePreviewImg(item)" />
                                    <img src="../../assets/images/deleteBtn.svg" class="content-img-container-delete-btn pointer" @click="deleteImg(index)" />
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="footer">
                        <button class="footer-unsubmit" :class="{ 'footer-submit': lableLevel && lableIdList.length }" @click="onSubmitBtnClick">
                            提交评价
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isShowToast" class="toast">
            {{ toastContent }}
        </div>
        <CourseImagePreview :pic="currentImg" v-if="isShowPreview" @close="closePreview"></CourseImagePreview>
    </div>
</template>

<script>
import '@/api/cmt/api.CMT1102.cmt-label-list.js';
import vbUploadImgAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto/index.vue';
import PreviewTheStop from '@/www/components/package/previewthestop/index';
import CourseImagePreview from '@/www/components/learningCenter/htvideo/course-image-preview/index.vue';

export default {
    name: 'index',
    components: { vbUploadImgAuto, CourseImagePreview },
    props: {
        lableType: {
            type: String,
            default: 'TC', // TC: 录播课，LC: 直播课，FC面授课，HT班主任
        },
        commentInfo: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            startNoChoosed: require('../../assets/images/startNoChoosed.svg'),
            startChoosed: require('../../assets/images/startChoosed.svg'),
            typeLables: [],
            lableLevel: 0,
            lableIdList: [],
            imgs: [],
            commentContent: '',
            isShowToast: false,
            toastContent: '',
            isShowPreview: false,
            timer1: null,
            timer2: null,
            headerMessage: '本节课程内容',
            currentImg: '',
        };
    },
    computed: {
        LableList() {
            let LableList = [];
            for (let i = 0; i < this.typeLables.length; i++) {
                if (this.typeLables[i].level === this.lableLevel) {
                    LableList = this.typeLables[i].lables;
                    break;
                }
            }
            return LableList;
        },
        levelDesc() {
            let levelDesc = '';
            for (let i = 0; i < this.typeLables.length; i++) {
                if (this.typeLables[i].level === this.lableLevel) {
                    levelDesc = this.typeLables[i].levelDesc;
                    break;
                }
            }
            return levelDesc;
        },
        placeholderTxt() {
            return this.lableType == 'HT' ? '您对班主任的服务感觉如何，写下想说的话吧！' : '听课体验如何，对老师的讲课满意吗？';
        },
    },
    created() {
        this.initData();
    },
    methods: {
        /**
         * 初始化数据
         * **/
        initData() {
            if (this.lableType === 'LC') {
                this.headerMessage = '本节课程内容';
            }
            this.reset();
            this.getLabelList();
        },
        /**
         * 重置评价弹窗数据
         * **/
        reset() {
            this.typeLables = [];
            this.lableLevel = 0;
            this.imgs = [];
            this.commentContent = '';
            this.lableIdList = [];
        },
        /**
         * 获取标签列表
         * **/
        getLabelList() {
            this.$callApi('cmt/cmt-label-list', {
                lableType: this.lableType,
                onsuccess: (res) => {
                    if (res.data[0]) {
                        var hasTypeLableIndex = [];
                        hasTypeLableIndex = res.data[0].typeLables.map((item) => {
                            return item.level;
                        });
                        var notHasTypeLableIndex = [1, 2, 3, 4, 5].concat(hasTypeLableIndex).filter(function (v, i, arr) {
                            return arr.indexOf(v) === arr.lastIndexOf(v);
                        });
                        for (var i = 0; i < notHasTypeLableIndex.length; i++) {
                            res.data[0].typeLables.push({
                                lables: [],
                                level: notHasTypeLableIndex[i],
                                levelDesc: '',
                            });
                        }
                        this.typeLables = res.data[0].typeLables.sort((a, b) => {
                            return a.level - b.level;
                        });
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
            });
        },
        /**
         * 切换星级
         * **/
        checkLableLevel(level) {
            // 已经评论过的不能在评论
            if (this.commentInfo.commentId) {
                return;
            }
            this.lableLevel = level;
            this.lableIdList = [];
        },
        /**
         * 设置标签描述id
         * **/
        setLableIdList(lableId) {
            // 已经评论过的不能在评论
            if (this.commentInfo.commentId) {
                return;
            }
            if (this.lableIdList.indexOf(lableId) == -1) {
                this.lableIdList.push(lableId);
            } else {
                this.lableIdList.splice(this.lableIdList.indexOf(lableId), 1);
            }
        },
        /**
         * 添加图片
         * **/
        addImg() {
            this.$refs.vbUpload.inputClick();
        },
        /**
         * 上传图片成功回调
         * **/
        upImgSuccess({ response }) {
            console.log(response, '--------------');
            if (response && response.length > 0) {
                let imgSrc = response[0].filePath;
                if (this.imgs.length < 3) {
                    this.imgs.push(imgSrc);
                } else {
                    alert('最多上传三张图片');
                }
            }
        },
        /**
         * 删除图片
         * **/
        deleteImg(index) {
            this.imgs.splice(index, 1);
            this.$refs.vbUpload.deleteFile1(index);
        },
        /**
         * 点击提交按钮
         * **/
        onSubmitBtnClick() {
            // 判断登录来源
            if (!PreviewTheStop.clickStop()) {
                return;
            }
            if (!this.lableLevel) {
                this.toastContent = '您还未选择评价星级';
                clearInterval(this.timer1);
                this.isShowToast = true;
                this.timer1 = setTimeout(() => {
                    this.isShowToast = false;
                }, 1500);
                return;
            }
            if (this.lableIdList.length == 0) {
                this.toastContent = '您还未选择评价标签';
                this.isShowToast = true;
                clearInterval(this.timer2);
                this.timer2 = setTimeout(() => {
                    this.isShowToast = false;
                }, 1500);
                return;
            }
            let commentdata = {
                commentLevel: this.lableLevel,
                lableId: this.lableIdList.join(','),
                commentContent: this.commentContent,
                commentimageSrc: this.imgs.join(','),
            };
            this.$emit('submitComment', commentdata);
        },
        //评价成功
        commentSuccess() {
            this.isShowToast = true;
            // this.toastContent = "已提交成功，感谢您的评价！";
            this.toastContent = '非常感谢您的评价！';
            let vm = this;
            setTimeout(function () {
                vm.$emit('closeCmtPop');
                vm.isShowToast = false;
            }, 2000);
        },
        //图片预览
        handlePreviewImg(val) {
            this.currentImg = this.$urlUtils.getViewUrl(val);
            this.isShowPreview = true;
        },
        closePreview() {
            this.isShowPreview = false;
        },
    },
};
</script>

<style lang="less" scoped>
.empty-all {
    width: 100%;
    height: 240px;
    background-color: #fff;
    .txt {
        color: #666;
    }
}
.pointer {
    cursor: pointer;
}
.comment-model {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    input[type='submit'],
    input[type='reset'],
    input[type='button'] {
        outline: none;
        filter: chroma(color=#000000);
    }
    .header {
        margin-top: 26px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .header-title {
            height: 40px;
            line-height: 40px;
            font-size: 0;
            text-align: center;
            color: #fff;
            span {
                font-size: 18px;
            }
            .header-msg {
                color: #f8323c;
            }
        }
        .header-line {
            width: 180px;
            height: 2px;
        }
    }
    .content {
        width: 100%;
        box-sizing: border-box;
        padding: 18px;
        &::-webkit-scrollbar {
            display: none;
        }
        .content-star {
            height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 18px;
                height: 18px;
                margin-right: 10px;
            }
            & > span {
                font-size: 16px;
                font-weight: 700;
                color: #fff;
            }
        }
        .content-label {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            margin-top: 12px;
            span {
                // width: 165px;
                width: 150px;
                height: 34px;
                box-sizing: border-box;
                border-radius: 18px;
                line-height: 34px;
                font-size: 14px;
                text-align: center;
                margin-bottom: 14px;
            }
            .content-label-default {
                color: #fff;
                border: 1px solid #979797;
            }
            .content-label-checked {
                background: #f8323c;
                background: linear-gradient(90deg, #ff6870, #f8323c);
                border: 0;
            }
        }
        .content-text {
            width: 100%;
            height: 200px;
            box-sizing: border-box;
            background: #3d4854;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 14px;
            position: relative;
            color: #dddddd;
            textarea {
                width: 100%;
                height: 100%;
                overflow-y: auto;
                box-sizing: border-box;
                border: 0;
                color: #dddddd;
                background: #3d4854;
                resize: none;
                outline: none;
                &::placeholder {
                    color: #ddd;
                }
                &::-webkit-scrollbar {
                    display: none;
                }
            }
            .content-text-length {
                position: absolute;
                right: 16px;
                bottom: 6px;
                font-size: 12px;
            }
        }
        .content-img {
            display: flex;
            .pointer {
                width: 80px;
                height: 80px;
                border-radius: 4px;
                cursor: pointer;
                margin-right: 16px;
            }
            .content-img-container {
                position: relative;
                .content-img-container-delete-btn {
                    display: block;
                    width: 14px;
                    height: 14px;
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    cursor: pointer;
                }
            }
            .uploadAdd {
                width: 80px;
                height: 80px;
                background: #3d4854;
                border-radius: 6px;
                line-height: 80px;
                border: 0;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 16px;
                & > img {
                    width: 14px;
                    height: 14px;
                }
            }
        }
    }
    .footer {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        .footer-unsubmit {
            width: 340px;
            height: 40px;
            border-radius: 20px;
            background: #efefef;
            cursor: pointer;
            &.footer-submit {
                color: #fff;
                background: #f8323c;
                background: linear-gradient(90deg, #ff6870, #f8323c);
                cursor: pointer;
            }
        }
    }
}
.comment-model-mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 2999;
    top: 0;
    left: 0;
    .bg-close-img {
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        right: 50px;
        top: 50px;
        cursor: pointer;
    }
    .big-img-comment-model {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
}
.toast {
    padding: 10px 20px;
    color: #fff;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
    border-radius: 10px;
}
</style>
