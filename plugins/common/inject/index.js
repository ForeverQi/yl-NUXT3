/*
 * @Author: Li
 * @Date: 2021-09-10 10:53:05
 * @LastEditors: Li
 * @LastEditTime: 2022-03-24 15:48:37
 * @Description:
 */
import niceloo from '@youlu/niceloo/libs/@xlib.01/index';
import Vue from 'vue';
import enhancedNicelooApiCalling from '@youlu/niceloo/libs/@xlib.01/vue-enhance/enhance.vue.$api.mjs';
import dayjs from 'dayjs';
import yiguan from '../../yiguan';
import globalScope from '../../dictionary/globalScope.js';
import dictionaryUtil from '../../dictionary/dictionaryUtil.js';
import dictMap from '../../dictionary/dict.js';
import baiduStatistics from '../../baiduStatistics/index.js';
import cookieUtil from './cookieUtil.js';
import storage from './storage.js';
import projectUtil from './projectUtil';
import urlUtils from './urlUtils';
import dateUtils from './dateUtil';
import resUtils from './resUtil';
import picRotatUtil from './picRotatUtil';
import treatyUtil from './treatyUtil';
import shoppingCart from './shoppingCart';
import PromotionUtil from './PromotionUtil';
import platform from './platform';
import user from './user';
import pageUtil from './PageUtil';
import PromotionUtilNew from './PromotionUtilNew';
import Promotion from './Promotion';
import StringUtil from './StringUtil';
import Mask from './Mask';
import MsgBox from './MsgBox';
import mcuLogin from './mcuLogin.js';
import countDown from './countDown.js';
import html5parserUtil from './html5parserUtil.js';
import ylPlugins from './yl-plugins.js';
import clientUtil from './ClientUtil.js';
import numberUtil from './numberUtil.js';
import changeEnv from '~/www/targets/NC01/config/api/changeEnv';

const httpClient = ({ url, params = {}, isCustom = false }) => {
    const callApi = niceloo.api.call;
    return new Promise((resolve, reject) => {
        callApi(url, {
            ...params,
            onsuccess(data) {
                resolve(data);
            },
            onerror(err) {
                if (!isCustom) {
                    niceloo.api.handleFailure(err);
                }

                return reject(err);
            },
        });
    });
};

export default (context, inject) => {
    if (process.client) {
        // 根据环境标识重新设置境配置文件
        if (changeEnv) {
            context.env.config = Object.assign(context.env.config, { ...changeEnv });
        }

        inject('mcuLogin', mcuLogin(context));
        inject('projectUtil', projectUtil);
        inject('ClientUtil', clientUtil);
    }
    process.nuxtContext = context;
    dictionaryUtil.load(dictMap);
    inject('bus', new Vue());
    inject('Promotion', Promotion(context.env.config));
    inject('cookieUtil', cookieUtil);
    const ylYiguan = yiguan(context);
    inject('yiguan', ylYiguan);
    // 优路登录公共组件
    inject('ylPlugin', ylPlugins(context, process.client, ylYiguan));
    inject('storage', storage(context.env.config));
    inject('urlUtils', urlUtils);
    inject('DateUtil', dateUtils);
    inject('picRotatUtil', picRotatUtil);
    inject('treatyUtil', treatyUtil(context.env.config));
    inject('GLOBALSCOPE', globalScope);
    inject('Dictionary', dictionaryUtil);
    inject('platform', platform);
    inject('StringUtil', StringUtil);
    inject('numberUtil', numberUtil);
    inject('BaiduStatistics', baiduStatistics(context.env.config));

    // context 和 组件实例方便调用请求方法
    inject('niceloo', niceloo);
    inject('httpClient', httpClient);
    inject('head', (tdkObj) => {
        tdkObj.meta.forEach((res) => {
            if (res.hid === 'description') {
                res.content = dayjs().format('YYYY-MM-DD') + ' ' + res.content;
            }
        });
        if (!process.client) {
            let url = `${context.req.headers.host}${context.req.url}`;
            if (context.env.config.env === 'prod') {
                url = `https://${url}`;
            } else {
                url = `http://${url}`;
            }
            tdkObj.script = [
                {
                    json: {
                        '@context': 'https://ziyuan.baidu.com/contexts/cambrian.jsonId',
                        '@id': url,
                        pubDate: context.app.head.pubDate,
                        upDate: dayjs().format('YYYY-MM-DD'),
                    },
                    type: 'application/Id+json',
                    charset: 'utf-8',
                },
            ];
        }

        return tdkObj;
    });
    for (var p in enhancedNicelooApiCalling) {
        inject(p, enhancedNicelooApiCalling[p]);
    }
    inject('shoppingCart', shoppingCart(context.env.config));
    inject('ResUtils', resUtils);

    inject('PromotionUtil', PromotionUtil(context.env.config));
    inject('PromotionUtilNew', PromotionUtilNew(context.env.config));
    inject('User', user(context.env.config));
    inject('PageUtil', pageUtil(context.env.config));
    inject('Mask', Mask);
    inject('MsgBox', MsgBox);
    inject('countDown', countDown);
    inject('html5parserUtil', html5parserUtil);
};
