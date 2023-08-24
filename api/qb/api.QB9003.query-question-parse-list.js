/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-question-parse-list";

        var apiDefinition = {
            api: "qb/question/profile/parselist",
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
                    "title": "题目答案解析列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "questionIds": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionIds",
                            "@name": "questionIds"
                        },

                        "structType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "structType",
                            "@name": "structType",

                            "@enums": [{
                                "type": "string",
                                "name": "T",
                                "value": "T"
                            }, {
                                "type": "string",
                                "name": "N",
                                "value": "N"
                            }]
                        }
                    },

                    "required": ["questionIds"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "题目答案解析列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "list": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "questionId",
                                    "answer",
                                    "answerParse",
                                    "questionApath",
                                    "questionVpath",
                                    "questionSeq",
                                    "answerAccount",
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

                                    "answer": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionAnswer",
                                        "@name": "answer"
                                    },

                                    "answerParse": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionAnswerparse",
                                        "@name": "answerParse"
                                    },

                                    "questionApath": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",
                                        "items": {},
                                        "@alias": "questionApath",
                                        "@name": "questionApath"
                                    },

                                    "questionVpath": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",
                                        "items": {},
                                        "@alias": "questionVpath",
                                        "@name": "questionVpath"
                                    },

                                    "questionSeq": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionSeq",
                                        "@name": "questionSeq"
                                    },

                                    "answerAccount": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerAccount",
                                        "@name": "answerAccount"
                                    },

                                    "answerCorrectRate": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "rightRate",
                                        "@name": "answerCorrectRate"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "list"
                        },

                        "count": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        }
                    },

                    "required": ["list", "count"]
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
    var pluginName = "nl:qb/query-question-parse-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB9003.query-question-parse-list.options.js"
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
            "nl:qb/query-question-parse-list$options=./api.QB9003.query-question-parse-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();