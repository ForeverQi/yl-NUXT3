/* eslint-disable */


(function() {
    var factory = function(getters) {
        return {
            simulateRequestValidator: {}
        };
    };

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:mcp/query-liveCourse-web-detail$options";

    if (typeof define === "function") {
        define([], function() {
            var v = factory(Array.prototype.map.call(arguments, function(r) {
                return function() {
                    return r;
                };
            }));

            if (typeof defineModule === "function") defineModule(pluginName, [], function() {
                return v;
            });

            return v;
        });
    } else if (typeof defineModule === "function") defineModule(pluginName, [], factory, defineModule.isEnvNode() ? {
        module: module
    } : null);
})();