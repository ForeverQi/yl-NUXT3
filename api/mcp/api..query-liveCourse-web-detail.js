/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "mcp", apiAlias = "query-liveCourse-web-detail";

        var apiDefinition = {
            api: "mcp/liveCourse/web/detail",
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
                    "title": "查询公开课直播课详情",
                    "description": "直播课-详情(web)",
                    "type": "object",

                    "properties": {
                        "goodsId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "goodsId",
                            "@name": "goodsId"
                        }
                    },

                    "required": ["goodsId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询公开课直播课详情",
                    "description": "直播课-详情(web)",
                    "type": "object",

                    "properties": {
                        "appletCover": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "appletCover",
                            "@name": "appletCover"
                        },

                        "appointmentStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "appointmentStatus",
                            "@name": "appointmentStatus",

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

                        "courseEndTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseEndTime",
                            "@name": "courseEndTime"
                        },

                        "courseStartTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseStartTime",
                            "@name": "courseStartTime"
                        },

                        "courseStatus": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "courseStatus",
                            "@name": "courseStatus",

                            "@enums": [{
                                "type": "string",
                                "name": "1",
                                "value": "1"
                            }, {
                                "type": "string",
                                "name": "2",
                                "value": "2"
                            }, {
                                "type": "string",
                                "name": "3",
                                "value": "3"
                            }, {
                                "type": "string",
                                "name": "4",
                                "value": "4"
                            }]
                        },

                        "goodsCover": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "goodsCover",
                            "@name": "goodsCover"
                        },

                        "goodsName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "goodsName",
                            "@name": "goodsName"
                        },

                        "liveCourseUrl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "liveCourseUrl",
                            "@name": "liveCourseUrl"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectIds",
                            "@name": "projectId"
                        },

                        "projectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectNames",
                            "@name": "projectName"
                        },

                        "resourceId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "resourceId",
                            "@name": "resourceId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectIds",
                            "@name": "subjectId"
                        },

                        "subjectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectNames",
                            "@name": "subjectName"
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

                        "teacherImage": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "teacherImage",
                            "@name": "teacherImage"
                        },

                        "avlStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "avlStatus",
                            "@name": "avlStatus",

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

                        "delStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "delStatus",
                            "@name": "delStatus",

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

                        "wareDtoList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "auditionDuration",
                                    "auditionStatus",
                                    "coursewareDuration",
                                    "coursewareId",
                                    "coursewareName",
                                    "coursewarePath",
                                    "coursewareSeq",
                                    "coursewareStatus"
                                ],

                                "properties": {
                                    "auditionDuration": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "auditionDuration",
                                        "@name": "auditionDuration"
                                    },

                                    "auditionStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "auditionStatus",
                                        "@name": "auditionStatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "L",
                                            "value": "L"
                                        }, {
                                            "type": "string",
                                            "name": "N",
                                            "value": "N"
                                        }, {
                                            "type": "string",
                                            "name": "F",
                                            "value": "F"
                                        }]
                                    },

                                    "coursewareDuration": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareDuration",
                                        "@name": "coursewareDuration"
                                    },

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

                                    "coursewarePath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewarePath",
                                        "@name": "coursewarePath"
                                    },

                                    "coursewareSeq": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareSeq",
                                        "@name": "coursewareSeq"
                                    },

                                    "coursewareStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareStatus",
                                        "@name": "coursewareStatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "Y",
                                            "value": "Y"
                                        }, {
                                            "type": "string",
                                            "name": "N",
                                            "value": "N"
                                        }]
                                    }
                                }
                            },

                            "@alias": "wareDtoList",
                            "@name": "wareDtoList"
                        },

                        "lights": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": [],

                                "properties": {
                                    "map": {
                                        "type": "object",
                                        "required": [],

                                        "properties": {
                                            "title": {
                                                "type": "string",
                                                "required": false,
                                                "@alias": "title",
                                                "@name": "title"
                                            },

                                            "content": {
                                                "type": "string",
                                                "required": false,
                                                "@alias": "content",
                                                "@name": "content"
                                            },

                                            "type": {
                                                "type": "string",
                                                "required": false,
                                                "@alias": "type",
                                                "@name": "type"
                                            }
                                        },

                                        "@alias": "map",
                                        "@name": "map"
                                    }
                                }
                            },

                            "@alias": "lights",
                            "@name": "lights"
                        },

                        "teacherList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "teachProjectListVos",
                                    "teacherBrief",
                                    "teacherId",
                                    "teacherImage",
                                    "teacherNickname",
                                    "userName"
                                ],

                                "properties": {
                                    "teachProjectListVos": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["projectId", "projectName"],

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
                                                }
                                            }
                                        },

                                        "@alias": "teachProjectListVos",
                                        "@name": "teachProjectListVos"
                                    },

                                    "teacherBrief": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "teacherBrief",
                                        "@name": "teacherBrief"
                                    },

                                    "teacherId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "teacherId",
                                        "@name": "teacherId"
                                    },

                                    "teacherImage": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "teacherImage",
                                        "@name": "teacherImage"
                                    },

                                    "teacherNickname": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "teacherNickname",
                                        "@name": "teacherNickname"
                                    },

                                    "userName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "userName",
                                        "@name": "userName"
                                    }
                                }
                            },

                            "@alias": "teacherList",
                            "@name": "teacherList"
                        }
                    },

                    "required": [
                        "appletCover",
                        "appointmentStatus",
                        "courseEndTime",
                        "courseStartTime",
                        "courseStatus",
                        "goodsCover",
                        "goodsName",
                        "liveCourseUrl",
                        "projectId",
                        "projectName",
                        "resourceId",
                        "subjectId",
                        "subjectName",
                        "teacherId",
                        "teacherName",
                        "teacherImage",
                        "avlStatus",
                        "delStatus",
                        "wareDtoList",
                        "lights",
                        "teacherList"
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
    var pluginName = "nl:mcp/query-liveCourse-web-detail";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-liveCourse-web-detail.options.js"
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
            "nl:mcp/query-liveCourse-web-detail$options=./api..query-liveCourse-web-detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();