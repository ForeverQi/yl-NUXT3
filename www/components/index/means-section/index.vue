<script lang="jsx">
import { mapActions } from 'vuex';
import '@/api/dc/api.DC2026.query-custom-doc-list.js';
import StatusView from './components/status-view/index.vue';
export default {
    name: 'MeansSection',
    data() {
        return {
            projectList: [],
            showProjectList: [], // 显示项目列表
            courseList: [],
            articleList: [],
            // 0：加载中，1：加载成功，2：加载成功无数据，3：接口报错
            pageStatus: 0, // 加载状态
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
        init() {
            return this.getRecommendProjectList().then((res) => {
                this.projectList = res;
                this.showProjectList = this.projectList.slice(0, 6);
                return this.getData();
            });
        },
        getData() {
            let ids = [];
            this.projectList.forEach((r) => {
                ids.push(r.projectId);
            });
            let params = {
                url: 'dc/query-custom-doc-list',
                params: {
                    cout: 7,
                    // projectIds: ids.toString(),
                    projectIds: '',
                    clientType: 'W',
                },
                isCustom: false,
            };
            return this.httpClient(params)
                .then((list) => {
                    if (list.length > 0) {
                        this.pageStatus = 1;
                    } else {
                        this.pageStatus = 2;
                    }
                    if (list.length > 6) {
                        this.articleList = list.slice(0, 6);
                        return false;
                    }
                    this.articleList = list;
                })
                .catch((err) => {
                    console.log(err);
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
         * 干货资料模块埋点
         */
        trackData(item) {
            const track = {
                module_name: '干货资料', // 模块名称
                course_name: item.docName, // 资源名称
                project_id: item.projectId, //项目ID
            };
            this.$yiguan.track('youlu_click_home_page_recommendation_module', track);
        },
    },
    render() {
        const showTags = (rs) => {
            // 有标签名称，取标签名称，没有则取分类名称
            let str = rs.docTagStringList ? rs.docTagStringList : rs.catalogName;
            if (!str) {
                return '';
            }
            let tags = str.split(',');
            tags = tags.slice(0, 1);
            return tags.map((r) => {
                // docPackstatus: 资料是否是资料包(Y:是;N:否)
                return (
                    <div class="tags-label">
                        <div class="tag">{r}</div>
                        <div class="tag-desc">共{rs.docPackStatus === 'yes' ? `${rs.docPacknum}条` : `${rs.docPagenum}页`}</div>
                    </div>
                );
            });
        };
        return (
            <div class="mean-section">
                {this.pageStatus === 2 && <StatusView type="empty" txt="暂无资料，敬请期待" />}
                {this.pageStatus === 3 && <StatusView type="error" txt="内容加载失败，请刷新页面" onInit={this.init} />}
                {this.pageStatus === 1 && (
                    <div>
                        <div class="article-content">
                            {this.articleList.map((rs) => {
                                let link = '';
                                if (rs.docPackStatus === 'yes') {
                                    link = `/all/ziliao_all_all/pack/${rs.docCode}`;
                                } else if (rs.docPackStatus === 'no') {
                                    link = `/all/ziliao_all_all/${rs.docCode}`;
                                }
                                return (
                                    <nuxt-link to={link} target="_blank" class="item">
                                        <div
                                            class="title"
                                            onclick={() => {
                                                this.trackData(rs);
                                            }}
                                        >
                                            {rs.docName}
                                        </div>
                                        <div class="tags">{showTags(rs)}</div>
                                    </nuxt-link>
                                );
                            })}
                        </div>
                        <nuxt-link to="/ziliao" target="_blank">
                            <img class="exam-img" src={require('./asset/images/classSide-info.png')} />
                        </nuxt-link>
                    </div>
                )}
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.mean-section {
    height: 100%;
    padding: 0 20px;
    padding-top: 35px;
    position: relative;
    z-index: 10;
    box-sizing: border-box;

    .item {
        display: block;
        margin-bottom: 23px;
        &:last-child {
            margin-bottom: 0;
        }
        .title {
            font-size: 15px;
            color: #3a3d4b;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 12px;
            cursor: pointer;
            &:hover,
            &.this {
                color: #ff2e30;
            }
        }
        .tags {
            white-space: nowrap;
            overflow: hidden;
            height: 22px;
            margin-right: 12px;
            .tags-label {
                display: flex;
                align-items: center;
            }
            .tag {
                display: inline-block;
                padding: 0 10px;
                height: 22px;
                margin-right: 10px;
                line-height: 22px;
                text-align: center;
                background: #eeeff6;
                border-radius: 2px;
                font-size: 12px;
                color: #53586c;
                max-width: 220px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
            .tag-desc {
                font-size: 12px;
                color: #53586c;
            }
        }
    }
    .exam-img {
        margin-top: 8px;
        display: block;
        width: 307px;
        height: 80px;
        cursor: pointer;
    }
}
</style>
