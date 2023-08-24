/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-answersheet-detail";

        var apiDefinition = {
            api: "qb/paper/answersheet/info",
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
                    "title": "查询答卷详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "paperId": {
                            "type": "string",
                            "required": false,
                            "@alias": "paperId",
                            "@name": "paperId"
                        },

                        "answersheetId": {
                            "type": "string",
                            "required": false,
                            "@alias": "answersheetId",
                            "@name": "answersheetId"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询答卷详情",
                    "description": "",
                    "type": "object",

                    "properties": {
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

                        "answersheetId": {
                            "type": "string",
                            "required": true,
                            "@alias": "answersheetId",
                            "@name": "answersheetId"
                        },

                        "answersheetStatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "answersheetStatus",
                            "@name": "answersheetStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "A",
                                "value": "finished"
                            }, {
                                "type": "string",
                                "name": "U",
                                "value": "not-started"
                            }, {
                                "type": "string",
                                "name": "G",
                                "value": "not-finished"
                            }]
                        },

                        "answersheetDurationTime": {
                            "type": "number",
                            "required": true,
                            "@alias": "answersheetDurationtime",
                            "@name": "answersheetDurationTime"
                        },

                        "answersheetEstimateStatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "answersheetEstimatestatus",
                            "@name": "answersheetEstimateStatus",

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

                        "beforeQuestionSeq": {
                            "type": "number",
                            "required": true,
                            "@alias": "beforeQuestionseq",
                            "@name": "beforeQuestionSeq"
                        },

                        "paperSubjectId": {
                            "type": "number",
                            "required": true,
                            "@alias": "papersubjectId",
                            "@name": "paperSubjectId"
                        },

                        "examBurnDate": {
                            "type": "string",
                            "required": true,
                            "@alias": "examBurndate",
                            "@name": "examBurnDate"
                        },

                        "examDuration": {
                            "type": "number",
                            "required": true,
                            "@alias": "examDuration",
                            "@name": "examDuration"
                        },

                        "upsLastPaperQuestionDetail": {
                            "type": "string",
                            "required": true,
                            "@alias": "upsLastpaperquestiondetail",
                            "@name": "upsLastPaperQuestionDetail"
                        },

                        "answersheetMarkingway": {
                            "type": "string",
                            "required": true,
                            "@alias": "answersheetMarkingway",
                            "@name": "answersheetMarkingway",

                            "@enums": [{
                                "type": "string",
                                "name": "A",
                                "value": "teacher"
                            }, {
                                "type": "string",
                                "name": "S",
                                "value": "custom"
                            }]
                        },

                        "answersheetReviews": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetReviews",
                            "@name": "answersheetReviews"
                        },

                        "answersheetModifieddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetModifieddate",
                            "@name": "answersheetModifieddate"
                        },

                        "systemTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "systemTime",
                            "@name": "systemTime"
                        },

                        "answersheetFirstTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "answersheetFirsttime",
                            "@name": "answersheetFirstTime"
                        }
                    },

                    "required": [
                        "paperId",
                        "classId",
                        "answersheetId",
                        "answersheetStatus",
                        "answersheetDurationTime",
                        "answersheetEstimateStatus",
                        "beforeQuestionSeq",
                        "paperSubjectId",
                        "examBurnDate",
                        "examDuration",
                        "upsLastPaperQuestionDetail",
                        "answersheetMarkingway",
                        "answersheetReviews",
                        "answersheetModifieddate",
                        "systemTime",
                        "answersheetFirstTime"
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
    var pluginName = "nl:qb/query-answersheet-detail";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.QB0019.query-answersheet-detail.options.js"
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
            "nl:qb/query-answersheet-detail$options=./api.QB0019.query-answersheet-detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();