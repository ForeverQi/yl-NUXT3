/*
 * @Author: Li
 * @Date: 2022-03-09 11:48:50
 * @LastEditors: Li
 * @LastEditTime: 2022-03-14 14:49:24
 * @Description:
 */
/* eslint-disable */


(function() {
    var factory = function(getters) {
        return {
            simulateRequestValidator: {},
        };
    };
    
    var pluginName = "nl:experience/mcp_trial_web_detail$options";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js"], function(defineModule) {
            return defineModule.wrap4amdjs(pluginName, arguments, factory);
        });
    } else if (typeof defineModule === "function") defineModule(pluginName, [], factory, defineModule.isEnvNode() ? {
        module: module
    } : null);
})();