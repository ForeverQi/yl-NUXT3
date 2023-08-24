/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "answer-sheet-section";

        var apiDefinition = {
            api: "qb/analysis/support/answer/sheet/section/tree",
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
                    "title": "学习中心-答卷章节统计",
                    "description": "学习中心评测报告答卷标识统计",
                    "type": "object",

                    "properties": {
                        "answerSheetId": {
                            "type": "string",
                            "required": false,
                            "@alias": "answersheetId",
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
                    "title": "学习中心-答卷章节统计",
                    "description": "学习中心评测报告答卷标识统计",
                    "type": "object",

                    "properties": {
                        "sectionTree": {
                            "type": "array",
                            "required": false,

                            "items": {
                                "type": "object",
                                "required": [],

                                "properties": {
                                    "sectionId": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "sectionId",
                                        "@name": "sectionId"
                                    },

                                    "sectionName": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "sectionName",
                                        "@name": "sectionName"
                                    },

                                    "questionTotal": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "questionTotal",
                                        "@name": "questionTotal"
                                    },

                                    "answerRightRate": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "answerRightRate",
                                        "@name": "answerRightRate"
                                    },

                                    "answerRightTotal": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "answerRightTotal",
                                        "@name": "answerRightTotal"
                                    },

                                    "answerErrorTotal": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "answerErrorTotal",
                                        "@name": "answerErrorTotal"
                                    },

                                    "children": {
                                        "type": "array",
                                        "required": false,

                                        "items": {
                                            "type": "object",
                                            "required": [],

                                            "properties": {
                                                "sectionId": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "sectionId",
                                                    "@name": "sectionId"
                                                },

                                                "sectionName": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "sectionName",
                                                    "@name": "sectionName"
                                                },

                                                "questionTotal": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "questionTotal",
                                                    "@name": "questionTotal"
                                                },

                                                "answerRightRate": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "answerRightRate",
                                                    "@name": "answerRightRate"
                                                },

                                                "answerRightTotal": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "answerRightTotal",
                                                    "@name": "answerRightTotal"
                                                },

                                                "answerErrorTotal": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "answerErrorTotal",
                                                    "@name": "answerErrorTotal"
                                                }
                                            }
                                        },

                                        "@alias": "children",
                                        "@name": "children"
                                    }
                                }
                            },

                            "@alias": "sectionTree",
                            "@name": "sectionTree"
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
    var pluginName = "nl:qb/answer-sheet-section";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..answer-sheet-section.options.js"
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
            "nl:qb/answer-sheet-section$options=./api..answer-sheet-section.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();