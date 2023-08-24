/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "myMicroClass", apiAlias = "mcp-mine-appointment";

        var apiDefinition = {
            api: "mcp/mine/appointment",
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
                    "title": "我的预约",
                    "description": "我的预约",
                    "type": "object",

                    "properties": {
                        "pageIndex": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "我的预约",
                    "description": "我的预约",
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
                                    "courseId",
                                    "courseName",
                                    "courseWebPicPath",
                                    "courseStatus",
                                    "liveTime",
                                    "avlStatus",
                                    "projectId",
                                    "diffDateMinute"
                                ],

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

                                    "courseWebPicPath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseWebPicPath",
                                        "@name": "courseWebPicPath"
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

                                    "liveTime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "liveTime",
                                        "@name": "liveTime"
                                    },

                                    "avlStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "avlStatus",
                                        "@name": "avlStatus"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "diffDateMinute": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "diffDateMinute",
                                        "@name": "diffDateMinute"
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

    var pluginName = "nl:myMicroClass/mcp-mine-appointment";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU4003.mcp-mine-appointment.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:myMicroClass/mcp-mine-appointment$options=./api.MCU4003.mcp-mine-appointment.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();