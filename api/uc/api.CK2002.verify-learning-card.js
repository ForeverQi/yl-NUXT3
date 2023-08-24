/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "verify-learning-card";

        var apiDefinition = {
            api: "ck/learncard/verify",
            apiModuleName: moduleName,
            apiAlias: apiAlias,

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
                    "title": "学习卡开卡有效性验证",
                    "description": "使用此接口的页面：\n1.学习卡开课；\n2.图书赠课",
                    "type": "object",

                    "properties": {
                        "lcNo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "lcNo",
                            "@name": "lcNo"
                        },

                        "lcPassword": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "lcPassword",
                            "@name": "lcPassword"
                        }
                    },

                    "required": ["lcNo", "lcPassword"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "学习卡开卡有效性验证",
                    "description": "使用此接口的页面：\n1.学习卡开课；\n2.图书赠课",
                    "type": "object",

                    "properties": {
                        "lcId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "lcId",
                            "@name": "lcId"
                        },

                        "lcgId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "lcgId",
                            "@name": "lcgId"
                        }
                    },

                    "required": ["lcId", "lcgId"]
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

    var pluginName = "nl:uc/verify-learning-card";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.CK2002.verify-learning-card.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/verify-learning-card$options=./api.CK2002.verify-learning-card.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();