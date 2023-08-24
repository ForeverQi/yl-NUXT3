<script lang="jsx">
import { mapState, mapMutations } from 'vuex';
import AuditionStationMapView from '@/www/components/course/pro-course/audition/audition-station-map-view/index.vue';
import AuditionTopView from '@/www/components/course/pro-course/audition/audition-top-view/index.vue';
import AuditionCourseView from '@/www/components/course/pro-course/audition/audition-course-view/index.vue';
import AuditionModuleView from '@/www/components/course/pro-course/audition/audition-module-view/index.vue';
import AuditionCatalogueView from '@/www/components/course/pro-course/audition/audition-catalogue-view/index.vue';
import AuditionDivisionView from '@/www/components/course/pro-course/audition/audition-division-view/index.vue';
import AuditionBottomView from '@/www/components/course/pro-course/audition/audition-bottom-view/index.vue';
import AuditionVideoView from '@/www/components/course/pro-course/audition/audition-video-view/index.vue';

import BuyDialog from '@/www/components/course/pro-course/detail/buy-dialog.vue';

import '@/api/ctc/api..quey-system-class.js';

export default {
    name: 'audition-page',
    /**
     * @returns {object} 事件抛出
     */
    provide() {
        return {
            queryIsLose: this.queryIsLose,
        };
    },
    /**
     *
     * @param {object} to 即将进入的路由
     * @param {object} from 离开的路由
     * @param {Function} next 调用该方法后，才能进入下一个钩子
     */
    beforeRouteLeave(to, from, next) {
        this.show = false;
        next();
    },
    layout: 'nullLayout',
    /**
     * @returns {object} 默认数据处理
     */
    data() {
        return {
            classData: {},

            show: true,

            loading: null,
            pageType: '试听专区页',
        };
    },
    /**
     * @returns {object} sdk对象
     */
    head() {
        let courseName = '试听专区';
        if (this.courseName) {
            courseName += '-' + this.courseName;
        }
        return this.$head({
            title: courseName,
            meta: [],
        });
    },
    computed: {
        ...mapState('audition/info', {
            classtypeId: 'classtypeId',
            showBuyDialog: 'showBuyDialog',
            division: 'division',
            mainWidth: 'mainWidth',
            mainHeight: 'mainHeight',
            undercarriage: 'undercarriage',
            courseName: 'courseName',
            moduleList: 'moduleList',
            selectModuleId: 'selectModuleId',
            projectId: 'projectId',
            ifShowPlayer: 'ifShowPlayer',
            isLoading: 'isLoading',
        }),
    },
    watch: {
        /**
         *
         * @param {boolean} val 是否显示购买弹窗
         */
        showBuyDialog(val) {
            this.show = val;
        },
        /**
         *
         * @param {boolean} val 弹监听的值
         */
        show(val) {
            if (val === false) {
                this.setCourseInfo({ showBuyDialog: false });
            }
        },
        /**
         *
         */
        mainWidth() {
            this.setVideoPlaySection();
        },
        /**
         *
         */
        mainHeight() {
            this.setVideoPlaySection();
        },
        /**
         *
         * @param {boolean} val 是否加载完成
         * @param {boolean} oldVal 是否加载完成
         */
        isLoading(val, oldVal) {
            //是否加载完成
            if (val !== oldVal && val === false) {
                this.loading && this.loading.close();
            }
        },
    },
    /**
     * 初始化方法
     */
    mounted() {
        if (this.$platform.isIE === true) {
            let str = '您的浏览器因版本较低或兼容问题无法播放视频，为了您的看课体验，请尝试切换其他浏览器 (谷歌、360、火狐) 或';
            str += '<a href="/compatibility" style="color: #f8323c">点击此处下载浏览器</a>';
            this.$baseUI
                .alert(str, '看课出错了!', {
                    isHtml: true,
                })
                .then(() => {
                    this.$PageUtil.href('/compatibility');
                });
        }
        this.setClasstypeId(this.$route.params.classtypeId);
        this.init();
    },
    methods: {
        ...mapMutations('audition/info', {
            stateReset: 'stateReset',
            setClasstypeId: 'setClasstypeId',
            setCourseInfo: 'setCourseInfo',
            doVideoResume: 'doVideoResume',
        }),
        /**
         * 初始化数据
         */
        init() {
            this.loading = this.$baseUI.loading({ className: 'loader6' });
            this.getData();
        },
        /**
         * 请求数据
         */
        getData() {
            this.$callApi('ctc/quey-system-class', {
                // 显示端
                showitem: 'WEB',
                isNeedintroducepc: 'yes',
                isNeedintroduceapp: 'no',
                // 班型标识
                classTypeId: this.classtypeId,
            })
                .then((APIResponse) => {
                    let res = APIResponse.getData();
                    this.classData = res;
                    this.setCourseInfo({
                        coverimgurl: res.classtypeAppcoverimgurl,
                        courseName: res.classtypeName,
                        projectId: res.projectId,
                    });
                    this.$Promotion.setCLueInfo({
                        url: location.href,
                        pageName: `试听专区页-${res.classtypeName}`,
                        projectId: res.projectId,
                        originCode: 'xitongke',
                        clueWaycode: 'yindao',
                    });
                    this.trackData(`试听专区页-${res.classtypeName}`);
                })
                .catch((err) => {
                    this.$Promotion.setCLueInfo({
                        url: location.href,
                        pageName: `试听专区页`,
                        projectId: '',
                        originCode: 'xitongke',
                        clueWaycode: 'yindao',
                    });
                    this.trackData(`试听专区页`);
                    if (err.getAttachedData() && err.getAttachedData().getData().code === '1003') {
                        // 课程失效
                        this.isNull = true;
                        this.setCourseInfo({
                            isLoading: false,
                            undercarriage: true,
                            ifShowPlayer: true,
                        });
                    } else {
                        this.$niceloo.api.handleFailure(err);
                    }
                });
        },
        /**
         *
         * @param {string} title 标题
         */
        trackData(title) {
            const userInfo = this.$storage.get('loginStatus') || {};
            const track = {
                page_type: '试听专区页', // 页面类型
                page_name: title,
                course_type: '系统课',
                college_name: '-',
                project_position: this.classData.projectId,
                is_login_in: !!userInfo.studentDeposittype,
                is_student: userInfo.studentDeposittype === 'T',
            };
            this.$yiguan.track('youlu_click_all_pages', track);
        },
        /**
         * 查询当前产品是否失效
         *
         * @returns {boolean} promise
         */
        queryIsLose() {
            return new Promise((resolve) => {
                this.$callApi('ctc/quey-system-class', {
                    // 显示端
                    showitem: 'WEB',
                    isNeedintroducepc: 'yes',
                    isNeedintroduceapp: 'no',
                    // 班型标识
                    classTypeId: this.classtypeId,
                    onsuccess: () => {
                        resolve(false);
                    },
                    onerror: (err) => {
                        if (err.getAttachedData() && err.getAttachedData().getData().code === '1003') {
                            // 课程失效
                            this.$baseUI.confirm({
                                content: '该产品已下架',
                                showCancel: false,
                                confirmText: '返回系统课',
                                success: ({ confirm }) => {
                                    if (confirm) {
                                        this.$router.replace(this.project.projectSeoCode ? `/pro-course/all/${this.project.projectSeoCode}` : '/pro-course');
                                    } else {
                                        this.isNull = true;
                                    }
                                },
                            });
                        } else {
                            this.isError = true;
                        }
                        resolve(true);
                    },
                });
            });
        },
        /**
         *
         */
        setVideoPlaySection() {
            if (this.mainWidth === 0 || this.mainHeight === 0) {
                // 两个值有一个值为0 就不在设置
                this.$refs.pageSection.style.width = '';
                this.$refs.pageSection.style.height = '';
            } else {
                this.$refs.pageSection.style.width = `${this.mainWidth}px`;
                this.$refs.pageSection.style.height = `${this.mainHeight}px`;
            }

            // let windowHeight = this.$refs.pageHtvideo.offsetHeight;
            // let windowWidth = this.$refs.pageHtvideo.offsetWidth;

            // let h = (windowHeight - this.mainHeight) / 2;
            // let w = (windowWidth - this.mainWidth) / 2;
            // if (h > 57) {
            //     this.showLogo = true;
            //     this.$refs.bgLogo.style.top = h + 10 - 50 + 'px';
            //     this.$refs.bgLogo.style.left = (w === 0 ? 40 : w) + 'px';
            // } else {
            //     this.showLogo = false;
            // }
        },
    },
    /**
     * @returns {object} 虚拟dom
     */
    render() {
        return (
            <div class="audition" ref="pageHtvideo">
                {this.showBuyDialog && (
                    <BuyDialog
                        show={true}
                        data={this.classData}
                        pageType={this.pageType}
                        clickPosition={`试听专区`}
                        onBuy-fn={(className) => {
                            const userInfo = this.$storage.get('loginStatus') || {};
                            const track = {
                                course_name: this.courseName,
                                college_name: '-',
                                project_position: this.projectId,
                                page_name: document.title,
                                class_name: className,
                                is_login_in: !!userInfo.studentDeposittype,
                                is_student: userInfo.studentDeposittype === 'T',
                            };
                            this.$yiguan.track('web_youlu_click_listen_lijigoumai', track);
                        }}
                        on={{
                            'update:show': (v) => {
                                console.log('@@#', v);
                                this.setCourseInfo({ showBuyDialog: v });
                                this.doVideoResume();
                            },
                        }}
                    />
                )}
                <div class="page-section" ref="pageSection" style={this.ifShowPlayer === true ? '' : 'visibility: hidden;'}>
                    {this.undercarriage === true && (
                        <div class="page-wrap">
                            <AuditionTopView />
                            <div class="play-main">
                                <AuditionStationMapView
                                    type="undercarriage"
                                    btnHandle={{
                                        fn: () => {
                                            this.$PageUtil.href(`/pro-course`);
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    {this.undercarriage === false && (
                        <div class="page-wrap">
                            <AuditionTopView />
                            <div class="play-main">
                                <div class="play-wrap">
                                    <AuditionVideoView />
                                </div>
                                <div class="division">
                                    <AuditionDivisionView />
                                </div>
                                <div class="side-wrap" style={this.division === 2 ? '' : 'width: 0;'}>
                                    <AuditionCourseView />
                                    <div class="content">
                                        <AuditionModuleView />
                                        {this.moduleList.length === 0 && <AuditionStationMapView type="no-course" />}
                                        {this.moduleList.length === 0 && this.loading === true && <AuditionStationMapView type="catalogue-play" />}
                                        {this.moduleList.map((item, index) => {
                                            return (
                                                <AuditionCatalogueView
                                                    key={item.modulId}
                                                    item={item}
                                                    style={item.modulId === this.selectModuleId ? '' : 'display: none'}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <AuditionBottomView />
                        </div>
                    )}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.audition {
    position: relative;
    height: 100vh;
    min-height: 600px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #232b34;
    background-image: url(./asset/images/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    overflow: hidden;

    .page-section {
        position: relative;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        transition: all 0.2s;
        &::after {
            content: '';
            display: block;
            position: absolute;
            bottom: 8px;
            left: 0;
            right: 0;
            height: 50px;
            background-image: url(./asset/images/b-bg.png);
            background-repeat: no-repeat;
            background-position: center bottom;
            background-size: 100%;
        }
    }

    .page-wrap {
        position: relative;
        // width: calc(100% - 80px);
        height: calc(100% - 50px);
        display: flex;
        margin: 25px 40px;
        justify-content: space-between;
        flex-direction: column;
        border-radius: 18px;
        z-index: 1;
        overflow: hidden;
        background: #202631;
        border: solid 1px #505865;
        border-bottom-color: #393f48;
    }

    .play-main {
        display: flex;
        height: 100%;
        padding: 0 20px;
        overflow: hidden;

        .division {
            background-color: #1b212a;
        }
        .play-wrap {
            width: 100%;
        }

        .side-wrap {
            display: flex;
            flex-direction: column;
            width: 360px;
            flex-shrink: 0;
            overflow: hidden;
            transition: width 0.2s ease;

            .content {
                display: flex;
                height: 100%;
                padding-top: 16px;
                background-color: #2a3440;
                flex-direction: column;
                overflow: hidden;
            }
        }
    }
}
</style>
