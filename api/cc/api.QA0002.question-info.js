/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "question-info";

        var apiDefinition = {
            api: "qa/web/question/info",
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
                    "title": "获取一个问题详情（包括答案，追问）",
                    "description": "获取一个问题详情（包括答案，追问）",
                    "type": "object",

                    "properties": {
                        "questionId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionId",
                            "@name": "questionId"
                        }
                    },

                    "required": ["questionId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取一个问题详情（包括答案，追问）",
                    "description": "获取一个问题详情（包括答案，追问）",
                    "type": "object",

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

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "questionTypeName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionTypeName",
                            "@name": "questionTypeName"
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
                        },

                        "questionEvaluateStatusName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionEvaluateStatusName",
                            "@name": "questionEvaluateStatusName"
                        },

                        "evaluationStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "evaluationStatus",
                            "@name": "evaluationStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "WQ",
                                "value": "WQ"
                            }, {
                                "type": "string",
                                "name": "AW",
                                "value": "AW"
                            }, {
                                "type": "string",
                                "name": "BA",
                                "value": "BA"
                            }]
                        },

                        "evaluationStatusName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "evaluationStatusName",
                            "@name": "evaluationStatusName"
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
                                "name": "D",
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

                        "questionFilePath": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionFilePath",
                            "@name": "questionFilePath"
                        },

                        "questionCloseStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionCloseStatus",
                            "@name": "questionCloseStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "QCS",
                                "value": "QCS"
                            }, {
                                "type": "string",
                                "name": "QCR",
                                "value": "QCR"
                            }, {
                                "type": "string",
                                "name": "QCT",
                                "value": "QCT"
                            }]
                        },

                        "unHandleTypeName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "unHandleTypeName",
                            "@name": "unHandleTypeName"
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

                        "evaluationCheckStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "evaluationCheckStatus",
                            "@name": "evaluationCheckStatus"
                        },

                        "checkDescription": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "checkDescription",
                            "@name": "checkDescription"
                        },

                        "evaluationCheckExplain": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "evaluationCheckExplain",
                            "@name": "evaluationCheckExplain"
                        },

                        "closeShowContent": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "closeShowContent",
                            "@name": "closeShowContent"
                        },

                        "courseWareOnlineUrl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseWareOnlineUrl",
                            "@name": "courseWareOnlineUrl"
                        },

                        "courseWareName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseWareName",
                            "@name": "courseWareName"
                        },

                        "answerList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "answerId",
                                    "answerCreateddate",
                                    "answerContent",
                                    "answerFilepath",
                                    "answerCommentList"
                                ],

                                "properties": {
                                    "answerId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerId",
                                        "@name": "answerId"
                                    },

                                    "answerCreateddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerCreateddate",
                                        "@name": "answerCreateddate"
                                    },

                                    "answerContent": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerContent",
                                        "@name": "answerContent"
                                    },

                                    "answerFilepath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerFilepath",
                                        "@name": "answerFilepath"
                                    },

                                    "answerCommentList": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",

                                            "required": [
                                                "answercommentId",
                                                "answercommentCreateddate",
                                                "answercommentFilepath",
                                                "answercommentContent"
                                            ],

                                            "properties": {
                                                "answercommentId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "answercommentId",
                                                    "@name": "answercommentId"
                                                },

                                                "answercommentCreateddate": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "answercommentCreateddate",
                                                    "@name": "answercommentCreateddate"
                                                },

                                                "answercommentFilepath": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "answercommentFilepath",
                                                    "@name": "answercommentFilepath"
                                                },

                                                "answercommentContent": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "answercommentContent",
                                                    "@name": "answercommentContent"
                                                }
                                            }
                                        },

                                        "@alias": "answerCommentList",
                                        "@name": "answerCommentList"
                                    }
                                }
                            },

                            "@alias": "answerList",
                            "@name": "answerList"
                        }
                    },

                    "required": [
                        "questionId",
                        "subjectName",
                        "subjectId",
                        "projectId",
                        "questionTypeName",
                        "questionCreatedDate",
                        "questionContent",
                        "questionEvaluateStatus",
                        "questionEvaluateStatusName",
                        "evaluationStatus",
                        "evaluationStatusName",
                        "questionStatus",
                        "questionStatusName",
                        "questionFilePath",
                        "questionCloseStatus",
                        "unHandleTypeName",
                        "isDissatisfaction",
                        "evaluationCheckStatus",
                        "checkDescription",
                        "evaluationCheckExplain",
                        "closeShowContent",
                        "courseWareOnlineUrl",
                        "courseWareName",
                        "answerList"
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
    var pluginName = "nl:cc/question-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QA0002.question-info.options.js"
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
            "nl:cc/question-info$options=./api.QA0002.question-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();