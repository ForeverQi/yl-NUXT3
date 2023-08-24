/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-courseware-extends";

        var apiDefinition = {
            api: "cc/user/class/info/extend/courseware",
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
                    "title": "班级课件页面-科目课程课件扩展列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classTypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classTypeId",
                            "@name": "classTypeId"
                        },

                        "pypId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pypId",
                            "@name": "pypId"
                        },

                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "ctapId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ctapId",
                            "@name": "ctapId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "electiveShowStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "electiveShowStatus",
                            "@name": "electiveShowStatus"
                        },

                        "modulId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "moduleId",
                            "@name": "modulId"
                        },

                        "courseId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseId",
                            "@name": "courseId"
                        },

                        "coursewareInfos": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["coursewareId", "coursewareType", "paperId"],

                                "properties": {
                                    "coursewareId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareId",
                                        "@name": "coursewareId"
                                    },

                                    "coursewareType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareType",
                                        "@name": "coursewareType"
                                    },

                                    "paperId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "paperId",
                                        "@name": "paperId"
                                    }
                                }
                            },

                            "@alias": "coursewareInfos",
                            "@name": "coursewareInfos"
                        }
                    },

                    "required": [
                        "classTypeId",
                        "pypId",
                        "classId",
                        "ctapId",
                        "subjectId",
                        "electiveShowStatus",
                        "modulId",
                        "courseId",
                        "coursewareInfos"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "班级课件页面-科目课程课件扩展列表",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "coursewareId",
                            "studyStatus",
                            "knowledgeStarLevel",
                            "coursewarepaperRecords",
                            "stagePaperId",
                            "stageAnswersheetId",
                            "stageAswerSheetStatus",
                            "coursewarePaper",
                            "studyDuration"
                        ],

                        "properties": {
                            "coursewareId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareId",
                                "@name": "coursewareId"
                            },

                            "studyStatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "studyStatus",
                                "@name": "studyStatus"
                            },

                            "knowledgeStarLevel": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "knowledgeStarLevel",
                                "@name": "knowledgeStarLevel"
                            },

                            "coursewarepaperRecords": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursewarepaperRecords",
                                "@name": "coursewarepaperRecords"
                            },

                            "stagePaperId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "stagePaperId",
                                "@name": "stagePaperId"
                            },

                            "stageAnswersheetId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "stageAnswersheetId",
                                "@name": "stageAnswersheetId"
                            },

                            "stageAswerSheetStatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "stageAswerSheetStatus",
                                "@name": "stageAswerSheetStatus"
                            },

                            "coursewarePaper": {
                                "type": "object",

                                "required": [
                                    "answerTimeType",
                                    "answerBeginTime",
                                    "answerEndTime",
                                    "answerNumType",
                                    "answerNum",
                                    "answerStyle",
                                    "subjectiveQuestionGradingMethod",
                                    "answerNumLeft",
                                    "sysTimestamp"
                                ],

                                "default": "",

                                "properties": {
                                    "answerTimeType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerTimeType",
                                        "@name": "answerTimeType"
                                    },

                                    "answerBeginTime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerBeginTime",
                                        "@name": "answerBeginTime"
                                    },

                                    "answerEndTime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerEndTime",
                                        "@name": "answerEndTime"
                                    },

                                    "answerNumType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerNumType",
                                        "@name": "answerNumType"
                                    },

                                    "answerNum": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerNum",
                                        "@name": "answerNum"
                                    },

                                    "answerStyle": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerStyle",
                                        "@name": "answerStyle"
                                    },

                                    "subjectiveQuestionGradingMethod": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectiveQuestionGradingMethod",
                                        "@name": "subjectiveQuestionGradingMethod"
                                    },

                                    "answerNumLeft": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "answerNumLeft",
                                        "@name": "answerNumLeft"
                                    },

                                    "sysTimestamp": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "sysTimestamp",
                                        "@name": "sysTimestamp"
                                    }
                                },

                                "@alias": "coursewarePaper",
                                "@name": "coursewarePaper"
                            },

                            "studyDuration": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "studyDuration",
                                "@name": "studyDuration"
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
    var pluginName = "nl:cc/query-courseware-extends";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-courseware-extends.options.js"
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
            "nl:cc/query-courseware-extends$options=./api..query-courseware-extends.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
