<template>
    <dialog-view :title="title" :show.sync="dialogShow" @do-close="doClose" width="1000px">
        <div class="content" v-html="intro"></div>
        <template #foot>
            <div class="btn" @click="doClose(true)">我已知晓，继续申请</div>
        </template>
    </dialog-view>
</template>
<script>
import { parse } from 'html5parser';
import DialogView from '../dialog';
import '@/api/selfLearn/api..query-self-learn-apply-intro.js';
export default {
    components: {
        DialogView,
    },
    props: {
        title: {
            type: String,
            default: '申请续学须知',
        },
        show: {
            type: Boolean,
            default: false,
        },
        settingId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            dialogShow: false,
            intro: '',
            oriIntro: {},
        };
    },
    watch: {
        show(val, oldVal) {
            if (val !== oldVal) {
                this.dialogShow = this.show;
            }
        },
    },
    mounted() {
        document.querySelector('body').style.overflow = 'hidden';
        this.dialogShow = this.show;

        // 获取申请须知
        this.getData();
    },
    destroyed() {
        document.querySelector('body').style.overflow = 'auto';
    },
    methods: {
        getData() {
            let params = {
                settingId: this.settingId,
            };
            this.$callApi('selfLearn/query-self-learn-apply-intro', {
                ...params,
                onsuccess: (res) => {
                    let nodeArr = parse(res.applyInstruction);
                    nodeArr = this.rewriteNode(nodeArr);

                    this.intro = this.createHTML(nodeArr);
                    console.log(nodeArr, '11');
                    this.oriIntro = res;
                },
            });
        },
        doClose(check = false) {
            // 选出被选中的列表
            this.dialogShow = false;
            this.$emit('do-close', check, this.oriIntro);
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
            let ret = [];
            arr.forEach((r) => {
                if (r.type !== 'Tag') {
                    return ret.push(r);
                }
                // console.log(r, '===-');
                if (r.open && r.open.value === '<!--') {
                    return;
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
                                    if (rs.name.value === 'src' && rs.value.value.startsWith('data:image') === false) {
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
                    // console.log(r.body, '009');
                    r.body = this.rewriteNode(r.body);
                }
                ret.push(r);
            });
            return ret;
        },
    },
};
</script>
<style lang="less" scoped>
.btn {
    padding: 0 28px;
    display: inline-block;
    height: 40px;
    margin: auto;
    background: #f02e00;
    border-radius: 4px;
    color: #fff;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
}
.content {
    text-align: left;
    word-break: break-all;
    max-height: 550px;
    overflow-y: auto;
    /deep/ img {
        width: 100%;
    }
}
</style>
