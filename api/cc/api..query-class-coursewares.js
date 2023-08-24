/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-class-coursewares";

        var apiDefinition = {
            api: "cc/user/class/info/coursewares",
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
                    "title": "班级课件页面-科目模块课程篇章课件列表",
                    "description": "根据篇章获取课件列表",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "classTypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classTypeId",
                            "@name": "classTypeId"
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

                        "courseModulId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseModulId",
                            "@name": "courseModulId"
                        },

                        "courseId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseId",
                            "@name": "courseId"
                        },

                        "courseElectiveStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseElectiveStatus",
                            "@name": "courseElectiveStatus"
                        },

                        "catalogId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "catalogId",
                            "@name": "catalogId"
                        },

                        "catalogElectiveStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "catalogElectiveStatus",
                            "@name": "catalogElectiveStatus"
                        }
                    },

                    "required": [
                        "classId",
                        "classTypeId",
                        "ctapId",
                        "subjectId",
                        "electiveShowStatus",
                        "modulId",
                        "courseModulId",
                        "courseId",
                        "courseElectiveStatus",
                        "catalogId",
                        "catalogElectiveStatus"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "班级课件页面-科目模块课程篇章课件列表",
                    "description": "根据篇章获取课件列表",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "coursewareId",
                            "coursewareName",
                            "coursewareType",
                            "coursewareElectiveStatus",
                            "coursewareStartTime",
                            "coursewareEndTime",
                            "coursewareDownloadUrl",
                            "coursewareBeginState",
                            "vid",
                            "coursewareLiveUrl",
                            "remindStatus",
                            "remindStatusName",
                            "coursewareDuration",
                            "keepstudyStatus",
                            "paperId",
                            "coursewareVideoProvider",
                            "teacherId",
                            "teacherName",
                            "coursewareSource"
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

                            "coursewareElectiveStatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareElectiveStatus",
                                "@name": "coursewareElectiveStatus"
                            },

                            "coursewareStartTime": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareStartTime",
                                "@name": "coursewareStartTime"
                            },

                            "coursewareEndTime": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareEndTime",
                                "@name": "coursewareEndTime"
                            },

                            "coursewareDownloadUrl": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareDownloadUrl",
                                "@name": "coursewareDownloadUrl"
                            },

                            "coursewareBeginState": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareBeginState",
                                "@name": "coursewareBeginState"
                            },

                            "vid": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "vid",
                                "@name": "vid"
                            },

                            "coursewareLiveUrl": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareLiveUrl",
                                "@name": "coursewareLiveUrl"
                            },

                            "remindStatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "remindStatus",
                                "@name": "remindStatus"
                            },

                            "remindStatusName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "remindStatusName",
                                "@name": "remindStatusName"
                            },

                            "coursewareDuration": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareDuration",
                                "@name": "coursewareDuration"
                            },

                            "keepstudyStatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "keepStatus",
                                "@name": "keepstudyStatus"
                            },

                            "paperId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "paperId",
                                "@name": "paperId"
                            },

                            "coursewareVideoProvider": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareVideoProvider",
                                "@name": "coursewareVideoProvider"
                            },

                            "teacherId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "teacherId",
                                "@name": "teacherId"
                            },

                            "teacherName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "teacherName",
                                "@name": "teacherName"
                            },

                            "coursewareSource": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "coursewareSource",
                                "@name": "coursewareSource"
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
    var pluginName = "nl:cc/query-class-coursewares";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-class-coursewares.options.js"
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
            "nl:cc/query-class-coursewares$options=./api..query-class-coursewares.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
