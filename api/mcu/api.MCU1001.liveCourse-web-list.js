/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "zhibomokuai", apiAlias = "liveCourse-web-list";

        var apiDefinition = {
            api: "mcp/liveCourse/web/list",
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
                    "title": "直播课-列表(web)",
                    "description": "直播课-列表(web)",
                    "type": "object",

                    "properties": {
                        "courseStatus": {
                            "type": "string",
                            "required": false,
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

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "showClient": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "showClient",
                            "@name": "showClient",

                            "@enums": [{
                                "type": "string",
                                "name": "W",
                                "value": "W"
                            }, {
                                "type": "string",
                                "name": "S",
                                "value": "S"
                            }]
                        },

                        "subjectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "indexFlag": {
                            "type": "boolean",
                            "required": false,
                            "default": "false",
                            "@alias": "indexFlag",
                            "@name": "indexFlag"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        }
                    },

                    "required": ["pageIndex", "pageSize"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "直播课-列表(web)",
                    "description": "直播课-列表(web)",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        },

                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "appletCover",
                                    "appointmentStatus",
                                    "courseEndTime",
                                    "courseStartTime",
                                    "courseStatus",
                                    "currentTime",
                                    "goodsCover",
                                    "goodsId",
                                    "goodsName",
                                    "projectId",
                                    "projectName",
                                    "subjectId",
                                    "subjectName",
                                    "teacherId",
                                    "teacherImage",
                                    "teacherName"
                                ],

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

                                    "currentTime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "currentTime",
                                        "@name": "currentTime"
                                    },

                                    "goodsCover": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsCover",
                                        "@name": "goodsCover"
                                    },

                                    "goodsId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsId",
                                        "@name": "goodsId"
                                    },

                                    "goodsName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsName",
                                        "@name": "goodsName"
                                    },

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

                                    "teacherName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "teacherName",
                                        "@name": "teacherName"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["count", "data"]
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

    var pluginName = "nl:zhibomokuai/liveCourse-web-list";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU1001.liveCourse-web-list.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:zhibomokuai/liveCourse-web-list$options=./api.MCU1001.liveCourse-web-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();