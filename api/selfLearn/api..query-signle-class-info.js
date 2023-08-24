/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "selfLearn", apiAlias = "query-signle-class-info";

        var apiDefinition = {
            api: "ctc/client/class/list/ample/complex",
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
                    "title": "班级及能续学下期产品信息（可能组合拆单科）",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "ampleComlexClassRequestVOS": {
                            "type": "array",
                            "required": true,

                            "items": {
                                "type": "object",
                                "required": ["oriClassId", "classDptId", "classtypeId", "classAsertype", "subjectList"],

                                "properties": {
                                    "oriClassId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "oriClassId",
                                        "@name": "oriClassId"
                                    },

                                    "classDptId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "classDptId",
                                        "@name": "classDptId"
                                    },

                                    "matchClassType": {
                                        "type": "string",
                                        "required": false,
                                        "@alias": "matchClassType",
                                        "@name": "matchClassType"
                                    },

                                    "classtypeId": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "classtypeId",
                                        "@name": "classtypeId"
                                    },

                                    "classAsertype": {
                                        "type": "string",
                                        "required": true,
                                        "@alias": "classAsertype",
                                        "@name": "classAsertype"
                                    },

                                    "subjectList": {
                                        "type": "array",
                                        "required": true,

                                        "items": {
                                            "type": "object",
                                            "required": ["subjectId", "gooodsStatus"],

                                            "properties": {
                                                "subjectId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "@alias": "subjectId",
                                                    "@name": "subjectId"
                                                },

                                                "gooodsStatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "@alias": "gooodsStatus",
                                                    "@name": "gooodsStatus"
                                                }
                                            }
                                        },

                                        "@alias": "subjectList",
                                        "@name": "subjectList"
                                    }
                                }
                            },

                            "@alias": "ampleComlexClassRequestVOS",
                            "@name": "ampleComlexClassRequestVOS"
                        }
                    },

                    "required": ["ampleComlexClassRequestVOS"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, undefined, {
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
    var pluginName = "nl:selfLearn/query-signle-class-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-signle-class-info.options.js"
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
            "nl:selfLearn/query-signle-class-info$options=./api..query-signle-class-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();