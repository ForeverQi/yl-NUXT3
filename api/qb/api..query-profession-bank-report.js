/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-profession-bank-report";

        var apiDefinition = {
            api: "qb/compute/profession-bank/report",
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
                    "title": "专项题库作答报告",
                    "description": "专项题库作答报告。 呈现本次作答的数据统计。",
                    "type": "object",

                    "properties": {
                        "bankAnswerSheetId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "bankAnswerSheetId",
                            "@name": "bankAnswerSheetId"
                        }
                    },

                    "required": ["bankAnswerSheetId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "专项题库作答报告",
                    "description": "专项题库作答报告。 呈现本次作答的数据统计。",
                    "type": "object",

                    "properties": {
                        "bankAnswerSheetId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "bankAnswerSheetId",
                            "@name": "bankAnswerSheetId"
                        },

                        "report": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "questionTypeChinese",
                                    "answerTotal",
                                    "rightTotal",
                                    "errorTotal",
                                    "rightRate"
                                ],

                                "properties": {
                                    "questionTypeChinese": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "questionTypeChinese",
                                        "@name": "questionTypeChinese"
                                    },

                                    "answerTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerTotal",
                                        "@name": "answerTotal"
                                    },

                                    "rightTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "rightTotal",
                                        "@name": "rightTotal"
                                    },

                                    "errorTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "errorTotal",
                                        "@name": "errorTotal"
                                    },

                                    "rightRate": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "rightRate",
                                        "@name": "rightRate"
                                    }
                                }
                            },

                            "@alias": "report",
                            "@name": "report"
                        }
                    },

                    "required": ["bankAnswerSheetId", "report"]
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
    var pluginName = "nl:qb/query-profession-bank-report";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-profession-bank-report.options.js"
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
            "nl:qb/query-profession-bank-report$options=./api..query-profession-bank-report.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();