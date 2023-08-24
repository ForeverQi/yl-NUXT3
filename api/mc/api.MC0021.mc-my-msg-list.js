/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "mc", apiAlias = "mc-my-msg-list";

        var apiDefinition = {
            api: "mc/my/msg/list",
            apiModuleName: moduleName,
            apiAlias: apiAlias,

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
                    "title": "我的消息",
                    "description": "",
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

                        "mtBiztype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "mtBiztype",
                            "@name": "mtBiztype"
                        },

                        "loadTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "loadTime",
                            "@name": "loadTime"
                        },

                        "msgClienttype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "msgClienttype",
                            "@name": "msgClienttype"
                        },

                        "userId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        }
                    },

                    "required": [
                        "pageIndex",
                        "pageSize",
                        "mtBiztype",
                        "loadTime",
                        "msgClienttype",
                        "userId"
                    ]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "我的消息",
                    "description": "",
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
                                    "msgId",
                                    "userId",
                                    "channelId",
                                    "msgClienttype",
                                    "msgTitle",
                                    "msgContent",
                                    "mtBiztype",
                                    "msgCreateddate",
                                    "msgSenddate",
                                    "msgRecvdate",
                                    "msgOpenstatus"
                                ],

                                "properties": {
                                    "msgId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "msgId",
                                        "@name": "msgId"
                                    },

                                    "userId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "userId",
                                        "@name": "userId"
                                    },

                                    "channelId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "channelId",
                                        "@name": "channelId"
                                    },

                                    "msgClienttype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "msgClienttype",
                                        "@name": "msgClienttype"
                                    },

                                    "msgTitle": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "msgTitle",
                                        "@name": "msgTitle"
                                    },

                                    "msgContent": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "msgContent",
                                        "@name": "msgContent"
                                    },

                                    "mtBiztype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "mtBiztype",
                                        "@name": "mtBiztype"
                                    },

                                    "msgCreateddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "msgCreateddate",
                                        "@name": "msgCreateddate"
                                    },

                                    "msgSenddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "msgSenddate",
                                        "@name": "msgSenddate"
                                    },

                                    "msgRecvdate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "msgRecvdate",
                                        "@name": "msgRecvdate"
                                    },

                                    "msgOpenstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "msgOpenstatus",
                                        "@name": "msgOpenstatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "N",
                                            "value": "N"
                                        }, {
                                            "type": "string",
                                            "name": "Y",
                                            "value": "Y"
                                        }]
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

    var pluginName = "nl:mc/mc-my-msg-list";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MC0021.mc-my-msg-list.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:mc/mc-my-msg-list$options=./api.MC0021.mc-my-msg-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
