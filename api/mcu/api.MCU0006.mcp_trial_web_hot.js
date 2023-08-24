/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "experience", apiAlias = "mcp_trial_web_hot";

        var apiDefinition = {
            api: "mcp/trial/web/hot",
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
                    "title": "热推好课列表",
                    "description": "热推好课列表",
                    "type": "object",

                    "properties": {
                        "clientType": {
                            "type": "string",
                            "required": true,
                            "@alias": "clientType",
                            "@name": "clientType"
                        },

                        "discountType": {
                            "type": "string",
                            "required": false,
                            "@alias": "discountType",
                            "@name": "discountType"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": true,
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": true,
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "saleTagId": {
                            "type": "string",
                            "required": false,
                            "@alias": "saleTagId",
                            "@name": "saleTagId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": false,
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        }
                    },

                    "required": ["clientType", "pageIndex", "pageSize", "projectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "热推好课列表",
                    "description": "热推好课列表",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "number",
                            "required": true,
                            "@alias": "count",
                            "@name": "count"
                        },

                        "data": {
                            "type": "array",
                            "required": true,

                            "items": {
                                "type": "object",
                                "required": [],

                                "properties": {
                                    "courseName": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "courseName",
                                        "@name": "courseName"
                                    },

                                    "saleTagName": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "saleTagName",
                                        "@name": "saleTagName"
                                    },

                                    "coursePromotiontype": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "coursePromotiontype",
                                        "@name": "coursePromotiontype"
                                    },

                                    "coursePromotionendtime": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "coursePromotionendtime",
                                        "@name": "coursePromotionendtime"
                                    },

                                    "coursePicpath": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "coursePicpath",
                                        "@name": "coursePicpath"
                                    },

                                    "coursePromotionprice": {
                                        "type": "number",
                                        "required": false,
                                        "@alias": "coursePromotionprice",
                                        "@name": "coursePromotionprice"
                                    },

                                    "coursewareCount": {
                                        "type": "number",
                                        "required": false,
                                        "@alias": "coursewareCount",
                                        "@name": "coursewareCount"
                                    },

                                    "coursePrice": {
                                        "type": "number",
                                        "required": false,
                                        "@alias": "coursePrice",
                                        "@name": "coursePrice"
                                    },

                                    "goodsId": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "goodsId",
                                        "@name": "goodsId"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["count", "data"]
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

    var pluginName = "nl:experience/mcp_trial_web_hot";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU0006.mcp_trial_web_hot.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:experience/mcp_trial_web_hot$options=./api.MCU0006.mcp_trial_web_hot.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();