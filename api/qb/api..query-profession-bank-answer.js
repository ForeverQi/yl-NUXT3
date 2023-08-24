/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-profession-bank-answer";

        var apiDefinition = {
            api: "qb/business/profession-bank/answer/brief",
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
                    "title": "专项题库答题卡",
                    "description": "专项题库答题页、解析页答题卡展示",
                    "type": "object",

                    "properties": {
                        "professionBankId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "professionBankId",
                            "@name": "professionBankId"
                        },

                        "answerType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answerType",
                            "@name": "answerType",

                            "@enums": [{
                                "type": "string",
                                "name": "all",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "sections",
                                "value": "S"
                            }, {
                                "type": "string",
                                "name": "random",
                                "value": "R"
                            }]
                        },

                        "sectionId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sectionId",
                            "@name": "sectionId"
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

                        "questionIds": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "questionIds",
                            "@name": "questionIds"
                        },

                        "isReselect": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "isReselect",
                            "@name": "isReselect"
                        }
                    },

                    "required": [
                        "professionBankId",
                        "answerType",
                        "sectionId",
                        "sourceId",
                        "sourceType",
                        "questionIds",
                        "isReselect"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "专项题库答题卡",
                    "description": "专项题库答题页、解析页答题卡展示",
                    "type": "object",

                    "properties": {
                        "questionTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "questionTotal",
                            "@name": "questionTotal"
                        },

                        "answerTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "answerTotal",
                            "@name": "answerTotal"
                        },

                        "rightTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "rightTotal",
                            "@name": "rightTotal"
                        },

                        "errorTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "errorTotal",
                            "@name": "errorTotal"
                        },

                        "unAnswerTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "unAnswerTotal",
                            "@name": "unAnswerTotal"
                        },

                        "unansweredQuestion": {
                            "type": "object",

                            "required": [
                                "questionId",
                                "questionType",
                                "questionStemType",
                                "questionStemSeq",
                                "questionSeq",
                                "decideStatus",
                                "userAnswer"
                            ],

                            "default": "",

                            "properties": {
                                "questionId": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "questionId",
                                    "@name": "questionId"
                                },

                                "questionType": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "questionType",
                                    "@name": "questionType"
                                },

                                "questionStemType": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "questionStemType",
                                    "@name": "questionStemType"
                                },

                                "questionStemSeq": {
                                    "type": "number",
                                    "required": true,
                                    "default": "",
                                    "@alias": "questionStemSeq",
                                    "@name": "questionStemSeq"
                                },

                                "questionSeq": {
                                    "type": "number",
                                    "required": true,
                                    "default": "",
                                    "@alias": "questionSeq",
                                    "@name": "questionSeq"
                                },

                                "decideStatus": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "decideStatus",
                                    "@name": "decideStatus"
                                },

                                "userAnswer": {
                                    "type": "string",
                                    "required": true,
                                    "default": "",
                                    "@alias": "userAnswer",
                                    "@name": "userAnswer"
                                }
                            },

                            "@alias": "unansweredQuestion",
                            "@name": "unansweredQuestion"
                        },

                        "questionTypes": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["questionTotal", "questionType", "questionTypeName", "questionAnswers"],

                                "properties": {
                                    "questionTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTotal",
                                        "@name": "questionTotal"
                                    },

                                    "questionType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionType",
                                        "@name": "questionType"
                                    },

                                    "questionTypeName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTypeName",
                                        "@name": "questionTypeName"
                                    },

                                    "questionAnswers": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",

                                            "required": [
                                                "questionId",
                                                "questionType",
                                                "questionStemType",
                                                "questionStemSeq",
                                                "questionSeq",
                                                "decideStatus",
                                                "userAnswer"
                                            ],

                                            "properties": {
                                                "questionId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "questionId",
                                                    "@name": "questionId"
                                                },

                                                "questionType": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "questionType",
                                                    "@name": "questionType"
                                                },

                                                "questionStemType": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "questionStemType",
                                                    "@name": "questionStemType"
                                                },

                                                "questionStemSeq": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "questionStemSeq",
                                                    "@name": "questionStemSeq"
                                                },

                                                "questionSeq": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "questionSeq",
                                                    "@name": "questionSeq"
                                                },

                                                "decideStatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "decideStatus",
                                                    "@name": "decideStatus"
                                                },

                                                "userAnswer": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "userAnswer",
                                                    "@name": "userAnswer"
                                                }
                                            }
                                        },

                                        "@alias": "questionAnswers",
                                        "@name": "questionAnswers"
                                    }
                                }
                            },

                            "@alias": "questionTypes",
                            "@name": "questionTypes"
                        }
                    },

                    "required": [
                        "questionTotal",
                        "answerTotal",
                        "rightTotal",
                        "errorTotal",
                        "unAnswerTotal",
                        "unansweredQuestion",
                        "questionTypes"
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
    var pluginName = "nl:qb/query-profession-bank-answer";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-profession-bank-answer.options.js"
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
            "nl:qb/query-profession-bank-answer$options=./api..query-profession-bank-answer.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();