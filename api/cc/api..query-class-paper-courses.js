/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-class-paper-courses";

        var apiDefinition = {
            api: "cc/user/class/in/paper/courses",
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
                    "title": "课内练习-根据班级查询课程信息列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "modulId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "moduleId",
                            "@name": "modulId"
                        },

                        "coursewareIds": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareIds",
                            "@name": "coursewareIds"
                        }
                    },

                    "required": ["classId", "subjectId", "modulId", "coursewareIds"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "课内练习-根据班级查询课程信息列表",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["courseId", "courseName", "courseSeq", "catalogShowStatus", "catalogInfos"],

                        "properties": {
                            "courseId": {
                                "type": "string",
                                "required": true,
                                "@alias": "courseId",
                                "@name": "courseId"
                            },

                            "courseName": {
                                "type": "string",
                                "required": true,
                                "@alias": "courseName",
                                "@name": "courseName"
                            },

                            "courseSeq": {
                                "type": "number",
                                "required": true,
                                "@alias": "courseSeq",
                                "@name": "courseSeq"
                            },

                            "catalogShowStatus": {
                                "type": "string",
                                "required": true,
                                "@alias": "catalogShowStatus",
                                "@name": "catalogShowStatus"
                            },

                            "catalogInfos": {
                                "type": "array",
                                "required": true,

                                "items": {
                                    "type": "object",
                                    "required": ["catalogId", "catalogName", "catalogSeq", "coursewareInfos"],

                                    "properties": {
                                        "catalogId": {
                                            "type": "string",
                                            "required": true,
                                            "@alias": "catalogId",
                                            "@name": "catalogId"
                                        },

                                        "catalogName": {
                                            "type": "string",
                                            "required": true,
                                            "@alias": "catalogName",
                                            "@name": "catalogName"
                                        },

                                        "catalogSeq": {
                                            "type": "number",
                                            "required": true,
                                            "@alias": "catalogSeq",
                                            "@name": "catalogSeq"
                                        },

                                        "coursewareInfos": {
                                            "type": "array",
                                            "required": true,

                                            "items": {
                                                "type": "object",
                                                "required": [],

                                                "properties": {
                                                    "coursewareId": {
                                                        "type": "string",
                                                        "required": false,
                                                        "@alias": "coursewareId",
                                                        "@name": "coursewareId"
                                                    },

                                                    "coursewareName": {
                                                        "type": "string",
                                                        "required": false,
                                                        "@alias": "coursewareName",
                                                        "@name": "coursewareName"
                                                    },

                                                    "coursewareSeq": {
                                                        "type": "number",
                                                        "required": false,
                                                        "@alias": "coursewareSeq",
                                                        "@name": "coursewareSeq"
                                                    },

                                                    "paperId": {
                                                        "type": "string",
                                                        "required": false,
                                                        "@alias": "paperId",
                                                        "@name": "paperId"
                                                    },

                                                    "questionTotal": {
                                                        "type": "string",
                                                        "required": false,
                                                        "@alias": "questionTotal",
                                                        "@name": "questionTotal"
                                                    },

                                                    "studyStatus": {
                                                        "type": "string",
                                                        "required": false,
                                                        "@alias": "studyStatus",
                                                        "@name": "studyStatus"
                                                    },

                                                    "answerSheetId": {
                                                        "type": "string",
                                                        "required": false,
                                                        "@alias": "answerSheetId",
                                                        "@name": "answerSheetId"
                                                    }
                                                }
                                            },

                                            "@alias": "coursewareInfos",
                                            "@name": "coursewareInfos"
                                        }
                                    }
                                },

                                "@alias": "catalogInfos",
                                "@name": "catalogInfos"
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
    var pluginName = "nl:cc/query-class-paper-courses";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-class-paper-courses.options.js"
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
            "nl:cc/query-class-paper-courses$options=./api..query-class-paper-courses.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
