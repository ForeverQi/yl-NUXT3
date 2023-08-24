/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-business-paper-daily_practice";

        var apiDefinition = {
            api: "qb/business/paper/daily_practice",
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
                    "title": "每日一练当日答题情况",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        }
                    },

                    "required": ["subjectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "每日一练当日答题情况",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "paperId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperId",
                            "@name": "paperId"
                        },

                        "paperName": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "paperName",
                            "@name": "paperName"
                        },

                        "answerStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "answerStatus",
                            "@name": "answerStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "Y",
                                "value": "yes"
                            }, {
                                "type": "string",
                                "name": "N",
                                "value": "no"
                            }]
                        },

                        "answersheetStatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "answersheetStatus",
                            "@name": "answersheetStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "A",
                                "value": "complete"
                            }, {
                                "type": "string",
                                "name": "U",
                                "value": "noStart"
                            }, {
                                "type": "string",
                                "name": "G",
                                "value": "padding"
                            }]
                        },

                        "answersheetId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "answersheetId",
                            "@name": "answersheetId"
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
    var pluginName = "nl:qb/query-business-paper-daily_practice";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-business-paper-daily_practice.options.js"
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
            "nl:qb/query-business-paper-daily_practice$options=./api..query-business-paper-daily_practice.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();