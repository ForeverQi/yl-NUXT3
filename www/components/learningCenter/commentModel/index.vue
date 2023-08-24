<template>
    <div>
        <div class="comment-model-mask" v-if="isShow">
            <div class="comment-model">
                <div class="header">
                    <img src="./asset/images/decorateImg.svg" class="header-img" />
                    <div class="header-title">
                        {{ lableType === 'HT' ? '学管师评价' : '课程评价' }}
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
                            v-for="(item, index) in LableList"
                            :key="index"
                            :class="{
                                'content-label-checked': lableIdList.indexOf(item.lableId) != -1 ? true : false,
                                pointer: !isAlreadyEvaluate,
                            }"
                            @click="isAlreadyEvaluate ? '' : setLableIdList(item.lableId)"
                        >
                            {{ item.lableName.length > 10 ? item.lableName.substring(0, 10) + '...' : item.lableName }}
                        </span>
                    </div>
                    <div v-show="lableLevel" class="content-text">
                        <textarea
                            :placeholder="lableType == 'HT' ? '您对学管师的服务感觉如何，写下想说的话吧！' : '听课体验如何，对老师的讲课满意吗？'"
                            v-model="commentContent"
                            maxlength="200"
                            :disabled="isAlreadyEvaluate ? 'disabled' : false"
                        />
                        <up-load-image-auto v-show="false" ref="vbUpload" @success="upImgSuccess" limit="3" />
                        <div class="content-img">
                            <div class="content-img-container" v-for="(item, index) in imgs" :key="index">
                                <img class="pointer" :src="$urlUtils.getViewUrl(item)" alt="" :key="index" @click="openBigImg(item)" />
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
                <img class="big-img-comment-model" :src="$urlUtils.getViewUrl(bigImgUrl)" />
            </div>
        </div>
        <div v-if="isShowToast" class="toast">
            {{ toastContent }}
        </div>
    </div>
</template>

<script>
import '@/api/cmt/api.CMT1102.cmt-label-list.js';
import upLoadImageAuto from '@/www/components/personalCenter/upLoadImageAuto/upLoadImageAuto/index.vue';
export default {
    name: 'commentModel',
    components: {
        upLoadImageAuto,
    },
    props: {
        lableType: {
            type: String,
            default: 'LC',
        },
        // eslint-disable-next-line
        commentInfo: {},
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
                if (this.typeLables[i].level == this.lableLevel) {
                    LableList = this.typeLables[i].lables;
                    break;
                }
            }
            console.log(LableList);
            return LableList;
        },
        levelDesc() {
            let levelDesc = '';
            for (let i = 0; i < this.typeLables.length; i++) {
                if (this.typeLables[i].level == this.lableLevel) {
                    levelDesc = this.typeLables[i].levelDesc;
                    break;
                }
            }
            return levelDesc;
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
    mounted() {
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
            console.log('类型列表');
            this.$callApi('cmt/cmt-label-list', {
                lableType: this.lableType,
                onsuccess: (res) => {
                    console.log(res);
                    if (res.data[0]) {
                        console.log(res.data[0]);
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
                },
                onerror: this.$niceloo.api.handleFailure,
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
                    alert('最多上传三张图片');
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
            setTimeout(() => {
                this.$emit('closeCmtPop');
                this.isShowToast = false;
                this.isShow = true;
            }, 700);
        },
        //初始化评价详情
        initComment() {
            if (this.commentInfo && this.commentInfo.commentId) {
                this.isAlreadyEvaluate = true;
                this.commentContent = this.commentInfo.commentContent;
                this.lableLevel = this.commentInfo.commentLevel;
                console.log('444444444');
                console.log(this.commentInfo);
                this.imgs = this.commentInfo.images;
                console.log(this.imgs);
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
@import './css/commentModel.less';
</style>
