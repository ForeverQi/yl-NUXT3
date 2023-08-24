/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-course-catalog-courseware-tree";

        var apiDefinition = {
            api: "cc/user/course/catalog/courseware/list",
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
                    "title": "课程篇章课件列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classtypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeId",
                            "@name": "classtypeId"
                        },

                        "modulId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "modulId",
                            "@name": "modulId"
                        }
                    },

                    "required": ["classtypeId", "modulId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "课程篇章课件列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "courseList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["courseId", "courseName", "courseUpdateTimeDesc", "catalogList"],

                                "properties": {
                                    "courseId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseId",
                                        "@name": "courseId"
                                    },

                                    "courseName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseName",
                                        "@name": "courseName"
                                    },

                                    "courseUpdateTimeDesc": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseUpdateTimeDesc",
                                        "@name": "courseUpdateTimeDesc"
                                    },

                                    "catalogList": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["catalogId", "catalogName", "coursewareList"],

                                            "properties": {
                                                "catalogId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "catalogId",
                                                    "@name": "catalogId"
                                                },

                                                "catalogName": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "catalogName",
                                                    "@name": "catalogName"
                                                },

                                                "coursewareList": {
                                                    "type": "array",
                                                    "required": true,
                                                    "default": "",

                                                    "items": {
                                                        "type": "object",

                                                        "required": [
                                                            "coursewareId",
                                                            "coursewareName",
                                                            "coursewareType",
                                                            "paperId",
                                                            "coursewareStarttime",
                                                            "coursewareOnlineurl",
                                                            "coursewareStar",
                                                            "coursewareSize",
                                                            "coursewareDuration",
                                                            "ctwAuditionstatus",
                                                            "paperQuestionTotal"
                                                        ],

                                                        "properties": {
                                                            "coursewareId": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "coursewareId",
                                                                "@name": "coursewareId"
                                                            },

                                                            "coursewareName": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "coursewareName",
                                                                "@name": "coursewareName"
                                                            },

                                                            "coursewareType": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "coursewareType",
                                                                "@name": "coursewareType",

                                                                "@enums": [{
                                                                    "type": "string",
                                                                    "name": "S",
                                                                    "value": "video"
                                                                }, {
                                                                    "type": "string",
                                                                    "name": "L",
                                                                    "value": "live"
                                                                }, {
                                                                    "type": "string",
                                                                    "name": "P",
                                                                    "value": "paper"
                                                                }, {
                                                                    "type": "string",
                                                                    "name": "E",
                                                                    "value": "exe"
                                                                }, {
                                                                    "type": "string",
                                                                    "name": "H",
                                                                    "value": "handout"
                                                                }, {
                                                                    "type": "string",
                                                                    "name": "F",
                                                                    "value": "face"
                                                                }, {
                                                                    "type": "string",
                                                                    "name": "O",
                                                                    "value": "other"
                                                                }]
                                                            },

                                                            "paperId": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "paperId",
                                                                "@name": "paperId"
                                                            },

                                                            "coursewareStarttime": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "coursewareStarttime",
                                                                "@name": "coursewareStarttime"
                                                            },

                                                            "coursewareOnlineurl": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "coursewareOnlineurl",
                                                                "@name": "coursewareOnlineurl"
                                                            },

                                                            "coursewareStar": {
                                                                "type": "number",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "coursewareStar",
                                                                "@name": "coursewareStar"
                                                            },

                                                            "coursewareSize": {
                                                                "type": "number",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "coursewareSize",
                                                                "@name": "coursewareSize"
                                                            },

                                                            "coursewareDuration": {
                                                                "type": "number",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "coursewareDuration",
                                                                "@name": "coursewareDuration"
                                                            },

                                                            "ctwAuditionstatus": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "ctwAuditionstatus",
                                                                "@name": "ctwAuditionstatus"
                                                            },

                                                            "paperQuestionTotal": {
                                                                "type": "number",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "paperQuestionTotal",
                                                                "@name": "paperQuestionTotal"
                                                            }
                                                        }
                                                    },

                                                    "@alias": "coursewareList",
                                                    "@name": "coursewareList"
                                                }
                                            }
                                        },

                                        "@alias": "catalogList",
                                        "@name": "catalogList"
                                    }
                                }
                            },

                            "@alias": "courseList",
                            "@name": "courseList"
                        }
                    },

                    "required": ["courseList"]
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
    var pluginName = "nl:cc/query-course-catalog-courseware-tree";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-course-catalog-courseware-tree.options.js"
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
            "nl:cc/query-course-catalog-courseware-tree$options=./api..query-course-catalog-courseware-tree.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();