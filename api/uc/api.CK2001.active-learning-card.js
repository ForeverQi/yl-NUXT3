/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "active-learning-card";

        var apiDefinition = {
            api: "ck/learncard/active",
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
                    "title": "学习卡激活",
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
                        },

                        "classesIds": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "classesIds",
                            "@name": "classesIds"
                        },

                        "extension": {
                            "type": "object",
                            "required": [],
                            "default": "",
                            "properties": {},
                            "@alias": "extension",
                            "@name": "extension"
                        }
                    },

                    "required": ["lcNo", "lcPassword"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "学习卡激活",
                    "description": "使用此接口的页面：\n1.学习卡开课；\n2.图书赠课",
                    "type": "object",

                    "properties": {
                        "bindingResultList": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "bindingResultList",
                            "@name": "bindingResultList"
                        },

                        "imgPath": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "imgPath",
                            "@name": "imgPath"
                        },

                        "projectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectName",
                            "@name": "projectName"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": ["bindingResultList", "imgPath", "projectName", "projectId"]
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

    var pluginName = "nl:uc/active-learning-card";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.CK2001.active-learning-card.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/active-learning-card$options=./api.CK2001.active-learning-card.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();