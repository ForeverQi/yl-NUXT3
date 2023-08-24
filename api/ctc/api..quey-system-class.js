/* eslint-disable */


(function() {
    var factory = function(getters) {
        var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
        var moduleName = "ctc", apiAlias = "quey-system-class";

        var apiDefinition = {
            api: "ctc/classtype/lessoninfo",
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
                    "title": "查询系统课详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "classtypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classTypeId",
                            "@name": "classtypeId"
                        },

                        "showitem": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "showitem",
                            "@name": "showitem"
                        },

                        "isNeedintroducepc": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "isNeedintroducepc",
                            "@name": "isNeedintroducepc",

                            "@enums": [{
                                "type": "string",
                                "name": "yes",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "no",
                                "value": "N"
                            }]
                        },

                        "isNeedintroduceapp": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "isNeedintroduceapp",
                            "@name": "isNeedintroduceapp",

                            "@enums": [{
                                "type": "string",
                                "name": "yes",
                                "value": "Y"
                            }, {
                                "type": "string",
                                "name": "no",
                                "value": "N"
                            }]
                        }
                    },

                    "required": ["classtypeId", "showitem", "isNeedintroducepc", "isNeedintroduceapp"]
                });
            },

            responseDataNameAndEnumMapMethod: function(api, data) {
                return apiNameAndEnumConvert2(data, {
                    "id": "http://json-schema.org/draft-04/schema#",
                    "$schema": "http://json-schema.org/draft-04/schema#",
                    "title": "查询系统课详情",
                    "description": "",
                    "type": "object",

                    "properties": {
                        "maxPrice": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "MaxPrice",
                            "@name": "maxPrice"
                        },

                        "minPrice": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "MinPrice",
                            "@name": "minPrice"
                        },

                        "classtypeAppcoverimgurl": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeAppcoverimgurl",
                            "@name": "classtypeAppcoverimgurl"
                        },

                        "classtypeAuditionstatus": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeAuditionstatus",
                            "@name": "classtypeAuditionstatus"
                        },

                        "classTypeWelfare": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeHighlights",
                            "@name": "classTypeWelfare"
                        },

                        "classtypeId": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeId",
                            "@name": "classtypeId"
                        },

                        "classtypeName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeName",
                            "@name": "classtypeName"
                        },

                        "classtypeOrdercount": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeOrdercount",
                            "@name": "classtypeOrdercount"
                        },

                        "classtypeSynopsis": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeSynopsis",
                            "@name": "classtypeSynopsis"
                        },

                        "classtypeWelfare": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeWelfare",
                            "@name": "classtypeWelfare"
                        },

                        "ctapName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "ctapName",
                            "@name": "ctapName"
                        },

                        "headImg": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "headImg",
                            "@name": "headImg"
                        },

                        "highlightJson": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "highlightJson",
                            "@name": "highlightJson"
                        },

                        "parentProjectName": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "parentProjectName",
                            "@name": "parentProjectName"
                        },

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

                        "projectSummarypicture": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectSummarypicture",
                            "@name": "projectSummarypicture"
                        },

                        "projectYear": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "projectYear",
                            "@name": "projectYear"
                        },

                        "singleObjects": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["classCategory", "subjectId", "subjectName", "classes"],

                                "properties": {
                                    "classCategory": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classCategory",
                                        "@name": "classCategory"
                                    },

                                    "subjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectId",
                                        "@name": "subjectId"
                                    },

                                    "subjectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectName",
                                        "@name": "subjectName"
                                    },

                                    "classes": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",

                                            "required": [
                                                "classId",
                                                "className",
                                                "classStdprice",
                                                "classPrice",
                                                "classSourceid",
                                                "classAsertype",
                                                "classAtype",
                                                "classOrdercount",
                                                "classAsertypename",
                                                "classPromotionstatus"
                                            ],

                                            "properties": {
                                                "classId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classId",
                                                    "@name": "classId"
                                                },

                                                "className": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "className",
                                                    "@name": "className"
                                                },

                                                "classStdprice": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classStdprice",
                                                    "@name": "classStdprice"
                                                },

                                                "classPrice": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classPrice",
                                                    "@name": "classPrice"
                                                },

                                                "classSourceid": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classSourceid",
                                                    "@name": "classSourceid"
                                                },

                                                "classAsertype": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classAsertype",
                                                    "@name": "classAsertype",

                                                    "@enums": [{
                                                        "type": "string",
                                                        "name": "R",
                                                        "value": "repetition"
                                                    }, {
                                                        "type": "string",
                                                        "name": "F",
                                                        "value": "refund"
                                                    }, {
                                                        "type": "string",
                                                        "name": "N",
                                                        "value": "unRepetitionRefund"
                                                    }, {
                                                        "type": "string",
                                                        "name": "B",
                                                        "value": "none"
                                                    }, {
                                                        "type": "string",
                                                        "name": "U",
                                                        "value": "unContinueRefund"
                                                    }, {
                                                        "type": "string",
                                                        "name": "K",
                                                        "value": "continue"
                                                    }]
                                                },

                                                "classAtype": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classAtype",
                                                    "@name": "classAtype",

                                                    "@enums": [{
                                                        "type": "string",
                                                        "name": "E",
                                                        "value": "electronic"
                                                    }, {
                                                        "type": "string",
                                                        "name": "P",
                                                        "value": "paper"
                                                    }, {
                                                        "type": "string",
                                                        "name": "N",
                                                        "value": "no"
                                                    }]
                                                },

                                                "classOrdercount": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classOrdercount",
                                                    "@name": "classOrdercount"
                                                },

                                                "classAsertypename": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classAsertypename",
                                                    "@name": "classAsertypename"
                                                },

                                                "classPromotionstatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classPromotionstatus",
                                                    "@name": "classPromotionstatus"
                                                }
                                            }
                                        },

                                        "@alias": "classes",
                                        "@name": "classes"
                                    }
                                }
                            },

                            "@alias": "singleObjects",
                            "@name": "singleObjects"
                        },

                        "generalObjects": {
                            "type": "array",
                            "required": true,
                            "default": "",

                            "items": {
                                "type": "object",
                                "required": ["classCategory", "subjectId", "subjectName", "classes"],

                                "properties": {
                                    "classCategory": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "classCategory",
                                        "@name": "classCategory"
                                    },

                                    "subjectId": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectId",
                                        "@name": "subjectId"
                                    },

                                    "subjectName": {
                                        "type": "string",
                                        "required": true,
                                        "default": "",
                                        "@alias": "subjectName",
                                        "@name": "subjectName"
                                    },

                                    "classes": {
                                        "type": "array",
                                        "required": true,
                                        "default": "",

                                        "items": {
                                            "type": "object",

                                            "required": [
                                                "classId",
                                                "className",
                                                "classStdprice",
                                                "classPrice",
                                                "classSourceid",
                                                "classAsertype",
                                                "classAtype",
                                                "classOrdercount",
                                                "classAsertypename",
                                                "classPromotionstatus"
                                            ],

                                            "properties": {
                                                "classId": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classId",
                                                    "@name": "classId"
                                                },

                                                "className": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "className",
                                                    "@name": "className"
                                                },

                                                "classStdprice": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classStdprice",
                                                    "@name": "classStdprice"
                                                },

                                                "classPrice": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classPrice",
                                                    "@name": "classPrice"
                                                },

                                                "classSourceid": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classSourceid",
                                                    "@name": "classSourceid"
                                                },

                                                "classAsertype": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classAsertype",
                                                    "@name": "classAsertype",

                                                    "@enums": [{
                                                        "type": "string",
                                                        "name": "R",
                                                        "value": "repetition"
                                                    }, {
                                                        "type": "string",
                                                        "name": "F",
                                                        "value": "refund"
                                                    }, {
                                                        "type": "string",
                                                        "name": "N",
                                                        "value": "unRepetitionRefund"
                                                    }, {
                                                        "type": "string",
                                                        "name": "B",
                                                        "value": "none"
                                                    }, {
                                                        "type": "string",
                                                        "name": "U",
                                                        "value": "unContinueRefund"
                                                    }, {
                                                        "type": "string",
                                                        "name": "K",
                                                        "value": "continue"
                                                    }]
                                                },

                                                "classAtype": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classAtype",
                                                    "@name": "classAtype",

                                                    "@enums": [{
                                                        "type": "string",
                                                        "name": "E",
                                                        "value": "electronic"
                                                    }, {
                                                        "type": "string",
                                                        "name": "P",
                                                        "value": "paper"
                                                    }, {
                                                        "type": "string",
                                                        "name": "N",
                                                        "value": "no"
                                                    }]
                                                },

                                                "classOrdercount": {
                                                    "type": "number",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classOrdercount",
                                                    "@name": "classOrdercount"
                                                },

                                                "classAsertypename": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classAsertypename",
                                                    "@name": "classAsertypename"
                                                },

                                                "classPromotionstatus": {
                                                    "type": "string",
                                                    "required": true,
                                                    "default": "",
                                                    "@alias": "classPromotionstatus",
                                                    "@name": "classPromotionstatus"
                                                }
                                            }
                                        },

                                        "@alias": "classes",
                                        "@name": "classes"
                                    }
                                }
                            },

                            "@alias": "generalObjects",
                            "@name": "generalObjects"
                        },

                        "stdmaxPrice": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "stdmaxPrice",
                            "@name": "stdmaxPrice"
                        },

                        "stdminPrice": {
                            "type": "number",
                            "required": true,
                            "default": "",
                            "@alias": "stdminPrice",
                            "@name": "stdminPrice"
                        },

                        "teacherIntroduce": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "teacherIntroduce",
                            "@name": "teacherIntroduce"
                        },

                        "classtypeIntroducepc": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeIntroducepc",
                            "@name": "classtypeIntroducepc"
                        },

                        "classtypeIntroduceapp": {
                            "type": "string",
                            "required": true,
                            "default": "",
                            "@alias": "classtypeIntroduceapp",
                            "@name": "classtypeIntroduceapp"
                        }
                    },

                    "required": [
                        "maxPrice",
                        "minPrice",
                        "classtypeAppcoverimgurl",
                        "classtypeAuditionstatus",
                        "classTypeWelfare",
                        "classtypeId",
                        "classtypeName",
                        "classtypeOrdercount",
                        "classtypeSynopsis",
                        "classtypeWelfare",
                        "ctapName",
                        "headImg",
                        "highlightJson",
                        "parentProjectName",
                        "projectId",
                        "projectName",
                        "projectSummarypicture",
                        "projectYear",
                        "singleObjects",
                        "generalObjects",
                        "stdmaxPrice",
                        "stdminPrice",
                        "teacherIntroduce",
                        "classtypeIntroducepc",
                        "classtypeIntroduceapp"
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
    var pluginName = "nl:ctc/quey-system-class";

    if (typeof define === "function") {
        define([
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
            "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
            "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
            "./api..quey-system-class.options.js"
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
            "nl:ctc/quey-system-class$options=./api..quey-system-class.options.js"
        ], factory, defineModule.isEnvNode() ? {
            module: module
        } : null);
    }
})();