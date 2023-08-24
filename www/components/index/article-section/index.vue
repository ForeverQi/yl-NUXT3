<script lang="jsx">
import '@/api/cp/api.CMP2015.query-column-list.js';
import '@/api/cp/api.CMP2016.query-article-list.js';
import StatusView from './components/status-view/index.vue';
export default {
    name: 'ArticleSection',
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
            columnList: [],
            currentIndex: 0,
            articleList: {},
            // 0：加载中，1：加载成功，2：加载成功无数据，3：接口报错
            pageStatus: 0, // 加载状态
        };
    },
    fetch() {
        return this.init();
    },
    methods: {
        init() {
            return this.getData().then(() => {
                return this.getArticleList();
            });
        },
        getArticleList() {
            return Promise.all(
                this.columnList.map((r) => {
                    this.$set(this.articleList, r.columnId, []);
                    return this.getArticleList2(r.columnId);
                })
            );
        },
        getArticleList2(columnId) {
            console.log(columnId);
            let params = {
                url: 'cp/query-article-list',
                params: {
                    columnId,
                    pageIndex: 1,
                    pageSize: 7,
                },
                isCustom: false,
            };
            return this.httpClient(params)
                .then((ret) => {
                    let status = 1;
                    if (ret.list.length > 0) {
                        status = 1;
                    } else {
                        status = 2;
                    }
                    this.articleList[columnId] = {
                        loading: status,
                        list: ret.list.slice(0, 7),
                    };
                })
                .catch((err) => {
                    console.log(err);
                    this.articleList[columnId] = {
                        loading: 3,
                        list: [],
                    };
                });
        },
        getData() {
            let params = {
                url: 'cp/query-column-list',
                params: {
                    columnCode: 'GWSYZX',
                    // columnCode: 'WEBPINPAI',
                    projectId: this.$nuxt.context.env.config.new_web_project_id,
                },
            };
            return this.httpClient(params)
                .then((list) => {
                    if (list.length > 0) {
                        this.pageStatus = 1;
                    } else {
                        this.pageStatus = 2;
                    }
                    this.columnList = list.slice(0, 2);
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
         * 资讯模块埋点
         */
        trackData(item, item2) {
            const track = {
                course_name: item.title, // 资源名称
                module_name: item2.columnName, // 模块名称
                project_id: item2?.projectId, //项目ID
            };
            this.$yiguan.track('youlu_click_home_page_recommendation_module', track);
        },
    },
    render() {
        return (
            <div class="side">
                <vFragment>
                    <div class="title-wrap">
                        {this.columnList.map((r, index) => {
                            return (
                                <vFragment>
                                    <div
                                        class={['title', index === this.currentIndex ? 'this' : '']}
                                        onClick={() => {
                                            this.currentIndex = index;
                                        }}
                                    >
                                        {r.columnName}
                                        {index !== this.columnList.length - 1 && <div class="split"></div>}
                                    </div>
                                    <nuxt-link
                                        to={`/hot-article-list/GWSYZX/${r.columnId}`}
                                        target="_blank"
                                        class="more"
                                        style={{ display: this.currentIndex === index ? 'block' : 'none' }}
                                    >
                                        更多
                                    </nuxt-link>
                                </vFragment>
                            );
                        })}
                    </div>
                    <div class="section-content">
                        {/* 背景图片 */}
                        <div class="article-bgc">
                            <img src={require('./asset/images/information-bgc.png')} />
                        </div>
                        {this.pageStatus === 2 && <StatusView type="empty" txt="暂无资讯，敬请期待" />}
                        {this.pageStatus === 3 && <StatusView type="error" txt="内容加载失败，请刷新页面" onInit={this.init} />}
                        {this.pageStatus === 1 &&
                            this.columnList.map((r, index1) => {
                                return (
                                    <div class="article-wrap" style={index1 === this.currentIndex ? 'display: block' : 'display: none'}>
                                        {this.articleList[r.columnId] && this.articleList[r.columnId].loading === 2 && (
                                            <StatusView type="empty" txt="暂无资讯，敬请期待" />
                                        )}
                                        {this.articleList[r.columnId] && this.articleList[r.columnId].loading === 3 && (
                                            <StatusView type="error" txt="内容加载失败，请刷新页面" onInit={this.init} />
                                        )}
                                        {this.articleList[r.columnId] &&
                                            this.articleList[r.columnId].loading === 1 &&
                                            this.articleList[r.columnId].list.map((rs, index) => {
                                                let link = '';
                                                if (rs.caType === 'T') {
                                                    link = rs.caTurnUrl;
                                                } else {
                                                    link = `/article-detail/${rs.id}`;
                                                }
                                                return (
                                                    <div
                                                        class="item"
                                                        onclick={() => {
                                                            this.trackData(rs, r);
                                                        }}
                                                    >
                                                        <div class={['num', index === 0 ? 'red' : index > 0 && index < 2 ? 'item-black' : '']}>
                                                            0{index + 1}
                                                        </div>
                                                        <div class="content">
                                                            <a href={link} target="_blank" class="title">
                                                                {rs.title}
                                                            </a>
                                                            <div class="time">{rs.publishTime.split(' ')[0]}</div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                );
                            })}
                    </div>
                </vFragment>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.more {
    position: absolute;
    background-image: url(./asset/images/more.png);
    background-repeat: no-repeat;
    background-size: 10px 11px;
    background-position: right 3px;
    padding-right: 16px;
    line-height: 1;
    color: #77798d;
    right: 20px;
    top: 50%;
    font-size: 14px;
    transform: translateY(-50%);

    &:hover {
        color: #ff2e30;
    }
}
@font-face {
    font-family: 'bold';
    src: url('./font/d-din-bold.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'ltalic';
    src: url('./font/d-din-italic.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'source';
    src: url('./font/d-din.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}
.side {
    width: 335px;
    height: 100%;

    .title-wrap {
        position: relative;
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

    .section-content {
        height: 615px;
        margin-top: 10px;
        border-radius: 18px;
        overflow: hidden;
        position: relative;
        background: linear-gradient(180deg, #fff5f2, #ffffff 16%);
        .article-bgc {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 120px;
            z-index: 1;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
.article-wrap {
    height: 100%;
    padding: 0 20px;
    padding-top: 40px;
    box-sizing: border-box;
    position: relative;
    z-index: 5;
    .item {
        display: flex;
        width: 100%;
        margin-bottom: 29px;
        overflow: hidden;
        .num {
            display: inline-block;
            width: 25px;
            flex-shrink: 0;
            font-family: bold;
            color: #d6dbe3;
            font-weight: 700;
            font-size: 24px;
            padding-right: 10px;

            &.red {
                color: #ff2e30;
            }
            &.item-black {
                font-size: 24px;
                color: #3a3d4b;
            }
        }

        .content {
            flex: 1;
            overflow: hidden;
            .title {
                font-size: 15px;
                color: #3a3d4b;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
                display: block;
                &:hover {
                    color: #ff2e30;
                }
            }
            .time {
                color: #99a1af;
                font-size: 12px;
                padding-top: 15px;
            }
        }
    }
}
</style>
