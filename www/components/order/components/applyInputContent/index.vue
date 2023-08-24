<template>
    <div class="inp-wrap">
        <div class="pic">
            <div class="label">成绩截图：</div>
            <div class="content">
                <div class="upload-pic" @click="selectFile" v-if="type !== 'show'">
                    <div class="close" v-if="form.scoreImageUrl && tmpFilePath" @click.stop="clearFile">×</div>
                    <img :src="$urlUtils.getViewUrl(form.scoreImageUrl)" class="example-pic" v-if="form.scoreImageUrl && tmpFilePath" />
                    <img src="./asset/images/plus.png" class="plus" v-else />
                    <input type="file" @change="changeFile" accept="image/*" class="fileInp" ref="fileInp" />
                </div>
                <div class="upload-pic example">
                    <div class="example-wrap">
                        <img src="./asset/images/example.png" @click="showMaxPic" v-if="type !== 'show'" class="example-pic nh" />
                        <img v-else :src="$urlUtils.getViewUrl(form.scoreImageUrl)" @click="showMaxPic" class="example-pic" />
                    </div>
                    <div class="pic-tip" v-if="type !== 'show'">示例图片</div>
                </div>
                <div class="intro" v-if="type !== 'show'">
                    <div class="tip">上传图片说明：</div>
                    <div class="line">1、图片必须保证清晰，不能模糊；</div>
                    <div class="line">2、图片格式为：png、jpg、jpeg；</div>
                    <div class="line">3、单张图片大小不能超过5M</div>
                </div>
            </div>
        </div>
        <div class="input-wrap" v-if="settingInfo.accountShow === 'Y'">
            <div class="label" :class="{ required: settingInfo.accountType === 'Y' }">成绩查询账号：</div>
            <div class="content">
                <input
                    type="text"
                    v-model.trim="form.scoreQueryAccount"
                    :placeholder="type === 'show' ? '' : '请输入查询成绩账号'"
                    maxlength="50"
                    autocomplete="new-password"
                    :disabled="type === 'show'"
                    class="inp"
                />
            </div>
        </div>
        <div class="input-wrap" v-if="settingInfo.pwdShow === 'Y'">
            <div class="label" :class="{ required: settingInfo.pwdType === 'Y' }">成绩查询密码：</div>
            <div class="content">
                <input
                    :type="pwdType"
                    :key="uniqueStr"
                    v-model.trim="form.scoreQueryPwd"
                    :disabled="type === 'show'"
                    maxlength="50"
                    autocomplete="new-password"
                    :placeholder="type === 'show' ? '' : '请输入查询成绩密码'"
                    class="inp"
                />
                <i v-if="type === 'show' && form.scoreQueryPwd.length > 0" class="eye" :class="showPwd === false ? '' : 'open'" @click="switchPwdStatus()"></i>
                <div class="tip">成绩查询密码仅用于本次申请续学核查成绩使用，续学办理完成后请及时修改密码</div>
            </div>
        </div>
        <div class="all-wrap" v-if="showImg">
            <div class="close" @click="showImg = false">×</div>
            <img :src="imgSrc" class="max-img" />
        </div>
    </div>
</template>
<script>
import '@/api/selfLearn/api..query-score-query-pwd.js';
import io from '@youlu/niceloo/libs/@xlib.01/niceloo/apiserver/io.js';
export default {
    props: {
        settingInfo: {
            type: Object,
            default() {
                return {
                    accountShow: '',
                    accountType: '',
                    pwdShow: '',
                    pwdType: '',
                };
            },
        },
        formData: {
            type: Object,
            default() {
                return {
                    scoreImageUrl: '',
                    scoreQueryAccount: '',
                    scoreQueryPwd: '',
                };
            },
        },
        type: {
            type: String,
            default: 'edit',
        },
    },
    data() {
        return {
            showImg: false,
            imgSrc: null,
            suffixs: ['jpg', 'png', 'jpeg'],
            size: 5 * 1024 * 1024,
            form: {
                scoreImageUrl: '',
                scoreQueryAccount: '',
                scoreQueryPwd: '',
            },
            tmpFilePath: '',
            showPwd: false,
            orgPwd: '',
            pwdType: 'text',
            uniqueStr: '11',
        };
    },
    watch: {
        formData: {
            handler(val) {
                let tmp = val.scoreImageUrl.split(',');
                if (tmp.length === 1) {
                    tmp.push(tmp[1]);
                }
                this.form = {
                    ...val,
                    scoreImageUrl: tmp[0],
                };
                this.tmpFilePath = tmp[1];
                this.orgPwd = val.scoreQueryPwd;
            },
            deep: true,
        },
        type(val) {
            if (val === 'repeatEdit' || val === 'show') {
                this.pwdType = 'text';
            }
        },
        [`form.scoreQueryPwd`](val) {
            if (this.type === 'repeatEdit' || this.type === 'show') {
                return;
            }
            if (val.length > 0) {
                this.pwdType = 'password';
            } else {
                this.pwdType = 'text';
                this.$nextTick(() => {
                    this.uniqueStr = 'str_' + Math.random();
                });
            }
        },
    },
    mounted() {
        if (this.type === 'repeatEdit' || this.type === 'show') {
            this.pwdType = 'text';
        }

        this.form = {
            scoreImageUrl: '',
            scoreQueryAccount: '',
            scoreQueryPwd: '',
            ...this.formData,
        };
        // if (this.form.scoreImageUrl) {
        //     let tmp = this.form.scoreImageUrl.split(',');
        //     if (tmp.length === 2) {
        //         this.form.scoreImageUrl = tmp[0];
        //         this.tmpFilePath = tmp[1];
        //     } else {
        //         this.form.scoreImageUrl = tmp[0];
        //         this.tmpFilePath = tmp[0];
        //     }
        // }

        this.orgPwd = this.formData.scoreQueryPwd;
    },
    methods: {
        showMaxPic(ev) {
            this.showImg = true;
            this.imgSrc = ev.target.src;
        },
        clearFile() {
            this.form.scoreImageUrl = '';
        },
        getFormData() {
            let scoreImageUrl = '';
            if (this.tmpFilePath && this.form.scoreImageUrl) {
                scoreImageUrl = `${this.form.scoreImageUrl},${this.tmpFilePath}`;
            }
            return {
                ...this.form,
                scoreImageUrl,
            };
        },
        switchPwdStatus() {
            if (this.type === 'show' && this.showPwd === false) {
                this.getPwd().then(() => {
                    this.pwdType = 'text';
                    this.showPwd = true;
                });
            } else {
                this.form.scoreQueryPwd = this.orgPwd;
                this.showPwd = false;
            }
        },
        getPwd() {
            return this.$callApi('selfLearn/query-score-query-pwd', {
                applyId: this.formData.applyId,
            }).then((res) => {
                let ret = res.getData();
                this.form.scoreQueryPwd = ret.scoreQueryPwd;
            });
        },
        selectFile() {
            // 上次图片
            this.$refs.fileInp.value = null;
            this.$refs.fileInp.click();
        },
        changeFile(ev) {
            let files = ev.target.files;
            console.log(files, 'files');
            if (!this.beforeUpload(ev.target.files)) {
                return;
            }

            if (/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)) {
                this.$picRotatUtil.checkDirection(files[0], (data) => {
                    this.doUpload([data]);
                });
            } else {
                this.doUpload(files);
            }
        },
        doUpload(files) {
            let promiseList = [];
            if (files && files.length > 0) {
                let val = [];
                for (let i = 0; i < files.length; i++) {
                    let formData = new FormData();
                    formData.append('file', files[0], files[0].name);
                    val.push(formData);
                }
                for (let file of val) {
                    promiseList.push(
                        this.uploadFile(file).then((res) => {
                            console.log('@@@1111', res);
                            this.form.scoreImageUrl = res.filePath;
                        })
                    );
                    this.uploadFile(file).then((res) => {
                        console.log('@@@222', res);
                        this.tmpFilePath = res.filePath;
                    });
                }
            }
        },
        uploadFile(formData) {
            var self = this;
            return new Promise(function (resolve, reject) {
                self.$callRawApi({
                    api: 'fs/file/upload/token',
                    onerror(_failure) {
                        self.$niceloo.api.handleFailure(_failure);
                    },
                    onsuccess(data) {
                        var uploadToken = data.uploadToken;
                        let xhr = io.listenXMLHttpRequestStateChange({
                            apiResponseConverterId: 'file-service',
                            onsuccess(data) {
                                resolve(data);
                            },
                            onerror(_failure) {
                                self.niceloo.api.handleFailure(_failure);
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
        beforeUpload(files) {
            // 校验格式 type
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
    },
};
</script>
<style lang="less" scoped>
.all-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);

    .max-img {
        height: 90%;
    }

    .close {
        position: absolute;
        top: 30px;
        right: 30px;
        width: 20px;
        height: 20px;
        background-color: #fff;
        font-size: 20px;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
        cursor: pointer;
    }
}
.fileInp {
    display: none;
}
.pic {
    display: flex;
    .label {
        display: flex;
        &::before {
            content: '*';
            display: inline-block;
            color: #e73928;
        }
    }
    .content {
        display: flex;
        .upload-pic {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 100px;
            margin-right: 51px;
            border: 1px dashed #dddddd;
            border-radius: 2px;

            .close {
                width: 14px;
                height: 14px;
                position: absolute;
                top: -7px;
                right: -7px;
                background: red;
                text-align: center;
                line-height: 14px;
                border-radius: 50%;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
            }
            .example-pic {
                width: 100%;
                height: 100%;
                cursor: pointer;

                &.nh {
                    height: auto;
                }
            }

            &.example {
                height: auto;
                flex-direction: column;
                border: none;

                .example-wrap {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px dashed #dddddd;
                    width: 100px;
                    height: 100px;
                }
                .pic-tip {
                    padding-top: 10px;
                    font-size: 12px;
                    color: #4285f5;
                }
            }

            .plus {
                width: 24px;
                height: 24px;
            }
        }

        .intro {
            .tip {
                color: #e73928;
                font-size: 12px;
                padding-bottom: 12px;
            }
            .line {
                color: #333333;
                font-size: 12px;
                line-height: 18px;
            }
        }
    }
}
.input-wrap {
    display: flex;
    padding-top: 21px;

    .label {
        line-height: 30px;

        &.required {
            &::before {
                content: '*';
                display: inline-block;
                color: #e73928;
            }
        }
    }
    .content {
        position: relative;
        .eye {
            width: 20px;
            height: 20px;
            display: inline-block;
            background: url('./asset/images/nl_icon2.png') no-repeat;
            position: absolute;
            top: 6px;
            background-position: -40px -20px;
            right: 35px;
            cursor: pointer;
            display: none \9;

            &.open {
                background-position: -60px -20px;
                // right: 331px;
                // left: auto;
                cursor: pointer;
                display: none \9;
            }
        }
        .inp {
            width: 405px;
            height: 32px;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 0 10px;
            box-sizing: border-box;
            padding-right: 35px;

            &::placeholder {
                color: #333333;
                font-size: 12px;
            }
        }

        .tip {
            color: #333333;
            font-size: 12px;
            padding-top: 4px;
        }
    }
}
.label {
    width: 120px;
    font-size: 16px;
    color: #333333;
    margin-right: 8px;
}
</style>
