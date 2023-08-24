/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "xieyiqueren", apiAlias = "send-sms-verifycode";

        var apiDefinition = {
            api: "mc/msg/sms/verifycode/send",
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
                    "title": "发送短信验证码消息",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "smsPhone": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "smsPhone",
                            "@name": "smsPhone"
                        },

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
                            "required": true,
                            "default": "",
                            "@alias": "scene",
                            "@name": "scene"
                        }
                    },

                    "required": ["smsPhone", "scene"]
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
    var pluginName = "nl:xieyiqueren/send-sms-verifycode";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.MC0001.send-sms-verifycode.options.js"
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
            "nl:xieyiqueren/send-sms-verifycode$options=./api.MC0001.send-sms-verifycode.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();