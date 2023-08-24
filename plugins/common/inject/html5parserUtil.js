import urlUtils from './urlUtils.js';
const ret = {
    rewriteHTML(nodeArr) {
        nodeArr = this.rewriteNode(nodeArr);
        return this.createHTML(nodeArr);
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
                        if (ra.value) {
                            str += ' ' + ra.name.value + '="' + ra.value.value + '"';
                        }
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
                                    if (rs.value) {
                                        rs.value.value = urlUtils.getViewUrl(rs.value.value);
                                        if (rs.value.value.indexOf('http://') >= 0) {
                                            rs.value.value = rs.value.value.replace('http://', 'https://');
                                        }
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
};

export default ret;
