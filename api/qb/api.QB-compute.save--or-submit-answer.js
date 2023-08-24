/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "save--or-submit-answer";

        var apiDefinition = {
            api: "qb/compute/paper/answer",
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
                    "title": "试卷交卷",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "paperId": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperId",
                            "@name": "paperId"
                        },

                        "answerSheetId": {
                            "type": "string",
                            "required": false,
                            "@alias": "answerSheetId",
                            "@name": "answerSheetId"
                        },

                        "answerStatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "answerStatus",
                            "@name": "answerStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "finished",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "not-finished",
                                "value": "G"
                            }, {
                                "type": "string",
                                "name": "chapter-save",
                                "value": "S"
                            }, {
                                "type": "string",
                                "name": "temporary",
                                "value": "T"
                            }]
                        },

                        "answerDurationTime": {
                            "type": "number",
                            "required": true,
                            "@alias": "answerDurationTime",
                            "@name": "answerDurationTime"
                        },

                        "answerWay": {
                            "type": "string",
                            "required": true,
                            "@alias": "answerWay",
                            "@name": "answerWay",

                            "@enums": [{
                                "type": "string",
                                "name": "automatic",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "manual",
                                "value": "M"
                            }, {
                                "type": "string",
                                "name": "end-mock",
                                "value": "E"
                            }]
                        },

                        "answerScene": {
                            "type": "string",
                            "required": true,
                            "@alias": "answerScene",
                            "@name": "answerScene",

                            "@enums": [{
                                "type": "string",
                                "name": "brush",
                                "value": "B"
                            }, {
                                "type": "string",
                                "name": "mock",
                                "value": "M"
                            }]
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        },

                        "ctype": {
                            "type": "string",
                            "required": true,
                            "@alias": "cType",
                            "@name": "ctype"
                        },

                        "intelligentMarking": {
                            "type": "boolean",
                            "required": false,
                            "default": "",
                            "@alias": "intelligentMarking",
                            "@name": "intelligentMarking"
                        },

                        "extension": {
                            "type": "string",
                            "required": false,
                            "@alias": "extension",
                            "@name": "extension"
                        },

                        "userAnswers": {
                            "type": "array",
                            "required": "N",

                            "items": {
                                "type": "object",

                                "required": [
                                    "paperSubjectId",
                                    "paperQuestionDetailId",
                                    "paperQuestionDetailSeq",
                                    "userAnswer",
                                    "answerTime"
                                ],

                                "properties": {
                                    "paperSubjectId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "paperSubjectId",
                                        "@name": "paperSubjectId"
                                    },

                                    "paperQuestionDetailId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "paperQuestionDetailId",
                                        "@name": "paperQuestionDetailId"
                                    },

                                    "paperQuestionDetailSeq": {
                                        "type": "number",
                                        "required": true,
                                        "@alias": "paperQuestionDetailSeq",
                                        "@name": "paperQuestionDetailSeq"
                                    },

                                    "userAnswer": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "userAnswer",
                                        "@name": "userAnswer"
                                    },

                                    "answerTime": {
                                        "type": "number",
                                        "required": true,
                                        "@alias": "answerTime",
                                        "@name": "answerTime"
                                    }
                                }
                            },

                            "@alias": "userAnswers",
                            "@name": "userAnswers"
                        }
                    },

                    "required": [
                        "paperId",
                        "answerStatus",
                        "answerDurationTime",
                        "answerWay",
                        "answerScene",
                        "sourceType",
                        "ctype",
                        "userAnswers"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "试卷交卷",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "answerSheetId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answerSheetId",
                            "@name": "answerSheetId"
                        }
                    },

                    "required": ["answerSheetId"]
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
    var pluginName = "nl:qb/save--or-submit-answer";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB-compute.save--or-submit-answer.options.js"
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
            "nl:qb/save--or-submit-answer$options=./api.QB-compute.save--or-submit-answer.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();