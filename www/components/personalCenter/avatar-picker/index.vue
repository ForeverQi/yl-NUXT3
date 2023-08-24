<template>
    <div class="picker-avatar-mask">
        <div class="picker-wrap">
            <button class="picker-close" @click="handleCloseClick" type="button">
                <img src="./asset/images/close.png" class="picker-icon" />
            </button>
            <div class="picker-header">
                <h2>选择头像</h2>
            </div>
            <div class="picker-avatar-preview">
                <img :src="avatar" class="picker-avatar" />
            </div>

            <p class="picker-tips">头像预览</p>
            <hr class="picker-split-line" />
            <div class="picker-avatar-container">
                <div class="picker-avatar-item-wrapper" @click="handleItemClick(item)" v-for="item in avatarList" :key="item.id">
                    <img :src="item.url" class="picker-avatar-item" />
                    <img v-if="item.isChecked" src="./asset/images/checked.png" class="picker-avatar-checked" />
                </div>
            </div>
            <div class="picker-footer">
                <button class="picker-sure" @click="handleSureClick" :disabled="disabled" type="button">保存修改</button>
            </div>
        </div>
    </div>
</template>
<script>
import '@/api/uc/api..query-avatar-list.js';
import '@/api/uc/api.UC0005.save-user-info.js';

export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    /**
     * 数据模型
     *
     * @returns {object} 数据模型
     */
    data() {
        return {
            userInfo: {
                userAvatar: '',
            },
            avatarList: [],
            defaultAvatar: require('./asset/images/default.png'),
        };
    },
    computed: {
        /**
         * 是否可以点击
         *
         * @returns {boolean} 是否可以点击
         */
        disabled() {
            return this.avatarList.every((item) => item.isChecked === false) || this.avatarList.length <= 0;
        },
        /**
         * 头像地址
         *
         * @returns {boolean} 头像地址
         */
        avatar() {
            const item = this.avatarList.find(({ isChecked }) => isChecked);
            if (item) {
                return item.url;
            } else if (this.userInfo.userAvatar) {
                return this.$urlUtils.getViewUrl(this.userInfo.userAvatar);
            }
            return this.defaultAvatar;
        },
    },
    watch: {
        show: {
            /**
             * 监听显隐状态
             *
             @param {boolean} newV 当前值
             */
            handler(newV) {
                if (newV) {
                    Promise.all([this.getAvatarList(), this.getUserInfo()]).then(() => {
                        this.avatarList.forEach((item) => (item.isChecked = this.userInfo.userAvatar === item.originUrl));
                    });
                }
            },
            immediate: true,
        },
    },
    methods: {
        /**
         * 获取个人信息
         *
         *  @returns {Promise} 异步对象
         */
        getUserInfo() {
            if (typeof ylPlugin !== 'undefined') {
                return ylPlugin.login.getUser().then((user) => {
                    console.warn(user);
                    Object.assign(this.userInfo, user);
                });
            } else {
                return Promise.resolve();
            }
        },
        /**
         * 关闭事件回调
         */
        handleCloseClick() {
            this.$emit('update:show', false);
        },
        /**
         * 确认事件回调
         */
        handleSureClick() {
            const item = this.avatarList.find(({ isChecked }) => isChecked);
            const user = { userAvatar: item ? item.originUrl : this.userInfo.userAvatar };
            this.$callApi('uc/save-user-info', user)
                .then(() => {
                    return this.$User.updateUserInfo();
                })
                .then(() => {
                    this.$store.commit('common/userLogin/setPopUpLogin');
                    this.handleCloseClick();
                });
        },
        /**
         * 获取头像列表
         *
         * @returns {Promise} 异步对象
         */
        getAvatarList() {
            return this.$callApi('uc/query-avatar-list')
                .then((res) => res.getData())
                .then((res) => {
                    const n = Date.now();
                    this.avatarList.splice(
                        0,
                        this.avatarList.length,
                        ...res.map((item, index) => {
                            return {
                                id: n + index,
                                url: this.$urlUtils.getViewUrl(item),
                                originUrl: item,
                                isChecked: false,
                            };
                        })
                    );
                });
        },
        /**
         * 点击回调函数
         *
         * @param {object} row 点击对象
         */
        handleItemClick(row) {
            this.avatarList.forEach((item) => (item.isChecked = item === row));
        },
    },
};
</script>
<style lang="less" scoped>
.picker-avatar-mask {
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 3000;
    .picker-wrap {
        width: 560px;
        overflow: auto;
        background-color: white;
        display: inline-block;
        border-radius: 10px;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);

        .picker-footer {
            text-align: center;
            margin-top: 32px;
            margin-bottom: 28px;
            .picker-sure {
                width: 224px;
                height: 46px;
                border: none;
                outline: none;
                border-radius: 8px;
                background: linear-gradient(90deg, #ff6870, #f8323c);
                color: white;
                font-weight: bold;
                cursor: pointer;
                &[disabled='disabled'] {
                    background: gray;
                }
            }
        }

        .picker-header {
            position: relative;
            padding-top: 20px;
            h2 {
                font-size: 18px;
                text-align: center;
                color: #333;
            }
        }
        .picker-close {
            background-color: transparent;
            border: none;
            outline: none;
            position: absolute;
            top: 14px;
            right: 14px;
            cursor: pointer;
            z-index: 10;
            .picker-icon {
                width: 12px;
                height: 12px;
            }
        }
        .picker-avatar-preview {
            text-align: center;
            margin-top: 44px;
            .picker-avatar {
                width: 90px;
                height: 90px;
                border-radius: 50%;
            }
        }
    }
}
.picker-tips {
    color: #53586c;
    font-size: 18px;
    text-align: center;
    margin-top: 12px;
    line-height: 24px;
}
.picker-split-line {
    margin-top: 24px;
    border-top: 1px dashed #d7d7d7;
    border-left: none;
    border-right: none;
    border-bottom: none;
    height: 1px;
    margin-left: 20px;
    margin-right: 20px;
}
.picker-avatar-container {
    margin-top: 24px;
    padding-left: 12px;
    padding-right: 60px;
    display: flex;
    flex-wrap: wrap;
    min-height: 275px;
    max-height: 320px;
    overflow: auto;
    .picker-avatar-item-wrapper {
        position: relative;
        margin-left: 48px;
        width: 72px;
        height: 72px;
        cursor: pointer;
        .picker-avatar-item {
            width: 72px;
            height: 72px;
            border-radius: 50%;
        }

        .picker-avatar-item-checked {
            border: 2px solid #f8323c;
        }

        .picker-avatar-checked {
            width: 16px;
            height: 16px;
            position: absolute;
            right: 2px;
            bottom: 2px;
        }
    }

    .picker-avatar-item-wrapper:nth-child(n + 5) {
        margin-top: 24px;
    }
}
</style>
