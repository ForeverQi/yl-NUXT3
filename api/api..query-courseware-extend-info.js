/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-courseware-extend-info";

        var apiDefinition = {
            api: "cc/user/courseware/play/extend/info",
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
                    "title": "查询课件播放扩展信息",
                    "description": "获取课件扩展字段接口",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "modulId": {
                            "type": "string",
                            "required": true,
                            "@alias": "modulId",
                            "@name": "modulId"
                        },

                        "coursewareId": {
                            "type": "string",
                            "required": true,
                            "@alias": "coursewareId",
                            "@name": "coursewareId"
                        }
                    },

                    "required": ["classId", "modulId", "coursewareId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询课件播放扩展信息",
                    "description": "获取课件扩展字段接口",
                    "type": "object",

                    "properties": {
                        "paperStatus": {
                            "type": "string",
                            "required": false,
                            "@alias": "paperStatus",
                            "@name": "paperStatus"
                        },

                        "paperId": {
                            "type": "string",
                            "required": false,
                            "@alias": "paperId",
                            "@name": "paperId"
                        },

                        "answersheetId": {
                            "type": "string",
                            "required": false,
                            "@alias": "answersheetId",
                            "@name": "answersheetId"
                        },

                        "mindPath": {
                            "type": "string",
                            "required": false,
                            "@alias": "mindPath",
                            "@name": "mindPath"
                        },

                        "lockedStatus": {
                            "type": "string",
                            "required": false,
                            "@alias": "lockedStatus",
                            "@name": "lockedStatus"
                        },

                        "lockedTip": {
                            "type": "string",
                            "required": false,
                            "@alias": "lockedTip",
                            "@name": "lockedTip"
                        },

                        "frontModuleIds": {
                            "type": "array",
                            "required": false,

                            "items": {
                                "type": "object",
                                "required": [],

                                "properties": {
                                    "frontModuleIds[n]": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "frontModuleIds[n]",
                                        "@name": "frontModuleIds[n]"
                                    }
                                }
                            },

                            "@alias": "frontModuleIds",
                            "@name": "frontModuleIds"
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
    var pluginName = "nl:cc/query-courseware-extend-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-courseware-extend-info.options.js"
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
            "nl:cc/query-courseware-extend-info$options=./api..query-courseware-extend-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();