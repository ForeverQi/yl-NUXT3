/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "zhinengxuexi", apiAlias = "get-class-knowledge-stats";

        var apiDefinition = {
            api: "igt/user/class/knowledge/stats",
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
                    "title": "用户班级知识点统计",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classId",
                            "@name": "classId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        }
                    },

                    "required": ["classId", "subjectId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "用户班级知识点统计",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["proficiencyLevel", "num", "star", "num"],

                        "properties": {
                            "proficiencyLevel": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "proficiencyLevel",
                                "@name": "proficiencyLevel"
                            },

                            "num": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "num",
                                "@name": "num"
                            },

                            "star": {
                                "type": "array",
                                "required": true,
                                "default": "",

                                "items": {
                                    "type": "object",
                                    "required": ["starLevel"],

                                    "properties": {
                                        "starLevel": {
                                            "type": "number",
                                            "required": true,
                                            "default": "",
                                            "@alias": "starLevel",
                                            "@name": "starLevel"
                                        }
                                    }
                                },

                                "@alias": "star",
                                "@name": "star"
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
    var pluginName = "nl:zhinengxuexi/get-class-knowledge-stats";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..get-class-knowledge-stats.options.js"
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
            "nl:zhinengxuexi/get-class-knowledge-stats$options=./api..get-class-knowledge-stats.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();