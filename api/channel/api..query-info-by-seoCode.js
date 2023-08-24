/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "channel", apiAlias = "query-info-by-seoCode";

        var apiDefinition = {
            api: "column/page/web/info",
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
                    "title": "根据项目频道seoCode或者学院seoCode查询详情",
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

                        "columnSeoNo": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "columnSeoNo",
                            "@name": "columnSeoNo"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "根据项目频道seoCode或者学院seoCode查询详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "columnId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnId",
                            "@name": "columnId"
                        },

                        "columnLogo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnLogo",
                            "@name": "columnLogo"
                        },

                        "columnName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnName",
                            "@name": "columnName"
                        },

                        "columnSeoNo": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnSeoNo",
                            "@name": "columnSeoNo"
                        },

                        "columnShortName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnShortName",
                            "@name": "columnShortName"
                        },

                        "columnTitle": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "columnTitle",
                            "@name": "columnTitle"
                        },

                        "jumpLinkUrl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "jumpLinkUrl",
                            "@name": "jumpLinkUrl"
                        },

                        "projectIds": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectIds",
                            "@name": "projectIds"
                        },

                        "projectLevelCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectLevelCode",
                            "@name": "projectLevelCode"
                        },

                        "projectPageStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectPageStatus",
                            "@name": "projectPageStatus"
                        }
                    },

                    "required": [
                        "columnId",
                        "columnLogo",
                        "columnName",
                        "columnSeoNo",
                        "columnShortName",
                        "columnTitle",
                        "jumpLinkUrl",
                        "projectIds",
                        "projectLevelCode",
                        "projectPageStatus"
                    ]
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
    var pluginName = "nl:channel/query-info-by-seoCode";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..query-info-by-seoCode.options.js"
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
            "nl:channel/query-info-by-seoCode$options=./api..query-info-by-seoCode.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();