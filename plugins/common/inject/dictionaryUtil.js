import Vue from 'vue';

if (!GLOBALSCOPE.dictionary) GLOBALSCOPE.dictionary = {};

const ret = {
    load: function (map) {
        GLOBALSCOPE.dictionary = map || {};
    },
    set: function (key, map) {
        return (GLOBALSCOPE.dictionary[key] = map || {});
    },
    get: function (key) {
        // if(!GLOBALSCOPE.dictionary[key]){
        //   demand_loading(key);
        // }debugger;
        return GLOBALSCOPE.dictionary[key] || {};
    },
};
Vue.prototype.dictionaryUtil = ret;
