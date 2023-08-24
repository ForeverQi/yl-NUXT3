const valitatorRules = require('./validator-rules');

export const Validator = function (formName, rules, errors) {
    // rules：{
    //     name:'required|regexp_hanzi',
    //     idCont: 'regexp_I'
    // }
    this.rules = rules;
    // let errors = {
    //     name:{
    //         required:'不能为空',
    //         regexp_hanzi:'得是汉字'
    //     },
    //     idCont:{
    //         regexp_I:'身份证号不对',
    //         regexp_H:'香港通行证不对',
    //         regexp_T:'台湾通行证不对',
    //     }
    // };
    this.error = errors;
    this.form = document.forms[formName];
    this.validatorList = [];
    this.init();
};
//初始化
Validator.prototype.init = function () {
    for (let key in this.rules) {
        let node = this.findNode(key);
        this.validatorList.push({
            name: key,
            value: '',
            childrenNode: node.childrenNode,
            parentNode: node.parentNode,
            borderColor: getComputedStyle(node.childrenNode).borderColor,
            ruleReg: this.defineRule(key), //[{rule:'hanzi',valitatorRules:fn(this.value),error:'请输入汉字'}]
            errors: '',
        });
    }
};
//动态修改校验规则
Validator.prototype.changeRules = function (rules, param) {
    let arrs = Object.keys(rules);
    this.rules = {
        ...this.rules,
        ...rules,
    };
    this.validatorList.forEach((val) => {
        if (arrs.includes(val.name)) {
            val.ruleReg = this.defineRule(val.name);
        }
    });
    if (param) {
        return this.validate(param);
    }
};
//校验执行者
Validator.prototype.validate = function (param) {
    let errorList = [];
    return new Promise((resolve, reject) => {
        for (let key in param) {
            this.validatorList.forEach((val) => {
                if (val.name == key) {
                    val.value = param[key];
                    this.runValidator(val);
                }
            });
        }

        this.validatorList.forEach((val) => {
            Object.keys(param).forEach((v) => {
                if (val.name == v && val.errors) {
                    errorList.push(val);
                }
            });
        });
        if (errorList.length > 0) {
            reject(this);
        } else {
            resolve();
        }
    });
};
//暴露出的展示错误
Validator.prototype.showError = function (name) {
    if (name) {
        let module;
        this.validatorList.forEach((val) => {
            if (val.name == name) {
                module = val;
            }
        });
        if (module.errors) {
            this.createError(module);
        }
    } else {
        this.validatorList.forEach((val) => {
            if (val.errors) {
                this.createError(val);
            }
        });
    }
};
//执行校验工具；
Validator.prototype.runValidator = function (module) {
    let n = 0;
    function run(param) {
        if (n >= module.ruleReg.length) {
            return;
        }
        if (param.valitatorRules(module.value)) {
            // 验证通过
            module.errors = '';
            n++;
            run(module.ruleReg[n]);
        } else {
            module.errors = param.error;
        }
    }
    run(module.ruleReg[n]);

    if (module.errors.length == 0 && module.newChildNode) {
        this.clear(module);
    }
};
//寻找节点
Validator.prototype.findNode = function (childenName) {
    let form = this.form;
    let childrenNode = form.querySelector(`[name="${childenName}"]`) || form.querySelector(`textarea[name="${childenName}"]`);
    let parentNode = childrenNode.parentNode;
    return {
        childrenNode,
        parentNode,
    };
};
//寻找验证规则
Validator.prototype.defineRule = function (name) {
    let rule = [];
    let ruleString = '';
    for (let key in this.rules) {
        if (name == key) {
            ruleString = this.rules[key];
        }
    }
    let arr = ruleString.replace(/\s/g, '').split('|');

    arr.forEach((val) => {
        if (valitatorRules[val]) {
            rule.push({
                rule: val,
                valitatorRules: valitatorRules[val],
                error: this.error[name][val],
            });
        }
    });

    return rule;
};
//生产错误提示
Validator.prototype.createError = function (module) {
    if (module.newChildNode) {
        module.newChildNode.innerText = module.errors;
        return;
    }
    let newChildNode = document.createElement('div');
    newChildNode.className = '_errorMessage';
    newChildNode.style.color = 'red';
    newChildNode.style.fontSize = '12px';
    newChildNode.innerText = module.errors;
    module.newChildNode = newChildNode;
    module.childrenNode.style.borderColor = 'red';
    if (module.childrenNode.nextSibling) {
        module.parentNode.insertBefore(newChildNode, module.childrenNode.nextSibling);
    } else {
        module.parentNode.appendChild(newChildNode);
    }
};
//清除错误提示
Validator.prototype.clear = function (module) {
    if (module) {
        module.childrenNode.style.borderColor = module.borderColor;
        module.parentNode.removeChild(module.newChildNode);
        module.newChildNode = null;
    } else {
        this.validatorList.forEach((val) => {
            if (val.newChildNode) {
                val.childrenNode.style.borderColor = val.borderColor;
                val.parentNode.removeChild(val.newChildNode);
                val.newChildNode = null;
            }
        });
    }
};
