/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-bussiness-question-parse";

        var apiDefinition = {
            api: "qb/business/question/parse",
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
                    "title": "试题解析",
                    "description": "试题解析",
                    "type": "object",

                    "properties": {
                        "questionIds": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "questionIds",
                            "@name": "questionIds"
                        },

                        "ctype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ctype",
                            "@name": "ctype"
                        }
                    },

                    "required": ["questionIds", "ctype"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "试题解析",
                    "description": "试题解析",
                    "type": "object",

                    "properties": {
                        "questionId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionId",
                            "@name": "questionId"
                        },

                        "questionKeyword": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionKeyword",
                            "@name": "questionKeyword"
                        },

                        "answerAccount": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answerAccount",
                            "@name": "answerAccount"
                        },

                        "rightRate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "rightRate",
                            "@name": "rightRate"
                        },

                        "questionAnswer": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "questionAnswer",
                            "@name": "questionAnswer"
                        },

                        "mediaParses": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["questionId", "mediaType", "mediaPath", "mediaSeq"],

                                "properties": {
                                    "questionId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionId",
                                        "@name": "questionId"
                                    },

                                    "mediaType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "mediaType",
                                        "@name": "mediaType"
                                    },

                                    "mediaPath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "mediaPath",
                                        "@name": "mediaPath"
                                    },

                                    "mediaSeq": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "mediaSeq",
                                        "@name": "mediaSeq"
                                    }
                                }
                            },

                            "@alias": "mediaParses",
                            "@name": "mediaParses"
                        },

                        "answerParseVO": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["content", "imgs"],

                                "properties": {
                                    "content": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "content",
                                        "@name": "content"
                                    },

                                    "imgs": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["name", "path"],

                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "name",
                                                    "@name": "name"
                                                },

                                                "path": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "path",
                                                    "@name": "path"
                                                }
                                            }
                                        },

                                        "@alias": "imgs",
                                        "@name": "imgs"
                                    }
                                }
                            },

                            "@alias": "answerParseVO",
                            "@name": "answerParseVO"
                        },

                        "questionAnswerVO": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["content", "imgs"],

                                "properties": {
                                    "content": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "content",
                                        "@name": "content"
                                    },

                                    "imgs": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["name", "path"],

                                            "properties": {
                                                "name": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "name",
                                                    "@name": "name"
                                                },

                                                "path": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "path",
                                                    "@name": "path"
                                                }
                                            }
                                        },

                                        "@alias": "imgs",
                                        "@name": "imgs"
                                    }
                                }
                            },

                            "@alias": "questionAnswerVO",
                            "@name": "questionAnswerVO"
                        }
                    },

                    "required": [
                        "questionId",
                        "questionKeyword",
                        "answerAccount",
                        "rightRate",
                        "questionAnswer",
                        "mediaParses",
                        "answerParseVO",
                        "questionAnswerVO"
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
    var pluginName = "nl:qb/query-bussiness-question-parse";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-bussiness-question-parse.options.js"
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
            "nl:qb/query-bussiness-question-parse$options=./api..query-bussiness-question-parse.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();