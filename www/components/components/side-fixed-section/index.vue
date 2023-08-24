<script lang="jsx">
import { mapState, mapMutations } from 'vuex';
import fish from './js/7fish.js';
import '@/api/bd/api..query-show-dict-status.js';
import DictBox from '@/www/components/dictWidget/components/DictBox/index.vue';
export default {
    components: {
        DictBox,
        vFragment: {
            functional: true,
            render(h, context) {
                const slots = context.slots();
                return Object.keys(slots).map((k) => {
                    return slots[k];
                });
            },
        },
    },
    props: {
        pageShow: {
            type: Boolean,
            default: false,
        },
        projectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            showTop: false,
            isAuthMatch: false,
            showDict: false,
            dotList: [],
            dotList2: [],
            // 首页展示内容
            pageMap: {
                '/learningCenter/test-paper-list': {
                    check: (path) => {
                        const k = '/learningCenter/test-paper-list';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['learn-card', 'app', 'follow', 'idea', 'dict', 'top'],
                },
                '/learningCenter/allTask': {
                    check: (path) => {
                        const k = '/learningCenter/allTask';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['learn-card', 'app', 'follow', 'idea', 'dict', 'top'],
                },
                '/uc/manager': {
                    check: (path) => {
                        const k = '/uc/manager';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['idea', 'listen', 'app', 'top'],
                },
                '/pro-course/': {
                    check: (path) => {
                        const k = '/pro-course/';
                        if (path.startsWith('/pro-course-tryout')) {
                            return false;
                        }
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['concat', 'follow', 'idea', 'top'],
                },
                '/trial-course': {
                    check: (path) => {
                        const k = '/trial-course';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['customer', 'idea', 'follow', 'top'],
                },
                '/free-course': {
                    check: (path) => {
                        const k = '/free-course';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['customer', 'idea', 'follow', 'top'],
                },
                '/books': {
                    check: (path) => {
                        const k = '/books';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['customer', 'idea', 'follow', 'top'],
                },
                '/': {
                    check: (path) => {
                        return path === '/';
                    },
                    list: ['concat', 'phone', 'app', 'learn-card', 'idea', 'top'],
                },
                '/article-info': {
                    check: (path) => {
                        const k = '/article-info';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['concat', 'phone', 'app', 'learn-card', 'idea', 'top'],
                },
                '/hot-article-list': {
                    check: (path) => {
                        const k = '/hot-article-list';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['concat', 'phone', 'app', 'learn-card', 'idea', 'top'],
                },
                '/project-article-list': {
                    check: (path) => {
                        const k = '/project-article-list';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['concat', 'phone', 'app', 'learn-card', 'idea', 'top'],
                },
                '/article-list': {
                    check: (path) => {
                        const k = '/article-list';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['concat', 'phone', 'app', 'learn-card', 'idea', 'top'],
                },
                '/channel': {
                    check: (path) => {
                        const k = '/channel';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['concat', 'phone', 'app', 'learn-card', 'idea', 'top'],
                },
                '/course': {
                    check: (path) => {
                        const k = '/course';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['concat', 'follow', 'idea', 'top'],
                },
                '/tool': {
                    check: (path) => {
                        const k = '/tool';
                        return path.startsWith(k) && path !== '/';
                    },
                    list: ['top'],
                },
            },
            keyMap: {
                dict: {
                    name: 'dict',
                    nameText: '词点快查',
                    type: 'div',
                    className: () => ['item', this.isAuthMatch ? '' : 'hidden'],
                    show: () => {
                        return this.isAuthMatch;
                    },
                    doHandle: () => {
                        this.showDict = !this.showDict;
                    },
                    showHtml: () => {
                        return '';
                    },
                    img: require('./asset/images/dict.png'),
                    select_img: require('./asset/images/select_dict.png'),
                },
                listen: {
                    name: 'listen',
                    nameText: '听课指南',
                    type: 'div',
                    className: ['item'],
                    show: () => true,
                    doHandle: () => {},
                    showHtml: () => {
                        return (
                            <div class="listen">
                                <div class="line1">学员学习</div>
                                <div class="line2">听课指南</div>
                                <a href="/learningCenter/index/myCourse" target="_blank" class="btn">
                                    立即观看
                                </a>
                            </div>
                        );
                    },
                    img: require('./asset/images/listen.png'),
                    select_img: require('./asset/images/select_listen.png'),
                },
                customer: {
                    name: 'customer',
                    nameText: '在线客服',
                    type: 'div',
                    className: ['item'],
                    show: () => true,
                    doHandle: () => {
                        this.openCostomer();
                    },
                    showHtml: () => {
                        return '';
                    },
                    img: require('./asset/images/customer.png'),
                    select_img: require('./asset/images/select_customer.png'),
                },
                follow: {
                    name: 'follow',
                    nameText: '关注公众号',
                    type: 'div',
                    className: ['item'],
                    show: () => true,
                    doHandle: () => {},
                    showHtml: () => {
                        return (
                            <div class="qrcode">
                                <div class="qr_img"></div>
                                <p class="txt">关注公众号</p>
                                <p class="txt">领取备考资料</p>
                            </div>
                        );
                    },
                    img: require('./asset/images/follow.png'),
                    select_img: require('./asset/images/select_follow.png'),
                },
                concat: {
                    name: 'concat',
                    nameText: '在线客服',
                    type: 'div',
                    className: ['content'],
                    doHandle: () => {
                        this.openCostomer();
                    },
                    show: () => false,
                    showHtml: () => {
                        return (
                            <vFragment>
                                <span class="txt">在线客服</span>
                                <div class="q1">
                                    {this.dotList.map((r, index) => {
                                        return <span class={[`d${index + 1}`]}></span>;
                                    })}
                                </div>
                                <div class="q2">
                                    {this.dotList2.map((r, index) => {
                                        return <span class={[`d${index + 1}`]}></span>;
                                    })}
                                </div>
                                <img src={require('./asset/images/concat.png')} class="img" />
                            </vFragment>
                        );
                    },
                    img: require('./asset/images/phone.png'),
                    select_img: require('./asset/images/select_phone.png'),
                },
                phone: {
                    name: 'phone',
                    type: 'div',
                    nameText: '联系电话',
                    className: ['item'],
                    show: () => true,
                    doHandle: () => {},
                    showHtml: () => {
                        return (
                            <div class="phone">
                                <span class="txt">400 861 8800</span>
                            </div>
                        );
                    },
                    img: require('./asset/images/phone.png'),
                    select_img: require('./asset/images/select_phone.png'),
                },
                app: {
                    name: 'app',
                    nameText: 'APP下载',
                    type: 'a',
                    link: 'https://www.niceloo.com/zt1/huizong/ydkt/?e_id=S-12514',
                    className: ['item'],
                    show: () => true,
                    doHandle: () => {},
                    showHtml: () => {
                        return '';
                    },
                    img: require('./asset/images/app.png'),
                    select_img: require('./asset/images/select_app.png'),
                },
                'learn-card': {
                    name: 'learn-card',
                    type: 'link',
                    nameText: '学习卡',
                    link: '/uc/learnCard',
                    className: ['item'],
                    show: () => true,
                    doHandle: () => {},
                    showHtml: () => {
                        return '';
                    },
                    img: require('./asset/images/learn-card.png'),
                    select_img: require('./asset/images/select_learn-card.png'),
                },
                idea: {
                    name: 'idea',
                    type: 'link',
                    nameText: '意见反馈',
                    link: '/suggest',
                    className: ['item'],
                    show: () => true,
                    doHandle: () => {},
                    showHtml: () => {
                        return '';
                    },
                    img: require('./asset/images/idea.png'),
                    select_img: require('./asset/images/select_idea.png'),
                },
                top: {
                    name: 'top',
                    type: 'div',
                    nameText: '回到顶部',
                    className: ['item', 'noBg'],
                    show: () => this.showTop,
                    doHandle: () => {
                        this.handleToTop();
                    },
                    showHtml: () => {
                        return '';
                    },
                    img: require('./asset/images/top.png'),
                    select_img: require('./asset/images/select_top.png'),
                },
            },
            blackUrlList: ['/free-course/detail', '/learningCenter/index/myCourse', '/learningCenter/allTask', '/learningCenter/test-paper-list'],
            showCustomer: false, // 是否显示聊天按钮
            timer: null,
            timer2: null,
            times: null,
            timeD: null,
        };
    },
    computed: {
        ...mapState('onlineService', {
            projectCode: 'projectToServiceCode',
        }),
        showHtml() {
            const check = this.blackUrlList.some((url) => {
                if (this.$route.path.startsWith(url)) {
                    return true;
                } else {
                    return false;
                }
            });

            return !check;
        },
        currentPage() {
            let obj = [];
            Object.keys(this.pageMap).some((k) => {
                let item = this.pageMap[k];
                if (item.check(this.$route.path) && k !== '/') {
                    obj = item.list;
                    return true;
                } else if (this.$route.path === '/') {
                    obj = this.pageMap['/'].list;
                    return true;
                }
                return false;
            });
            if (!obj.length) {
                return [];
            }
            return obj;
        },
        showAutoDialog() {
            const list = ['/trial-course', '/pro-course/'];
            const check = list.some((url) => {
                if (this.$route.path.startsWith(url)) {
                    return true;
                } else {
                    return false;
                }
            });

            return check && false;
        },
        isAutoShowCustomer() {
            const list = [
                '/',
                '/course/',
                {
                    have: '/free-course',
                    noHave: '/free-course/detail',
                },
                {
                    have: '/trial-course',
                    noHave: '/trial-course/detail',
                },
                {
                    have: '/pro-course',
                    noHave: '/pro-course/detail',
                },
                '/hot-article-list/',
            ];
            const routePath = this.$route.path;
            const check = list.some((k) => {
                if (typeof k === 'string' && routePath.startsWith(k) && routePath !== '/' && k !== '/') {
                    return true;
                } else if (typeof k === 'object') {
                    if (routePath !== '/' && k !== '/') {
                        if (routePath.startsWith(k.have) && !routePath.includes(k.noHave)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
                if (this.$route.path === '/') {
                    return true;
                }
                return false;
            });
            return check;
        },
    },
    watch: {
        projectId(val) {
            if (val) {
                this.getAuth();
            }
        },
        projectCode: {
            handler(val, oldVal) {
                if (val && val !== oldVal) {
                    this.initOnlineService();
                }
            },
            immediate: true,
        },
    },
    destroyed() {
        clearInterval(this.timer);
        clearInterval(this.timer2);
        clearTimeout(this.times);
        clearTimeout(this.timeD);
        window.removeEventListener('scroll', this.onscroll, true);
    },
    mounted() {
        if (this.isAutoShowCustomer) {
            this.setProjectCode('默认');
        }
        this.doTimer();
        window.addEventListener('scroll', this.onscroll, true);
    },
    methods: {
        ...mapMutations('onlineService', {
            setProjectCode: 'setProjectCode',
        }),
        initOnlineService() {
            // 初始化在线聊天的配置
            this.qififsh = fish.init(this.projectCode).then(() => {
                this.showCustomer = true;
            });
            // if (this.showAutoDialog) {
            //     this.timeD = setTimeout(() => {
            //         this.qififsh.then(() => {
            //             ysf.open();
            //         });
            //     }, 8 * 1000);
            // }
        },
        doTimer() {
            this.timer = setInterval(() => {
                if (this.dotList.length === 3) {
                    this.dotList.length = 0;
                }
                this.dotList.push({});
            }, 800);
            this.times = setTimeout(() => {
                this.timer2 = setInterval(() => {
                    if (this.dotList2.length === 3) {
                        this.dotList2.length = 0;
                    }
                    this.dotList2.push({});
                }, 800);
            }, 300);
        },
        onscroll() {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (scrollTop >= 100) {
                this.showTop = true;
            } else {
                this.showTop = false;
            }
        },
        handleToTop() {
            if (!this.showTop) {
                return;
            }
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
        openCostomer() {
            this.qififsh.then(() => {
                ysf.open();
            });
        },
        getAuth() {
            let data = {
                url: 'dict/query-show-dict-status',
                params: {
                    projectId: this.projectId,
                },
                isCustom: false,
            };
            this.httpClient(data).then((res) => {
                if (res.show == 'true') {
                    this.isAuthMatch = true;
                } else {
                    this.isAuthMatch = false;
                }
                this.$forceUpdate();
            });
        },
        httpClient({ url, params = {}, isCustom = false }) {
            return this.$callApi(url, {
                ...params,
            }).then(
                (res) => {
                    return res.getData();
                },
                (err) => {
                    if (!isCustom) this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                }
            );
        },
        track(item) {
            const data = {
                bottom_title: item.nameText,
                page_name: document.title,
            };
            this.$yiguan.track('youlu_click_the_hover_button', data);
        },
    },
    render() {
        const renderSlot = (slotHtml) => {
            return <vFragment>{slotHtml}</vFragment>;
        };
        return (
            <div>
                {this.showDict && (
                    <DictBox
                        projectId={this.projectId}
                        dictBoxShow={true}
                        onClose-dict={() => {
                            this.showDict = false;
                        }}
                    />
                )}
                {this.currentPage && (this.showHtml || this.pageShow) && (
                    <div class="side-fixed-section">
                        {this.$slots.default && renderSlot(this.$slots.default)}
                        {this.currentPage &&
                            this.currentPage.map((k) => {
                                const r = this.keyMap[k];
                                const show = r.show();
                                const className = typeof r.className === 'function' ? r.className() : r.className;
                                if (r.name === 'customer' || r.name === 'concat') {
                                    return (
                                        <div
                                            class={className}
                                            onClick={() => {
                                                this.track(r);
                                                r.doHandle();
                                            }}
                                            style={this.showCustomer === false ? 'display: none' : ''}
                                        >
                                            <vFragment>
                                                {r.showHtml()}
                                                {show && (
                                                    <div class="img-wrap">
                                                        <img class="img" src={r.img} />
                                                        <img class="select_img" src={r.select_img} />
                                                    </div>
                                                )}
                                            </vFragment>
                                        </div>
                                    );
                                } else {
                                    return r.type === 'div' ? (
                                        <div
                                            class={className}
                                            onClick={() => {
                                                this.track(r);
                                                r.doHandle();
                                            }}
                                        >
                                            <vFragment>
                                                {r.showHtml()}
                                                {show && (
                                                    <div class="img-wrap">
                                                        <img class="img" src={r.img} />
                                                        <img class="select_img" src={r.select_img} />
                                                    </div>
                                                )}
                                            </vFragment>
                                        </div>
                                    ) : (
                                        <a
                                            href={r.link}
                                            target="_blank"
                                            onClick={() => {
                                                this.track(r);
                                            }}
                                            class="item"
                                        >
                                            <div class="img-wrap">
                                                <img class="img" src={r.img} />
                                                <img class="select_img" src={r.select_img} />
                                            </div>
                                        </a>
                                    );
                                }
                            })}
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.idea {
    position: relative;
    width: 74px;
    height: 87px;
    cursor: pointer;
    .img {
        width: 100%;
        height: 100%;
    }
    .txt {
        position: absolute;
        bottom: 6px;
        left: 13px;
        color: #763709;
        font-size: 12px;
    }
}
.side-fixed-section {
    position: fixed;
    top: 50%;
    right: 0;
    z-index: 51;
    transform: translateY(-38%);

    .item {
        position: relative;
        width: 72px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        background-image: url(./asset/images/bg.png);
        background-size: 64px 64px;
        background-position: center center;
        background-repeat: no-repeat;

        &.noBg {
            background: none;
        }

        &.hidden {
            display: none;
        }

        .img-wrap {
            width: 64px;
            height: 64px;
        }

        &:hover {
            .img {
                display: none;
            }
            .select_img {
                display: inline-block;
            }
            .phone {
                display: flex;
            }
            .listen {
                display: flex;
            }
            .qrcode {
                display: flex;
            }
        }
        .qrcode {
            display: none;
            position: absolute;
            left: -150px;
            top: 0px;
            width: 144px;
            height: 190px;
            background: #ffffff;
            border-radius: 4px;
            // box-shadow: 0px 8px 16px 0px #eceef1;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
            padding-top: 10px;
            .qr_img {
                width: 120px;
                height: 120px;
                margin-bottom: 8px;
                background-image: url('./asset/images/qrcode.jpg');
                background-size: 100% 100%;
            }
            .txt {
                font-size: 14px;
                text-align: center;
                color: #3a3d4b;
            }
        }
        .listen {
            display: none;
            position: absolute;
            left: -135px;
            top: 0px;
            width: 148px;
            height: 176px;
            padding-top: 20px;
            box-sizing: border-box;
            flex-direction: column;
            align-items: center;
            background-image: url(./asset/images/listen_bg.png);
            background-size: 100% 100%;

            .line1 {
                width: 104px;
                height: 44px;
                text-align: center;
                line-height: 44px;
                color: #3a3d4b;
                font-size: 14px;
                background: #f6f7fa;
                border-radius: 8px;
            }
            .line2 {
                color: #3a3d4b;
                font-size: 14px;
                width: 104px;
                height: 44px;
                text-align: center;
                line-height: 44px;
                color: #3a3d4b;
            }

            .btn {
                display: inline-block;
                width: 104px;
                height: 28px;
                color: #ffffff;
                text-align: center;
                line-height: 28px;
                font-size: 14px;
                margin-top: 18px;
                background: linear-gradient(90deg, #ff6870, #f8323c);
                border-radius: 14px;
            }
        }
        .phone {
            display: none;
            width: 107px;
            height: 32px;
            justify-content: center;
            align-items: center;
            font-weight: 400;
            text-align: left;
            color: #543e04;
            position: absolute;
            left: -110px;
            top: 20px;
            background-image: url(./asset/images/txt.png);
            background-size: 100% 100%;

            .txt {
                line-height: 32px;
                font-size: 13px;
                font-weight: 700;
                text-align: left;
                color: #543e04;
            }
        }
        .img {
            display: inline-block;
            flex-shrink: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
        .select_img {
            display: none;
            flex-shrink: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
        }
    }

    .content {
        position: relative;
        cursor: pointer;
        .img {
            width: 70px;
            height: 74px;
        }

        .q2,
        .q1 {
            position: absolute;
            left: -27px;
            top: 16px;
            width: 28px;
            height: 19px;
            background-image: url(./asset/images/q1.png);
            background-size: 100%;

            .d1,
            .d2,
            .d3 {
                display: inline-block;
                position: absolute;
                width: 3px;
                height: 3px;
                top: 7px;
                background-color: #fff;
                border-radius: 50%;
            }
            .d1 {
                left: 6px;
            }
            .d2 {
                left: 13px;
            }
            .d3 {
                left: 19px;
            }
        }
        .q2 {
            z-index: -1;
            top: 3px;
            left: -16px;
            background-image: url(./asset/images/q2.png);
        }
        .txt {
            position: absolute;
            bottom: 10px;
            left: 11px;
            font-size: 12px;
            font-weight: 500;
            text-align: center;
            color: #fff;
            text-shadow: 0px 2px 14px 0px rgba(255, 203, 158, 0.3);
        }
    }
}
</style>
