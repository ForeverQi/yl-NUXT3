import Platform from './platform';

let scope = null;
const ret = {
    init(scope_) {
        scope = scope_;
    },
    show() {
        if (Platform.isNode()) return;
        scope.mask = true;
        scope.loading = false;
    },
    hide() {
        if (Platform.isNode()) return;
        scope.mask = false;
        scope.loading = false;
    },
    showLoading() {
        if (Platform.isNode()) return;
        if (scope) scope.loading = true;
        else
            setTimeout(function () {
                ret.showLoading();
            }, 200);
    },
    hideLoading() {
        if (Platform.isNode()) return;
        scope.loading = false;
    },
};
export default {
    ...ret,
};
