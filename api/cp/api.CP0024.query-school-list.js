/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cp", apiAlias = "query-school-list";

        var apiDefinition = {
            api: "cp/data/school/list",
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
                    "title": "获取全国分校信息",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["provinceName", "schools"],

                        "properties": {
                            "provinceName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "provinceName",
                                "@name": "provinceName"
                            },

                            "schools": {
                                "type": "array",
                                "required": true,
                                "default": "",

                                "items": {
                                    "type": "object",
                                    "required": ["schoold", "schoolName", "address", "mobile", "telphone", "lng", "lat"],

                                    "properties": {
                                        "schoold": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "schoold",
                                            "@name": "schoold"
                                        },

                                        "schoolName": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "schoolName",
                                            "@name": "schoolName"
                                        },

                                        "address": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "address",
                                            "@name": "address"
                                        },

                                        "mobile": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "mobile",
                                            "@name": "mobile"
                                        },

                                        "telphone": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "telphone",
                                            "@name": "telphone"
                                        },

                                        "lng": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "lng",
                                            "@name": "lng"
                                        },

                                        "lat": {
                                            "type": "string",
                                            "required": true,
                                            "default": "",
                                            "@alias": "lat",
                                            "@name": "lat"
                                        }
                                    }
                                },

                                "@alias": "schools",
                                "@name": "schools"
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
    var pluginName = "nl:cp/query-school-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CP0024.query-school-list.options.js"
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
            "nl:cp/query-school-list$options=./api.CP0024.query-school-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();