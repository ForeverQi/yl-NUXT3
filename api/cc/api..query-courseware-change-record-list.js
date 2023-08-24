/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-courseware-change-record-list";

        var apiDefinition = {
            api: "cc/user/courseware/change/record/list",
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
                    "title": "我的系统课班级页面-课程更新明细",
                    "description": "查询课程更新列表",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        }
                    },

                    "required": ["classId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "我的系统课班级页面-课程更新明细",
                    "description": "查询课程更新列表",
                    "type": "object",

                    "properties": {
                        "moduleCourseList": {
                            "type": "array",
                            "required": false,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["moduleId", "moduleName", "courseCatalogList"],

                                "properties": {
                                    "moduleId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "moduleId",
                                        "@name": "moduleId"
                                    },

                                    "moduleName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "moduleName",
                                        "@name": "moduleName"
                                    },

                                    "courseCatalogList": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["courseId", "courseName", "catalogShowStatus", "catalogCoursewareList"],

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

                                                "catalogShowStatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "catalogShowStatus",
                                                    "@name": "catalogShowStatus",

                                                    "@enums": [{
                                                        "type": "string",
                                                        "name": "Y",
                                                        "value": "Y"
                                                    }, {
                                                        "type": "string",
                                                        "name": "N",
                                                        "value": "N"
                                                    }]
                                                },

                                                "catalogCoursewareList": {
                                                    "type": "array",
                                                    "required": true,
                                                    "default": "",

                                                    "items": {
                                                        "type": "object",
                                                        "required": ["catalogId", "catalogName", "coursewareInfoList"],

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

                                                            "coursewareInfoList": {
                                                                "type": "array",
                                                                "required": true,
                                                                "default": "",

                                                                "items": {
                                                                    "type": "object",

                                                                    "required": [
                                                                        "coursewareId",
                                                                        "coursewareName",
                                                                        "coursewareType",
                                                                        "coursewareDuration",
                                                                        "coursewareStar",
                                                                        "coursewareSize",
                                                                        "liveTime",
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
                                                                            "@name": "coursewareType"
                                                                        },

                                                                        "coursewareDuration": {
                                                                            "type": "number",
                                                                            "required": true,
                                                                            "default": "",
                                                                            "@alias": "coursewareDuration",
                                                                            "@name": "coursewareDuration"
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

                                                                        "liveTime": {
                                                                            "type": "string",
                                                                            "required": true,
                                                                            "default": "",
                                                                            "@alias": "liveTime",
                                                                            "@name": "liveTime"
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

                                                                "@alias": "coursewareInfoList",
                                                                "@name": "coursewareInfoList"
                                                            }
                                                        }
                                                    },

                                                    "@alias": "catalogCoursewareList",
                                                    "@name": "catalogCoursewareList"
                                                }
                                            }
                                        },

                                        "@alias": "courseCatalogList",
                                        "@name": "courseCatalogList"
                                    }
                                }
                            },

                            "@alias": "moduleCourseList",
                            "@name": "moduleCourseList"
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
    var pluginName = "nl:cc/query-courseware-change-record-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-courseware-change-record-list.options.js"
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
            "nl:cc/query-courseware-change-record-list$options=./api..query-courseware-change-record-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();