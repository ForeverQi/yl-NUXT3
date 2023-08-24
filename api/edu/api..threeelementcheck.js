/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "edu", apiAlias = "threeelementcheck";

        var apiDefinition = {
            api: "eduordering/student/getstuthreeelementcheck/get",
            method: "GET",
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
                    "title": "学历中心三要素校验",
                    "description": "学历中心三要素校验",
                    "type": "object",

                    "properties": {
                        "idCardno": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "idCardno",
                            "@name": "idCardno"
                        },

                        "name": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "name",
                            "@name": "name"
                        },

                        "action": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "action",
                            "@name": "action"
                        },

                        "terminal": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "terminal",
                            "@name": "terminal"
                        },

                        "scene": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "scene",
                            "@name": "scene"
                        },

                        "mobile": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "mobile",
                            "@name": "mobile"
                        }
                    },

                    "required": ["idCardno", "name", "action", "terminal", "scene", "mobile"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "学历中心三要素校验",
                    "description": "学历中心三要素校验",
                    "type": "object",

                    "properties": {
                        "code": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "code",
                            "@name": "code"
                        },

                        "message": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "message",
                            "@name": "message"
                        }
                    },

                    "required": ["code", "message"]
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
    var pluginName = "nl:edu/threeelementcheck";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..threeelementcheck.options.js"
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
            "nl:edu/threeelementcheck$options=./api..threeelementcheck.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();