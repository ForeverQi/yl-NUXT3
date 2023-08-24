/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "igt", apiAlias = "user-class-suggest";

        var apiDefinition = {
            api: "igt/user/class/suggest",
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
                    "title": "学习报告做题建议",
                    "description": "学习报告中查询学习建议",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "pypId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "pypId",
                            "@name": "pypId"
                        },

                        "ucsCompulsoryRate": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "ucsCompulsoryRate",
                            "@name": "ucsCompulsoryRate"
                        }
                    },

                    "required": ["classId", "pypId", "ucsCompulsoryRate"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "学习报告做题建议",
                    "description": "学习报告中查询学习建议",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["type", "avgRate", "selfRate", "content"],

                        "properties": {
                            "type": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "type",
                                "@name": "type",

                                "@enums": [{
                                    "type": "string",
                                    "name": "C",
                                    "value": "C"
                                }, {
                                    "type": "string",
                                    "name": "Q",
                                    "value": "Q"
                                }]
                            },

                            "avgRate": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "avgRate",
                                "@name": "avgRate"
                            },

                            "selfRate": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "selfRate",
                                "@name": "selfRate"
                            },

                            "content": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "content",
                                "@name": "content"
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
    var pluginName = "nl:igt/user-class-suggest";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..user-class-suggest.options.js"
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
            "nl:igt/user-class-suggest$options=./api..user-class-suggest.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();