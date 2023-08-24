<template>
    <div class="cancel-bind-tip-wrap">
        <div class="table-details">
            <div class="top-title">
                注销提醒
                <img @click="closeClick" class="close-img" src="./asset/images/close.png" alt="优路教育" />
            </div>
            <div class="cancel-tip-box">
                <p class="cancel-tip-content">您目前账户下还有{{ classCount }}个班级在有效期内，</p>
                <p class="cancel-tip-content">您确定要注销账户吗？</p>
            </div>
            <div class="button-box">
                <div class="sure-button" @click="jumpLogoutReason()">继续注销</div>
                <div class="cancel-button" @click="jumpLearningCenter()">去我的课程看看</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        classCount: {
            type: Number,
            default: 0,
        },
    },
    methods: {
        closeClick() {
            this.$emit('close');
        },
        // 跳转到我的课程
        jumpLearningCenter() {
            this.$PageUtil.href('/learningCenter/index/myCourse');
            this.$emit('close');
        },
        // 跳转到选择注销原因页面
        jumpLogoutReason() {
            this.$emit('jumpLogoutReason');
        },
    },
};
</script>

<style lang="less" scoped>
.cancel-bind-tip-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 200;
    top: 0px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    min-width: 1200px;
    .table-details {
        // margin-top: 200px;
        width: 441px;
        // height: 374px;
        background: #fff;
        box-sizing: border-box;
        padding: 40px 0;
        border-radius: 12px;
        z-index: 200;
        min-width: 441px;
        .top-title {
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            font-size: 22px;
            font-weight: 700;
            color: #000000;
            line-height: 30px;
            position: relative;
            .close-img {
                width: 18px;
                height: 18px;
                position: absolute;
                top: -20px;
                right: 20px;
                cursor: pointer;
            }
        }

        .cancel-tip-box {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 56px;
        }
        .cancel-tip-content {
            font-size: 16px;
            font-weight: 400;
            text-align: CENTER;
            color: #3a3d4b;
            line-height: 16px;
        }
    }

    .button-box {
        margin-top: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .sure-button {
        margin-right: 32px;
        height: 36px;
        border: 1px solid #ff2e30;
        border-radius: 18px;
        box-sizing: border-box;
        color: #ff2e30;
        font-size: 16px;
        text-align: center;
        cursor: pointer;
        padding: 6px 18px;
    }
    .cancel-button {
        height: 36px;
        box-sizing: border-box;
        text-align: center;
        background: linear-gradient(90deg, #ff6870, #f8323c 100%);
        border-radius: 18px;
        padding: 6px 18px;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
        outline: none;
    }
}
</style>
