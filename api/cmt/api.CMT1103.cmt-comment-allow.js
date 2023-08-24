/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "cc", apiAlias = "cmt-comment-allow";

        var apiDefinition = {
            api: "cmt/comment/allow",
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
                    "title": "校验是否可评价",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "commentBizid": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentBizid",
                            "@name": "commentBizid"
                        },

                        "commentBiztype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "commentBiztype",
                            "@name": "commentBiztype",

                            "@enums": [{
                                "type": "string",
                                "name": "ST",
                                "value": "ST"
                            }, {
                                "type": "string",
                                "name": "SL",
                                "value": "SL"
                            }, {
                                "type": "string",
                                "name": "FF",
                                "value": "FF"
                            }, {
                                "type": "string",
                                "name": "PT",
                                "value": "PT"
                            }, {
                                "type": "string",
                                "name": "PL",
                                "value": "PL"
                            }, {
                                "type": "string",
                                "name": "EQ",
                                "value": "EQ"
                            }, {
                                "type": "string",
                                "name": "HT",
                                "value": "HT"
                            }]
                        }
                    },

                    "required": ["commentBizid", "commentBiztype"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, undefined, {
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
    var pluginName = "nl:cc/cmt-comment-allow";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api.CMT1103.cmt-comment-allow.options.js"
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
            "nl:cc/cmt-comment-allow$options=./api.CMT1103.cmt-comment-allow.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();