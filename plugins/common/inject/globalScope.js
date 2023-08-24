import Vue from 'vue';
const init = function () {
    return {
        dictionary: {},
        callBackMap: {},
    };
};
const GLOBALSCOPE = {
    ...init(),
    clear() {
        let initMap = init();
        for (var k in initMap) {
            GLOBALSCOPE[k] = initMap[k];
        }
    },
};
Vue.prototype.GLOBALSCOPE = GLOBALSCOPE;
