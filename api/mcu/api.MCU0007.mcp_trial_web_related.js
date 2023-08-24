/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "experience", apiAlias = "mcp_trial_web_related";

        var apiDefinition = {
            api: "mcp/trial/web/related",
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
                    "title": "相关课程列表",
                    "description": "相关课程列表",
                    "type": "object",

                    "properties": {
                        "clientType": {
                            "type": "string",
                            "required": true,
                            "@alias": "clientType",
                            "@name": "clientType"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        }
                    },

                    "required": ["clientType", "projectId", "subjectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "相关课程列表",
                    "description": "相关课程列表",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "goodsId",
                            "goodsName",
                            "goodsCover",
                            "coursePromotionprice",
                            "coursePrice",
                            "coursewareCount",
                            "saleTagName",
                            "coursePromotionendtime",
                            "coursePromotiontcoursePromotiontypeype"
                        ],

                        "properties": {
                            "goodsId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "goodsId",
                                "@name": "goodsId"
                            },

                            "goodsName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "goodsName",
                                "@name": "goodsName"
                            },

                            "goodsCover": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "goodsCover",
                                "@name": "goodsCover"
                            },

                            "coursePromotionprice": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "coursePromotionprice",
                                "@name": "coursePromotionprice"
                            },

                            "coursePrice": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "coursePrice",
                                "@name": "coursePrice"
                            },

                            "coursewareCount": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareCount",
                                "@name": "coursewareCount"
                            },

                            "saleTagName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "saleTagName",
                                "@name": "saleTagName"
                            },

                            "coursePromotionendtime": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePromotionendtime",
                                "@name": "coursePromotionendtime"
                            },

                            "coursePromotiontcoursePromotiontypeype": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursePromotiontype",
                                "@name": "coursePromotiontcoursePromotiontypeype"
                            }
                        }
                    }
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

    var pluginName = "nl:experience/mcp_trial_web_related";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU0007.mcp_trial_web_related.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:experience/mcp_trial_web_related$options=./api.MCU0007.mcp_trial_web_related.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();