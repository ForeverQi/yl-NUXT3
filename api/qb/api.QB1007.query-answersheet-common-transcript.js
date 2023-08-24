/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-answersheet-common-transcript";

        var apiDefinition = {
            api: "qb/answersheet/common/transcript",
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
                    "title": "通用成绩单",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "answersheetId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetId",
                            "@name": "answersheetId"
                        }
                    },

                    "required": ["answersheetId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "通用成绩单",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "answersheetTotal": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetTotal",
                            "@name": "answersheetTotal"
                        },

                        "answersheetDurationtime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetDurationtime",
                            "@name": "answersheetDurationtime"
                        },

                        "answersheetRecorddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetRecorddate",
                            "@name": "answersheetRecorddate"
                        },

                        "answersheetModifieddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetModifieddate",
                            "@name": "answersheetModifieddate"
                        },

                        "subQuestiontotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "subQuestiontotal",
                            "@name": "subQuestiontotal"
                        },

                        "subAnswerquestiontotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "subAnswerquestiontotal",
                            "@name": "subAnswerquestiontotal"
                        },

                        "subQuestionscore": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subQuestionscore",
                            "@name": "subQuestionscore"
                        },

                        "subAnswerscore": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subAnswerscore",
                            "@name": "subAnswerscore"
                        },

                        "userId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        },

                        "subToestimatequestiontotal": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subToestimatequestiontotal",
                            "@name": "subToestimatequestiontotal"
                        },

                        "uasList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "uasQuestiontype",
                                    "uasQuestiontotal",
                                    "uasAnswerquestiontotal",
                                    "uasRightquestiontotal",
                                    "uasRightrate",
                                    "uasQuestionscore",
                                    "uasAnswerscore",
                                    "uasModifieddate",
                                    "papersubjectId",
                                    "uasObjquestiontotal",
                                    "uasObjanswerquestiontotal",
                                    "uasObjrightquestiontotal",
                                    "uasObjRightrate",
                                    "uasObjquestionscore",
                                    "uasObjanswerscore",
                                    "papersubjectName"
                                ],

                                "properties": {
                                    "uasQuestiontype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasQuestiontype",
                                        "@name": "uasQuestiontype"
                                    },

                                    "uasQuestiontotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasQuestiontotal",
                                        "@name": "uasQuestiontotal"
                                    },

                                    "uasAnswerquestiontotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasAnswerquestiontotal",
                                        "@name": "uasAnswerquestiontotal"
                                    },

                                    "uasRightquestiontotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasRightquestiontotal",
                                        "@name": "uasRightquestiontotal"
                                    },

                                    "uasRightrate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasRightrate",
                                        "@name": "uasRightrate"
                                    },

                                    "uasQuestionscore": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasQuestionscore",
                                        "@name": "uasQuestionscore"
                                    },

                                    "uasAnswerscore": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasAnswerscore",
                                        "@name": "uasAnswerscore"
                                    },

                                    "uasModifieddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasModifieddate",
                                        "@name": "uasModifieddate"
                                    },

                                    "papersubjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papersubjectId",
                                        "@name": "papersubjectId"
                                    },

                                    "uasObjquestiontotal": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasObjquestiontotal",
                                        "@name": "uasObjquestiontotal"
                                    },

                                    "uasObjanswerquestiontotal": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasObjanswerquestiontotal",
                                        "@name": "uasObjanswerquestiontotal"
                                    },

                                    "uasObjrightquestiontotal": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasObjrightquestiontotal",
                                        "@name": "uasObjrightquestiontotal"
                                    },

                                    "uasObjRightrate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasObjRightrate",
                                        "@name": "uasObjRightrate"
                                    },

                                    "uasObjquestionscore": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasObjquestionscore",
                                        "@name": "uasObjquestionscore"
                                    },

                                    "uasObjanswerscore": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "uasObjanswerscore",
                                        "@name": "uasObjanswerscore"
                                    },

                                    "papersubjectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papersubjectName",
                                        "@name": "papersubjectName"
                                    }
                                }
                            },

                            "@alias": "uasList",
                            "@name": "uasList"
                        }
                    },

                    "required": [
                        "answersheetTotal",
                        "answersheetDurationtime",
                        "answersheetRecorddate",
                        "answersheetModifieddate",
                        "subQuestiontotal",
                        "subAnswerquestiontotal",
                        "subQuestionscore",
                        "subAnswerscore",
                        "userId",
                        "subToestimatequestiontotal",
                        "uasList"
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
    var pluginName = "nl:qb/query-answersheet-common-transcript";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB1007.query-answersheet-common-transcript.options.js"
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
            "nl:qb/query-answersheet-common-transcript$options=./api.QB1007.query-answersheet-common-transcript.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();