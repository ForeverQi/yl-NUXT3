/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-wechat-bind-state";

        var apiDefinition = {
            api: "ss/studentmanagement/byid/info",
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
                return apiNameAndEnumConvert2(params, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "小优督学关注情况",
                    "description": "获取小优督学绑定状态",
                    "type": "object",

                    "properties": {
                        "userId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        }
                    },

                    "required": ["userId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "小优督学关注情况",
                    "description": "获取小优督学绑定状态",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["subscription", "attentionDate", "attention", "bindDate", "bind"],

                                "properties": {
                                    "subscription": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subscription",
                                        "@name": "subscription"
                                    },

                                    "attentionDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "attentionDate",
                                        "@name": "attentionDate"
                                    },

                                    "attention": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "attention",
                                        "@name": "attention"
                                    },

                                    "bindDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "bindDate",
                                        "@name": "bindDate"
                                    },

                                    "bind": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "bind",
                                        "@name": "bind"
                                    }
                                }
                            },

                            "@name": "data"
                        }
                    },

                    "required": ["data"]
                }, {
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:cc/query-wechat-bind-state";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-wechat-bind-state.options.js"
        ], function() {
            if (typeof defineModule === "function") {
                return defineModule.wrap4amdjs(pluginName, arguments, factory);
            } else {
                return factory(Array.prototype.map.call(arguments, function(r) {
                    return function() {
                        return r;
                    };
                }));
            }
        });
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:cc/query-wechat-bind-state$options=./api..query-wechat-bind-state.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
