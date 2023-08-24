/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-paper-question-list";

        var apiDefinition = {
            api: "qb/paperquestiondetail/question/list",
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
                    "title": "查询试卷主题题目明细列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "papersubjectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperSubjectId",
                            "@name": "papersubjectId"
                        },

                        "classUniquecode": {
                            "type": "string",
                            "required": false,
                            "@alias": "classUniqueCode",
                            "@name": "classUniquecode"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        },

                        "paperId": {
                            "type": "string",
                            "required": false,
                            "@alias": "paperId",
                            "@name": "paperId"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        },

                        "operationCheckstatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "operationCheckstatus",
                            "@name": "operationCheckstatus",

                            "@enums": [{
                                "type": "string",
                                "name": "verify",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "no-verify",
                                "value": "N"
                            }]
                        }
                    },

                    "required": ["papersubjectId", "sourceType", "operationCheckstatus"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询试卷主题题目明细列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "list": {
                            "type": "array",
                            "required": true,

                            "items": {
                                "type": "object",

                                "required": [
                                    "questionId",
                                    "title",
                                    "content",
                                    "paperQuestionDetailSeq",
                                    "paperQuestionDetailId",
                                    "collectStatus",
                                    "stemContent",
                                    "stemId",
                                    "detailScore",
                                    "collectId",
                                    "questionType",
                                    "audioId",
                                    "audioVid",
                                    "questioncategoryName",
                                    "questioncategoryId",
                                    "questionKeywords",
                                    "questionScoreWeight",
                                    "paperQuestionAverageScore",
                                    "paperQuestionLackAnswerScore",
                                    "paperQuestionDeductionScore",
                                    "paperquestionErroransweredstatus",
                                    "paperQuestionFillScore",
                                    "paperQuestionUnanswerScore",
                                    "questionAnswer"
                                ],

                                "properties": {
                                    "questionId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "questionId",
                                        "@name": "questionId"
                                    },

                                    "title": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "questionTitle",
                                        "@name": "title"
                                    },

                                    "content": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "questionContent",
                                        "@name": "content"
                                    },

                                    "paperQuestionDetailSeq": {
                                        "type": "number",
                                        "required": true,
                                        "@alias": "paperquestiondetailSeq",
                                        "@name": "paperQuestionDetailSeq"
                                    },

                                    "paperQuestionDetailId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "paperquestiondetailId",
                                        "@name": "paperQuestionDetailId"
                                    },

                                    "collectStatus": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "collectStatus",
                                        "@name": "collectStatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "Y",
                                            "value": "collect"
                                        }, {
                                            "type": "string",
                                            "name": "N",
                                            "value": "no-collect"
                                        }]
                                    },

                                    "stemContent": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "questionstemContent",
                                        "@name": "stemContent"
                                    },

                                    "stemId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "questionstemId",
                                        "@name": "stemId"
                                    },

                                    "detailScore": {
                                        "type": "number",
                                        "required": true,
                                        "@alias": "paperquestiondetailScore",
                                        "@name": "detailScore"
                                    },

                                    "collectId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "collectId",
                                        "@name": "collectId"
                                    },

                                    "questionType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionType",
                                        "@name": "questionType",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "S",
                                            "value": "radio"
                                        }, {
                                            "type": "string",
                                            "name": "M",
                                            "value": "checkbox"
                                        }, {
                                            "type": "string",
                                            "name": "J",
                                            "value": "judge"
                                        }, {
                                            "type": "string",
                                            "name": "F",
                                            "value": "fill"
                                        }, {
                                            "type": "string",
                                            "name": "O",
                                            "value": "opinion"
                                        }, {
                                            "type": "string",
                                            "name": "A",
                                            "value": "analysis"
                                        }, {
                                            "type": "string",
                                            "name": "I",
                                            "value": "random"
                                        }, {
                                            "type": "string",
                                            "name": "C",
                                            "value": "pwt"
                                        }, {
                                            "type": "string",
                                            "name": "BC",
                                            "value": "radio-fill"
                                        }, {
                                            "type": "string",
                                            "name": "CF",
                                            "value": "cloze-fill"
                                        }]
                                    },

                                    "audioId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "audioId",
                                        "@name": "audioId"
                                    },

                                    "audioVid": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "vid",
                                        "@name": "audioVid"
                                    },

                                    "questioncategoryName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questioncategoryName",
                                        "@name": "questioncategoryName"
                                    },

                                    "questioncategoryId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questioncategoryId",
                                        "@name": "questioncategoryId"
                                    },

                                    "questionKeywords": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionKeywords",
                                        "@name": "questionKeywords"
                                    },

                                    "questionScoreWeight": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionScoreweight",
                                        "@name": "questionScoreWeight"
                                    },

                                    "paperQuestionAverageScore": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperquestionAveragescore",
                                        "@name": "paperQuestionAverageScore"
                                    },

                                    "paperQuestionLackAnswerScore": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperquestionLackanswerscore",
                                        "@name": "paperQuestionLackAnswerScore"
                                    },

                                    "paperQuestionDeductionScore": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperquestionDeductionscore",
                                        "@name": "paperQuestionDeductionScore"
                                    },

                                    "paperquestionErroransweredstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperquestionErroransweredstatus",
                                        "@name": "paperquestionErroransweredstatus",

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

                                    "paperQuestionFillScore": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperquestionFillscore",
                                        "@name": "paperQuestionFillScore"
                                    },

                                    "paperQuestionUnanswerScore": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperquestionUnanswerscore",
                                        "@name": "paperQuestionUnanswerScore"
                                    },

                                    "questionAnswer": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionAnswer",
                                        "@name": "questionAnswer"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "list"
                        }
                    },

                    "required": ["list"]
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
    var pluginName = "nl:qb/query-paper-question-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB0007.query-paper-question-list.options.js"
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
            "nl:qb/query-paper-question-list$options=./api.QB0007.query-paper-question-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();