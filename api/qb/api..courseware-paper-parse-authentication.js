/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "courseware-paper-parse-authentication";

        var apiDefinition = {
            api: "igt/courseware_paper/authentication_jx",
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
                    "title": "课件试卷鉴权-解析页",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "paperId": {
                            "type": "string",
                            "required": true,
                            "@alias": "paperId",
                            "@name": "paperId"
                        },

                        "classId": {
                            "type": "string",
                            "required": true,
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        }
                    },

                    "required": ["coursewareId", "paperId", "classId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "课件试卷鉴权-解析页",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "code": {
                            "type": "string",
                            "required": true,
                            "@alias": "code",
                            "@name": "code"
                        },

                        "msg": {
                            "type": "string",
                            "required": false,
                            "@alias": "msg",
                            "@name": "msg"
                        },

                        "data": {
                            "type": "object",
                            "required": ["answerStyle", "subjectiveQuestionGradingMethod"],

                            "properties": {
                                "answerStyle": {
                                    "type": "string",
                                    "required": true,
                                    "@alias": "answerStyle",
                                    "@name": "answerStyle"
                                },

                                "subjectiveQuestionGradingMethod": {
                                    "type": "string",
                                    "required": true,
                                    "@alias": "subjectiveQuestionGradingMethod",
                                    "@name": "subjectiveQuestionGradingMethod"
                                },

                                "answersheetId": {
                                    "type": "string",
                                    "required": false,
                                    "@alias": "answersheetId",
                                    "@name": "answersheetId"
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["code"]
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
    var pluginName = "nl:qb/courseware-paper-parse-authentication";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..courseware-paper-parse-authentication.options.js"
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
            "nl:qb/courseware-paper-parse-authentication$options=./api..courseware-paper-parse-authentication.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();