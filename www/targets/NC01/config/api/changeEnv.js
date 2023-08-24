import cookieUtil from '@youlu/niceloo/libs/@xlib.01/lib/util/util.cookie.js';
import nuxtConfigDev from '../base/nuxt.config.dev1.js';
import nuxtConfigTest from '../base/nuxt.config.test.js';
import nuxtConfigUat from '../base/nuxt.config.uat.js';
import nuxtConfigProd from '../base/nuxt.config.prod.js';

/**
 * 获取地址栏参数集合
 *
 * @param {string} url 访问地址
 * @returns {object} 地址栏参数集合
 */
const getUrlParams = (url) => {
    // 创建目标对象
    let params = {};
    // 截取数据字符串
    let data = url.slice(url.indexOf('?'), url.length);
    // 将数据字符串表现为数组
    let aParams = data.substr(1).split('&');

    for (let i = 0; i < aParams.length; i++) {
        // 数据属性与数值分离
        let aParam = aParams[i].split('=');

        // 使用属性括号进行属性赋值
        params[aParam[0]] = aParam[1];
    }

    return params;
};

// eslint-disable-next-line
let config;

if (process.client) {
    // 首先从地址栏获取参数，然后存储本地
    const params = getUrlParams(window.location.href); // 地址栏参数
    let env = '';
    let envConfig = {};

    if (params && params.webpackPresetRuntimeEnv) {
        env = params.webpackPresetRuntimeEnv;
        localStorage.setItem('webpackPresetRuntimeEnv', env);
        cookieUtil.setItem('tool_dataOriginEnv', env, 30 * 24 * 60 * 60, '/');
    } else if (localStorage.getItem('webpackPresetRuntimeEnv')) {
        env = localStorage.getItem('webpackPresetRuntimeEnv');
    }

    if (env) {
        switch (env) {
            case 'dev':
                envConfig = nuxtConfigDev;
                break;

            case 'test':
                envConfig = nuxtConfigTest;
                break;

            case 'uat':
                envConfig = nuxtConfigUat;
                break;

            default:
                envConfig = nuxtConfigProd;
                break;
        }
        config = envConfig.env.config;
    }
}

export default config;
