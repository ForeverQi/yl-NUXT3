<template>
    <div class="dialog-wrap">
        <!--分配学管师-开启企业微信配置  -->
        <div class="open-WeCom" v-if="isShowLearningManager">
            <div class="title">Hi～学员您好，</div>
            <div class="subheading">我是您的专属学管师，在接下来的学习过程中，我将全程督学陪伴您，欢迎随时联系我~</div>
            <div class="WeCom-name">
                <span class="name">我的企业微信：{{ learningManager.alias || learningManager.name }}</span>
                <span class="youlu">@优路教育</span>
            </div>
            <div class="WeCom-qrcode">
                <img :src="learningManager.qr_code" alt="" />
                <!--<img class="thumb_avatar" :src="learningManager.thumb_avatar" alt="" />-->
            </div>
            <div class="scan-tip">扫一扫上面的二维码图片，添加我为好友</div>
            <span class="close" @click="handleClose"></span>
        </div>

        <!--分配学管师-未开启企业微信配置 -->
        <div class="no-open-WeCom" v-else-if="isShowLearningManagerN">
            <div class="title">Hi～学员您好，</div>
            <div class="subheading">我是您的专属学管师，在接下来的学习过程中，我将全程督学陪伴您，欢迎随时联系我~</div>
            <div class="tel-tip">有任何问题，欢迎随时联系！</div>
            <div class="tel">电话：{{ learningManager.mobile || '-' }}</div>
            <span class="close" @click="handleClose"></span>
        </div>
        <!--未分配学管师-->
        <!--开启企业微信配置-分配学管师-离职-->
        <!--因离职学管师拿不到企业微信信息，
        展示未分配学管师的页面-->
        <div class="no-student-manager" v-else>
            <img src="./asset/images/empty.png" alt="" />
            <div class="empty">学管师正在分配中，请耐心等待～</div>
            <div class="customer-service">
                如有疑问，请联系您的课程顾问或致电全国客服电话
                <span>400-861-8800</span>
            </div>
            <span class="close" @click="handleClose"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    props: {
        learningManager: {
            type: Object,
            default() {
                return {
                    eeUserid: '', // 学管师员工用户标识
                    weComOConfigOpenStatus: '', // 企业微信配置开启状态
                    /*thumb_avatar: '', // 员工企业微信头像*/
                    alias: '', // 员工企业微信别名
                    name: '', // 员工企业微信实名
                    eeWorkstatus: '',
                };
            },
        },
    },
    computed: {
        isShowLearningManager() {
            return (
                this.learningManager.eeUserid &&
                this.learningManager.name &&
                this.learningManager.weComOConfigOpenStatus === 'Y' &&
                ',O,W,I,'.includes(this.learningManager.eeWorkstatus)
            );
        },
        isShowLearningManagerN() {
            return (
                this.learningManager.eeUserid && this.learningManager.weComOConfigOpenStatus === 'N' && ',O,W,I,'.includes(this.learningManager.eeWorkstatus)
            );
        },
    },
    methods: {
        handleClose() {
            this.$emit('doClose', false);
        },
    },
};
</script>

<style scoped lang="less">
.no-open-WeCom {
    width: 480px;
    height: 390px;
    margin: 120px auto 0;
    background: url('./asset/images/small-bg.png') no-repeat;
    background-size: 100%;
    padding: 125px 40px 0;
    box-sizing: border-box;
    .tel-tip {
        margin-top: 20px;
        font-size: 16px;
        text-align: center;
        color: #8d90aa;
        line-height: 20px;
    }
    .tel {
        margin-top: 12px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        color: #3a3d4b;
        line-height: 20px;
        margin-bottom: 70px;
    }
}
.open-WeCom {
    width: 480px;
    height: 540px;
    margin: 120px auto 0;
    background: url('./asset/images/big-bg.png') no-repeat;
    background-size: 100%;
    padding: 125px 40px 0;
    box-sizing: border-box;
    .WeCom-name {
        font-size: 14px;
        color: #3a3d4b;
        line-height: 20px;
        margin-top: 20px;
        text-align: center;
        display: flex;
        justify-content: center;
        .name {
            max-width: 332px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .youlu {
            margin-left: 6px;
            font-size: 12px;
            color: #ff9a3e;
            line-height: 20px;
        }
    }
    .WeCom-qrcode {
        display: block;
        margin: 16px auto;
        position: relative;
        text-align: center;
        img {
            width: 160px;
            height: 160px;
        }
        /*.thumb_avatar {
            width: 36px;
            height: 36px;
            position: absolute;
            top: 62px;
            left: 182px;
        }*/
    }
    .scan-tip {
        font-size: 14px;
        color: #8d90aa;
        line-height: 20px;
        margin-bottom: 40px;
        text-align: center;
    }
}

.no-student-manager {
    margin: 120px auto 0;
    width: 480px;
    height: 540px;
    background: url('./asset/images/big-bg.png') no-repeat;
    background-size: 100%;
    padding: 169px 40px 0;
    box-sizing: border-box;
    img {
        width: 304px;
        height: 159px;
        margin: 0 auto;
        display: block;
    }
    .empty {
        font-size: 15px;
        font-weight: 400;
        text-align: center;
        color: #3a3d4b;
        line-height: 24px;
        margin-top: 12px;
        margin-bottom: 53px;
    }
    .customer-service {
        width: 221px;
        height: 48px;
        font-size: 13px;
        text-align: center;
        color: #8d90aa;
        line-height: 24px;
        margin: 0 auto 24px;
        span {
            font-weight: bold;
            color: #3a3d4b;
        }
    }
}

.title {
    font-size: 20px;
    font-weight: bold;
    color: #3a3d4b;
    line-height: 24px;
}
.subheading {
    opacity: 0.7;
    font-size: 14px;
    color: #3a3d4b;
    line-height: 20px;
    margin-top: 8px;
}
.close {
    width: 30px;
    height: 30px;
    background: url('./asset/images/close.png') no-repeat;
    background-size: 100%;
    display: block;
    text-align: center;
    margin: 20px auto 0;
    position: relative;
    top: 15px;
    cursor: pointer;
}
// .dialog-wrap {
//     position: fixed;
//     top: 0;
//     right: 0;
//     width: 100vw;
//     height: 100vh;
//     overflow: auto;
//     margin: 0;
//     z-index: 1000;
//     background-color: rgba(0, 0, 0, 0.5);
// }
</style>
