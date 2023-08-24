/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "bd", apiAlias = "query-project-info";

        var apiDefinition = {
            api: "bd/project/info",
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
                    "title": "项目详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "projectId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectSeocode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectSeocode",
                            "@name": "projectSeocode"
                        }
                    },

                    "required": ["projectId", "projectSeocode"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "项目详情",
                    "description": "",
                    "type": "object",

                    "properties": {
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

                        "projectLevelcode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectLevelcode",
                            "@name": "projectLevelcode"
                        },

                        "projectSeq": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "projectSeq",
                            "@name": "projectSeq"
                        },

                        "projectCreateddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectCreateddate",
                            "@name": "projectCreateddate"
                        },

                        "projectModifieddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectModifieddate",
                            "@name": "projectModifieddate"
                        },

                        "projectSourceid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectSourceid",
                            "@name": "projectSourceid"
                        },

                        "brandId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "brandId",
                            "@name": "brandId"
                        },

                        "projectLogourl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectLogourl",
                            "@name": "projectLogourl"
                        },

                        "projectDescriptionurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectDescriptionurl",
                            "@name": "projectDescriptionurl"
                        },

                        "projectAppimgurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectAppimgurl",
                            "@name": "projectAppimgurl"
                        },

                        "projectWebimgurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectWebimgurl",
                            "@name": "projectWebimgurl"
                        },

                        "projectSeocode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectSeocode",
                            "@name": "projectSeocode"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        },

                        "projectShortname": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectShortname",
                            "@name": "projectShortname"
                        },

                        "projectHotstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectHotstatus",
                            "@name": "projectHotstatus"
                        },

                        "projectSummarypicture": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectSummarypicture",
                            "@name": "projectSummarypicture"
                        },

                        "projectUseplate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectUseplate",
                            "@name": "projectUseplate"
                        },

                        "projectHotmodifieddate": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectHotmodifieddate",
                            "@name": "projectHotmodifieddate"
                        }
                    },

                    "required": [
                        "projectId",
                        "projectName",
                        "projectLevelcode",
                        "projectSeq",
                        "projectCreateddate",
                        "projectModifieddate",
                        "projectSourceid",
                        "brandId",
                        "projectLogourl",
                        "projectDescriptionurl",
                        "projectAppimgurl",
                        "projectWebimgurl",
                        "projectSeocode",
                        "projectCode",
                        "projectShortname",
                        "projectHotstatus",
                        "projectSummarypicture",
                        "projectUseplate",
                        "projectHotmodifieddate"
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
    var pluginName = "nl:bd/query-project-info";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.BD4704.query-project-info.options.js"
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
            "nl:bd/query-project-info$options=./api.BD4704.query-project-info.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();