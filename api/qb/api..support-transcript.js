/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "support-transcript";

        var apiDefinition = {
            api: "qb/compute/support/answer/sheet/transcript",
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
                    "title": "学习中心-成绩单",
                    "description": "学习中心的成绩单",
                    "type": "object",

                    "properties": {
                        "answerSheetId": {
                            "type": "string",
                            "required": true,
                            "@alias": "answersheetId",
                            "@name": "answerSheetId"
                        },

                        "isRank": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "isRank",
                            "@name": "isRank",

                            "@enums": [{
                                "type": "string",
                                "name": "Y",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "N",
                                "value": "N"
                            }]
                        }
                    },

                    "required": ["answerSheetId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "学习中心-成绩单",
                    "description": "学习中心的成绩单",
                    "type": "object",

                    "properties": {
                        "answersheetId": {
                            "type": "string",
                            "required": false,
                            "@alias": "answerSheetId",
                            "@name": "answersheetId"
                        },

                        "rightRate": {
                            "type": "string",
                            "required": false,
                            "@alias": "objRightRate",
                            "@name": "rightRate"
                        },

                        "answerScore": {
                            "type": "string",
                            "required": false,
                            "@alias": "objAnswerScore",
                            "@name": "answerScore"
                        },

                        "questionTotal": {
                            "type": "string",
                            "required": false,
                            "@alias": "questionTotal",
                            "@name": "questionTotal"
                        },

                        "answerQuestionTotal": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "answerQuestionTotal",
                            "@name": "answerQuestionTotal"
                        },

                        "rightQuestionTotal": {
                            "type": "string",
                            "required": false,
                            "@alias": "objRightQuestionTotal",
                            "@name": "rightQuestionTotal"
                        },

                        "errorQuestionTotal": {
                            "type": "string",
                            "required": false,
                            "@alias": "objErrorQuestionTotal",
                            "@name": "errorQuestionTotal"
                        },

                        "beatRate": {
                            "type": "string",
                            "required": false,
                            "@alias": "beatRate",
                            "@name": "beatRate"
                        },

                        "questionScore": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "objQuestionScore",
                            "@name": "questionScore"
                        }
                    },

                    "required": []
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
    var pluginName = "nl:qb/support-transcript";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..support-transcript.options.js"
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
            "nl:qb/support-transcript$options=./api..support-transcript.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();