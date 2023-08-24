/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-paper-question-type-list";

        var apiDefinition = {
            api: "qb/papersubject/profile/list",
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
                    "title": "试卷主题列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "paperId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "paperId",
                            "@name": "paperId"
                        }
                    },

                    "required": ["paperId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "试卷主题列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        },

                        "list": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "paperSubjectId",
                                    "paperSubjectName",
                                    "paperSubjectType",
                                    "paperSubjectSeq",
                                    "paperSubjectTotalScore",
                                    "paperSubjectAverageScore",
                                    "paperQuestionTotalCount"
                                ],

                                "properties": {
                                    "paperSubjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papersubjectId",
                                        "@name": "paperSubjectId"
                                    },

                                    "paperSubjectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papersubjectName",
                                        "@name": "paperSubjectName"
                                    },

                                    "paperSubjectType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionType",
                                        "@name": "paperSubjectType",

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
                                            "name": "BC",
                                            "value": "blank-choose"
                                        }, {
                                            "type": "string",
                                            "name": "CF",
                                            "value": "cloze-fill"
                                        }, {
                                            "type": "string",
                                            "name": "L",
                                            "value": "listening"
                                        }]
                                    },

                                    "paperSubjectSeq": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papersubjectSeq",
                                        "@name": "paperSubjectSeq"
                                    },

                                    "paperSubjectTotalScore": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papersubjectTotalscore",
                                        "@name": "paperSubjectTotalScore"
                                    },

                                    "paperSubjectAverageScore": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "papersubjectAveragescore",
                                        "@name": "paperSubjectAverageScore"
                                    },

                                    "paperQuestionTotalCount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTotal",
                                        "@name": "paperQuestionTotalCount"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "list"
                        }
                    },

                    "required": ["count", "list"]
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
    var pluginName = "nl:qb/query-paper-question-type-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB0006.query-paper-question-type-list.options.js"
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
            "nl:qb/query-paper-question-type-list$options=./api.QB0006.query-paper-question-type-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();