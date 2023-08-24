/* eslint-disable */


(function() {
  var factory = function(getters) {
      var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
      var moduleName = "cc", apiAlias = "query-class-archive-report";

      var apiDefinition = {
          api: "cc/user/class/info/learning/report/stat",
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
                  "title": "学习报告已存档听课率数据统计",
                  "description": "查询班级归档报告",
                  "type": "object",

                  "properties": {
                      "classId": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "classId",
                          "@name": "classId"
                      }
                  },

                  "required": ["classId"]
              });
          },

          responseDataNameAndEnumMapMethod: function(api, data) {
              return apiNameAndEnumConvert2(data, {
                  "id": "http://json-schema.org/draft-04/schema#",
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "title": "学习报告已存档听课率数据统计",
                  "description": "查询班级归档报告",
                  "type": "object",

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

                      "ucarCwcount": {
                          "type": "number",
                          "required": true,
                          "default": "",
                          "@alias": "ucarCwcount",
                          "@name": "ucarCwcount"
                      },

                      "ucarDaycount": {
                          "type": "number",
                          "required": true,
                          "default": "",
                          "@alias": "ucarDaycount",
                          "@name": "ucarDaycount"
                      },

                      "ucarDurationcount": {
                          "type": "number",
                          "required": true,
                          "default": "",
                          "@alias": "ucarDurationcount",
                          "@name": "ucarDurationcount"
                      },

                      "ucarFirsttime": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "ucarFirsttime",
                          "@name": "ucarFirsttime"
                      },

                      "ucarLearnedcount": {
                          "type": "number",
                          "required": true,
                          "default": "",
                          "@alias": "ucarLearnedcount",
                          "@name": "ucarLearnedcount"
                      },

                      "ucarRate": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "ucarRate",
                          "@name": "ucarRate"
                      },

                      "ucsArchiveDate": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "ucsArchiveDate",
                          "@name": "ucsArchiveDate"
                      },

                      "ucsArchiveStatus": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "ucsArchiveStatus",
                          "@name": "ucsArchiveStatus"
                      },

                      "ucsCompulsoryLearnedNumber": {
                          "type": "number",
                          "required": true,
                          "default": "",
                          "@alias": "ucsCompulsoryLearnedNumber",
                          "@name": "ucsCompulsoryLearnedNumber"
                      },

                      "ucsCompulsoryRate": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "ucsCompulsoryRate",
                          "@name": "ucsCompulsoryRate"
                      },

                      "ucsCompulsoryTotal": {
                          "type": "number",
                          "required": true,
                          "default": "",
                          "@alias": "ucsCompulsoryTotal",
                          "@name": "ucsCompulsoryTotal"
                      }
                  },

                  "required": [
                      "classId",
                      "className",
                      "ucarCwcount",
                      "ucarDaycount",
                      "ucarDurationcount",
                      "ucarFirsttime",
                      "ucarLearnedcount",
                      "ucarRate",
                      "ucsArchiveDate",
                      "ucsArchiveStatus",
                      "ucsCompulsoryLearnedNumber",
                      "ucsCompulsoryRate",
                      "ucsCompulsoryTotal"
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
  var pluginName = "nl:cc/query-class-archive-report";

  if (typeof define === "function") {
      define([
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
          "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
          "./api..query-class-archive-report.options.js"
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
          "nl:cc/query-class-archive-report$options=./api..query-class-archive-report.options.js"
      ], factory, defineModule.isEnvNode() ? {
          module: module
      } : null);
  }
})();