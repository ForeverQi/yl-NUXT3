import Vue from 'vue';
const eventRaw = new Vue();
let id = 0;
/**
 * 事件处理类
 */
function Event() {
    this.prefix = 'event-' + id++ + '-' + Date.now();
    this.eventList = [];
}

/**
 * 获取事件名
 *
 * @param {object} name 事件名称
 * @returns {string} string
 */
Event.prototype.getName = function (name) {
    const eventName = `${this.prefix}-${name}`;
    this.eventList.push(eventName);
    return eventName;
};

/**
 * 监听事件
 *
 * @param {string} name name
 * @param {Function} callback  callback
 */
Event.prototype.$on = function (name, callback) {
    eventRaw.$on(this.getName(name), callback);
};

/**
 * 监听一次性事件
 *
 * @param {string} name name
 * @param {Function} callback callback
 */
Event.prototype.$once = function (name, callback) {
    eventRaw.$once(this.getName(name), callback);
};

/**
 * 触发监听事件
 *
 * @param {string} name name
 * @param {object} args args
 */
Event.prototype.$emit = function (name, args) {
    eventRaw.$emit(this.getName(name), args);
};

/**
 * 移除监听事件
 *
 * @param {string} name name
 * @param {Function} callback callback
 */
Event.prototype.$off = function (name, callback) {
    if (name) {
        eventRaw.$off(this.getName(name), args);
    } else {
        this.eventList.forEach((name) => eventRaw.$off(this.getName(name), args));
    }
};

export default Event;
