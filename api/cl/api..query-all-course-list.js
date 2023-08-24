/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cl", apiAlias = "query-all-course-list";

        var apiDefinition = {
            api: "mcp/productpolymerize/web/list",
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
                    "title": "获取全部类型的课程",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "collegeId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "collegeId",
                            "@name": "collegeId"
                        },

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

                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "showClient": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "showClient",
                            "@name": "showClient"
                        },

                        "projectType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectType",
                            "@name": "projectType"
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
                            "required": false,
                            "default": "",
                            "@alias": "areacode",
                            "@name": "areacode"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "获取全部类型的课程",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "count": {
                            "type": "string",
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
                                    "avlStatus",
                                    "createDate",
                                    "delStatus",
                                    "goodsCover",
                                    "goodsId",
                                    "goodsLights",
                                    "goodsMaxPromotionprice",
                                    "goodsMinPrice",
                                    "goodsName",
                                    "goodsPromotionendtime",
                                    "goodsPromotiontype",
                                    "goodsTopexpireddate",
                                    "goodsTopstatus",
                                    "liveEndTime",
                                    "liveStartTime",
                                    "liveStartTime",
                                    "modifiedDate",
                                    "projectId",
                                    "projectName",
                                    "resourceId",
                                    "resourceType",
                                    "showClient",
                                    "subjectId",
                                    "subjectName"
                                ],

                                "properties": {
                                    "avlStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "avlStatus",
                                        "@name": "avlStatus"
                                    },

                                    "createDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "createDate",
                                        "@name": "createDate"
                                    },

                                    "delStatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "delStatus",
                                        "@name": "delStatus"
                                    },

                                    "goodsCover": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsCover",
                                        "@name": "goodsCover"
                                    },

                                    "goodsId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsId",
                                        "@name": "goodsId"
                                    },

                                    "goodsLights": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsLights",
                                        "@name": "goodsLights"
                                    },

                                    "goodsMaxPromotionprice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsMaxPromotionprice",
                                        "@name": "goodsMaxPromotionprice"
                                    },

                                    "goodsMinPrice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsMinPrice",
                                        "@name": "goodsMinPrice"
                                    },

                                    "goodsName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsName",
                                        "@name": "goodsName"
                                    },

                                    "goodsPromotionendtime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsPromotionendtime",
                                        "@name": "goodsPromotionendtime"
                                    },

                                    "goodsPromotiontype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsPromotiontype",
                                        "@name": "goodsPromotiontype"
                                    },

                                    "goodsTopexpireddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsTopexpireddate",
                                        "@name": "goodsTopexpireddate"
                                    },

                                    "goodsTopstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "goodsTopstatus",
                                        "@name": "goodsTopstatus"
                                    },

                                    "liveEndTime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "liveEndTime",
                                        "@name": "liveEndTime"
                                    },

                                    "liveStartTime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "liveStatus",
                                        "@name": "liveStartTime"
                                    },

                                    "modifiedDate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "modifiedDate",
                                        "@name": "modifiedDate"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    },

                                    "projectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectName",
                                        "@name": "projectName"
                                    },

                                    "resourceId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "resourceId",
                                        "@name": "resourceId"
                                    },

                                    "resourceType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "resourceType",
                                        "@name": "resourceType"
                                    },

                                    "showClient": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "showClient",
                                        "@name": "showClient"
                                    },

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
    var pluginName = "nl:cl/query-all-course-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-all-course-list.options.js"
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
            "nl:cl/query-all-course-list$options=./api..query-all-course-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();