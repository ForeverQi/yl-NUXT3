<script lang="jsx">
import LiveCalendarIndex from '@/www/components/components/live-calendar-index/index.vue';
import BannerSection from '@/www/components/index/banner-section/index.vue';
import ExperienceSection from '@/www/components/index/experience-section/index.vue';
import ClassSection from '@/www/components/index/class-section/index.vue';
import ArticleSection from '@/www/components/index/article-section/index.vue';
import BookSection from '@/www/components/index/book-section/index.vue';
import StorySection from '@/www/components/index/story-section/index.vue';
import TeacherSection from '@/www/components/index/teacher-section/index.vue';
import AboutSection from '@/www/components/index/about-section/index.vue';
import SchoolSection from '@/www/components/index/school-section/index.vue';
import Agreement from '@/www/components/index/agreement/index.vue';
import ClassSide from '@/www/components/index/classSide/index.vue';
import RecommendCourseSection from '@/www/components/index/recommend-course-section/index.vue';
import AdDialog from '@/www/components/index/ad-dialog/index.vue';
import AdBottom from '@/www/components/index/ad-bottom/index.vue';
import Empty from '@/www/components/components/empty/index.vue';
import '@/api/channel/api..query-project-channel-config.js';
import '@/api/mcu/api.mcu-07.home-ad-pic.js';
export default {
    components: {},
    layout: 'new-default',
    data() {
        return {
            projectList: [],
            mapConfig: [],
            showTxt: '',
            showMap: {},
            isShow: false,
            liveEmpty: true,

            firstAd: {},
            secondAd: {},

            showAdDialog: false,
            showAdBotton: false,
            showSelectProject: false,
        };
    },
    fetch() {
        return this.init();
    },
    head() {
        return this.$head({
            title: `优路教育-点亮职业人生`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
    mounted() {
        let isAcceptAgreeMentFlag = this.$storage.get('isAcceptAgreeMentFlag') || '';
        if (!isAcceptAgreeMentFlag) {
            this.isShow = true;
        } else {
            this.showSelectProject = true;
        }
        this.doTrack();
    },
    methods: {
        doTrack() {
            // 显示选择项目弹窗
            // const userInfo = this.$storage.get('loginStatus') || {};

            // const data = {
            //     college_name: '-', // 学院名称
            //     user_project_position: '-', // 用户已选项目名称
            //     project_id: '-', // 用户已选项目ID
            //     user_id: userInfo.userId ?? '-', // 用户标识 （已登录的用户）
            //     platform_type: '优路教育官网-Web端', // 平台名称

            //     page_type: '首页', // 页面类型
            //     page_name: '优路教育-点亮职业人生', // 页面名称
            //     course_type: '-', // 页面名称
            //     project_position: '-', // 项目名称
            //     subject_name: '-', // 科目名称
            //     sort_name: '-', // 运营分类/栏目名称
            //     is_pay: false, // 当前页面是否未付费资源
            //     // course_price: '-', // 资源价格
            //     is_login_in: !!userInfo.userId,
            //     is_student: userInfo.studentDeposittype === 'T',
            // };
            const data = {
                page_name: document.title, // 页面名称
                page_url: location.href,
                page_type: '首页',
                course_type: '-',
                sort_name: '-',
                channel_name: '-',
                project_id: '-',
                subject_id: '-',
            };
            this.$yiguan.track('youlu_click_all_pages', data);
        },
        init() {
            if (process.client) {
                let projectInfo = this.$storage.get('indexSelectProject');
                if (!projectInfo) {
                    projectInfo = {};
                }
                this.$Promotion.setCLueInfo({
                    originCode: 'guanwangzhuc',
                    clueWaycode: 'zhuce',
                    projectCode: projectInfo.projectCode ? projectInfo.projectCode : '',
                    pageName: '优路教育-点亮职业人生',
                });
            }

            return this.getConfig();
        },
        getCenterAd() {
            let data = {
                url: 'home/home-ad-pic',
                params: {
                    lytCode: 'LYT1012',
                    // lytCode: 'YLWEB_ELB01',
                },
                isCustom: false,
            };
            this.showAdDialog = true;
            this.httpClient(data).then((res) => {
                if (Array.isArray(res) && res.length > 0) {
                    this.firstAd = res[0];
                } else {
                    this.getSecond();
                }
            });
        },
        getConfig() {
            const data = {
                url: 'channel/query-project-channel-config',
                params: {
                    columnId: this.$nuxt.context.env.config.indexColumnId,
                },
            };
            return this.httpClient(data).then((res) => {
                let mapConfig = {};
                res.noneAdvisoryData.forEach((r) => {
                    mapConfig[r.moduleCode] = r;
                });
                this.mapConfig = mapConfig;
            });
        },
        closeAdDialog() {
            // 关闭广告弹窗
            this.showAdDialog = false;
            this.getSecond();
        },
        closeAdBottom() {
            this.showAdBotton = false;
        },
        getSecond() {
            let data = {
                url: 'home/home-ad-pic',
                params: {
                    lytCode: 'LYT1013',
                    // lytCode: 'YLWEB_ELB01',
                },
                isCustom: false,
            };
            this.showAdBotton = true;
            this.httpClient(data).then((res) => {
                if (Array.isArray(res) && res.length > 0) {
                    this.secondAd = res[0];
                }
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
    },
    render() {
        return (
            <div class="wrap">
                {this.firstAd && this.firstAd.adId && this.showAdDialog && <AdDialog itemData={this.firstAd} onClose-dialog={this.closeAdDialog} />}
                <div class="banner-section">
                    <BannerSection />
                </div>
                <div class="index-section">
                    {this.mapConfig.GKK && this.mapConfig.WNTJ.enableStatus === 'Y' && (
                        <div class="live-calendar-section" style={this.liveEmpty ? '' : 'display: none'}>
                            <LiveCalendarIndex
                                onLive-calendar-empty={() => {
                                    this.liveEmpty = false;
                                }}
                            />
                        </div>
                    )}
                    {this.showSelectProject && this.mapConfig.WNTJ && this.mapConfig.WNTJ.enableStatus === 'Y' && (
                        <div class="recommend-course-section">
                            <RecommendCourseSection
                                onSelect-proejct={() => {
                                    this.getCenterAd();
                                }}
                            />
                        </div>
                    )}

                    <div class="experience-section">
                        <div class="content">
                            <ExperienceSection onComplete={(status) => {}} />
                        </div>
                        <ArticleSection />
                    </div>
                    <div class="class-section">
                        <div class="content">
                            <ClassSection />
                        </div>
                        <ClassSide />
                    </div>
                    <div
                        class="book-section"
                        style={
                            (this.mapConfig.YLGS && this.mapConfig.YLGS.enableStatus === 'Y') || (this.mapConfig.TS && this.mapConfig.TS.enableStatus === 'Y')
                                ? ''
                                : 'display: none'
                        }
                    >
                        <div class="content">
                            <BookSection statusItem={this.mapConfig.TS} />
                        </div>
                        <div class="side">
                            <div class="title-wrap">
                                <div class="title this">优路故事</div>
                            </div>
                            <div class="section">
                                {this.mapConfig.YLGS && this.mapConfig.YLGS.enableStatus === 'Y' ? (
                                    <StorySection />
                                ) : (
                                    <div class="empty-content">
                                        <Empty />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* 讲师介绍-宽度100% */}
                <div class="teacher-introduce">
                    {this.mapConfig.teacher && this.mapConfig.teacher.enableStatus === 'Y' && (
                        <div class="teacher-section">
                            <TeacherSection />
                        </div>
                    )}
                </div>
                {/* 关于我们-宽度100% */}
                {this.mapConfig.introduce && this.mapConfig.introduce.enableStatus === 'Y' && (
                    <div class="about-section">
                        <AboutSection />
                    </div>
                )}
                <div class="school-section">
                    <SchoolSection />
                </div>
                {this.isShow && (
                    <Agreement
                        onClose={() => {
                            this.isShow = false;
                            this.showSelectProject = true;
                        }}
                    />
                )}
                {this.showAdBotton && this.secondAd && this.secondAd.adId && <AdBottom itemData={this.secondAd} onClose-ad-bottom={this.closeAdBottom} />}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.empty-content {
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.index-header /deep/ .header-bg {
    backdrop-filter: saturate(180%) blur(20px);
    background: rgba(255, 255, 255, 0.9);
}
.banner-section {
    position: relative;
    height: 434px;
    // margin-bottom: 64px;
    margin-bottom: 22px;
}
.index-section {
    width: 1200px;
    margin: 0 auto;
    .live-calendar-section {
        height: 506px;
        margin-bottom: 60px;
    }

    .experience-section {
        display: flex;
        justify-content: space-between;
        // height: 676px;
        margin-bottom: 64px;
    }
    .content {
        width: 841px;
        height: 100%;
        overflow: hidden;
    }
    .side {
        width: 335px;
        height: 100%;

        /deep/ .title-wrap {
            width: 335px;
            height: 61px;
            padding-left: 20px;
            line-height: 61px;
            .title {
                display: inline-block;
                font-size: 22px;
                text-align: left;
                color: #99a1af;
                cursor: pointer;

                &.this {
                    color: #3a3d4b;
                }
            }
            .split {
                display: inline-block;
                width: 1px;
                height: 16px;
                background: #d5d9d9;
                margin: 0 20px;
            }
        }

        /deep/ .section {
            height: 603px;
            margin-top: 12px;
            background: #ffffff;
            border-radius: 8px;
        }
    }
    .class-section {
        display: flex;
        justify-content: space-between;
        height: 650px;
        margin-bottom: 64px;

        /deep/ .section {
            height: 580px;
            overflow: hidden;
        }
    }
    .book-section {
        display: flex;
        justify-content: space-between;
        height: 478px;
        margin-bottom: 64px;

        .section {
            height: 404px;
        }
    }

    .teacher-section {
        height: 438px;
        margin-bottom: 64px;
    }
    .about-section {
        height: 472px;
        margin-bottom: 64px;
    }
}
.school-section {
    height: 280px;
}
</style>
