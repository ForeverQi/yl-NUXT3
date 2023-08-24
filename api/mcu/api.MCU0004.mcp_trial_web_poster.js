/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "experience", apiAlias = "mcp_trial_web_poster";

        var apiDefinition = {
            api: "mcp/trial/web/poster",
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
                    "title": "海报生成",
                    "description": "海报生成",
                    "type": "object",

                    "properties": {
                        "goodsId": {
                            "type": "string",
                            "required": false,
                            "@alias": "goodsId",
                            "@name": "goodsId"
                        },

                        "resourceType": {
                            "type": "string",
                            "required": false,
                            "@alias": "resourceType",
                            "@name": "resourceType"
                        },

                        "shareType": {
                            "type": "string",
                            "required": false,
                            "@alias": "shareType",
                            "@name": "shareType"
                        }
                    },

                    "required": []
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "海报生成",
                    "description": "海报生成",
                    "type": "object",

                    "properties": {
                        "courseName": {
                            "type": "string",
                            "required": true,
                            "@alias": "courseName",
                            "@name": "courseName"
                        },

                        "h5Url": {
                            "type": "string",
                            "required": true,
                            "@alias": "h5Url",
                            "@name": "h5Url"
                        },

                        "posterImg": {
                            "type": "string",
                            "required": true,
                            "@alias": "posterImg",
                            "@name": "posterImg"
                        }
                    },

                    "required": ["courseName", "h5Url", "posterImg"]
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

    var pluginName = "nl:experience/mcp_trial_web_poster";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU0004.mcp_trial_web_poster.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:experience/mcp_trial_web_poster$options=./api.MCU0004.mcp_trial_web_poster.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();