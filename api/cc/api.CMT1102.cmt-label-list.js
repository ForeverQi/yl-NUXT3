/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "cmt-label-list";

        var apiDefinition = {
            api: "cmt/label/list",
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
                    "title": "标签-列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "lableType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "lableType",
                            "@name": "lableType",

                            "@enums": [{
                                "type": "string",
                                "name": "TC",
                                "value": "TC"
                            }, {
                                "type": "string",
                                "name": "LC",
                                "value": "LC"
                            }, {
                                "type": "string",
                                "name": "FC",
                                "value": "FC"
                            }, {
                                "type": "string",
                                "name": "HT",
                                "value": "HT"
                            }]
                        },

                        "lableLevel": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "lableLevel",
                            "@name": "lableLevel"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "标签-列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["lableType", "typeLables"],

                                "properties": {
                                    "lableType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "lableType",
                                        "@name": "lableType"
                                    },

                                    "typeLables": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["level", "levelDesc", "lables"],

                                            "properties": {
                                                "level": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "level",
                                                    "@name": "level"
                                                },

                                                "levelDesc": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "levelDesc",
                                                    "@name": "levelDesc"
                                                },

                                                "lables": {
                                                    "type": "array",
                                                    "required": true,
                                                    "default": "",

                                                    "items": {
                                                        "type": "object",
                                                        "required": ["lableId", "lableName"],

                                                        "properties": {
                                                            "lableId": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "lableId",
                                                                "@name": "lableId"
                                                            },

                                                            "lableName": {
                                                                "type": "string",
                                                                "required": true,
                                                                "default": "",
                                                                "@alias": "lableName",
                                                                "@name": "lableName"
                                                            }
                                                        }
                                                    },

                                                    "@alias": "lables",
                                                    "@name": "lables"
                                                }
                                            }
                                        },

                                        "@alias": "typeLables",
                                        "@name": "typeLables"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["data"]
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
    var pluginName = "nl:cc/cmt-label-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CMT1102.cmt-label-list.options.js"
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
            "nl:cc/cmt-label-list$options=./api.CMT1102.cmt-label-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();