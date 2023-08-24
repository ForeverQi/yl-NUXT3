<template>
    <div>
        <div class="comment-model-mask" v-if="isShow">
            <div class="comment-model">
                <div class="header">
                    <img src="./asset/images/decorateImg.svg" class="header-img" />
                    <div class="header-title">
                        {{ lableType === 'HT' ? '班主任评价' : '课程评价' }}
                        <div class="header-title-close">
                            <img src="./asset/images/close.svg" @click="close" />
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="content-start">
                        <img
                            v-for="(item, index) in typeLables"
                            :src="lableLevel > item.level - 1 ? startNoChoosed : startChoosed"
                            :key="index"
                            :class="{ pointer: !isAlreadyEvaluate }"
                            @click="isAlreadyEvaluate ? '' : checkLableLevel(item.level)"
                        />
                        <span>{{ levelDesc }}</span>
                    </div>
                    <div class="content-label">
                        <span
                            v-show="lableLevel"
                            class="content-label-default"
                            :class="{
                                'content-label-checked': lableIdList.indexOf(item.lableId) != -1 ? true : false,
                                pointer: !isAlreadyEvaluate,
                            }"
                            v-for="(item, index) in LableList"
                            :key="index"
                            @click="isAlreadyEvaluate ? '' : setLableIdList(item.lableId)"
                        >
                            {{ item.lableName.length > 10 ? item.lableName.substring(0, 10) + '...' : item.lableName }}
                        </span>
                    </div>
                    <div v-show="lableLevel" class="content-text">
                        <textarea
                            v-if="placeholderTxt || commentContent"
                            :placeholder="placeholderTxt"
                            v-model="commentContent"
                            maxlength="200"
                            :disabled="isAlreadyEvaluate ? 'disabled' : false"
                        ></textarea>
                        <div class="empty-all" v-if="isAlreadyEvaluate && imgs.length === 0 && commentContent === ''">
                            <img src="./asset/images/empty2.png" />
                            <div class="txt">暂无评语~</div>
                        </div>
                        <vb-upload-img-auto v-show="false" ref="vbUpload" @success="upImgSuccess" limit="3" />
                        <div class="content-img" v-if="!(isAlreadyEvaluate && imgs.length === 0)">
                            <div class="content-img-container" v-for="(item, index) in imgs" :key="index">
                                <img class="pointer" :src="$nuxt.$niceloo.path.getServerFileViewPath(item)" alt="" :key="index" @click="openBigImg(item)" />
                                <img
                                    v-if="!isAlreadyEvaluate"
                                    src="./asset/images/deleteBtn.svg"
                                    class="content-img-container-delete-btn"
                                    :class="{ pointer: !isAlreadyEvaluate }"
                                    @click="isAlreadyEvaluate ? '' : deleteImg(index)"
                                />
                            </div>
                            <img
                                v-if="!isAlreadyEvaluate"
                                src="./asset/images/addImgBtn.svg"
                                alt=""
                                class="pointer"
                                @click="isAlreadyEvaluate ? '' : addImg()"
                            />
                        </div>
                    </div>
                    <div class="footer">
                        <input
                            v-if="!isAlreadyEvaluate"
                            type="button"
                            value="提  交"
                            class="footer-unsubmit"
                            :class="{ 'footer-submit': lableLevel && lableIdList.length }"
                            @click="onSubmitBtnClick"
                        />
                    </div>
                </div>
            </div>
            <div v-if="isShowBigImg" class="comment-model-mask" @click.self="isShowBigImg = false">
                <div class="bg-close-img" @click="isShowBigImg = false">
                    <img src="./asset/images/close.svg" />
                </div>
                <img class="big-img-comment-model" :src="$nuxt.$niceloo.path.getServerFileViewPath(bigImgUrl)" />
            </div>
        </div>
        <div v-if="isShowToast" class="toast">
            {{ toastContent }}
        </div>
    </div>
</template>

<script>
import VbWindow from '../components/vbWindow/index.vue';
// import vbUploadImgAuto from '../components/vbUploadImgAuto/index.vue';
import vbUploadImgAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto/index.vue';

export default {
    name: 'commentModel',
    components: { VbWindow, vbUploadImgAuto },
    props: {
        lableType: {
            type: String,
            default: 'LC',
        },
        commentInfo: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            startNoChoosed: require('./asset/images/startNoChoosed.svg'),
            startChoosed: require('./asset/images/startChoosed.svg'),
            isShow: false,
            typeLables: [],
            lableLevel: 0,
            imgs: [],
            commentContent: '',
            lableIdList: [],
            commentdata: {},
            timer: null,
            isShowToast: false,
            toastContent: '',
            isShowBigImg: false,
            bigImgUrl: '',
            isAlreadyEvaluate: false, //标识是否已评价
            timer1: null,
            timer2: null,
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
            if (this.isAlreadyEvaluate) {
                return '';
            }
            return this.lableType == 'HT' ? '您对班主任的服务感觉如何，写下想说的话吧！' : '听课体验如何，对老师的讲课满意吗？';
        },
    },
    watch: {
        commentInfo() {
            this.show();
            if (!this.commentInfo.commentId) {
                this.reset();
            }
        },
    },
    created() {
        this.show();
    },
    methods: {
        /**
         * 查看图片大图
         * **/
        openBigImg(url) {
            this.bigImgUrl = url;
            this.isShowBigImg = true;
        },
        // 显示评价弹窗
        show() {
            this.getLabelList();
            this.lableIdList = [];
            /*setTimeout(()=>{
                      if(!this.lableLevel) this.$emit('closeCmtPop');
                  },10000)*/
        },
        // 重置评价弹窗数据
        reset() {
            this.commentdata = {};
            this.typeLables = [];
            this.lableLevel = 0;
            this.imgs = [];
            this.commentContent = '';
            this.lableIdList = [];
        },
        // 关闭评价弹窗
        close() {
            this.reset();
            this.$emit('closeCmtPop');
        },
        // 点击提交按钮
        onSubmitBtnClick() {
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
            this.commentdata = {
                commentLevel: this.lableLevel,
                lableId: this.lableIdList.join(','),
                commentContent: this.commentContent,
                commentimageSrc: this.imgs.join(','),
            };
            this.$emit('submitComment', this.commentdata);
        },
        // 获取标签列表
        getLabelList() {
            this.$callRawApi({
                api: 'cmt/label/list',
                params: {
                    lableType: this.lableType,
                },
            })
                .then((_response) => {
                    let res = _response.getData();
                    console.log('返回的数据', res);

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
                        this.isShow = true;
                        this.$nextTick(() => {
                            this.initComment();
                        });
                    }
                })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                });
        },
        // 切换星级
        checkLableLevel(level) {
            // 已经评论过的不能在评论
            if (this.commentInfo.commentId) {
                return;
            }
            this.lableLevel = level;
            this.lableIdList = [];
        },
        // 设置标签描述id
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
        // 添加图片
        addImg() {
            this.$refs.vbUpload.inputClick();
        },
        // 上传图片成功回调
        upImgSuccess({ response }) {
            //上传头像成功
            console.log(response, '--------------');
            if (response && response.length > 0) {
                let imgSrc = response[0].filePath;
                if (this.imgs.length < 3) {
                    this.imgs.push(imgSrc);
                } else {
                    this.$baseUI.alert('最多上传三张图片');
                }
            }
        },
        deleteImg(index) {
            this.imgs.splice(index, 1);
        },
        //评价成功
        commentSuccess() {
            this.isShowToast = true;
            this.isShow = false;
            // this.toastContent = "已提交成功，感谢您的评价！";
            this.toastContent = '非常感谢您的评价！';
            let vm = this;
            setTimeout(function () {
                vm.$emit('closeCmtPop');
                vm.isShowToast = false;
                vm.isShow = true;
            }, 2000);
        },
        //初始化评价详情
        initComment() {
            if (this.commentInfo && this.commentInfo.commentId) {
                this.isAlreadyEvaluate = true;
                this.commentContent = this.commentInfo.commentContent;
                this.lableLevel = this.commentInfo.commentLevel;
                this.imgs = this.commentInfo.images;
                this.LableList.forEach((item) => {
                    let labels = this.commentInfo.labels;
                    for (let i = 0; i < labels.length; i++) {
                        if (item.lableName == labels[i].lableName) this.lableIdList.push(labels[i].lableId);
                    }
                });
            } else {
                this.isAlreadyEvaluate = false;
            }
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
.comment-model-mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    z-index: 2999;
    top: 0;
    left: 0;
    input[type='submit'],
    input[type='reset'],
    input[type='button'] {
        outline: none;
        filter: chroma(color=#000000);
    }
    .big-img-comment-model {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
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
    .comment-model {
        width: 400px;
        background: #fff;
        border-radius: 8px;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .header {
            width: 100%;
            height: 50px;
            background: #fff;
            border-radius: 8px 8px 0px 0px;
            box-shadow: 0px -2px 8px 5px rgba(11, 42, 113, 0.05);
            position: relative;
            &-img {
                display: inline-block;
                width: 156px;
                margin-bottom: -60px;
                position: absolute;
                z-index: 9;
                top: -100px;
                left: 122px;
            }
            &-title {
                line-height: 50px;
                font-size: 22px;
                text-align: center;
                font-weight: 700;
                color: #333;
                letter-spacing: -1px;
                position: relative;
                z-index: 99;
                background-color: #fff;
                border-radius: 8px;
                &-close {
                    width: 16px;
                    height: 16px;
                    position: absolute;
                    top: 17px;
                    right: 20px;
                    cursor: pointer;
                    line-height: 0;
                    font-size: 0;
                }
            }
        }
        .content {
            overflow-y: auto;
            padding: 15px;
            &::-webkit-scrollbar {
                display: none;
            }
            &-start {
                height: 40px;
                line-height: 40px;
                img {
                    width: 26px;
                    height: 26px;
                    vertical-align: middle;
                    margin-right: 16px;
                }
                & > span {
                    font-size: 16px;
                    font-weight: 700;
                }
                & > span:nth-of-type(1) {
                    padding-right: 10px;
                    color: #000;
                }
                & > span:nth-of-type(2) {
                    padding-left: 10px;
                    color: #ffaa21;
                }
            }
            &-label {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                span {
                    box-sizing: border-box;
                    width: 178px;
                    height: 28px;
                    line-height: 28px;
                    font-size: 12px;
                    border-radius: 5px;
                    text-align: center;
                    padding: 0 16px;
                    margin: 8px 0;
                }
                &-default {
                    color: #666;
                    border: 1px solid #e6e6e6;
                }
                &-checked {
                    color: #e96330;
                    background: #ffefe9;
                    border: 1px solid transparent;
                }
            }
            &-text {
                position: relative;
                min-height: 240px;
                background-color: #f8f8f8;
                border-radius: 4px;
            }
            .content-img {
                margin-top: 10px;
                overflow: hidden;
                display: flex;
                padding-top: 16px;
                padding-bottom: 16px;

                img {
                    max-width: 56px;
                    max-height: 56px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-left: 16px;
                }
                &-container {
                    position: relative;
                    .content-img-container-delete-btn {
                        display: block;
                        width: 14px;
                        height: 14px;
                        position: absolute;
                        top: 2px;
                        right: 2px;
                        cursor: pointer;
                    }
                }
            }
            textarea {
                width: 350px;
                height: 140px;
                overflow-y: auto;
                background: #f9f9f9;
                line-height: 2em;
                border: 0;
                padding: 10px;
                font-size: 14px;
                color: #666;
                resize: none;
                outline: none;
                &::placeholder {
                    color: #999;
                }
            }
        }
        .footer {
            margin: 15px 0 0;
            input {
                width: 160px;
                height: 36px;
                border-radius: 18px;
            }
            &-unsubmit {
                color: #b1b1b1;
                background: #efefef;
                margin-right: 20px;
                cursor: pointer;
                border: none;
                &.footer-submit {
                    color: #fff;
                    box-shadow: 0px 4px 6px -2px rgba(231, 57, 40, 0.3);
                    background: linear-gradient(100deg, #ff2e30 8%, #ff957a 100%);
                    cursor: pointer;
                    border: none;
                }
            }
        }
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
.comment-model-mask .comment-model .content-text img {
    position: static;
}

.wrap-img {
    padding-left: 20px;
    zoom: 1;
    &::after {
        content: '';
        display: block;
        clear: both;
        height: 0;
    }
    .item {
        position: relative;
        float: left;
        margin-right: 10px;

        img.content-img-container-delete-btn {
            position: absolute;
            width: 10px;
            height: 10px;
            top: 2px;
            left: 44px;
            padding: 2px;
            background-color: #e73928;
            border-radius: 50%;
        }
    }
}
</style>
