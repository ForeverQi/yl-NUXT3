<template>
    <div class="image-text" :class="{ student: role === 'student' }">
        <div class="logo">
            <img src="../asset/images/teacher.png" v-if="role === 'teacher'" class="img" />
            <img src="../asset/images/zj.png" v-else-if="role === 'assistent'" class="img" />
            <img src="../asset/images/student.png" v-else-if="role === 'student'" class="img" />
        </div>
        <div class="content">
            <div class="name">
                {{ role === 'student' ? '' : itemData.roleName }}
            </div>
            <div class="wrap" v-html="showHTML" @click="showPic" ref="wrap"></div>
        </div>
        <course-image-preview :pic="showImagePic" v-if="showMaxPic" @close="showMaxPic = false" />
    </div>
</template>
<script>
import CourseImagePreview from '../CourseImagePreview.vue';
import defaultImg from '../asset/images/default.png';
import HTMLAST from './ast.js';
export default {
    components: {
        CourseImagePreview,
    },
    props: {
        role: {
            type: String,
            default: 'teacher',
        },
        itemData: {
            type: Object,
            default() {
                return {
                    filePath: '',
                    roleName: '',
                    content: '',
                };
            },
        },
    },
    data() {
        return {
            defaultPic: defaultImg,
            imgCount: 1,
            showHTML: '',
            showImagePic: '',
            showMaxPic: false,
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            console.warn('====');
            let obj = HTMLAST(`${this.itemData.content}`);
            this.showHTML = this.createHTML(this.handleNode(obj));

            // this.$nextTick(() => {
            //   if (this.$refs.wrap.children.length > 0) {
            //     this.initImage();
            //   } else {
            //     setTimeout(() => {
            //       // this.initImage();
            //     }, 200);
            //   }
            // });
        },
        initImage() {
            let list = this.$refs.wrap.querySelectorAll('img');
            list.forEach((r) => {
                let bsrc = r.getAttribute('bsrc');
                let image = new Image();
                image.src = bsrc;
                image.onload = function () {
                    // r.src = bsrc;
                };
            });
        },
        createHTML(obj) {
            let str = '';
            if (obj.node === 'text') {
                return obj.text;
            }

            if (!Array.isArray(obj.child)) {
                return str;
            }

            obj.child.forEach((r) => {
                if (r.node === 'element') {
                    if (r.tag === 'img') {
                        str += '<div class="line-img">';
                    }
                    str += `<${r.tag}`;
                    // 初始属性
                    if (Array.isArray(r.attrs) && r.attrs.length > 0) {
                        r.attrs.forEach((ra, index) => {
                            // if (ra.name === 'src' && r.tag === 'img') {
                            //   str += ' ' + ra.name + '="' + this.defaultPic + '"';
                            //   str += ' bsrc="' + ra.value + '"';
                            // } else {
                            //   str += ' ' + ra.name + '="' + ra.value + '"';
                            // }
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
                    } else if (r.tag === 'img') {
                        str += ' />';
                        str += `<span class="mask">图${this.imgCount++}</span>`;
                        str += '</div>';
                    } else {
                        str += ' />';
                    }
                } else if (r.node === 'text') {
                    str += r.text;
                }
            });

            return str;
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
        showPic(ev) {
            let wrapNode = this.checkWrap(ev.target, 'line-img');
            if (wrapNode === false) {
                return false;
            }

            let oImg = wrapNode.querySelector('img');
            if (oImg) {
                this.showImagePic = oImg.src;
                this.showMaxPic = true;
            }
        },
        checkWrap(target, className) {
            if (target.classList.contains(className)) {
                return target;
            }
            while ((target = target.parentNode)) {
                if (target.classList.contains(className)) {
                    return target;
                } else if (target.tagName === 'BODY') {
                    return false;
                }
            }
        },
    },
};
</script>
<style lang="less" scoped>
.image-text {
    padding-top: 24px;
    display: flex;
    word-break: break-all;

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
        max-width: 580px;
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

        /deep/ .line-img {
            position: relative;
            width: 150px;
            height: 94px;
            margin-top: 12px;
            border-radius: 6px;
            overflow: hidden;
            cursor: pointer;

            .mask {
                position: absolute;
                width: 32px;
                height: 16px;
                font-size: 12px;
                color: #ffffff;
                line-height: 16px;
                text-align: center;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                border-radius: 6px 0px 6px 0px;
            }
            .img {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
