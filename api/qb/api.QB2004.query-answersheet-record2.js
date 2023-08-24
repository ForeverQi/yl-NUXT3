/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-answersheet-record2";

        var apiDefinition = {
            api: "qb/answersheet/brief",
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
                    "title": "查询答题卡记录-标准接口",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "answersheetId": {
                            "type": "string",
                            "required": true,
                            "@alias": "answersheetId",
                            "@name": "answersheetId"
                        },

                        "answersheetdetailDecidestatus": {
                            "type": "string",
                            "required": false,
                            "@alias": "answersheetDetailDecideStatus",
                            "@name": "answersheetdetailDecidestatus",

                            "@enums": [{
                                "type": "string",
                                "name": "wrong",
                                "value": "N"
                            }, {
                                "type": "string",
                                "name": "wrong-and-nodone",
                                "value": "NW"
                            }, {
                                "type": "string",
                                "name": "no-done",
                                "value": "W"
                            }, {
                                "type": "string",
                                "name": "right",
                                "value": "Y"
                            }]
                        },

                        "papertypeCode": {
                            "type": "string",
                            "required": false,
                            "@alias": "paperTypeCode",
                            "@name": "papertypeCode"
                        },

                        "paperId": {
                            "type": "string",
                            "required": false,
                            "@alias": "paperId",
                            "@name": "paperId"
                        }
                    },

                    "required": ["answersheetId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询答题卡记录-标准接口",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "list": {
                            "type": "array",
                            "required": true,

                            "items": {
                                "type": "object",

                                "required": [
                                    "paperSubjectName",
                                    "questionType",
                                    "paperSubjectSeq",
                                    "paperSubjectTotalScore",
                                    "paperSubjectAverageScore",
                                    "questionTotal",
                                    "paperSubjectMemo",
                                    "paperSubjectId",
                                    "questionList"
                                ],

                                "properties": {
                                    "paperSubjectName": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "papersubjectName",
                                        "@name": "paperSubjectName"
                                    },

                                    "questionType": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "questionType",
                                        "@name": "questionType",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "S",
                                            "value": "single"
                                        }, {
                                            "type": "string",
                                            "name": "M",
                                            "value": "multiple"
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
                                            "value": "indefinite"
                                        }, {
                                            "type": "string",
                                            "name": "C",
                                            "value": "match"
                                        }]
                                    },

                                    "paperSubjectSeq": {
                                        "type": "number",
                                        "required": true,
                                        "@alias": "papersubjectSeq",
                                        "@name": "paperSubjectSeq"
                                    },

                                    "paperSubjectTotalScore": {
                                        "type": "number",
                                        "required": true,
                                        "@alias": "papersubjectTotalscore",
                                        "@name": "paperSubjectTotalScore"
                                    },

                                    "paperSubjectAverageScore": {
                                        "type": "number",
                                        "required": true,
                                        "@alias": "papersubjectAveragescore",
                                        "@name": "paperSubjectAverageScore"
                                    },

                                    "questionTotal": {
                                        "type": "number",
                                        "required": true,
                                        "@alias": "questionTotal",
                                        "@name": "questionTotal"
                                    },

                                    "paperSubjectMemo": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "papersubjectMemo",
                                        "@name": "paperSubjectMemo"
                                    },

                                    "paperSubjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papersubjectId",
                                        "@name": "paperSubjectId"
                                    },

                                    "questionList": {
                                        "type": "array",
                                        "required": true,

                                        "items": {
                                            "type": "object",

                                            "required": [
                                                "questionId",
                                                "answersheetDetailDecideStatus",
                                                "paperQuestionDetailSeq",
                                                "paperQuestionDetailId",
                                                "answersheetDetailAllowModify",
                                                "answersheetDetailUserAnswer",
                                                "answersheetDetailId",
                                                "answerQuestionTime",
                                                "answersheetEstimateStatus",
                                                "subQuestionType"
                                            ],

                                            "properties": {
                                                "questionId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "@alias": "questionId",
                                                    "@name": "questionId"
                                                },

                                                "answersheetDetailDecideStatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "@alias": "answersheetdetailDecidestatus",
                                                    "@name": "answersheetDetailDecideStatus",

                                                    "@enums": [{
                                                        "type": "string",
                                                        "name": "Y",
                                                        "value": "right"
                                                    }, {
                                                        "type": "string",
                                                        "name": "N",
                                                        "value": "wrong"
                                                    }, {
                                                        "type": "string",
                                                        "name": "W",
                                                        "value": "no-done"
                                                    }, {
                                                        "type": "string",
                                                        "name": "F",
                                                        "value": "done"
                                                    }]
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

                                                "answersheetDetailAllowModify": {
                                                    "type": "string",
                                                    "required": true,
                                                    "@alias": "answersheetdetailAllowmodify",
                                                    "@name": "answersheetDetailAllowModify"
                                                },

                                                "answersheetDetailUserAnswer": {
                                                    "type": "string",
                                                    "required": true,
                                                    "@alias": "answersheetdetailUseranswer",
                                                    "@name": "answersheetDetailUserAnswer"
                                                },

                                                "answersheetDetailId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "@alias": "answersheetdetailId",
                                                    "@name": "answersheetDetailId"
                                                },

                                                "answerQuestionTime": {
                                                    "type": "string",
                                                    "required": true,
                                                    "@alias": "answerquestiontime",
                                                    "@name": "answerQuestionTime"
                                                },

                                                "answersheetEstimateStatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "answersheetdetailEstimatestatus",
                                                    "@name": "answersheetEstimateStatus",

                                                    "@enums": [{
                                                        "type": "string",
                                                        "name": "Y",
                                                        "value": "yes"
                                                    }, {
                                                        "type": "string",
                                                        "name": "N",
                                                        "value": "no"
                                                    }]
                                                },

                                                "subQuestionType": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "questionType",
                                                    "@name": "subQuestionType",

                                                    "@enums": [{
                                                        "type": "string",
                                                        "name": "S",
                                                        "value": "single"
                                                    }, {
                                                        "type": "string",
                                                        "name": "M",
                                                        "value": "multiple"
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
                                                    }]
                                                }
                                            }
                                        },

                                        "@alias": "questionList",
                                        "@name": "questionList"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "list"
                        },

                        "count": {
                            "type": "number",
                            "required": true,
                            "@alias": "count",
                            "@name": "count"
                        },

                        "systemTime": {
                            "type": "number",
                            "required": true,
                            "@alias": "systemTm",
                            "@name": "systemTime"
                        }
                    },

                    "required": ["list", "count", "systemTime"]
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
    var pluginName = "nl:qb/query-answersheet-record2";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB2004.query-answersheet-record2.options.js"
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
            "nl:qb/query-answersheet-record2$options=./api.QB2004.query-answersheet-record2.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();