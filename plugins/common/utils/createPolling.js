/**
 * 创建轮询
 * @param {Function} callback 回调函数
 * @param {Number} ms 间隔毫秒数
 * @param {Boolean} immediate 立即调用
 * @returns {Function} 用于取消轮询
 */
export default function createPolling(callback, ms = 5000, immediate = false) {
    if (typeof document !== 'undefined') {
        return;
    }
    if (typeof callback !== 'function') {
        throw new TypeError('callback is not a function');
    }
    let timer;
    try {
        immediate && callback();
        timer = setInterval(() => {
            callback();
        }, ms);
    } catch (error) {
        console.error(error);
    }
    return () => {
        timer && clearInterval(timer);
        timer = null;
    };
}
