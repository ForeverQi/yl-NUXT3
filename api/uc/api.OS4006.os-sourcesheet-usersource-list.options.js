/* eslint-disable */


(function() {
    var factory = function(getters) {
        return {
            simulateRequestValidator: {}
        };
    };

    var pluginName = "nl:uc/os-sourcesheet-usersource-list$options";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js"], function(defineModule) {
            return defineModule.wrap4amdjs(pluginName, arguments, factory);
        });
    } else if (typeof defineModule === "function") defineModule(pluginName, [], factory, defineModule.isEnvNode() ? {
        module: module
    } : null);
})();