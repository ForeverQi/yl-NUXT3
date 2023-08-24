/* eslint-disable jsdoc/require-jsdoc */
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import visitor from '@youlu/niceloo/libs/@xlib.01/niceloo/app/app.visitor.js';
import cookieUtil from '@youlu/niceloo/libs/@xlib.01/lib/util/util.cookie.js';
import ssrApiErrorHandler from './ssr-api-error-handler.js';
import User from '@/plugins/common/inject/user.js';
import changeEnv from '~/www/targets/NC01/config/api/changeEnv.js';

let config = process.env.config;

// 根据环境重新设置Config配置文件
if (process.client && changeEnv) {
    config = Object.assign(config, { ...changeEnv });
}

const user = User(config);
visitor.impl({
    isLogined() {
        return user.isLogined();
    },
    setLoginResult(result) {
        user.setUser(result);
    },
    getLoginResult() {
        return user.getLoginStatus();
    },
    removeLoginResult() {
        user.removeLoginInfo();
    },
    setToken(token) {
        user.setToken(token);
    },
    getToken() {
        return user.getToken();
    },
    logout() {
        user.logout();
    },
    tipLogin() {
        if (process.client) {
            // 浏览器端展示
            if (location.href.indexOf('/agile-course') > -1) {
                this.removeLoginResult();
                window.location.reload();
                return;
            }
        }
        user.toLogin();
    },
});

/**
 * 如果可能，将给定URL中的协议更改为当前地址栏中的协议，使其保持一致，以规避“https 页面调用 http 接口失败”的现象
 *
 * @param {string} url 要更换协议的URL
 * @returns {string} 更换后的URL
 */
const changeProtocolToKeepConsistentWithLocationIfPossible = function (url) {
    if (process.client) return url.replace(/^(http|https):/i, location.protocol);

    return url;
};

/**
 * 设置接口交互服务地址
 */
niceloo.api.setProperties({
    /* 是否加密 */
    'enable-encryption': config.isEncryption,

    /* 网关的请求地址 */
    'server.contextUrl': changeProtocolToKeepConsistentWithLocationIfPossible(config.umsuApiUrl),

    /* 文件服务的请求地址 */
    'fileServer.contextUrl': changeProtocolToKeepConsistentWithLocationIfPossible(config.ufileApiUrl),
});

/**
 * 自动附加：
 * 1. 用户登录凭证
 * 2. 客户端类型 ctype
 * 3. utemp（供 推广中心 - 指针营销 系统获取线索）
 */
niceloo.api.addRequestFormDataProcessor(function (formData) {
    formData.TOKEN = user.getToken();

    if (typeof window !== 'undefined' && location.href.indexOf('/agile-course') > -1) {
        formData.ctype = 'OP.WKWEB';
    } else {
        formData.ctype = 'YOULU.WEB';
    }

    /* 指针营销 系统需要的，用于关联用户点击行为的唯一ID */
    let utemp = '';
    if (typeof window !== 'undefined') {
        utemp = cookieUtil.getItem('utemp');
    }
    if (null != utemp && '' !== (utemp = String(utemp).trim()))
        if (Array.isArray(formData.apis))
            formData.apis.forEach(function (request) {
                request.params = request.params || {};
                request.params.utemp = utemp;
            });

    return formData;
});

/* 动态改变请求地址 */
niceloo.api.setHttpRequestURLResolver(function (url, requests) {
    if (url) return url;

    /* 为了开发过程中便于调试接口，添加该设置 */
    if (config.env !== 'prod' && Array.isArray(requests) && requests.length === 1) {
        return `${niceloo.path.getServerHttpAPIPath()}${requests[0].api}`;
    }

    return niceloo.path.getServerHttpAPIPath();
});

/* 从不合并请求 */
niceloo.api.setAPIRequestGroupMatcher(function () {
    return false;
});

/**
 * 将 文件服务 响应的格式统一转换为 网关 的格式
 */
niceloo.api.setAPIResponseConverter(function (response) {
    return {
        api: '',
        result: '0000' === response.code ? '000000' : 'FS' + response.code,
        msg: response.msg,
        data: response.data,
        seqno: '',
        cid: '',
    };
}, 'file-service');

/**
 * 在 SSR 模式下监听错误的响应，并自动返回 404 响应码，以满足SEO需要
 */
niceloo.api.watchResponse(function (_failure, response, request) {
    // console.log(request);
    // console.log(process.nuxtContext.error);
    if (null == _failure) {
        /* 响应是成功的，忽略即可 */
        return;
    }

    const checkObj = ssrApiErrorHandler(request);

    if (checkObj.check === true && process.server) {
        process.nuxtContext.error({ statusCode: 404, message: checkObj.tip });
    }
});
// 阿里云ARMS监控
niceloo.api.watchResponse(function (_failure, response, request) {
    /* 接口调用成功，无需上报 */
    if (null == _failure) return;

    /* 对于网络错误，无论响应码是多少，统一上报，即使是代表“用户连不上网”的为0的响应码 */
    if ('NETWORK' === _failure.getCategory() && _failure.getCode() >= 400) {
        window.__bl.api({
            api: request.api,
            success: false,
            time: 0,
            code: _failure.getCode(),
            msg: _failure.getDescription(),
        });
        return;
    }

    /* 稀松平常的错误，无需上报 */
    if (['GB2004', 'GB2006', 'GB3000', 'GB3001'].indexOf(response.getResultCode()) !== -1) return;

    /* 非技术类错误，无需上报 */
    var serverReturnedMsg = response.getServerReturnedMsg();
    if (
        !/mysql|java|api|exception|refused|timed out|proxy|key|error|table|don't|doesn't|unexpected|encountered|position|line|parsing|invalid|响应超时|处理器未找到|连接失败|系统访问失败|全局锁|请求失败|响应体/gi.test(
            serverReturnedMsg
        )
    )
        return;

    window.__bl.api({
        api: request.api,
        success: false,
        time: 0,
        code: _failure.getCode(),
        msg: serverReturnedMsg,
    });
});

/**
 * 完成初始化，放行挂起的请求
 */
niceloo.api.init();

export default niceloo;
