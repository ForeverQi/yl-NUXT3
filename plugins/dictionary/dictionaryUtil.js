import GLOBALSCOPE from './globalScope';

if (!GLOBALSCOPE.dictionary) GLOBALSCOPE.dictionary = {};
const ret = {
    load(map) {
        GLOBALSCOPE.dictionary = map || {};
    },
    set(key, map) {
        return (GLOBALSCOPE.dictionary[key] = map || {});
    },
    get(key) {
        return GLOBALSCOPE.dictionary[key] || {};
    },
};
export default {
    ...ret,
};
