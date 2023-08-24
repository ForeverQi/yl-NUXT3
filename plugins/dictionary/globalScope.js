const init = () => {
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
export default {
    ...GLOBALSCOPE,
};
