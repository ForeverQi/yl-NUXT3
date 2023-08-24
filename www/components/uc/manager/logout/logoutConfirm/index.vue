<template>
    <div>
        <tab :data="tabArray" :active-index="activeIndex" @select="selectTab" />
        <div class="wrap">
            <div class="go-back-box" @click="goBack">
                <img class="back-icon" src="./asset/images/back-icon.png" alt="" />
                返回上一页
            </div>
            <explain />
            <product />
            <reminder />
            <agree @on-btn-click="handleBtnClick" />
            <remindMask v-if="isMaskShow" :class-count="classCount" @close="handleCloseClick" @jumpLogoutReason="jumpLogoutReason" />
        </div>
    </div>
</template>

<script>
import explain from './components/explain/index.vue';
import product from './components/product/index.vue';
import reminder from './components/reminder/index.vue';
import agree from './components/agree/index.vue';
import remindMask from './components/remindMask/index.vue';
import { tabData } from './js/data.js';
import vbMask from '@/www/components/vbMask/index.vue';
import tab from '@/www/components/tab/tabX/index.vue';

export default {
    components: {
        explain,
        product,
        reminder,
        agree,
        vbMask,
        remindMask,
        tab,
    },
    data() {
        return {
            isMaskShow: false,
            tabArray: tabData, // tab按钮
            activeIndex: 1, // 选中的tab
            userInfo: {},
            classCount: 0, // 有效期内班级的数量
        };
    },
    async mounted() {
        if (this.$User.getToken()) {
            this.userInfo = await this.$User.getUser();
        }
    },
    methods: {
        handleBtnClick() {
            this.getStudentclassList();
        },

        handleCloseClick() {
            this.isMaskShow = false;
        },
        jumpLogoutReason() {
            this.isMaskShow = false;
            this.$router.replace({
                path: `/uc/manager/personalCenter/logoutReason`,
            });
        },
        //tab切换
        selectTab(index) {
            if (index === 0) {
                this.$router.replace({
                    path: `/uc/manager/personalCenter/personalInfo`,
                });
            } else if (index === 1) {
                this.$router.replace({
                    path: `accountSafe`,
                });
            }
            this.isMaskShow = false;
        },
        // 获取有效期的班级数量
        getStudentclassList() {
            this.$callRawApi({
                api: 'bd/studentclass/profile/list',
                params: { userId: this.userInfo.userId, studentclassExpire: 'N' },
            })
                .catch((err) => {
                    this.$niceloo.api.handleFailure(err);
                    return Promise.reject(err);
                })
                .then((_reponse) => {
                    let res = _reponse.getData();
                    if (res.data.length) {
                        this.isMaskShow = true;
                        this.classCount = res.data.length;
                    } else {
                        this.$router.replace({
                            path: `/uc/manager/personalCenter/logoutReason`,
                        });
                        this.isMaskShow = false;
                    }
                });
        },
        goBack() {
            this.$router.replace({
                path: `/uc/manager/personalCenter/accountSafe`,
            });
        },
    },
};
</script>

<style lang="less" scoped>
.wrap {
    background: #fff;
    text-align: center;
    padding: 32px 0 80px;
    margin-top: 10px;
    .go-back-box {
        margin-left: 38px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;
        font-weight: 400;
        text-align: LEFT;
        color: #53586c;
        line-height: 14px;
        cursor: pointer;
        .back-icon {
            margin-right: 8px;
            width: 18px;
            height: 18px;
        }
    }
}
</style>
