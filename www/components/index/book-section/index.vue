<script lang="jsx">
import { mapActions } from 'vuex';
import Empty from '@/www/components/components/empty/index.vue';
import '@/api/api..query-index-book-list.js';
export default {
    name: 'BookSetion',
    components: {
        itemDetail: {
            props: {
                itemData: {
                    type: Object,
                    default() {
                        return {};
                    },
                },
            },
            methods: {
                /**
                 * 图书模块埋点
                 */
                trackData() {
                    const track = {
                        module_name: '图书', // 模块名称
                        course_name: this.itemData.name, // 资源名称
                        project_id: this.itemData.projectId, //项目ID
                    };
                    this.$yiguan.track('youlu_click_home_page_recommendation_module', track);
                },
            },
            render() {
                return (
                    <a
                        href={this.itemData.link}
                        target="_blank"
                        class="item"
                        onclick={() => {
                            this.trackData();
                        }}
                    >
                        <div class="img-wrap">
                            <img src={this.$urlUtils.getViewUrl(this.itemData.imgPath)} class="img" />
                        </div>
                        <div class="book-content">
                            <div class="title ie">{this.itemData.name}</div>
                            <div class="tip">
                                {this.itemData.bookLights.map((r, index) => {
                                    return <div class={['line', `icon${index + 1}`]}>{r.content}</div>;
                                })}
                            </div>
                        </div>
                    </a>
                );
            },
        },
    },
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
        statusItem: {
            type: Object,
            default: () => {
                return null;
            },
        },
    },
    data() {
        return {
            projectList: [],
            bookList: [],
            // 0：加载中，1：加载成功，2：加载成功无数据，3：接口报错
            pageStatus: 0, // 加载状态
            moreStatus: false,
        };
    },
    fetch() {
        return this.init();
    },
    methods: {
        ...mapActions('common/recommend-project', {
            getRecommendProjectList: 'getProjectList',
        }),
        init() {
            const projectIds = [];
            this.projectList.forEach((r) => {
                projectIds.push(r.projectId);
            });
            const data = {
                url: 'books/query-index-book-list',
                params: {
                    num: 4,
                    // projectIds: projectIds.toString(),
                    projectIds: '',
                    showClient: 'W',
                },
                isCustom: true,
            };
            return this.httpClient(data)
                .then((res) => {
                    this.bookList = res;
                    if (this.bookList.length === 0) {
                        this.pageStatus = 2;
                    } else {
                        this.pageStatus = 1;
                    }
                    this.$nextTick(() => {
                        // 推荐项目内容宽度大于660，'更多'显示背景色
                        const width = this.$refs.projectListRef?.offsetWidth;
                        if (width > 660) {
                            this.moreStatus = true;
                        }
                    });
                })
                .catch(() => {
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
         * 图书项目埋点
         */
        trackProject(item) {
            const track = {
                recommendation_location: '图书', // 推荐位置
                project_id: item.projectId, //项目ID
            };
            this.$yiguan.track('youlu_click_home_page_recommendation_project', track);
        },
    },
    render() {
        let projectList = this.projectList.slice(0, 5);
        const showBooks = () => {
            const len = 4 - this.bookList.length;
            for (let i = 0; i < len; i++) {
                this.bookList.push({});
            }
            return this.bookList.map((item) => {
                return item.bookId ? <itemDetail itemData={item} key={item.bookId} /> : <div style="width: 410px;height: 207px;"></div>;
            });
        };
        return (
            <div class="book-wrap">
                <div class="title">
                    <div class="left">
                        <img class="experience-logo" src={require('./asset/images/bookLogo.png')} />
                        <span class="name">图书</span>
                        <div class="project-list" ref="projectListRef">
                            {projectList.slice(0, 5).map((r, index) => {
                                return (
                                    <div
                                        class="block"
                                        onclick={() => {
                                            this.trackProject(r);
                                        }}
                                    >
                                        <a href={`/books/${r.collegeCode}/${r.projectSeocode}`} target="_blank" class="project-name">
                                            {r.projectName}
                                        </a>
                                        {index !== projectList.length - 1 && <span class="split"></span>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <a href="/books" target="_blank" class={['more', this.moreStatus ? 'more-bgc' : '']}>
                        <div class="more-text">
                            <span>更多</span>
                            <img src={require('./asset/images/more.png')} />
                        </div>
                    </a>
                </div>
                <div class="book-list">
                    {this.statusItem && this.statusItem.enableStatus === 'Y' ? (
                        showBooks()
                    ) : (
                        <div class="empty-content">
                            <Empty />
                        </div>
                    )}
                </div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.empty-content {
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.book-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 62px;
        width: 840px;
        overflow: hidden;
        flex-shrink: 0;
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

                .block {
                    display: flex;
                    align-items: center;
                }
                .project-name {
                    display: inline-block;
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
    }

    .book-list {
        display: flex;
        flex-wrap: wrap;
        margin-right: -20px;
        padding-top: 12px;
        height: 100%;
        /deep/ .item {
            display: flex;
            background-color: #fff;
            padding: 20px 14px 24px 22px;
            margin-right: 20px;
            margin-bottom: 32px;
            width: 410px;
            box-sizing: border-box;
            border-radius: 8px;

            transition: all 0.5s;

            &:hover {
                transform: translate3d(0, -5px, 0);
                box-shadow: 0px 0px 10px 0px rgba(58, 61, 75, 0.1);

                .img {
                    transform: translateZ(0) scale3d(1.08, 1.08, 1.08);
                }
            }

            .img-wrap {
                width: 103px;
                height: 140px;
                overflow: hidden;

                .img {
                    vertical-align: top;
                    width: 100%;
                    max-height: 100%;
                    transition: all 0.5s;
                }
            }

            .book-content {
                padding-left: 19px;
                .title {
                    width: 252px;
                    height: 44px;
                    font-size: 14px;
                    line-height: 22px;
                    font-weight: 700;
                    text-align: left;
                    color: #3a3d4b;
                    white-space: normal;
                    word-break: break-all;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    /* 行数 */
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }

                .tip {
                    padding-top: 10px;
                    .line {
                        font-size: 12px;
                        color: #77798d;
                        line-height: 16px;
                        margin-bottom: 4px;

                        &.icon1,
                        &.icon2,
                        &.icon3 {
                            &::before {
                                content: '';
                                width: 10px;
                                height: 10px;
                                margin-right: 4px;
                                display: inline-block;
                                background-size: cover;
                            }
                        }

                        &.icon1 {
                            &::before {
                                background-image: url(./asset/images/1.png);
                            }
                        }
                        &.icon2 {
                            &::before {
                                background-image: url(./asset/images/2.png);
                            }
                        }
                        &.icon3 {
                            &::before {
                                background-image: url(./asset/images/3.png);
                            }
                        }
                    }
                }
            }
        }
    }
    .more-bgc {
        background: linear-gradient(84deg, rgba(247, 248, 252, 0) 4%, #f7f8fc 40%);
    }
}
</style>
