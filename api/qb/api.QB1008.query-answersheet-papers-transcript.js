/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-answersheet-papers-transcript";

        var apiDefinition = {
            api: "qb/answersheet/papers/transcript",
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
                    "title": "多试卷成绩单",
                    "description": "多试卷成绩单",
                    "type": "object",

                    "properties": {
                        "paperIds": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "paperIds",
                            "@name": "paperIds"
                        },

                        "sourceType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "sourceType",
                            "@name": "sourceType"
                        }
                    },

                    "required": ["paperIds", "sourceType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "多试卷成绩单",
                    "description": "多试卷成绩单",
                    "type": "object",

                    "properties": {
                        "answerScore": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answerScore",
                            "@name": "answerScore"
                        },

                        "answersheetDurationtime": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetDurationtime",
                            "@name": "answersheetDurationtime"
                        },

                        "rankingpassRate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "rankingpassRate",
                            "@name": "rankingpassRate"
                        },

                        "questionTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "questionTotal",
                            "@name": "questionTotal"
                        },

                        "answerquestionTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "answerquestionTotal",
                            "@name": "answerquestionTotal"
                        },

                        "rightquestionTotal": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "rightquestionTotal",
                            "@name": "rightquestionTotal"
                        },

                        "rightRate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "rightRate",
                            "@name": "rightRate"
                        },

                        "paperScore": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "paperScore",
                            "@name": "paperScore"
                        },

                        "examDurationtime": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "examDurationtime",
                            "@name": "examDurationtime"
                        }
                    },

                    "required": [
                        "answerScore",
                        "answersheetDurationtime",
                        "rankingpassRate",
                        "questionTotal",
                        "answerquestionTotal",
                        "rightquestionTotal",
                        "rightRate",
                        "paperScore",
                        "examDurationtime"
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
    var pluginName = "nl:qb/query-answersheet-papers-transcript";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB1008.query-answersheet-papers-transcript.options.js"
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
            "nl:qb/query-answersheet-papers-transcript$options=./api.QB1008.query-answersheet-papers-transcript.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
