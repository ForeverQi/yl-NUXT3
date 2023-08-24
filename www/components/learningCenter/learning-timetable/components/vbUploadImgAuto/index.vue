<template>
    <div>
        <vb-upload-base ref="vbUpload" :limit="limit" :size="size" :suffixs="suffixs" @inputChange="inputChange" @deleteFile="deleteFile" />
    </div>
</template>

<script>
import io from '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/io.js';
import vbUploadBase from '../vbUploadBase/index.vue';
export default {
    name: 'vbUploadImg',
    components: { vbUploadBase },
    props: {
        limit: {
            type: String,
            default: '3',
        },
        size: {
            type: Number,
            default: 20 * 1024 * 1024,
        },
        suffixs: {
            type: Array,
            default() {
                return ['jpg', 'png', 'jpeg', 'gif'];
            },
        },
        action: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            fileList: [],
            promiseList: [],
            response: [],
        };
    },
    watch: {
        fileList: {
            handler() {
                this.$emit('update:fileList', this.fileList);
            },
            deep: true,
            immediate: true,
        },
    },
    created() {},
    methods: {
        inputClick() {
            this.$refs.vbUpload.inputClick();
        },
        reset() {
            this.fileList = [];
            this.response = [];
            this.promiseList = [];
            this.$refs.vbUpload.reset();
        },
        inputChange(files) {
            this.response = [];
            this.promiseList = [];
            if (files && files.length > 0) {
                let val = [];
                for (let i = 0; i < files.length; i++) {
                    val.push(files[i]);
                }
                for (let file of val) {
                    this.fileList.push(file);
                    this.promiseList.push(
                        this.uploadFile(file).then(() => {
                            this.$refs.vbUpload.addFile(file);
                        })
                    );
                }
            }
            Promise.all(this.promiseList).then(() => {
                this.$emit('success', {
                    response: this.response,
                    fileList: this.fileList,
                });
            });
        },
        deleteFile(file) {
            this.fileList = this.fileList.filter((val) => {
                return val != file;
            });
        },

        upload(formData) {
            var self = this;
            return new Promise(function (resolve, reject) {
                self.$callRawApi({
                    api: 'fs/file/upload/token',
                    onerror(_failure) {
                        reject(_failure.getDescription());
                    },
                    onsuccess(data) {
                        var uploadToken = data.uploadToken;
                        let xhr;
                        xhr = io.listenXMLHttpRequestStateChange({
                            apiResponseConverterId: 'file-service',
                            onsuccess(data) {
                                resolve(data);
                            },
                            onerror(_failure) {
                                reject(_failure.getDescription());
                            },
                        });
                        var uploadPath = self.$niceloo.path.getServerFileUploadPath({
                            uploadToken, // 上传凭证
                            fileTtl: 'temporary', // 文件生命周期。permanent - 永久有效；temporary - 临时有效；disposable - 一次性有效；
                            fileType: 'image', // 文件类型。image - 图片；html - HTML页面；
                            fileStoreLocation: 'niceloo', // 上传到的目标位置。niceloo - 优路服务；baidu - 百度；baidudoc - 百度文档；
                        });
                        uploadPath = self.action || uploadPath;
                        xhr.open('POST', uploadPath);
                        xhr.send(formData);
                    },
                });
            });
        },
        uploadFile(files) {
            let formData = new FormData();
            formData.append('file', files);
            return this.upload(formData)
                .then((data) => {
                    this.response.push(data);
                    this.$refs.vbUpload.addFile(files);
                })
                .catch((msg) => {
                    alert('文件上传失败', msg);
                });
        },
    },
};
</script>

<style lang="less" scoped></style>
