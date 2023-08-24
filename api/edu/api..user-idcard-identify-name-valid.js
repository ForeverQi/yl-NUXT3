/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "edu", apiAlias = "user-idcard-identify-name-valid";

        var apiDefinition = {
            api: "uc/user/idcard/identify/three/element",
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
                    "title": "个人信息三要素校验",
                    "description": "个人信息三要素校验",
                    "type": "object",

                    "properties": {
                        "userIdcardtype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userIdcardtype",
                            "@name": "userIdcardtype"
                        },

                        "userIdcard": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userIdcard",
                            "@name": "userIdcard"
                        },

                        "userName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "userName",
                            "@name": "userName"
                        }
                    },

                    "required": ["userIdcardtype", "userIdcard", "userName"]
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
    var pluginName = "nl:edu/user-idcard-identify-name-valid";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..user-idcard-identify-name-valid.options.js"
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
            "nl:edu/user-idcard-identify-name-valid$options=./api..user-idcard-identify-name-valid.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();