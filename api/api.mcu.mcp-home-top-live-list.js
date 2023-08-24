/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "topLive", apiAlias = "mcp-home-top-live-list";

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
                    "title": "直播列表",
                    "description": "直播列表",
                    "type": "object",

                    "properties": {
                        "pageIndex": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "showClient": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "showClient",
                            "@name": "showClient"
                        },

                        "indexFlag": {
                            "type": "boolean",
                            "required": true,
                            "default": "",
                            "@alias": "indexFlag",
                            "@name": "indexFlag"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        }
                    },

                    "required": ["pageIndex", "pageSize", "showClient", "indexFlag", "projectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "直播列表",
                    "description": "直播列表",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "string",
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
                                "required": ["liveCover", "type", "shortType", "liveId", "liveStatus", "livePath"],

                                "properties": {
                                    "liveCover": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsCover",
                                        "@name": "liveCover"
                                    },

                                    "type": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectName",
                                        "@name": "type"
                                    },

                                    "shortType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectShortName",
                                        "@name": "shortType"
                                    },

                                    "liveId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsId",
                                        "@name": "liveId"
                                    },

                                    "liveStatus": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseStatus",
                                        "@name": "liveStatus"
                                    },

                                    "livePath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "liveUrlNoChatRoom",
                                        "@name": "livePath"
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

    var pluginName = "nl:topLive/mcp-home-top-live-list";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.mcu.mcp-home-top-live-list.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:topLive/mcp-home-top-live-list$options=./api.mcu.mcp-home-top-live-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
