<template>
    <div class="qualifications-container">
        <img src="./asset/images/title-img.png" alt="" class="title-img" />
        <div class="qualification-content" v-loading="isLoading" ref="qualificationContent">
            <div class="left-link-box">
                <div class="left-link-content" :class="[isFixed ? 'fixed-left-link-content' : '']">
                    <span
                        class="item-title"
                        @click="select(index, item)"
                        :class="[activeIndex === index ? 'active-item' : '']"
                        v-for="(item, index) in articleList"
                        :key="index"
                    >
                        {{ item.title }}
                    </span>
                </div>
            </div>
            <div class="article-content-box" v-loading="isLoadArticle">
                <div class="rich-text" :id="articleDeltilList[index].id" v-for="(item, index) in articleDeltilList" :key="index" v-html="item.content" />
            </div>
        </div>
    </div>
</template>
<script>
import { parse } from 'html5parser';
import '@/api/cp/api.CMP2016.query-article-list.js';
import '@/api/cp/api.CP3004.query-article-detail.js';
export default {
    data() {
        return {
            columnId: '', // 栏目id
            page: {
                pageIndex: 1,
                pageSize: 10,
                count: 0,
            }, // 分页
            articleList: [], // 章节列表
            articleDeltilList: [], // 文章详情列表
            activeIndex: 0, // 选择的文章索引
            isLoading: false, // 是否加载中
            isLoadArticle: false, // 是否加载文章
            articleContent: '', // 文章的内容
            isFixed: false, // 是否固定定位
        };
    },
    head() {
        return this.$head({
            title: '企业资质_点亮职业人生_优路教育',
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content:
                        '品牌,企业文化,社会责任,企业新闻,优路,优路教育,优路教育网,国家职业资格考试,在线教育,在线培训,职业培训,职业教育,素质提升,技能提升,建筑工程考试,消防考试,一级建造师,二级建造师,一级消防工程师,四级英语,六级英语,大学生,公务员,考公考编,心理咨询,初级会计师,财税金融,医卫康养,教师,法律,学历,学历提升',
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
        // 添加滚动条事件 用来确定是否需要定位
        window.addEventListener('scroll', this.windowScroll);
        this.columnId = this.$route.params.columnId;
        this.queryArticleList();
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.windowScroll);
    },
    methods: {
        // 查询文章列表
        queryArticleList() {
            this.isLoading = true;
            this.$callApi('cp/query-article-list', {
                columnId: this.columnId,
                pageIndex: this.page.pageIndex,
                pageSize: this.page.pageSize,
                onsuccess: (data) => {
                    if (data) {
                        this.articleList = data.list.filter((item) => {
                            return item.caType !== 'T';
                        });

                        let promiseArray = [];
                        if (this.articleList.length) {
                            this.articleList.forEach((item) => {
                                promiseArray.push(this.queryArticleDetail(item.id));
                            });
                        }

                        Promise.all(promiseArray)
                            .then((result) => {
                                this.articleDeltilList = result;
                            })
                            .catch(() => {});
                    }
                },
                onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.isLoading = false;
                },
            });
        },
        // 左边选择文章
        select(index, item) {
            if (this.activeIndex === index) {
                return;
            }

            // 兼容顶部的header遮盖内容区域
            this.activeIndex = index;
            const articleObj = this.$refs.qualificationContent.querySelector(`#${item.id}`);

            let timer = setTimeout(() => {
                document.documentElement.scrollTop = document.body.scrollTop = articleObj.offsetTop + 300;
                clearTimeout(timer);
                timer = null;
            });
        },
        // 滚动条事件
        windowScroll() {
            this.$nextTick(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
                const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

                if (
                    scrollTop >= this.$refs.qualificationContent.offsetTop &&
                    scrollTop + windowHeight < scrollHeight - this.$refs.qualificationContent.querySelector('.left-link-content').offsetHeight
                ) {
                    this.isFixed = true;
                } else {
                    this.isFixed = false;
                }
            });
        },
        // 查询咨询详情
        queryArticleDetail(articleId) {
            return new Promise((resolve, reject) => {
                this.isLoadArticle = true;
                this.$callApi('cp/query-article-detail', {
                    id: articleId,
                    onsuccess: (data) => {
                        if (data) {
                            let nodeArr = parse(data.content);
                            nodeArr = this.rewriteNode(nodeArr);
                            data.content = this.createHTML(nodeArr);
                            resolve(data);
                        }
                    },
                    onerror: (err) => {
                        this.$niceloo.api.handleFailure(err);
                        reject(err);
                    },
                    oncomplete: () => {
                        this.isLoadArticle = false;
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
        navHeightChange(h) {
            this.navHeight = h;
        },
    },
};
</script>
<style lang="less" scoped>
.qualifications-container {
    margin: 0 auto;
    width: 1200px;
    .title-img {
        margin: 32px 0 44px;
        width: 1200px;
        height: auto;
    }
    .qualification-content {
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        .left-link-box {
            .left-link-content {
                transition: all 1s;
                max-height: 800px;
            }
            .fixed-left-link-content {
                position: fixed;
                top: 100px;
                transition: all 1s;
            }
            .item-title {
                padding: 15px 24px;
                max-width: 268px;
                box-sizing: border-box;
                background: #eeeff6;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 400;
                color: #53586c;
                line-height: 21px;
                margin-bottom: 24px;
                cursor: pointer;
                transition: all 0.2s;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .item-title:hover {
                background: linear-gradient(90deg, #ff6870, #f8323c);
                color: #ffffff;
            }
            .active-item {
                background: linear-gradient(90deg, #ff6870, #f8323c);
                color: #ffffff;
            }
        }
        .article-content-box {
            width: 852px;
            background-color: #fff;
            padding: 20px 44px 80px;
            box-sizing: border-box;
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
                margin-bottom: 40px;
            }
        }
    }
}
</style>
