/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-error-questions-list";

        var apiDefinition = {
            api: "qb/errorquestion/question/list",
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
                    "title": "错题记录题目明细列表-标准接口",
                    "description": "questionIds 有值时不走分页",
                    "type": "object",

                    "properties": {
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

                        "sectionId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "sectionId",
                            "@name": "sectionId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "questionType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "questionType",
                            "@name": "questionType",

                            "@enums": [{
                                "type": "string",
                                "name": "single",
                                "value": "S"
                            }, {
                                "type": "string",
                                "name": "multiple",
                                "value": "M"
                            }, {
                                "type": "string",
                                "name": "judge",
                                "value": "J"
                            }, {
                                "type": "string",
                                "name": "fill",
                                "value": "F"
                            }, {
                                "type": "string",
                                "name": "opinion",
                                "value": "O"
                            }, {
                                "type": "string",
                                "name": "analysis",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "indefinite",
                                "value": "I"
                            }, {
                                "type": "string",
                                "name": "compatibility",
                                "value": "C"
                            }, {
                                "type": "string",
                                "name": "listening",
                                "value": "L"
                            }, {
                                "type": "string",
                                "name": "cloze-fill",
                                "value": "CF"
                            }, {
                                "type": "string",
                                "name": "blank-choose",
                                "value": "BC"
                            }]
                        },

                        "classUniquecode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "classUniqueCode",
                            "@name": "classUniquecode"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        },

                        "structType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "structType",
                            "@name": "structType",

                            "@enums": [{
                                "type": "string",
                                "name": "tidy",
                                "value": "T"
                            }, {
                                "type": "string",
                                "name": "normal",
                                "value": "N"
                            }]
                        },

                        "questionIds": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "questionIds",
                            "@name": "questionIds"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        }
                    },

                    "required": ["sourceType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "错题记录题目明细列表-标准接口",
                    "description": "questionIds 有值时不走分页",
                    "type": "object",

                    "properties": {
                        "totalCount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "totalCount"
                        },

                        "list": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "questionId",
                                    "questionType",
                                    "errorQuestionId",
                                    "userAnswer",
                                    "createDate",
                                    "title",
                                    "content",
                                    "stemContent",
                                    "stemId",
                                    "questionStemType",
                                    "audioId",
                                    "audioVid",
                                    "collectId",
                                    "collectStatus",
                                    "questionComplexity",
                                    "answerCorrectRate"
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
                                            "value": "compatibility"
                                        }, {
                                            "type": "string",
                                            "name": "CF",
                                            "value": "cloze-fill"
                                        }, {
                                            "type": "string",
                                            "name": "BC",
                                            "value": "blank-choose"
                                        }, {
                                            "type": "string",
                                            "name": "L",
                                            "value": "listening"
                                        }]
                                    },

                                    "errorQuestionId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "errorquestionId",
                                        "@name": "errorQuestionId"
                                    },

                                    "userAnswer": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "errorquestionUseranswer",
                                        "@name": "userAnswer"
                                    },

                                    "createDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "errorquestionCreatedate",
                                        "@name": "createDate"
                                    },

                                    "title": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTitle",
                                        "@name": "title"
                                    },

                                    "content": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionContent",
                                        "@name": "content"
                                    },

                                    "stemContent": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionstemContent",
                                        "@name": "stemContent"
                                    },

                                    "stemId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionstemId",
                                        "@name": "stemId"
                                    },

                                    "questionStemType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionstemType",
                                        "@name": "questionStemType",

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
                                            "value": "compatibility"
                                        }, {
                                            "type": "string",
                                            "name": "L",
                                            "value": "listening"
                                        }, {
                                            "type": "string",
                                            "name": "CF",
                                            "value": "cloze-fill"
                                        }, {
                                            "type": "string",
                                            "name": "BC",
                                            "value": "blank-choose"
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

                                    "collectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "collectId",
                                        "@name": "collectId"
                                    },

                                    "collectStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
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

                                    "questionComplexity": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionComplexity",
                                        "@name": "questionComplexity",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "E",
                                            "value": "easy"
                                        }, {
                                            "type": "string",
                                            "name": "M",
                                            "value": "medium"
                                        }, {
                                            "type": "string",
                                            "name": "D",
                                            "value": "difficult"
                                        }]
                                    },

                                    "answerCorrectRate": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionRightrate",
                                        "@name": "answerCorrectRate"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "list"
                        }
                    },

                    "required": ["totalCount", "list"]
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
    var pluginName = "nl:qb/query-error-questions-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB3002.query-error-questions-list.options.js"
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
            "nl:qb/query-error-questions-list$options=./api.QB3002.query-error-questions-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();