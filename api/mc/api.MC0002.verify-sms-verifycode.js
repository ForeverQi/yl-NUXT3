/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "xieyiqueren", apiAlias = "verify-sms-verifycode";

        var apiDefinition = {
            api: "mc/msg/sms/verifycode/verify",
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
                    "title": "验证短信验证码",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "verifyPhone": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "verifyPhone",
                            "@name": "verifyPhone"
                        },

                        "verifyScene": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "verifyScene",
                            "@name": "verifyScene"
                        },

                        "verifyValue": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "verifyValue",
                            "@name": "verifyValue"
                        }
                    },

                    "required": ["verifyPhone", "verifyScene", "verifyValue"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "验证短信验证码",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "verifyToken": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "verifyToken",
                            "@name": "verifyToken"
                        }
                    },

                    "required": ["verifyToken"]
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
    var pluginName = "nl:xieyiqueren/verify-sms-verifycode";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.MC0002.verify-sms-verifycode.options.js"
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
            "nl:xieyiqueren/verify-sms-verifycode$options=./api.MC0002.verify-sms-verifycode.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();