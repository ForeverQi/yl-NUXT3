/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "query-class-extend-status";

        var apiDefinition = {
            api: "cc/user/class/info/extend/pypconfig",
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
                    "title": "班级是否开启智能学习和ai随堂练",
                    "description": "查询班级是否开启了智能学习活着ai随堂练",
                    "type": "object",

                    "properties": {
                        "pypId": {
                            "type": "string",
                            "required": true,
                            "@alias": "pypId",
                            "@name": "pypId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "modulId": {
                            "type": "string",
                            "required": true,
                            "@alias": "moduleId",
                            "@name": "modulId"
                        }
                    },

                    "required": ["pypId", "subjectId", "modulId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "班级是否开启智能学习和ai随堂练",
                    "description": "查询班级是否开启了智能学习活着ai随堂练",
                    "type": "object",

                    "properties": {
                        "wisdomStatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "wisdomStatus",
                            "@name": "wisdomStatus"
                        },

                        "interactionStatus": {
                            "type": "string",
                            "required": true,
                            "@alias": "interactionStatus",
                            "@name": "interactionStatus"
                        }
                    },

                    "required": ["wisdomStatus", "interactionStatus"]
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
    var pluginName = "nl:cc/query-class-extend-status";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-class-extend-status.options.js"
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
            "nl:cc/query-class-extend-status$options=./api..query-class-extend-status.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
