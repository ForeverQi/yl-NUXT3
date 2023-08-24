const errorApiHandler = {
    urlMap: {
        'cp/info/article/detail': {
            check: true,
            tip: '资讯详情不存在',
        },
        'mcp/trial/web/detail': {
            check: true,
            tip: '体验课详情不存在',
        },
        'mcp/liveCourse/web/detail': {
            check: true,
            tip: '公开课详情不存在',
        },
        'ctc/classtype/lessoninfo': {
            check: true,
            tip: '系统课详情不存在',
        },
        'dc/doc/preview': {
            check: true,
            tip: '资料详情不存在',
        },
        'dc/doc/user/pack/info': {
            check: true,
            tip: '资料包不存在',
        },
    },
    /**
     *
     * @param {string} api 带验证的api接口地址
     * @returns {object} 返回接口验证结果
     */
    doHandler(api) {
        if (typeof this.urlMap[api] === 'undefined') {
            return {
                check: false,
                tip: '',
            };
        }

        return this.urlMap[api];
    },
};
/**
 * 获取当前时间
 *
 * @returns {string} 时间字符串
 */
function getTime() {
    var time = new Date();
    // var year = time.getFullYear();
    var month = '0' + String(time.getMonth() + 1);
    month = month.substring(month.length - 2);
    var date = '0' + String(time.getDate());
    date = date.substring(date.length - 2);
    var hours = '0' + String(time.getHours());
    hours = hours.substring(hours.length - 2);
    var minutes = '0' + String(time.getMinutes());
    minutes = minutes.substring(minutes.length - 2);
    var seconds = '0' + String(time.getSeconds());
    seconds = seconds.substring(seconds.length - 2);
    var milliseconds = '00' + String(time.getMilliseconds());
    milliseconds = milliseconds.substring(milliseconds.length - 3);

    return month + date + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}
export default (request) => {
    const api = request.api;
    // console.log(`${getTime()}[SSRAPIEerrorHandler]`, JSON.stringify(request, null, 2));
    const result = errorApiHandler.doHandler(api);
    if (result.check === true && process.server) {
        console.log(`${getTime()}[SSRAPIEerrorHandler]`, JSON.stringify(request, null, 2));
    }
    return errorApiHandler.doHandler(api);
};
