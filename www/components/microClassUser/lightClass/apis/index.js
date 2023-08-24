/*
 * @Author: guo
 * @Date: 2022-03-12 13:42:45
 * @LastEditors: guo
 * @LastEditTime: 2022-03-12 16:03:19
 * @Description:
 */
import '@/api/mcu/api.MCU2001.operatecategory-user-list.js';
import '@/api/mcu/api.MCU2002.easyStudy-web-detail.js';
import '@/api/mcu/api.MCU2003.easyStudy-web-list.js';
import '@/api/mcu/api.mcu-003.mcp-web-poster.js'; //分享-海报生成

function operatecategoryUserList(context, params = {}) {
    return context
        .$callApi('lightClass/operatecategory-user-list', {
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
function easyStudyWebDetail(context, params = {}) {
    return context
        .$callApi('lightClass/easyStudy-web-detail', {
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

function easyStudyWebList(context, params = {}) {
    return context
        .$callApi('lightClass/easyStudy-web-list', {
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

export { operatecategoryUserList, easyStudyWebDetail, easyStudyWebList, webPoster };
