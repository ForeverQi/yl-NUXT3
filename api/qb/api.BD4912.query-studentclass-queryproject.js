/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "qb", apiAlias = "query-studentclass-queryproject";

        var apiDefinition = {
            api: "bd/studentclass/queryproject",
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
                return apiNameAndEnumConvert2(params, undefined);
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "已报班项目-下次上线废弃",
                    "description": "",
                    "type": "array",

                    "items": {
                        "type": "object",

                        "required": [
                            "projectId",
                            "projectName",
                            "projectCode",
                            "projectLevelcode",
                            "projectSeq",
                            "kxId",
                            "projectSourceid",
                            "projectUseplate",
                            "projectLogourl",
                            "projectHotstatus",
                            "projectAvlstatus",
                            "projectDelstatus",
                            "projectDescriptionurl",
                            "projectAppimgurl",
                            "projectWebimgurl",
                            "projectSeocode",
                            "projectShortname",
                            "projectSummarypicture",
                            "brandId",
                            "projectShortspell"
                        ],

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

                            "projectCode": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectCode",
                                "@name": "projectCode"
                            },

                            "projectLevelcode": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectLevelcode",
                                "@name": "projectLevelcode"
                            },

                            "projectSeq": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectSeq",
                                "@name": "projectSeq"
                            },

                            "kxId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "kxId",
                                "@name": "kxId"
                            },

                            "projectSourceid": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectSourceid",
                                "@name": "projectSourceid"
                            },

                            "projectUseplate": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectUseplate",
                                "@name": "projectUseplate"
                            },

                            "projectLogourl": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectLogourl",
                                "@name": "projectLogourl"
                            },

                            "projectHotstatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectHotstatus",
                                "@name": "projectHotstatus"
                            },

                            "projectAvlstatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectAvlstatus",
                                "@name": "projectAvlstatus"
                            },

                            "projectDelstatus": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectDelstatus",
                                "@name": "projectDelstatus"
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

                            "projectShortname": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectShortname",
                                "@name": "projectShortname"
                            },

                            "projectSummarypicture": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectSummarypicture",
                                "@name": "projectSummarypicture"
                            },

                            "brandId": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "brandId",
                                "@name": "brandId"
                            },

                            "projectShortspell": {
                                "type": "string",
                                "required": true,
                                "default": "",
                                "@alias": "projectShortspell",
                                "@name": "projectShortspell"
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
    var pluginName = "nl:qb/query-studentclass-queryproject";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.BD4912.query-studentclass-queryproject.options.js"
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
            "nl:qb/query-studentclass-queryproject$options=./api.BD4912.query-studentclass-queryproject.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();