<template>
    <div>
        <input
            v-show="false"
            class="el-upload__input"
            type="file"
            :name="name"
            ref="input"
            :accept="accept"
            capture="camera"
            :multiple="multiple"
            @change="handleChange"
        />
        <!--<div v-if="choseSrc">
            <div data-v-3ebd8327 class="el-dialog__wrapper" style="z-index: 2009">
                <div role="dialog" aria-modal="true" aria-label="dialog" class="el-dialog" style="margin-top: 15vh; z-index: 2001">
                    <div class="el-dialog__header">
                        <span class="el-dialog__title"></span>
                        <button type="button" aria-label="Close" class="el-dialog__headerbtn">
                            <i class="el-dialog__close el-icon el-icon-close" @click="choseSrc = ''"></i>
                        </button>
                    </div>
                    <div class="el-dialog__body">
                        <img :src="choseSrc" />
                    </div>
                </div>
            </div>
            <div class="v-modal" tabindex="0" style="z-index: 2000"></div>
        </div>-->
    </div>
</template>

<script>
import io from '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/io.js';
function noop() {}
export default {
    name: 'index',
    props: {
        limit: {
            type: String,
            default: '3',
        },
        accept: {
            type: String,
            default: '.gif,.png,.jpg,.jpeg',
        },
        size: {
            type: Number,
            default: 5,
        },
        action: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: 'file',
        },
        multiple: {
            type: Boolean,
        },
        autoUpload: {
            type: Boolean,
            default: true,
        },
        /*onStart: {
            type: Function,
            default: noop,
        },*/
        onProgress: {
            type: Function,
            default: noop,
        },
        onSuccess: {
            type: Function,
            default: noop,
        },
        onError: {
            type: Function,
            default: noop,
        },
        onChange: {
            type: Function,
            default: noop,
        },
    },
    data() {
        return {
            tempIndex: 1,
            /*choseSrc: '', //选择放大的图片*/
            uploadFiles: [],
        };
    },
    mounted() {
        let file = document.querySelector('input');
        if (this.getIos()) {
            file.removeAttribute('capture');
        }
        this.$picRotatUtil.ready(() => {
            console.log('exif.js加载完成');
        });
    },
    methods: {
        /*lookImg(val) {
            this.choseSrc = this.$urlUtils.getViewUrl(val);
        },*/
        inputClick() {
            this.$nextTick(() => {
                this.$refs.input.click();
            });
        },
        getIos() {
            if (navigator.userAgent.match(/Mac OS X/)) {
                return true;
            } else {
                return false;
            }
        },
        //初始化文件状态
        handleStart(rawFile) {
            rawFile.uid = Date.now() + this.tempIndex++;
            let file = {
                status: 'ready',
                name: rawFile.name,
                size: rawFile.size,
                percentage: 0,
                uid: rawFile.uid,
                raw: rawFile,
                /*beforeLoadUrl: '',*/
            };
            this.uploadFiles.push(file);
            /*this.onStart(this.uploadFiles);*/
        },
        handleProgress(ev, rawFile) {
            const file = this.getFile(rawFile);
            console.log('上传进度~~~~', ev.percent);
            file.status = 'uploading';
            file.percentage = ev.percent || 0;
            this.onProgress(ev, file, this.uploadFiles);
        },
        handleSuccess(res, rawFile) {
            const file = this.getFile(rawFile);
            if (file) {
                file.status = 'success';
                file.response = res;
                this.onSuccess(res, file, this.uploadFiles);
                /* this.onChange(file, this.uploadFiles);*/
            }
        },
        handleError(err, rawFile) {
            const file = this.getFile(rawFile);
            const fileList = this.uploadFiles;
            file.status = 'fail';
            fileList.splice(fileList.indexOf(file), 1);
            console.log(err);
            /*this.onError(err, file, this.uploadFiles);
                this.onChange(file, this.uploadFiles);*/
        },
        getFile(rawFile) {
            let fileList = this.uploadFiles;
            let target;
            fileList.every((item) => {
                target = rawFile.uid === item.uid ? item : null;
                return !target;
            });
            return target;
        },
        parsePercentage(val) {
            return parseInt(val, 10);
        },
        deleteFile(val) {
            this.uploadFiles = this.uploadFiles.filter((item) => {
                return item.uid !== val.uid;
            });
        },
        reset() {
            //清空
            this.uploadFiles = [];
        },
        handleChange(ev) {
            let files = ev.target.files;
            if (!files) return;
            if (this.limit && this.uploadFiles.length + files.length > this.limit) {
                this.$baseUI.alert(`最多只能添加${this.limit}张图片!`);
                return;
            }

            let postFiles = Array.prototype.slice.call(files);
            if (!this.multiple) {
                postFiles = postFiles.slice(0, 1);
            }
            if (postFiles.length === 0) {
                return;
            }

            postFiles.forEach((rawFile) => {
                console.log(rawFile);
                this.handleStart(rawFile);
                if (this.autoUpload) this.upload(rawFile);
            });
        },
        submit() {
            this.uploadFiles
                .filter((file) => file.status === 'ready')
                .forEach((file) => {
                    this.upload(file.raw);
                });
        },
        upload(rawFile) {
            this.$refs.input.value = null;
            if (this.beforeUpload(rawFile)) {
                return this.uploadFile(rawFile);
            } else {
                this.handleError('文件格式不对或者超出大小', rawFile);
            }
        },
        uploadFile(rawFile) {
            let formData = new FormData();
            formData.append('file', rawFile);
            return this.post(formData, rawFile)
                .then((data) => {
                    this.handleSuccess(data, rawFile);
                    return true;
                })
                .catch((msg) => {
                    this.handleError(msg, rawFile);
                    if (msg.getAttachedData().getResultCode() === 'GB2006') {
                        this.$baseUI.confirm({
                            title: '提示',
                            content: '文件上传失败!',
                            showCancel: false,
                            confirm: () => {
                                const regExtension = this.$Promotion.getClueExtensionInfo({
                                    clueWaycode: 'zhuce',
                                    originCode: 'guanwangzhuc',
                                    pageName: process.isClient ? document.title : '优路官网',
                                });
                                this.$ylPlugin.showLoginModal({ clue: { regExtension, clueExtension: regExtension } });
                            },
                        });
                    }
                    return false;
                });
        },
        beforeUpload(file) {
            const isJPG = this.accept.indexOf(file.type.split('/')[1]) > -1;
            const isLt2M = file.size / 1024 / 1024 < this.size;
            if (!isJPG) {
                this.$baseUI.alert(`只能上传${this.accept}文件`);
            }
            if (!isLt2M) {
                this.$baseUI.alert(`文件大小不可超过${this.size}MB`);
            }
            return isLt2M && isJPG;
        },
        post(formData, rawFile) {
            var self = this;
            return new Promise((resolve, reject) => {
                self.$callRawApi({
                    api: 'fs/file/upload/token',
                    onerror(_failure) {
                        reject(_failure);
                    },
                    onsuccess(data) {
                        let xhr = io.listenXMLHttpRequestStateChange({
                            apiResponseConverterId: 'file-service',
                            onsuccess(data) {
                                resolve(data);
                            },
                            onerror(_failure) {
                                reject(_failure.getDescription());
                            },
                        });
                        var uploadPath = self.$niceloo.path.getServerFileUploadPath({
                            uploadToken: data.uploadToken, // 上传凭证
                            fileTtl: 'temporary', // 文件生命周期。permanent - 永久有效；temporary - 临时有效；disposable - 一次性有效；
                            fileType: 'image', // 文件类型。image - 图片；html - HTML页面；
                            fileStoreLocation: 'niceloo', // 上传到的目标位置。niceloo - 优路服务；baidu - 百度；baidudoc - 百度文档；
                        });
                        uploadPath = self.action || uploadPath;
                        xhr.upload.onprogress = function progress(e) {
                            // 如果lengthComputable属性的值是false，那么意味着总字节数是未知并且total的值为零e.lengthComputable
                            if (e.total > 0) {
                                e.percent = (e.loaded / e.total) * 100;
                            }
                            self.handleProgress(e, rawFile);
                        };
                        /*xhr.upload.addEventListener('progress', updateProgress, false);*/
                        xhr.open('POST', uploadPath);
                        xhr.send(formData);
                        /*function updateProgress(e) {
                            // 如果lengthComputable属性的值是false，那么意味着总字节数是未知并且total的值为零
                            if (e.lengthComputable && e.total > 0) {
                                e.percent = (e.loaded / e.total) * 100;
                                console.log(e.percent);
                                self.handleProgress(e, rawFile);
                            }
                        }*/
                    },
                });
            });
        },
    },
};
</script>

<style scoped lang="less">
.el-dialog__body {
    text-align: center;
    img {
        max-width: 100%;
    }
}
.el-dialog__close:hover {
    color: red;
}
</style>
