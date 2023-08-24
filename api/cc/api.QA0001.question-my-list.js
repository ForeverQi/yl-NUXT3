/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "question-my-list";

        var apiDefinition = {
            api: "qa/web/question/my/list",
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
                    "title": "获取我的问题分页列表",
                    "description": "获取我的问题分页列表",
                    "type": "object",

                    "properties": {
                        "pageIndex": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": ["pageIndex", "pageSize", "projectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取我的问题分页列表",
                    "description": "获取我的问题分页列表",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        },

                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "questionId",
                                    "subjectName",
                                    "questionTypeName",
                                    "questionStatus",
                                    "questionStatusName",
                                    "questionCreatedDate",
                                    "questionContent",
                                    "isDissatisfaction",
                                    "questionEvaluateStatus"
                                ],

                                "properties": {
                                    "questionId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionId",
                                        "@name": "questionId"
                                    },

                                    "subjectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectName",
                                        "@name": "subjectName"
                                    },

                                    "questionTypeName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTypeName",
                                        "@name": "questionTypeName"
                                    },

                                    "questionStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionStatus",
                                        "@name": "questionStatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "AW",
                                            "value": "AW"
                                        }, {
                                            "type": "string",
                                            "name": "AG",
                                            "value": "AG"
                                        }, {
                                            "type": "string",
                                            "name": "AD",
                                            "value": "AD"
                                        }, {
                                            "type": "string",
                                            "name": "F",
                                            "value": "F"
                                        }, {
                                            "type": "string",
                                            "name": "D:",
                                            "value": "D"
                                        }, {
                                            "type": "string",
                                            "name": "QC",
                                            "value": "QC"
                                        }]
                                    },

                                    "questionStatusName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionStatusName",
                                        "@name": "questionStatusName"
                                    },

                                    "questionCreatedDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionCreatedDate",
                                        "@name": "questionCreatedDate"
                                    },

                                    "questionContent": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionContent",
                                        "@name": "questionContent"
                                    },

                                    "isDissatisfaction": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "isDissatisfaction",
                                        "@name": "isDissatisfaction",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "Y",
                                            "value": "Y"
                                        }, {
                                            "type": "string",
                                            "name": "N",
                                            "value": "N"
                                        }]
                                    },

                                    "questionEvaluateStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionEvaluateStatus",
                                        "@name": "questionEvaluateStatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "NE",
                                            "value": "NE"
                                        }, {
                                            "type": "string",
                                            "name": "VS",
                                            "value": "VS"
                                        }, {
                                            "type": "string",
                                            "name": "S",
                                            "value": "S"
                                        }, {
                                            "type": "string",
                                            "name": "NS",
                                            "value": "NS"
                                        }]
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:cc/question-my-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QA0001.question-my-list.options.js"
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
            "nl:cc/question-my-list$options=./api.QA0001.question-my-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();