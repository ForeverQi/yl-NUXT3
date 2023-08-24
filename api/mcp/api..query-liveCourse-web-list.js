/* eslint-disable */


(function() {
  var factory = function(getters) {
      var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
      var moduleName = "mcp", apiAlias = "query-liveCourse-web-list";

      var apiDefinition = {
          api: "mcp/liveCourseWeb/web/liveListWeb",
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
                  "title": "直播课-列表",
                  "description": "公开课列表，公开课详情中的同类好课",
                  "type": "object",

                  "properties": {
                      "projectId": {
                          "type": "string",
                          "required": false,
                          "@alias": "projectId",
                          "@name": "projectId"
                      },

                      "subjectId": {
                          "type": "string",
                          "required": false,
                          "@alias": "subjectId",
                          "@name": "subjectId"
                      },

                      "courseStatus": {
                          "type": "string",
                          "required": false,
                          "@alias": "courseStatus",
                          "@name": "courseStatus"
                      },

                      "showClient": {
                          "type": "string",
                          "required": false,
                          "@alias": "showClient",
                          "@name": "showClient"
                      },

                      "delStatus": {
                          "type": "string",
                          "required": false,
                          "@alias": "delStatus",
                          "@name": "delStatus"
                      },

                      "avlStatus": {
                          "type": "string",
                          "required": false,
                          "@alias": "avlStatus",
                          "@name": "avlStatus"
                      },

                      "indexFlag": {
                          "type": "boolean",
                          "required": false,
                          "@alias": "indexFlag",
                          "@name": "indexFlag"
                      },

                      "pageIndex": {
                          "type": "number",
                          "required": false,
                          "@alias": "pageIndex",
                          "@name": "pageIndex"
                      },

                      "pageSize": {
                          "type": "number",
                          "required": false,
                          "@alias": "pageSize",
                          "@name": "pageSize"
                      },

                      "projectType": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "projectType",
                          "@name": "projectType",

                          "@enums": [{
                              "type": "string",
                              "name": "P",
                              "value": "P"
                          }, {
                              "type": "string",
                              "name": "T",
                              "value": "T"
                          }]
                      },

                      "collegeId": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "collegeId",
                          "@name": "collegeId"
                      },

                      "goodsId": {
                          "type": "string",
                          "required": false,
                          "default": "",
                          "@alias": "liveId",
                          "@name": "goodsId"
                      },

                      "hasAppointStatus": {
                          "type": "boolean",
                          "required": false,
                          "default": "",
                          "@alias": "hasAppointStatus",
                          "@name": "hasAppointStatus"
                      },

                      "saleTagId": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "saleTagId",
                          "@name": "saleTagId"
                      },

                      "areacode": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "areaCode",
                          "@name": "areacode"
                      }
                  },

                  "required": ["projectType", "collegeId", "saleTagId", "areacode"]
              });
          },

          responseDataNameAndEnumMapMethod: function(api, data) {
              return apiNameAndEnumConvert2(data, {
                  "id": "http://json-schema.org/draft-04/schema#",
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "title": "直播课-列表",
                  "description": "公开课列表，公开课详情中的同类好课",
                  "type": "object",

                  "properties": {
                      "count": {
                          "type": "number",
                          "required": true,
                          "default": "",
                          "@alias": "count",
                          "@name": "count"
                      },

                      "data": {
                          "type": "array",
                          "required": true,
                          "default": "",

                          "items": {
                              "type": "object",
                              "required": [],

                              "properties": {
                                  "goodsId": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "goodsId",
                                      "@name": "goodsId"
                                  },

                                  "resourceId": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "resourceId",
                                      "@name": "resourceId"
                                  },

                                  "goodsName": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "goodsName",
                                      "@name": "goodsName"
                                  },

                                  "projectId": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "projectIds",
                                      "@name": "projectId"
                                  },

                                  "projectName": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "projectNames",
                                      "@name": "projectName"
                                  },

                                  "projectShortName": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "projectShortName",
                                      "@name": "projectShortName"
                                  },

                                  "subjectId": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "subjectIds",
                                      "@name": "subjectId"
                                  },

                                  "subjectName": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "subjectNames",
                                      "@name": "subjectName"
                                  },

                                  "teacherId": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "teacherId",
                                      "@name": "teacherId"
                                  },

                                  "teacherName": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "teacherName",
                                      "@name": "teacherName"
                                  },

                                  "teacherImage": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "teacherImage",
                                      "@name": "teacherImage"
                                  },

                                  "liveCourseUrl": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "liveCourseUrl",
                                      "@name": "liveCourseUrl"
                                  },

                                  "liveUrlNoChatRoom": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "liveUrlNoChatRoom",
                                      "@name": "liveUrlNoChatRoom"
                                  },

                                  "courseStartTime": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "courseStartTime",
                                      "@name": "courseStartTime"
                                  },

                                  "courseEndTime": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "courseEndTime",
                                      "@name": "courseEndTime"
                                  },

                                  "currentTime": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "currentTime",
                                      "@name": "currentTime"
                                  },

                                  "goodsCover": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "goodsCover",
                                      "@name": "goodsCover"
                                  },

                                  "appletCover": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "appletCover",
                                      "@name": "appletCover"
                                  },

                                  "courseStatus": {
                                      "type": "number",
                                      "required": false,
                                      "@alias": "courseStatus",
                                      "@name": "courseStatus"
                                  },

                                  "allWareDuration": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "allWareDuration",
                                      "@name": "allWareDuration"
                                  },

                                  "wareDtoList": {
                                      "type": "array",
                                      "required": false,

                                      "items": {
                                          "type": "object",
                                          "required": [],

                                          "properties": {
                                              "coursewareId": {
                                                  "type": "string",
                                                  "required": false,
                                                  "@alias": "coursewareId",
                                                  "@name": "coursewareId"
                                              },

                                              "coursewareName": {
                                                  "type": "string",
                                                  "required": false,
                                                  "@alias": "coursewareName",
                                                  "@name": "coursewareName"
                                              },

                                              "coursewarePath": {
                                                  "type": "string",
                                                  "required": false,
                                                  "@alias": "coursewarePath",
                                                  "@name": "coursewarePath"
                                              },

                                              "coursewareSeq": {
                                                  "type": "string",
                                                  "required": false,
                                                  "@alias": "coursewareSeq",
                                                  "@name": "coursewareSeq"
                                              },

                                              "coursewareDuration": {
                                                  "type": "string",
                                                  "required": false,
                                                  "@alias": "coursewareDuration",
                                                  "@name": "coursewareDuration"
                                              },

                                              "auditionStatus": {
                                                  "type": "string",
                                                  "required": false,
                                                  "@alias": "auditionStatus",
                                                  "@name": "auditionStatus"
                                              },

                                              "auditionDuration": {
                                                  "type": "string",
                                                  "required": false,
                                                  "@alias": "auditionDuration",
                                                  "@name": "auditionDuration"
                                              },

                                              "avlStatus": {
                                                  "type": "string",
                                                  "required": false,
                                                  "@alias": "avlStatus",
                                                  "@name": "avlStatus"
                                              }
                                          }
                                      },

                                      "@alias": "wareDtoList",
                                      "@name": "wareDtoList"
                                  },

                                  "appointmentStatus": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "appointmentStatus",
                                      "@name": "appointmentStatus"
                                  },

                                  "avlStatus": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "avlStatus",
                                      "@name": "avlStatus"
                                  },

                                  "delStatus": {
                                      "type": "string",
                                      "required": false,
                                      "@alias": "delStatus",
                                      "@name": "delStatus"
                                  },

                                  "teacherList": {
                                      "type": "array",
                                      "required": false,
                                      "default": "",

                                      "items": {
                                          "type": "object",
                                          "required": [],

                                          "properties": {
                                              "teachProjectListVos": {
                                                  "type": "array",
                                                  "required": false,
                                                  "default": "",
                                                  "items": {},
                                                  "@alias": "teachProjectListVos",
                                                  "@name": "teachProjectListVos"
                                              },

                                              "teacherBrief": {
                                                  "type": "string",
                                                  "required": false,
                                                  "default": "",
                                                  "@alias": "teacherBrief",
                                                  "@name": "teacherBrief"
                                              },

                                              "teacherId": {
                                                  "type": "string",
                                                  "required": false,
                                                  "default": "",
                                                  "@alias": "teacherId",
                                                  "@name": "teacherId"
                                              },

                                              "teacherImage": {
                                                  "type": "string",
                                                  "required": false,
                                                  "default": "",
                                                  "@alias": "teacherImage",
                                                  "@name": "teacherImage"
                                              },

                                              "teacherNickname": {
                                                  "type": "string",
                                                  "required": false,
                                                  "default": "",
                                                  "@alias": "teacherNickname",
                                                  "@name": "teacherNickname"
                                              },

                                              "userName": {
                                                  "type": "string",
                                                  "required": false,
                                                  "default": "",
                                                  "@alias": "userName",
                                                  "@name": "userName"
                                              }
                                          }
                                      },

                                      "@alias": "teacherList",
                                      "@name": "teacherList"
                                  }
                              }
                          },

                          "@alias": "data",
                          "@name": "data"
                      }
                  },

                  "required": ["count", "data"]
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
  var pluginName = "nl:mcp/query-liveCourse-web-list";

  if (typeof define === "function") {
      define([
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
          "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
          "./api..query-liveCourse-web-list.options.js"
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
          "nl:mcp/query-liveCourse-web-list$options=./api..query-liveCourse-web-list.options.js"
      ], factory, defineModule.isEnvNode() ? {
          module: module
      } : null);
  }
})();