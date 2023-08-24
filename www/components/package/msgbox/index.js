import Vue from 'vue';
import msgbox from './msgbox/index.vue';

const MsgboxConstructor = Vue.extend(msgbox);
let instance = null;

const initInstance = () => {
    instance = new MsgboxConstructor({
        el: document.createElement('div'),
    });
    document.body.appendChild(instance.$el);
};

const alert = (content = '', title = '提示', customOps = {}) => {
    if (process.server) {
        // ssr 不能直接操作DOM不在执行
        return;
    }
    if (!instance) {
        initInstance();
    }
    let hint = '';
    if (Object.prototype.toString.call(content) === '[object Object]') {
        hint = content.hint;
        content = content.content;
    }
    let promiseResolve = () => {};
    let promiseReject = () => {};
    const retPromise = new Promise((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
    });
    let ops = {
        title,
        content,
        hint,
        showCancel: false,
        ...customOps,
        success(res) {
            if (res.confirm) {
                promiseResolve();
                customOps.success && customOps.success(res.confirm);
            } else if (res.cancel) {
                promiseReject();
                customOps.cancel && customOps.cancel(res.confirm);
            }
        },
    };
    instance.showModal(ops);

    return retPromise;
};
const confirm = (ops) => {
    if (process.server) {
        // ssr 不能直接操作DOM不在执行
        return;
    }
    if (!instance) {
        initInstance();
    }
    let promiseResolve = () => {};
    let promiseReject = () => {};
    const retPromise = new Promise((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
    });
    let tempOps = {
        type: ops.type || 'confirm',
        title: ops.title,
        content: ops.content,
        showCancel: ops.showCancel,
        confirmText: ops.confirmText,
        cancelText: ops.cancelText,
        isHtml: ops.isHtml ? ops.isHtml : false,
        separateStatus: ops.separateStatus ?? false, // true：取消按钮单独的事件，需要配置separateCancel回调函数
        success: (res) => {
            if (ops.success) ops.success(res);
            if (res.confirm) {
                ops.confirm && ops.confirm();
                promiseResolve();
            } else if (res.cancel) {
                ops.cancel && ops.cancel();
                promiseReject();
            } else if (res.separateCancel) {
                ops.separateCancel && ops.separateCancel();
                promiseReject();
            }
        },
    };
    instance.showModal(tempOps);
    return retPromise;
};

export default {
    alert, // 弹窗
    confirm,
};
