/*
 * @Author: Li
 * @Date: 2022-04-01 10:15:24
 * @LastEditors: Li
 * @LastEditTime: 2022-04-01 14:28:03
 * @Description:
 */
import Vue from 'vue';
import mcumsg from './mcumsg/index.vue';

const McumsgConstructor = Vue.extend(mcumsg);

let instance = null;

const initInstance = () => {
    instance = new McumsgConstructor({
        el: document.createElement('div'),
    });
    document.body.appendChild(instance.$el);
};

const confirm = (ops) => {
    if (process.server) {
        // ssr 不能直接操作DOM不在执行
        return;
    }
    if (!instance) {
        initInstance();
    }
    return instance.showModal({
        type: ops.type,
        title: ops.title,
        content: ops.content,
        showCancel: ops.showCancel,
        confirmText: ops.confirmText,
        cancelText: ops.cancelText,
    });
};

const alert = (content = '', title = '提示', customOps = {}) => {
    if (process.server) {
        // ssr 不能直接操作DOM不在执行
        return;
    }
    if (!instance) {
        initInstance();
    }
    if (Object.prototype.toString.call(content) === '[object Object]') {
        content = content.content;
    }
    let ops = {
        title,
        content,
        showCancel: false,
        ...customOps,
    };
    return instance.showModal(ops);
};

export default {
    confirm,
    alert,
};
