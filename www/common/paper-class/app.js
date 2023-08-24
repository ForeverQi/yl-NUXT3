import Vue from 'vue';
const getGlobal = function () {
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof process !== 'undefined') {
        process.global = process.global || {};
        return process.global;
    }
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof GLOBAL !== 'undefined') {
        return GLOBAL;
    }
    throw new Error('unable to locate GLOBAL object');
};
let GLOBAL = getGlobal();
let app = GLOBAL.APP || {
    GLOBAL,
    initServices: false,
    loadServices: {},
    loadService(service, arr) {
        var args = [];
        for (var i = 0; i < arr.length - 1; i++) {
            var servkey = arr[i];
            var servobj = GLOBAL[servkey];
            if (servobj == null) {
                // console.warn(service+"服务初始化失败:"+servkey+"服务为null");
                return false;
            }
            args.push(servobj);
        }
        var ret = arr[arr.length - 1].apply(this, args);
        GLOBAL[service] = ret;

        app.loadServices[service] = null;
        // console.log(service+"服务初始化成功:success");
        return true;
    },
    /*创建服务*/
    factory(service, arr) {
        if (app.initServices == true) return;
        if (typeof arr == 'function') arr = [arr];
        app.loadServices[service] = arr;
    },
    filter(k, fn) {
        Vue.filter(k, fn);
    },
    loadDirectives: {},
    loadDirective(direc, arr) {
        var args = [];
        for (var i = 0; i < arr.length - 1; i++) {
            var servkey = arr[i];
            var servobj = GLOBAL[servkey];
            args.push(servobj);
        }
        var ret = arr[arr.length - 1].apply(this, args);
        Vue.directive(direc, ret);
        // console.log(direc+"指令初始化成功:success");
    },
    initDirectives: false,
    directive(direc, arr) {
        if (app.initDirectives == true) return;
        if (typeof obj == 'function') arr = [arr];
        if (app.initDirectives) {
            app.loadDirective(direc, arr);
            return;
        }
        app.loadDirectives[direc] = arr;
    },
};
GLOBAL.APP = app;

export default app;
