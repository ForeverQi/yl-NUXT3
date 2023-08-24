/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "experience", apiAlias = "mcp_trial_web_detail";

        var apiDefinition = {
            method: 'GET',
            api: "mcp/trial/web/detail",
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
                    "title": "体验课-详情",
                    "description": "体验课-详情",
                    "type": "object",

                    "properties": {
                        "goodsId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "goodsId",
                            "@name": "goodsId"
                        }
                    },

                    "required": ["goodsId"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "体验课-详情",
                    "description": "体验课-详情",
                    "type": "object",

                    "properties": {
                        "catalogList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",

                                "required": [
                                    "catalogId",
                                    "catalogName",
                                    "catalogSeq",
                                    "catalogShowstatus",
                                    "coursewareList"
                                ],

                                "properties": {
                                    "catalogId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "catalogId",
                                        "@name": "catalogId"
                                    },

                                    "catalogName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "catalogName",
                                        "@name": "catalogName"
                                    },

                                    "catalogSeq": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "catalogSeq",
                                        "@name": "catalogSeq"
                                    },

                                    "catalogShowstatus": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "catalogShowstatus",
                                        "@name": "catalogShowstatus"
                                    },

                                    "coursewareList": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",
                                        "items": {},
                                        "@alias": "coursewareList",
                                        "@name": "coursewareList"
                                    }
                                }
                            },

                            "@alias": "catalogList",
                            "@name": "catalogList"
                        },

                        "collectStatus": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "collectStatus",
                            "@name": "collectStatus"
                        },

                        "courseName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseName",
                            "@name": "courseName"
                        },

                        "coursePicpath": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursePicpath",
                            "@name": "coursePicpath"
                        },

                        "coursePrice": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursePrice",
                            "@name": "coursePrice"
                        },

                        "coursePromotionendtime": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursePromotionendtime",
                            "@name": "coursePromotionendtime"
                        },

                        "coursePromotionprice": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "coursePromotionprice",
                            "@name": "coursePromotionprice"
                        },

                        "coursePromotiontype": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursePromotiontype",
                            "@name": "coursePromotiontype"
                        },

                        "courseintroduceDetail": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "courseintroduceDetail",
                            "@name": "courseintroduceDetail"
                        },

                        "coursewareCount": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coursewareCount",
                            "@name": "coursewareCount"
                        },

                        "coverImg": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "coverImg",
                            "@name": "coverImg"
                        },

                        "dialogContent1": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "dialogContent1",
                            "@name": "dialogContent1"
                        },

                        "dialogContent2": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "dialogContent2",
                            "@name": "dialogContent2"
                        },

                        "dialogTitle": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "dialogTitle",
                            "@name": "dialogTitle"
                        },

                        "flowAvlstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "flowAvlstatus",
                            "@name": "flowAvlstatus"
                        },

                        "lights": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["content", "title", "type"],

                                "properties": {
                                    "content": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "content",
                                        "@name": "content"
                                    },

                                    "title": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "title",
                                        "@name": "title"
                                    },

                                    "type": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "type",
                                        "@name": "type"
                                    }
                                }
                            },

                            "@alias": "lights",
                            "@name": "lights"
                        },

                        "mailStatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "mailStatus",
                            "@name": "mailStatus"
                        },

                        "posterImg": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "posterImg",
                            "@name": "posterImg"
                        },

                        "projectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectName",
                            "@name": "projectName"
                        },

                        "qrcodeImage": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "qrcodeImage",
                            "@name": "qrcodeImage"
                        },

                        "qrcodeTitle": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "qrcodeTitle",
                            "@name": "qrcodeTitle"
                        },

                        "teacherList": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["teacherId", "userName"],

                                "properties": {
                                    "teacherId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "teacherId",
                                        "@name": "teacherId"
                                    },

                                    "userName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "userName",
                                        "@name": "userName"
                                    }
                                }
                            },

                            "@alias": "teacherList",
                            "@name": "teacherList"
                        }
                    },

                    "required": [
                        "catalogList",
                        "collectStatus",
                        "courseName",
                        "coursePicpath",
                        "coursePrice",
                        "coursePromotionendtime",
                        "coursePromotionprice",
                        "coursePromotiontype",
                        "courseintroduceDetail",
                        "coursewareCount",
                        "coverImg",
                        "dialogContent1",
                        "dialogContent2",
                        "dialogTitle",
                        "flowAvlstatus",
                        "lights",
                        "mailStatus",
                        "posterImg",
                        "projectName",
                        "qrcodeImage",
                        "qrcodeTitle",
                        "teacherList"
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

    var pluginName = "nl:experience/mcp_trial_web_detail";

    if (typeof define === "function") {
        define(["@youlu/niceloo/libs/@xlib.01/umdLoader.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js", "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js", "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js", "./api.MCU0001.mcp_trial_web_detail.options.js"], function(defineModule){return defineModule.wrap4amdjs(pluginName, arguments, factory);});
    } else if (typeof defineModule === "function") {
        defineModule(pluginName, [
            "nl:apiserver.api=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "nl:apiserver.APIModule=@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "apiNameAndEnumConvert2=@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "nl:experience/mcp_trial_web_detail$options=./api.MCU0001.mcp_trial_web_detail.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();