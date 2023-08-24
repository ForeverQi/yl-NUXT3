/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-business-paper-training_list";

        var apiDefinition = {
            api: "qb/business/paper/training_list",
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
                    "title": "试卷列表（地区专练）",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "paperType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "paperType",
                            "@name": "paperType"
                        },

                        "classUniqueCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classUniqueCode",
                            "@name": "classUniqueCode"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "ctype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ctype",
                            "@name": "ctype"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "paperAreaCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "paperAreaCode",
                            "@name": "paperAreaCode"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        }
                    },

                    "required": ["paperType", "classUniqueCode", "ctype", "paperAreaCode", "sourceType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "试卷列表（地区专练）",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "paperList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "paperId",
                                    "paperName",
                                    "subjectId",
                                    "examDuration",
                                    "paperScoreTotal",
                                    "paperScoreTotal",
                                    "questionTotal",
                                    "paperSummary"
                                ],

                                "properties": {
                                    "paperId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperId",
                                        "@name": "paperId"
                                    },

                                    "paperName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperName",
                                        "@name": "paperName"
                                    },

                                    "subjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectId",
                                        "@name": "subjectId"
                                    },

                                    "examDuration": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "examDuration",
                                        "@name": "examDuration"
                                    },

                                    "paperScoreTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperScoreTotal",
                                        "@name": "paperScoreTotal"
                                    },

                                    "questionTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTotal",
                                        "@name": "questionTotal"
                                    },

                                    "paperSummary": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperSummary",
                                        "@name": "paperSummary"
                                    }
                                }
                            },

                            "@alias": "paperList",
                            "@name": "paperList"
                        }
                    },

                    "required": ["paperList"]
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
    var pluginName = "nl:qb/query-business-paper-training_list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-business-paper-training_list.options.js"
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
            "nl:qb/query-business-paper-training_list$options=./api..query-business-paper-training_list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();