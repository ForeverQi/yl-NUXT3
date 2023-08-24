/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qa", apiAlias = "query-question-courseware-info-list";

        var apiDefinition = {
            api: "qa/web/question/courseware/info/list",
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
                    "title": "获取学员课件问题（包含答案）列表",
                    "description": "获取学员课件问题（包含答案）列表",
                    "type": "object",

                    "properties": {
                        "courseId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseId",
                            "@name": "courseId"
                        },

                        "courseWareId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseWareId",
                            "@name": "courseWareId"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "pageIndex": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        }
                    },

                    "required": ["courseId", "courseWareId", "pageSize", "pageIndex"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取学员课件问题（包含答案）列表",
                    "description": "获取学员课件问题（包含答案）列表",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "string",
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
                                    "userAvatar",
                                    "questionCreateName",
                                    "questionCreatedDate",
                                    "questionContent",
                                    "questionStatus",
                                    "questionFilePath",
                                    "questionStatusName",
                                    "isHaveAnswer",
                                    "answerId",
                                    "answerCreatedDate",
                                    "answerCreateName",
                                    "answerContent",
                                    "answerFilePath"
                                ],

                                "properties": {
                                    "questionId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionId",
                                        "@name": "questionId"
                                    },

                                    "userAvatar": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "userAvatar",
                                        "@name": "userAvatar"
                                    },

                                    "questionCreateName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionCreateName",
                                        "@name": "questionCreateName"
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

                                    "questionStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionStatus",
                                        "@name": "questionStatus"
                                    },

                                    "questionFilePath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionFilePath",
                                        "@name": "questionFilePath"
                                    },

                                    "questionStatusName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionStatusName",
                                        "@name": "questionStatusName"
                                    },

                                    "isHaveAnswer": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "isHaveAnswer",
                                        "@name": "isHaveAnswer",

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

                                    "answerId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerId",
                                        "@name": "answerId"
                                    },

                                    "answerCreatedDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerCreatedDate",
                                        "@name": "answerCreatedDate"
                                    },

                                    "answerCreateName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerCreateName",
                                        "@name": "answerCreateName"
                                    },

                                    "answerContent": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerContent",
                                        "@name": "answerContent"
                                    },

                                    "answerFilePath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerFilePath",
                                        "@name": "answerFilePath"
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
    var pluginName = "nl:qa/query-question-courseware-info-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QA0010.query-question-courseware-info-list.options.js"
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
            "nl:qa/query-question-courseware-info-list$options=./api.QA0010.query-question-courseware-info-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();