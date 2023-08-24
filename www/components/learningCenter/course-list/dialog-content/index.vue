<script lang="jsx">
export default {
    render() {
        return (
            <div class="dialog-wrap">
                <div class="dialog-content">
                    <div class="title">
                        <div class="name">有奖问卷</div>
                        <div class="intro">优路学员学习体验问卷调研</div>
                        <div class="mark"></div>
                    </div>
                    <div class="conent">
                        <p class="line">亲爱的学员：</p>
                        <p class="line">您好！</p>
                        <p class="line p">
                            为了提高学习效率、优化您的学习体验，优路教育诚挚邀请您参加本次学员问卷调研活动，完成问卷填写后，优路教育将为您自动开通相应课程奖励。再次感谢您的参与！
                        </p>
                        <div
                            class="btn"
                            onClick={() => {
                                this.$emit('doClose', true);
                            }}
                        >
                            查看详细内容
                        </div>
                    </div>
                </div>
                <div
                    class="dialog-bottom"
                    onClick={() => {
                        this.$emit('doClose', false);
                    }}
                ></div>
            </div>
        );
    },
};
</script>
<style lang="less" scoped>
.dialog-wrap {
    background-color: transparent;
}
.dialog-content {
    .title {
        position: relative;
        background-image: url(./asset/images/bg.png);
        background-size: 100% 100%;
        height: 169px;
        padding-left: 37px;
        border-radius: 32px 32px 0 0;
        background-color: #fff;

        .name {
            padding-top: 30px;
            padding-bottom: 8px;
            font-size: 36px;
            font-weight: 600;
            text-align: left;
            color: #69190e;
            line-height: 50px;
        }
        .intro {
            color: #6c1c10;
            line-height: 25px;
            font-size: 18px;
            width: 246px;
        }
        .mark {
            position: absolute;
            right: -46px;
            top: -64px;
            width: 250px;
            height: 278px;
            background-image: url(./asset/images/mark.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    }

    .conent {
        padding: 24px 37px 32px 37px;
        background-color: #fff;
        border-radius: 0 0 32px 32px;

        .line {
            font-size: 16px;
            color: #3a3d4b;
            line-height: 40px;
            // padding-bottom: 16px;
            padding-left: 3px;
            font-size: 20px;

            &.p {
                text-indent: 2em;
            }
        }
    }

    .btn {
        width: 301px;
        height: 60px;
        margin: 0 auto;
        margin-top: 85px;
        text-align: center;
        line-height: 60px;
        font-size: 24px;
        color: #fff;
        cursor: pointer;
        background: linear-gradient(84deg, #ff7e85 5%, #ff4750 93%);
        border-radius: 30px;
        box-shadow: 0px 2px 8px 0px rgba(248, 50, 60, 0.34);
    }
}
.dialog-bottom {
    margin: 0 auto;
    margin-top: 16px;
    width: 56px;
    height: 56px;
    cursor: pointer;
    background-image: url(./asset/images/close.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>
