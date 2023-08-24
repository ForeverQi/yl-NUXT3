/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "topLive", apiAlias = "mcp-home-top-live-info";

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
                    "title": "直播详情",
                    "description": "直播详情",
                    "type": "object",

                    "properties": {
                        "goodsId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "liveId",
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
                    "title": "直播详情",
                    "description": "直播详情",
                    "type": "object",

                    "properties": {
                        "livePath": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "liveUrlNoChatRoom",
                            "@name": "livePath"
                        },

                        "name": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "goodsName",
                            "@name": "name"
                        },

                        "liveStatus": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "courseStatus",
                            "@name": "liveStatus"
                        },

                        "appointmentStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "appointmentStatus",
                            "@name": "appointmentStatus"
                        },

                        "liveStartTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseStartTime",
                            "@name": "liveStartTime"
                        },

                        "liveEndTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseEndTime",
                            "@name": "liveEndTime"
                        },

                        "currentTime": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "currentTime",
                            "@name": "currentTime"
                        },

                        "liveId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "goodsId",
                            "@name": "liveId"
                        },

                        "liveCover": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "goodsCover",
                            "@name": "liveCover"
                        },

                        "wareDtoList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["auditionDuration", "auditionStatus", "coursewareName", "coursewarePath"],

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
                                        "@name": "auditionStatus"
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
                                    }
                                }
                            },

                            "@alias": "wareDtoList",
                            "@name": "wareDtoList"
                        }
                    },

                    "required": [
                        "livePath",
                        "name",
                        "liveStatus",
                        "appointmentStatus",
                        "liveStartTime",
                        "liveEndTime",
                        "currentTime",
                        "liveId",
                        "liveCover",
                        "wareDtoList"
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

    var pluginName = "nl:topLive/mcp-home-top-live-info";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.mcu.mcp-home-top-live-info.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:topLive/mcp-home-top-live-info$options=./api.mcu.mcp-home-top-live-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
