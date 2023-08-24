<script lang="jsx">
import { mapActions } from 'vuex';
import '@/api/ctc/api..query-class-index-list.js';
import StatusView from './components/status-view/index.vue';
export default {
    name: 'ClassSection',
    components: {
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
    data() {
        return {
            projectList: [],
            showProjectList: [], // 显示项目列表
            courseList: [],
            // 0：加载中，1：加载成功，2：加载成功无数据，3：接口报错
            pageStatus: 0, // 加载状态
            areaCode: '',
            areaName: '',
            moreStatus: false,
        };
    },
    fetch() {
        this.pageStatus = 0;
        return this.init();
    },
    methods: {
        ...mapActions('common/recommend-project', {
            getRecommendProjectList: 'getProjectList',
        }),
        ...mapActions('common/city', {
            getArea: 'getArea',
        }),
        init() {
            return this.getArea()
                .then((res) => {
                    if (!res.cityCode) {
                        this.areaCode = '110000';
                        this.areaName = '北京';
                    } else {
                        this.areaCode = res.cityCode;
                        this.areaName = res.cityName;
                    }

                    return this.getRecommendProjectList().then((res1) => {
                        this.projectList = res1;
                        this.showProjectList = this.projectList.slice(0, 5);
                        return this.getData();
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.pageStatus = 3;
                });
        },
        getData() {
            let ids = [];
            this.projectList.forEach((r) => {
                ids.push(r.projectId);
            });
            let params = {
                url: 'mcp/query-class-index-list',
                params: {
                    areaCode: this.areaCode,
                    pageSize: 6,
                    classtypeShowitem: 'WEB',
                    // projectIds: ids.toString(),
                    projectIds: '',
                },
                isCustom: false,
            };
            return this.httpClient(params)
                .then((list) => {
                    if (Array.isArray(list) && list.length > 0) {
                        this.pageStatus = 1;
                    } else {
                        list = [];
                        this.pageStatus = 2;
                    }
                    this.courseList = list.slice(0, 6);
                    this.courseList.forEach((item) => {
                        if (item.classtypeHighlights) {
                            // 存储亮点的个数
                            item.classtypeHighlightsLength = item.classtypeHighlights.split(',').length;
                        }
                    });
                    this.$nextTick(() => {
                        // 推荐项目内容宽度大于660，'更多'显示背景色
                        const width = this.$refs.projectListRef?.offsetWidth;
                        if (width > 660) {
                            this.moreStatus = true;
                        }
                    });
                })
                .catch((err) => {
                    console.log('@@@3333', err);
                    this.pageStatus = 3;
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
        /**
         * 推荐模块埋点
         */
        trackData(item) {
            const track = {
                module_name: '系统课', // 模块名称
                course_name: item.name, // 资源名称
                project_id: item.projectId, //项目ID
            };
            this.$yiguan.track('youlu_click_home_page_recommendation_module', track);
        },
        /**
         * 推荐项目埋点
         */
        trackProject(item) {
            const track = {
                recommendation_location: '系统课', // 推荐位置
                project_id: item.projectId, //项目ID
            };
            this.$yiguan.track('youlu_click_home_page_recommendation_project', track);
        },
    },
    render() {
        const item = (rs) => {
            const showTags = (str) => {
                if (!str) {
                    return '';
                }
                let tags = str.split(',');
                tags = tags.slice(0, 2);
                return tags.map((r) => {
                    return <div class="tag">{r}</div>;
                });
            };
            return (
                <a
                    href={`/pro-course/detail/${rs.id}`}
                    onclick={() => {
                        this.trackData(rs);
                    }}
                    target="_blank"
                    class="item"
                >
                    <div class="img-wrap">
                        <image-view src={rs.imagePath} class="img" />
                        {this.areaName && <div class="img-wrap_label">{this.areaName}</div>}
                    </div>
                    <div class="bottom">
                        <div class="name">{rs.name}</div>
                        {<div class={['tags', rs.classtypeHighlightsLength > 1 ? 'tags-more' : '']}>{showTags(rs.classtypeHighlights)}</div>}
                    </div>
                </a>
            );
        };
        return (
            <div class="experience-wrap">
                <div class="title">
                    <div class="left">
                        <img class="experience-logo" src={require('./asset/images/systemCourse.png')} />
                        <span class="name">系统课</span>
                        <div class="project-list" ref="projectListRef">
                            {this.showProjectList.map((r, index) => {
                                return (
                                    <vFragment>
                                        <div
                                            onclick={() => {
                                                this.trackProject(r);
                                            }}
                                        >
                                            <nuxt-link to={`/pro-course/${r.collegeCode}/${r.projectSeocode}`} target="_blank" class="project-name">
                                                {r.projectName}
                                            </nuxt-link>
                                        </div>
                                        {index !== this.showProjectList.length - 1 && <span class="split"></span>}
                                    </vFragment>
                                );
                            })}
                        </div>
                    </div>
                    <nuxt-link to="/pro-course" target="_blank" class={['more', this.moreStatus ? 'more-bgc' : '']}>
                        <div class="more-text">
                            <span>更多</span>
                            <img src={require('./asset/images/more.png')} />
                        </div>
                    </nuxt-link>
                </div>
                <div class="list" v-loading={this.pageStatus === 0}>
                    {this.pageStatus === 2 && <StatusView type="empty" txt="暂无课程，敬请期待" />}
                    {this.pageStatus === 3 && <StatusView type="error" txt="内容加载失败，请刷新页面" onInit={this.init} />}
                    {this.pageStatus === 1 &&
                        this.courseList.map((rs) => {
                            return item(rs);
                        })}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.item {
    width: 266px;
    height: 272px;
    display: inline-block;
    background: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    margin: 0 20px 32px 0;
    padding: 14px 14px 0;
    box-sizing: border-box;
    vertical-align: top;
    cursor: pointer;
    &:nth-child(n + 4) {
        margin-bottom: 0;
    }

    &:hover {
        // transform: translate3d(0, -5px, 0);
        box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);
        .img-wrap {
            .img {
                transform: translateZ(0) scale3d(1.08, 1.08, 1.08);
            }
        }
    }

    .img-wrap {
        width: 100%;
        height: 148px;
        overflow: hidden;
        border-radius: 6px;
        position: relative;
        .img {
            width: 100%;
            height: 100%;
            transition: all 0.3s;
            transform: translateZ(0);
        }
    }
    .img-wrap_label {
        position: absolute;
        left: 0;
        bottom: 0;
        height: 20px;
        line-height: 20px;
        padding: 0 7px;
        background-color: rgba(0, 0, 0, 0.5);
        border-bottom-left-radius: 8px;
        border-top-right-radius: 8px;
        font-size: 12px;
        color: #fff;
        max-width: 230px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .bottom {
        padding: 0 4px;
        box-sizing: border-box;
        .name {
            padding: 18px 0;
            font-weight: 700;
            text-align: justify;
            color: #3a3d4b;
            font-size: 14px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .tags {
            white-space: nowrap;
            overflow: hidden;
            .tag {
                height: 22px;
                background: linear-gradient(135deg, #fdf0d8, #eed1a5);
                border-radius: 4px;
                padding: 0 10px;
                font-size: 12px;
                line-height: 22px;
                display: inline-block;
                background-color: #eeeff6;
                color: #925709;
                max-width: 210px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .city {
                display: inline-block;
                font-size: 12px;
                line-height: 1;
                padding: 5px 10px;
                color: #fa6400;
                background: rgba(251, 135, 21, 0.1);
                border-radius: 2px;
                margin-right: 6px;
            }
        }
        .tags-more {
            .tag {
                &:first-child {
                    border-top-right-radius: 0;
                    border-bottom-right-radius: 0;
                }
                &:nth-child(n + 2) {
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                    background: #fff5e1;
                    color: #c87805;
                }
            }
        }
    }
}

.list {
    flex: 1;
    padding-top: 10px;
    margin-right: -20px;
    overflow: hidden;
}
.experience-wrap {
    display: flex;
    height: 100%;
    flex-direction: column;
    .title {
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 62px;
        width: 840px;
        overflow: hidden;
        position: relative;
        .experience-logo {
            width: 38px;
            height: 38px;
            margin-right: 10px;
            flex: none;
        }

        .left {
            display: flex;
            .name {
                font-size: 24px;
                text-align: left;
                color: #3a3d4b;
                line-height: 38px;
                font-weight: 700;
                flex: none;
            }

            .project-list {
                display: flex;
                align-items: center;
                white-space: nowrap;
                padding-left: 40px;

                .project-name {
                    display: flex;
                    align-items: center;
                    color: #53586c;
                    font-size: 14px;
                    cursor: pointer;

                    &:hover {
                        color: #ff2e30;
                    }

                    &.this {
                        color: #ff2e30;
                    }
                }
                .split {
                    margin: 0 16px;
                    width: 1px;
                    height: 10px;
                    background-color: #d5d9d9;
                }
            }
        }
        .more {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 38px;
            width: 114px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: #77798d;
            &:hover {
                color: #ff2e30;
            }
            .more-text {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                cursor: pointer;
                font-size: 14px;
                img {
                    margin-left: 6px;
                    width: 10px;
                    height: 11px;
                    transform: translateY(2px);
                }
            }
        }
        .more-bgc {
            background: linear-gradient(84deg, rgba(247, 248, 252, 0) 4%, #f7f8fc 40%);
        }
    }
}
</style>
