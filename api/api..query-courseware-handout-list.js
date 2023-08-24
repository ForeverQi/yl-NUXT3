/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-courseware-handout-list";

        var apiDefinition = {
            api: "cc/user/courseware/handout/list",
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
                    "title": "课件下讲义列表",
                    "description": "获取课件下讲义列表",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "catalogIds": {
                            "type": "string",
                            "required": false,
                            "@alias": "catalogIds",
                            "@name": "catalogIds"
                        },

                        "coursewareId": {
                            "type": "string",
                            "required": false,
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        },

                        "subjectIds": {
                            "type": "string",
                            "required": false,
                            "@alias": "subjectIds",
                            "@name": "subjectIds"
                        },

                        "electiveStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "electiveStatus",
                            "@name": "electiveStatus"
                        }
                    },

                    "required": ["classId", "electiveStatus"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "课件下讲义列表",
                    "description": "获取课件下讲义列表",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": false,
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "modulId": {
                            "type": "string",
                            "required": false,
                            "@alias": "modulId",
                            "@name": "modulId"
                        },

                        "courseId": {
                            "type": "string",
                            "required": false,
                            "@alias": "courseId",
                            "@name": "courseId"
                        },

                        "catalogInfos": {
                            "type": "array",
                            "required": false,

                            "items": {
                                "type": "object",
                                "required": [],

                                "properties": {
                                    "catalogId": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "catalogId",
                                        "@name": "catalogId"
                                    },

                                    "handoutList": {
                                        "type": "array",
                                        "required": false,

                                        "items": {
                                            "type": "object",
                                            "required": [],

                                            "properties": {
                                                "coursewareId": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "coursewareId",
                                                    "@name": "coursewareId"
                                                },

                                                "coursewareType": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "coursewareType",
                                                    "@name": "coursewareType"
                                                },

                                                "coursewareEndtime": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "coursewareEndtime",
                                                    "@name": "coursewareEndtime"
                                                },

                                                "coursewareName": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "coursewareName",
                                                    "@name": "coursewareName"
                                                },

                                                "cowresourceId": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "cowresourceId",
                                                    "@name": "cowresourceId"
                                                },

                                                "cowresourceName": {
                                                    "type": "string",
                                                    "required": false,
                                                    "@alias": "cowresourceName",
                                                    "@name": "cowresourceName"
                                                },

                                                "cowresourceSize": {
                                                    "type": "number",
                                                    "required": false,
                                                    "@alias": "cowresourceSize",
                                                    "@name": "cowresourceSize"
                                                }
                                            }
                                        },

                                        "@alias": "handoutList",
                                        "@name": "handoutList"
                                    }
                                }
                            },

                            "@alias": "catalogInfos",
                            "@name": "catalogInfos"
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
    var pluginName = "nl:cc/query-courseware-handout-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-courseware-handout-list.options.js"
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
            "nl:cc/query-courseware-handout-list$options=./api..query-courseware-handout-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();