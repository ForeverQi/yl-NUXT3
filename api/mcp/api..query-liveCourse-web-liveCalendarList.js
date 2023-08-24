/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "mcp", apiAlias = "query-liveCourse-web-liveCalendarList";

        var apiDefinition = {
            api: "mcp/liveCourseWeb/web/liveCalendarList",
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
                    "title": "官网首页公开课直播日历和公开课列表直播日历",
                    "description": "首页、公开课列表页，直播日历",
                    "type": "object",

                    "properties": {
                        "projectIds": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectIds",
                            "@name": "projectIds"
                        },

                        "findCount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "findCount",
                            "@name": "findCount"
                        },

                        "showClient": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "showClient",
                            "@name": "showClient"
                        }
                    },

                    "required": ["projectIds", "findCount", "showClient"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "官网首页公开课直播日历和公开课列表直播日历",
                    "description": "首页、公开课列表页，直播日历",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": [],

                        "properties": {
                            "goodsId": {
                                "type": "string",
                                "required": false,
                                "@alias": "goodsId",
                                "@name": "goodsId"
                            },

                            "goodsName": {
                                "type": "string",
                                "required": false,
                                "@alias": "goodsName",
                                "@name": "goodsName"
                            },

                            "courseStartTime": {
                                "type": "string",
                                "required": false,
                                "@alias": "courseStartTime",
                                "@name": "courseStartTime"
                            },

                            "courseStatus": {
                                "type": "number",
                                "required": false,
                                "@alias": "courseStatus",
                                "@name": "courseStatus"
                            },

                            "teacherName": {
                                "type": "string",
                                "required": false,
                                "@alias": "teacherName",
                                "@name": "teacherName"
                            },

                            "teacherImage": {
                                "type": "string",
                                "required": false,
                                "@alias": "teacherImage",
                                "@name": "teacherImage"
                            },

                            "goodsCover": {
                                "type": "string",
                                "required": false,
                                "@alias": "goodsCover",
                                "@name": "goodsCover"
                            },

                            "appletCover": {
                                "type": "string",
                                "required": false,
                                "@alias": "appletCover",
                                "@name": "appletCover"
                            },

                            "lights": {
                                "type": "array",
                                "required": false,

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
                                "required": false,
                                "default": "",

                                "items": {
                                    "type": "object",
                                    "required": [],

                                    "properties": {
                                        "teachProjectListVos": {
                                            "type": "string",
                                            "required": false,
                                            "default": "",
                                            "@alias": "teachProjectListVos",
                                            "@name": "teachProjectListVos"
                                        },

                                        "teacherBrief": {
                                            "type": "string",
                                            "required": false,
                                            "default": "",
                                            "@alias": "teacherBrief",
                                            "@name": "teacherBrief"
                                        },

                                        "teacherId": {
                                            "type": "string",
                                            "required": false,
                                            "default": "",
                                            "@alias": "teacherId",
                                            "@name": "teacherId"
                                        },

                                        "teacherImage": {
                                            "type": "string",
                                            "required": false,
                                            "default": "",
                                            "@alias": "teacherImage",
                                            "@name": "teacherImage"
                                        },

                                        "teacherNickname": {
                                            "type": "string",
                                            "required": false,
                                            "default": "",
                                            "@alias": "teacherNickname",
                                            "@name": "teacherNickname"
                                        },

                                        "userName": {
                                            "type": "string",
                                            "required": false,
                                            "default": "",
                                            "@alias": "userName",
                                            "@name": "userName"
                                        }
                                    }
                                },

                                "@alias": "teacherList",
                                "@name": "teacherList"
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
    var pluginName = "nl:mcp/query-liveCourse-web-liveCalendarList";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-liveCourse-web-liveCalendarList.options.js"
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
            "nl:mcp/query-liveCourse-web-liveCalendarList$options=./api..query-liveCourse-web-liveCalendarList.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();