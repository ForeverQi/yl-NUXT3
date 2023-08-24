/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "mcp", apiAlias = "query-trial-list";

        var apiDefinition = {
            api: "mcp/trialWeb/web/trialPageList",
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
                    "title": "体验课模块列表",
                    "description": "体验课栏目体验课列表",
                    "type": "object",

                    "properties": {
                        "projectId": {
                            "type": "string",
                            "required": false,
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "discountType": {
                            "type": "string",
                            "required": false,
                            "@alias": "discountType",
                            "@name": "discountType"
                        },

                        "courseOpenstatus": {
                            "type": "string",
                            "required": false,
                            "@alias": "courseOpenstatus",
                            "@name": "courseOpenstatus"
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
                        },

                        "clientType": {
                            "type": "string",
                            "required": false,
                            "@alias": "clientType",
                            "@name": "clientType"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "collegeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "collegeId",
                            "@name": "collegeId"
                        },

                        "projectType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectType",
                            "@name": "projectType",

                            "@enums": [{
                                "type": "string",
                                "name": "child",
                                "value": "T"
                            }, {
                                "type": "string",
                                "name": "parent",
                                "value": "P"
                            }]
                        }
                    },

                    "required": ["pageSize", "pageIndex", "collegeId", "projectType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "体验课模块列表",
                    "description": "体验课栏目体验课列表",
                    "type": "object",

                    "properties": {
                        "list": {
                            "type": "array",
                            "required": false,

                            "items": {
                                "type": "object",

                                "required": [
                                    "goodsName",
                                    "saleTagName",
                                    "coursePromotiontype",
                                    "coursePromotionendtime",
                                    "coursePromotionstarttime",
                                    "coursePicpath",
                                    "coursePromotionprice",
                                    "coursewareCount",
                                    "coursePrice",
                                    "goodsId",
                                    "projectShortname",
                                    "realTimePromotionType",
                                    "currentTime",
                                    "courseBright"
                                ],

                                "properties": {
                                    "goodsName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsName",
                                        "@name": "goodsName"
                                    },

                                    "saleTagName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "saleTagName",
                                        "@name": "saleTagName"
                                    },

                                    "coursePromotiontype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePromotiontype",
                                        "@name": "coursePromotiontype"
                                    },

                                    "coursePromotionendtime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePromotionendtime",
                                        "@name": "coursePromotionendtime"
                                    },

                                    "coursePromotionstarttime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePromotionstarttime",
                                        "@name": "coursePromotionstarttime"
                                    },

                                    "coursePicpath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePicpath",
                                        "@name": "coursePicpath"
                                    },

                                    "coursePromotionprice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePromotionprice",
                                        "@name": "coursePromotionprice"
                                    },

                                    "coursewareCount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareCount",
                                        "@name": "coursewareCount"
                                    },

                                    "coursePrice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePrice",
                                        "@name": "coursePrice"
                                    },

                                    "goodsId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsId",
                                        "@name": "goodsId"
                                    },

                                    "projectShortname": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectShortname",
                                        "@name": "projectShortname"
                                    },

                                    "realTimePromotionType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "realTimePromotionType",
                                        "@name": "realTimePromotionType"
                                    },

                                    "currentTime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "currentTime",
                                        "@name": "currentTime"
                                    },

                                    "courseBright": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseBright",
                                        "@name": "courseBright"
                                    }
                                }
                            },

                            "@alias": "list",
                            "@name": "list"
                        },

                        "total": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "total",
                            "@name": "total"
                        }
                    },

                    "required": []
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
    var pluginName = "nl:mcp/query-trial-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.MCP0001.query-trial-list.options.js"
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
            "nl:mcp/query-trial-list$options=./api.MCP0001.query-trial-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();