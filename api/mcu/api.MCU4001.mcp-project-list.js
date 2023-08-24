/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "myMicroClass", apiAlias = "mcp-project-list";

        var apiDefinition = {
            api: "mcp/project/list",
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
                    "title": "项目列表",
                    "description": "项目列表",
                    "type": "object",

                    "properties": {
                        "projectType": {
                            "type": "string",
                            "required": false,
                            "default": "",
                            "@alias": "projectType",
                            "@name": "projectType",

                            "@enums": [{
                                "type": "string",
                                "name": "P",
                                "value": "P"
                            }, {
                                "type": "string",
                                "name": "C",
                                "value": "C"
                            }, {
                                "type": "string",
                                "name": "A",
                                "value": "A"
                            }, {
                                "type": "string",
                                "name": "T",
                                "value": "T"
                            }]
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "项目列表",
                    "description": "项目列表",
                    "type": "array",

                    "items": {
                        "type": "object",
                        "required": [],

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

                            "projectCode": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "projectCode",
                                "@name": "projectCode"
                            },

                            "projectSeocode": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "projectSeocode",
                                "@name": "projectSeocode"
                            },

                            "projectShortname": {
                                "type": "string",
                                "required": false,
                                "default": "",
                                "@alias": "projectShortname",
                                "@name": "projectShortname"
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

    var pluginName = "nl:myMicroClass/mcp-project-list";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU4001.mcp-project-list.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:myMicroClass/mcp-project-list$options=./api.MCU4001.mcp-project-list.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();