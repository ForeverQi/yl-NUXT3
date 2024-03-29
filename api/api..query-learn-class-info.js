/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-learn-class-info";

        var apiDefinition = {
            api: "cc/user/class/info/byid",
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
                    "title": "根据班级标识查询班级信息",
                    "description": "获取班级详情",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "@alias": "classId",
                            "@name": "classId"
                        }
                    },

                    "required": ["classId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "根据班级标识查询班级信息",
                    "description": "获取班级详情",
                    "type": "object",

                    "properties": {
                        "className": {
                            "type": "string",
                            "required": true,
                            "@alias": "className",
                            "@name": "className"
                        },

                        "classTypeId": {
                            "type": "string",
                            "required": true,
                            "@alias": "classTypeId",
                            "@name": "classTypeId"
                        },

                        "projectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectName": {
                            "type": "string",
                            "required": true,
                            "@alias": "projectName",
                            "@name": "projectName"
                        },

                        "pypId": {
                            "type": "string",
                            "required": true,
                            "@alias": "pypId",
                            "@name": "pypId"
                        }
                    },

                    "required": ["className", "classTypeId", "projectId", "projectName", "pypId"]
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
    var pluginName = "nl:cc/query-learn-class-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-learn-class-info.options.js"
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
            "nl:cc/query-learn-class-info$options=./api..query-learn-class-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();