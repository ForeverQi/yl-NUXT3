import Vue from 'vue';

import CupertinoMessageBox from './CupertinoMessageBox/index.vue';

const CupertinoMessageBoxCtor = Vue.extend(CupertinoMessageBox);
let instance;
/**
 *
 * @param {Object} options
 */
function MessageBox(options) {
    instance = new CupertinoMessageBoxCtor({ propsData: options }).$mount();
    document.body.appendChild(instance.$el);
    return instance
        .show()
        .then((res) => {
            instance = null;
            return Promise.resolve(res);
        })
        .catch((err) => {
            instance = null;
            return Promise.reject(err);
        });
}

MessageBox.confirm = function (options) {
    return MessageBox(options);
};

Vue.prototype.$IOSConfirm = MessageBox.confirm;
