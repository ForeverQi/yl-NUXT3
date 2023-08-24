/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "uc", apiAlias = "query-user-order-list-detail";

        var apiDefinition = {
            api: "fo/order/list/userOrder/detail",
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
                    "title": "微课订单列表(新)-详细",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "activityId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "activityId",
                            "@name": "activityId"
                        },

                        "status": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "status",
                            "@name": "status"
                        },

                        "orderBelongto": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderBelongto",
                            "@name": "orderBelongto",

                            "@enums": [{
                                "type": "string",
                                "name": "AT",
                                "value": "AT"
                            }, {
                                "type": "string",
                                "name": "OS",
                                "value": "OS"
                            }, {
                                "type": "string",
                                "name": "DC",
                                "value": "DC"
                            }, {
                                "type": "string",
                                "name": "MP",
                                "value": "MP"
                            }]
                        },

                        "orderSource": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "orderSource",
                            "@name": "orderSource",

                            "@enums": [{
                                "type": "string",
                                "name": "OP",
                                "value": "OP"
                            }, {
                                "type": "string",
                                "name": "OA",
                                "value": "OA"
                            }, {
                                "type": "string",
                                "name": "YP",
                                "value": "YP"
                            }, {
                                "type": "string",
                                "name": "YA",
                                "value": "YA"
                            }, {
                                "type": "string",
                                "name": "TM",
                                "value": "TM"
                            }, {
                                "type": "string",
                                "name": "JD",
                                "value": "JD"
                            }, {
                                "type": "string",
                                "name": "DA",
                                "value": "DA"
                            }, {
                                "type": "string",
                                "name": "YOULU.TEACHER.APP",
                                "value": "YOULU.TEACHER.APP"
                            }]
                        },

                        "pageSize": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        }
                    },

                    "required": ["pageSize", "pageIndex"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "微课订单列表(新)-详细",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        },

                        "data": {
                            "type": "array",
                            "required": false,
                            "default": "",
                            "items": {},
                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": []
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

    var pluginName = "nl:uc/query-user-order-list-detail";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.FO2005.query-user-order-list-detail.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:uc/query-user-order-list-detail$options=./api.FO2005.query-user-order-list-detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();