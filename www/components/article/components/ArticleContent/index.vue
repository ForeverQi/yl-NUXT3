<template>
    <div class="article-content">
        <div class="section-content">
            <div class="title">
                {{ article.caTitle }}
            </div>
            <div class="txt" v-html="articleContent"></div>
        </div>
        <div class="side">
            <div class="item" v-for="item in articleList" :key="item.caId" :class="{ this: item.caId === selectId }">
                <nuxt-link :to="`/article/detail/${ccateId}/${item.caId}`" v-if="item.caType === 'C'" class="link">
                    {{ item.caTitle }}
                </nuxt-link>
                <a :href="item.caTurnUrl" target="_blank" v-else-if="item.caType === 'T'" class="link">
                    {{ item.caTitle }}
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { parse } from 'html5parser';
export default {
    props: {
        ccateId: {
            type: String,
            default: '',
        },
        articleList: {
            type: Array,
            default() {
                return [];
            },
        },
        article: {
            type: Object,
            default() {
                return {};
            },
        },
        selectId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            articleContent: '',
        };
    },
    watch: {
        article: {
            handler(val, oldVal) {
                if (val.caContent) {
                    let nodeArr = parse(val.caContent);
                    nodeArr = this.rewriteNode(nodeArr);
                    this.articleContent = this.createHTML(nodeArr);
                }
            },
            immediate: true,
        },
    },
    methods: {
        change(id) {
            this.$emit('change', id);
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
.article-content {
    overflow: auto;
    .side {
        width: 208px;
        min-height: 500px;
        background: #fff;
        border-radius: 4px;

        .item {
            height: 56px;
            line-height: 56px;
            color: #53586c;
            font-size: 16px;
            cursor: pointer;

            .link {
                padding-left: 20px;
                color: #53586c;
                font-size: 16px;
                display: block;
                height: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: block;
                white-space: nowrap;
            }

            &.this {
                position: relative;
                font-size: 16px;
                font-weight: 700;
                color: #f8323c;
                background: linear-gradient(90deg, #fff4f4, #ffffff);

                .link {
                    color: #f8323c;
                    font-size: 16px;
                }

                &::before {
                    position: absolute;
                    top: 0;
                    left: 0;
                    content: '';
                    display: block;
                    width: 6px;
                    height: 56px;
                    background-image: url(./asset/images/side.png);
                    background-size: 100% 100%;
                }
            }
        }
    }

    .section-content {
        float: right;
        width: 876px;
        min-height: 500px;
        background: #fff;
        border-radius: 4px;

        .txt {
            padding: 20px 40px 40px 40px;
            font-size: 16px;
            line-height: 2em;
            text-align: left;
            word-break: break-all;
            color: #333;
        }

        .title {
            position: relative;
            height: 58px;
            line-height: 58px;
            font-size: 16px;
            font-weight: 700;
            padding-left: 40px;
            color: #333333;
            border-bottom: 1px solid #f5f6f9;

            &::before {
                position: absolute;
                top: 24px;
                left: 16px;
                content: '';
                display: block;
                width: 15px;
                height: 10px;
                background-image: url(./asset/images/mark.png);
                background-size: 100% 100%;
            }
        }
    }
}
</style>
