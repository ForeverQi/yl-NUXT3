/*
 * @Author: guo
 * @Date: 2022-03-12 13:42:45
 * @LastEditors: guo
 * @LastEditTime: 2022-03-12 16:03:19
 * @Description:
 */
import '@/api/mcu/api.MCU1002.liveCourse-web-detail.js';
import '@/api/mcu/api.MCU1001.liveCourse-web-list.js';
import '@/api/mcu/api.mcu01.mcp-home-top-live-subscribe.js';
import '@/api/mcu/api.mcu-001.public-extensioncenter-receive.js'; //线索推送
import '@/api/mcu/api.mcu-003.mcp-web-poster.js'; //分享-海报生成

function liveCourseWebDetail(context, params = {}) {
    return context
        .$callApi('zhibomokuai/liveCourse-web-detail', {
            ...params,
        })
        .then(
            (res) => {
                return res.getData();
            },
            (err) => {
                return Promise.reject(err);
            }
        );
}

function liveCourseWebList(context, params = {}) {
    return context
        .$callApi('zhibomokuai/liveCourse-web-list', {
            ...params,
        })
        .then(
            (res) => {
                return res.getData();
            },
            (err) => {
                return Promise.reject(err);
            }
        );
}

function liveCourseWebAppointment(context, params = {}) {
    return context
        .$callApi('topLive/mcp-home-top-live-subscribe', {
            ...params,
        })
        .then(
            (res) => {
                return res.getData();
            },
            (err) => {
                return Promise.reject(err);
            }
        );
}

function publicExtensioncenterReceive(context, params = {}) {
    return context
        .$callApi('public/public-extensioncenter-receive', {
            ...params,
        })
        .then(
            (res) => {
                return res.getData();
            },
            (err) => {
                return Promise.reject(err);
            }
        );
}
function webPoster(context, params = {}) {
    return context
        .$callApi('public/mcp-web-poster', {
            ...params,
        })
        .then(
            (res) => {
                return res.getData();
            },
            (err) => {
                return Promise.reject(err);
            }
        );
}

export { liveCourseWebDetail, liveCourseWebList, liveCourseWebAppointment, publicExtensioncenterReceive, webPoster };
