<template>
    <div class="article">
        <div class="bg" v-if="false">
            <div class="ct">
                <div class="block">
                    <div class="one">阅读为您准备的内容</div>
                    <div class="two">让您更了解我们</div>
                </div>
            </div>
        </div>
        <div class="banner-wrap" @click="handleLink" v-if="bannerInfo.adPicture">
            <img :src="$nuxt.$niceloo.path.getServerFileViewPath(bannerInfo.adPicture)" alt="" />
        </div>
        <div class="content">
            <article-tabs v-if="tabList.length > 0" :select-id="selectCateId" :select-index="selectIndex" :tab-list="tabList" @changeSelect="changeSelect" />
            <div class="section" v-if="tabList.length > 0">
                <article-content
                    v-show="articleList.length > 0"
                    :article-list="articleList"
                    :article="article"
                    :select-id="selectArticleId"
                    :ccate-id="selectCateId"
                    @change="changeArticleId"
                />
            </div>
            <div class="empty" v-if="tabList.length === 0 || articleList.length === 0">
                <empty />
            </div>
        </div>
    </div>
</template>
<script>
import empty from '../components/ArticleEmpty/index.vue';
import ArticleTabs from '../components/ArticleTabs/index.vue';
import ArticleContent from '../components/ArticleContent/index.vue';

export default {
    components: {
        empty,
        ArticleTabs,
        ArticleContent,
    },
    data() {
        return {
            selectIndex: 0,
            selectCateId: '',
            selectArticleId: '',
            tabList: [],
            articleList: [],
            article: {},
            isFirst: true,

            curPageNum: 1, // 当前页码
            pageSize: 50, // 每页显示数量
            bannerInfo: {}, // banner图
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getData();
            this.getArticleBanner();
        },
        getData() {
            let data = {
                ccProjectId: this.$nuxt.context.env.config.articleModuleProjectID,
            };

            this.$callRawApi({
                api: 'cp/info/column/list',
                params: data,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let res = _reponse.getData();
                    this.tabList = res;

                    if (this.tabList.length === 0) {
                        return;
                    }
                    let ci = 0;
                    if (this.$route.params.ccid && this.$route.params.ccid !== 'undefined') {
                        this.tabList.some((r, index) => {
                            ci = index;
                            return r.ccId === this.$route.params.ccid;
                        });
                    }

                    this.selectIndex = ci;
                    this.selectCateId = this.tabList[ci].ccId;

                    // 获取模块的新闻列表
                    this.getArticleList();
                });
        },
        getArticleList() {
            let data = {
                ccId: this.selectCateId,
                pageSize: this.pageSize,
                pageIndex: this.getPageIndex(),
            };
            this.$callRawApi({
                api: 'cp/info/article/list',
                params: data,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let res = _reponse.getData();
                    this.articleList = res.list;

                    if (this.articleList.length === 0) {
                        return;
                    }
                    let ci = 0;
                    if (this.isFirst && this.$route.params.caid && this.$route.params.caid !== 'undefined') {
                        this.isFirst = false;
                        this.articleList.some((r, index) => {
                            ci = index;
                            return r.caId === this.$route.params.caid;
                        });
                    }

                    this.selectArticleId = this.articleList[ci].caId;

                    // 获取文章详情
                    this.getArticleInfo();
                });
        },
        getArticleInfo() {
            let data = {
                caId: this.selectArticleId,
            };
            this.$callRawApi({
                api: 'cp/info/article/detail',
                params: data,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let res = _reponse.getData();
                    this.article = res;
                });
        },
        getPageIndex() {
            return (this.curPageNum - 1) * this.pageSize;
        },
        getArticleBanner() {
            let params = {
                lytCode: 'YLWEB_PD01',
            };
            this.$callRawApi({
                api: 'cp/data/adv/advByLytCode',
                params,
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let res = _reponse.getData();
                    if (res.length) {
                        this.bannerInfo = res[0];
                    }
                    console.log(this.bannerInfo, 139);
                });
        },
        handleLink() {
            window.open(this.bannerInfo.adLink);
        },
        changeArticleId(id) {
            this.selectArticleId = id;
            this.getArticleInfo();
        },
        changeSelect(index, ccId) {
            this.selectIndex = index;
            this.selectCateId = ccId;

            this.getArticleList();
        },
    },
};
</script>
<style lang="less" scoped>
/deep/ .defaultLayout .content {
    width: 100%;
    min-width: 1200px;
}
.article {
    .bg {
        position: relative;
        width: 100%;
        height: 300px;
        // background-image: url('./asset/images/bg.png');
        background-size: 100%;
        background-repeat: no-repeat;

        .ct {
            width: 1200px;
            height: 180px;
            margin: 0 auto;
            background-image: url('./asset/images/tct.png');
            background-size: auto 156px;
            background-position-x: right;
            background-position-y: 40px;
            background-repeat: no-repeat;

            .block {
                line-height: 1;
                .one {
                    padding-top: 64px;
                    font-size: 32px;
                    color: #333333;
                    font-weight: 700;
                }
                .two {
                    padding-top: 12px;
                    font-size: 16px;
                    color: #333333;
                }
            }
        }
    }
    .banner-wrap {
        width: 100%;
        height: 122px;
        cursor: pointer;
        img {
            width: 100%;
            height: 122px;
        }
    }
    .content {
        position: relative;
        margin-top: -120px;
        width: 1200px;
        min-height: 516px;
        margin: 0px auto 42px auto;

        .section {
            padding-top: 16px;
        }

        .empty {
            padding-top: 120px;
            padding-bottom: 120px;
        }
    }
}
</style>
