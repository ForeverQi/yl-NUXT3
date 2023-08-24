/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "ta", apiAlias = "applet-url";

        var apiDefinition = {
            api: "ta/applet/url/link/add",
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
                    "title": "获取跳转小程序链接",
                    "description": "获取小程序外部跳转链接",
                    "type": "object",

                    "properties": {
                        "appid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "appId",
                            "@name": "appid"
                        },

                        "is_expire": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "isExpire",
                            "@name": "is_expire",

                            "@enums": [{
                                "type": "string",
                                "name": "yes",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "no",
                                "value": "N"
                            }]
                        },

                        "expire_time": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "expireTime",
                            "@name": "expire_time"
                        },

                        "path": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "path",
                            "@name": "path"
                        },

                        "query": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "query",
                            "@name": "query"
                        }
                    },

                    "required": ["appid", "path", "query"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取跳转小程序链接",
                    "description": "获取小程序外部跳转链接",
                    "type": "object",

                    "properties": {
                        "openLink": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "openlink",
                            "@name": "openLink"
                        }
                    },

                    "required": ["openLink"]
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
    var pluginName = "nl:ta/applet-url";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.TA1027.applet-url.options.js"
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
            "nl:ta/applet-url$options=./api.TA1027.applet-url.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();