/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "ecs", apiAlias = "query-teacher-info-batch";

        var apiDefinition = {
            api: "ecs/teacher/multiTeacherInfo",
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
                    "title": "教师信息批量获取",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "teacherIds": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "teacherIds",
                            "@name": "teacherIds"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": ["teacherIds", "projectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "教师信息批量获取",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "object",
                            "required": ["multiTeacherInfo"],
                            "default": "",

                            "properties": {
                                "multiTeacherInfo": {
                                    "type": "array",
                                    "required": true,
                                    "default": "",

                                    "items": {
                                        "type": "object",

                                        "required": [
                                            "teacherId",
                                            "userId",
                                            "userGender",
                                            "teacherListenurl",
                                            "teacherSeq",
                                            "teacherRecommendstatus",
                                            "teacherType",
                                            "teacherLevel",
                                            "teacherRewardruleamount",
                                            "teacherEducation",
                                            "teacherCategory",
                                            "teacherBrief",
                                            "teacherExperience",
                                            "teacherHelpstunum",
                                            "teacherFavorablerate",
                                            "teacherImage",
                                            "teacherCreater",
                                            "teacherCreateddate",
                                            "teacherModifier",
                                            "teacherModifieddate",
                                            "userName",
                                            "projectList"
                                        ],

                                        "properties": {
                                            "teacherId": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherId",
                                                "@name": "teacherId"
                                            },

                                            "userId": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "userId",
                                                "@name": "userId"
                                            },

                                            "userGender": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "userGender",
                                                "@name": "userGender"
                                            },

                                            "teacherListenurl": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherListenurl",
                                                "@name": "teacherListenurl"
                                            },

                                            "teacherSeq": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherSeq",
                                                "@name": "teacherSeq"
                                            },

                                            "teacherRecommendstatus": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherRecommendstatus",
                                                "@name": "teacherRecommendstatus"
                                            },

                                            "teacherType": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherType",
                                                "@name": "teacherType"
                                            },

                                            "teacherLevel": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherLevel",
                                                "@name": "teacherLevel"
                                            },

                                            "teacherRewardruleamount": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherRewardruleamount",
                                                "@name": "teacherRewardruleamount"
                                            },

                                            "teacherEducation": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherEducation",
                                                "@name": "teacherEducation"
                                            },

                                            "teacherCategory": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherCategory",
                                                "@name": "teacherCategory"
                                            },

                                            "teacherBrief": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherBrief",
                                                "@name": "teacherBrief"
                                            },

                                            "teacherExperience": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherExperience",
                                                "@name": "teacherExperience"
                                            },

                                            "teacherHelpstunum": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherHelpstunum",
                                                "@name": "teacherHelpstunum"
                                            },

                                            "teacherFavorablerate": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherFavorablerate",
                                                "@name": "teacherFavorablerate"
                                            },

                                            "teacherImage": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherImage",
                                                "@name": "teacherImage"
                                            },

                                            "teacherCreater": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherCreater",
                                                "@name": "teacherCreater"
                                            },

                                            "teacherCreateddate": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherCreateddate",
                                                "@name": "teacherCreateddate"
                                            },

                                            "teacherModifier": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherModifier",
                                                "@name": "teacherModifier"
                                            },

                                            "teacherModifieddate": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "teacherModifieddate",
                                                "@name": "teacherModifieddate"
                                            },

                                            "userName": {
                                                "type": "string",
                                                "required": true,
                                                "default": "",
                                                "@alias": "userName",
                                                "@name": "userName"
                                            },

                                            "projectList": {
                                                "type": "array",
                                                "required": true,
                                                "default": "",

                                                "items": {
                                                    "type": "object",
                                                    "required": ["projectId", "projectName", "subjectList", "subjectId", "subjectName"],

                                                    "properties": {
                                                        "projectId": {
                                                            "type": "string",
                                                            "required": true,
                                                            "default": "",
                                                            "@alias": "projectId",
                                                            "@name": "projectId"
                                                        },

                                                        "projectName": {
                                                            "type": "string",
                                                            "required": true,
                                                            "default": "",
                                                            "@alias": "projectName",
                                                            "@name": "projectName"
                                                        },

                                                        "subjectList": {
                                                            "type": "string",
                                                            "required": true,
                                                            "default": "",
                                                            "@alias": "subjectList",
                                                            "@name": "subjectList"
                                                        },

                                                        "subjectId": {
                                                            "type": "string",
                                                            "required": true,
                                                            "default": "",
                                                            "@alias": "subjectId",
                                                            "@name": "subjectId"
                                                        },

                                                        "subjectName": {
                                                            "type": "string",
                                                            "required": true,
                                                            "default": "",
                                                            "@alias": "subjectName",
                                                            "@name": "subjectName"
                                                        }
                                                    }
                                                },

                                                "@alias": "projectList",
                                                "@name": "projectList"
                                            }
                                        }
                                    },

                                    "@alias": "multiTeacherInfo",
                                    "@name": "multiTeacherInfo"
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["data"]
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
    var pluginName = "nl:ecs/query-teacher-info-batch";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.ECS1023.query-teacher-info-batch.options.js"
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
            "nl:ecs/query-teacher-info-batch$options=./api.ECS1023.query-teacher-info-batch.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();