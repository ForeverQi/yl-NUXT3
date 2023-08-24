/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qa", apiAlias = "add-user-cp";

        var apiDefinition = {
            api: "ws/cp/user/add",
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
                    "title": "用户端投诉",
                    "description": "用户端投诉",
                    "type": "object",

                    "properties": {
                        "content": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "content",
                            "@name": "content"
                        },

                        "picUrls": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "picUrls",
                            "@name": "picUrls"
                        },

                        "mobile": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "mobile",
                            "@name": "mobile"
                        },

                        "realName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "realName",
                            "@name": "realName"
                        },

                        "verify": {
                            "type": "object",
                            "required": ["verifyPhone", "verifyValue", "verifyScene"],
                            "default": "",

                            "properties": {
                                "verifyPhone": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "verifyPhone",
                                    "@name": "verifyPhone"
                                },

                                "verifyValue": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "verifyValue",
                                    "@name": "verifyValue"
                                },

                                "verifyScene": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "verifyScene",
                                    "@name": "verifyScene"
                                },

                                "verifyToken": {
                                    "type": "string",
                                    "required": false,
                                    "default": "",
                                    "@alias": "verifyToken",
                                    "@name": "verifyToken"
                                }
                            },

                            "@alias": "verify",
                            "@name": "verify"
                        }
                    },

                    "required": ["content", "mobile", "realName", "verify"]
                });
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:qa/add-user-cp";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.WS1001.add-user-cp.options.js"
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
            "nl:qa/add-user-cp$options=./api.WS1001.add-user-cp.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();