/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "qb-business-subject-convert";

        var apiDefinition = {
            api: "qb/business/subject/convert",
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
                    "title": "科目转换",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "bdsubjectIds": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "bdsubjectIds",
                            "@name": "bdsubjectIds"
                        }
                    },

                    "required": ["bdsubjectIds"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "科目转换",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "subjectInfos": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "subjectId",
                                    "subjectName",
                                    "bdsubjectId",
                                    "classId",
                                    "projectId",
                                    "className",
                                    "classCode"
                                ],

                                "properties": {
                                    "subjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectId",
                                        "@name": "subjectId"
                                    },

                                    "subjectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectName",
                                        "@name": "subjectName"
                                    },

                                    "bdsubjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "bdsubjectId",
                                        "@name": "bdsubjectId"
                                    },

                                    "classId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classId",
                                        "@name": "classId"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "className": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "className",
                                        "@name": "className"
                                    },

                                    "classCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classCode",
                                        "@name": "classCode"
                                    }
                                }
                            },

                            "@alias": "subjectInfos",
                            "@name": "subjectInfos"
                        }
                    },

                    "required": ["subjectInfos"]
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
    var pluginName = "nl:qb/qb-business-subject-convert";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..qb-business-subject-convert.options.js"
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
            "nl:qb/qb-business-subject-convert$options=./api..qb-business-subject-convert.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();