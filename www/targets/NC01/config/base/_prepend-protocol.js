/**
 * 追加协议前缀
 * @param {String} url 可能没有协议前缀的URL
 * @param {String} [defaultProtocolForNode] URL没有协议前缀时，NODE环境下默认拼装的协议前缀。例如：http:
 * @param {String} [defaultProtocolForExternalUrl]
 * @returns {string|*}
 */
export default function (url, defaultProtocolForNode, defaultProtocolForExternalUrl) {
    if (typeof url !== 'string') return url;

    var protocol;
    if (typeof window === 'undefined') {
        /* node */
        protocol = defaultProtocolForNode || 'https:';
    } else if (/(?:niceloo|youlu)\.(?:com|cn)/.test(url)) {
        /* 优路自身的站点 */
        protocol = location.protocol;
    } else {
        /* 外部或未知站点 */
        protocol = defaultProtocolForExternalUrl || (/^(?:\/\/)?\d+(?:\.\d+){3}\b/i.test(url) ? 'http:' : 'https:'); /* 如果是 ip 则附加 http，否则附加 https */
    }

    /**
     * 移除多余的 // 结尾
     * 移除多余的 : 结尾
     * 添加没有的 :
     */
    protocol = protocol.replace(/^(\w+):*\/*$/, '$1:');

    if (/^\/\//.test(url)) /* //umsu.niceloo.com/api */ return protocol + url;
    else if (/^(http|https|ftp):\/\//i.test(url)) /* https://umsu.niceloo.com/api */ return url;
    else return protocol + '//' + url;
}
