/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "mcp", apiAlias = "query-open-class-live-calendar-list";

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
                    "title": "查询（首页和公开课）公开课直播日历",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "projectIds": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectIds",
                            "@name": "projectIds"
                        }
                    },

                    "required": ["projectIds"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询（首页和公开课）公开课直播日历",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "liveCourseId",
                            "liveCourseName",
                            "courseStartTime",
                            "courseStartTime",
                            "teachName",
                            "teachImg",
                            "courseAcrossPicPath",
                            "coursePortraitPicPath",
                            "lightList"
                        ],

                        "properties": {
                            "liveCourseId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "liveCourseId",
                                "@name": "liveCourseId"
                            },

                            "liveCourseName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "liveCourseName",
                                "@name": "liveCourseName"
                            },

                            "courseStartTime": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "courseStatus",
                                "@name": "courseStartTime",

                                "@enums": [{
                                    "type": "string",
                                    "name": "1",
                                    "value": "not-stat"
                                }, {
                                    "type": "string",
                                    "name": "2",
                                    "value": "doing"
                                }, {
                                    "type": "string",
                                    "name": "3",
                                    "value": "play-back"
                                }, {
                                    "type": "string",
                                    "name": "4",
                                    "value": "finished"
                                }]
                            },

                            "teachName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "teachName",
                                "@name": "teachName"
                            },

                            "teachImg": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "teachImg",
                                "@name": "teachImg"
                            },

                            "courseAcrossPicPath": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "courseWebPicPath",
                                "@name": "courseAcrossPicPath"
                            },

                            "coursePortraitPicPath": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "courseAppletPicPath",
                                "@name": "coursePortraitPicPath"
                            },

                            "lightList": {
                                "type": "array",
                                "required": true,
                                "default": "",

                                "items": {
                                    "type": "object",
                                    "required": ["content"],

                                    "properties": {
                                        "content": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "content",
                                            "@name": "content"
                                        }
                                    }
                                },

                                "@alias": "lights",
                                "@name": "lightList"
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
    var pluginName = "nl:mcp/query-open-class-live-calendar-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-open-class-live-calendar-list.options.js"
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
            "nl:mcp/query-open-class-live-calendar-list$options=./api..query-open-class-live-calendar-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();