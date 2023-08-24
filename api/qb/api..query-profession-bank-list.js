/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-profession-bank-list";

        var apiDefinition = {
            api: "qb/business/profession-bank/list/page",
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
                    "title": "题库首页-专项题库列表",
                    "description": "题库首页-专项题库列表",
                    "type": "object",

                    "properties": {
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

                        "classUniqueCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classUniqueCode",
                            "@name": "classUniqueCode"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "sourceId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceId",
                            "@name": "sourceId"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        },

                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        }
                    },

                    "required": [
                        "pageSize",
                        "pageIndex",
                        "classUniqueCode",
                        "subjectId",
                        "sourceId",
                        "sourceType",
                        "classId"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "题库首页-专项题库列表",
                    "description": "题库首页-专项题库列表",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "professionBankId",
                                    "professionBankName",
                                    "avlQuestionTotal",
                                    "answerTotal",
                                    "bankSeq"
                                ],

                                "properties": {
                                    "professionBankId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "professionBankId",
                                        "@name": "professionBankId"
                                    },

                                    "professionBankName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "professionBankName",
                                        "@name": "professionBankName"
                                    },

                                    "avlQuestionTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "avlQuestionTotal",
                                        "@name": "avlQuestionTotal"
                                    },

                                    "answerTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerTotal",
                                        "@name": "answerTotal"
                                    },

                                    "bankSeq": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "bankSeq",
                                        "@name": "bankSeq"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        },

                        "total": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "total",
                            "@name": "total"
                        },

                        "size": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "size",
                            "@name": "size"
                        },

                        "current": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "current",
                            "@name": "current"
                        }
                    },

                    "required": ["data", "total", "size", "current"]
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
    var pluginName = "nl:qb/query-profession-bank-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-profession-bank-list.options.js"
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
            "nl:qb/query-profession-bank-list$options=./api..query-profession-bank-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();