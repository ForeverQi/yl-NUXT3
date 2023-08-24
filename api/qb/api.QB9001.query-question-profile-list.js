/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-question-profile-list";

        var apiDefinition = {
            api: "qb/question/profile/list",
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
                    "description": "题目答案解析列表",
                    "type": "object",

                    "properties": {
                        "ids": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ids",
                            "@name": "ids"
                        },

                        "structType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "structType",
                            "@name": "structType"
                        }
                    },

                    "required": ["ids"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "题目答案解析列表",
                    "description": "题目答案解析列表",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "questionId",
                            "questionAnswer",
                            "questionAnswerparse",
                            "questionApath",
                            "questionVpath"
                        ],

                        "properties": {
                            "questionId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "questionId",
                                "@name": "questionId"
                            },

                            "questionAnswer": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "questionAnswer",
                                "@name": "questionAnswer"
                            },

                            "questionAnswerparse": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "questionAnswerparse",
                                "@name": "questionAnswerparse"
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
    var pluginName = "nl:qb/query-question-profile-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB9001.query-question-profile-list.options.js"
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
            "nl:qb/query-question-profile-list$options=./api.QB9001.query-question-profile-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();