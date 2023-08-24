<template>
    <div class="question-wrap" :class="{ student: role === 'student' }">
        <div class="logo">
            <img src="../asset/images/teacher.png" v-if="role === 'teacher'" class="img" />
            <img src="../asset/images/zj.png" v-else-if="role === 'assistent'" class="img" />
            <img src="../asset/images/student.png" v-else-if="role === 'student'" class="img" />
        </div>
        <div class="content">
            <div class="name">
                {{ role === 'student' ? '' : itemData.roleName }}
            </div>
            <div class="wrap">
                <div class="title">
                    <span class="type">【{{ queryMap[itemData.questionType] ? queryMap[itemData.questionType] : '' }}】</span>
                    <span v-html="createHTML(querySubject.title)"></span>
                    <!-- <img v-for="(img, index) in querySubject.imgs" :key="`${index}_title`" :src="img.path" class="line-img" /> -->
                </div>
                <div class="item-wrap">
                    <div
                        class="item"
                        :class="{ this: selectList.includes(item.type) }"
                        v-for="(item, index) in querySubject.option"
                        :key="index"
                        @click="selectItem(item)"
                    >
                        {{ itemData.questionType === 'J' ? '' : item.type + '、' }}
                        <span v-html="createHTML(item.content)"></span>
                        <!-- <img v-for="(img, index) in item.imgs" :key="`${index}_item`" :src="img.path" class="line-img" /> -->
                    </div>
                    <!-- <div class="item this">A. 新型农村社会养老保险制度</div>
          <div class="item">A. 新型农村社会养老保险制度</div>
          <div class="item">A. 新型农村社会养老保险制度<img class="img" src="http://ufiletest.niceloo.com/api/file/download?action=view&path=2019/12/06/15756006740570512.jpg" /></div> -->
                </div>
                <el-popover placement="top" v-model="showPopover" trigger="manual" content="请选择试题答案！">
                    <template slot="reference">
                        <div class="btn" :class="{ disabled: isJump }" v-if="itemData.questionType === 'M' || itemData.questionType === 'I'" @click="doSubmit">
                            提交
                        </div>
                    </template>
                </el-popover>
            </div>
        </div>
    </div>
</template>
<script>
import HTMLAST from './ast.js';

export default {
    props: {
        role: {
            type: String,
            default: 'teacher',
        },
        itemData: {
            type: Object,
            default() {
                return {
                    questionContent: '',
                    questionType: '',
                    roleName: '',
                };
            },
        },
    },
    data() {
        return {
            queryMap: {
                J: '判断题',
                M: '多选题',
                S: '单选题',
                I: '不定项',
            },
            isJump: false, // 是否进行到下一个交互中
            querySubject: {},
            selectList: [],
            showPopover: false,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.querySubject = JSON.parse(this.itemData.pcQuestionContent);
        },
        selectItem(obj) {
            if (this.isJump) {
                return;
            }

            if (this.itemData.questionType === 'J' || this.itemData.questionType === 'S') {
                this.selectList = [obj.type];
                this.isJump = true;
                this.$emit('doNext', obj.type);
            } else if (this.itemData.questionType === 'M' || this.itemData.questionType === 'I') {
                if (this.selectList.includes(obj.type)) {
                    // 数据已存在
                    let index = this.selectList.findIndex((r) => r === obj.type);

                    if (index > -1) {
                        this.selectList.splice(index, 1);
                    }
                } else {
                    this.selectList.push(obj.type);
                }
            }
        },
        createHTML(html) {
            let obj = HTMLAST(html);
            console.log(obj, 'chtml');
            let chtml = this.doCreateHTML(this.handleNode(obj));

            return chtml;
        },
        handleNode(obj) {
            if (!obj.child) {
                if (obj.node === 'element' && obj.tag === 'img') {
                    obj.attrs = obj.attrs.map((r1) => {
                        if (r1.name === 'src') {
                            r1.value = this.$urlUtils.getViewUrl(r1.value);
                        }

                        return r1;
                    });
                }

                return obj;
            }
            obj.child = obj.child.map((r) => {
                return this.handleNode(r);
            });

            return obj;
        },
        doCreateHTML(obj) {
            let str = '';
            if (obj.node === 'text') {
                return obj.text;
            }

            if (!Array.isArray(obj.child)) {
                return str;
            }

            obj.child.forEach((r) => {
                if (r.node === 'element') {
                    str += `<${r.tag}`;
                    // 初始属性
                    if (Array.isArray(r.attrs) && r.attrs.length > 0) {
                        r.attrs.forEach((ra, index) => {
                            str += ' ' + ra.name + '="' + ra.value + '"';
                        });
                    }

                    if (r.tag === 'img') {
                        str += ' class="img"';
                    }
                    if (Array.isArray(r.child)) {
                        str += '>';
                        str += this.createHTML(r);
                        str += `</${r.tag}>`;
                    } else {
                        str += ' />';
                    }
                } else if (r.node === 'text') {
                    str += r.text;
                }
            });

            return str;
        },
        doSubmit() {
            if (this.isJump) {
                return;
            }
            if (this.selectList.length === 0) {
                this.showPopover = true;
                setTimeout(() => {
                    this.showPopover = false;
                }, 2000);
                return;
            }
            this.isJump = true;
            this.$emit('doNext', this.selectList.join(','));
        },
    },
};
</script>
<style lang="less" scoped>
.line-img {
    display: block;
    max-width: 100%;
    max-height: 100%;
}
.question-wrap {
    padding-top: 24px;
    display: flex;

    &.student {
        flex-direction: row-reverse;

        .logo {
            margin-right: 0;
            margin-left: 12px;
        }
        .content {
            .name {
                text-align: right;
                height: 1px;
            }

            .wrap {
                color: #3a3d4b;
                background-color: #cdd9ef;
                &::before {
                    left: auto;
                    right: -5px;
                    background-color: #cdd9ef;
                }

                .title {
                    color: #3a3d4b;

                    .type {
                        color: #3a3d4b;
                        font-weight: 700;
                    }

                    /deep/ .img {
                        max-height: 100%;
                        max-width: 100%;
                    }
                }

                .item-wrap {
                    .item {
                        color: #3a3d4b;
                        background-color: rgba(246, 247, 248, 0.35);

                        &.this {
                            color: #3a3d4b;
                            background-color: #ffffff;
                        }

                        /deep/ .img {
                            max-height: 100%;
                            max-width: 100%;
                        }
                    }
                }

                .btn {
                    color: #ff2e30;
                    background: #ffffff;
                    cursor: pointer;
                }
            }
        }
    }

    .logo {
        width: 36px;
        height: 36px;
        margin-right: 12px;
        .img {
            width: 100%;
            height: 100%;
        }
    }

    .content {
        .name {
            font-size: 12px;
            color: #fff;
            text-align: left;
            line-height: 16px;
            margin-bottom: 5px;
            margin-top: 5px;
            padding-left: 3px;
        }
    }
    .wrap {
        position: relative;
        max-width: 546px;
        padding: 14px 20px;
        font-size: 14px;
        text-align: left;
        color: #3a3d4b;
        line-height: 22px;
        border-radius: 4px;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.02);
        box-shadow: 0px 2px 4px 1px rgba(11, 42, 113, 0.05);

        &::before {
            content: '';
            display: inline-block;
            width: 8px;
            height: 8px;
            background-color: #fff;
            position: absolute;
            top: 6px;
            left: -4px;
            transform: rotate(45deg);
        }

        .title {
            font-size: 14px;
            text-align: left;
            text-align: left;
            color: #3a3d4b;
            line-height: 19px;
            .type {
                color: #ff2e30;
            }
            /deep/ .img {
                max-height: 100%;
                max-width: 100%;
            }
        }

        .item-wrap {
            padding-top: 8px;

            .item {
                padding: 10px 16px;
                font-size: 14px;
                text-align: left;
                color: #3a3d4b;
                line-height: 20px;
                background-color: #f6f7f8;
                border-radius: 6px;
                margin-top: 8px;
                line-height: 100%;
                cursor: pointer;

                /deep/ .img {
                    max-height: 100%;
                    max-width: 100%;
                }

                // .img {
                //   display: block;
                //   width: 150px;
                //   height: 94px;
                //   margin-top: 6px;
                //   border-radius: 4px;
                //   // vertical-align: middle;
                // }

                &.this {
                    background-color: #fff2f0;
                    color: #ff2e30;
                }
            }
        }

        .btn {
            width: 120px;
            height: 36px;
            color: #ffffff;
            font-size: 14px;
            text-align: center;
            line-height: 36px;
            background: linear-gradient(100deg, #ff2e30 8%, #ff957a 100%);
            border-radius: 18px;
            margin: 20px auto;
            margin-bottom: 6px;
            cursor: pointer;

            &.disabled {
                color: #99a1af;
                background: #f0f1f2;
            }
        }
    }
}
</style>
