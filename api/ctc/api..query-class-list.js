/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "ctc", apiAlias = "query-class-list";

        var apiDefinition = {
            api: "ctc/classtype/web/list",
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
                    "title": "系统课列表",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "pageIndex": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "collegeId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "collegeId",
                            "@name": "collegeId"
                        },

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "ptagId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "ptagId",
                            "@name": "ptagId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
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
                        }
                    },

                    "required": ["areacode", "classtypeShowitem"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "系统课列表",
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
                                    "classtypeHighlights",
                                    "currentAreaStatus",
                                    "orderTotal",
                                    "minPrice",
                                    "maxPrice",
                                    "minStdPrice",
                                    "maxStdPrice",
                                    "asertype",
                                    "ctapName",
                                    "auditionStatus",
                                    "classtypeHotstatus",
                                    "classtypeRecommendstatus"
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

                                    "classtypeHighlights": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeHighlights",
                                        "@name": "classtypeHighlights"
                                    },

                                    "currentAreaStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "currentAreaStatus",
                                        "@name": "currentAreaStatus"
                                    },

                                    "orderTotal": {
                                        "type": "number",
                                        "required": true,
                                        "default": "",
                                        "@alias": "orderTotal",
                                        "@name": "orderTotal"
                                    },

                                    "minPrice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "minPrice",
                                        "@name": "minPrice"
                                    },

                                    "maxPrice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "maxPrice",
                                        "@name": "maxPrice"
                                    },

                                    "minStdPrice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "minStdPrice",
                                        "@name": "minStdPrice"
                                    },

                                    "maxStdPrice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "maxStdPrice",
                                        "@name": "maxStdPrice"
                                    },

                                    "asertype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "asertype",
                                        "@name": "asertype"
                                    },

                                    "ctapName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "ctapName",
                                        "@name": "ctapName"
                                    },

                                    "auditionStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "auditionStatus",
                                        "@name": "auditionStatus"
                                    },

                                    "classtypeHotstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeHotstatus",
                                        "@name": "classtypeHotstatus"
                                    },

                                    "classtypeRecommendstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classtypeRecommendstatus",
                                        "@name": "classtypeRecommendstatus"
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
    var pluginName = "nl:ctc/query-class-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-class-list.options.js"
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
            "nl:ctc/query-class-list$options=./api..query-class-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();