/*
 * @Author: Li
 * @Date: 2022-03-12 13:42:45
 * @LastEditors: Li
 * @LastEditTime: 2022-03-28 15:07:22
 * @Description:
 */
import '@/api/mcu/api.MCU0001.mcp_trial_web_detail.js';
import '@/api/mcu/api.MCU0002.mcp_trial_web_similar.js';
import '@/api/mcu/api.MCU0004.mcp_trial_web_poster.js';
import '@/api/mcu/api.MCU0003.mcp_mine_collection_add.js';
import '@/api/mcu/api.MCU4007.collection-cancel.js';
import '@/api/mcu/api.MCU0005.mcp_trial_web_free.js';
import '@/api/mcu/api.MCU0007.mcp_trial_web_related.js';
import '@/api/mcu/api.MCU5001.ordering_orderapproval_apply_post.js';
import '@/api/mcu/api.MCU5004.ordering_order_detail.js';
import '@/api/mcu/api.MCU4008.microclass-unpaid.js';
import '@/api/mcu/api.MCU5005.ordering_receipts_payprecreate.js';
import '@/api/mcu/api.MCU5006.pc_trade_pay.js';
import '@/api/mcu/api.MCU5007.pc_paymode_profile_list.js';
import '@/api/mcu/api.MCU5008.pc_cash_info.js';
import '@/api/uc/api.PC0013.query-pay-status.js';
import '@/api/uc/api.PC0000.query-cashier-info.js';
import '@/api/mcu/api.MCU6001.mcp_video_web_token.js';
import '@/api/mcu/api.MCU1002.liveCourse-web-detail.js';
import '@/api/mcu/api.MCU5009.ordering_studentorder_microclass_orderdetail_post.js';

function mcpTrialWebDetail(context, params = {}) {
    return context
        .$callApi('experience/mcp_trial_web_detail', {
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

function mcpTrialWebPoster(context, params = {}) {
    return context
        .$callApi('experience/mcp_trial_web_poster', {
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

function mcpMineCollectionAdd(context, params = {}) {
    return context
        .$callApi('experience/mcp_mine_collection_add', {
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

function mcpTrialWebFree(context, params = {}) {
    return context
        .$callApi('experience/mcp_trial_web_free', {
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

function mcpTrialWebRelated(context, params = {}) {
    return context
        .$callApi('experience/mcp_trial_web_related', {
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

function orderingOrderapprovalApplyPost(context, params = {}) {
    return context
        .$callApi('order/ordering_orderapproval_apply_post', {
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

function orderingOrderDetail(context, params = {}) {
    return context
        .$callApi('order/ordering_order_detail', {
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

function orderingStudentorderMicroclassUnpaidPost(context, params = {}) {
    return context
        .$callApi('myMicroClass/microclass-unpaid', {
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

function orderingReceiptsPayprecreate(context, params = {}) {
    return context
        .$callApi('order/ordering_receipts_payprecreate', {
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

function pcTradePay(context, params = {}) {
    return context
        .$callApi('order/pc_trade_pay', {
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

function pcCashInfo(context, params = {}) {
    return context
        .$callApi('order/pc_cash_info', {
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

function queryPayStatus(context, params = {}) {
    return context
        .$callApi('uc/query-pay-status', {
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

function queryCashierInfo(context, params = {}) {
    return context
        .$callApi('uc/query-cashier-info', {
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

function pcPaymodeProfileList(context, params = {}) {
    return context
        .$callApi('order/pc_paymode_profile_list', {
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

function mcpVideoWebToken(context, params = {}) {
    return context
        .$callApi('video/mcp_video_web_token', {
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

function mcpLiveCourseWebDetail(context, params = {}) {
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

function orderingStudentorderMicroclassOrderdetaiPost(context, params = {}) {
    return context
        .$callApi('order/ordering_studentorder_microclass_orderdetail_post', {
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
    mcpTrialWebDetail,
    mcpTrialWebSimilar,
    mcpTrialWebPoster,
    mcpMineCollectionAdd,
    mcpMineCollectionCancel,
    mcpTrialWebFree,
    mcpTrialWebRelated,
    orderingOrderapprovalApplyPost,
    orderingOrderDetail,
    orderingStudentorderMicroclassUnpaidPost,
    orderingReceiptsPayprecreate,
    pcTradePay,
    pcPaymodeProfileList,
    pcCashInfo,
    queryPayStatus,
    queryCashierInfo,
    mcpVideoWebToken,
    mcpLiveCourseWebDetail,
    orderingStudentorderMicroclassOrderdetaiPost,
};
