<template>
    <div class="exam-page">
        <nuxt-child v-if="showView" />
        <div v-else v-loading="true" class="padding-box" />
    </div>
</template>

<script>
import '@/api/ctc/api..query-project-detail.js';
export default {
    /**
     * 1 直接跳题库
     * 1.1 没有选择过项目 => 项目选择页面
     * 1.2 选择过项目 => 题库首页
     * 2 分享链接
     * 2.1 分享之前有选择过项目 => 更新缓存 => 目标页面
     * 2.2 分享之前没有选择过项目 => 缓存分享的项目 => 目标页面
     * 3. 缓存过项目之后刷新页面
     */
    beforeRouteEnter(to, from, next) {
        // console.log('to =====>', to);
        console.log('00@@@');
        next(async (vm) => {
            if (to.meta.noProject) {
                vm.showView = true;
                return true;
            }
            var res = await vm.indexReplace(vm).then((res) => {
                if (res) {
                    return res;
                }
            });
            if (res) {
                return vm.$router.replace(res);
            }
            let examProject = vm.$storage.get('examProject');
            var firstLoagin = sessionStorage.getItem('firstLoagin');
            if (firstLoagin === '1' && examProject) {
                vm.showView = true;
                return true;
            }
            var classUniquecode = to.params.classUniquecode || '';
            var ptagId = to.params.ptagId && to.params.ptagId === classUniquecode ? '' : to.params.ptagId ? to.params.ptagId : '';

            // 如果没有选择项目先选择项目
            if (!classUniquecode) {
                vm.showView = true;
                return vm.$router.replace('/exam/index/choose');
            }

            var mapExamProject = await vm
                .getProject(classUniquecode, ptagId)
                .then((res) => res)
                .catch(() => null);
            if (!mapExamProject) {
                vm.showView = true;
                return vm.$router.replace('/exam/index/choose');
            }
            vm.$storage.set('examProject', mapExamProject);
            sessionStorage.setItem('firstLoagin', 1);
            vm.showView = true;
            return true;
        });
    },
    layout: 'new-default',
    data() {
        return {
            showView: false,
        };
    },
    watch: {
        $route: {
            handler() {
                this.indexReplace(this).then((res) => {
                    if (res) {
                        this.$router.replace(res);
                    }
                });
            },
        },
    },
    methods: {
        // 判断路由固定重定向位置守卫函数注释 1.1 / 1.2
        indexReplace(_this) {
            return new Promise((resolve) => {
                if (_this.$route.path === '/exam/index' || _this.$route.path === '/exam/index/') {
                    _this.showView = true;
                    var examProject = _this.$storage.get('examProject');
                    var examSubjectId = _this.$route.params.subjectId || _this.$storage.get('examSubjectId');
                    var targetPath = examProject
                        ? `/exam/index/list/${examProject.projectCode}/${examProject.ptagId || examProject.projectCode}/ZJLX${
                              examSubjectId ? `/${examSubjectId}` : ''
                          }`
                        : '/exam/index/choose';
                    resolve(targetPath);
                    return;
                }
                resolve(null);
            });
        },
        // 通过 code 获取项目详情
        getProject(classUniquecode, ptagId) {
            return new Promise((resolve, reject) => {
                let option = {
                    projectCode: classUniquecode,
                };

                if (ptagId) {
                    option.ptagId = ptagId;
                }
                niceloo.api.call('ctc/query-project-detail', {
                    ...option,
                    onsuccess: (res) => {
                        // console.log(res);
                        resolve(res);
                    },
                    onerror: () => {
                        reject();
                    },
                    oncomplete: () => {},
                });
            });
        },
    },
};
</script>
<style lang="less" scoped>
.exam-page {
    padding-bottom: 20px;
    .padding-box {
        height: 500px;
    }
}
</style>
