<template>
    <div class="article-wrap">
        <div class="column-title" :key="$route.params.columnId">
            {{ columnName }}
        </div>
        <div class="article-container" v-loading="isLoading">
            <a
                class="article-item"
                v-for="(item, index) in articleList"
                target="_blank"
                :href="item.caType === 'T' ? item.caUrl : `/article-detail/${item.id}`"
                :key="index"
            >
                <div class="article-box">
                    <div class="title">{{ item.title }}</div>
                    <div class="intro">{{ item.intro }}</div>
                </div>
                <image-view :type="columnName === '企业新闻' ? 'news' : 'social'" class="article-img" :src="$urlUtils.getViewUrl(item.imgSrc)"></image-view>
            </a>
        </div>
        <div class="pagination-box">
            <pagination
                :total="page.count"
                :page-size.sync="page.pageSize"
                :current-page.sync="page.pageIndex"
                @current-change="queryArticleList"
                :page-path-name="pagePathName"
            ></pagination>
        </div>
    </div>
</template>
<script>
import '@/api/cp/api.CMP2016.query-article-list.js';
import '@/api/cp/api.CMP2015.query-column-list.js';
import Pagination from '@/www/components/components/pagination';
import pagePathName from '@/www/components/course/trial-course/js/pagePathName.js';

export default {
    components: {
        Pagination,
    },
    mixins: [pagePathName],
    data() {
        return {
            articleList: [], // 文章列表
            page: {
                pageIndex: 1,
                pageSize: 10,
                count: 0,
            }, // 分页
            columnName: '', // 栏目名称
            isLoading: false, // 是否加载中
        };
    },
    fetch() {
        this.page.pageIndex = parseInt(this.$route.params.page || this.$route.query.page || 1);

        return Promise.all([this.queryColumns(), this.queryArticleList()]);
    },
    head() {
        return this.$head({
            title: `${this.columnName}_点亮职业人生_优路教育`,
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: `品牌,企业文化,社会责任,企业新闻,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升`,
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
    watch: {
        '$route.params.columnId': {
            handler() {
                this.columnId = this.$route.params.columnId;
                this.page = {
                    pageIndex: 1,
                    pageSize: 10,
                    count: 0,
                };
                this.queryColumns();
                this.queryArticleList();
            },
        },
    },
    methods: {
        // 查询章节列表
        queryArticleList() {
            this.isLoading = true;
            this.updateUrlPageNumber();
            return new Promise((resolve) => {
                this.isLoading = true;
                this.$callApi('cp/query-article-list', {
                    columnId: this.$route.params.columnId,
                    pageIndex: this.page.pageIndex,
                    pageSize: this.page.pageSize,
                    onsuccess: (data) => {
                        this.page.count = data.count;
                        this.articleList = data.list;
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {
                        this.isLoading = false;
                        resolve();
                    },
                });
            }).then(this.ssrInValidPage);
        },
        // 查询栏目 匹配出来所选栏目名称
        queryColumns() {
            return new Promise((resolve) => {
                this.$callApi('cp/query-column-list', {
                    // 栏目类型编码
                    columnCode: 'WEBPINPAI',
                    projectId: this.$nuxt.context.env.config.new_web_project_id,
                    onsuccess: (data) => {
                        if (data.length) {
                            // 匹配出来所选栏目名称
                            data.forEach((item) => {
                                if (item.columnId === this.$route.params.columnId) {
                                    this.columnName = item.columnName;
                                }
                            });
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {
                        resolve();
                    },
                });
            });
        },
    },
};
</script>
<style lang="less" scoped>
.article-wrap {
    width: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 700px;
    .column-title {
        margin: 48px 0px 26px;
        width: 1200px;
        font-size: 28px;
        font-weight: 700;
        text-align: left;
        color: #333333;
    }
}
.article-container {
    width: 1200px;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-height: 700px;
    .article-item {
        margin-top: 54px;
        width: 1200px;
        height: 310px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px solid #ecedf1;
        .article-box {
            padding-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 720px;
            .title {
                width: 720px;
                font-size: 20px;
                font-weight: 700;
                text-align: left;
                color: #333333;
                line-height: 26px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            .intro {
                margin-top: 28px;
                font-size: 14px;
                font-weight: 400;
                text-align: left;
                color: #77798d;
                line-height: 32px;
                word-break: break-all;
            }
        }
        .article-img {
            border-radius: 16px;
            width: 400px;
            height: 260px;
            overflow: hidden;
            .img {
                border-radius: 16px;
                width: 400px;
                height: 260px;
            }
        }
    }
}

.pagination-box {
    margin: 32px 0px 120px;
}
</style>
