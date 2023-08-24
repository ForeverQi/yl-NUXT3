let scope = null;
const ret = {
    init(scope_) {
        scope = scope_;
    },
    alert(ops) {
        var callback = null;
        if (ObjUtil.isString(ops) || ObjUtil.isNumber(ops)) {
            ops = {
                type: '',
                title: '',
                content: ops + '',
            };
        }
        if (scope)
            scope.showModal({
                type: ops.type,
                title: ops.title,
                content: ops.content,
                showCancel: false,
                confirmText: ops.confirmText,
                success(res) {
                    if (callback) callback();
                },
            });
        return {
            then(cb) {
                callback = cb;
            },
        };
    },
    confirm(ops) {
        if (scope)
            scope.showModal({
                type: ops.type,
                title: ops.title,
                content: ops.content,
                showCancel: ops.showCancel,
                confirmText: ops.confirmText,
                cancelText: ops.cancelText,
                success(res) {
                    if (ops.success) ops.success(res);
                    if (res.confirm) {
                        if (ops.confirm) ops.confirm();
                    } else if (res.cancel) {
                        if (ops.cancel) ops.cancel();
                    }
                },
            });
    },
};
export default {
    ...ret,
};
