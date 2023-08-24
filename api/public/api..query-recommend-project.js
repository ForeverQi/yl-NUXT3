/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "public", apiAlias = "query-recommend-project";

        var apiDefinition = {
            api: "module/resource/web/recommend-project/queryObjs",
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
                return apiNameAndEnumConvert2(params, undefined);
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取首页推荐项目",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["collegeName", "projectCode", "projectId", "projectName", "projectSeocode"],

                        "properties": {
                            "collegeId": {
                                "type": "string",
                                "required": false,
                                "@alias": "collegeId",
                                "@name": "collegeId"
                            },

                            "collegeName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "collegeName",
                                "@name": "collegeName"
                            },

                            "projectCode": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectCode",
                                "@name": "projectCode"
                            },

                            "projectId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectId",
                                "@name": "projectId"
                            },

                            "projectName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectName",
                                "@name": "projectName"
                            },

                            "projectSeocode": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectSeocode",
                                "@name": "projectSeocode"
                            }
                        }
                    }
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
    var pluginName = "nl:public/query-recommend-project";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-recommend-project.options.js"
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
            "nl:public/query-recommend-project$options=./api..query-recommend-project.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
