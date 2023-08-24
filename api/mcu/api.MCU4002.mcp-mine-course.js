/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "myMicroClass", apiAlias = "mcp-mine-course";

        var apiDefinition = {
            api: "mcp/mine/course",
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
                    "title": "我的课程",
                    "description": "我的课程",
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
                    "title": "我的课程",
                    "description": "我的课程",
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
                                    "courseExpiredtime",
                                    "courseId",
                                    "courseName",
                                    "courseOpenstatus",
                                    "coursePicpath",
                                    "coursePrice",
                                    "coursePromotionprice",
                                    "coursewareAmount",
                                    "liveTime",
                                    "liveStatus",
                                    "avlStatus",
                                    "recentLiveTime",
                                    "projectId",
                                    "validStatus"
                                ],

                                "properties": {
                                    "courseExpiredtime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseExpiredtime",
                                        "@name": "courseExpiredtime"
                                    },

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

                                    "courseOpenstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "courseOpenstatus",
                                        "@name": "courseOpenstatus",

                                        "@enums": [{
                                            "type": "string",
                                            "name": "2",
                                            "value": "2"
                                        }, {
                                            "type": "string",
                                            "name": "3",
                                            "value": "3"
                                        }]
                                    },

                                    "coursePicpath": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePicpath",
                                        "@name": "coursePicpath"
                                    },

                                    "coursePrice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePrice",
                                        "@name": "coursePrice"
                                    },

                                    "coursePromotionprice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursePromotionprice",
                                        "@name": "coursePromotionprice"
                                    },

                                    "coursewareAmount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "coursewareAmount",
                                        "@name": "coursewareAmount"
                                    },

                                    "liveTime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "liveTime",
                                        "@name": "liveTime"
                                    },

                                    "liveStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "liveStatus",
                                        "@name": "liveStatus",

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

                                    "avlStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "avlStatus",
                                        "@name": "avlStatus"
                                    },

                                    "recentLiveTime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "recentLiveTime",
                                        "@name": "recentLiveTime"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "validStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "validStatus",
                                        "@name": "validStatus"
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

    var defineModule = new Function("return this")().defineModule;
    var pluginName = "nl:myMicroClass/mcp-mine-course";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.MCU4002.mcp-mine-course.options.js"
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
            "nl:myMicroClass/mcp-mine-course$options=./api.MCU4002.mcp-mine-course.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();