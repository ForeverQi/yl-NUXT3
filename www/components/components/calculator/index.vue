<template>
    <div class="calBox" v-show="show">
        <div class="calu">
            <input type="text" v-model="current" />
            <ul class="one">
                <li class="clea" @click="press">C</li>
                <li class="rec" @click="press">x²</li>
                <li class="sq" @click="press">√</li>
                <li class="oper" @click="press">%</li>
                <li class="num" @click="press">7</li>
                <li class="num" @click="press">8</li>
                <li class="num" @click="press">9</li>
                <li class="oper" @click="press">/</li>
                <li class="num" @click="press">4</li>
                <li class="num" @click="press">5</li>
                <li class="num" @click="press">6</li>
                <li class="oper" @click="press">*</li>
                <li class="num" @click="press">1</li>
                <li class="num" @click="press">2</li>
                <li class="num" @click="press">3</li>
                <li class="oper" @click="press">-</li>
                <li class="num" @click="press">0</li>
                <li class="num" @click="press">.</li>
                <li class="gray deng" @click="press">=</li>
                <li class="oper" @click="press">+</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    //计算器
    name: 'calculator',
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    data: function data() {
        return {
            current: '',
            changeMode: true,
        };
    },

    methods: {
        press(event) {
            var me = this;
            if (me.current == 'NaN') {
                me.current = '';
            }
            me.current += '';
            try {
                me.pressdo(event);
            } catch (e) {
                console.error(e);
                me.current = 'NaN';
            }
        },
        pressdo(event) {
            var me = this;
            var key = event.target.textContent;

            if (
                key != '=' &&
                key != 'C' &&
                key != '*' &&
                key != '/' &&
                key != '√' &&
                key != 'x²' &&
                key != '%' &&
                key != '<=' &&
                key != '±' &&
                key != 'sin' &&
                key != 'cos' &&
                key != 'tan' &&
                key != 'log' &&
                key != 'ln' &&
                key != 'x^' &&
                key != 'x !' &&
                key != 'π' &&
                key != 'e' &&
                key != 'rad' &&
                key != '∘'
            ) {
                me.current += key;
            } else if (key === '=') {
                // 只能输入数字、+、-、*、/、. 这几个字符
                let reg = /^[0-9+\-*./]*$/;
                if (!reg.test(me.current)) {
                    return (me.current = NaN);
                }
                if (me.current.indexOf('^') > -1) {
                    var base = me.current.slice(0, me.current.indexOf('^'));
                    var exponent = me.current.slice(me.current.indexOf('^') + 1);
                    // eslint-disable-next-line no-eval
                    me.current = Number(this.$numberUtil.toFixed(eval('Math.pow(' + base + ',' + exponent + ')'), 10));
                } else {
                    // eslint-disable-next-line no-eval
                    me.current = Number(this.$numberUtil.toFixed(eval(me.current), 10));
                }
            } else if (key === 'C') {
                me.current = '';
            } else if (key === '*') {
                me.current += '*';
            } else if (key === '/') {
                me.current += '/';
            } else if (key === '+') {
                me.current += '+';
            } else if (key === '-') {
                me.current += '-';
            } else if (key === '±') {
                if (me.current.charAt(0) === '-') {
                    me.current = me.current.slice(1);
                } else {
                    me.current = '-' + me.current;
                }
            } else if (key === '<=') {
                me.current = me.current.substring(0, me.current.length - 1);
            } else if (key === '%') {
                me.current = this.$numberUtil.div(me.current, 100);
            } else if (key === 'π') {
                me.current = me.current * Math.PI;
            } else if (key === 'x²') {
                //debugger;
                me.current = this.$numberUtil.mul(me.current, me.current);
            } else if (key === '√') {
                me.current = Math.sqrt(me.current);
            } else if (key === 'sin') {
                me.current = Math.sin(me.current);
            } else if (key === 'cos') {
                me.current = Math.cos(me.current);
            } else if (key === 'tan') {
                me.current = Math.tan(me.current);
            } else if (key === 'log') {
                me.current = Math.log10(me.current);
            } else if (key === 'ln') {
                me.current = Math.log(me.current);
            } else if (key === 'x^') {
                me.current += '^';
            } else if (key === 'x !') {
                if (me.current === 0) {
                    me.current = '1';
                } else if (me.current < 0) {
                    me.current = NaN;
                } else {
                    var _number = 1;
                    for (var i = me.current; i > 0; i--) {
                        _number = this.$numberUtil.mul(_number, i);
                    }
                    me.current = _number;
                }
            } else if (key === 'e') {
                me.current = Math.exp(me.current);
            } else if (key === 'rad') {
                me.current = this.$numberUtil.mul(me.current, this.$numberUtil.div(Math.PI, 180));
            } else if (key === '∘') {
                me.current = this.$numberUtil.mul(me.current, this.$numberUtil.div(180, Math.PI));
            }
        },
        changeModeEvent() {
            var me = this;
            me.changeMode = !me.changeMode;
        },
    },
};
</script>

<style scoped>
.calBox {
    width: 275px;
    padding-bottom: 10px;
    border-radius: 5px;
    position: absolute;
    box-shadow: 0px 0px 10px rgba(153, 153, 153, 0.8), 0px 0px 10px rgba(0, 0, 0, 0.5) inset;
    background: #f9f9f9;
    overflow: hidden;
}
.calu input {
    width: 220px;
    height: 50px;
    margin: 10px 7px 0px;
    border-radius: 5px;
    border: 1px solid #c6c7bf;
    box-shadow: 0px 5px 2px rgba(157, 157, 145, 0.8) inset;
    -webkit-box-shadow: 0px 5px 2px rgba(157, 157, 145, 0.8) inset;
    outline: none;
    background: #fcfdeb;
    text-align: right;
    font-size: 20px;
    padding: 0px 10px;
    color: #333;
}
.calu li {
    list-style: none;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #d4cece;
    float: left;
    cursor: pointer;
    margin: 5px;
    color: #333;
}
.calu ul.one {
    width: 250px;
    padding: 5px;
}
.calu li.gray {
    background: #9ca2a2;
    color: #fff;
    border: 1px solid #9ca2a2;
}
.twoBox {
    width: 353px;
    overflow: hidden;
}
.two {
    width: 358px;
}
.calBox .three {
    margin: 0px;
}
.calu {
    padding: 0px 10px;
    width: 470px;
}
</style>
