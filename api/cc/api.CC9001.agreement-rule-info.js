/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "agreement-rule-info";

        var apiDefinition = {
            api: "cc/course/agreement/rule/info",
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
                    "title": "[直播] 获取看课协议规则配置信息",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "@alias": "classId",
                            "@name": "classId"
                        }
                    },

                    "required": ["classId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "[直播] 获取看课协议规则配置信息",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "courseAgreementRuleId": {
                            "type": "string",
                            "required": true,
                            "@alias": "courseAgreementRuleId",
                            "@name": "courseAgreementRuleId"
                        },

                        "agreeStatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "agreeStatus",
                            "@name": "agreeStatus"
                        },

                        "lookClient": {
                            "type": "string",
                            "required": true,
                            "@alias": "lookClient",
                            "@name": "lookClient"
                        },

                        "cameraStatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "cameraStatus",
                            "@name": "cameraStatus"
                        },

                        "agreementContent": {
                            "type": "string",
                            "required": true,
                            "@alias": "agreementContent",
                            "@name": "agreementContent"
                        },

                        "isSignStatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "isSignStatus",
                            "@name": "isSignStatus"
                        }
                    },

                    "required": [
                        "courseAgreementRuleId",
                        "agreeStatus",
                        "lookClient",
                        "cameraStatus",
                        "agreementContent",
                        "isSignStatus"
                    ]
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
    var pluginName = "nl:cc/agreement-rule-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CC9001.agreement-rule-info.options.js"
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
            "nl:cc/agreement-rule-info$options=./api.CC9001.agreement-rule-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();