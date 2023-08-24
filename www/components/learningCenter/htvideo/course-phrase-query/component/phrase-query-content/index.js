import { mapState } from 'vuex';
import PhraseQueryImage from '../phrase-query-image/index.vue';
import PhraseQuerySuggest from '../phrase-query-suggest/index.vue'; //点赞及提建议
import PhraseQueryVideo from '../phrase-query-video/index.vue';
import '@/api/cbn/api..get-cbn-noun-detail-vid-token.js';
import '@/api/api..query-open-play-sign.js';
import '@/api/api..query-quest-play-token.js';
export default {
    name: 'phrase-query-content',
    components: { PhraseQueryImage, PhraseQuerySuggest, PhraseQueryVideo },
    props: {
        //词点详情列表
        list: {
            type: Array,
            default: () => [],
        },
        //科目id
        subjectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            activeName: '', //选中的科目名称
            currentSubject: {}, //选中的科目对象
            detailInfo: '', // 词点富文本详细内容
            activeIndex: 0, //选中的科目
            isMore: null, //项目是否超过屏幕宽度
            timeout: null, //定时器
            imageStyle: {}, //动态设置图片大小
            isShowMask: false, //是否显示大图
            imageUrl: '', //图片路径
            token: '', //获取视频的token
            videoId: '', //视频id
            PlayVideo: null, //当前播放的视频
            key: new Date().valueOf(),
        };
    },
    watch: {
        list: {
            handler(val) {
                if (val.length) {
                    this.setIsMore();
                    this.setCheckData(val);
                }
            },
            deep: true,
            immediate: true,
        },
        //获取视频id和token
        currentSubject: {
            handler(val) {
                this.closeVideo();
                if (Object.keys(val).length !== 0) {
                    this.videoId = val.video || '';
                    if (this.videoId !== '') {
                        this.key = new Date().valueOf();
                        this.getToken();
                    }
                }
            },
            deep: true,
            immediate: true,
        },
    },
    computed: {
        // 格式化富文本详细内容
        calcDetailInfo() {
            return this.calcSrc(this.detailInfo);
        },
        ...mapState('course/info', {
            userName: 'userName',
        }),
    },
    methods: {
        //选中科目
        handChange(item, index) {
            this.currentSubject = item;
            this.detailInfo = item.text;
            this.activeIndex = index;
        },
        previous() {
            let subjectWrapWidth = this.$refs.subjectWrap.offsetWidth;
            let subjectListWidth = this.$refs.subjectList.offsetWidth;
            let offset = parseFloat(this.$refs.subjectList.style.left) || 0;
            if (offset === 0) return;
            if (subjectWrapWidth - Math.abs(offset + subjectListWidth) > 0) {
                this.$refs.subjectList.style.left = `${offset + subjectListWidth}px`;
            } else {
                this.$refs.subjectList.style.left = `0px`;
            }
        },
        next() {
            let subjectWrapWidth = this.$refs.subjectWrap.offsetWidth;
            let subjectListWidth = this.$refs.subjectList.offsetWidth;
            let offset = parseFloat(this.$refs.subjectList.style.left) || 0;
            if (Math.abs(offset - subjectWrapWidth) === subjectListWidth) return;
            if (Math.abs(offset - subjectListWidth) < subjectWrapWidth) {
                this.$refs.subjectList.style.left = `${offset - subjectListWidth}px`;
            } else {
                this.$refs.subjectList.style.left = `${offset - (Math.abs(offset - subjectListWidth) - subjectWrapWidth)}px`;
            }
        },
        //判断科目是否需要展示多个
        setIsMore() {
            if (this.$refs.subject) {
                clearTimeout(this.timeout);
                let width = 0;
                this.list.forEach((item, index) => {
                    if (index === this.list.length - 1) {
                        width += this.strLen(item.subjectName, 14) + 28;
                    } else {
                        width += this.strLen(item.subjectName, 14) + 40;
                    }
                });
                if (this.$refs.subject.offsetWidth - 40 < width) {
                    this.isMore = true;
                } else {
                    this.isMore = false;
                }
            } else {
                this.timeout = setTimeout(() => {
                    this.setIsMore();
                }, 100);
            }
        },
        /**
         * @description 查询字符的长度
         * @param {string} url 字符
         * @param {number} size 字体大小
         */
        strLen(str, size = 14) {
            let len = 0;
            for (let i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
                    len += 2;
                } else {
                    len++;
                }
            }
            return (len * size) / 2;
        },
        //设置选中的数据
        setCheckData(res) {
            if (this.subjectId && res.find((item) => item.subjectId === this.subjectId)) {
                let activeItem = res.find((item) => item.subjectId === this.subjectId);
                this.detailInfo = activeItem.text;
                this.activeIndex = res.findIndex((item) => item.subjectId === this.subjectId);
                this.currentSubject = activeItem;
            } else {
                this.detailInfo = res[0].text;
                this.activeIndex = 0;
                this.currentSubject = res[0];
            }
        },
        /**
         * @description 格式化文本、讲图片路径转为图片组件
         * @param {string} data 富文本内容
         */
        calcSrc(data) {
            return data.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
                return `<img  class="show-img" src="${this.$urlUtils.getViewUrl(capture)}"  alt=""  ></img>`;
            });
        },
        //查看大图
        showBigImage(e) {
            if (e.target.nodeName == 'IMG') {
                this.isShowMask = true;
                this.$nextTick(() => {
                    this.imageUrl = e.target.src;
                    if (e.target.height * 1.5 >= window.innerHeight || e.target.height >= window.innerHeight) {
                        this.imageStyle.height = window.innerHeight - 20 + 'px';
                        return;
                    }
                    this.imageStyle.height = e.target.height * 1.5 + 'px';
                });
            }
        },
        //关闭大图
        closeWrap() {
            this.isShowMask = false;
            this.imageStyle = {};
        },
        //获取token
        getToken() {
            // niceloo.api.call('dict/get-cbn-noun-detail-vid-token', {
            //     vid: this.videoId,
            //     groupId: this.currentSubject.groupId,
            //     onsuccess: (data) => {
            //         this.token = data.token;
            //         this.play();
            //     },
            //     onerror: (err) => {
            //         niceloo.api.handleFailure(err);
            //         this.token = '';
            //     },
            // });
            this.getPlaySign(this.videoId).then((data) => {
                this.token = data.token;
                this.play();
            });
        },
        getPlayToken(tokenParams) {
            return this.$callApi('cc/query-quest-play-token', {
                ...tokenParams,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    this.$niceloo.api.handleFailure(err);

                    return Promise.reject();
                }
            );
        },
        getPlaySign(vid) {
            return this.$callApi('cc/query-open-play-sign', {
                vid,
            }).then((signRes) => {
                const userInfo = this.$storage.get('loginStatus') || {};
                const tokenParams = {
                    vid,
                    userYouLuNum: userInfo.userYoulunum,
                    userId: userInfo.userId,
                    ...signRes.getData(),
                };
                return this.getPlayToken(tokenParams);
            });
        },
        play() {
            if (this.PlayVideo === null) {
                this.$nextTick(() => {
                    let param = {
                        vid: this.currentSubject.video,
                        type: 'C',
                        playsafe: this.token,
                        groupId: this.currentSubject.groupId,
                        code: this.userName,
                        fullscreenProxy: false,
                    };
                    console.log(this.userName, '@@@#');
                    this.PlayVideo = this.$refs.PhraseQueryVideo.$refs.videoView.playVid(param);
                    // console.log('this.$refs.PhraseQueryVideo.$refs.videoView', this.$refs.PhraseQueryVideo.$refs.videoView);
                });
            }
        },
        closeVideo() {
            if (this.PlayVideo && this.PlayVideo !== null && this.token !== '' && this.token) {
                this.$refs.PhraseQueryVideo.$refs.videoView.PlayReturn.destroy();
                this.PlayVideo = null;
                this.token = '';
            }
        },
        //使页面滚动到底部
        onScroll() {
            this.$nextTick(() => {
                document.querySelector('.phrase-query-content').scrollTo({
                    top: 20000,
                    behavior: 'smooth',
                });
            });
        },
    },
};
