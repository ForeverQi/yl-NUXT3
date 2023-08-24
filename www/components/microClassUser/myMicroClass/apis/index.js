/*
 * @Author: guo
 * @Date: 2022-03-14 13:42:45
 * @LastEditors: guo
 * @LastEditTime: 2022-03-14 16:01:03
 * @Description:
 */
import '@/api/mcu/api.MCU0002.mcp_trial_web_similar.js';
import '@/api/mcu/api.MCU4007.collection-cancel.js';
import '@/api/mcu/api.MCU1001.liveCourse-web-list.js';

import '@/api/mcu/api.MCU4001.mcp-project-list.js';
import '@/api/mcu/api.MCU4002.mcp-mine-course.js';
import '@/api/mcu/api.MCU4003.mcp-mine-appointment.js';
import '@/api/mcu/api.MCU4004.mcp-mine-collection.js';

import '@/api/mcu/api.MCU4008.microclass-unpaid.js';
import '@/api/mcu/api.MCU4009.microclass-paid.js';
import '@/api/mcu/api.MCU4010.cancel-own-order.js';

// context vue instance
function mcpTrialWebSimilar(context, params = {}) {
    return context
        .$callApi('experience/mcp_trial_web_similar', {
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

function mcpProjectList(context, params = {}) {
    return context
        .$callApi('myMicroClass/mcp-project-list', {
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

function mcpMineCourse(context, params = {}) {
    return context
        .$callApi('myMicroClass/mcp-mine-course', {
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

function mcpMineAppointment(context, params = {}) {
    return context
        .$callApi('myMicroClass/mcp-mine-appointment', {
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

function mcpMineCollection(context, params = {}) {
    return context
        .$callApi('myMicroClass/mcp-mine-collection', {
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

function mcpMineCollectionCancel(context, params = {}) {
    return context
        .$callApi('myMicroClass/collection-cancel', {
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

function microclassUnpaid(context, params = {}) {
    return context
        .$callApi('order/microclass-unpaid', {
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

function microclassPaid(context, params = {}) {
    return context
        .$callApi('order/microclass-paid', {
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

function cancelOwnOrder(context, params = {}) {
    return context
        .$callApi('order/cancel-own-order', {
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

export {
    mcpProjectList,
    mcpTrialWebSimilar,
    mcpMineCourse,
    mcpMineAppointment,
    mcpMineCollection,
    mcpMineCollectionCancel,
    liveCourseWebList,
    microclassUnpaid,
    microclassPaid,
    cancelOwnOrder,
};
