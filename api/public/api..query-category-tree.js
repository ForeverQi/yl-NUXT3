/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "public", apiAlias = "query-category-tree";

        var apiDefinition = {
            api: "column/category/web/tree",
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
                    "title": "查询学院项目频道页树",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "enableStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "enableStatus",
                            "@name": "enableStatus"
                        }
                    },

                    "required": ["enableStatus"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询学院项目频道页树",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "treeData": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "columnCategoryId",
                                    "columnCategoryName",
                                    "projectIds",
                                    "columnData",
                                    "courseRecommendData"
                                ],

                                "properties": {
                                    "columnCategoryId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "columnCategoryId",
                                        "@name": "columnCategoryId"
                                    },

                                    "columnCategoryName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "columnCategoryName",
                                        "@name": "columnCategoryName"
                                    },

                                    "projectIds": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectIds",
                                        "@name": "projectIds"
                                    },

                                    "columnData": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",

                                            "required": [
                                                "columnId",
                                                "projectIds",
                                                "columnName",
                                                "jumpLinkUrl",
                                                "columnShortName",
                                                "projectPageStatus"
                                            ],

                                            "properties": {
                                                "columnId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "columnId",
                                                    "@name": "columnId"
                                                },

                                                "projectIds": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "projectIds",
                                                    "@name": "projectIds"
                                                },

                                                "columnName": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "columnName",
                                                    "@name": "columnName"
                                                },

                                                "jumpLinkUrl": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "jumpLinkUrl",
                                                    "@name": "jumpLinkUrl"
                                                },

                                                "columnShortName": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "columnShortName",
                                                    "@name": "columnShortName"
                                                },

                                                "projectPageStatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "projectPageStatus",
                                                    "@name": "projectPageStatus",

                                                    "@enums": [{
                                                        "type": "string",
                                                        "name": "Y",
                                                        "value": "yes"
                                                    }, {
                                                        "type": "string",
                                                        "name": "N",
                                                        "value": "no"
                                                    }]
                                                }
                                            }
                                        },

                                        "@alias": "columnData",
                                        "@name": "columnData"
                                    },

                                    "courseRecommendData": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",
                                            "required": ["courseId", "courseName", "courseUrl", "courseType"],

                                            "properties": {
                                                "courseId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "courseId",
                                                    "@name": "courseId"
                                                },

                                                "courseName": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "courseName",
                                                    "@name": "courseName"
                                                },

                                                "courseUrl": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "courseUrl",
                                                    "@name": "courseUrl"
                                                },

                                                "courseType": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "courseType",
                                                    "@name": "courseType",

                                                    "@enums": [{
                                                        "type": "string",
                                                        "name": "G",
                                                        "value": "open"
                                                    }, {
                                                        "type": "string",
                                                        "name": "T",
                                                        "value": "trial"
                                                    }, {
                                                        "type": "string",
                                                        "name": "S",
                                                        "value": "pro"
                                                    }]
                                                }
                                            }
                                        },

                                        "@alias": "courseRecommendData",
                                        "@name": "courseRecommendData"
                                    }
                                }
                            },

                            "@alias": "treeData",
                            "@name": "treeData"
                        }
                    },

                    "required": ["treeData"]
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
    var pluginName = "nl:public/query-category-tree";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-category-tree.options.js"
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
            "nl:public/query-category-tree$options=./api..query-category-tree.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
