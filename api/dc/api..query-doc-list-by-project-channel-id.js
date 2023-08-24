/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "dc", apiAlias = "query-doc-list-by-project-channel-id";

        var apiDefinition = {
            api: "dc/doc/list/column",
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
                    "title": "根据项目id或频道页id查询资料",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "columnId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "columnId",
                            "@name": "columnId"
                        },

                        "pageSize": {
                            "type": "string",
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

                        "projectIds": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectIds",
                            "@name": "projectIds"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "根据项目id或频道页id查询资料",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "docId",
                            "docName",
                            "projectId",
                            "docTag",
                            "docConverimgurl",
                            "docPackstatus",
                            "docType",
                            "docCode"
                        ],

                        "properties": {
                            "docId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docId",
                                "@name": "docId"
                            },

                            "docName": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docName",
                                "@name": "docName"
                            },

                            "projectId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectId",
                                "@name": "projectId"
                            },

                            "docTag": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docTag",
                                "@name": "docTag"
                            },

                            "docConverimgurl": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docConverimgurl",
                                "@name": "docConverimgurl"
                            },

                            "docPackstatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docPackstatus",
                                "@name": "docPackstatus"
                            },

                            "docType": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docType",
                                "@name": "docType"
                            },

                            "docCode": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "docCode",
                                "@name": "docCode"
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
    var pluginName = "nl:dc/query-doc-list-by-project-channel-id";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-doc-list-by-project-channel-id.options.js"
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
            "nl:dc/query-doc-list-by-project-channel-id$options=./api..query-doc-list-by-project-channel-id.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();