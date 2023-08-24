/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "xieyiqueren", apiAlias = "query-readingAgr-find-man-reading";

        var apiDefinition = {
            api: "ctc/readingAgr/findManReading",
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
                    "title": "查询是否强制弹窗信息",
                    "description": "查询接口是否有强制弹出协议",
                    "type": "object",

                    "properties": {
                        "aptReadingFindDtoList": {
                            "type": "array",
                            "required": false,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": [],

                                "properties": {
                                    "classId": {
                                        "type": "string",
                                        "required": false,
                                        "default": "",
                                        "@alias": "classId",
                                        "@name": "classId"
                                    },

                                    "isOrderCenterPay": {
                                        "type": "string",
                                        "required": false,
                                        "default": "",
                                        "@alias": "isOrderCenterPay",
                                        "@name": "isOrderCenterPay"
                                    }
                                }
                            },

                            "@alias": "aptReadingFindDtoList",
                            "@name": "aptReadingFindDtoList"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询是否强制弹窗信息",
                    "description": "查询接口是否有强制弹出协议",
                    "type": "object",

                    "properties": {
                        "mandatoryReading": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "mandatoryReading",
                            "@name": "mandatoryReading"
                        },

                        "mandatoryReadingTime": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "mandatoryReadingTime",
                            "@name": "mandatoryReadingTime"
                        },

                        "downBottomReading": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "downBottomReading",
                            "@name": "downBottomReading"
                        },

                        "list": {
                            "type": "array",
                            "required": false,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": [],

                                "properties": {
                                    "classId": {
                                        "type": "string",
                                        "required": false,
                                        "default": "",
                                        "@alias": "classId",
                                        "@name": "classId"
                                    },

                                    "className": {
                                        "type": "string",
                                        "required": false,
                                        "default": "",
                                        "@alias": "className",
                                        "@name": "className"
                                    },

                                    "isAptReading": {
                                        "type": "string",
                                        "required": false,
                                        "default": "",
                                        "@alias": "isAptReading",
                                        "@name": "isAptReading"
                                    }
                                }
                            },

                            "@alias": "list",
                            "@name": "list"
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:xieyiqueren/query-readingAgr-find-man-reading";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-readingAgr-find-man-reading.options.js"
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
            "nl:xieyiqueren/query-readingAgr-find-man-reading$options=./api..query-readingAgr-find-man-reading.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();