/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "home", apiAlias = "home-level-page";

        var apiDefinition = {
            api: "mcp/nav/customPage/course/list",
            method: "POST",
            apiAlias: apiAlias,
            apiModuleName: moduleName,

            requestHeadersNameAndEnumMapMethod: function(api, headers) {
                return apiNameAndEnumConvert2(headers, undefined);
            },

            requestQueriesNameAndEnumMapMethod: function(api, queries) {
                return apiNameAndEnumConvert2(queries, undefined);
            },

            requestParamsNameAndEnumMapMethod: function(api, params) {
                return apiNameAndEnumConvert2(params, undefined);
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, undefined, {
                    "redundancy": true
                });
            }
        };

        if (null != apiOptions) {
            for (var p in apiOptions) {
                apiDefinition[p] = apiOptions[p];
            }

            api.defineApi(apiDefinition);
        }

        return function(ops) {
            APIModule.ofName(moduleName).callApi(apiAlias, ops);
        };
    };

    var pluginName = "nl:home/home-level-page";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.mcu-08.home-level-page.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:home/home-level-page$options=./api.mcu-08.home-level-page.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();