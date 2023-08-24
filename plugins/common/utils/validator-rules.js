module.exports = {
    hanzi(value) {
        if (value) {
            let reg = /[\u4E00-\u9FA5]/;
            return reg.test(value);
        } else {
            return true;
        }
    },
    required(value) {
        //非空
        let val = value;
        if (val && typeof val == 'string') {
            val = val.replace(/\s/g, '');
        }
        return !!val;
    },
    name(value) {
        //姓名两到15个字符
        if (!value) return true;
        // let reg = /^(?:[\u4e00-\u9fa5]+)(?:·[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z]*[a-zA-Z]+$/;
        let reg = /^.{2,15}$/;
        return new RegExp(reg).test(value);
    },

    I(value) {
        //身份证
        if (value) {
            let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
            return reg.test(value);
        } else {
            return true;
        }
    },
    H(value) {
        if (value) {
            let reg = /^[HMhm]\d{9,10}$/;
            return reg.test(value);
        } else {
            return true;
        }
    },
    T(value) {
        if (value) {
            let reg = /^\d{8}$/;
            return reg.test(value);
        } else {
            return true;
        }
    },
    O(value) {
        //退伍军人身份证
        if (value) {
            let reg = /^\d{17}[\dXx]$/;
            return reg.test(value);
        } else {
            return true;
        }
    },
    // 验证手机号
    mobile(value) {
        if (!value) return true;
        let reg = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        return new RegExp(reg).test(value);
    },
    // 验证座机
    telPhone(value) {
        if (!value) return true;
        let reg = /^\d{3,4}([-]?)+\d{7,8}$/;
        return new RegExp(reg).test(value);
    },
    //邮箱
    email(value) {
        if (!value) return true;
        let reg = /^\w+@[a-z0-9]+\.[a-z]+$/i;
        return new RegExp(reg).test(value);
    },
    //地址 3~100
    address(value) {
        if (!value) return true;
        let reg = /^.{3,100}$/;
        // let reg = /^[\u4e00-\u9fa5]{3,100}$/;
        return new RegExp(reg).test(value);
    },
    //收货人 至少填写2个
    receiver(value) {
        if (!value) return true;
        let reg = /[\u4E00-\u9FA5]{1}.*[\u4E00-\u9FA5]{1}/;
        return new RegExp(reg).test(value);
    },
};
