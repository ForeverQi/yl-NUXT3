/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "dc", apiAlias = "search-doc-list";

        var apiDefinition = {
            api: "dc/doc/search",
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
                    "title": "资料搜索",
                    "description": "资料搜索",
                    "type": "object",

                    "properties": {
                        "projectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "subjectId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "subjectId",
                            "@name": "subjectId"
                        },

                        "searchKey": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "searchKey",
                            "@name": "searchKey"
                        },

                        "docPackstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "docPackstatus",
                            "@name": "docPackstatus"
                        },

                        "pageIndex": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageIndex",
                            "@name": "pageIndex"
                        },

                        "pageSize": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "pageSize",
                            "@name": "pageSize"
                        },

                        "clientType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "clientType",
                            "@name": "clientType"
                        },

                        "collegeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "collegeId",
                            "@name": "collegeId"
                        }
                    },

                    "required": ["searchKey", "collegeId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "资料搜索",
                    "description": "资料搜索",
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
                                    "docId",
                                    "docPackstatus",
                                    "docName",
                                    "docTag",
                                    "docType",
                                    "docCreateddate",
                                    "docSize",
                                    "docPagenum",
                                    "docDowncount",
                                    "docPrice",
                                    "docPromotiontype",
                                    "docPromotionstarttime",
                                    "docPromotionendtime",
                                    "docPromotionprice",
                                    "isOwned",
                                    "docCode",
                                    "docAccess",
                                    "docPageviewcount",
                                    "docTopstatus",
                                    "projectId"
                                ],

                                "properties": {
                                    "docId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docId",
                                        "@name": "docId"
                                    },

                                    "docPackstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPackstatus",
                                        "@name": "docPackstatus"
                                    },

                                    "docName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docName",
                                        "@name": "docName"
                                    },

                                    "docTag": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docTag",
                                        "@name": "docTag"
                                    },

                                    "docType": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docType",
                                        "@name": "docType"
                                    },

                                    "docCreateddate": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docCreateddate",
                                        "@name": "docCreateddate"
                                    },

                                    "docSize": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docSize",
                                        "@name": "docSize"
                                    },

                                    "docPagenum": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPagenum",
                                        "@name": "docPagenum"
                                    },

                                    "docDowncount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docDowncount",
                                        "@name": "docDowncount"
                                    },

                                    "docPrice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPrice",
                                        "@name": "docPrice"
                                    },

                                    "docPromotiontype": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPromotiontype",
                                        "@name": "docPromotiontype"
                                    },

                                    "docPromotionstarttime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPromotionstarttime",
                                        "@name": "docPromotionstarttime"
                                    },

                                    "docPromotionendtime": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPromotionendtime",
                                        "@name": "docPromotionendtime"
                                    },

                                    "docPromotionprice": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPromotionprice",
                                        "@name": "docPromotionprice"
                                    },

                                    "isOwned": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "isOwned",
                                        "@name": "isOwned"
                                    },

                                    "docCode": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docCode",
                                        "@name": "docCode"
                                    },

                                    "docAccess": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docAccess",
                                        "@name": "docAccess"
                                    },

                                    "docPageviewcount": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docPageviewcount",
                                        "@name": "docPageviewcount"
                                    },

                                    "docTopstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "docTopstatus",
                                        "@name": "docTopstatus"
                                    },

                                    "projectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "projectId",
                                        "@name": "projectId"
                                    }
                                }
                            },

                            "@alias": "data",
                            "@name": "data"
                        },

                        "systemTime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "systemTime",
                            "@name": "systemTime"
                        }
                    },

                    "required": ["count", "data", "systemTime"]
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
    var pluginName = "nl:dc/search-doc-list";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.DC2029.search-doc-list.options.js"
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
            "nl:dc/search-doc-list$options=./api.DC2029.search-doc-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();