<template>
    <div>
        <ul class="el-upload-list el-upload-list--picture-card">
            <li tabindex="0" class="el-upload-list__item is-success" v-for="item in fileList" :key="item.a">
                <img :src="item.src" alt class="el-upload-list__item-thumbnail" />
                <a class="el-upload-list__item-name">
                    <i class="el-icon-document"></i>
                </a>
                <label class="el-upload-list__item-status-label">
                    <i class="el-icon-upload-success el-icon-check"></i>
                </label>
                <i class="el-icon-close"></i>
                <!---->
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview">
                        <i class="el-icon-zoom-in" @click="choseSrc = item.src"></i>
                    </span>
                    <span class="el-upload-list__item-delete">
                        <i class="el-icon-delete" @click="deleteFile(item)"></i>
                    </span>
                </span>
            </li>
        </ul>

        <div tabindex="0" class="el-upload el-upload--picture-card" @click="inputClick" v-show="fileList.length < limit">
            <i class="el-icon-plus"></i>
            <input type="file" name="file" class="el-upload__input" :id="componentId" capture="camera" multiple @change="inputChange" />
        </div>
        <!-- 放大预览 -->

        <div v-show="choseSrc">
            <div data-v-3ebd8327 class="el-dialog__wrapper" style="z-index: 2009">
                <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog" style="margin-top: 15vh; z-index: 2001">
                    <div class="el-dialog__header">
                        <span class="el-dialog__title"></span>
                        <button type="button" aria-label="Close" class="el-dialog__headerbtn">
                            <i class="el-dialog__close el-icon el-icon-close" @click="choseSrc = ''"></i>
                        </button>
                    </div>
                    <div class="el-dialog__body">
                        <img data-v-3ebd8327 width="100%" :src="choseSrc" />
                    </div>
                </div>
            </div>
            <div class="v-modal" tabindex="0" style="z-index: 2000"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        suffixs: {
            type: Array,
            default() {
                return ['jpg', 'png', 'jpeg', 'gif'];
            },
        },
        limit: {
            type: String,
            default: '3',
        },
        size: {
            type: Number,
            default: 20 * 1024 * 1024,
        },
    },
    data() {
        return {
            componentId: 'upload' + this.$DateUtil.getUUID(),
            fileList: [],
            choseSrc: '',
        };
    },
    mounted() {
        var file = document.querySelector('input');
        if (getIos()) {
            file.removeAttribute('capture');
        }
        function getIos() {
            if (navigator.userAgent.match(/Mac OS X/)) {
                return true;
            } else {
                return false;
            }
        }

        this.$picRotatUtil.ready(() => {
            console.log('exif.js加载完成');
        });
    },
    methods: {
        deleteFile(file) {
            this.fileList = this.fileList.filter((val) => {
                return val != file;
            });
            this.$emit('deleteFile', file);
        },
        reset() {
            //清空
            this.fileList = [];
        },
        inputChange() {
            let input = document.querySelector('#' + this.componentId);
            var files = input.files;

            let beforeUpload = this.beforeUpload(files);

            // return
            if (!beforeUpload) {
                return;
            }
            // this.$emit("inputChange", files);
            //     input.value = "";
            //     return;
            if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
                this.$picRotatUtil.checkDirection(files[0], (data) => {
                    this.$emit('inputChange', [data]);
                    input.value = '';
                });
            } else {
                this.$emit('inputChange', files);
                input.value = '';
            }
        },
        inputClick() {
            let input = document.querySelector('#' + this.componentId);
            input.click();
        },
        beforeUpload(files) {
            // 校验格式
            if (files && Object.keys(files).length > 0) {
                for (let file of Object.values(files)) {
                    if (this.suffixs) {
                        if (
                            this.suffixs.filter((item) => {
                                return file.name.substr(-item.length, item.length) == item;
                            }).length === 0
                        ) {
                            this.$baseUI.alert(`只能上传${this.suffixs}文件`);
                            return false;
                        }
                    }
                    if (this.size) {
                        if (file.size > this.size) {
                            this.$baseUI.alert(`文件大小不可超过${this.size / 1024 / 1024}MB`);
                            return false;
                        }
                    }
                }
            }

            return true;
        },

        addFile(file) {
            //统计文件 size
            file.cmputedSize = this.calculateFileSize(file.size);

            //1. 如果是图片文件
            if (file.type.indexOf('image') >= 0) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    file.src = reader.result;
                    this.fileList.push(file);
                };
            }

            //2. 如果是 pdf 文件
            // if (file.type.indexOf('pdf') >= 0) {
            //     this.pdfList.push({ file });
            // }
        },
        // file size 单位转换
        calculateFileSize(bytes) {
            if (bytes === 0) return '0 B';
            else {
                let k = 1024;
                let unit = ['B', 'KB', 'MB'];
                let i = Math.floor(Math.log(bytes) / Math.log(k));
                let result = (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + unit[i];
                return result;
            }
        },
    },
};
</script>

<style lang="less">
// .fade-enter-active, .fade-leave-active {
//   transition: opacity .5s
// }
// .fade-enter, .fade-leave-active {
//   opacity: 0
// }
</style>
