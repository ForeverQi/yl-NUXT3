import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import resUtil from './resUtil';
const urlUtils = {
    loginUrl: '/uc/login',
    /**
     * 获取文件查看路径
     * @param {String} filePath 文件在文件服务上的路径片段,例如:'2021/12/25/121212.html'
     * @param {String} [token] 文件的查阅凭证
     * @returns {String}
     */
    getViewUrl(filePath, token) {
        if (urlUtils.isFullPath(filePath)) return filePath;

        return niceloo.path.getServerFileViewPath(filePath, token);
    },
    /**
     * 判断给定的URL是否是绝对路径
     * @param {String} url 要判断的URL
     * @return {Boolean}
     */
    isFullPath(url) {
        if (/^\/\//.test(url) || /^http/.test(url)) {
            return true;
        }
        return false;
    },
    /**
     * 获取静态资源url
     */
    getStaticUrl() {
        return `${resUtil.getUresOrigin()}/_nuxt`;
    },
    /**
     * 获取文件下载路径
     */
    getDownloadUrl(filePath, token = '') {
        if (urlUtils.isFullPath(filePath)) return filePath;

        return niceloo.path.getServerFileDownloadPath(filePath, token);
    },

    /**
     * 获取地址栏主参数 menuId
     * @param {string} name 参数名
     * @return 参数的值
     */
    getUrlParam(name, url) {
        if (null == name || '' == name.trim()) return null;
        var r = new RegExp('\\b' + name + '=([^&]*)', 'i');
        var paramValue = location.search.match(r);
        if (url) {
            paramValue = new URL(url).search.match(r);
        }
        paramValue = null == paramValue ? null : paramValue[1];

        return paramValue ? decodeURIComponent(paramValue) : null;
    },
    getRedirect() {
        let param = this.getUrlParam('redirect');
        return param || null;
    },
    getFullUrl() {
        return location.href;
    },
    /**
     * 将参数拼接为符合params路由的字符串url
     * @param {string[]} paramsList params参数id集合,元素数量无限，从头往后拼，若为空元素，会校验该元素后面是否存在其他元素，存在会以all进行替换
     * @param {string} [baseUr] 地址开头，选填
     * @returns {string} 拼接完成后的字符串 例 /url/参数id1/all/参数id3/参数id4...
     */
    joinParamsUrl(paramsList, baseUrl) {
        let url = baseUrl || '';
        paramsList.forEach((item, index) => {
            if (index !== paramsList.length) {
                // 不是最后一个元素
                if (item || paramsList.some((item2, index2) => index2 > index && item2)) {
                    //
                    url += item ? `/${item}` : '/all';
                }
            } else if (item) {
                url += `/${item}`;
            }
        });
        return url;
    },
};
export default {
    ...urlUtils,
};
