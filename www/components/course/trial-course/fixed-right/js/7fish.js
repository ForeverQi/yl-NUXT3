export default {
    init(userInterface) {
        return new Promise((resolve, reject) => {
            (function (w, d, n, a, j) {
                w[n] =
                    w[n] ||
                    function () {
                        (w[n].a = w[n].a || []).push(arguments);
                    };
                j = d.createElement('script');
                j.onload = function () {
                    ysf('onready', function () {
                        if (!userInterface.getToken()) {
                            // 未登录
                            resolve();
                        } else {
                            // 已登录
                            userInterface.getUser().then((user) => {
                                if (user) {
                                    ysf('config', {
                                        uid: user.userMobile,
                                        name: user.userName,
                                        email: user.userEmail,
                                        mobile: user.userMobile,
                                        level: 1, // vip级别 有订单就是2 没订单就是1
                                        data: JSON.stringify([
                                            { key: 'real_name', value: user.userName },
                                            { key: 'mobile_phone', value: user.userMobile },
                                            { key: 'email', value: user.userEmail },
                                            {
                                                index: 1,
                                                key: 'sex',
                                                label: '年龄',
                                                value: user.userBirthday,
                                            },
                                            {
                                                index: 2,
                                                key: 'reg_count',
                                                label: '账号',
                                                value: user.userLoginname,
                                            },
                                            {
                                                index: 3,
                                                key: 'reg_date',
                                                label: '注册日期',
                                                value: user.userCreatedate,
                                            },
                                            {
                                                index: 4,
                                                key: 'reg_gender',
                                                label: '性别',
                                                value: user.userGender == 'F' ? '女士' : user.userGender == 'M' ? '先生' : '',
                                            },
                                        ]),
                                    });
                                    resolve();
                                } else {
                                    resolve();
                                }
                            });
                        }
                    });
                };
                j.onerror = reject;
                j.async = true;
                j.src = 'https://qiyukf.com/script/9161c252493775971e2c69f0ae9325a2.js?sessionInvite=false';
                d.body.appendChild(j);
            })(window, document, 'ysf');
        });
    },
    setUser(userIntance) {
        userIntance.getUser().then((user) => {
            ysf('config', {
                uid: user.userMobile,
                name: user.userName,
                email: user.userEmail,
                mobile: user.userMobile,
                level: 1, // vip级别 有订单就是2 没订单就是1
                data: JSON.stringify([
                    { key: 'real_name', value: user.userName },
                    { key: 'mobile_phone', value: user.userMobile },
                    { key: 'email', value: user.userEmail },
                    {
                        index: 1,
                        key: 'sex',
                        label: '年龄',
                        value: user.userBirthday,
                    },
                    {
                        index: 2,
                        key: 'reg_count',
                        label: '账号',
                        value: user.userLoginname,
                    },
                    {
                        index: 3,
                        key: 'reg_date',
                        label: '注册日期',
                        value: user.userCreatedate,
                    },
                    {
                        index: 4,
                        key: 'reg_gender',
                        label: '性别',
                        value: user.userGender == 'F' ? '女士' : user.userGender == 'M' ? '先生' : '',
                    },
                ]),
            });
        });
    },
};
