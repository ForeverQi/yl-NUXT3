/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "mc", apiAlias = "mc-my-msg-del";

        var apiDefinition = {
            api: "mc/my/msg/del",
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
                    "title": "消息-删除",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "msgId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "msgId",
                            "@name": "msgId"
                        },

                        "msgClienttype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "msgClienttype",
                            "@name": "msgClienttype"
                        }
                    },

                    "required": ["msgId", "msgClienttype"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "消息-删除",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "data": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "data",
                            "@name": "data"
                        }
                    },

                    "required": ["data"]
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

    var pluginName = "nl:mc/mc-my-msg-del";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MC0020.mc-my-msg-del.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:mc/mc-my-msg-del$options=./api.MC0020.mc-my-msg-del.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();
