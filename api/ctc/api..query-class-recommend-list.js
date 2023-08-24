/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "ctc", apiAlias = "query-class-recommend-list";

        var apiDefinition = {
            api: "ctc/classtype/recommend/list",
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
                    "title": "系统课-同类好课",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "pageSize": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "classtypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeId",
                            "@name": "classtypeId"
                        },

                        "areacode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "areacode",
                            "@name": "areacode"
                        },

                        "classtypeShowitem": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeShowitem",
                            "@name": "classtypeShowitem"
                        },

                        "projectIds": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectIds",
                            "@name": "projectIds"
                        }
                    },

                    "required": ["classtypeId", "areacode", "classtypeShowitem", "projectIds"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "系统课-同类好课",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "count",
                            "@name": "count"
                        },

                        "data": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "classtypeId",
                                    "classtypeName",
                                    "classtypeAppcoverimgurl",
                                    "projectId",
                                    "classtypeHighlights",
                                    "classtypeHotstatus",
                                    "currentAreaStatus"
                                ],

                                "properties": {
                                    "classtypeId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeId",
                                        "@name": "classtypeId"
                                    },

                                    "classtypeName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeName",
                                        "@name": "classtypeName"
                                    },

                                    "classtypeAppcoverimgurl": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeAppcoverimgurl",
                                        "@name": "classtypeAppcoverimgurl"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "classtypeHighlights": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeHighlights",
                                        "@name": "classtypeHighlights"
                                    },

                                    "classtypeHotstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeHotstatus",
                                        "@name": "classtypeHotstatus"
                                    },

                                    "currentAreaStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "currentAreaStatus",
                                        "@name": "currentAreaStatus"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["count", "data"]
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
    var pluginName = "nl:ctc/query-class-recommend-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-class-recommend-list.options.js"
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
            "nl:ctc/query-class-recommend-list$options=./api..query-class-recommend-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();