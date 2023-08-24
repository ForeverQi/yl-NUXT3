/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-resourcevideo-associated-dot";

        var apiDefinition = {
            api: "rc/web/resourcevideo/associated/dot",
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
                    "title": "根据知识点或试题标识获取视频资源打点记录",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "associatedContentIds": {
                            "type": "array",
                            "required": true,
                            "default": "",
                            "items": {},
                            "@alias": "associatedContentIds",
                            "@name": "associatedContentIds"
                        },

                        "associatedContentType": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "associatedContentType",
                            "@name": "associatedContentType",

                            "@enums": [{
                                "type": "string",
                                "name": "K",
                                "value": "K"
                            }, {
                                "type": "string",
                                "name": "Q",
                                "value": "Q"
                            }]
                        }
                    },

                    "required": ["associatedContentIds", "associatedContentType"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "根据知识点或试题标识获取视频资源打点记录",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": ["vid", "startTime", "endTime", "associatedContentId"],

                        "properties": {
                            "vid": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "vid",
                                "@name": "vid"
                            },

                            "startTime": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "startTime",
                                "@name": "startTime"
                            },

                            "endTime": {
                                "type": "number",
                                "required": true,
                                "default": "",
                                "@alias": "endTime",
                                "@name": "endTime"
                            },

                            "associatedContentId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "associatedContentId",
                                "@name": "associatedContentId"
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
    var pluginName = "nl:qb/query-resourcevideo-associated-dot";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-resourcevideo-associated-dot.options.js"
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
            "nl:qb/query-resourcevideo-associated-dot$options=./api..query-resourcevideo-associated-dot.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();