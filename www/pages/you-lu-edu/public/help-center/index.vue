<template>
    <div class="help-wrap" ref="vueRefHtml">
        <div class="help-header">
            <div class="help-title">
                <span>帮助中心</span>
                <img class="help-logo1" src="./asset/images/help-logo1.png" />
                <img class="help-logo2" src="./asset/images/help-logo2.png" />
                <img class="help-logo3" src="./asset/images/help-logo3.png" />
            </div>
        </div>
        <div class="help-content">
            <div class="help-column-box" v-if="columsList.length">
                <div class="column-item-box" v-for="(item, index) in columsList" :key="index">
                    <a
                        class="column-name"
                        :href="item.caType === 'T' ? item.caUrl : `/help/${item.columnId}`"
                        :class="[selectColumnId === item.columnId ? 'active-column' : '']"
                    >
                        {{ item.columnName }}
                    </a>
                    <div class="line" :class="[selectColumnId === item.columnId ? 'active-line' : '']"></div>
                </div>
            </div>
            <div class="article-box" v-loading="isLoadTitle">
                <div class="article-title-box">
                    <a
                        class="article-item-box"
                        :class="[selectArticleId === item.id ? 'active-article-item' : '']"
                        v-for="(item, index) in articleList"
                        :key="index"
                        :href="item.caType === 'T' ? item.caUrl : `/help/${selectColumnId}/${item.id}`"
                    >
                        <div class="article-title">{{ item.title }}</div>
                        <!-- <img v-if="selectArticleId === item.id" src="./asset/images/active-right-icon.png" class="active-right-img" alt="" /> -->
                    </a>
                </div>
                <div class="article-content-box" v-loading="isLoadArticle">
                    <div class="rich-text" v-html="articleContent" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { parse } from 'html5parser';
import '@/api/cp/api.CMP2015.query-column-list.js';
import '@/api/cp/api.CMP2016.query-article-list.js';
import '@/api/cp/api.CP3004.query-article-detail.js';
export default {
    layout: 'new-default',
    data() {
        return {
            columsList: [], // 栏目列表
            articleList: [], // 咨询列表
            selectColumnId: '', // 选中的栏目id
            selectArticleId: '', // 选中的文章id
            articleInfo: {}, // 文章信息
            articleContent: null, // 文章内容
            page: {
                pageIndex: 1,
                pageSize: 50,
                count: 1,
            }, // 分页
            isLoadTitle: false, // 是否加载title
            isLoadArticle: false, // 是否加载文章
        };
    },
    fetch() {
        return this.queryColumns();
    },
    head() {
        return this.$head({
            title: '帮助中心_点亮职业人生_优路教育',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '帮助中心,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '优路教育，职业教育一站式学习平台，提供专业职业考试培训和职业技能提升培训服务，用知识服务助力个人职业发展。',
                },
            ],
        });
    },
    methods: {
        // 查询栏目
        queryColumns() {
            return new Promise((resolve, reject) => {
                this.$callApi('cp/query-column-list', {
                    // 栏目类型编码
                    columnCode: 'WEBHELP',
                    projectId: this.$nuxt.context.env.config.new_web_project_id,
                    onsuccess: (data) => {
                        if (data.length) {
                            this.columsList = data;
                            const { columnId } = this.$route.params;
                            this.selectColumnId = columnId || data[0].columnId;
                            resolve();
                        } else {
                            reject();
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {},
                });
            })
                .then(() => {
                    return this.queryArticleList(false);
                })
                .catch(() => {
                    console.log('未获取到栏目信息');
                });
        },
        /**
         * 查询资讯列表
         * @param {Boolean} isUpdateArticleId 是否更新资讯id
         */
        queryArticleList(isUpdateArticleId) {
            this.isLoadTitle = true;
            return new Promise((resolve) => {
                this.$callApi('cp/query-article-list', {
                    columnId: this.selectColumnId,
                    pageIndex: this.page.pageIndex,
                    pageSize: this.page.pageSize,
                    onsuccess: (data) => {
                        this.page.count = data.count;
                        this.articleList = data.list;
                        if (this.articleList.length) {
                            const { articleId } = this.$route.params;
                            this.selectArticleId = articleId || data.list[0].id;
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {
                        this.isLoadTitle = false;
                        resolve();
                    },
                });
            }).then(() => {
                return this.queryArticleDetail();
            });
        },
        // 查询咨询详情
        queryArticleDetail() {
            this.isLoadArticle = true;
            return new Promise((resolve) => {
                this.$callApi('cp/query-article-detail', {
                    id: this.selectArticleId,
                    onsuccess: (data) => {
                        this.articleInfo = data;
                        let nodeArr = parse(data.content);
                        nodeArr = this.rewriteNode(nodeArr);
                        this.articleContent = this.createHTML(nodeArr);
                        if (this.$platform.isClient()) {
                            window.history.replaceState(null, null, `/help/${this.selectColumnId}/${this.selectArticleId}`);
                        }
                    },
                    onerror: this.$niceloo.api.handleFailure,
                    oncomplete: () => {
                        this.isLoadArticle = false;
                        resolve();
                    },
                });
            });
        },
        createHTML(arr) {
            let str = '';
            if (!Array.isArray(arr)) {
                return str;
            }

            arr.forEach((r) => {
                if (r.type === 'Tag') {
                    if (r.open) {
                        str += '<' + r.name;
                    }

                    // 处理属性
                    if (Array.isArray(r.attributes) && r.attributes.length > 0) {
                        r.attributes.forEach((ra, index) => {
                            str += ' ' + ra.name.value + '="' + ra.value.value + '"';
                        });
                    }
                    if (!r.close) {
                        // 单标签
                        str += '/>';
                    } else {
                        str += '>';
                    }
                    str += this.createHTML(r.body);
                    if (r.close) {
                        str += r.close.value;
                    }
                } else if (r.type === 'Text') {
                    str += r.value;
                }
            });

            return str;
        },
        rewriteNode(arr) {
            if (!Array.isArray(arr)) {
                return arr;
            }
            arr.map((r) => {
                if (r.type !== 'Tag') {
                    return r;
                }
                if (['video', 'source', 'link', 'img', 'script'].includes(r.name)) {
                    switch (r.name) {
                        case 'video':
                            if (Array.isArray(r.attributes)) {
                                r.attributes.map((rs) => {
                                    if (rs.name.value === 'width') {
                                        rs.value.value = '100%';
                                    } else if (rs.name.value === 'height') {
                                        rs.value.value = 'auto';
                                    } else if (rs.name.value === 'src') {
                                        rs.value.value = this.$urlUtils.getViewUrl(rs.value.value);
                                        // http:// :// 根据页面的协议处理
                                        if (rs.value.value.indexOf('http://') >= 0) {
                                            rs.value.value = rs.value.value.replace('http://', 'https://');
                                        }
                                    }
                                    return rs;
                                });
                            }
                            break;
                        case 'source':
                            if (Array.isArray(r.attributes)) {
                                r.attributes.map((rs) => {
                                    if (rs.name.value === 'width') {
                                        rs.value.value = '100%';
                                    } else if (rs.name.value === 'height') {
                                        rs.value.value = 'auto';
                                    } else if (rs.name.value === 'src') {
                                        // http:// :// 根据页面的协议处理
                                        if (rs.value.value.indexOf('http://') >= 0) {
                                            rs.value.value = rs.value.value.replace('http://', 'https://');
                                        }
                                    }
                                    return rs;
                                });
                            }
                            break;
                        case 'link':
                            if (Array.isArray(r.attributes)) {
                                r.attributes.map((rs) => {
                                    if (rs.name.value === 'href') {
                                        // http:// :// 根据页面的协议处理
                                        if (rs.value.value.indexOf('http://') >= 0) {
                                            rs.value.value = rs.value.value.replace('http://', 'https://');
                                        }
                                    }
                                    return rs;
                                });
                            }
                            break;
                        case 'script':
                            if (Array.isArray(r.attributes)) {
                                r.attributes.map((rs) => {
                                    if (rs.name.value === 'width') {
                                        rs.value.value = '100%';
                                    } else if (rs.name.value === 'height') {
                                        rs.value.value = 'auto';
                                    } else if (rs.name.value === 'src') {
                                        // http:// :// 根据页面的协议处理
                                        if (rs.value.value.indexOf('http://') >= 0) {
                                            rs.value.value = rs.value.value.replace('http://', 'https://');
                                        }
                                    }
                                    return rs;
                                });
                            }
                            break;
                        case 'img':
                            if (Array.isArray(r.attributes)) {
                                r.attributes.map((rs) => {
                                    if (rs.name.value === 'src') {
                                        // http:// :// 根据页面的协议处理
                                        rs.value.value = this.$urlUtils.getViewUrl(rs.value.value);
                                        if (rs.value.value.indexOf('http://') >= 0) {
                                            rs.value.value = rs.value.value.replace('http://', 'https://');
                                        }
                                    }
                                    return rs;
                                });
                            }
                            break;
                    }
                }

                if (Array.isArray(r.body)) {
                    r.body = this.rewriteNode(r.body);
                }

                return r;
            });

            return arr;
        },
    },
};
</script>
<style lang="less" scoped>
.help-wrap {
    width: 100%;
    background: #f5f6f9;
}
.help-header {
    width: 100%;
    height: 170px;
    background: url('./asset/images/help-bgc.png') no-repeat;
    background-position: left center;
    background-size: 100% 100%;
    .help-title {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        position: relative;
        span {
            position: absolute;
            left: 88px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 28px;
            font-weight: 700;
            color: #333333;
        }
        .help-logo1 {
            position: absolute;
            bottom: 12px;
            right: 347px;
            width: 168px;
            height: 97px;
            z-index: 2;
        }
        .help-logo2 {
            position: absolute;
            bottom: 0;
            right: 145px;
            width: 166px;
            height: 160px;
            z-index: 2;
        }
        .help-logo3 {
            position: absolute;
            bottom: -46px;
            right: 142px;
            width: 166px;
            height: 206px;
            z-index: 2;
        }
    }
}
.help-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .help-column-box {
        margin-bottom: 16px;
        padding: 20px 0px 8px 46px;
        width: 1200px;
        height: 64px;
        box-sizing: border-box;
        background-color: #fff;
        display: flex;
        align-items: center;
        .column-item-box {
            margin-right: 90px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            font-weight: 400;
            text-align: left;
            color: #333333;
            cursor: pointer;
            .column-name {
                font-size: 16px;
                text-align: center;
                line-height: 21px;
                color: #333333;
            }
            .line {
                margin-top: 8px;
                width: 16px;
                height: 2px;
                background-color: transparent;
                border-radius: 2px;
            }
            .active-column {
                font-weight: 700;
                color: #f8323c;
            }
            .active-line {
                background-color: #f8323c;
            }
        }
        .column-item-box:hover {
            font-weight: 700;
            color: #333;
            .column-name {
                font-weight: 700;
            }
        }
    }
    .article-box {
        margin: 0 auto 120px;
        width: 1200px;
        display: flex;
        justify-content: space-between;
        .article-title-box {
            padding-top: 40px;
            width: 222px;
            height: auto;
            background-color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            .article-item-box {
                margin-bottom: 8px;
                width: 184px;
                height: 56px;
                background-color: transparent;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                color: #53586c;
                .article-title {
                    width: 140px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: 16px;
                }
                .active-right-img {
                    width: 6px;
                    height: 12px;
                }
            }
            .article-item-box:hover {
                background-color: rgba(255, 46, 48, 0.1);
                color: #f8323c;
                border-radius: 8px;
            }
            .active-article-item {
                background-color: rgba(255, 46, 48, 0.1);
                color: #f8323c;
                border-radius: 8px;
                font-weight: 700;
            }
        }
        .article-content-box {
            width: 962px;
            background-color: #fff;
            padding: 20px 44px 80px;
            box-sizing: border-box;
            min-height: 800px;
            /deep/img {
                max-width: 100%;
                height: auto;
            }
            /deep/video {
                max-width: 100%;
                height: auto;
            }
            .rich-text {
                line-height: 2rem;
            }
            ::v-deep a {
                color: #999;
            }
        }
    }
}
</style>
