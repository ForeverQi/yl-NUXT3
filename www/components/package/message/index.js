import Vue from 'vue';
import Message from './main/Index.vue';

const MessageConstructor = Vue.extend(Message);
let instance = null;
let index = 0;
function createMsg(content, type) {
    if (process.server) {
        // ssr 不能直接操作DOM不在执行
        return;
    }
    if (!instance) {
        instance = new MessageConstructor({
            el: document.createElement('div'),
        });
        document.body.appendChild(instance.$el);
    }
    let item = {
        type,
        content,
        show: false,
        isFirst: true,
        index: index++,
        closeCb(it, _this) {
            if (it.show) {
                return;
            }
            let i = _this.noticeList.findIndex((cur) => {
                return cur.index === it.index;
            });
            if (i < 0) {
                return;
            }

            if (_this.noticeList.length === 0) {
                console.log('0000');
                _this.handleAfterLeave();
                instance = null;
            } else {
                _this.noticeList.splice(i, 1);
            }
        },
    };
    instance.noticeList.push(item);
    setTimeout(() => {
        item.show = true;
    }, 20);
    setTimeout(() => {
        item.show = false;
    }, 3000);
}

const success = (content) => {
    createMsg(content, 'success');
};
const error = (content) => {
    createMsg(content, 'error');
};
const warning = (content) => {
    createMsg(content, 'warning');
};
const info = (content) => {
    createMsg(content, 'info');
};

export default {
    success, // 成功提示
    error, // 错误
    warning, // 警告
    info, // 介绍
};
