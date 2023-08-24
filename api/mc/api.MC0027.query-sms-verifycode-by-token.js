/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "public", apiAlias = "query-sms-verifycode-by-token";

        var apiDefinition = {
            api: "mc/msg/sms/verifycode/send/vx",
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
                    "title": "根据token发送短信验证码消息",
                    "description": "根据token发送短信验证码消息",
                    "type": "object",

                    "properties": {
                        "smstplNo": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "smstplNo",
                            "@name": "smstplNo"
                        },

                        "captcha": {
                            "type": "object",
                            "required": [],
                            "default": "",

                            "properties": {
                                "captchaToken": {
                                    "type": "string",
                                    "required": false,
                                    "default": "",
                                    "@alias": "captchaToken",
                                    "@name": "captchaToken"
                                },

                                "captchaScene": {
                                    "type": "string",
                                    "required": false,
                                    "default": "",
                                    "@alias": "captchaScene",
                                    "@name": "captchaScene"
                                },

                                "captchaValue": {
                                    "type": "string",
                                    "required": false,
                                    "default": "",
                                    "@alias": "captchaValue",
                                    "@name": "captchaValue"
                                }
                            },

                            "@alias": "captcha",
                            "@name": "captcha"
                        },

                        "scene": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "scene",
                            "@name": "scene"
                        }
                    },

                    "required": []
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
    var pluginName = "nl:public/query-sms-verifycode-by-token";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.MC0027.query-sms-verifycode-by-token.options.js"
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
            "nl:public/query-sms-verifycode-by-token$options=./api.MC0027.query-sms-verifycode-by-token.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();