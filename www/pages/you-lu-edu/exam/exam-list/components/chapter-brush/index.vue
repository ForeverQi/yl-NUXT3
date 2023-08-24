<template>
    <div v-loading="loading" loading-background="#fff" class="chapter-brush-box">
        <div v-if="list.length">
            <div class="column-list column-header-box">
                <p class="catalog title">目录</p>
                <p class="rrogress title">做题进度</p>
                <p class="correct-rate title">正确率</p>
                <p class="operatiom title">操作</p>
            </div>
            <div v-for="(item, index) in list" :key="index" class="column-list item" @click="openChildren(index, item)">
                <div class="parent-box">
                    <div class="catalog">
                        <img
                            v-if="item.children && item.children.length"
                            class="bottom-img"
                            :class="{ active: activeList.indexOf(index) !== -1 }"
                            src="../../../assets/img/bottom.png"
                            alt=""
                        />
                        <p class="item-title" :class="item.children && item.children.length ? '' : 'left'">{{ item.sectionName }}</p>
                    </div>
                    <p class="rrogress title">{{ `${item.answerquestionTotal ? item.answerquestionTotal : 0}/${item.questionTotal}道` }}</p>
                    <p class="correct-rate title">{{ `${item.answerRightprob}%` }}</p>
                    <div :class="{ disabled: item.questionTotal === 0 }" class="operatiom" @click.stop="toPath(item)">
                        <img class="edit-img" src="../../../assets/img/edit.png" alt="" />
                    </div>
                </div>
                <div
                    class="children-box"
                    :ref="`children-box_${index}`"
                    :height="item.children && 52 * item.children.length"
                    :class="{ active: activeList.indexOf(index) !== -1 }"
                    @click.stop
                >
                    <div v-for="(childItem, childIndex) in item.children" :key="childIndex" class="children-item">
                        <div class="catalog">
                            <p class="item-title">{{ childItem.sectionName }}</p>
                        </div>
                        <p class="rrogress title">{{ `${childItem.answerquestionTotal ? childItem.answerquestionTotal : 0}/${childItem.questionTotal}道` }}</p>
                        <p class="correct-rate title">{{ `${childItem.answerRightprob}%` }}</p>
                        <div :class="{ disabled: childItem.questionTotal === 0 }" class="operatiom" @click.stop="toPath(childItem)">
                            <img class="edit-img" src="../../../assets/img/edit.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Empty v-if="!list.length" />
        <VipMask v-if="showVip" :channel="'章节刷题'" :is-loagin="isLoagin" :text="isLoagin ? '本项目系统课学员可学习该模块哦' : '请在登录后，进行练习'" />
    </div>
</template>

<script>
import VipMask from '../vip-mask';
import Empty from '../empty';
import track from '@/www/components/course/trial-course/js/track.js';
import '@/api/qb/api.QB0004.query-section-profile-tree.js';
import '@/api/qb/api..query-business-common-author.js';

export default {
    components: {
        VipMask,
        Empty,
    },
    mixins: [track],
    data() {
        return {
            projectId: '',
            activeList: [], // 激活下拉的题
            classUniquecode: '', // 项目编码
            subjectId: '', // 科目id
            showVip: false, // 是否打开 vip 遮罩
            isLoagin: false, // 是否登录
            loading: false,
            page: {
                pageSize: 8,
                pageIndex: 1,
            },
            list: [],
        };
    },
    watch: {
        '$route.params.subjectId'() {
            this.$nextTick(() => {
                this.init();
            });
        },
        '$store.state.common.userLogin.popUpLogin'() {
            this.loginSuccess();
        },
    },
    mounted() {
        var examProject = this.$storage.get('examProject');
        this.classUniquecode = this.$route.params.classUniquecode;
        this.projectId = examProject ? examProject.projectId : '';
        this.getLoaginStatus();
        this.init();
    },
    methods: {
        init() {
            this.subjectId = this.$route.params.subjectId;
            if (this.subjectId) {
                this.getData();
            }
        },
        // 跳转页面
        toPath(item) {
            if (this.showVip) {
                this.$baseUI.alert('本项目系统课学员才可学习该模块哦', '温馨提示', { confirmText: '我知道了' });
                return;
            }

            if (item.questionTotal === 0) return;
            var path =
                item.answersheetStatus === 'G'
                    ? `/exam/zjlx/goon/${this.classUniquecode}/${item.subjectId}/${item.paperId}/${item.answersheetId}`
                    : `/exam/zjlx/new/${this.classUniquecode}/${item.subjectId}/${item.paperId}`;
            this.$PageUtil.href(path);
        },
        // 点击题目动画
        openChildren(index, item) {
            if (!item.children && !item.children.length) {
                return;
            }
            var indexOf = this.activeList.indexOf(index);
            var childrenRef = this.$refs[`children-box_${index}`][0];
            if (indexOf !== -1) {
                childrenRef.style.height = '0px';
                this.activeList.splice(indexOf, 1);
            } else {
                childrenRef.style.height = childrenRef.getAttribute('height') + 'px';
                this.activeList.push(index);
            }
        },
        // 获取登录状态
        getLoaginStatus() {
            var promise = ylPlugin.login.isLogined();
            promise.then(
                /* 过程中没有失败 */
                (isLogined) => {
                    /* eslint-disable */
                    if (!!isLogined) {
                        this.isLoagin = true;
                        this.getAuthor();
                    } else {
                        this.showVip = true;
                        this.isLoagin = false;
                    }
                },
                (err) => {
                    /* 过程中有失败 */
                    console.error(err, '登录状态失败');
                }
            );
        },
        // 弹窗登录成功回调
        loginSuccess() {
            this.isLoagin = true;
            this.getAuthor();
            this.getData();
        },
        getData() {
            this.loading = true;
            this.list = [];
            niceloo.api.call('qb/query-section-profile-tree', {
                classUniquecode: this.classUniquecode,
                subjectId: this.subjectId,
                source: 'APP',
                sourceType: $nuxt.context.env.config.sourceType,
                pageIndex: (this.page.pageIndex - 1) * 8,
                pageSize: this.page.pageSize,
                onsuccess: (res) => {
                    console.log(res);
                    this.list = res.data;
                },
                onerror: (err) => {
                    console.log(err);
                },
                // onerror: this.$niceloo.api.handleFailure,
                oncomplete: () => {
                    this.loading = false;
                },
            });
        },
        // 获取是否有做题权限
        getAuthor() {
            niceloo.api.call('qb/query-business-common-author', {
                projectId: this.projectId,
                onsuccess: (res) => {
                    console.log(res);
                    this.showVip = false;
                },
                onerror: () => {
                    this.showVip = true;
                },
                oncomplete: () => {},
            });
        },
    },
};
</script>

<style lang="less" scoped>
.chapter-brush-box {
    position: relative;
    margin-top: 20px;
    min-height: 500px;
    .column-list {
        padding: 0 35px 0 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.03);
        &.column-header-box {
            margin-bottom: 33px;
            display: flex;
            align-items: center;
            background: #f9fafb;
            border-bottom: none;
        }
        &.item {
            cursor: pointer;
        }
        .catalog {
            display: flex;
            align-items: center;
            width: 472px;
            flex-shrink: 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .bottom-img {
                margin-right: 12px;
                width: 12px;
                height: 12px;
                transform: rotate(0);
            }
            .item-title {
                width: 390px;
                font-size: 14px;
                font-weight: 400;
                color: #3a3d4b;
                line-height: 20px;
                letter-spacing: 0.58px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &.left {
                    margin-left: 24px;
                }
            }
        }
        .rrogress,
        .correct-rate {
            flex-shrink: 0;
            width: 100px;
            font-size: 14px;
            font-weight: 400;
            color: #3a3d4b;
            line-height: 20px;
            letter-spacing: 0.58px;
            text-align: center;
        }
        .operatiom {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            .edit-img {
                width: 16px;
                height: 16px;
                cursor: pointer;
            }
            &.disabled {
                opacity: 0.5;
            }
        }
        .title {
            font-size: 14px;
            font-weight: 400;
            color: #77798d;
            line-height: 68px;
            letter-spacing: 0.58px;
        }
    }
    .parent-box {
        display: flex;
        align-items: center;
        &:hover {
            .item-title {
                color: #ff2e30;
            }
        }
        .catalog {
            .active {
                transform: rotate(180deg);
            }
        }
    }
    .children-box {
        height: 0;
        overflow: hidden;
        transition: height 0.5s;
        .children-item {
            display: flex;
            align-items: center;
            .title {
                line-height: 52px;
            }
            &:hover {
                .item-title {
                    color: #ff2e30;
                }
            }
        }
        .item-title {
            margin-left: 24px;
        }
    }
}
</style>
