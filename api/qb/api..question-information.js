/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "question-information";

        var apiDefinition = {
            api: "qb/business/support/question-answer/question-information",
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
                    "title": "答疑支撑-试题相关信息",
                    "description": "答疑支撑-试题相关信息",
                    "type": "object",

                    "properties": {
                        "questionId": {
                            "type": "string",
                            "required": false,
                            "@alias": "questionId",
                            "@name": "questionId"
                        },

                        "questionStemId": {
                            "type": "string",
                            "required": false,
                            "@alias": "questionStemId",
                            "@name": "questionStemId"
                        },

                        "answerSheetId": {
                            "type": "string",
                            "required": false,
                            "@alias": "answerSheetId",
                            "@name": "answerSheetId"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "答疑支撑-试题相关信息",
                    "description": "答疑支撑-试题相关信息",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": [],

                        "properties": {
                            "answer": {
                                "type": "string",
                                "required": false,
                                "@alias": "answer",
                                "@name": "answer"
                            },

                            "answerParse": {
                                "type": "string",
                                "required": false,
                                "@alias": "answerParse",
                                "@name": "answerParse"
                            },

                            "knowledgeIds": {
                                "type": "array",
                                "required": false,

                                "items": {
                                    "type": "object",
                                    "required": [],

                                    "properties": {
                                        "knowledgeId": {
                                            "type": "string",
                                            "required": false,
                                            "@alias": "knowledgeId",
                                            "@name": "knowledgeId"
                                        }
                                    }
                                },

                                "@alias": "knowledgeIds",
                                "@name": "knowledgeIds"
                            },

                            "content": {
                                "type": "string",
                                "required": false,
                                "@alias": "questionContent",
                                "@name": "content"
                            },

                            "questionId": {
                                "type": "string",
                                "required": false,
                                "@alias": "questionId",
                                "@name": "questionId"
                            },

                            "stemContent": {
                                "type": "string",
                                "required": false,
                                "@alias": "questionStemContent",
                                "@name": "stemContent"
                            },

                            "stemId": {
                                "type": "string",
                                "required": false,
                                "@alias": "questionStemId",
                                "@name": "stemId"
                            },

                            "questionType": {
                                "type": "string",
                                "required": false,
                                "@alias": "questionType",
                                "@name": "questionType"
                            },

                            "questionStemType": {
                                "type": "string",
                                "required": false,
                                "@alias": "questionStemType",
                                "@name": "questionStemType"
                            },

                            "subjectId": {
                                "type": "string",
                                "required": false,
                                "@alias": "subjectId",
                                "@name": "subjectId"
                            },

                            "subjectName": {
                                "type": "string",
                                "required": false,
                                "@alias": "subjectName",
                                "@name": "subjectName"
                            },

                            "userAnswer": {
                                "type": "string",
                                "required": false,
                                "@alias": "userAnswer",
                                "@name": "userAnswer"
                            },

                            "mediaParses": {
                                "type": "array",
                                "required": false,

                                "items": {
                                    "type": "object",
                                    "required": [],

                                    "properties": {
                                        "questionId": {
                                            "type": "string",
                                            "required": false,
                                            "@alias": "questionId",
                                            "@name": "questionId"
                                        },

                                        "mediaType": {
                                            "type": "string",
                                            "required": false,
                                            "@alias": "mediaType",
                                            "@name": "mediaType"
                                        },

                                        "mediaPath": {
                                            "type": "string",
                                            "required": false,
                                            "@alias": "mediaPath",
                                            "@name": "mediaPath"
                                        },

                                        "mediaSeq": {
                                            "type": "number",
                                            "required": false,
                                            "@alias": "mediaSeq",
                                            "@name": "mediaSeq"
                                        }
                                    }
                                },

                                "@alias": "mediaParses",
                                "@name": "mediaParses"
                            },

                            "audioId": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "audioId",
                                "@name": "audioId"
                            },

                            "audioVid": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "vid",
                                "@name": "audioVid"
                            },

                            "classId": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "classId",
                                "@name": "classId"
                            },

                            "className": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "className",
                                "@name": "className"
                            },

                            "questionSeq": {
                                "type": "number",
                                "required": false,
                                "default": "",
                                "@alias": "questionSeq",
                                "@name": "questionSeq"
                            }
                        }
                    }
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
    var pluginName = "nl:qb/question-information";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..question-information.options.js"
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
            "nl:qb/question-information$options=./api..question-information.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();