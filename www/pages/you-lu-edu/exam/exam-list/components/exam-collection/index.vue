<template>
    <div class="exam-collection">
        <div v-for="(item, index) in collectionList" :key="index" class="collection-item" @click="getLoaginStatus(item)">
            <img class="img" :src="item.img" alt="" />
            <p class="title">{{ item.name }}</p>
        </div>
    </div>
</template>

<script>
import mix from '../mixins/index.js';
export default {
    mixins: [mix],
    data() {
        return {
            // 收藏列表枚举
            collectionList: [
                {
                    name: '错题本',
                    memberpapertypeCode: 'CTB',
                    img: require('../../../assets/img/errorbook.png'),
                },
                {
                    name: '收藏夹',
                    memberpapertypeCode: 'SCLX',
                    img: require('../../../assets/img/favorites.png'),
                },
                {
                    name: '练习记录',
                    memberpapertypeCode: 'LXJL',
                    img: require('../../../assets/img/exercise_records.png'),
                },
            ],
        };
    },
    methods: {
        handleClick({ memberpapertypeCode }) {
            var classUniquecode = this.$route.params.classUniquecode;
            var subjectId = this.$route.params.subjectId;
            var papertypeCode = this.$route.params.papertypeCode;
            var ptagId = this.$route.params.ptagId;
            this.$router.push(`/exam/index/collection/${memberpapertypeCode}/${classUniquecode}/${ptagId}/${papertypeCode}/${subjectId}`);
        },
        // 获取登录状态
        getLoaginStatus(item) {
            var promise = ylPlugin.login.isLogined();
            promise.then(
                /* 过程中没有失败 */
                (isLogined) => {
                    /* eslint-disable */
                    if (!!isLogined) {
                        this.handleClick(item);
                    } else {
                        this.toLogin(item);
                    }
                },
                (err) => {
                    /* 过程中有失败 */
                    console.error(err, '登录状态失败');
                }
            );
        },
        async toLogin({ memberpapertypeCode, name }) {
            const examProject = this.$storage.get('examProject') || { subjectName: '' };
            const examSubject = this.$storage.get('examSubject') || { subjectName: '' };
            const pageName = `${examProject.projectName}-${examSubject.subjectName}_${name}_优路教育题库`;
            const { classUniquecode, subjectId, papertypeCode,ptagId } = this.$route.params.classUniquecode;
            const url = `/exam/index/collection/${memberpapertypeCode}/${classUniquecode}/${ptagId}/${papertypeCode}/${subjectId}`;
            await this.loginAndClue({
                pageName,
                url
            }, '题库-去登录');
            this.handleClick({ memberpapertypeCode });
        },
    },
};
</script>

<style lang="less" scoped>
.exam-collection {
    height: 144px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    background: #ffffff;
    .collection-item {
        padding: 34px 28px;
        cursor: pointer;
        .img {
            margin-bottom: 8px;
            display: block;
            width: 48px;
            height: 48px;
        }
        .title {
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            color: #3a3d4b;
            line-height: 19px;
            letter-spacing: 0.58px;
        }
        &:hover {
            box-shadow: 0px 2px 12px 4px rgba(11, 42, 113, 0.05);
        }
    }
}
</style>
