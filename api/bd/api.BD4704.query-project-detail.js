/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "bd", apiAlias = "query-project-detail";

        var apiDefinition = {
            api: "bd/project/info",
            apiModuleName: moduleName,
            apiAlias: apiAlias,

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
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectSeocode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectSeocode",
                            "@name": "projectSeocode"
                        }
                    },

                    "required": []
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
                            "required": false,
                            "default": "",
                            "@alias": "projectId",
                            "@name": "projectId"
                        },

                        "projectName": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectName",
                            "@name": "projectName"
                        },

                        "projectLevelcode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectLevelcode",
                            "@name": "projectLevelcode"
                        },

                        "projectSeq": {
                            "type": "number",
                            "required": false,
                            "default": "",
                            "@alias": "projectSeq",
                            "@name": "projectSeq"
                        },

                        "projectCreateddate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectCreateddate",
                            "@name": "projectCreateddate"
                        },

                        "projectModifieddate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectModifieddate",
                            "@name": "projectModifieddate"
                        },

                        "projectSourceid": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectSourceid",
                            "@name": "projectSourceid"
                        },

                        "brandId": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "brandId",
                            "@name": "brandId"
                        },

                        "projectLogourl": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectLogourl",
                            "@name": "projectLogourl"
                        },

                        "projectDescriptionurl": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectDescriptionurl",
                            "@name": "projectDescriptionurl"
                        },

                        "projectAppimgurl": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectAppimgurl",
                            "@name": "projectAppimgurl"
                        },

                        "projectWebimgurl": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectWebimgurl",
                            "@name": "projectWebimgurl"
                        },

                        "projectSeocode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectSeocode",
                            "@name": "projectSeocode"
                        },

                        "projectCode": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectCode",
                            "@name": "projectCode"
                        },

                        "projectShortname": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectShortname",
                            "@name": "projectShortname"
                        },

                        "projectHotstatus": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectHotstatus",
                            "@name": "projectHotstatus"
                        },

                        "projectSummarypicture": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectSummarypicture",
                            "@name": "projectSummarypicture"
                        },

                        "projectUseplate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectUseplate",
                            "@name": "projectUseplate"
                        },

                        "projectHotmodifieddate": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectHotmodifieddate",
                            "@name": "projectHotmodifieddate"
                        }
                    },

                    "required": []
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

    var pluginName = "nl:bd/query-project-detail";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.BD4704.query-project-detail.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:bd/query-project-detail$options=./api.BD4704.query-project-detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
