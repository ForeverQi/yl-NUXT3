/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "dict", apiAlias = "query-cbn-noun-user-search-v2";

        var apiDefinition = {
            api: "cbn/noun/user/search/v2",
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
                    "title": "名词快查",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "names": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "names",
                            "@name": "names"
                        },

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "userId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "userId",
                            "@name": "userId"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "名词快查",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": [],

                        "properties": {
                            "subjectId": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "subjectId",
                                "@name": "subjectId"
                            },

                            "subjectName": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "subjectName",
                                "@name": "subjectName"
                            },

                            "groupId": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "groupId",
                                "@name": "groupId"
                            },

                            "text": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "text",
                                "@name": "text"
                            },

                            "video": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "video",
                                "@name": "video"
                            },

                            "referId": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "referId",
                                "@name": "referId"
                            },

                            "name": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "name",
                                "@name": "name"
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
    var pluginName = "nl:dict/query-cbn-noun-user-search-v2";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-cbn-noun-user-search-v2.options.js"
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
            "nl:dict/query-cbn-noun-user-search-v2$options=./api..query-cbn-noun-user-search-v2.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();