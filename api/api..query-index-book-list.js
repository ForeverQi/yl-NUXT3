/* eslint-disable */


(function() {
  var factory = function(getters) {
      var api = getters[0](), APIModule = getters[1](), apiNameAndEnumConvert2 = getters[2](), apiOptions = getters[3]();
      var moduleName = "books", apiAlias = "query-index-book-list";

      var apiDefinition = {
          api: "mcp/booksWeb/web/bookWebList",
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
                  "title": "资料列表",
                  "description": "首页图书列表",
                  "type": "object",

                  "properties": {
                      "findCount": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "num",
                          "@name": "findCount"
                      },

                      "projectIds": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "projectIds",
                          "@name": "projectIds"
                      },

                      "showClient": {
                          "type": "string",
                          "required": true,
                          "default": "",
                          "@alias": "showClient",
                          "@name": "showClient"
                      }
                  },

                  "required": ["findCount", "projectIds", "showClient"]
              });
          },

          responseDataNameAndEnumMapMethod: function(api, data) {
              return apiNameAndEnumConvert2(data, {
                  "id": "http://json-schema.org/draft-04/schema#",
                  "$schema": "http://json-schema.org/draft-04/schema#",
                  "title": "资料列表",
                  "description": "首页图书列表",
                  "type": "array",

                  "items": {
                      "type": "object",
                      "required": ["link", "imgPath", "name", "bookLights"],

                      "properties": {
                          "link": {
                              "type": "string",
                              "required": true,
                              "default": "",
                              "@alias": "bookUrl",
                              "@name": "link"
                          },

                          "imgPath": {
                              "type": "string",
                              "required": true,
                              "default": "",
                              "@alias": "bookPicpath",
                              "@name": "imgPath"
                          },

                          "name": {
                              "type": "string",
                              "required": true,
                              "default": "",
                              "@alias": "bookName",
                              "@name": "name"
                          },

                          "bookLights": {
                              "type": "array",
                              "required": true,
                              "default": "",

                              "items": {
                                  "type": "object",
                                  "required": ["content"],

                                  "properties": {
                                      "content": {
                                          "type": "string",
                                          "required": true,
                                          "default": "",
                                          "@alias": "content",
                                          "@name": "content"
                                      }
                                  }
                              },

                              "@alias": "bookLights",
                              "@name": "bookLights"
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

  var defineModule = new Function("return this")().defineModule;
  var pluginName = "nl:books/query-index-book-list";

  if (typeof define === "function") {
      define([
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/api.js",
          "@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/APIModule.js",
          "@youlu/niceloo/libs/@xlib.01/lib/apiNameAndEnumConvert2.js",
          "./api..query-index-book-list.options.js"
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
          "nl:books/query-index-book-list$options=./api..query-index-book-list.options.js"
      ], factory, defineModule.isEnvNode() ? {
          module: module
      } : null);
  }
})();