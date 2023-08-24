<template>
    <div class="wrong-question" :class="{ student: role === 'student' }">
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
                    <span v-html="createHTML(querySubject.title)"></span>
                    <!-- <img v-for="(img, index) in querySubject.imgs" :key="`${index}_title`" :src="img.path" class="line-img" /> -->
                </div>
                <div class="options">
                    <div class="item" v-for="(item, index) in querySubject.option" :key="index">
                        {{ item.type }}、
                        <span v-html="createHTML(item.content)"></span>
                        <!-- <img v-for="(img, index) in item.imgs" :key="`${index}_item`" :src="img.path" class="line-img" /> -->
                    </div>
                </div>
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
            querySubject: {},
            showText: '',
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.querySubject = JSON.parse(this.itemData.pcQuestionContent);
        },
        createHTML(html) {
            let obj = HTMLAST(html);
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
    },
};
</script>
<style lang="less" scoped>
.line-img {
    max-width: 100%;
    max-height: 100%;
}
.wrong-question {
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
            }

            .wrap {
                color: #ffffff;
                background-color: #ff2e30;
                &::before {
                    left: auto;
                    right: -5px;
                    background-color: #ff2e30;
                }

                /deep/ .img {
                    max-height: 100%;
                    max-width: 100%;
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
        max-width: 481px;
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

        /deep/ .img {
            max-height: 100%;
            max-width: 100%;
        }
    }
}
</style>
