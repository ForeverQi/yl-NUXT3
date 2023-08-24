<template>
    <div class="appraise-textarea">
        <div class="title">{{ showIndex }}.{{ itemData.questionName }}</div>
        <div class="content" v-if="$parent.type !== 'show'" :style="{ height: itemData.uploadStatus === 'Y' ? '305px' : '245px' }">
            <div class="hidden">{{ showIndex }}.</div>
            <div class="content-wrap">
                <textarea maxlength="500" class="text" placeholder="请输入" @input="changeVal" v-model="text"></textarea>
                <div class="upload" v-if="itemData.uploadStatus === 'Y'">
                    <input type="file" ref="fileDom" name="file" class="fileStyle" @change="changeData" />
                    <div class="img" v-for="(item, index) in pictureList" :key="index">
                        <img src="./asset/images/deleteBtn.svg" class="closeBtn" @click="delImg(index)" />
                        <el-image style="width: 100%; height: 100%" :src="item" :preview-src-list="pictureList"></el-image>
                    </div>
                    <div class="img" @click="selectFile" v-if="pictureList.length < 3">
                        <img src="./asset/images/up.png" />
                    </div>
                </div>
            </div>
        </div>
        <div class="contentTxt" v-else>
            <div class="hidden">{{ showIndex }}.</div>
            <div class="content-wrap">
                <span class="txt">{{ itemData.replyContent }}</span>
                <div class="upload" v-if="itemData.uploadStatus === 'Y'">
                    <div class="img" v-for="(item, index) in pictureList" :key="index">
                        <el-image style="width: 100%; height: 100%" :src="item" :preview-src-list="pictureList"></el-image>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        itemData: {
            type: Object,
            default() {
                return {};
            },
        },
        showIndex: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            orgData: {},
            pictureList: [],
            pushPic: [],
            text: '',
            xHeight: '228',
        };
    },
    mounted() {
        let list = [];
        if (this.itemData.replyPictures) {
            list = this.itemData.replyPictures.split(',');
        }
        list = list.map((r) => {
            r = this.$urlUtils.getViewUrl(r);
            return r;
        });
        this.pictureList = list;
        this.orgData = this.itemData;
    },
    methods: {
        changeVal(ev) {
            console.log(ev.target.scrollHeight);
            this.text = ev.target.value;
            // if (this.itemData.uploadStatus === 'Y') {
            //     this.xHeight = 228 + ev.target.scrollHeight - 123 + '';
            // } else {
            //     this.xHeight = ev.target.scrollHeight + 43 + '';
            // }
            this.orgData.replyContent = this.text;
            this.$emit('updateData', this.orgData.id, this.orgData);
        },
        selectFile() {
            // 设置上传文件类型
            this.$refs.fileDom.accept = 'image/*';
            this.$refs.fileDom.click();
        },
        changeData(ev) {
            const files = ev.target.files;
            let formData = new FormData();
            formData.append('file', files[0], files[0].name);
            // 获取token
            this.$callRawApi({
                api: 'fs/file/upload/token',
                params: {},
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let res = _reponse.getData();
                    return this.uploadFile(formData, res.uploadToken);
                })
                .then((res) => {
                    this.pictureList.push(this.$urlUtils.getViewUrl(res.data.filePath));
                    this.pushPic.push(res.data.filePath);
                    this.orgData.replyPictures = this.pushPic.join(',');
                    this.$emit('updateData', this.orgData.id, this.orgData);
                    this.$refs.fileDom.value = null;
                });
        },
        uploadFile(fileData, token) {
            let params = {
                fileTtl: 'permanent',
                fileType: 'image',
                fileStoreLocation: 'alioss',
                uploadToken: token,
            };
            let url = this.$nuxt.$niceloo.path.getServerFileUploadPath(params);
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    let contentType = xhr.getResponseHeader('Content-Type');
                    let data = xhr.responseText;
                    if (contentType.startsWith('application/json')) {
                        data = JSON.parse(data);
                    }
                    resolve(data);
                };
                xhr.onerror = () => {
                    reject(xhr);
                };
                xhr.open('POST', url, true);
                // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                xhr.send(fileData);
            });
        },
        delImg(index) {
            this.pictureList.splice(index, 1);
            this.pushPic.splice(index, 1);
            this.orgData.replyPictures = this.pushPic.join(',');
            this.$emit('updateData', this.orgData.id, this.orgData);
        },
    },
};
</script>
<style lang="less" scoped>
.appraise-textarea {
    padding: 16px 0;

    .hidden {
        visibility: hidden;
    }

    .title {
        font-size: 16px;
        color: #333333;
        font-weight: 700;
    }

    .content {
        display: flex;
        margin-top: 10px;
        padding: 14px 0;
        box-sizing: border-box;
        min-height: 245px;
        background-color: #f8f8f8;

        .content-wrap {
            display: flex;
            width: 100%;
            padding-right: 20px;
            flex-direction: column;
        }

        .text {
            flex: 1;
            width: 100%;
            height: 200px;
            border: none;
            outline: none;
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 15px;
            resize: none;
            background-color: transparent;
        }

        .upload {
            .img {
                cursor: pointer;
            }
        }
    }

    .contentTxt {
        display: flex;
        .txt {
            display: block;
            padding-top: 8px;
            color: #666;
            font-size: 14px;
            line-height: 20px;
            padding-bottom: 16px;
        }

        .content-wrap {
            display: flex;
            width: 100%;
            padding-right: 20px;
            flex-direction: column;
        }
    }
    .upload {
        display: flex;
        margin-right: 10px;
        .img {
            position: relative;
            width: 62px;
            height: 62px;
            margin-right: 10px;

            .closeBtn {
                display: block;
                width: 14px;
                height: 14px;
                position: absolute;
                top: 2px;
                right: 2px;
                z-index: 1;
                cursor: pointer;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .fileStyle {
        display: none;
    }
}
</style>
