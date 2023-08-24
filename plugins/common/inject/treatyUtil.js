import axios from 'axios';
import urlUtils from './urlUtils.js';
import PageUtil from '~/plugins/common/inject/PageUtil';
import User from '~/plugins/common/inject/user';
const baseUrl = urlUtils.getStaticUrl() + '/agreement';

export default (config) => {
    return {
        getTreatyContent: function getTreatyContent(url) {
            return {
                then(func) {
                    axios.get(url, {}).then(function (data) {
                        func(data.data || '');
                    });
                },
            };
        },
        download({ address, fileName, isOld = false }) {
            let host = $nuxt.$niceloo.api.getProperty('fileServer.contextUrl');
            if (isOld === true) {
                host = host.replace('ufileuat', 'ufile');
            }
            PageUtil(config.env).openNewPage(
                host +
                    '/file/download/html/convert/pdf?params=' +
                    encodeURIComponent(
                        JSON.stringify({
                            address,
                            token: User(config.env).getToken(),
                            loginType: 'U', //用户端是U管理端是A
                            fileName: encodeURIComponent(fileName),
                        })
                    )
            );
        },
        // 获取通用电子协议
        getContract(version) {
            // return SyncHttp.getBody(baseUrl+'/'+version+'/entire/normal');
            return this.getTreatyContent(baseUrl + '/' + version + '/entire/normal/');
        },

        //获取重读电子协议
        getChongduContract(version) {
            return this.getTreatyContent(baseUrl + '/' + version + '/entire/repetition/');
        },

        // 获取退费电子协议
        getTuifeiContract(version) {
            return this.getTreatyContent(baseUrl + '/' + version + '/entire/refund/');
        },

        // 获取通用服务介绍
        getPromotion(version) {
            // return getTreatyContent(baseUrl+'/'+version+'/integrant/normal');
            return this.getTreatyContent(baseUrl + '/' + version + '/entire/normal/');
        },

        // 获取重读服务介绍
        getChongduPromotion(version) {
            return this.getTreatyContent(baseUrl + '/' + version + '/integrant/repetition/');
        },

        // 获取退费服务介绍
        getTuifeiPromotion(version) {
            return this.getTreatyContent(baseUrl + '/' + version + '/integrant/refund/');
        },

        // 48小时退费协议
        getTuifeiContract48(version) {
            return this.getTreatyContent(baseUrl + '/' + version + '/integrant/hesitate/');
        },

        // 协议模板
        getProtocolTemplate(data) {
            return `bd/class/agreement/info?params=${encodeURIComponent(JSON.stringify(data))}`;
        },
        // 收据须知
        getReceipt() {
            return this.getTreatyContent(baseUrl + '/e/entire/receipt/');
        },
        // 协议模板 重读 退费 （截取用）
        getTemplate(url) {
            return this.getTreatyContent(url);
        },
    };
};
